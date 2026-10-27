-- ====================================================================
-- ปรับปรุงนโยบายสิทธิ์ RLS สำหรับ Supabase (UPDATE & DELETE Policies)
-- คัดลอกโค้ดนี้ไปรันใน Supabase Dashboard -> SQL Editor
-- ====================================================================

-- 1. เพิ่มสิทธิ์ DELETE สำหรับ Users (เพื่อซิงค์ข้อมูลให้ตรงตาม Google Sheet)
CREATE POLICY "Service/Anon Delete Users" ON public.users FOR DELETE USING (true);

-- 2. เพิ่มสิทธิ์ UPDATE สำหรับ Quiz Attempts & Announcements & Logs
CREATE POLICY "Public Update Quiz Attempts" ON public.quiz_attempts FOR UPDATE USING (true);
CREATE POLICY "Admin Update Announcements" ON public.announcements FOR UPDATE USING (true);
CREATE POLICY "Public Update Activity Logs" ON public.activity_logs FOR UPDATE USING (true);

-- 3. ลบนักเรียน ม.4/11 (19 คน) ที่ไม่มีใน Google Sheet gid=0 ออกจาก Supabase ให้ตรงกัน
DELETE FROM public.users WHERE class_room = 'ม.4/11';
