
// Universal Difficulty Tag Stripper (Ensures all difficulty annotations are completely purged)
function stripDifficultyTags(str) {
  if (!str) return '';
  return String(str)
    .replace(/[\(（\[\【]\s*(?:ง่าย|ปานกลาง|ท้าทาย|ระดับง่าย|ระดับปานกลาง|ระดับท้าทาย|ระดับพื้นฐาน|พื้นฐาน\s*[–\-]\s*ปานกลาง|ความยาก[^\)\】\]\n]*)[\)\）\]\】]/gi, '')
    .replace(/(?:^|\s)(?:ง่าย|ปานกลาง|ท้าทาย)(?:\s|$)/gi, ' ')
    .trim();
}

// Supabase Cloud Configuration (Direct Client-Side Integration for 100% Online & File Mode Support)
const SUPABASE_REST_URL = 'https://fsvlkoqsfmyaxaqxsoiy.supabase.co/rest/v1';
const SUPABASE_ANON_KEY = 'sb_publishable_2FpUqt7BY0Xk3gNH2Rx95Q_DZ2bOVgM';

// State Management
let currentUser = null;
let studentQuizAttemptsCache = null;
let allTeacherQuizAttempts = [];
let currentToken = '';
let activeTab = 'home';
let currentQuiz = null;
let currentQuizFilter = 'all';

// Slide presentation state
let activeSlideDeck = null;
let currentSlideIndex = 0;

// Host Detection Helper: Returns true if running on GitHub Pages, static host, or file:///
function isStaticOrServerlessHost() {
  return window.location.protocol === 'file:' || 
         window.location.hostname.endsWith('github.io') || 
         window.location.hostname.endsWith('github.dev') || 
         window.location.hostname.endsWith('gitlab.io') || 
         window.location.hostname.endsWith('vercel.app') || 
         window.location.hostname.endsWith('netlify.app') || 
         window.location.hostname.endsWith('firebaseapp.com') || 
         window.location.hostname.endsWith('web.app');
}

// API Fetch Helper
async function apiFetch(endpoint, method = 'GET', body = null) {
  // If opened on GitHub Pages, static host, or local file, bypass backend gracefully
  if (isStaticOrServerlessHost()) {
    console.warn('Running in static host mode (GitHub Pages / file). Client-side Supabase mode active for:', endpoint);
    throw new Error('OFFLINE_FILE_PROTOCOL');
  }

  const headers = { 'Content-Type': 'application/json' };
  if (currentToken) {
    headers['Authorization'] = `Bearer ${currentToken}`;
  }

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(`/api${endpoint}`, opts);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('OFFLINE_FILE_PROTOCOL');
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    return data;
  } catch (err) {
    if (err.message !== 'OFFLINE_FILE_PROTOCOL') {
      showToast(err.message, 'error');
    }
    throw err;
  }
}

// Security Sanitization Helper (Prevent XSS)
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  let bg = 'bg-white text-slate-900 border border-slate-200 shadow-md';
  let icon = 'fa-info-circle text-emerald-700';
  if (type === 'success') {
    bg = 'bg-emerald-50 text-emerald-950 border border-emerald-300 shadow-md';
    icon = 'fa-circle-check text-emerald-700';
  } else if (type === 'error') {
    bg = 'bg-rose-50 text-rose-950 border border-rose-300 shadow-md';
    icon = 'fa-triangle-exclamation text-rose-600';
  }

  toast.className = `${bg} px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs font-medium pointer-events-auto transition-all transform duration-300 translate-y-2 opacity-0 max-w-md`;
  toast.innerHTML = `<i class="fa-solid ${icon} text-base"></i><span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Theme Management: Enforce Clean Minimal Light Mode (ขาว - เขียว สบายตา คมชัด)
function initTheme() {
  localStorage.setItem('csm4-theme', 'light');
  localStorage.setItem('csm4-unit1-theme', 'light');
  localStorage.setItem('csm4-unit2-theme', 'light');
  localStorage.setItem('csm4-ebook-theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) toggleBtn.style.display = 'none';
  const quizThemeBtn = document.getElementById('btn-quiz-theme');
  if (quizThemeBtn) quizThemeBtn.style.display = 'none';
}

function toggleTheme() {
  // Dark mode has been retired; keep only clean minimal white-green light mode
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('csm4-theme', 'light');
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.style.display = 'none';
  }
}

// Thairath Real-Time Thai Date Display
function initThairathDate() {
  const el = document.getElementById('thairath-date-display');
  if (!el) return;
  const now = new Date();
  const days = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
  const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  const dayName = days[now.getDay()];
  const dateNum = now.getDate();
  const monthName = months[now.getMonth()];
  const year = now.getFullYear() + 543;
  el.innerHTML = `<i class="fa-regular fa-calendar-days mr-1 text-emerald-600"></i> ${dayName}ที่ ${dateNum} ${monthName} ${year}`;
}

// Thairath Global Quick Search
function executeThairathSearch() {
  const input = document.getElementById('thairath-quick-search');
  if (!input) return;
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  if (query.includes('ข้อสอบ') || query.includes('สอบ') || query.includes('quiz') || query.includes('กลางภาค') || query.includes('ปลายภาค')) {
    switchTab('quizzes');
    showToast(`เปิดคลังข้อสอบตามคำค้น "${query}"`, 'success');
  } else if (query.includes('ใบงาน') || query.includes('โครงงาน') || query.includes('sheet') || query.includes('เค้าโครง')) {
    switchTab('worksheets');
    showToast(`เปิดคลังใบงานและเค้าโครงสำหรับ "${query}"`, 'success');
  } else if (query.includes('วิดีโอ') || query.includes('คลิป') || query.includes('สไลด์') || query.includes('slide') || query.includes('media')) {
    switchTab('media');
    showToast(`เปิดคลังสื่อสำหรับ "${query}"`, 'success');
  } else if (query.includes('ebook') || query.includes('หนังสือ') || query.includes('')) {
    openEbookModal();
    showToast(`เปิด E-Book หนังสือเรียน`, 'success');
  } else if (query.includes('คะแนน') || query.includes('ตรวจ') || query.includes('ส่งงาน') || query.includes('ผล')) {
    switchTab('assignments');
    showToast(`เปิดประวัติการส่งงานและคะแนนสำหรับ "${query}"`, 'info');
  } else {
    switchTab('lessons');
    showToast(`ค้นหาสาระการเรียนรู้สำหรับ "${query}"`, 'info');
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) {
    navLinks.classList.toggle('mobile-open');
  }
}

// Modal Helpers
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'flex';
    el.classList.remove('hidden');
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'none';
    el.classList.add('hidden');
  }
  if (id === 'modal-video-player') {
    const iframe = document.getElementById('video-iframe');
    if (iframe) iframe.src = '';
  }
  if (id === 'modal-slide-viewer') {
    const iframe = document.getElementById('slide-iframe');
    if (iframe) iframe.src = '';
  }
}

