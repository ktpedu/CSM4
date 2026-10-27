#!/usr/bin/env node
require('dotenv').config();
const { isConfigured, testConnection, migrateAllLocalData } = require('./supabaseService');

async function main() {
  console.log('====================================================');
  console.log('🚀 SUPABASE MIGRATION TOOL - วิทยาการคำนวณ ม.4');
  console.log('====================================================');

  if (!isConfigured()) {
    console.error('❌ ไม่พบการตั้งค่า Supabase ในไฟล์ .env');
    console.log('กรุณาเปิดไฟล์ .env และกรอกข้อมูล:');
    console.log('  SUPABASE_URL=https://xxxx.supabase.co');
    console.log('  SUPABASE_ANON_KEY=eyJhbGciOi...');
    console.log('  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... (แนะนำสำหรับ Migration)\n');
    process.exit(1);
  }

  console.log('🔄 กำลังทดสอบการเชื่อมต่อกับ Supabase...');
  const testRes = await testConnection();
  if (!testRes.connected) {
    console.error('❌ การเชื่อมต่อล้มเหลว:', testRes.message);
    console.log('คำแนะนำ:');
    console.log('1. ตรวจสอบว่าได้รันคำสั่งในไฟล์ supabase_schema.sql ใน Supabase SQL Editor แล้วหรือยัง');
    console.log('2. ตรวจสอบ SUPABASE_URL และ SUPABASE_KEY ในไฟล์ .env\n');
    process.exit(1);
  }

  console.log(`✅ ${testRes.message}`);
  console.log('🔄 กำลังเริ่มย้ายข้อมูลทั้งหมดจาก db.json ไปยัง Supabase...\n');

  try {
    const results = await migrateAllLocalData();
    console.log('====================================================');
    console.log('🎉 ย้ายข้อมูลไปยัง SUPABASE สำเร็จเรียบร้อยแล้ว!');
    console.log('====================================================');
    console.log(`👤 Users (นักเรียนและครู): ${results.users.success}/${results.users.total} รายการ`);
    console.log(`📢 Announcements: ${results.announcements.success}/${results.announcements.total} รายการ`);
    console.log(`❓ Questions: ${results.questions.success}/${results.questions.total} รายการ`);
    console.log(`📄 Submissions (ส่งงาน): ${results.submissions.success}/${results.submissions.total} รายการ`);
    console.log(`📝 Quiz Attempts (คะแนนสอบ): ${results.quiz_attempts.success}/${results.quiz_attempts.total} รายการ`);
    console.log('====================================================');
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดระหว่างย้ายข้อมูล:', err.message);
    process.exit(1);
  }
}

main();
