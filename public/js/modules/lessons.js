// --- 1. HOME DASHBOARD DATA ---
async function loadHomeData() {
  await loadAnnouncementsRealtime(false);
}



// --- 2. UNITS SHOWCASE (2-COLUMN LAYOUT WITH ILLUSTRATIONS) ---
function getUnitsShowcaseHtml() {
  return `
  <!-- ============================================================== -->
  <!-- SECTION: LESSONS (EMBEDDED-AI STYLE • GREEN - WHITE - BLACK)   -->
  <!-- ============================================================== -->
  <div class="lessons-embedded-wrapper" style="padding-top: 6px;">

    <!-- 1. SECTION HEADER (depa-style / EmbeddedAI-style) -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-slate-200 gap-4">
      <div>
        <h2 class="text-2xl font-black text-[#0f172a] flex items-center gap-2.5 font-heading tracking-tight">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#107548] border border-emerald-200 flex items-center justify-center text-xl shadow-sm shrink-0">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <span>หลักสูตรบทเรียนออนไลน์</span>
        </h2>
        <p class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
          วิทยาการคำนวณ ม.4 • ครอบคลุม 4 เสาหลักแนวคิดเชิงคำนวณ (Computational Thinking), วงจรการพัฒนาระบบ (SDLC 5 ขั้นตอน), การเขียนรายงานโครงงาน 5 บท และกรณีศึกษาเชิงประยุกต์
        </p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button onclick="openEbookModal()" class="btn-lesson-outline">
          <i class="fa-solid fa-book-bookmark text-[#107548]"></i> เปิด E-Book หนังสือเรียน
        </button>
        <a href="https://docs.google.com/presentation/d/1dD2oGk7sxJ4mDpGfcFwCwqtPf1bpyQzvPlNtX74Dw9Y/edit?usp=sharing" target="_blank" rel="noopener noreferrer" class="btn-lesson-dark">
          <i class="fa-solid fa-file-powerpoint text-amber-400"></i> สไลด์ประกอบการสอน ↗
        </a>
      </div>
    </div>

    <!-- 2. QUICK LEARNING NOTICE BANNER -->
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 12px 18px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
      <div style="font-size: 0.84rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-circle-info text-[#107548]" style="font-size: 1.05rem;"></i>
        <span><strong>คำแนะนำ:</strong> คลิก <strong>"เข้าเรียนฉบับเต็ม"</strong> เพื่อเปิดบทเรียนดิจิทัล หรือคลิก <strong>"สไลด์"</strong> เพื่อเปิด Google Slides ทบทวนเนื้อหา</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <span class="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-emerald-300 text-[#107548]">
          <i class="fa-solid fa-shield-check mr-1"></i> ตัวชี้วัด ว 4.2 ม.4/1
        </span>
      </div>
    </div>

    <!-- 3. FLAGSHIP 2 MAJOR UNITS (2 หน่วยการเรียนรู้หลัก • คอลัมน์คู่เด่นชัด) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

      <!-- UNIT 1 CARD -->
      <div class="lesson-card">
        <div class="lesson-card-header">
          <div class="flex items-center justify-between mb-3">
            <span class="lesson-badge-chapter">
              <i class="fa-solid fa-bookmark"></i> หน่วยการเรียนรู้ที่ 1
            </span>
            <span class="lesson-badge-clock">
              <i class="fa-regular fa-clock"></i> 20 คาบ (ชั่วโมง)
            </span>
          </div>

          <h3 class="lesson-card-title text-xl" onclick="window.open('unit1.html', '_blank')">
            แนวคิดเชิงคำนวณในการพัฒนาโครงงาน
          </h3>
          <p class="lesson-card-subtitle">Computational Thinking in Project Development</p>
          <p class="lesson-card-desc">
            ศึกษา 4 องค์ประกอบของแนวคิดเชิงคำนวณ การแก้ปัญหาด้วยวงจรการพัฒนาระบบ SDLC 5 ขั้นตอน การวางแผนด้วย Gantt Chart แผนภาพ DFD พีระมิดการทดสอบ และโครงสร้างการเขียนรายงานโครงงานคอมพิวเตอร์ 5 บท
          </p>

          <!-- Key Subtopics List -->
          <div class="lesson-topics-box">
            <div class="lesson-topics-title">
              <i class="fa-solid fa-list-check text-[#107548]"></i> สาระสำคัญประจำหน่วย (3 หัวข้อหลัก):
            </div>
            <ul class="lesson-topics-list">
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <span><strong>1.1 แนวคิดเชิงคำนวณ 4 เสาหลัก:</strong> Decomposition, Pattern, Abstraction, Algorithm Design &amp; Flowgorithm</span>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <span><strong>1.2 วงจรการพัฒนาระบบ (SDLC):</strong> 5 ขั้นตอน, ผัง Gantt Chart 20 สัปดาห์, แผนภาพ DFD, พีระมิดทดสอบ 4 ระดับ</span>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <span><strong>1.3 การเขียนรายงานโครงงาน:</strong> โครงสร้าง 3 ส่วนหลัก 5 บท, ผังเค้าโครงโครงงาน (Proposal) &amp; บรรณานุกรม APA</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="lesson-card-footer">
          <div class="flex items-center gap-2">
            <a href="unit1.html" target="_blank" class="btn-lesson-primary">
              <i class="fa-solid fa-book-open"></i> เข้าเรียนฉบับเต็ม
            </a>
            <button onclick="openSlideModal('sld-1')" class="btn-lesson-outline">
              <i class="fa-solid fa-file-powerpoint text-amber-500"></i> สไลด์
            </button>
          </div>
          <a href="javascript:void(0)" onclick="switchTab('quizzes')" class="btn-lesson-subtle">
            <i class="fa-solid fa-clipboard-check text-[#107548]"></i> แบบทดสอบ
          </a>
        </div>
      </div>

      <!-- UNIT 2 CARD -->
      <div class="lesson-card">
        <div class="lesson-card-header">
          <div class="flex items-center justify-between mb-3">
            <span class="lesson-badge-chapter">
              <i class="fa-solid fa-bookmark"></i> หน่วยการเรียนรู้ที่ 2
            </span>
            <span class="lesson-badge-clock">
              <i class="fa-regular fa-clock"></i> 20 คาบ (ชั่วโมง)
            </span>
          </div>

          <h3 class="lesson-card-title text-xl" onclick="window.open('unit2.html', '_blank')">
            การประยุกต์ใช้แนวคิดเชิงคำนวณเพื่อพัฒนาโครงงาน
          </h3>
          <p class="lesson-card-subtitle">Applied Computational Thinking in Project Development</p>
          <p class="lesson-card-desc">
            การนำแนวคิดเชิงคำนวณและวงจร SDLC มาประยุกต์ใช้แก้ปัญหาจริงผ่าน 2 กรณีศึกษา ได้แก่ เว็บแอปพลิเคชันแนะนำการใช้งานห้องสมุด และแอปพลิเคชันแจ้งเตือนการกินยา nMeMo พร้อมการประเมินและทดสอบระบบ
          </p>

          <!-- Key Subtopics List -->
          <div class="lesson-topics-box">
            <div class="lesson-topics-title">
              <i class="fa-solid fa-list-check text-[#107548]"></i> สาระสำคัญประจำหน่วย (3 กรณีศึกษา):
            </div>
            <ul class="lesson-topics-list">
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <span><strong>2.1 กรณีศึกษาที่ 1 (ห้องสมุด):</strong> ระบบแนะนำการใช้งานห้องสมุด ค้นหาหมวดดิวอี้ ผังชั้นวาง 2D แบบ Responsive Web</span>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <span><strong>2.2 กรณีศึกษาที่ 2 (แอปยา):</strong> โปรแกรมแจ้งเตือนกินยา nMeMo (Health Tech) วิเคราะห์ปัญหาผู้สูงอายุ &amp; UI</span>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <span><strong>2.3 การประเมินและการทดสอบ:</strong> เทคนิคการทดสอบระบบ (Black-box &amp; White-box), ประเมินความพึงพอใจ &amp; สรุปผล</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="lesson-card-footer">
          <div class="flex items-center gap-2">
            <a href="unit2.html" target="_blank" class="btn-lesson-primary">
              <i class="fa-solid fa-book-open"></i> เข้าเรียนฉบับเต็ม
            </a>
            <button onclick="openSlideModal('sld-2')" class="btn-lesson-outline">
              <i class="fa-solid fa-file-powerpoint text-amber-500"></i> สไลด์
            </button>
          </div>
          <a href="javascript:void(0)" onclick="switchTab('quizzes')" class="btn-lesson-subtle">
            <i class="fa-solid fa-clipboard-check text-[#107548]"></i> แบบทดสอบ
          </a>
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


