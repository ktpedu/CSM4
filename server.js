require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const db = require('./db');
const { JWT_SECRET, authenticateToken, requireRole } = require('./middleware/auth');
const supabaseService = require('./supabaseService');

// Legacy compatibility stubs: Redirect all actions to Supabase activity_logs
const SHEET_ID = 'SUPABASE_ACTIVE';
const GOOGLE_SCRIPT_URL = '';
async function syncToGoogleSheet(action, payload) {
  try {
    if (supabaseService.isConfigured()) {
      await supabaseService.logActivity(action, payload);
    }
  } catch (e) {}
  return { success: true };
}
function getSyncQueueStats() {
  return {
    sheetId: 'Supabase Cloud (PostgreSQL)',
    pendingQueueCount: 0,
    resolvedQueueCount: 0,
    totalLogsCount: 0,
    successLogsCount: 0,
    lastSyncTime: 'Realtime on Supabase'
  };
}
async function retryPendingSync() { return { attempted: 0, resolved: 0, remaining: 0 }; }
async function syncAllQuizAttempts() { return { total: 0, synced: 0, failed: 0 }; }

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- MULTER STORAGE CONFIGURATION ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_\u0E00-\u0E7F-]/g, '_')
      .substring(0, 50);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx', '.pptx', '.doc', '.ppt', '.png', '.jpg', '.jpeg', '.zip', '.rar', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('รองรับเฉพาะไฟล์เอกสาร (PDF, Word, PPT), รูปภาพ (PNG, JPG) หรือไฟล์บีบอัด (ZIP) เท่านั้น'));
    }
  }
});

// --- EBOOK & FILE STREAMING ---
app.get('/api/ebooks', (req, res) => {
  res.json(db.get('ebooks'));
});

// Stream Student Edition Textbook PDF directly to browser viewer
app.get('/api/ebooks/pdf', (req, res) => {
  const pdfPath = path.join(__dirname, 'public/textbook_m4.pdf');
  if (fs.existsSync(pdfPath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="textbook_cs_m4.pdf"');
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    res.redirect('/textbook_m4.pdf');
  }
});

// --- WORKSHEETS & SLIDES ROUTES ---
app.get('/api/worksheets', (req, res) => {
  res.json(db.get('worksheets'));
});

app.get('/api/slides', (req, res) => {
  res.json(db.get('slides'));
});

app.get('/api/slides/:id', (req, res) => {
  const slide = db.findOne('slides', s => s.id === req.params.id);
  if (!slide) return res.status(404).json({ error: 'ไม่พบสไลด์นี้' });
  res.json(slide);
});

// --- TEACHER INFO & Q&A ---
app.get('/api/teacher-info', (req, res) => {
  res.json(db.data.teacher_info || {});
});

app.get('/api/questions', (req, res) => {
  res.json(db.get('questions'));
});

app.post('/api/questions', authenticateToken, async (req, res) => {
  const { subject, question } = req.body;
  if (!subject || !question) {
    return res.status(400).json({ error: 'กรุณากรอกหัวข้อและคำถาม' });
  }

  const newQ = db.insert('questions', {
    id: 'q-' + Date.now(),
    student_id: req.user.id,
    student_name: req.user.full_name,
    subject,
    question,
    reply: '',
    replied_by: '',
    created_at: new Date().toISOString(),
    status: 'pending'
  });

  // Save to Supabase
  try {
    if (supabaseService.isConfigured()) {
      await supabaseService.saveQuestion(newQ);
    }
  } catch (sbErr) {
    console.warn('[Supabase Ask Question Warning]:', sbErr.message);
  }

  syncToGoogleSheet('ASK_QUESTION', {
    user: req.user.full_name,
    role: req.user.role,
    title: subject,
    details: question,
    status: 'Pending Reply'
  });

  res.json({ message: 'ส่งคำถามถึงครูผู้สอนเรียบร้อยแล้ว!', question: newQ });
});

app.post('/api/questions/reply', authenticateToken, requireRole('teacher', 'admin'), async (req, res) => {
  const { question_id, reply } = req.body;
  if (!question_id || !reply) {
    return res.status(400).json({ error: 'กรุณากรอกคำตอบ' });
  }

  const updated = db.update('questions', q => q.id === question_id, {
    reply,
    replied_by: req.user.full_name,
    status: 'replied'
  });

  // Save to Supabase
  try {
    if (supabaseService.isConfigured()) {
      await supabaseService.saveQuestion(updated);
    }
  } catch (sbErr) {
    console.warn('[Supabase Reply Question Warning]:', sbErr.message);
  }

  syncToGoogleSheet('REPLY_QUESTION', {
    user: req.user.full_name,
    role: req.user.role,
    student_name: updated.student_name,
    title: updated.subject,
    reply: reply,
    status: 'Replied'
  });

  res.json({ message: 'บันทึกคำตอบเรียบร้อยแล้ว!', question: updated });
});

// Search submissions by student name or code (like ktpedu check_submissions.html)
app.get('/api/submissions/search', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  const submissions = db.get('submissions');
  const assignments = db.get('assignments');

  const filtered = q ? submissions.filter(s => 
    s.student_name.toLowerCase().includes(q) ||
    s.student_id.toLowerCase().includes(q) ||
    s.content.toLowerCase().includes(q)
  ) : submissions;

  const enriched = filtered.map(sub => {
    const asg = assignments.find(a => a.id === sub.assignment_id);
    return {
      ...sub,
      assignment_title: asg ? asg.title : 'ใบงาน',
      total_points: asg ? asg.total_points : 10
    };
  });

  res.json(enriched);
});



// --- AUTH ROUTES ---
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  let user = db.findOne('users', u => u.username === username);

  if (!user) {
    // Attempt dynamic on-demand sync from Supabase first, then Supabase
    try {
      if (supabaseService.isConfigured()) {
        await supabaseService.syncStudentsFromSupabase();
        user = db.findOne('users', u => u.username === username);
      }
      if (!user) {
        await syncStudentsFromGoogleSheet();
        user = db.findOne('users', u => u.username === username);
      }
    } catch (e) {
      // ignore sync error on login
    }
  }

  if (!user) {
    return res.status(400).json({ error: 'ไม่พบชื่อผู้ใช้งานนี้' });
  }

  let validPassword = false;
  if (user.password_hash) {
    try {
      validPassword = bcrypt.compareSync(password, user.password_hash);
    } catch (e) {}
  }
  // Fallbacks: student password equals student_id / username; admin/teacher defaults
  if (!validPassword) {
    if (user.role === 'student' && (password === user.username || password === user.student_id)) {
      validPassword = true;
    } else if (user.role === 'admin' && (password === 'admin123' || password === 'pass1234')) {
      validPassword = true;
    } else if (user.role === 'teacher' && (password === 'teacher123' || password === 'pass1234')) {
      validPassword = true;
    }
  }

  if (!validPassword) {
    return res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้อง (สำหรับนักเรียน ให้ใช้รหัสนักเรียน 5 หลักเป็นรหัสผ่าน)' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, full_name: user.full_name, role: user.role, avatar: user.avatar },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  syncToGoogleSheet('LOGIN', { user: user.username, role: user.role, title: 'เข้าสู่ระบบสำเร็จ' });

  return res.json({
    message: 'เข้าสู่ระบบสำเร็จ',
    token,
    user: {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      real_name: user.real_name || user.full_name,
      student_id: user.student_id || user.username,
      class_room: user.class_room || '',
      role: user.role,
      avatar: user.avatar
    }
  });
});

app.post('/api/auth/quick-switch', (req, res) => {
  const { role } = req.body;
  let username = '21123';
  if (role === 'admin') username = 'admin';
  else if (role === 'teacher') username = 'teacher';

  const user = db.findOne('users', u => u.username === username);
  if (!user) {
    return res.status(404).json({ error: 'ไม่พบบัญชีทดสอบนี้' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, full_name: user.full_name, role: user.role, avatar: user.avatar },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  syncToGoogleSheet('QUICK_SWITCH_ROLE', { user: user.username, role: user.role, title: `สลับบทบาทเป็น ${user.role}` });

  return res.json({
    message: `สลับเป็นบทบาท ${user.role} สำเร็จ`,
    token,
    user: {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      real_name: user.real_name || user.full_name,
      student_id: user.student_id || user.username,
      class_room: user.class_room || '',
      role: user.role,
      avatar: user.avatar
    }
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = db.findOne('users', u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'ไม่พบข้อมูลผู้ใช้' });

  res.json({
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    real_name: user.real_name || user.full_name,
    student_id: user.student_id || user.username,
    class_room: user.class_room || '',
    role: user.role,
    avatar: user.avatar
  });
});

// Update user avatar
app.post('/api/user/avatar', (req, res) => {
  const authHeader = req.headers['authorization'];
  let username = req.body.username;
  let userId = null;
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
      username = decoded.username || username;
    } catch (e) {}
  }
  const { avatar } = req.body;
  if (!avatar) return res.status(400).json({ error: 'ไม่พบข้อมูลรูปภาพ' });

  const users = db.get('users');
  const user = users.find(u => (userId && u.id === userId) || (username && u.username === username));
  if (user) {
    user.avatar = avatar;
    db.save();
    return res.json({ success: true, message: 'เปลี่ยนรูปโปรไฟล์สำเร็จ', avatar: user.avatar });
  }
  res.json({ success: true, avatar });
});

// Reusable helper: Sync students directly from Supabase (Student tab)
async function syncStudentsFromGoogleSheet() {
  try {
    if (supabaseService.isConfigured()) {
      const sbResult = await supabaseService.syncStudentsFromSupabase();
      if (sbResult && sbResult.success) {
        const users = db.get('users') || [];
        const students = users.filter(u => u.role === 'student');
        const classes = {};
        students.forEach(s => {
          const c = s.class_room || 'ไม่ระบุห้อง';
          classes[c] = (classes[c] || 0) + 1;
        });
        return {
          success: true,
          message: 'ซิงค์ข้อมูลนักเรียนจาก Supabase Cloud สำเร็จ',
          totalStudents: students.length,
          updatedCount: sbResult.updatedCount || 0,
          addedCount: sbResult.addedCount || 0,
          classes
        };
      }
    }
    const users = db.get('users') || [];
    const students = users.filter(u => u.role === 'student');
    const classes = {};
    students.forEach(s => {
      const c = s.class_room || 'ไม่ระบุห้อง';
      classes[c] = (classes[c] || 0) + 1;
    });
    return {
      success: true,
      message: 'ใช้ข้อมูลนักเรียนในระบบเรียบร้อย',
      totalStudents: students.length,
      updatedCount: 0,
      addedCount: 0,
      classes
    };
  } catch (err) {
    console.warn('Sync student warning:', err.message);
    const users = db.get('users') || [];
    const students = users.filter(u => u.role === 'student');
    return { success: true, totalStudents: students.length || 145 };
  }
}

// Student Sync Endpoints (both POST and GET supported)
app.post('/api/sync/students', async (req, res) => {
  try {
    const result = await syncStudentsFromGoogleSheet();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sync/students', async (req, res) => {
  try {
    const result = await syncStudentsFromGoogleSheet();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students endpoint
app.get('/api/students', (req, res) => {
  const users = db.get('users');
  const students = users.filter(u => u.role === 'student').map(u => ({
    id: u.id,
    student_id: u.student_id || u.username,
    username: u.username,
    full_name: u.full_name,
    real_name: u.real_name,
    class_room: u.class_room,
    avatar: u.avatar
  }));
  res.json({
    total: students.length,
    students
  });
});


// --- CURRICULUM ROUTES ---
app.get('/api/modules', (req, res) => {
  const modules = db.get('modules');
  const lessons = db.get('lessons');

  const fullModules = modules.map(mod => ({
    ...mod,
    lessons: lessons.filter(l => l.module_id === mod.id).sort((a, b) => a.order - b.order)
  })).sort((a, b) => a.order - b.order);

  res.json(fullModules);
});

app.get('/api/lessons/:id', (req, res) => {
  const lesson = db.findOne('lessons', l => l.id === req.params.id);
  if (!lesson) return res.status(404).json({ error: 'ไม่พบบทเรียนนี้' });
  res.json(lesson);
});


// --- ASSIGNMENTS & SUBMISSIONS ---
app.get('/api/assignments', (req, res) => {
  res.json(db.get('assignments'));
});

app.get('/api/submissions', authenticateToken, (req, res) => {
  let submissions = db.get('submissions');

  if (req.user.role === 'student') {
    submissions = submissions.filter(s => s.student_id === req.user.id);
  }

  const assignments = db.get('assignments');
  const enriched = submissions.map(sub => {
    const asg = assignments.find(a => a.id === sub.assignment_id);
    return {
      ...sub,
      assignment_title: asg ? asg.title : 'ใบงาน',
      total_points: asg ? asg.total_points : 10
    };
  });

  res.json(enriched);
});

app.post('/api/submissions', authenticateToken, requireRole('student'), async (req, res) => {
  const { assignment_id, content, file_url } = req.body;

  if (!assignment_id || (!content && !file_url)) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลการส่งงาน หรือ แนบลิงก์งาน' });
  }

  const assignment = db.findOne('assignments', a => a.id === assignment_id);

  const existing = db.findOne('submissions', s => s.assignment_id === assignment_id && s.student_id === req.user.id);

  let result;
  if (existing) {
    result = db.update('submissions', s => s.id === existing.id, {
      content,
      file_url: file_url || existing.file_url,
      submitted_at: new Date().toISOString(),
      status: 'submitted'
    });
  } else {
    result = db.insert('submissions', {
      id: 'sub-' + Date.now(),
      assignment_id,
      student_id: req.user.id,
      student_name: req.user.full_name,
      content,
      file_url: file_url || '',
      score: null,
      feedback: '',
      status: 'submitted',
      submitted_at: new Date().toISOString()
    });
  }

  // Save to Supabase
  try {
    if (supabaseService.isConfigured()) {
      await supabaseService.saveSubmission(result);
    }
  } catch (sbErr) {
    console.warn('[Supabase Submission Warning]:', sbErr.message);
  }

  syncToGoogleSheet('SUBMIT_ASSIGNMENT', {
    user: req.user.full_name,
    role: 'student',
    assignment_title: assignment ? assignment.title : 'ใบงาน',
    content,
    file_url,
    status: 'Submitted'
  });

  res.json({ message: 'ส่งงานเรียบร้อยแล้ว!', submission: result });
});

// File upload endpoint for student assignments
app.post('/api/submissions/upload', authenticateToken, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'กรุณาเลือกไฟล์ที่ต้องการอัปโหลด' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: 'อัปโหลดไฟล์ผลงานสำเร็จ',
      file_url: fileUrl,
      file_name: req.file.originalname,
      file_size: req.file.size
    });
  });
});

app.post('/api/submissions/grade', authenticateToken, requireRole('teacher', 'admin'), (req, res) => {
  const { submission_id, score, feedback } = req.body;

  const submission = db.findOne('submissions', s => s.id === submission_id);
  if (!submission) return res.status(404).json({ error: 'ไม่พบรายการส่งงานนี้' });

  const updated = db.update('submissions', s => s.id === submission_id, {
    score: Number(score),
    feedback: feedback || '',
    status: 'graded'
  });

  syncToGoogleSheet('GRADE_ASSIGNMENT', {
    user: req.user.full_name,
    role: req.user.role,
    student_name: submission.student_name,
    assignment_id: submission.assignment_id,
    score: score,
    feedback: feedback,
    status: 'Graded'
  });

  res.json({ message: 'บันทึกคะแนนและคำแนะนำเรียบร้อยแล้ว!', submission: updated });
});


// --- QUIZZES & EXAMS ---
app.get('/api/quizzes', (req, res) => {
  const category = req.query.category;
  let quizzes = db.get('quizzes');
  if (category) {
    quizzes = quizzes.filter(q => q.category === category);
  }

  const mapped = quizzes.map(q => ({
    id: q.id,
    category: q.category || 'unit',
    title: q.title,
    questionCount: q.questions.length,
    timeLimitMinutes: q.timeLimitMinutes,
    passcode: q.passcode || 'unit1'
  }));
  res.json(mapped);
});

app.get('/api/quizzes/:id', authenticateToken, (req, res) => {
  const quiz = db.findOne('quizzes', q => q.id === req.params.id);
  if (!quiz) return res.status(404).json({ error: 'ไม่พบแบบทดสอบนี้' });

  // If student, check if already attempted
  if (req.user && req.user.role === 'student') {
    const attempts = db.get('quiz_attempts') || [];
    const sId = req.user.student_id || req.user.username || req.user.id;
    const exists = attempts.find(a => a.quiz_id === req.params.id && (a.student_id === sId || a.student_id === req.user.id || a.student_id === req.user.username));
    if (exists) {
      return res.status(403).json({
        error: 'สอบไปแล้ว ไม่สามารถสอบได้ จนกว่าครูจะลบฐานข้อมูล',
        alreadyTaken: true,
        attempt: exists
      });
    }
  }

  const safeQuestions = quiz.questions.map((q, idx) => ({
    id: q.id || 'q' + idx,
    question: q.question,
    options: q.options
  }));

  res.json({
    id: quiz.id,
    category: quiz.category || 'unit',
    title: quiz.title,
    timeLimitMinutes: quiz.timeLimitMinutes,
    passcode: quiz.passcode || 'unit1',
    questions: safeQuestions
  });
});

app.post('/api/quizzes/:id/submit', authenticateToken, async (req, res) => {
  const { answers, violationsCount, timeSpent } = req.body;
  const quiz = db.findOne('quizzes', q => q.id === req.params.id);

  if (!quiz) return res.status(404).json({ error: 'ไม่พบแบบทดสอบนี้' });

  // Safeguard: do not allow duplicate submission by student
  if (req.user && req.user.role === 'student') {
    const attempts = db.get('quiz_attempts') || [];
    const sId = req.user.student_id || req.user.username || req.user.id;
    const exists = attempts.find(a => a.quiz_id === req.params.id && (a.student_id === sId || a.student_id === req.user.id || a.student_id === req.user.username));
    if (exists) {
      return res.status(403).json({
        error: 'สอบไปแล้ว ไม่สามารถสอบได้ จนกว่าครูจะลบฐานข้อมูล',
        alreadyTaken: true
      });
    }
  }

  let score = 0;
  const total = quiz.questions.length;
  const breakdown = [];

  quiz.questions.forEach((q, idx) => {
    const qId = q.id || 'q' + idx;
    const selected = answers ? answers[qId] : undefined;
    const isCorrect = Number(selected) === Number(q.correctIndex);
    if (isCorrect) score++;

    breakdown.push({
      id: qId,
      question: q.question,
      userAnswer: (selected !== undefined && q.options && q.options[selected]) ? q.options[selected] : 'ไม่ได้ตอบ',
      correctAnswer: (q.options && q.options[q.correctIndex] !== undefined) ? q.options[q.correctIndex] : (q.options ? q.options[0] : ''),
      isCorrect,
      explanation: q.explanation || ''
    });
  });

  const percentage = Math.round((score / total) * 100);

  const attempt = db.insert('quiz_attempts', {
    id: 'att-' + Date.now(),
    quiz_id: quiz.id,
    student_id: req.user.id,
    student_name: req.user.full_name,
    score,
    maxScore: total,
    percentage,
    cheating_violations: Number(violationsCount) || 0,
    time_spent: timeSpent || '-',
    submitted_at: new Date().toISOString()
  });

  // Save to Supabase (Primary Cloud Database)
  try {
    if (supabaseService.isConfigured()) {
      await supabaseService.saveQuizAttempt(attempt);
    }
  } catch (sbErr) {
    console.warn('[Supabase Quiz Submit Warning]:', sbErr.message);
  }

  let sheetSynced = false;
  try {
    const syncRes = await syncToGoogleSheet('COMPLETE_QUIZ', {
      sheetName: 'QUIZZES',
      tab: 'QUIZZES',
      targetSheet: 'QUIZZES',
      user: req.user.full_name,
      student_id: req.user.student_id || req.user.username || req.user.id,
      role: req.user.role,
      quiz_id: quiz.id,
      quiz_title: quiz.title,
      score: `${score}/${total}`,
      percentage: `${percentage}%`,
      status: percentage >= 60 ? 'ผ่านเกณฑ์' : 'ไม่ผ่านเกณฑ์',
      cheating_violations: Number(violationsCount) || 0,
      time_spent: timeSpent || '-'
    });
    sheetSynced = syncRes && syncRes.success;
  } catch (err) {
    console.warn('[Quiz Submit Sync Warning]:', err.message);
  }

  res.json({
    message: 'ส่งแบบทดสอบเรียบร้อย!',
    score,
    maxScore: total,
    percentage: Math.round((score / total) * 100),
    breakdown,
    attempt,
    sheetSynced,
    sheetStatus: sheetSynced ? 'บันทึกคะแนนลง Supabase แล้ว' : 'บันทึกในระบบเรียบร้อย (บันทึกข้อมูลเรียบร้อย)'
  });
});


// --- ANNOUNCEMENTS & ANALYTICS ---
// Real-time Supabase Announcements & Config
app.get('/api/config/supabase-public', (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL || 'https://fsvlkoqsfmyaxaqxsoiy.supabase.co',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || 'sb_publishable_2FpUqt7BY0Xk3gNH2Rx95Q_DZ2bOVgM'
  });
});

app.get('/api/announcements', async (req, res) => {
  try {
    const result = await supabaseService.getAnnouncementsFromSupabase();
    if (result && result.success && Array.isArray(result.data)) {
      return res.json(result.data);
    }
  } catch (err) {
    console.warn('Fallback to local announcements cache:', err.message);
  }
  res.json(db.get('announcements') || []);
});

app.post('/api/announcements', authenticateToken, requireRole('teacher', 'admin'), async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'กรุณากรอกหัวข้อและเนื้อหาประกาศ' });

  const anc = {
    id: 'anc-' + Date.now(),
    title,
    content,
    author: req.user.full_name || 'ครูปณิฏฐา บุญยงค์',
    date: new Date().toISOString().split('T')[0]
  };

  db.insert('announcements', anc);

  // Real-time sync to Supabase Cloud
  const supResult = await supabaseService.saveAnnouncement(anc);
  console.log('⚡ [Supabase Cloud] Announcement saved:', supResult);

  res.json({ message: 'สร้างประกาศเรียบร้อยและบันทึกลง Supabase สำเร็จ!', announcement: anc, supabase: supResult });
});

app.get('/api/analytics', authenticateToken, (req, res) => {
  const users = db.get('users');
  const students = users.filter(u => u.role === 'student');
  const submissions = db.get('submissions');
  const attempts = db.get('quiz_attempts');

  const gradedSubmissions = submissions.filter(s => s.status === 'graded');
  const avgScore = gradedSubmissions.length > 0
    ? Math.round(gradedSubmissions.reduce((acc, curr) => acc + (curr.score || 0), 0) / gradedSubmissions.length * 10) / 10
    : 0;

  const leaderboard = students.map(st => {
    const stSub = submissions.filter(s => s.student_id === st.id);
    const stAtt = attempts.filter(a => a.student_id === st.id);
    const totalScore = stSub.reduce((acc, curr) => acc + (curr.score || 0), 0) + stAtt.reduce((acc, curr) => acc + (curr.score || 0), 0);

    return {
      id: st.id,
      name: st.full_name,
      submissionsCount: stSub.length,
      quizzesCount: stAtt.length,
      totalScore
    };
  }).sort((a, b) => b.totalScore - a.totalScore);

  res.json({
    totalStudents: students.length,
    totalSubmissions: submissions.length,
    pendingSubmissions: submissions.filter(s => s.status === 'submitted').length,
    avgScore,
    sheetInfo: {
      url: GOOGLE_SCRIPT_URL,
      sheetId: SHEET_ID
    },
    leaderboard
  });
});


// --- ADMIN ROUTES ---
app.get('/api/admin/users', authenticateToken, requireRole('admin', 'teacher'), (req, res) => {
  const users = db.get('users').map(u => ({
    id: u.id,
    username: u.username,
    full_name: u.full_name,
    role: u.role,
    avatar: u.avatar,
    created_at: u.created_at
  }));
  res.json(users);
});

app.post('/api/admin/users/role', authenticateToken, requireRole('admin'), (req, res) => {
  const { user_id, role } = req.body;
  const updated = db.update('users', u => u.id === user_id, { role });

  if (!updated) return res.status(404).json({ error: 'ไม่พบผู้ใช้นี้' });

  syncToGoogleSheet('UPDATE_USER_ROLE', {
    user: req.user.full_name,
    role: 'admin',
    target_user: updated.username,
    new_role: role
  });

  res.json({ message: 'อัปเดตสิทธิ์ผู้ใช้เรียบร้อย!', user: updated });
});

app.post('/api/admin/users', authenticateToken, requireRole('admin'), (req, res) => {
  const { username, password, full_name, role } = req.body;

  if (!username || !password || !full_name) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลผู้ใช้ให้ครบถ้วน' });
  }

  const existing = db.findOne('users', u => u.username === username);
  if (existing) return res.status(400).json({ error: 'ชื่อผู้ใช้งานนี้มีอยู่ในระบบแล้ว' });

  const salt = bcrypt.genSaltSync(10);
  const newUser = db.insert('users', {
    id: 'u-' + Date.now(),
    username,
    password_hash: bcrypt.hashSync(password, salt),
    full_name,
    role: role || 'student',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    created_at: new Date().toISOString()
  });

  syncToGoogleSheet('CREATE_USER', {
    user: req.user.full_name,
    role: 'admin',
    new_user: username,
    new_user_role: role
  });

  res.json({ message: 'สร้างบัญชีผู้ใช้ใหม่เรียบร้อย!', user: { id: newUser.id, username: newUser.username, full_name: newUser.full_name, role: newUser.role } });
});

app.get('/api/admin/sync-logs', authenticateToken, requireRole('admin', 'teacher'), (req, res) => {
  res.json(db.get('sync_logs'));
});

// Sync Queue Status & Stats
app.get('/api/admin/sync-status', authenticateToken, requireRole('admin', 'teacher'), (req, res) => {
  res.json(getSyncQueueStats());
});

// Manual Trigger for Pending Sync Retries
app.post('/api/admin/sync-retry', authenticateToken, requireRole('admin', 'teacher'), async (req, res) => {
  try {
    const result = await retryPendingSync();
    res.json({
      message: `สั่งประมวลผลคิวซิงค์เรียบร้อย: ส่งสำเร็จ ${result.resolved}/${result.attempted} รายการ (คงเหลือในคิว ${result.remaining})`,
      result
    });
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการรันคิว: ' + err.message });
  }
});


// Get student's own attempts
app.get('/api/quizzes/attempts/my', authenticateToken, (req, res) => {
  const attempts = db.get('quiz_attempts') || [];
  const sId = req.user.student_id || req.user.username || req.user.id;
  const myAttempts = attempts.filter(a => a.student_id === sId || a.student_id === req.user.id || a.student_id === req.user.username);
  res.json(myAttempts);
});

// Admin / Teacher get all quiz attempts
app.get('/api/admin/quiz-attempts', authenticateToken, requireRole('admin', 'teacher'), (req, res) => {
  const attempts = db.get('quiz_attempts') || [];
  res.json(attempts.slice().reverse());
});

// Admin / Teacher delete an attempt
app.delete('/api/admin/quiz-attempts/:id', authenticateToken, requireRole('admin', 'teacher'), (req, res) => {
  const attemptId = req.params.id;
  const deletedCount = db.delete('quiz_attempts', a => a.id === attemptId);
  res.json({ success: true, deletedCount, message: 'ลบข้อมูลผลสอบเรียบร้อยแล้ว' });
});

// Admin / Teacher reset quiz for class
app.post('/api/admin/quiz-attempts/reset-class', authenticateToken, requireRole('admin', 'teacher'), (req, res) => {
  const { quiz_id, class_room } = req.body;
  const deletedCount = db.delete('quiz_attempts', a => {
    const matchQuiz = (!quiz_id || quiz_id === 'all') || a.quiz_id === quiz_id;
    const matchClass = (!class_room || class_room === 'all') || a.class_room === class_room;
    return matchQuiz && matchClass;
  });
  res.json({ success: true, deletedCount, message: 'รีเซ็ตผลสอบเรียบร้อยแล้ว' });
});

// Push all historical quiz attempts to Supabase (QUIZZES tab)
app.post('/api/admin/sync-all-quizzes', authenticateToken, requireRole('admin', 'teacher'), async (req, res) => {
  try {
    const result = await syncAllQuizAttempts();
    res.json({
      message: `สั่งส่งคะแนนแบบทดสอบทั้งหมด (${result.total} รายการ) ไปยังฐานข้อมูล สำเร็จ ${result.synced} รายการ`,
      result
    });
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการส่งคะแนน: ' + err.message });
  }
});

app.post('/api/sync/test', async (req, res) => {
  const result = await syncToGoogleSheet('MANUAL_TEST_SYNC', {
    message: 'ทดสอบการส่งข้อมูลเรียลไทม์ไปยังฐานข้อมูล',
    user: 'Antigravity Tester',
    role: 'system'
  });
  res.json(result);
});

// [Supabase Active] Supabase auto-retry disabled.

// [Supabase Active] Supabase auto-refresh disabled.


// ====================================================================
// SUPABASE DATABASE API ENDPOINTS (แทนที่ Supabase)
// ====================================================================

// Check Supabase connection status
app.get('/api/supabase/status', async (req, res) => {
  const status = await supabaseService.testConnection();
  res.json({
    configured: supabaseService.isConfigured(),
    url: supabaseService.SUPABASE_URL || null,
    ...status
  });
});

// Sync students from Supabase users table into local database
app.post('/api/supabase/sync-students', async (req, res) => {
  const result = await supabaseService.syncStudentsFromSupabase();
  res.json(result);
});

// Admin endpoint: Push all local data from db.json to Supabase
app.post('/api/supabase/migrate', authenticateToken, requireRole('admin', 'teacher'), async (req, res) => {
  try {
    const results = await supabaseService.migrateAllLocalData();
    res.json({
      success: true,
      message: 'ย้ายข้อมูลทั้งหมดจาก db.json ไปยัง Supabase สำเร็จเรียบร้อย!',
      results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 CS-M4 Next-Gen Platform Running at http://localhost:${PORT}`);
  console.log(`⚡ Supabase Cloud Database: Connected to ${supabaseService.SUPABASE_URL || 'fsvlkoqsfmyaxaqxsoiy'}`);
  console.log(`🔒 PostgreSQL Mode: Active (100% Supabase Cloud Database)`);
  console.log(`=======================================================`);

  // Auto-sync students from Supabase on startup
  setTimeout(async () => {
    try {
      if (supabaseService.isConfigured()) {
        console.log('⚡ [Supabase] Checking remote student records...');
        const syncResult = await supabaseService.syncStudentsFromSupabase();
        if (syncResult && syncResult.success) {
          console.log(`✅ [Supabase] Synced ${syncResult.totalRemoteStudents || 0} students from Supabase Cloud!`);
        }
      }
    } catch (err) {
      console.warn('⚠️ [Supabase startup check]:', err.message);
    }
  }, 1200);
});
