-- ====================================================================
-- SUPABASE DATABASE SCHEMA FOR COMPUTER SCIENCE M.4 (วิทยาการคำนวณ ม.4)
-- ====================================================================
-- นำโค้ดนี้ไปวางและกด RUN ใน Supabase Dashboard -> SQL Editor
-- เพื่อสร้างตารางทั้งหมดที่ใช้แทน Google Sheet และ db.json
-- ====================================================================

-- 1. ตารางผู้ใช้งานและนักเรียน (Users & Students) แทนแท็บ Student ใน Google Sheet
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT,
    full_name TEXT NOT NULL,
    real_name TEXT,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
    student_id VARCHAR(20),
    class_room VARCHAR(20),
    avatar TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);
CREATE INDEX IF NOT EXISTS idx_users_student_id ON public.users(student_id);
CREATE INDEX IF NOT EXISTS idx_users_class_room ON public.users(class_room);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- 2. ตารางบันทึกผลการทำแบบทดสอบ (Quiz Attempts) แทนแท็บ QUIZZES ใน Google Sheet
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id TEXT PRIMARY KEY,
    quiz_id VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    student_name TEXT NOT NULL,
    class_room VARCHAR(20),
    score NUMERIC(5, 2) NOT NULL DEFAULT 0,
    max_score NUMERIC(5, 2) NOT NULL DEFAULT 20,
    percentage NUMERIC(5, 2) NOT NULL DEFAULT 0,
    passed BOOLEAN DEFAULT FALSE,
    cheating_violations INTEGER DEFAULT 0,
    time_spent VARCHAR(50),
    answers JSONB,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON public.quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student_id ON public.quiz_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_submitted_at ON public.quiz_attempts(submitted_at DESC);

-- 3. ตารางการส่งใบงานและโครงงาน (Submissions) แทนแท็บส่งงานใน Google Sheet
CREATE TABLE IF NOT EXISTS public.submissions (
    id TEXT PRIMARY KEY,
    assignment_id VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    student_name TEXT NOT NULL,
    class_room VARCHAR(20),
    content TEXT,
    file_url TEXT,
    score NUMERIC(5, 2),
    feedback TEXT,
    status VARCHAR(30) DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'revision_requested')),
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    graded_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON public.submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON public.submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);

-- 4. ตารางถาม-ตอบกับครูผู้สอน (Questions)
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    student_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    question TEXT NOT NULL,
    reply TEXT,
    replied_by TEXT,
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'answered')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    replied_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_questions_student ON public.questions(student_id);
CREATE INDEX IF NOT EXISTS idx_questions_status ON public.questions(status);

-- 5. ตารางประกาศข่าวสาร (Announcements)
CREATE TABLE IF NOT EXISTS public.announcements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ตารางบันทึกกิจกรรมและประวัติการทำงาน (Activity & Audit Logs) แทนแท็บ Logs
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id TEXT PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    user_name TEXT,
    student_id VARCHAR(50),
    role VARCHAR(20),
    payload JSONB,
    formatted_time TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON public.activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- อนุญาตให้เว็บแอปพลิเคชัน (Anon Key / Authenticated) อ่านและเขียนข้อมูลได้
-- ====================================================================

-- เปิดใช้งาน RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- นโยบาย Users: ทุกคนอ่านได้ และ Service Role / Anon สามารถเพิ่ม/แก้ไข/ลบได้
CREATE POLICY "Public Read Users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Service/Anon Insert Users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Service/Anon Update Users" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Service/Anon Delete Users" ON public.users FOR DELETE USING (true);

-- นโยบาย Quiz Attempts: อ่านผลคะแนนและบันทึกคะแนนสอบได้
CREATE POLICY "Public Read Quiz Attempts" ON public.quiz_attempts FOR SELECT USING (true);
CREATE POLICY "Public Insert Quiz Attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Quiz Attempts" ON public.quiz_attempts FOR UPDATE USING (true);

-- นโยบาย Submissions: อ่านและส่งงานได้
CREATE POLICY "Public Read Submissions" ON public.submissions FOR SELECT USING (true);
CREATE POLICY "Public Insert Submissions" ON public.submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Submissions" ON public.submissions FOR UPDATE USING (true);

-- นโยบาย Questions: อ่านและถามคำถามได้
CREATE POLICY "Public Read Questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public Insert Questions" ON public.questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Questions" ON public.questions FOR UPDATE USING (true);

-- นโยบาย Announcements: ทุกคนอ่านได้
CREATE POLICY "Public Read Announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Admin Insert Announcements" ON public.announcements FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Update Announcements" ON public.announcements FOR UPDATE USING (true);

-- นโยบาย Activity Logs: บันทึกและอ่านได้
CREATE POLICY "Public Read Activity Logs" ON public.activity_logs FOR SELECT USING (true);
CREATE POLICY "Public Insert Activity Logs" ON public.activity_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Activity Logs" ON public.activity_logs FOR UPDATE USING (true);
