require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const db = require('./db');

// Sanitize and normalize URL (remove trailing slash and /rest/v1 if user pasted rest endpoint)
let rawUrl = (process.env.SUPABASE_URL || '').trim();
rawUrl = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
const SUPABASE_URL = rawUrl;

// Sanitize keys: Use service key only if valid, otherwise fallback to anon key
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
const anonKey = (process.env.SUPABASE_ANON_KEY || '').trim();
const SUPABASE_KEY = (serviceKey && serviceKey.length > 20 && !serviceKey.includes(' ') && !serviceKey.includes(']')) ? serviceKey : anonKey;

let supabase = null;

function getClient() {
  if (!supabase && SUPABASE_URL && SUPABASE_KEY) {
    try {
      supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { persistSession: false }
      });
      console.log('⚡ [Supabase] Client initialized with URL:', SUPABASE_URL);
    } catch (err) {
      console.error('❌ [Supabase] Initialization error:', err.message);
      supabase = null;
    }
  }
  return supabase;
}

function isConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

// Check health / test connection
async function testConnection() {
  if (!isConfigured()) {
    return {
      connected: false,
      message: 'ยังไม่ได้ตั้งค่า SUPABASE_URL หรือ SUPABASE_KEY ในไฟล์ .env'
    };
  }

  const client = getClient();
  const startTime = Date.now();

  try {
    const { count, error } = await client
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    const latency = Date.now() - startTime;
    return {
      connected: true,
      url: SUPABASE_URL,
      usersCount: count || 0,
      latencyMs: latency,
      message: `เชื่อมต่อ Supabase สำเร็จ! (พบผู้ใช้ ${count || 0} คน, latency ${latency}ms)`
    };
  } catch (err) {
    return {
      connected: false,
      url: SUPABASE_URL,
      error: err.message,
      message: `ไม่สามารถเชื่อมต่อ Supabase ได้: ${err.message}`
    };
  }
}

// Fetch all students from Supabase users table
async function syncStudentsFromSupabase() {
  if (!isConfigured()) {
    return { success: false, reason: 'SUPABASE_NOT_CONFIGURED', students: [] };
  }

  const client = getClient();
  try {
    const { data, error } = await client
      .from('users')
      .select('*')
      .eq('role', 'student');

    if (error) throw error;
    if (!data || data.length === 0) {
      return { success: true, count: 0, students: [] };
    }

    // Merge into local db
    const existingUsers = db.get('users') || [];
    let updatedCount = 0;
    let addedCount = 0;

    data.forEach(remoteUser => {
      const idx = existingUsers.findIndex(u => u.username === remoteUser.username || (remoteUser.student_id && u.student_id === remoteUser.student_id));
      if (idx !== -1) {
        existingUsers[idx] = { ...existingUsers[idx], ...remoteUser };
        updatedCount++;
      } else {
        existingUsers.push(remoteUser);
        addedCount++;
      }
    });

    db.set('users', existingUsers);

    return {
      success: true,
      totalRemoteStudents: data.length,
      updatedCount,
      addedCount
    };
  } catch (err) {
    console.error('❌ [Supabase syncStudents error]:', err.message);
    return { success: false, error: err.message };
  }
}

// Save Quiz Attempt to Supabase
async function saveQuizAttempt(attemptData) {
  const client = getClient();
  if (!client) return { success: false, offline: true };

  try {
    const record = {
      id: attemptData.id,
      quiz_id: attemptData.quiz_id,
      student_id: String(attemptData.student_id || '-'),
      student_name: attemptData.student_name || 'นักเรียน',
      class_room: attemptData.class_room || null,
      score: Number(attemptData.score) || 0,
      max_score: Number(attemptData.maxScore || attemptData.max_score) || 20,
      percentage: Number(attemptData.percentage) || 0,
      passed: Boolean(attemptData.percentage >= 60),
      cheating_violations: Number(attemptData.cheating_violations) || 0,
      time_spent: attemptData.time_spent || null,
      answers: attemptData.answers || null,
      submitted_at: attemptData.submitted_at || new Date().toISOString()
    };

    const { error } = await client
      .from('quiz_attempts')
      .upsert(record, { onConflict: 'id' });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.warn('⚠️ [Supabase saveQuizAttempt error]:', err.message);
    return { success: false, error: err.message };
  }
}

// Save Submission to Supabase
async function saveSubmission(subData) {
  const client = getClient();
  if (!client) return { success: false, offline: true };

  try {
    const record = {
      id: subData.id,
      assignment_id: subData.assignment_id,
      student_id: String(subData.student_id || '-'),
      student_name: subData.student_name || 'นักเรียน',
      class_room: subData.class_room || null,
      content: subData.content || null,
      file_url: subData.file_url || null,
      score: subData.score !== undefined ? Number(subData.score) : null,
      feedback: subData.feedback || null,
      status: subData.status || 'submitted',
      submitted_at: subData.submitted_at || new Date().toISOString()
    };

    const { error } = await client
      .from('submissions')
      .upsert(record, { onConflict: 'id' });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.warn('⚠️ [Supabase saveSubmission error]:', err.message);
    return { success: false, error: err.message };
  }
}

// Save Question to Supabase
async function saveQuestion(qData) {
  const client = getClient();
  if (!client) return { success: false, offline: true };

  try {
    const record = {
      id: qData.id,
      student_id: String(qData.student_id || '-'),
      student_name: qData.student_name || 'นักเรียน',
      subject: qData.subject,
      question: qData.question,
      reply: qData.reply || null,
      replied_by: qData.replied_by || null,
      status: (qData.status === 'replied' ? 'answered' : (qData.status || 'pending')),
      created_at: qData.created_at || new Date().toISOString()
    };

    const { error } = await client
      .from('questions')
      .upsert(record, { onConflict: 'id' });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.warn('⚠️ [Supabase saveQuestion error]:', err.message);
    return { success: false, error: err.message };
  }
}

// Get Announcements from Supabase Cloud
async function getAnnouncementsFromSupabase() {
  const client = getClient();
  if (!client) return { success: false, offline: true, data: db.get('announcements') || [] };

  try {
    const { data, error } = await client
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      // Sync into local lowdb cache
      db.set('announcements', data);
    }
    return { success: true, data: data || [] };
  } catch (err) {
    console.warn('⚠️ [Supabase getAnnouncements error]:', err.message);
    return { success: false, error: err.message, data: db.get('announcements') || [] };
  }
}

// Save Announcement to Supabase
async function saveAnnouncement(annData) {
  const client = getClient();
  if (!client) return { success: false, offline: true };

  try {
    const record = {
      id: annData.id,
      title: annData.title,
      content: annData.content,
      author: annData.author,
      date: annData.date || null,
      created_at: new Date().toISOString()
    };

    const { error } = await client
      .from('announcements')
      .upsert(record, { onConflict: 'id' });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.warn('⚠️ [Supabase saveAnnouncement error]:', err.message);
    return { success: false, error: err.message };
  }
}

// Log Activity to Supabase
async function logActivity(action, payload = {}) {
  const client = getClient();
  if (!client) return { success: false, offline: true };

  try {
    const formattedTime = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
    const record = {
      id: 'log-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      action,
      user_name: payload.user || payload.student_name || 'System',
      student_id: String(payload.student_id || payload.user_id || '-'),
      role: payload.role || 'user',
      payload,
      formatted_time: formattedTime,
      created_at: new Date().toISOString()
    };

    const { error } = await client
      .from('activity_logs')
      .insert(record);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    // Non-blocking log error
    return { success: false, error: err.message };
  }
}

// One-click migrate all local data from db.json to Supabase
async function migrateAllLocalData() {
  const client = getClient();
  if (!client) throw new Error('กรุณาตั้งค่า SUPABASE_URL และ SUPABASE_KEY ก่อนเริ่มย้ายข้อมูล');

  const users = db.get('users') || [];
  const announcements = db.get('announcements') || [];
  const questions = db.get('questions') || [];
  const submissions = db.get('submissions') || [];
  const attempts = db.get('quiz_attempts') || [];

  const results = {
    users: { total: users.length, success: 0, failed: 0 },
    announcements: { total: announcements.length, success: 0, failed: 0 },
    questions: { total: questions.length, success: 0, failed: 0 },
    submissions: { total: submissions.length, success: 0, failed: 0 },
    quiz_attempts: { total: attempts.length, success: 0, failed: 0 }
  };

  // 1. Users (in batches of 50)
  for (let i = 0; i < users.length; i += 50) {
    const batch = users.slice(i, i + 50).map(u => ({
      id: u.id,
      username: u.username,
      password_hash: u.password_hash,
      full_name: u.full_name,
      real_name: u.real_name || u.full_name,
      role: u.role || 'student',
      student_id: u.student_id || null,
      class_room: u.class_room || null,
      avatar: u.avatar || null,
      created_at: u.created_at || new Date().toISOString()
    }));
    const { error } = await client.from('users').upsert(batch, { onConflict: 'id' });
    if (error) {
      console.error('Error migrating users batch:', error.message);
      results.users.failed += batch.length;
    } else {
      results.users.success += batch.length;
    }
  }

  // 2. Announcements
  if (announcements.length > 0) {
    const batch = announcements.map(a => ({
      id: a.id,
      title: a.title,
      content: a.content,
      author: a.author,
      date: a.date || null,
      created_at: new Date().toISOString()
    }));
    const { error } = await client.from('announcements').upsert(batch, { onConflict: 'id' });
    if (error) results.announcements.failed = batch.length;
    else results.announcements.success = batch.length;
  }

  // 3. Questions
  if (questions.length > 0) {
    const batch = questions.map(q => ({
      id: q.id,
      student_id: String(q.student_id || '-'),
      student_name: q.student_name || 'นักเรียน',
      subject: q.subject,
      question: q.question,
      reply: q.reply || null,
      replied_by: q.replied_by || null,
      status: (q.status === 'replied' ? 'answered' : (q.status || 'pending')),
      created_at: q.created_at || new Date().toISOString()
    }));
    const { error } = await client.from('questions').upsert(batch, { onConflict: 'id' });
    if (error) results.questions.failed = batch.length;
    else results.questions.success = batch.length;
  }

  // 4. Submissions
  if (submissions.length > 0) {
    const batch = submissions.map(s => ({
      id: s.id,
      assignment_id: s.assignment_id,
      student_id: String(s.student_id || '-'),
      student_name: s.student_name || 'นักเรียน',
      content: s.content || null,
      file_url: s.file_url || null,
      score: s.score !== undefined ? Number(s.score) : null,
      feedback: s.feedback || null,
      status: s.status || 'submitted',
      submitted_at: s.submitted_at || new Date().toISOString()
    }));
    const { error } = await client.from('submissions').upsert(batch, { onConflict: 'id' });
    if (error) results.submissions.failed = batch.length;
    else results.submissions.success = batch.length;
  }

  // 5. Quiz Attempts
  if (attempts.length > 0) {
    const batch = attempts.map(a => ({
      id: a.id,
      quiz_id: a.quiz_id,
      student_id: String(a.student_id || '-'),
      student_name: a.student_name || 'นักเรียน',
      score: Number(a.score) || 0,
      max_score: Number(a.maxScore) || 20,
      percentage: Number(a.percentage) || 0,
      passed: Boolean(a.percentage >= 60),
      cheating_violations: Number(a.cheating_violations) || 0,
      time_spent: a.time_spent || null,
      submitted_at: a.submitted_at || new Date().toISOString()
    }));
    const { error } = await client.from('quiz_attempts').upsert(batch, { onConflict: 'id' });
    if (error) results.quiz_attempts.failed = batch.length;
    else results.quiz_attempts.success = batch.length;
  }

  return results;
}

module.exports = {
  isConfigured,
  testConnection,
  syncStudentsFromSupabase,
  saveQuizAttempt,
  saveSubmission,
  saveQuestion,
  getAnnouncementsFromSupabase,
  saveAnnouncement,
  logActivity,
  migrateAllLocalData,
  SUPABASE_URL
};
