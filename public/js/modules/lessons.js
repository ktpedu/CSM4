// --- 1. HOME DASHBOARD DATA ---
async function loadHomeData() {
  await loadAnnouncementsRealtime(false);
}



// --- 2. UNITS SHOWCASE (2-COLUMN LAYOUT WITH ILLUSTRATIONS) ---
function getUnitsShowcaseHtml() {
  return `
          <!-- TWO-COLUMN PROMINENT SHOWCASE GRID AS REQUESTED BY USER -->
          <div class="units-showcase-container" style="margin-top: 15px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(460px, 1fr)); gap: 24px;">
              
              <!-- ==========================================
                   CARD 1: UNIT 1 (LEFT ORANGE BOX)
                   ========================================== -->
              <div class="glass-card" style="border-radius: 20px; overflow: hidden; border: 2px solid rgba(0, 180, 0, 0.3); box-shadow: 0 10px 25px rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  
<div style="width: 100%; border-radius: 16px 16px 0 0; overflow: hidden; background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%);">
  <svg viewBox="0 0 600 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display: block; font-family: 'Kanit', 'Sarabun', sans-serif;">
    <defs>
      <linearGradient id="u1-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#0284c7" stop-opacity="0.05"/>
      </linearGradient>
    </defs>
    
    <!-- Background Glow & Grid -->
    <rect width="600" height="240" fill="url(#u1-glow)"/>
    <circle cx="80" cy="190" r="120" fill="#10b981" opacity="0.1"/>
    <circle cx="520" cy="50" r="100" fill="#0284c7" opacity="0.1"/>

    <!-- Central Decorative Elements -->
    <!-- Center Badge: CT + SDLC Core -->
    <circle cx="300" cy="115" r="50" fill="#1e293b" stroke="#10b981" stroke-width="2.5"/>
    <text x="300" y="108" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">แนวคิด</text>
    <text x="300" y="126" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">เชิงคำนวณ</text>
    <text x="300" y="140" fill="#94a3b8" font-size="8" text-anchor="middle">CT &amp; SDLC</text>

    <!-- 4 Pillars Connected Nodes -->
    <!-- Pillar 1: Decomposition -->
    <line x1="300" y1="115" x2="120" y2="60" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3"/>
    <rect x="30" y="35" width="170" height="50" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <circle cx="52" cy="60" r="12" fill="#0284c7"/>
    <text x="52" y="65" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">1</text>
    <text x="74" y="55" fill="#38bdf8" font-size="11" font-weight="bold">Decomposition</text>
    <text x="74" y="72" fill="#cbd5e1" font-size="9">การแยกย่อยปัญหา</text>

    <!-- Pillar 2: Pattern Recognition -->
    <line x1="300" y1="115" x2="480" y2="60" stroke="#34d399" stroke-width="2" stroke-dasharray="3"/>
    <rect x="400" y="35" width="170" height="50" rx="8" fill="#0f172a" stroke="#34d399" stroke-width="1.5"/>
    <circle cx="422" cy="60" r="12" fill="#059669"/>
    <text x="422" y="65" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">2</text>
    <text x="444" y="55" fill="#34d399" font-size="11" font-weight="bold">Pattern Recognition</text>
    <text x="444" y="72" fill="#cbd5e1" font-size="9">การจดจำรูปแบบ</text>

    <!-- Pillar 3: Abstraction -->
    <line x1="300" y1="115" x2="120" y2="170" stroke="#fbbf24" stroke-width="2" stroke-dasharray="3"/>
    <rect x="30" y="145" width="170" height="50" rx="8" fill="#0f172a" stroke="#fbbf24" stroke-width="1.5"/>
    <circle cx="52" cy="170" r="12" fill="#d97706"/>
    <text x="52" y="175" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">3</text>
    <text x="74" y="165" fill="#fbbf24" font-size="11" font-weight="bold">Abstraction</text>
    <text x="74" y="182" fill="#cbd5e1" font-size="9">การคิดเชิงนามธรรม</text>

    <!-- Pillar 4: Algorithm -->
    <line x1="300" y1="115" x2="480" y2="170" stroke="#f87171" stroke-width="2" stroke-dasharray="3"/>
    <rect x="400" y="145" width="170" height="50" rx="8" fill="#0f172a" stroke="#f87171" stroke-width="1.5"/>
    <circle cx="422" cy="170" r="12" fill="#dc2626"/>
    <text x="422" y="175" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">4</text>
    <text x="444" y="165" fill="#f87171" font-size="11" font-weight="bold">Algorithm Design</text>
    <text x="444" y="182" fill="#cbd5e1" font-size="9">ขั้นตอนวิธี &amp; ผังงาน</text>

    <!-- Bottom Ribbon -->
    <rect x="0" y="210" width="600" height="30" fill="rgba(0, 180, 0, 0.2)"/>
    <text x="300" y="228" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">หน่วยการเรียนรู้ที่ 1 • วิทยาการคำนวณ ม.4 • 20 ชั่วโมง • 3 หัวข้อหลัก</text>
  </svg>
</div>

                  <div style="padding: 24px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
                      <span style="background: rgba(0, 180, 0, 0.12); color: #10b981; font-weight: 800; font-size: 0.76rem; padding: 4px 12px; border-radius: 999px; letter-spacing: 0.5px;">
                        <i class="fa-solid fa-graduation-cap mr-1"></i> หน่วยการเรียนรู้ที่ 1 • 20 ชั่วโมง
                      </span>
                      <span style="font-size: 0.74rem; color: var(--text-muted); font-weight: 600;">ตัวชี้วัด ว 4.2 ม.4/1</span>
                    </div>

                    <h3 style="font-family: 'Kanit', sans-serif; font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; line-height: 1.3;">
                      แนวคิดเชิงคำนวณในการพัฒนาโครงงาน
                    </h3>
                    <div style="font-size: 0.8rem; font-weight: 600; color: #10b981; margin-bottom: 12px;">
                      Computational Thinking in Project Development
                    </div>

                    <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 18px;">
                      ศึกษา 4 องค์ประกอบของแนวคิดเชิงคำนวณ การแก้ปัญหาด้วยวงจรการพัฒนาระบบ SDLC 5 ขั้นตอน และโครงสร้างการเขียนรายงานโครงงานคอมพิวเตอร์ 5 บท
                    </p>

                    <!-- Subtopics List -->
                    <div class="unit-subtopics-box">
                      <div class="unit-subtopics-title">
                        <i class="fa-solid fa-list-check text-emerald-600"></i> เนื้อหาสำคัญ 3 หัวข้อการเรียนรู้:
                      </div>
                      <ul class="unit-subtopics-list">
                        <li>
                          <i class="fa-solid fa-check-circle text-emerald-600" style="margin-top: 4px;"></i>
                          <span><strong>1.1 แนวคิดเชิงคำนวณ:</strong> 4 องค์ประกอบ (Decomposition, Pattern, Abstraction, Algorithm) &amp; กรณีศึกษารถของตะวัน</span>
                        </li>
                        <li>
                          <i class="fa-solid fa-check-circle text-emerald-600" style="margin-top: 4px;"></i>
                          <span><strong>1.2 วงจรการพัฒนาระบบ (SDLC):</strong> 5 ขั้นตอน, ผัง Gantt Chart 20 สัปดาห์, แผนภาพ DFD, พีระมิดทดสอบ 4 ระดับ</span>
                        </li>
                        <li>
                          <i class="fa-solid fa-check-circle text-emerald-600" style="margin-top: 4px;"></i>
                          <span><strong>1.3 การเขียนรายงานโครงงาน:</strong> 3 ส่วนหลัก 5 บท, ผังเค้าโครงโครงงาน (Proposal) &amp; บรรณานุกรม APA</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- CTA Action Buttons -->
                <div style="padding: 0 24px 24px 24px; display: flex; flex-direction: column; gap: 10px;">
                  <a href="unit1.html" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px 20px; background: #047857; color: #ffffff; font-weight: 700; font-size: 0.95rem; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(0,180,0,0.25); transition: all 0.2s;">
                    <i class="fa-solid fa-book-open"></i> เข้าสู่บทเรียน หน่วยที่ 1 (ฉบับสมบูรณ์)
                  </a>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                    <button onclick="openSlideModal('sld-1')" class="btn-web-slides">
                      <i class="fa-solid fa-file-powerpoint text-amber-600"></i> สไลด์ในเว็บ
                    </button>
                    <a href="https://docs.google.com/presentation/d/1dD2oGk7sxJ4mDpGfcFwCwqtPf1bpyQzvPlNtX74Dw9Y/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 10px 12px; background: #f59e0b; color: #ffffff; font-weight: 700; font-size: 0.82rem; border-radius: 10px; text-decoration: none; transition: all 0.2s; box-shadow: 0 2px 8px rgba(245,158,11,0.25);">
                      <i class="fa-solid fa-arrow-up-right-from-square"></i> Google Slides ↗
                    </a>
                  </div>
                </div>
              </div>

              <!-- ==========================================
                   CARD 2: UNIT 2 (RIGHT ORANGE BOX)
                   ========================================== -->
              <div class="glass-card" style="border-radius: 20px; overflow: hidden; border: 2px solid rgba(2, 132, 199, 0.3); box-shadow: 0 10px 25px rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  
<div style="width: 100%; border-radius: 16px 16px 0 0; overflow: hidden; background: linear-gradient(135deg, #0c4a6e 0%, #1e1b4b 100%);">
  <svg viewBox="0 0 600 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display: block; font-family: 'Kanit', 'Sarabun', sans-serif;">
    <defs>
      <linearGradient id="u2-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#ec4899" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    
    <!-- Background Glow & Grid -->
    <rect width="600" height="240" fill="url(#u2-glow)"/>
    <circle cx="100" cy="190" r="110" fill="#0284c7" opacity="0.12"/>
    <circle cx="500" cy="50" r="110" fill="#e11d48" opacity="0.12"/>

    <!-- Left Box: Case 1 - Library Web App Mockup -->
    <g transform="translate(30, 25)">
      <rect x="0" y="0" width="245" height="170" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8"/>
      <!-- Window Title -->
      <rect x="0" y="0" width="245" height="24" rx="10" fill="#1e293b"/>
      <circle cx="12" cy="12" r="3.5" fill="#ef4444"/>
      <circle cx="22" cy="12" r="3.5" fill="#f59e0b"/>
      <circle cx="32" cy="12" r="3.5" fill="#10b981"/>
      <text x="125" y="16" fill="#94a3b8" font-size="8" text-anchor="middle">กรณีศึกษาที่ 1: เว็บไซต์ห้องสมุด</text>
      <!-- Inside Screen -->
      <rect x="12" y="32" width="221" height="22" rx="4" fill="#0284c7"/>
      <text x="22" y="46" fill="#ffffff" font-size="9" font-weight="bold">📚 ระบบแนะนำการใช้งานห้องสมุด</text>
      <!-- Search bar -->
      <rect x="12" y="60" width="221" height="18" rx="9" fill="#1e293b" stroke="#334155"/>
      <text x="22" y="72" fill="#64748b" font-size="7">🔍 ค้นหาหนังสือตามหมวดดิวอี้ 000-900...</text>
      <!-- Cards grid -->
      <rect x="12" y="85" width="68" height="50" rx="4" fill="#1e293b" stroke="#0284c7"/>
      <text x="46" y="105" fill="#38bdf8" font-size="7" font-weight="bold" text-anchor="middle">กฎระเบียบ</text>
      <text x="46" y="122" fill="#94a3b8" font-size="6" text-anchor="middle">ยืม-คืน 7 วัน</text>

      <rect x="88" y="85" width="68" height="50" rx="4" fill="#1e293b" stroke="#10b981"/>
      <text x="122" y="105" fill="#34d399" font-size="7" font-weight="bold" text-anchor="middle">ผังชั้นวาง 2D</text>
      <text x="122" y="122" fill="#94a3b8" font-size="6" text-anchor="middle">โซน A/B/C</text>

      <rect x="165" y="85" width="68" height="50" rx="4" fill="#1e293b" stroke="#f59e0b"/>
      <text x="199" y="105" fill="#fbbf24" font-size="7" font-weight="bold" text-anchor="middle">สืบค้นหมวดหมู่</text>
      <text x="199" y="122" fill="#94a3b8" font-size="6" text-anchor="middle">Call Number</text>

      <rect x="12" y="142" width="221" height="18" rx="4" fill="rgba(2, 132, 199, 0.15)"/>
      <text x="122" y="154" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">Responsive Web Application (HTML/CSS/JS)</text>
    </g>

    <!-- Center Bridge Icon -->
    <circle cx="300" cy="110" r="18" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
    <text x="300" y="115" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle">&amp;</text>

    <!-- Right Box: Case 2 - Medicine Reminder Mobile App Mockup -->
    <g transform="translate(325, 25)">
      <rect x="0" y="0" width="245" height="170" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="1.8"/>
      <!-- Window Title -->
      <rect x="0" y="0" width="245" height="24" rx="10" fill="#1e293b"/>
      <circle cx="12" cy="12" r="3.5" fill="#ef4444"/>
      <circle cx="22" cy="12" r="3.5" fill="#f59e0b"/>
      <circle cx="32" cy="12" r="3.5" fill="#10b981"/>
      <text x="125" y="16" fill="#94a3b8" font-size="8" text-anchor="middle">กรณีศึกษาที่ 2: โปรแกรมแจ้งเตือนกินยา</text>
      <!-- Inside Mobile Screen Mockup -->
      <rect x="12" y="32" width="221" height="22" rx="4" fill="#e11d48"/>
      <text x="22" y="46" fill="#ffffff" font-size="9" font-weight="bold">⏰ แอป nMeMo (Health Tech)</text>
      <!-- Alarm alert box -->
      <rect x="12" y="60" width="221" height="38" rx="6" fill="#1e293b" stroke="#f43f5e"/>
      <circle cx="30" cy="79" r="10" fill="#e11d48"/>
      <text x="30" y="83" fill="#ffffff" font-size="9" text-anchor="middle">🔔</text>
      <text x="48" y="74" fill="#fca5a5" font-size="8" font-weight="bold">ถึงเวลาทานยาเช้า (08:00 น.)</text>
      <text x="48" y="88" fill="#94a3b8" font-size="7">ยาลดความดัน 1 เม็ด • ก่อนอาหาร</text>

      <!-- Elderly big buttons -->
      <rect x="12" y="104" width="106" height="28" rx="6" fill="#10b981"/>
      <text x="65" y="121" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">✓ ทานยาแล้ว</text>

      <rect x="127" y="104" width="106" height="28" rx="6" fill="#334155"/>
      <text x="180" y="121" fill="#e2e8f0" font-size="8" font-weight="bold" text-anchor="middle">เตือนซ้ำ (Snooze)</text>

      <rect x="12" y="142" width="221" height="18" rx="4" fill="rgba(225, 29, 72, 0.15)"/>
      <text x="122" y="154" fill="#fda4af" font-size="8" font-weight="bold" text-anchor="middle">Mobile App สำหรับผู้สูงอายุ + เชื่อมโยง รพ.</text>
    </g>

    <!-- Bottom Ribbon -->
    <rect x="0" y="210" width="600" height="30" fill="rgba(2, 132, 199, 0.2)"/>
    <text x="300" y="228" fill="#bae6fd" font-size="10" font-weight="bold" text-anchor="middle">หน่วยการเรียนรู้ที่ 2 • วิทยาการคำนวณ ม.4 • 20 ชั่วโมง • 2 โครงงานจริง</text>
  </svg>
</div>

                  <div style="padding: 24px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
                      <span style="background: rgba(2, 132, 199, 0.12); color: #0284c7; font-weight: 800; font-size: 0.76rem; padding: 4px 12px; border-radius: 999px; letter-spacing: 0.5px;">
                        <i class="fa-solid fa-laptop-code mr-1"></i> หน่วยการเรียนรู้ที่ 2 • 20 ชั่วโมง
                      </span>
                      <span style="font-size: 0.74rem; color: var(--text-muted); font-weight: 600;">Project-Based Learning</span>
                    </div>

                    <h3 style="font-family: 'Kanit', sans-serif; font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; line-height: 1.3;">
                      การประยุกต์ใช้แนวคิดเชิงคำนวณเพื่อพัฒนาโครงงาน
                    </h3>
                    <div style="font-size: 0.8rem; font-weight: 600; color: #0284c7; margin-bottom: 12px;">
                      Applied Computational Thinking for Projects
                    </div>

                    <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 18px;">
                      ฝึกปฏิบัติการทำโครงงานจริงผ่าน 2 กรณีศึกษา: เว็บไซต์แนะนำการใช้งานห้องสมุด (Web App) และโปรแกรมแจ้งเตือนการกินยาผ่านสมาร์ตโฟน (Health Tech) ตามวงจร SDLC 5 ขั้นตอน
                    </p>

                    <!-- Subtopics List -->
                    <div class="unit-subtopics-box unit2-box">
                      <div class="unit-subtopics-title">
                        <i class="fa-solid fa-folder-open text-sky-600"></i> กรณีศึกษาและกิจกรรม 3 ส่วน:
                      </div>
                      <ul class="unit-subtopics-list">
                        <li>
                          <i class="fa-solid fa-check-circle text-sky-600" style="margin-top: 4px;"></i>
                          <span><strong>กรณีศึกษาที่ 1 (ห้องสมุด):</strong> เว็บสารสนเทศ, แยกย่อย 4 โมดูล, DFD Level 1, หมวดหมู่ดิวอี้ &amp; UI Responsive</span>
                        </li>
                        <li>
                          <i class="fa-solid fa-check-circle text-sky-600" style="margin-top: 4px;"></i>
                          <span><strong>กรณีศึกษาที่ 2 (เตือนกินยา):</strong> Mobile App สุขภาพ, 10 กลุ่มงาน, ผังงาน Snooze Logic &amp; UI เพื่อผู้สูงอายุ</span>
                        </li>
                        <li>
                          <i class="fa-solid fa-check-circle text-sky-600" style="margin-top: 4px;"></i>
                          <span><strong>ท้ายหน่วยการเรียนรู้:</strong> สรุปเปรียบเทียบ Web vs Mobile, กิจกรรม Project Pitch &amp; แบบทดสอบทบทวน</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- CTA Action Buttons -->
                <div style="padding: 0 24px 24px 24px; display: flex; flex-direction: column; gap: 10px;">
                  <a href="unit2.html" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px 20px; background: #0369a1; color: #ffffff; font-weight: 700; font-size: 0.95rem; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(3,105,161,0.25); transition: all 0.2s;">
                    <i class="fa-solid fa-laptop-code"></i> เข้าสู่บทเรียน หน่วยที่ 2 (ฉบับสมบูรณ์)
                  </a>
                  <button onclick="showToast('สไลด์ประกอบการสอน หน่วยที่ 2 อยู่ระหว่างจัดทำโดยครูผู้สอน จะเปิดให้อ่านเร็วๆ นี้ครับ', 'info')" class="btn-prep-slides">
                    <i class="fa-solid fa-hourglass-half text-slate-400"></i> สไลด์ประกอบการสอน (อยู่ระหว่างจัดทำ)
                  </button>
                </div>
              </div>

            </div>
          </div>
`;
}

async function loadLessonsData() {
  const container = document.getElementById('modules-container');
  if (!container) return;

  // Always display the 2-column showcase with rich illustrations as requested
  container.innerHTML = getUnitsShowcaseHtml();
}

function formatLessonBody(content) {
  if (!content) return '';
  if (content.includes('<div') || content.includes('<svg') || content.includes('<section') || content.includes('<table')) {
    return content;
  }
  return content
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('# ')) return `<h1 class="text-2xl font-bold text-slate-900 mt-6 mb-3">${block.slice(2)}</h1>`;
      if (block.startsWith('## ')) return `<h2 class="text-xl font-bold text-slate-800 mt-5 mb-2">${block.slice(3)}</h2>`;
      if (block.startsWith('### ')) return `<h3 class="text-lg font-bold text-slate-800 mt-4 mb-2">${block.slice(4)}</h3>`;
      if (block.startsWith('- ')) {
        const items = block.split('\n').map(l => l.replace(/^[-*]\s+/, '').trim()).filter(Boolean);
        return `<ul class="list-disc pl-5 space-y-1 my-2">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
      }
      return `<p class="my-2">${block.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');
}

async function viewLessonDetail(lessonId) {
  try {
    const lesson = await apiFetch(`/lessons/${lessonId}`);
    const container = document.getElementById('modules-container');

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-6 lg:p-10 space-y-6">
        <button onclick="loadLessonsData()" class="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
          <i class="fa-solid fa-arrow-left"></i> ย้อนกลับไปรายการบทเรียน
        </button>

        <div class="border-b border-slate-200 pb-4 space-y-2">
          <h2 class="text-2xl font-bold text-slate-800">${lesson.title}</h2>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <i class="fa-regular fa-clock mr-1"></i> ${lesson.duration}
            </span>
            <button onclick="playLessonVideo('${lesson.title}', '${lesson.videoUrl}')" class="bg-rose-100 text-rose-800 font-bold px-3 py-1 rounded-full hover:bg-rose-200">
              <i class="fa-solid fa-play mr-1"></i> ดูวิดีโอประกอบบทเรียน
            </button>
            ${lesson.module_id === 'mod-1' ? `
              <a href="unit1.html" target="_blank" class="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full hover:bg-emerald-200 inline-flex items-center gap-1">
                <i class="fa-solid fa-book-open mr-1"></i> เข้าสู่บทเรียน หน่วยที่ 1 ฉบับสมบูรณ์
              </a>` : ''}
            ${lesson.module_id === 'mod-2' ? `
              <a href="unit2.html" target="_blank" class="bg-sky-100 text-sky-800 font-bold px-3 py-1 rounded-full hover:bg-sky-200 inline-flex items-center gap-1">
                <i class="fa-solid fa-laptop-code mr-1"></i> เข้าสู่บทเรียน หน่วยที่ 2 ฉบับสมบูรณ์
              </a>` : ''}
          </div>
        </div>

        <div class="lesson-article text-sm leading-relaxed">
          ${formatLessonBody(lesson.content)}
        </div>
      </div>
    `;
  } catch (err) {
    console.error('Lesson view error:', err);
  }
}

function playLessonVideo(title, url) {
  document.getElementById('video-modal-title').innerText = title;
  document.getElementById('video-iframe').src = url || 'https://www.youtube.com/embed/mUXo-E183Sc';
  openModal('modal-video-player');
}


// --- 3. MEDIA & PRESENTATION SLIDES ---
const OFFLINE_SLIDES = [
  {
    id: "sld-1",
    unit: "หน่วยการเรียนรู้ที่ 1",
    unitNumber: 1,
    title: "สไลด์ประกอบการสอน: แนวคิดเชิงคำนวณในการพัฒนาโครงงาน",
    description: "สไลด์บรรยายสรุป 4 องค์ประกอบ: การแยกย่อย (Decomposition), การหารูปแบบ (Pattern), การคิดเชิงนามธรรม (Abstraction) และขั้นตอนวิธี (Algorithm)",
    slideCount: "Google Slides (พร้อมใช้งาน)",
    slideUrl: "https://docs.google.com/presentation/d/1dD2oGk7sxJ4mDpGfcFwCwqtPf1bpyQzvPlNtX74Dw9Y/edit?usp=sharing",
    embedUrl: "https://docs.google.com/presentation/d/1dD2oGk7sxJ4mDpGfcFwCwqtPf1bpyQzvPlNtX74Dw9Y/embed?start=false&loop=false&delayms=3000",
    isReady: true,
    previewImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"
  },
  {
    id: "sld-2",
    unit: "หน่วยการเรียนรู้ที่ 2",
    unitNumber: 2,
    title: "สไลด์ประกอบการสอน: การแก้ปัญหาด้วยภาษาคอมพิวเตอร์และการพัฒนาโครงงาน",
    description: "สรุปวงจรการพัฒนาระบบ SDLC, การเขียนผังงาน (Flowchart) และการทดสอบระบบ (ครูผู้สอนกำลังจัดเตรียมเนื้อหา)",
    slideCount: "อยู่ระหว่างจัดทำ (เร็วๆ นี้)",
    slideUrl: "",
    embedUrl: "",
    isReady: false,
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
  },
  {
    id: "sld-3",
    unit: "หน่วยการเรียนรู้ที่ 3",
    unitNumber: 3,
    title: "สไลด์ประกอบการสอน: โครงงานคอมพิวเตอร์เพื่อการแก้ปัญหาชุมชน",
    description: "แนวทางการเขียนรายงานโครงงาน 5 บท และการนำเสนอผลงาน (ครูผู้สอนกำลังจัดเตรียมเนื้อหา)",
    slideCount: "อยู่ระหว่างจัดทำ (เร็วๆ นี้)",
    slideUrl: "",
    embedUrl: "",
    isReady: false,
    previewImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80"
  }
];

const OFFLINE_VIDEOS = [
  {
    id: "les-101",
    unit: "หน่วยการเรียนรู้ที่ 1",
    title: "1.1 แนวคิดเชิงคำนวณ (Computational Thinking)",
    duration: "5 ชั่วโมง",
    videoUrl: "https://www.youtube.com/embed/mUXo-E183Sc"
  },
  {
    id: "les-102",
    unit: "หน่วยการเรียนรู้ที่ 1",
    title: "1.2 การพัฒนาโครงงานทางด้านเทคโนโลยีสารสนเทศด้วยวงจรการพัฒนาระบบ (SDLC)",
    duration: "5 ชั่วโมง",
    videoUrl: "https://www.youtube.com/embed/Fi3_BjVzpqk"
  },
  {
    id: "les-103",
    unit: "หน่วยการเรียนรู้ที่ 1",
    title: "1.3 การเขียนรายงานการพัฒนาโครงงาน",
    duration: "10 ชั่วโมง",
    videoUrl: "https://www.youtube.com/embed/2_sample_vid3"
  },
  {
    id: "les-201",
    unit: "หน่วยการเรียนรู้ที่ 2",
    title: "2.1 กรณีศึกษาที่ 1: โครงงานพัฒนาเว็บไซต์แนะนำการใช้งานห้องสมุด (การวางแผนและวิเคราะห์)",
    duration: "5 ชั่วโมง",
    videoUrl: "https://www.youtube.com/embed/2_sample_vid4"
  },
  {
    id: "les-202",
    unit: "หน่วยการเรียนรู้ที่ 2",
    title: "2.2 กรณีศึกษาที่ 1: โครงงานพัฒนาเว็บไซต์แนะนำการใช้งานห้องสมุด (การออกแบบ พัฒนา และทดสอบ)",
    duration: "5 ชั่วโมง",
    videoUrl: "https://www.youtube.com/embed/2_sample_vid5"
  },
  {
    id: "les-203",
    unit: "หน่วยการเรียนรู้ที่ 2",
    title: "2.3 กรณีศึกษาที่ 2: โครงงานพัฒนาโปรแกรมแจ้งเตือนการกินยาผ่านสมาร์ตโฟนหรือแท็บเล็ต (การวางแผนและวิเคราะห์)",
    duration: "5 ชั่วโมง",
    videoUrl: "https://www.youtube.com/embed/2_sample_vid6"
  },
  {
    id: "les-204",
    unit: "หน่วยการเรียนรู้ที่ 2",
    title: "2.4 กรณีศึกษาที่ 2: โครงงานพัฒนาโปรแกรมแจ้งเตือนการกินยาผ่านสมาร์ตโฟนหรือแท็บเล็ต (การออกแบบ UI และสรุป)",
    duration: "5 ชั่วโมง",
    videoUrl: "https://www.youtube.com/embed/2_sample_vid7"
  }
];

async function loadMediaData() {
  try {
    let slides = OFFLINE_SLIDES;
    try {
      const serverSlides = await apiFetch('/slides');
      if (Array.isArray(serverSlides) && serverSlides.length > 0) {
        slides = serverSlides;
      }
    } catch (e) {
      // Offline fallback used
    }

    const container = document.getElementById('slides-container');
    if (container) {
      container.innerHTML = slides.map(sld => {
        const isReady = sld.isReady !== false && sld.slideUrl;
        const badgeClass = isReady ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-slate-100 text-slate-500 border-slate-200';
        const readyBadge = isReady 
          ? '<span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> พร้อมใช้งาน</span>'
          : '<span class="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1"><i class="fa-solid fa-clock"></i> อยู่ระหว่างจัดทำ</span>';

        const btnClass = isReady 
          ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer shadow-md active:scale-95' 
          : 'bg-slate-200 text-slate-500 hover:bg-slate-300 cursor-pointer';
        const btnText = isReady 
          ? '<i class="fa-solid fa-file-powerpoint mr-1"></i> เปิดดูสไลด์ (Google Slides)' 
          : '<i class="fa-solid fa-hourglass-half mr-1"></i> อยู่ระหว่างจัดทำ (เร็วๆ นี้)';
        const onClickAction = isReady 
          ? `openSlideModal('${sld.id}')` 
          : `showToast('สไลด์ประกอบการสอนประจำ${sld.unit} อยู่ระหว่างจัดทำโดยครูผู้สอน จะเปิดให้อ่านเร็วๆ นี้ครับ', 'info')`;

        return `
          <div class="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 glass-card-hover flex flex-col justify-between space-y-4" style="transition: all 0.2s; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
            <div class="space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold ${badgeClass} border px-2.5 py-0.5 rounded-full">
                  ${sld.unit}
                </span>
                ${readyBadge}
              </div>
              <h4 class="font-bold text-sm text-slate-800 leading-snug">${sld.title}</h4>
              <p class="text-xs text-slate-500 leading-relaxed">${sld.description}</p>
            </div>
            <div class="space-y-2 pt-1">
              <button onclick="${onClickAction}" class="w-full ${btnClass} text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5">
                ${btnText}
              </button>
              ${isReady && sld.slideUrl ? `
                <a href="${sld.slideUrl}" target="_blank" rel="noopener noreferrer" class="w-full text-center text-[11px] font-semibold text-amber-600 hover:text-amber-800 py-1 hover:underline flex items-center justify-center gap-1">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> เปิดใน Google Slides แท็บใหม่ ↗
                </a>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    // Load video gallery
    let allLessons = OFFLINE_VIDEOS;
    try {
      const modules = await apiFetch('/modules');
      if (Array.isArray(modules) && modules.length > 0) {
        const lessonsFromModules = modules.flatMap(m => m.lessons || []);
        if (lessonsFromModules.length > 0) allLessons = lessonsFromModules;
      }
    } catch (e) {
      // Offline fallback used
    }

    const videosContainer = document.getElementById('videos-container');
    if (videosContainer) {
      videosContainer.innerHTML = allLessons.map(les => `
        <div class="p-4 rounded-2xl border border-slate-200 bg-white hover:border-rose-300 glass-card-hover flex flex-col justify-between space-y-3" style="transition: all 0.2s;">
          <div class="space-y-1">
            <span class="text-[10px] font-bold text-rose-600"><i class="fa-solid fa-play-circle mr-1"></i> วิดีโอสอน</span>
            <h4 class="font-bold text-xs text-slate-800 line-clamp-2">${les.title}</h4>
            <p class="text-[11px] text-slate-400"><i class="fa-regular fa-clock mr-1"></i> ${les.duration || '5 ชั่วโมง'}</p>
          </div>
          <button onclick="playLessonVideo('${escapeHtml(les.title)}', '${les.videoUrl}')" class="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2 rounded-xl transition shadow-sm flex items-center justify-center gap-1">
            <i class="fa-solid fa-play mr-1"></i> รับชมวิดีโอการสอนนี้
          </button>
        </div>
      `).join('');
    }

  } catch (err) {
    console.error('Media load error:', err);
  }
}

async function openSlideModal(slideId) {
  try {
    let slide = null;
    if (typeof OFFLINE_SLIDES !== 'undefined') {
      slide = OFFLINE_SLIDES.find(s => s.id === slideId || s.unitNumber === Number(slideId));
    }
    if (!slide) {
      try {
        slide = await apiFetch(`/slides/${slideId}`);
      } catch (e) {
        // Fallback
      }
    }
    if (!slide && typeof OFFLINE_SLIDES !== 'undefined') {
      slide = OFFLINE_SLIDES[0];
    }
    if (!slide) {
      showToast('ไม่พบข้อมูลสไลด์ประกอบการสอน', 'warning');
      return;
    }

    if (!slide.isReady && !slide.slideUrl) {
      showToast(`สไลด์ประกอบการสอนประจำ${slide.unit} อยู่ระหว่างจัดทำโดยครูผู้สอน จะเปิดให้อ่านเร็วๆ นี้ครับ`, 'info');
      return;
    }

    activeSlideDeck = slide;
    currentSlideIndex = 0;

    const titleEl = document.getElementById('slide-modal-title');
    if (titleEl) titleEl.innerText = slide.title;
    const unitEl = document.getElementById('slide-modal-unit');
    if (unitEl) unitEl.innerText = slide.unit;

    const extLink = document.getElementById('slide-modal-external-link');
    if (extLink) {
      extLink.href = slide.slideUrl || 'https://docs.google.com/presentation/d/1dD2oGk7sxJ4mDpGfcFwCwqtPf1bpyQzvPlNtX74Dw9Y/edit?usp=sharing';
    }

    const iframe = document.getElementById('slide-iframe');
    const iframeContainer = document.getElementById('slide-iframe-container');
    const cardContainer = document.getElementById('slide-card-container');
    const cardNav = document.getElementById('slide-card-nav');

    if (slide.embedUrl && iframe) {
      iframe.src = slide.embedUrl;
      if (iframeContainer) iframeContainer.style.display = 'block';
      if (cardContainer) cardContainer.style.display = 'none';
      if (cardNav) cardNav.style.display = 'none';
    } else if (slide.slides && slide.slides.length > 0) {
      if (iframeContainer) iframeContainer.style.display = 'none';
      if (cardContainer) cardContainer.style.display = 'block';
      if (cardNav) cardNav.style.display = 'flex';
      renderSlideCard();
    }

    openModal('modal-slide-viewer');
  } catch (err) {
    console.error('Slide open error:', err);
  }
}

function openSlideDeck(unitNum = 1) {
  const targetId = unitNum === 2 ? 'sld-2' : unitNum === 3 ? 'sld-3' : 'sld-1';
  openSlideModal(targetId);
}

function renderSlideCard() {
  if (!activeSlideDeck || !activeSlideDeck.slides) return;
  const slide = activeSlideDeck.slides[currentSlideIndex];
  const total = activeSlideDeck.slides.length;

  const counterEl = document.getElementById('slide-page-counter');
  if (counterEl) counterEl.innerText = `SLIDE ${currentSlideIndex + 1} OF ${total}`;
  const titleEl = document.getElementById('slide-card-title');
  if (titleEl) titleEl.innerText = slide.title;
  const noteEl = document.getElementById('slide-card-note');
  if (noteEl) noteEl.innerText = slide.note;
  const indEl = document.getElementById('slide-indicator');
  if (indEl) indEl.innerText = `${currentSlideIndex + 1} / ${total}`;
}

function nextSlide() {
  if (!activeSlideDeck || !activeSlideDeck.slides) return;
  if (currentSlideIndex < activeSlideDeck.slides.length - 1) {
    currentSlideIndex++;
    renderSlideCard();
  }
}

function prevSlide() {
  if (!activeSlideDeck || !activeSlideDeck.slides) return;
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    renderSlideCard();
  }
}

// --- 4. E-BOOK READER DATA ---
async function loadEbookData() {
  try {
    let ebooks = [];
    try {
      ebooks = await apiFetch('/ebooks');
    } catch (e) {
      ebooks = [];
    }
    const book = (ebooks && ebooks.length > 0) ? ebooks[0] : null;

    const chapters = (book && book.chapters) ? book.chapters : [
      { name: 'หน้าปก & ข้อมูลคู่มือนักเรียน', page: 1, badge: 'หน้าแรก' },
      { name: 'คำนำและคำชี้แจงสำหรับนักเรียน', page: 2, badge: 'คำนำ' },
      { name: 'แผนผังสมรรถนะและแนวทางการเรียนรู้', page: 3, badge: 'คำแนะนำ' },
      { name: 'สารบัญโครงสร้างเนื้อหา', page: 4, badge: 'สารบัญ' },
      { name: 'หน่วยที่ 1: แนวคิดเชิงคำนวณและขั้นตอนวิธี (เรื่องที่ 1)', page: 5, badge: 'เรื่อง 1' },
      { name: 'เรื่องที่ 2: วงจรการพัฒนาระบบและการกำหนดปัญหา (SDLC)', page: 8, badge: 'เรื่อง 2' },
      { name: 'เรื่องที่ 3: การวางแผนและการจัดทำเค้าโครงโครงงาน', page: 10, badge: 'เรื่อง 3' },
      { name: 'หน่วยที่ 2: การออกแบบและพัฒนาโครงงานสารสนเทศ (เรื่องที่ 4)', page: 12, badge: 'เรื่อง 4' },
      { name: 'เรื่องที่ 5: การพัฒนาและการทดสอบระบบ (Testing Hierarchy)', page: 14, badge: 'เรื่อง 5' },
      { name: 'เรื่องที่ 6: กฎหมาย PDPA และจริยธรรมดิจิทัล', page: 15, badge: 'เรื่อง 6' },
      { name: 'ภาคผนวก: เกณฑ์การประเมินโครงงาน (Analytic Rubrics)', page: 16, badge: 'ภาคผนวก' }
    ];

    const container = document.getElementById('ebook-chapters-list');
    if (container) {
      container.innerHTML = chapters.map(ch => `
        <button onclick="jumpToPdfPage(${ch.page || 1})" class="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/60 transition shadow-sm flex items-center justify-between group">
          <div class="pr-2">
            <span class="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${ch.badge && ch.badge.startsWith('หน่วย') ? 'bg-sky-100 text-sky-800' : ch.badge && ch.badge.startsWith('เรื่อง') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'} mb-1">${ch.badge || 'หน้า'} • หน้า ${ch.page}</span>
            <div class="font-bold text-slate-800 text-xs group-hover:text-emerald-700 transition leading-snug">${ch.name}</div>
          </div>
          <i class="fa-solid fa-chevron-right text-xs text-slate-400 group-hover:text-emerald-600 transition"></i>
        </button>
      `).join('');
    }

  } catch (err) {
    console.error('Ebook load error:', err);
  }
}

function jumpToPdfPage(pageNum) {
  const page = pageNum || 1;
  const tabIframe = document.getElementById('ebook-tab-iframe') || document.getElementById('ebook-pdf-iframe');
  const modalIframe = document.getElementById('modal-ebook-iframe');
  const targetSrc = `textbook_m4.pdf#page=${page}`;
  
  if (tabIframe) {
    tabIframe.src = targetSrc;
  }
  if (modalIframe) {
    modalIframe.src = targetSrc;
  }
  showToast(`ไปยังหน้า ${page} ของคู่มือนักเรียนเรียบร้อย`, 'info');
}

function jumpToEbookChapter(anchor) {
  // Map anchors to exact PDF page numbers
  const anchorToPageMap = {
    'cover': 1,
    'preface': 2,
    'toc': 4,
    'unit-1': 5,
    'ch-1': 5,
    'ch-2': 8,
    'ch-3': 10,
    'unit-2': 12,
    'ch-4': 12,
    'ch-5': 14,
    'ch-6': 15,
    'appendix-glossary': 16
  };
  const targetPage = anchorToPageMap[anchor] || 1;
  jumpToPdfPage(targetPage);
}

function openEbookModal(pageNum) {
  const page = pageNum || 1;
  const modalIframe = document.getElementById('modal-ebook-iframe') || document.getElementById('ebook-pdf-iframe');
  if (modalIframe) {
    modalIframe.src = `textbook_m4.pdf#page=${page}`;
  }
  openModal('modal-ebook-reader');
}


