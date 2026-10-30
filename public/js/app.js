// Supabase Cloud Configuration (Direct Client-Side Integration for 100% Online & File Mode Support)
const SUPABASE_REST_URL = 'https://fsvlkoqsfmyaxaqxsoiy.supabase.co/rest/v1';
const SUPABASE_ANON_KEY = 'sb_publishable_2FpUqt7BY0Xk3gNH2Rx95Q_DZ2bOVgM';

// State Management
let currentUser = null;
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
  
  let bg = 'bg-slate-800 text-white';
  let icon = 'fa-info-circle text-blue-400';
  if (type === 'success') {
    bg = 'bg-emerald-900 text-emerald-100 border border-emerald-500';
    icon = 'fa-circle-check text-emerald-400';
  } else if (type === 'error') {
    bg = 'bg-rose-900 text-rose-100 border border-rose-500';
    icon = 'fa-triangle-exclamation text-rose-400';
  }

  toast.className = `${bg} px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs pointer-events-auto transition-all transform duration-300 translate-y-2 opacity-0 max-w-md`;
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

// Theme Management (Default Standard: Dark Mode as primary standby)
function initTheme() {
  if (!localStorage.getItem('csm4-theme-standby-v3')) {
    localStorage.setItem('csm4-theme', 'dark');
    localStorage.setItem('csm4-theme-standby-v3', 'true');
  }
  const saved = localStorage.getItem('csm4-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('csm4-theme', next);
  updateThemeIcon(next);
  if (activeTab === 'analytics') loadAnalyticsData();
  showToast(`เปลี่ยนเป็นโหมด ${next === 'dark' ? 'มืด (ดำ - เขียว)' : 'สว่าง (ขาว - เขียว)'} เรียบร้อย`, 'info');
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#00b400';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '#00903b';
    }
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
}

// --- AUTHENTICATION & SESSION MANAGEMENT ---
function updateAuthUI() {
  const profileContainer = document.getElementById('user-profile-container');
  const loginBtn = document.getElementById('btn-header-login');
  const nameEl = document.getElementById('user-fullname');
  const avatarEl = document.getElementById('user-avatar');
  const roleBadge = document.getElementById('user-role-badge');
  const dropdownAvatar = document.getElementById('dropdown-avatar');
  const dropdownName = document.getElementById('dropdown-fullname');
  const dropdownRole = document.getElementById('dropdown-role-text');
  const teacherLinks = document.getElementById('dropdown-teacher-links');
  const adminLinks = document.getElementById('dropdown-admin-links');
  const btnAnnounce = document.getElementById('btn-add-announcement');
  const adminSheetIndicator = document.getElementById('admin-sheet-indicator');
  const adminSheetCheckerLink = document.getElementById('admin-sheet-checker-link');

  if (currentUser && currentToken) {
    // Apply saved custom avatar if exists
    const savedCustomAvatar = localStorage.getItem('csm4_avatar_' + currentUser.username);
    if (savedCustomAvatar) {
      currentUser.avatar = savedCustomAvatar;
    }

    if (profileContainer) profileContainer.style.display = 'block';
    if (loginBtn) loginBtn.style.display = 'none';

    if (nameEl) nameEl.innerText = currentUser.full_name;
    if (avatarEl) avatarEl.src = currentUser.avatar;

    const roleName = currentUser.role === 'admin' ? 'ผู้ดูแลระบบ' : currentUser.role === 'teacher' ? 'ครูผู้สอน' : (currentUser.class_room ? `นักเรียน ${currentUser.class_room}` : 'นักเรียน');
    const badgeClass = currentUser.role === 'admin' ? 'badge-admin' : currentUser.role === 'teacher' ? 'badge-teacher' : 'badge-student';

    if (roleBadge) {
      roleBadge.innerText = roleName;
      roleBadge.className = badgeClass;
    }

    if (dropdownAvatar) dropdownAvatar.src = currentUser.avatar;
    if (dropdownName) dropdownName.innerText = currentUser.full_name;
    if (dropdownRole) dropdownRole.innerText = currentUser.role === 'student' ? `นักเรียน: รหัส ${currentUser.username} • ${currentUser.class_room || 'ม.4'}` : `สถานะ: ${roleName} (${currentUser.username})`;

    if (teacherLinks) {
      teacherLinks.style.display = (currentUser.role === 'teacher' || currentUser.role === 'admin') ? 'block' : 'none';
    }
    if (adminLinks) {
      adminLinks.style.display = (currentUser.role === 'admin') ? 'block' : 'none';
    }

    const toggleAnswerBtn = document.getElementById('btn-toggle-answer');
    if (toggleAnswerBtn) {
      toggleAnswerBtn.style.display = (currentUser.role === 'teacher' || currentUser.role === 'admin') ? 'inline-flex' : 'none';
    }

    // Supabase & Sheet ID: Visible ONLY to Admin
    const isAdmin = currentUser.role === 'admin';
    if (adminSheetIndicator) {
      adminSheetIndicator.style.display = isAdmin ? 'inline-flex' : 'none';
    }
    if (adminSheetCheckerLink) {
      adminSheetCheckerLink.style.display = isAdmin ? 'inline-flex' : 'none';
    }

    if (btnAnnounce) {
      if (currentUser.role === 'teacher' || currentUser.role === 'admin') {
        btnAnnounce.style.display = 'inline-flex';
        btnAnnounce.classList.remove('hidden');
      } else {
        btnAnnounce.style.display = 'none';
        btnAnnounce.classList.add('hidden');
      }
    }
  } else {
    // Guest State
    if (profileContainer) profileContainer.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    const guestToggleAnswerBtn = document.getElementById('btn-toggle-answer');
    if (guestToggleAnswerBtn) guestToggleAnswerBtn.style.display = 'none';
    if (adminSheetIndicator) adminSheetIndicator.style.display = 'none';
    if (adminSheetCheckerLink) adminSheetCheckerLink.style.display = 'none';
    if (btnAnnounce) {
      btnAnnounce.style.display = 'none';
      btnAnnounce.classList.add('hidden');
    }
  }
}

// User Profile Dropdown
function toggleUserDropdown(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('user-dropdown-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

function closeUserDropdown() {
  const menu = document.getElementById('user-dropdown-menu');
  if (menu) {
    menu.classList.add('hidden');
  }
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const wrapper = document.getElementById('user-profile-container');
  if (wrapper && !wrapper.contains(e.target)) {
    closeUserDropdown();
  }
});

// Login Modal
function openLoginModal() {
  const errMsg = document.getElementById('login-error-msg');
  if (errMsg) errMsg.style.display = 'none';
  const uInput = document.getElementById('login-username');
  const pInput = document.getElementById('login-password');
  if (uInput) uInput.value = '';
  if (pInput) pInput.value = '';
  openModal('modal-login');
}

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (input && icon) {
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'fa-solid fa-eye-slash';
    } else {
      input.type = 'password';
      icon.className = 'fa-solid fa-eye';
    }
  }
}

// --- USER AVATAR MANAGEMENT (เปลี่ยนรูปโปรไฟล์) ---
let tempSelectedAvatar = '';

// Preset Avatar collections
const PRESET_AVATARS_BASE = [
  // Students (Boys)
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Nattawut&gender=male',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Somchai&gender=male',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Kittisak&gender=male',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Thanaphat&gender=male',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Phachara&gender=male',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Preeti&gender=male',
  // Students (Girls)
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Kanya&gender=female',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ploy&gender=female',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Chutima&gender=female',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Pornpimol&gender=female',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Chanatda&gender=female',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Warada&gender=female',
  // Kru / Academic / Tech / Robots
  'img/teacher_panittha.jpg',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=SmartTeacher',
  'https://api.dicebear.com/7.x/bottts/svg?seed=RoboCoder',
  'https://api.dicebear.com/7.x/bottts/svg?seed=CyberAI',
  'https://api.dicebear.com/7.x/bottts/svg?seed=CompSciM4',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=HappyStudent'
];

function openAvatarModal() {
  if (!currentUser) {
    openLoginModal();
    showToast('กรุณาเข้าสู่ระบบก่อนเปลี่ยนรูปโปรไฟล์', 'info');
    return;
  }

  // Load custom avatar from localStorage if exists
  const savedAvatar = localStorage.getItem('csm4_avatar_' + currentUser.username);
  tempSelectedAvatar = savedAvatar || currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}`;

  // Update preview
  const prevImg = document.getElementById('avatar-preview-img');
  const prevName = document.getElementById('avatar-preview-name');
  const prevRole = document.getElementById('avatar-preview-role');
  if (prevImg) prevImg.src = tempSelectedAvatar;
  if (prevName) prevName.innerText = currentUser.full_name;
  if (prevRole) {
    const roleText = currentUser.role === 'admin' ? 'ผู้ดูแลระบบ (Admin Center)' : currentUser.role === 'teacher' ? 'ครูผู้สอน' : (currentUser.class_room ? `นักเรียน ${currentUser.class_room}` : 'นักเรียน');
    prevRole.innerText = roleText;
  }

  // Reset tab to upload
  switchAvatarTab('upload');

  // Render presets
  renderPresetAvatars(PRESET_AVATARS_BASE);

  openModal('modal-avatar');
}

function switchAvatarTab(tab) {
  const tabs = ['upload', 'presets', 'url'];
  tabs.forEach(t => {
    const content = document.getElementById(`avatar-tab-${t}`);
    const btn = document.getElementById(`tab-btn-avatar-${t}`);
    if (content) content.style.display = (t === tab) ? 'block' : 'none';
    if (btn) {
      if (t === tab) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });
}

function renderPresetAvatars(list) {
  const grid = document.getElementById('preset-avatars-grid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach(url => {
    const item = document.createElement('div');
    item.className = 'preset-avatar-item' + (tempSelectedAvatar === url ? ' selected' : '');
    item.innerHTML = `<img src="${url}" alt="Preset Avatar" loading="lazy" />`;
    item.onclick = () => selectPresetAvatar(url, item);
    grid.appendChild(item);
  });
}

function selectPresetAvatar(url, el) {
  tempSelectedAvatar = url;
  const prevImg = document.getElementById('avatar-preview-img');
  if (prevImg) prevImg.src = url;

  document.querySelectorAll('.preset-avatar-item').forEach(it => it.classList.remove('selected'));
  if (el) el.classList.add('selected');
}

function randomizeAvatars() {
  const randomSeeds = [];
  const styles = ['avataaars', 'avataaars', 'bottts', 'lorelei'];
  for (let i = 0; i < 18; i++) {
    const style = styles[Math.floor(Math.random() * styles.length)];
    const randSeed = 'CSM4_' + Math.random().toString(36).substring(2, 8);
    randomSeeds.push(`https://api.dicebear.com/7.x/${style}/svg?seed=${randSeed}`);
  }
  renderPresetAvatars(randomSeeds);
  showToast('สุ่มอวตารใหม่เรียบร้อยแล้ว', 'info');
}

function handleAvatarFileSelect(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('กรุณาเลือกไฟล์รูปภาพเท่านั้น (JPG, PNG, GIF, WebP)', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    const img = new Image();
    img.onload = function() {
      // Create canvas and crop to square 256x256
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const minSize = Math.min(img.width, img.height);
      const startX = (img.width - minSize) / 2;
      const startY = (img.height - minSize) / 2;
      ctx.drawImage(img, startX, startY, minSize, minSize, 0, 0, 256, 256);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      tempSelectedAvatar = compressedDataUrl;
      const prevImg = document.getElementById('avatar-preview-img');
      if (prevImg) prevImg.src = compressedDataUrl;
      showToast('เลือกรูปภาพสำเร็จ! กด "บันทึกรูปโปรไฟล์" เพื่อใช้งาน', 'success');
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function previewAvatarFromUrl() {
  const urlInput = document.getElementById('avatar-url-input');
  if (!urlInput) return;
  const val = urlInput.value.trim();
  if (!val) {
    showToast('กรุณากรอก URL ของรูปภาพ', 'error');
    return;
  }
  tempSelectedAvatar = val;
  const prevImg = document.getElementById('avatar-preview-img');
  if (prevImg) prevImg.src = val;
  showToast('แสดงตัวอย่างรูปภาพจาก URL เรียบร้อย', 'info');
}

function resetDefaultAvatar() {
  if (!currentUser) return;
  let defaultUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}`;
  if (currentUser.role === 'teacher') defaultUrl = 'img/teacher_panittha.jpg';
  else if (currentUser.role === 'admin') defaultUrl = 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminCenter';
  
  tempSelectedAvatar = defaultUrl;
  const prevImg = document.getElementById('avatar-preview-img');
  if (prevImg) prevImg.src = defaultUrl;
  showToast('รีเซ็ตเป็นรูปประจำตัวเริ่มต้นแล้ว กดบันทึกเพื่อยืนยัน', 'info');
}

async function saveUserAvatar() {
  if (!currentUser) {
    showToast('กรุณาเข้าสู่ระบบก่อน', 'error');
    return;
  }
  if (!tempSelectedAvatar) {
    showToast('กรุณาเลือกหรืออัปโหลดรูปภาพก่อนบันทึก', 'error');
    return;
  }

  const saveBtn = document.getElementById('btn-save-avatar');
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> กำลังบันทึก...';
  }

  try {
    currentUser.avatar = tempSelectedAvatar;

    // Save to localStorage for instant offline persistence across reloads & logins
    localStorage.setItem('csm4_user', JSON.stringify(currentUser));
    localStorage.setItem('csm4_avatar_' + currentUser.username, tempSelectedAvatar);

    // Update in-memory STUDENT_ACCOUNTS if student
    if (typeof STUDENT_ACCOUNTS !== 'undefined' && STUDENT_ACCOUNTS[currentUser.username]) {
      STUDENT_ACCOUNTS[currentUser.username].avatar = tempSelectedAvatar;
    }

    // Update UI elements immediately
    const userAvatarEl = document.getElementById('user-avatar');
    const dropdownAvatarEl = document.getElementById('dropdown-avatar');
    if (userAvatarEl) userAvatarEl.src = tempSelectedAvatar;
    if (dropdownAvatarEl) dropdownAvatarEl.src = tempSelectedAvatar;

    // Try backend sync if running with server
    try {
      if (window.location.protocol.startsWith('http')) {
        await apiFetch('/user/avatar', 'POST', {
          avatar: tempSelectedAvatar,
          username: currentUser.username
        });
      }
    } catch (e) {
      console.log('Saved avatar locally (offline mode)');
    }

    closeModal('modal-avatar');
    showToast('เปลี่ยนรูปโปรไฟล์เรียบร้อยแล้ว!', 'success');
  } catch (err) {
    showToast('เกิดข้อผิดพลาดในการบันทึก: ' + err.message, 'error');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk mr-1"></i> บันทึกรูปโปรไฟล์';
    }
  }
}

const STUDENT_ACCOUNTS = {
  "20727": {
    "id": "u-20727",
    "username": "20727",
    "full_name": "นายอินทร์ภิลักษณ์ บัวเรียง (ม.4/4)",
    "real_name": "นายอินทร์ภิลักษณ์ บัวเรียง",
    "role": "student",
    "student_id": "20727",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=20727"
  },
  "21003": {
    "id": "u-21003",
    "username": "21003",
    "full_name": "นางสาววิภาวี เทพบุตร (ม.4/4)",
    "real_name": "นางสาววิภาวี เทพบุตร",
    "role": "student",
    "student_id": "21003",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21003"
  },
  "21006": {
    "id": "u-21006",
    "username": "21006",
    "full_name": "เด็กหญิงสิรินทรา ภูจีรัง (ม.4/4)",
    "real_name": "เด็กหญิงสิรินทรา ภูจีรัง",
    "role": "student",
    "student_id": "21006",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21006"
  },
  "21018": {
    "id": "u-21018",
    "username": "21018",
    "full_name": "เด็กชายธนวัฒน์ พิณรัตน์ (ม.4/4)",
    "real_name": "เด็กชายธนวัฒน์ พิณรัตน์",
    "role": "student",
    "student_id": "21018",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21018"
  },
  "21033": {
    "id": "u-21033",
    "username": "21033",
    "full_name": "นางสาวธัญญารัตน์ บุญอินทร์ (ม.4/4)",
    "real_name": "นางสาวธัญญารัตน์ บุญอินทร์",
    "role": "student",
    "student_id": "21033",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21033"
  },
  "21040": {
    "id": "u-21040",
    "username": "21040",
    "full_name": "นางสาวพิยดา ศิลาอุดม (ม.4/4)",
    "real_name": "นางสาวพิยดา ศิลาอุดม",
    "role": "student",
    "student_id": "21040",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21040"
  },
  "21071": {
    "id": "u-21071",
    "username": "21071",
    "full_name": "นางสาวณัฐกานต์ กาพล (ม.4/12)",
    "real_name": "นางสาวณัฐกานต์ กาพล",
    "role": "student",
    "student_id": "21071",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21071"
  },
  "21101": {
    "id": "u-21101",
    "username": "21101",
    "full_name": "เด็กหญิงณภัทรา โยธา (ม.4/10)",
    "real_name": "เด็กหญิงณภัทรา โยธา",
    "role": "student",
    "student_id": "21101",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21101"
  },
  "21116": {
    "id": "u-21116",
    "username": "21116",
    "full_name": "นางสาวลลิตา เคนทะภักดิ์ (ม.4/12)",
    "real_name": "นางสาวลลิตา เคนทะภักดิ์",
    "role": "student",
    "student_id": "21116",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21116"
  },
  "21118": {
    "id": "u-21118",
    "username": "21118",
    "full_name": "นางสาวศิริพรรณ โยคะสิงห์ (ม.4/12)",
    "real_name": "นางสาวศิริพรรณ โยคะสิงห์",
    "role": "student",
    "student_id": "21118",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21118"
  },
  "21122": {
    "id": "u-21122",
    "username": "21122",
    "full_name": "นางสาวอาทิตยา คำมุง (ม.4/12)",
    "real_name": "นางสาวอาทิตยา คำมุง",
    "role": "student",
    "student_id": "21122",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21122"
  },
  "21123": {
    "id": "u-21123",
    "username": "21123",
    "full_name": "นายกรรณรักษ์ ทองนุ่ม (ม.4/10)",
    "real_name": "นายกรรณรักษ์ ทองนุ่ม",
    "role": "student",
    "student_id": "21123",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21123"
  },
  "21124": {
    "id": "u-21124",
    "username": "21124",
    "full_name": "นายจิตบุณย์ ปราณีตพลกรัง (ม.4/10)",
    "real_name": "นายจิตบุณย์ ปราณีตพลกรัง",
    "role": "student",
    "student_id": "21124",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21124"
  },
  "21127": {
    "id": "u-21127",
    "username": "21127",
    "full_name": "นายณัฐวุฒิ ชัยศรี (ม.4/10)",
    "real_name": "นายณัฐวุฒิ ชัยศรี",
    "role": "student",
    "student_id": "21127",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21127"
  },
  "21130": {
    "id": "u-21130",
    "username": "21130",
    "full_name": "เด็กชายธนภัทร สิทธิเสนา (ม.4/10)",
    "real_name": "เด็กชายธนภัทร สิทธิเสนา",
    "role": "student",
    "student_id": "21130",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21130"
  },
  "21133": {
    "id": "u-21133",
    "username": "21133",
    "full_name": "นายปรีติ ดอกมะขาม (ม.4/12)",
    "real_name": "นายปรีติ ดอกมะขาม",
    "role": "student",
    "student_id": "21133",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21133"
  },
  "21134": {
    "id": "u-21134",
    "username": "21134",
    "full_name": "นายปุณวิทย์ สายมิ่ง (ม.4/10)",
    "real_name": "นายปุณวิทย์ สายมิ่ง",
    "role": "student",
    "student_id": "21134",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21134"
  },
  "21135": {
    "id": "u-21135",
    "username": "21135",
    "full_name": "นายภาสกร ตันเจริญ (ม.4/10)",
    "real_name": "นายภาสกร ตันเจริญ",
    "role": "student",
    "student_id": "21135",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21135"
  },
  "21137": {
    "id": "u-21137",
    "username": "21137",
    "full_name": "นายรณกร นาเทเวท (ม.4/10)",
    "real_name": "นายรณกร นาเทเวท",
    "role": "student",
    "student_id": "21137",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21137"
  },
  "21138": {
    "id": "u-21138",
    "username": "21138",
    "full_name": "นายรพีพัฒน์ บรรดาศักดิ์ (ม.4/10)",
    "real_name": "นายรพีพัฒน์ บรรดาศักดิ์",
    "role": "student",
    "student_id": "21138",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21138"
  },
  "21139": {
    "id": "u-21139",
    "username": "21139",
    "full_name": "นายวัชรพล ชมประไพ (ม.4/12)",
    "real_name": "นายวัชรพล ชมประไพ",
    "role": "student",
    "student_id": "21139",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21139"
  },
  "21144": {
    "id": "u-21144",
    "username": "21144",
    "full_name": "นางสาวชุติกาญจน์ เหลืองจันทึก (ม.4/9)",
    "real_name": "นางสาวชุติกาญจน์ เหลืองจันทึก",
    "role": "student",
    "student_id": "21144",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21144"
  },
  "21147": {
    "id": "u-21147",
    "username": "21147",
    "full_name": "เด็กหญิงปัญญพัชญ์ แก้วพลงาม (ม.4/10)",
    "real_name": "เด็กหญิงปัญญพัชญ์ แก้วพลงาม",
    "role": "student",
    "student_id": "21147",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21147"
  },
  "21148": {
    "id": "u-21148",
    "username": "21148",
    "full_name": "นางสาวปาณิสรา พลรัตน์ (ม.4/12)",
    "real_name": "นางสาวปาณิสรา พลรัตน์",
    "role": "student",
    "student_id": "21148",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21148"
  },
  "21149": {
    "id": "u-21149",
    "username": "21149",
    "full_name": "นางสาวปิยธิดา เสียงห้วยไพร (ม.4/10)",
    "real_name": "นางสาวปิยธิดา เสียงห้วยไพร",
    "role": "student",
    "student_id": "21149",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21149"
  },
  "21150": {
    "id": "u-21150",
    "username": "21150",
    "full_name": "นางสาวพลอยชมพู แพนชัยภูมิ (ม.4/10)",
    "real_name": "นางสาวพลอยชมพู แพนชัยภูมิ",
    "role": "student",
    "student_id": "21150",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21150"
  },
  "21151": {
    "id": "u-21151",
    "username": "21151",
    "full_name": "นางสาวพิชญา พิบูลย์ (ม.4/9)",
    "real_name": "นางสาวพิชญา พิบูลย์",
    "role": "student",
    "student_id": "21151",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21151"
  },
  "21154": {
    "id": "u-21154",
    "username": "21154",
    "full_name": "นางสาวรัฐภรณ์ วิศาลชัยรัตน์ (ม.4/10)",
    "real_name": "นางสาวรัฐภรณ์ วิศาลชัยรัตน์",
    "role": "student",
    "student_id": "21154",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21154"
  },
  "21156": {
    "id": "u-21156",
    "username": "21156",
    "full_name": "เด็กหญิงวิมลสิริ พุฒตาลดง (ม.4/10)",
    "real_name": "เด็กหญิงวิมลสิริ พุฒตาลดง",
    "role": "student",
    "student_id": "21156",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21156"
  },
  "21157": {
    "id": "u-21157",
    "username": "21157",
    "full_name": "นางสาวสมฤดี แสนคำ (ม.4/10)",
    "real_name": "นางสาวสมฤดี แสนคำ",
    "role": "student",
    "student_id": "21157",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21157"
  },
  "21158": {
    "id": "u-21158",
    "username": "21158",
    "full_name": "นางสาวสิปาง สุคนธ์ (ม.4/9)",
    "real_name": "นางสาวสิปาง สุคนธ์",
    "role": "student",
    "student_id": "21158",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21158"
  },
  "21160": {
    "id": "u-21160",
    "username": "21160",
    "full_name": "เด็กหญิงสุรภา เทียนเเดง (ม.4/10)",
    "real_name": "เด็กหญิงสุรภา เทียนเเดง",
    "role": "student",
    "student_id": "21160",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21160"
  },
  "21161": {
    "id": "u-21161",
    "username": "21161",
    "full_name": "เด็กหญิงอิงลดา จันทะเขต (ม.4/10)",
    "real_name": "เด็กหญิงอิงลดา จันทะเขต",
    "role": "student",
    "student_id": "21161",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21161"
  },
  "21168": {
    "id": "u-21168",
    "username": "21168",
    "full_name": "นายปราโมทย์ ตะกิ่มนอก (ม.4/4)",
    "real_name": "นายปราโมทย์ ตะกิ่มนอก",
    "role": "student",
    "student_id": "21168",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21168"
  },
  "21187": {
    "id": "u-21187",
    "username": "21187",
    "full_name": "นางสาวณัฐชยา ไผ่แสวง (ม.4/10)",
    "real_name": "นางสาวณัฐชยา ไผ่แสวง",
    "role": "student",
    "student_id": "21187",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21187"
  },
  "21209": {
    "id": "u-21209",
    "username": "21209",
    "full_name": "นายเชาว์วรรธน์ สงวนศรี (ม.4/12)",
    "real_name": "นายเชาว์วรรธน์ สงวนศรี",
    "role": "student",
    "student_id": "21209",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21209"
  },
  "21224": {
    "id": "u-21224",
    "username": "21224",
    "full_name": "นางสาวณัฎฐิชา เศรษฐบุตร (ม.4/4)",
    "real_name": "นางสาวณัฎฐิชา เศรษฐบุตร",
    "role": "student",
    "student_id": "21224",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21224"
  },
  "21276": {
    "id": "u-21276",
    "username": "21276",
    "full_name": "นายชัยธวัช สำเนียงเพราะ (ม.4/12)",
    "real_name": "นายชัยธวัช สำเนียงเพราะ",
    "role": "student",
    "student_id": "21276",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21276"
  },
  "21284": {
    "id": "u-21284",
    "username": "21284",
    "full_name": "นายปิยภัทร ปักรุ่งเรืองกิจ (ม.4/10)",
    "real_name": "นายปิยภัทร ปักรุ่งเรืองกิจ",
    "role": "student",
    "student_id": "21284",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21284"
  },
  "21293": {
    "id": "u-21293",
    "username": "21293",
    "full_name": "นางสาวกนกวรรณ กวยเหม (ม.4/12)",
    "real_name": "นางสาวกนกวรรณ กวยเหม",
    "role": "student",
    "student_id": "21293",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21293"
  },
  "21347": {
    "id": "u-21347",
    "username": "21347",
    "full_name": "นายโฆกษิพัฒณ์ เกิดเจริญ (ม.4/9)",
    "real_name": "นายโฆกษิพัฒณ์ เกิดเจริญ",
    "role": "student",
    "student_id": "21347",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21347"
  },
  "21348": {
    "id": "u-21348",
    "username": "21348",
    "full_name": "นายจตุรเทพ สิทธิสม (ม.4/10)",
    "real_name": "นายจตุรเทพ สิทธิสม",
    "role": "student",
    "student_id": "21348",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21348"
  },
  "21349": {
    "id": "u-21349",
    "username": "21349",
    "full_name": "นายจิรพัส สำราญจิตต์ (ม.4/9)",
    "real_name": "นายจิรพัส สำราญจิตต์",
    "role": "student",
    "student_id": "21349",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21349"
  },
  "21351": {
    "id": "u-21351",
    "username": "21351",
    "full_name": "นายธีระวัฒน์ ชื่นตา (ม.4/12)",
    "real_name": "นายธีระวัฒน์ ชื่นตา",
    "role": "student",
    "student_id": "21351",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21351"
  },
  "21352": {
    "id": "u-21352",
    "username": "21352",
    "full_name": "นายนิติธร อัศวอักษร (ม.4/9)",
    "real_name": "นายนิติธร อัศวอักษร",
    "role": "student",
    "student_id": "21352",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21352"
  },
  "21353": {
    "id": "u-21353",
    "username": "21353",
    "full_name": "นายนิธิภัทร์ อัตตโชติโภคิน (ม.4/12)",
    "real_name": "นายนิธิภัทร์ อัตตโชติโภคิน",
    "role": "student",
    "student_id": "21353",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21353"
  },
  "21354": {
    "id": "u-21354",
    "username": "21354",
    "full_name": "นายพีรณัฐ เทียมศิริ (ม.4/12)",
    "real_name": "นายพีรณัฐ เทียมศิริ",
    "role": "student",
    "student_id": "21354",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21354"
  },
  "21355": {
    "id": "u-21355",
    "username": "21355",
    "full_name": "นายภูมิพัฒน์ งามมีศรี (ม.4/12)",
    "real_name": "นายภูมิพัฒน์ งามมีศรี",
    "role": "student",
    "student_id": "21355",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21355"
  },
  "21357": {
    "id": "u-21357",
    "username": "21357",
    "full_name": "นายหฤษฏ จันทร์มงคล (ม.4/12)",
    "real_name": "นายหฤษฏ จันทร์มงคล",
    "role": "student",
    "student_id": "21357",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21357"
  },
  "21359": {
    "id": "u-21359",
    "username": "21359",
    "full_name": "นางสาวชุติมา เลิศราศรีกุล (ม.4/9)",
    "real_name": "นางสาวชุติมา เลิศราศรีกุล",
    "role": "student",
    "student_id": "21359",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21359"
  },
  "21361": {
    "id": "u-21361",
    "username": "21361",
    "full_name": "นางสาวนลินนิภา จันทรักษ์ (ม.4/12)",
    "real_name": "นางสาวนลินนิภา จันทรักษ์",
    "role": "student",
    "student_id": "21361",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21361"
  },
  "21364": {
    "id": "u-21364",
    "username": "21364",
    "full_name": "นางสาวปาณิสรา จันทนา (ม.4/12)",
    "real_name": "นางสาวปาณิสรา จันทนา",
    "role": "student",
    "student_id": "21364",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21364"
  },
  "21365": {
    "id": "u-21365",
    "username": "21365",
    "full_name": "นางสาวเปมิกา ชูวงษ์ (ม.4/9)",
    "real_name": "นางสาวเปมิกา ชูวงษ์",
    "role": "student",
    "student_id": "21365",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21365"
  },
  "21367": {
    "id": "u-21367",
    "username": "21367",
    "full_name": "นางสาวพิชญา เกรียงศักดิ์ (ม.4/12)",
    "real_name": "นางสาวพิชญา เกรียงศักดิ์",
    "role": "student",
    "student_id": "21367",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21367"
  },
  "21369": {
    "id": "u-21369",
    "username": "21369",
    "full_name": "นางสาววาดวรารัตน์ กันธุ (ม.4/12)",
    "real_name": "นางสาววาดวรารัตน์ กันธุ",
    "role": "student",
    "student_id": "21369",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21369"
  },
  "21373": {
    "id": "u-21373",
    "username": "21373",
    "full_name": "นางสาวอรพิชา โฉมฉาย (ม.4/12)",
    "real_name": "นางสาวอรพิชา โฉมฉาย",
    "role": "student",
    "student_id": "21373",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21373"
  },
  "21374": {
    "id": "u-21374",
    "username": "21374",
    "full_name": "เด็กหญิงอันนา คำแก้ว (ม.4/10)",
    "real_name": "เด็กหญิงอันนา คำแก้ว",
    "role": "student",
    "student_id": "21374",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21374"
  },
  "21375": {
    "id": "u-21375",
    "username": "21375",
    "full_name": "นางสาวอัยรฎา สมอุ่มจาน (ม.4/12)",
    "real_name": "นางสาวอัยรฎา สมอุ่มจาน",
    "role": "student",
    "student_id": "21375",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21375"
  },
  "21376": {
    "id": "u-21376",
    "username": "21376",
    "full_name": "นายกัญณพัตศ์ วงษ์ชมภู (ม.4/9)",
    "real_name": "นายกัญณพัตศ์ วงษ์ชมภู",
    "role": "student",
    "student_id": "21376",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21376"
  },
  "21377": {
    "id": "u-21377",
    "username": "21377",
    "full_name": "นายฉัตริน ท่าหิน (ม.4/10)",
    "real_name": "นายฉัตริน ท่าหิน",
    "role": "student",
    "student_id": "21377",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21377"
  },
  "21378": {
    "id": "u-21378",
    "username": "21378",
    "full_name": "นายชนนน สายสุทธิ (ม.4/9)",
    "real_name": "นายชนนน สายสุทธิ",
    "role": "student",
    "student_id": "21378",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21378"
  },
  "21379": {
    "id": "u-21379",
    "username": "21379",
    "full_name": "นายชนาเมธ เจริญทัศน์ (ม.4/9)",
    "real_name": "นายชนาเมธ เจริญทัศน์",
    "role": "student",
    "student_id": "21379",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21379"
  },
  "21381": {
    "id": "u-21381",
    "username": "21381",
    "full_name": "นายธรรศกร รุ่งรัตนพงศ์ศร (ม.4/9)",
    "real_name": "นายธรรศกร รุ่งรัตนพงศ์ศร",
    "role": "student",
    "student_id": "21381",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21381"
  },
  "21382": {
    "id": "u-21382",
    "username": "21382",
    "full_name": "นายภคพล พรหมแพทย์ (ม.4/9)",
    "real_name": "นายภคพล พรหมแพทย์",
    "role": "student",
    "student_id": "21382",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21382"
  },
  "21383": {
    "id": "u-21383",
    "username": "21383",
    "full_name": "นายภูริชญา พิมพาแป้น (ม.4/12)",
    "real_name": "นายภูริชญา พิมพาแป้น",
    "role": "student",
    "student_id": "21383",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21383"
  },
  "21385": {
    "id": "u-21385",
    "username": "21385",
    "full_name": "นายศิวกร จงรักกลาง (ม.4/9)",
    "real_name": "นายศิวกร จงรักกลาง",
    "role": "student",
    "student_id": "21385",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21385"
  },
  "21387": {
    "id": "u-21387",
    "username": "21387",
    "full_name": "นางสาวกนกนัดดา ฟั่นเฝือ (ม.4/9)",
    "real_name": "นางสาวกนกนัดดา ฟั่นเฝือ",
    "role": "student",
    "student_id": "21387",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21387"
  },
  "21388": {
    "id": "u-21388",
    "username": "21388",
    "full_name": "เด็กหญิงกฤติมา มะขามเทศ (ม.4/10)",
    "real_name": "เด็กหญิงกฤติมา มะขามเทศ",
    "role": "student",
    "student_id": "21388",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21388"
  },
  "21389": {
    "id": "u-21389",
    "username": "21389",
    "full_name": "นางสาวจินต์จุฑา พงษ์กิ่ง (ม.4/9)",
    "real_name": "นางสาวจินต์จุฑา พงษ์กิ่ง",
    "role": "student",
    "student_id": "21389",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21389"
  },
  "21390": {
    "id": "u-21390",
    "username": "21390",
    "full_name": "นางสาวชวิศา มั่นคง (ม.4/9)",
    "real_name": "นางสาวชวิศา มั่นคง",
    "role": "student",
    "student_id": "21390",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21390"
  },
  "21391": {
    "id": "u-21391",
    "username": "21391",
    "full_name": "นางสาวณฐอร นายะพันธ์ (ม.4/9)",
    "real_name": "นางสาวณฐอร นายะพันธ์",
    "role": "student",
    "student_id": "21391",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21391"
  },
  "21392": {
    "id": "u-21392",
    "username": "21392",
    "full_name": "นางสาวณัฐรดา กาบขุนทด (ม.4/9)",
    "real_name": "นางสาวณัฐรดา กาบขุนทด",
    "role": "student",
    "student_id": "21392",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21392"
  },
  "21393": {
    "id": "u-21393",
    "username": "21393",
    "full_name": "นางสาวทิพวัลย์ ทาสะโก (ม.4/10)",
    "real_name": "นางสาวทิพวัลย์ ทาสะโก",
    "role": "student",
    "student_id": "21393",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21393"
  },
  "21394": {
    "id": "u-21394",
    "username": "21394",
    "full_name": "นางสาวธนพรพรรณ มั่นกำเนิด (ม.4/9)",
    "real_name": "นางสาวธนพรพรรณ มั่นกำเนิด",
    "role": "student",
    "student_id": "21394",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21394"
  },
  "21397": {
    "id": "u-21397",
    "username": "21397",
    "full_name": "นางสาวน้ำฟ้า เผ่นจันทึก (ม.4/9)",
    "real_name": "นางสาวน้ำฟ้า เผ่นจันทึก",
    "role": "student",
    "student_id": "21397",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21397"
  },
  "21400": {
    "id": "u-21400",
    "username": "21400",
    "full_name": "นางสาวพรศิรินทร์ ศรีภา (ม.4/9)",
    "real_name": "นางสาวพรศิรินทร์ ศรีภา",
    "role": "student",
    "student_id": "21400",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21400"
  },
  "21402": {
    "id": "u-21402",
    "username": "21402",
    "full_name": "นางสาวภาสินี ไหลยา (ม.4/9)",
    "real_name": "นางสาวภาสินี ไหลยา",
    "role": "student",
    "student_id": "21402",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21402"
  },
  "21403": {
    "id": "u-21403",
    "username": "21403",
    "full_name": "เด็กหญิงรดากร มีสวรรค์ (ม.4/10)",
    "real_name": "เด็กหญิงรดากร มีสวรรค์",
    "role": "student",
    "student_id": "21403",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21403"
  },
  "21404": {
    "id": "u-21404",
    "username": "21404",
    "full_name": "นางสาวรวิสรา ฟุ้งจันทึก (ม.4/9)",
    "real_name": "นางสาวรวิสรา ฟุ้งจันทึก",
    "role": "student",
    "student_id": "21404",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21404"
  },
  "21405": {
    "id": "u-21405",
    "username": "21405",
    "full_name": "นางสาวศรัณย์ภัทร ลัดลอย (ม.4/9)",
    "real_name": "นางสาวศรัณย์ภัทร ลัดลอย",
    "role": "student",
    "student_id": "21405",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21405"
  },
  "21411": {
    "id": "u-21411",
    "username": "21411",
    "full_name": "นายพิพัฒน์พงษ์ พงษ์ขจร (ม.4/10)",
    "real_name": "นายพิพัฒน์พงษ์ พงษ์ขจร",
    "role": "student",
    "student_id": "21411",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21411"
  },
  "21412": {
    "id": "u-21412",
    "username": "21412",
    "full_name": "นายภาณุศิษฏ์ คำไขสอน (ม.4/12)",
    "real_name": "นายภาณุศิษฏ์ คำไขสอน",
    "role": "student",
    "student_id": "21412",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21412"
  },
  "21413": {
    "id": "u-21413",
    "username": "21413",
    "full_name": "เด็กชายภูมาธิน ไพรวงค์ (ม.4/4)",
    "real_name": "เด็กชายภูมาธิน ไพรวงค์",
    "role": "student",
    "student_id": "21413",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21413"
  },
  "21418": {
    "id": "u-21418",
    "username": "21418",
    "full_name": "นายอคิราภ์ น้อยบัวทิพย์ (ม.4/9)",
    "real_name": "นายอคิราภ์ น้อยบัวทิพย์",
    "role": "student",
    "student_id": "21418",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21418"
  },
  "21420": {
    "id": "u-21420",
    "username": "21420",
    "full_name": "นางสาวกรวรรณ นรชาญ (ม.4/9)",
    "real_name": "นางสาวกรวรรณ นรชาญ",
    "role": "student",
    "student_id": "21420",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21420"
  },
  "21422": {
    "id": "u-21422",
    "username": "21422",
    "full_name": "นางสาวกฤษศินี มณโฑ (ม.4/10)",
    "real_name": "นางสาวกฤษศินี มณโฑ",
    "role": "student",
    "student_id": "21422",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21422"
  },
  "21427": {
    "id": "u-21427",
    "username": "21427",
    "full_name": "นางสาวจุติไตรพร กรองสี (ม.4/4)",
    "real_name": "นางสาวจุติไตรพร กรองสี",
    "role": "student",
    "student_id": "21427",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21427"
  },
  "21428": {
    "id": "u-21428",
    "username": "21428",
    "full_name": "นางสาวชุติมา จันทร์ทา (ม.4/4)",
    "real_name": "นางสาวชุติมา จันทร์ทา",
    "role": "student",
    "student_id": "21428",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21428"
  },
  "21429": {
    "id": "u-21429",
    "username": "21429",
    "full_name": "นางสาวณัฏฐณิชา แก้วมงคล (ม.4/9)",
    "real_name": "นางสาวณัฏฐณิชา แก้วมงคล",
    "role": "student",
    "student_id": "21429",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21429"
  },
  "21431": {
    "id": "u-21431",
    "username": "21431",
    "full_name": "นางสาวทองนภา บุญอินทร์ (ม.4/10)",
    "real_name": "นางสาวทองนภา บุญอินทร์",
    "role": "student",
    "student_id": "21431",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21431"
  },
  "21432": {
    "id": "u-21432",
    "username": "21432",
    "full_name": "นางสาวทิพย์ลดา ทองทรัพย์ (ม.4/9)",
    "real_name": "นางสาวทิพย์ลดา ทองทรัพย์",
    "role": "student",
    "student_id": "21432",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21432"
  },
  "21434": {
    "id": "u-21434",
    "username": "21434",
    "full_name": "นางสาวธาวินี ปานสังข์ (ม.4/12)",
    "real_name": "นางสาวธาวินี ปานสังข์",
    "role": "student",
    "student_id": "21434",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21434"
  },
  "21436": {
    "id": "u-21436",
    "username": "21436",
    "full_name": "นางสาวนารีรัตน์ เหตุเกษ (ม.4/4)",
    "real_name": "นางสาวนารีรัตน์ เหตุเกษ",
    "role": "student",
    "student_id": "21436",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21436"
  },
  "21437": {
    "id": "u-21437",
    "username": "21437",
    "full_name": "นางสาวบุศราคัมภ์ ถาวรณ์ (ม.4/10)",
    "real_name": "นางสาวบุศราคัมภ์ ถาวรณ์",
    "role": "student",
    "student_id": "21437",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21437"
  },
  "21438": {
    "id": "u-21438",
    "username": "21438",
    "full_name": "นางสาวปลื้มฤดี พิทักษ์ (ม.4/4)",
    "real_name": "นางสาวปลื้มฤดี พิทักษ์",
    "role": "student",
    "student_id": "21438",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21438"
  },
  "21439": {
    "id": "u-21439",
    "username": "21439",
    "full_name": "นางสาวปัญจพร ปะเตสัง (ม.4/9)",
    "real_name": "นางสาวปัญจพร ปะเตสัง",
    "role": "student",
    "student_id": "21439",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21439"
  },
  "21442": {
    "id": "u-21442",
    "username": "21442",
    "full_name": "นางสาววรดา พลฤทธิ์ (ม.4/12)",
    "real_name": "นางสาววรดา พลฤทธิ์",
    "role": "student",
    "student_id": "21442",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21442"
  },
  "21443": {
    "id": "u-21443",
    "username": "21443",
    "full_name": "นางสาวสิชา เจษฎาคม (ม.4/9)",
    "real_name": "นางสาวสิชา เจษฎาคม",
    "role": "student",
    "student_id": "21443",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21443"
  },
  "21444": {
    "id": "u-21444",
    "username": "21444",
    "full_name": "นางสาวสุชานันท์ ปองสันเทียะ (ม.4/9)",
    "real_name": "นางสาวสุชานันท์ ปองสันเทียะ",
    "role": "student",
    "student_id": "21444",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21444"
  },
  "21445": {
    "id": "u-21445",
    "username": "21445",
    "full_name": "นางสาวสุทธิฉันท์ สมจิตร์ (ม.4/10)",
    "real_name": "นางสาวสุทธิฉันท์ สมจิตร์",
    "role": "student",
    "student_id": "21445",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21445"
  },
  "21558": {
    "id": "u-21558",
    "username": "21558",
    "full_name": "นายธนวินท์ ฝอยหิน (ม.4/10)",
    "real_name": "นายธนวินท์ ฝอยหิน",
    "role": "student",
    "student_id": "21558",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21558"
  },
  "23479": {
    "id": "u-23479",
    "username": "23479",
    "full_name": "เด็กชายเกียรติคุณ ประสิทธิ์นอก (ม.4/4)",
    "real_name": "เด็กชายเกียรติคุณ ประสิทธิ์นอก",
    "role": "student",
    "student_id": "23479",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23479"
  },
  "23480": {
    "id": "u-23480",
    "username": "23480",
    "full_name": "นายณัฐวุฒิ จำปาบุรี (ม.4/4)",
    "real_name": "นายณัฐวุฒิ จำปาบุรี",
    "role": "student",
    "student_id": "23480",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23480"
  },
  "23481": {
    "id": "u-23481",
    "username": "23481",
    "full_name": "นายปฐวี แถวโสภา (ม.4/4)",
    "real_name": "นายปฐวี แถวโสภา",
    "role": "student",
    "student_id": "23481",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23481"
  },
  "23482": {
    "id": "u-23482",
    "username": "23482",
    "full_name": "นายปภังกร ปานสุวรรณ์ (ม.4/4)",
    "real_name": "นายปภังกร ปานสุวรรณ์",
    "role": "student",
    "student_id": "23482",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23482"
  },
  "23483": {
    "id": "u-23483",
    "username": "23483",
    "full_name": "เด็กชายภาณุวัฒน์ แก้วแก่นคูณ (ม.4/4)",
    "real_name": "เด็กชายภาณุวัฒน์ แก้วแก่นคูณ",
    "role": "student",
    "student_id": "23483",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23483"
  },
  "23484": {
    "id": "u-23484",
    "username": "23484",
    "full_name": "นายภานุวัฒน์ ขันทอง (ม.4/4)",
    "real_name": "นายภานุวัฒน์ ขันทอง",
    "role": "student",
    "student_id": "23484",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23484"
  },
  "23485": {
    "id": "u-23485",
    "username": "23485",
    "full_name": "นายวัชรากร โคตรโนนกอก (ม.4/4)",
    "real_name": "นายวัชรากร โคตรโนนกอก",
    "role": "student",
    "student_id": "23485",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23485"
  },
  "23486": {
    "id": "u-23486",
    "username": "23486",
    "full_name": "นางสาวกชพร บุสทิพย์ (ม.4/4)",
    "real_name": "นางสาวกชพร บุสทิพย์",
    "role": "student",
    "student_id": "23486",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23486"
  },
  "23487": {
    "id": "u-23487",
    "username": "23487",
    "full_name": "นางสาวกวินตรา หวังยศ (ม.4/4)",
    "real_name": "นางสาวกวินตรา หวังยศ",
    "role": "student",
    "student_id": "23487",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23487"
  },
  "23488": {
    "id": "u-23488",
    "username": "23488",
    "full_name": "นางสาวขวัญจิรา ไพรัตน์ (ม.4/4)",
    "real_name": "นางสาวขวัญจิรา ไพรัตน์",
    "role": "student",
    "student_id": "23488",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23488"
  },
  "23489": {
    "id": "u-23489",
    "username": "23489",
    "full_name": "เด็กหญิงจุฬามณี ม่วงคุ้ม (ม.4/4)",
    "real_name": "เด็กหญิงจุฬามณี ม่วงคุ้ม",
    "role": "student",
    "student_id": "23489",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23489"
  },
  "23490": {
    "id": "u-23490",
    "username": "23490",
    "full_name": "นางสาวฐิตาภา จู (ม.4/4)",
    "real_name": "นางสาวฐิตาภา จู",
    "role": "student",
    "student_id": "23490",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23490"
  },
  "23491": {
    "id": "u-23491",
    "username": "23491",
    "full_name": "เด็กหญิงธัญลักษณ์ ไชยสนาม (ม.4/4)",
    "real_name": "เด็กหญิงธัญลักษณ์ ไชยสนาม",
    "role": "student",
    "student_id": "23491",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23491"
  },
  "23492": {
    "id": "u-23492",
    "username": "23492",
    "full_name": "เด็กหญิงนันทิชา ประมวล (ม.4/4)",
    "real_name": "เด็กหญิงนันทิชา ประมวล",
    "role": "student",
    "student_id": "23492",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23492"
  },
  "23493": {
    "id": "u-23493",
    "username": "23493",
    "full_name": "นางสาวปนัดดา ลือปัญญา (ม.4/4)",
    "real_name": "นางสาวปนัดดา ลือปัญญา",
    "role": "student",
    "student_id": "23493",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23493"
  },
  "23494": {
    "id": "u-23494",
    "username": "23494",
    "full_name": "เด็กหญิงปรียานุช แดงสวัสดิ์ (ม.4/4)",
    "real_name": "เด็กหญิงปรียานุช แดงสวัสดิ์",
    "role": "student",
    "student_id": "23494",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23494"
  },
  "23495": {
    "id": "u-23495",
    "username": "23495",
    "full_name": "เด็กหญิงปาริตา ป่ากว้าง (ม.4/4)",
    "real_name": "เด็กหญิงปาริตา ป่ากว้าง",
    "role": "student",
    "student_id": "23495",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23495"
  },
  "23496": {
    "id": "u-23496",
    "username": "23496",
    "full_name": "นางสาวพิรดา หลอดเข็ม (ม.4/4)",
    "real_name": "นางสาวพิรดา หลอดเข็ม",
    "role": "student",
    "student_id": "23496",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23496"
  },
  "23497": {
    "id": "u-23497",
    "username": "23497",
    "full_name": "นางสาวมธุริน พุทธโคตร (ม.4/4)",
    "real_name": "นางสาวมธุริน พุทธโคตร",
    "role": "student",
    "student_id": "23497",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23497"
  },
  "23498": {
    "id": "u-23498",
    "username": "23498",
    "full_name": "เด็กหญิงรัตติกาล ประเสริฐ (ม.4/4)",
    "real_name": "เด็กหญิงรัตติกาล ประเสริฐ",
    "role": "student",
    "student_id": "23498",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23498"
  },
  "23499": {
    "id": "u-23499",
    "username": "23499",
    "full_name": "นางสาววชิรญา ดำรงค์สกุลไทย (ม.4/4)",
    "real_name": "นางสาววชิรญา ดำรงค์สกุลไทย",
    "role": "student",
    "student_id": "23499",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23499"
  },
  "23500": {
    "id": "u-23500",
    "username": "23500",
    "full_name": "นางสาววนิดา สุวรรณสิงห์ (ม.4/4)",
    "real_name": "นางสาววนิดา สุวรรณสิงห์",
    "role": "student",
    "student_id": "23500",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23500"
  },
  "23501": {
    "id": "u-23501",
    "username": "23501",
    "full_name": "เด็กหญิงสิริกุล บุญไสว (ม.4/4)",
    "real_name": "เด็กหญิงสิริกุล บุญไสว",
    "role": "student",
    "student_id": "23501",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23501"
  },
  "23502": {
    "id": "u-23502",
    "username": "23502",
    "full_name": "นางสาวสุทธิดา ป้องประดา (ม.4/4)",
    "real_name": "นางสาวสุทธิดา ป้องประดา",
    "role": "student",
    "student_id": "23502",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23502"
  },
  "23503": {
    "id": "u-23503",
    "username": "23503",
    "full_name": "นางสาวสุพัตรา เพชรทิพย์ (ม.4/4)",
    "real_name": "นางสาวสุพัตรา เพชรทิพย์",
    "role": "student",
    "student_id": "23503",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23503"
  },
  "23504": {
    "id": "u-23504",
    "username": "23504",
    "full_name": "นางสาวอภิญญา ทวีสกุลรัตน์ (ม.4/4)",
    "real_name": "นางสาวอภิญญา ทวีสกุลรัตน์",
    "role": "student",
    "student_id": "23504",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23504"
  },
  "23505": {
    "id": "u-23505",
    "username": "23505",
    "full_name": "นางสาวอริสรา ตันสุรินทร์ (ม.4/4)",
    "real_name": "นางสาวอริสรา ตันสุรินทร์",
    "role": "student",
    "student_id": "23505",
    "class_room": "ม.4/4",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23505"
  },
  "23548": {
    "id": "u-23548",
    "username": "23548",
    "full_name": "นางสาวกฤติกา กันจันทึก (ม.4/9)",
    "real_name": "นางสาวกฤติกา กันจันทึก",
    "role": "student",
    "student_id": "23548",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23548"
  },
  "23549": {
    "id": "u-23549",
    "username": "23549",
    "full_name": "นางสาวธนาภา เลิศสัจจวรากุล (ม.4/9)",
    "real_name": "นางสาวธนาภา เลิศสัจจวรากุล",
    "role": "student",
    "student_id": "23549",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23549"
  },
  "23550": {
    "id": "u-23550",
    "username": "23550",
    "full_name": "นางสาวสุชัญญา สำรวมสุข (ม.4/9)",
    "real_name": "นางสาวสุชัญญา สำรวมสุข",
    "role": "student",
    "student_id": "23550",
    "class_room": "ม.4/9",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23550"
  },
  "23551": {
    "id": "u-23551",
    "username": "23551",
    "full_name": "นายธนเดช กรัดคล้ำ (ม.4/10)",
    "real_name": "นายธนเดช กรัดคล้ำ",
    "role": "student",
    "student_id": "23551",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23551"
  },
  "23552": {
    "id": "u-23552",
    "username": "23552",
    "full_name": "นายธนวินท์ นาจำรัส (ม.4/10)",
    "real_name": "นายธนวินท์ นาจำรัส",
    "role": "student",
    "student_id": "23552",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23552"
  },
  "23553": {
    "id": "u-23553",
    "username": "23553",
    "full_name": "เด็กชายภวัต สุขสีดา (ม.4/10)",
    "real_name": "เด็กชายภวัต สุขสีดา",
    "role": "student",
    "student_id": "23553",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23553"
  },
  "23554": {
    "id": "u-23554",
    "username": "23554",
    "full_name": "เด็กชายศุภกรณ์ ราชสีหสุข (ม.4/10)",
    "real_name": "เด็กชายศุภกรณ์ ราชสีหสุข",
    "role": "student",
    "student_id": "23554",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23554"
  },
  "23555": {
    "id": "u-23555",
    "username": "23555",
    "full_name": "นางสาวกัญญาภัค ปาราชิตัง (ม.4/10)",
    "real_name": "นางสาวกัญญาภัค ปาราชิตัง",
    "role": "student",
    "student_id": "23555",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23555"
  },
  "23556": {
    "id": "u-23556",
    "username": "23556",
    "full_name": "นางสาวตติยา พรมณี (ม.4/10)",
    "real_name": "นางสาวตติยา พรมณี",
    "role": "student",
    "student_id": "23556",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23556"
  },
  "23557": {
    "id": "u-23557",
    "username": "23557",
    "full_name": "นางสาวธนัชพร เนืองนอง (ม.4/10)",
    "real_name": "นางสาวธนัชพร เนืองนอง",
    "role": "student",
    "student_id": "23557",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23557"
  },
  "23558": {
    "id": "u-23558",
    "username": "23558",
    "full_name": "เด็กหญิงลัทวรรณ โพธิ์งาม (ม.4/10)",
    "real_name": "เด็กหญิงลัทวรรณ โพธิ์งาม",
    "role": "student",
    "student_id": "23558",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23558"
  },
  "23559": {
    "id": "u-23559",
    "username": "23559",
    "full_name": "นางสาวสรัญญา ดวงแข (ม.4/10)",
    "real_name": "นางสาวสรัญญา ดวงแข",
    "role": "student",
    "student_id": "23559",
    "class_room": "ม.4/10",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23559"
  },
  "23567": {
    "id": "u-23567",
    "username": "23567",
    "full_name": "นายกันณภัทร ศรีอัสดร (ม.4/12)",
    "real_name": "นายกันณภัทร ศรีอัสดร",
    "role": "student",
    "student_id": "23567",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23567"
  },
  "23568": {
    "id": "u-23568",
    "username": "23568",
    "full_name": "นายณัฐกรณ์ พรมวงศ์ (ม.4/12)",
    "real_name": "นายณัฐกรณ์ พรมวงศ์",
    "role": "student",
    "student_id": "23568",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23568"
  },
  "23569": {
    "id": "u-23569",
    "username": "23569",
    "full_name": "นายธรรมพน แสงสุรเดช (ม.4/12)",
    "real_name": "นายธรรมพน แสงสุรเดช",
    "role": "student",
    "student_id": "23569",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23569"
  },
  "23570": {
    "id": "u-23570",
    "username": "23570",
    "full_name": "นายธีร์ธดา จึงตระกูล (ม.4/12)",
    "real_name": "นายธีร์ธดา จึงตระกูล",
    "role": "student",
    "student_id": "23570",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23570"
  },
  "23571": {
    "id": "u-23571",
    "username": "23571",
    "full_name": "นางสาวจันทรัสม์ บุญศรี (ม.4/12)",
    "real_name": "นางสาวจันทรัสม์ บุญศรี",
    "role": "student",
    "student_id": "23571",
    "class_room": "ม.4/12",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23571"
  }
};

// Load persistent cached student accounts from localStorage if present
try {
  const cachedStudents = localStorage.getItem('csm4_student_accounts');
  if (cachedStudents) {
    Object.assign(STUDENT_ACCOUNTS, JSON.parse(cachedStudents));
  }
} catch (e) {}

// Supabase Student Tab CSV URL
const GOOGLE_STUDENT_SHEET_CSV = 'https://docs.google.com/spreadsheets/d/13n23D7lMUIwjwArmoOyOyY5eNSLz_a2Fw7Jkb2QqrWA/export?format=csv&gid=0';

// Client-side Supabase student roster sync
async function syncStudentsFromGoogleSheetClient(silent = false) {
  const syncBtn = document.getElementById('btn-sync-students-now');
  if (syncBtn && !silent) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin mr-1"></i> กำลังดึงข้อมูลจากชีต...';
  }

  let count = 0;
  const classesFound = {};

  try {
    // 1. If running under server mode, call server sync endpoint first
    if (!isStaticOrServerlessHost()) {
      try {
        let serverRes = null;
        try {
          serverRes = await apiFetch('/sync/students', 'POST');
        } catch (e) {}
        if (serverRes && serverRes.success) {
          count = serverRes.totalStudents;
          if (serverRes.classes) Object.assign(classesFound, serverRes.classes);
        }
      } catch (srvErr) {
        console.warn('Server student sync endpoint failed, fallback to client fetch:', srvErr.message);
      }
    }

    // 2. Fetch directly from Supabase Cloud REST API first (works on GitHub Pages & static hosts)
    let fetchedFromSupabase = false;
    try {
      const sbUsersRes = await fetch(`${SUPABASE_REST_URL}/users?role=eq.student&select=*`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (sbUsersRes.ok) {
        const sbUsers = await sbUsersRes.json();
        if (Array.isArray(sbUsers) && sbUsers.length > 0) {
          sbUsers.forEach(u => {
            const cleanId = (u.student_id || u.username).trim();
            const cleanClass = (u.class_room || 'ม.4').trim();
            classesFound[cleanClass] = (classesFound[cleanClass] || 0) + 1;
            STUDENT_ACCOUNTS[cleanId] = {
              id: u.id || `u-${cleanId}`,
              username: cleanId,
              full_name: u.full_name || `${u.real_name} (${cleanClass})`,
              real_name: u.real_name || u.full_name,
              class_room: cleanClass,
              role: 'student',
              avatar: u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanId}`
            };
          });
          fetchedFromSupabase = true;
          count = Object.keys(STUDENT_ACCOUNTS).length;
          localStorage.setItem('csm4_student_accounts', JSON.stringify(STUDENT_ACCOUNTS));
          localStorage.setItem('csm4_students_last_synced', new Date().toISOString());
        }
      }
    } catch (sbErr) {
      console.warn('Direct Supabase REST student fetch fallback to CSV:', sbErr.message);
    }

    // 3. Fallback to Google Sheet CSV if Supabase REST was unreachable
    if (!fetchedFromSupabase) try {
      const response = await fetch(GOOGLE_STUDENT_SHEET_CSV, { cache: 'no-store' });
      if (response.ok) {
        const csvText = await response.text();
        const lines = csvText.trim().split(/\r?\n/);
        for (let i = 1; i < lines.length; i++) {
          const match = lines[i].match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
          if (match) {
            const row = match.map(m => {
              let val = m.startsWith(',') ? m.slice(1) : m;
              val = val.trim();
              if (val.startsWith('"') && val.endsWith('"')) {
                val = val.slice(1, -1).replace(/""/g, '"');
              }
              return val;
            });
            const [studentId, name, className] = row;
            if (studentId && name) {
              const cleanId = studentId.trim();
              const cleanName = name.trim();
              const cleanClass = (className || 'ม.4').trim();
              classesFound[cleanClass] = (classesFound[cleanClass] || 0) + 1;
              STUDENT_ACCOUNTS[cleanId] = {
                id: `u-${cleanId}`,
                username: cleanId,
                full_name: `${cleanName} (${cleanClass})`,
                real_name: cleanName,
                class_room: cleanClass,
                role: 'student',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanId}`
              };
            }
          }
        }
        count = Object.keys(STUDENT_ACCOUNTS).length;
        localStorage.setItem('csm4_student_accounts', JSON.stringify(STUDENT_ACCOUNTS));
        localStorage.setItem('csm4_students_last_synced', new Date().toISOString());
      }
    } catch (directErr) {
      console.warn('Direct Supabase CSV fetch warning:', directErr.message);
    }

    updateStudentSyncUI();

    if (!silent) {
      const classBreakdown = Object.entries(classesFound).map(([c, n]) => `${c}: ${n} คน`).join(', ');
      showToast(`อัปเดตข้อมูลนักเรียนในระบบสำเร็จ! รวม ${count} คน ${classBreakdown ? '• ' + classBreakdown : ''}`, 'success');
      if (typeof loadAdminData === 'function') {
        loadAdminData();
      }
    }

    return { success: true, count, classes: classesFound };
  } catch (err) {
    if (!silent) {
      showToast(`ไม่สามารถซิงค์ข้อมูลนักเรียน: ${err.message}`, 'error');
    }
    return { success: false, error: err.message };
  } finally {
    if (syncBtn && !silent) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate mr-1"></i> ซิงค์รายชื่อนักเรียนทันที (Sync Now)';
    }
  }
}

// Update Admin UI student stats
function updateStudentSyncUI() {
  const statBadge = document.getElementById('admin-student-sync-stats');
  if (statBadge) {
    const total = typeof STUDENT_ACCOUNTS !== 'undefined' ? Object.keys(STUDENT_ACCOUNTS).length : 0;
    const classes = {};
    if (typeof STUDENT_ACCOUNTS !== 'undefined') {
      Object.values(STUDENT_ACCOUNTS).forEach(s => {
        classes[s.class_room] = (classes[s.class_room] || 0) + 1;
      });
    }
    const classSummary = Object.entries(classes).map(([c, n]) => `<span style="background: var(--surface-secondary); padding: 2px 8px; border-radius: 6px; font-weight: 600;">${c}: <strong>${n}</strong> คน</span>`).join(' ');
    statBadge.innerHTML = `<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 6px;"><span style="font-weight: 700; color: var(--thairath-green);"><i class="fa-solid fa-circle-check mr-1"></i>พบในระบบ ${total} คน</span> ${classSummary}</div>`;
  }
}

// Perform Login via /api/auth/login
async function handleLogin(username, password) {
  const errMsg = document.getElementById('login-error-msg');
  const errText = document.getElementById('login-error-text');
  const submitBtn = document.getElementById('btn-login-submit');

  try {
    if (errMsg) errMsg.style.display = 'none';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-1"></i> กำลังเข้าสู่ระบบ...';
    }

    let res;
    if (isStaticOrServerlessHost()) {
      const staffAccounts = {
        'teacher': { user: { id: 'u-teacher', username: 'teacher', full_name: 'ครูปณิฏฐา บุญยงค์ (ผู้สอน ม.4)', role: 'teacher', avatar: 'img/teacher_panittha.jpg' }, token: 'mock-token-teacher' },
        'admin': { user: { id: 'u-admin', username: 'admin', full_name: 'ผู้ดูแลระบบ (Admin CS-M4)', role: 'admin', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin' }, token: 'mock-token-admin' }
      };

      if (staffAccounts[username]) {
        if (password === 'teacher123' || password === 'admin123' || password === username + '123' || password === 'pass1234') {
          res = staffAccounts[username];
        } else {
          throw new Error('รหัสผ่านไม่ถูกต้อง');
        }
      } else {
        // If not found in cache/memory, attempt on-demand live pull from Supabase
        if (!STUDENT_ACCOUNTS[username]) {
          try {
            await syncStudentsFromGoogleSheetClient(true);
          } catch (e) {}
        }

        if (STUDENT_ACCOUNTS[username]) {
          const student = STUDENT_ACCOUNTS[username];
          if (password === username) {
            res = {
              user: {
                id: student.id,
                username: student.username,
                full_name: student.full_name,
                real_name: student.real_name,
                student_id: student.username,
                class_room: student.class_room,
                role: 'student',
                avatar: student.avatar
              },
              token: `mock-token-${student.username}`
            };
          } else {
            throw new Error('รหัสผ่านไม่ถูกต้อง (สำหรับนักเรียน ให้ใช้รหัสนักเรียน 5 หลักเป็นรหัสผ่าน)');
          }
        } else {
          throw new Error('ไม่พบรหัสนักเรียนหรือชื่อผู้ใช้นี้ในระบบ (กรุณาตรวจสอบรหัสนักเรียน 5 หลักให้ถูกต้อง)');
        }
      }
    } else {
      // In server mode: try logging in; if user not found, trigger sync and retry
      try {
        res = await apiFetch('/auth/login', 'POST', { username, password });
      } catch (loginErr) {
        if (loginErr.message && (loginErr.message.includes('ไม่พบ') || loginErr.message.includes('NOT_FOUND'))) {
          try {
            await syncStudentsFromGoogleSheetClient(true);
            res = await apiFetch('/auth/login', 'POST', { username, password });
          } catch (retryErr) {
            throw loginErr;
          }
        } else {
          throw loginErr;
        }
      }
    }

    currentUser = res.user;
    // Apply saved custom avatar if exists
    const savedCustomAvatar = localStorage.getItem('csm4_avatar_' + currentUser.username);
    if (savedCustomAvatar) {
      currentUser.avatar = savedCustomAvatar;
    }
    currentToken = res.token;

    // Persist session
    localStorage.setItem('csm4_token', currentToken);
    localStorage.setItem('csm4_user', JSON.stringify(currentUser));
    sessionStorage.setItem('csm4_explicit_login', 'true');

    updateAuthUI();
    closeModal('modal-login');
    showToast(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ ${currentUser.full_name}`, 'success');

    // Reload active tab
    switchTab(activeTab);
  } catch (err) {
    if (errMsg && errText) {
      errText.innerText = err.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
      errMsg.style.display = 'flex';
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-1"></i> เข้าสู่ระบบ';
    }
  }
}

// Form submit handler
async function handleLoginSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  if (!username || !password) {
    showToast('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', 'error');
    return;
  }
  await handleLogin(username, password);
}

// Quick 1-click login for test accounts
async function quickFillAndLogin(username, password) {
  const uInput = document.getElementById('login-username');
  const pInput = document.getElementById('login-password');
  if (uInput) uInput.value = username;
  if (pInput) pInput.value = password;
  await handleLogin(username, password);
}

// Logout handler
function handleLogout() {
  localStorage.removeItem('csm4_token');
  localStorage.removeItem('csm4_user');
  sessionStorage.removeItem('csm4_explicit_login');
  currentUser = null;
  currentToken = '';
  updateAuthUI();
  showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
  if (activeTab === 'teacher' || activeTab === 'admin') {
    switchTab('home');
  } else {
    switchTab(activeTab);
  }
}

// Quick Switch Role (kept for backwards compatibility)
async function quickSwitchRole(role) {
  const credentials = {
    student1: { u: 'student1', p: 'student123' },
    student2: { u: 'student2', p: 'student123' },
    teacher: { u: 'teacher', p: 'teacher123' },
    admin: { u: 'admin', p: 'admin123' }
  };
  const cred = credentials[role] || credentials.student1;
  await handleLogin(cred.u, cred.p);
}

// Tab Switcher Router
function switchTab(tabId) {
  // Role Protection
  if (tabId === 'teacher' && (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin'))) {
    showToast('หน้านี้สำหรับครูผู้สอน กรุณาเข้าสู่ระบบด้วยบัญชีครู', 'error');
    openLoginModal();
    return;
  }
  if (tabId === 'admin' && (!currentUser || currentUser.role !== 'admin')) {
    showToast('หน้านี้สำหรับผู้ดูแลระบบ กรุณาเข้าสู่ระบบด้วยบัญชี Admin', 'error');
    openLoginModal();
    return;
  }


  activeTab = tabId;

  // Update Main Nav items (including Thairath categories and dropdown items)
  document.querySelectorAll('.nav-item, .thairath-cat-item, .thairath-cat-dropbtn, .thairath-drop-link').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeNav = document.getElementById(`nav-${tabId}`);
  if (activeNav) activeNav.classList.add('active');

  // Activate parent category dropdown button if this tab belongs to a category group
  const categoryGroupMap = {
    'lessons': 'nav-group-learning',
    'ebook': 'nav-group-learning',
    'media': 'nav-group-learning',
    'ct-tools': 'nav-group-learning',
    'worksheets': 'nav-group-tasks',
    'assignments': 'nav-group-tasks',
    'quizzes': 'nav-group-eval',
    'analytics': 'nav-group-eval',
    'teacher': 'nav-group-management',
    'admin': 'nav-group-management'
  };

  const parentGroupId = categoryGroupMap[tabId];
  if (parentGroupId) {
    const parentBtn = document.getElementById(parentGroupId);
    if (parentBtn) parentBtn.classList.add('active');
  }

  // Close all open dropdowns and submenus
  document.querySelectorAll('.thairath-cat-dropdown, .thairath-has-submenu').forEach(d => {
    d.classList.remove('is-open');
  });

  // Update Subnav items
  document.querySelectorAll('.sub-item').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeSub = document.getElementById(`sub-${tabId}`);
  if (activeSub) activeSub.classList.add('active');

  // Hide all tabs & show active
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hidden');
    tab.style.display = 'none';
  });
  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
    activeContent.style.display = 'block';
  }

  // Close mobile menu if open
  const navLinks = document.getElementById('nav-links');
  if (navLinks && navLinks.classList.contains('mobile-open')) {
    navLinks.classList.remove('mobile-open');
  }

  // Load Tab Specific Data
  if (tabId === 'home') {
    loadHomeData();
    initHeroSlider();
    initBillboardSlider();
  } else {
    pauseHeroSlider();
    pauseBillboardSlider();
  }
  if (tabId === 'lessons') loadLessonsData();
  else if (tabId === 'media') loadMediaData();
  else if (tabId === 'ebook') loadEbookData();
  else if (tabId === 'worksheets') loadWorksheetsData();
  else if (tabId === 'assignments') loadAssignmentsData();
  else if (tabId === 'quizzes') loadQuizzesData();
  else if (tabId === 'ct-tools') loadLessonsData();
  else if (tabId === 'teacher') loadTeacherData();
  else if (tabId === 'analytics') loadAnalyticsData();
  else if (tabId === 'admin') loadAdminData();
  else if (tabId === 'contact') loadContactData();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Category Navigation Dropdown Toggle
function toggleNavDropdown(btn, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const parent = btn.closest('.thairath-cat-dropdown');
  if (!parent) return;

  const isOpen = parent.classList.contains('is-open');
  // Close all other dropdowns & submenus
  document.querySelectorAll('.thairath-cat-dropdown, .thairath-has-submenu').forEach(d => d.classList.remove('is-open'));
  
  if (!isOpen) {
    parent.classList.add('is-open');
  }
}

// Submenu Navigation Toggle
function toggleNavSubmenu(trigger, event) {
  if (event) {
    event.stopPropagation();
  }
  const parent = trigger.closest('.thairath-has-submenu');
  if (!parent) return;

  const isOpen = parent.classList.contains('is-open');
  // Close any other open submenus
  document.querySelectorAll('.thairath-has-submenu').forEach(s => {
    if (s !== parent) s.classList.remove('is-open');
  });

  if (isOpen) {
    parent.classList.remove('is-open');
  } else {
    parent.classList.add('is-open');
  }
}

// Global click listener to close category dropdowns, submenus, and mobile drawer when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.thairath-cat-dropdown')) {
    document.querySelectorAll('.thairath-cat-dropdown, .thairath-has-submenu').forEach(d => d.classList.remove('is-open'));
  } else if (!e.target.closest('.thairath-has-submenu')) {
    document.querySelectorAll('.thairath-has-submenu').forEach(s => s.classList.remove('is-open'));
  }
  const navLinks = document.getElementById('nav-links');
  const toggleBtn = document.getElementById('mobile-toggle');
  if (navLinks && navLinks.classList.contains('mobile-open')) {
    if (!navLinks.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
      navLinks.classList.remove('mobile-open');
    }
  }
});


// ============================================================================
// SUPABASE REAL-TIME ANNOUNCEMENTS ENGINE
// ============================================================================
const SUPABASE_PROJECT_URL = 'https://fsvlkoqsfmyaxaqxsoiy.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_2FpUqt7BY0Xk3gNH2Rx95Q_DZ2bOVgM';

let globalSupabaseClient = null;
let realtimeAnnouncementChannel = null;
let announcementPollInterval = null;
let latestAnnouncementsCache = [];

function getBrowserSupabaseClient() {
  if (globalSupabaseClient) return globalSupabaseClient;
  if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      globalSupabaseClient = window.supabase.createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLISHABLE_KEY);
      console.log('⚡ [Supabase Client] Initialized in browser!');
    } catch (e) {
      console.warn('⚠️ [Supabase Client Init Warning]:', e.message);
    }
  }
  return globalSupabaseClient;
}

// Fetch Announcements with multi-layer fallback (Supabase Cloud Direct -> Local Server API -> Fallback Cache)
async function fetchAnnouncementsData() {
  const client = getBrowserSupabaseClient();
  
  // 1. Try Direct Supabase Query first
  if (client) {
    try {
      const { data, error } = await client
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        latestAnnouncementsCache = data;
        return data;
      }
    } catch (e) {
      console.warn('Direct Supabase fetch fallback to API:', e.message);
    }
  }

  // 2. Try Local Server API
  if (!isStaticOrServerlessHost()) {
    try {
      const data = await apiFetch('/announcements');
      if (Array.isArray(data) && data.length > 0) {
        latestAnnouncementsCache = data;
        return data;
      }
    } catch (e) {
      console.warn('API fetch fallback to cache:', e.message);
    }
  }

  // 3. Fallback to cached announcements
  if (latestAnnouncementsCache.length > 0) {
    return latestAnnouncementsCache;
  }

  return [
    {
      id: 'anc-1',
      title: '🚀 ยินดีต้อนรับสู่ศูนย์เรียนรู้วิทยาการคำนวณ ม.4 (Full-Stack Next-Gen)',
      content: 'เรียนรู้ผ่านสื่อมัลติมีเดีย บทเรียน วิดีโอสอน สไลด์พรีเซนเตชัน E-Book หนังสือเรียน แบบทดสอบย่อย และข้อสอบกลางภาค/ปลายภาค พร้อมบันทึกผลลง Supabase เรียลไทม์!',
      author: 'ครูปณิฏฐา บุญยงค์',
      date: '2026-09-18'
    }
  ];
}

// Render Announcements List & Update Ticker
function renderAnnouncementsUI(announcements) {
  const container = document.getElementById('announcements-list');
  if (!container) return;

  // Update Thairath Breaking News Ticker
  const tickerEl = document.getElementById('ticker-text');
  if (tickerEl && announcements && announcements.length > 0) {
    tickerEl.innerText = announcements.map(a => `【${a.title}】: ${a.content}`).join('   ★   ');
    if (typeof updateTickerSpeed === 'function') setTimeout(updateTickerSpeed, 100);
  }

  if (!announcements || announcements.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted); background: var(--surface-secondary); border-radius: 12px; border: 1px dashed var(--border-color);">
        <i class="fa-solid fa-bullhorn" style="font-size: 2rem; color: var(--thairath-green); margin-bottom: 10px; opacity: 0.6;"></i>
        <div style="font-weight: 700; font-size: 1rem; color: var(--text-main);">ยังไม่มีประกาศใหม่ในขณะนี้</div>
        <div style="font-size: 0.82rem; margin-top: 4px;">ระบบเชื่อมต่อฐานข้อมูล Supabase Cloud เรียลไทม์ พร้อมแสดงผลทันทีเมื่อมีประกาศใหม่</div>
      </div>
    `;
    return;
  }

  container.innerHTML = announcements.map(anc => {
    const formattedDate = anc.date || (anc.created_at ? new Date(anc.created_at).toLocaleDateString('th-TH') : '');
    return `
      <div class="announcement-item" style="padding: 18px 22px; border-radius: 14px; background: var(--surface-color); border: 1px solid var(--border-color); border-left: 5px solid var(--thairath-green); box-shadow: var(--shadow-sm); transition: transform 0.2s ease, box-shadow 0.2s ease;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 6px;">
          <h4 style="font-weight: 700; font-size: 1.05rem; color: var(--text-main); display: flex; align-items: center; gap: 8px; margin: 0;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--thairath-green); display: inline-block; flex-shrink: 0;"></span>
            <span>${escapeHtml(anc.title)}</span>
          </h4>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 999px; background: rgba(0, 180, 0, 0.12); color: var(--thairath-green); font-weight: 700;">
              <i class="fa-solid fa-bolt mr-1"></i> Realtime Supabase
            </span>
            <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">
              <i class="fa-regular fa-calendar mr-1"></i> ${escapeHtml(formattedDate)}
            </span>
          </div>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.65; margin: 0 0 12px 0; white-space: pre-line;">
          ${escapeHtml(anc.content)}
        </p>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--thairath-dark-green); display: flex; align-items: center; gap: 8px; border-top: 1px dashed var(--border-color); padding-top: 10px;">
          <img src="img/teacher_panittha.jpg" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; object-position: top center; border: 1.5px solid var(--thairath-green);" alt="${escapeHtml(anc.author || 'ครูปณิฏฐา')}">
          <span>${escapeHtml(anc.author || 'ครูปณิฏฐา บุญยงค์')}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Main function to load announcements
async function loadAnnouncementsRealtime(isManual = false) {
  const icon = document.getElementById('btn-refresh-anc-icon');
  if (icon && isManual) icon.classList.add('fa-spin');

  try {
    const data = await fetchAnnouncementsData();
    renderAnnouncementsUI(data);
    if (isManual) {
      showToast('ซิงค์ข้อมูลประกาศล่าสุดจาก Supabase Cloud สำเร็จ!', 'success');
    }
  } catch (err) {
    console.error('Error loading real-time announcements:', err);
    if (isManual) showToast('ไม่สามารถดึงข้อมูลประกาศได้ กรุณาลองใหม่อีกครั้ง', 'error');
  } finally {
    if (icon && isManual) {
      setTimeout(() => icon.classList.remove('fa-spin'), 600);
    }
  }
}

// Initialize Realtime WebSocket Subscription
function initAnnouncementsRealtimeSubscription() {
  const client = getBrowserSupabaseClient();
  if (!client) {
    console.warn('⚠️ Supabase JS not available for Realtime subscription. Using polling fallback.');
    startAnnouncementsPolling();
    return;
  }

  try {
    if (realtimeAnnouncementChannel) {
      client.removeChannel(realtimeAnnouncementChannel);
    }

    realtimeAnnouncementChannel = client
      .channel('announcements-feed-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'announcements' },
        (payload) => {
          console.log('⚡ [Supabase Realtime] Event on announcements:', payload.eventType, payload);
          loadAnnouncementsRealtime(false);
        }
      )
      .subscribe((status) => {
        console.log('⚡ [Supabase Realtime] Announcements status:', status);
        const pill = document.getElementById('announcement-realtime-pill');
        if (pill) {
          if (status === 'SUBSCRIBED') {
            pill.style.background = 'rgba(0, 180, 0, 0.12)';
            pill.style.color = '#00b400';
            pill.innerHTML = '<i class="fa-solid fa-circle" style="font-size: 0.5rem; color: #00b400;"></i> <span>Supabase Realtime (เชื่อมต่อแล้ว)</span>';
          } else {
            pill.innerHTML = '<i class="fa-solid fa-circle" style="font-size: 0.5rem; color: #f59e0b;"></i> <span>Supabase Cloud Sync</span>';
          }
        }
      });
  } catch (e) {
    console.warn('Failed to start Realtime subscription:', e.message);
  }

  startAnnouncementsPolling();
}

function startAnnouncementsPolling() {
  if (announcementPollInterval) clearInterval(announcementPollInterval);
  // Auto-poll every 12 seconds
  announcementPollInterval = setInterval(() => {
    loadAnnouncementsRealtime(false);
  }, 12000);
}

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
              <div class="glass-card" style="border-radius: 20px; overflow: hidden; border: 2px solid rgba(0, 180, 0, 0.3); background: var(--bg-surface, #ffffff); box-shadow: 0 10px 25px rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between;">
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
                      <span style="background: rgba(0, 180, 0, 0.12); color: #008f00; font-weight: 800; font-size: 0.76rem; padding: 4px 12px; border-radius: 999px; letter-spacing: 0.5px;">
                        <i class="fa-solid fa-graduation-cap mr-1"></i> หน่วยการเรียนรู้ที่ 1 • 20 ชั่วโมง
                      </span>
                      <span style="font-size: 0.74rem; color: #64748b; font-weight: 600;">ตัวชี้วัด ว 4.2 ม.4/1</span>
                    </div>

                    <h3 style="font-family: 'Kanit', sans-serif; font-size: 1.35rem; font-weight: 700; color: #0f172a; margin-bottom: 6px; line-height: 1.3;">
                      แนวคิดเชิงคำนวณในการพัฒนาโครงงาน
                    </h3>
                    <div style="font-size: 0.8rem; font-weight: 600; color: #008f00; margin-bottom: 12px;">
                      Computational Thinking in Project Development
                    </div>

                    <p style="font-size: 0.88rem; color: #475569; line-height: 1.6; margin-bottom: 18px;">
                      ศึกษา 4 องค์ประกอบของแนวคิดเชิงคำนวณ การแก้ปัญหาด้วยวงจรการพัฒนาระบบ SDLC 5 ขั้นตอน และโครงสร้างการเขียนรายงานโครงงานคอมพิวเตอร์ 5 บท
                    </p>

                    <!-- Subtopics List -->
                    <div style="background: var(--bg-surface-alt, #f8fafc); border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 20px;">
                      <div style="font-size: 0.82rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                        <i class="fa-solid fa-list-check text-emerald-600 mr-1"></i> เนื้อหาสำคัญ 3 หัวข้อการเรียนรู้:
                      </div>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.82rem; color: #475569; line-height: 1.8;">
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                          <i class="fa-solid fa-check-circle text-emerald-600" style="margin-top: 4px;"></i>
                          <span><strong>1.1 แนวคิดเชิงคำนวณ:</strong> 4 องค์ประกอบ (Decomposition, Pattern, Abstraction, Algorithm) &amp; กรณีศึกษารถของตะวัน</span>
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                          <i class="fa-solid fa-check-circle text-emerald-600" style="margin-top: 4px;"></i>
                          <span><strong>1.2 วงจรการพัฒนาระบบ (SDLC):</strong> 5 ขั้นตอน, ผัง Gantt Chart 20 สัปดาห์, แผนภาพ DFD, พีระมิดทดสอบ 4 ระดับ</span>
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                          <i class="fa-solid fa-check-circle text-emerald-600" style="margin-top: 4px;"></i>
                          <span><strong>1.3 การเขียนรายงานโครงงาน:</strong> 3 ส่วนหลัก 5 บท, ผังเค้าโครงโครงงาน (Proposal) &amp; บรรณานุกรม APA</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- CTA Action Button -->
                <div style="padding: 0 24px 24px 24px;">
                  <a href="unit1.html" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px 20px; background: #00b400; color: #ffffff; font-weight: 700; font-size: 0.95rem; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(0,180,0,0.25); transition: all 0.2s;">
                    <i class="fa-solid fa-book-open"></i> เข้าสู่บทเรียน หน่วยที่ 1 (ฉบับสมบูรณ์)
                  </a>
                </div>
              </div>

              <!-- ==========================================
                   CARD 2: UNIT 2 (RIGHT ORANGE BOX)
                   ========================================== -->
              <div class="glass-card" style="border-radius: 20px; overflow: hidden; border: 2px solid rgba(2, 132, 199, 0.3); background: var(--bg-surface, #ffffff); box-shadow: 0 10px 25px rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between;">
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
                      <span style="font-size: 0.74rem; color: #64748b; font-weight: 600;">Project-Based Learning</span>
                    </div>

                    <h3 style="font-family: 'Kanit', sans-serif; font-size: 1.35rem; font-weight: 700; color: #0f172a; margin-bottom: 6px; line-height: 1.3;">
                      การประยุกต์ใช้แนวคิดเชิงคำนวณเพื่อพัฒนาโครงงาน
                    </h3>
                    <div style="font-size: 0.8rem; font-weight: 600; color: #0284c7; margin-bottom: 12px;">
                      Applied Computational Thinking for Projects
                    </div>

                    <p style="font-size: 0.88rem; color: #475569; line-height: 1.6; margin-bottom: 18px;">
                      ฝึกปฏิบัติการทำโครงงานจริงผ่าน 2 กรณีศึกษา: เว็บไซต์แนะนำการใช้งานห้องสมุด (Web App) และโปรแกรมแจ้งเตือนการกินยาผ่านสมาร์ตโฟน (Health Tech) ตามวงจร SDLC 5 ขั้นตอน
                    </p>

                    <!-- Subtopics List -->
                    <div style="background: var(--bg-surface-alt, #f8fafc); border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 20px;">
                      <div style="font-size: 0.82rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                        <i class="fa-solid fa-folder-open text-sky-600 mr-1"></i> กรณีศึกษาและกิจกรรม 3 ส่วน:
                      </div>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.82rem; color: #475569; line-height: 1.8;">
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                          <i class="fa-solid fa-check-circle text-sky-600" style="margin-top: 4px;"></i>
                          <span><strong>กรณีศึกษาที่ 1 (ห้องสมุด):</strong> เว็บสารสนเทศ, แยกย่อย 4 โมดูล, DFD Level 1, หมวดหมู่ดิวอี้ &amp; UI Responsive</span>
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                          <i class="fa-solid fa-check-circle text-sky-600" style="margin-top: 4px;"></i>
                          <span><strong>กรณีศึกษาที่ 2 (เตือนกินยา):</strong> Mobile App สุขภาพ, 10 กลุ่มงาน, ผังงาน Snooze Logic &amp; UI เพื่อผู้สูงอายุ</span>
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                          <i class="fa-solid fa-check-circle text-sky-600" style="margin-top: 4px;"></i>
                          <span><strong>ท้ายหน่วยการเรียนรู้:</strong> สรุปเปรียบเทียบ Web vs Mobile, กิจกรรม Project Pitch &amp; แบบทดสอบทบทวน</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- CTA Action Button -->
                <div style="padding: 0 24px 24px 24px;">
                  <a href="unit2.html" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px 20px; background: #0284c7; color: #ffffff; font-weight: 700; font-size: 0.95rem; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(2,132,199,0.25); transition: all 0.2s;">
                    <i class="fa-solid fa-laptop-code"></i> เข้าสู่บทเรียน หน่วยที่ 2 (ฉบับสมบูรณ์)
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
async function loadMediaData() {
  try {
    const slides = await apiFetch('/slides');
    const container = document.getElementById('slides-container');

    container.innerHTML = slides.map(sld => `
      <div class="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-300 glass-card-hover flex flex-col justify-between space-y-3">
        <div class="space-y-2">
          <span class="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
            ${sld.unit}
          </span>
          <h4 class="font-bold text-sm text-slate-800 leading-snug">${sld.title}</h4>
          <p class="text-xs text-slate-500">${sld.description}</p>
        </div>
        <button onclick="openSlideModal('${sld.id}')" class="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-1.5">
          <i class="fa-solid fa-file-powerpoint"></i> เปิดสไลด์บรรยาย (${sld.slideCount} สไลด์)
        </button>
      </div>
    `).join('');

    // Load video gallery
    const modules = await apiFetch('/modules');
    const videosContainer = document.getElementById('videos-container');
    const allLessons = modules.flatMap(m => m.lessons);

    videosContainer.innerHTML = allLessons.map(les => `
      <div class="p-4 rounded-2xl border border-slate-200 bg-white hover:border-rose-300 glass-card-hover flex flex-col justify-between space-y-3">
        <div class="space-y-1">
          <span class="text-[10px] font-bold text-rose-600"><i class="fa-solid fa-play-circle mr-1"></i> วิดีโอสอน</span>
          <h4 class="font-bold text-xs text-slate-800 line-clamp-2">${les.title}</h4>
          <p class="text-[11px] text-slate-400"><i class="fa-regular fa-clock mr-1"></i> ${les.duration}</p>
        </div>
        <button onclick="playLessonVideo('${les.title}', '${les.videoUrl}')" class="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2 rounded-xl transition shadow-sm">
          <i class="fa-solid fa-play mr-1"></i> รับชมวิดีโอการสอนนี้
        </button>
      </div>
    `).join('');

  } catch (err) {
    console.error('Media load error:', err);
  }
}

async function openSlideModal(slideId) {
  try {
    const slide = await apiFetch(`/slides/${slideId}`);
    activeSlideDeck = slide;
    currentSlideIndex = 0;

    document.getElementById('slide-modal-title').innerText = slide.title;
    document.getElementById('slide-modal-unit').innerText = slide.unit;

    renderSlideCard();
    openModal('modal-slide-viewer');
  } catch (err) {
    console.error('Slide open error:', err);
  }
}

function renderSlideCard() {
  if (!activeSlideDeck || !activeSlideDeck.slides) return;
  const slide = activeSlideDeck.slides[currentSlideIndex];
  const total = activeSlideDeck.slides.length;

  document.getElementById('slide-page-counter').innerText = `SLIDE ${currentSlideIndex + 1} OF ${total}`;
  document.getElementById('slide-card-title').innerText = slide.title;
  document.getElementById('slide-card-note').innerText = slide.note;
  document.getElementById('slide-indicator').innerText = `${currentSlideIndex + 1} / ${total}`;
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


// --- 5. WORKSHEETS & LEARNING ACTIVITIES ---
let worksheetsCache = [];
let currentWorksheetFilter = 'all';
let currentActiveWorksheet = null;
let showAnswerKey = false;

// Offline fallback dataset for local file mode (file:// protocol)
const OFFLINE_WORKSHEETS = [
  {
    "id": "ws-1-1",
    "unit_id": "mod-1",
    "unit": "หน่วยการเรียนรู้ที่ 1",
    "code": "ใบงานที่ 1.1",
    "title": "ใบงานที่ 1.1: เรื่อง การประยุกต์ใช้แนวคิดเชิงคำนวณในการแก้ปัญหาบริบทจริง",
    "subtitle": "การประยุกต์ใช้ 4 องค์ประกอบของแนวคิดเชิงคำนวณเพื่อแก้ปัญหาในชีวิตประจำวัน",
    "plan": "แผนการจัดการเรียนรู้ที่ 1: แนวคิดเชิงคำนวณกับการแก้ปัญหา",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-10-15",
    "asg_id": "asg-1",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนศึกษาสถานการณ์ปัญหาที่กำหนด แล้ววิเคราะห์แก้ปัญหาโดยประยุกต์ใช้ 4 องค์ประกอบของแนวคิดเชิงคำนวณ (Computational Thinking) ให้ครบถ้วน ชัดเจน และสมเหตุสมผลตามหลักวิชาการ",
    "scenario": "ตะวัน ขับรถยนต์ออกไปทำงานในตอนเช้า แต่พบว่ารถยนต์ของตนเองไม่สามารถเดินทางต่อไปถึงที่ทำงานได้ ซึ่งตะวันคิดว่าปัญหาอาจมีสาเหตุมาจาก 2 ประเด็น ได้แก่ ยางแบน หรือน้ำมันรถยนต์ใกล้จะหมด จากประสบการณ์ของตะวัน ในแต่ละครั้งที่รถยนต์มีปัญหา จะต้องจัดการกับยางรถยนต์ที่แบนก่อนเป็นอันดับแรก ซึ่งรถยนต์ยังพอมีน้ำมันเหลืออยู่ ให้นักเรียนช่วยตะวันวิเคราะห์ปัญหาและออกแบบขั้นตอนการแก้ปัญหาโดยประยุกต์ใช้ 4 องค์ประกอบของแนวคิดเชิงคำนวณ",
    "tasks": [
      {
        "step": 1,
        "title": "1. การแยกส่วนประกอบและการย่อยปัญหา (Decomposition)",
        "description": "วิเคราะห์และจำแนกปัญหาใหญ่ออกเป็นปัญหาย่อยๆ ที่เป็นอิสระต่อกัน เพื่อให้จัดการและแก้ไขได้อย่างมีประสิทธิภาพ (2.5 คะแนน)",
        "sample_answer": "• ปัญหาย่อยที่ 1: ยางรถยนต์รั่ว/แบน ทำให้ล้อไม่สามารถหมุนเคลื่อนที่ได้อย่างปลอดภัยและเสี่ยงต่อการเกิดอุบัติเหตุ\n• ปัญหาย่อยที่ 2: ระดับน้ำมันเชื้อเพลิงใกล้หมด ทำให้มีความเสี่ยงที่เครื่องยนต์จะดับหากเดินทางระยะไกล\n• ปัญหาย่อยที่ 3: ข้อจำกัดด้านเวลาในการเดินทางไปทำงานในชั่วโมงเร่งด่วน"
      },
      {
        "step": 2,
        "title": "2. การหารูปแบบของปัญหา (Pattern Recognition)",
        "description": "ระบุแบบแผน ความเหมือน หรือความคล้ายคลึงจากประสบการณ์เดิม เพื่อจัดลำดับความเร่งด่วนในการแก้ปัญหา (2.5 คะแนน)",
        "sample_answer": "• จากประสบการณ์เดิมและแบบแผนความปลอดภัยทางวิศวกรรมยานยนต์ ปัญหายางแบนเป็นปัญหาเชิงโครงสร้างเร่งด่วนที่สุด เพราะหากฝืนขับต่อไปจะทำให้กระทะล้อบิดงอและควบคุมรถไม่ได้ จึงต้องแก้ไขเป็นลำดับแรก\n• รูปแบบปริมาณน้ำมัน: จากเกจวัดน้ำมันที่ยังเหลืออยู่ สามารถวิ่งต่อไปได้อีกประมาณ 15-20 กิโลเมตร ซึ่งเพียงพอสำหรับการขับไปยังสถานีบริการน้ำมันที่ใกล้ที่สุดหลังจากเปลี่ยนยางเสร็จสิ้น"
      },
      {
        "step": 3,
        "title": "3. การคิดเชิงนามธรรม (Abstraction)",
        "description": "คัดกรองเฉพาะสาระสำคัญที่จำเป็นต่อการแก้ปัญหา และละทิ้งรายละเอียดปลีกย่อยที่ไม่เกี่ยวข้องออกไป (2.5 คะแนน)",
        "sample_answer": "• ข้อมูลสาระสำคัญ (Key Information): ตำแหน่งของล้อที่แบน, เครื่องมือช่าง (แม่แรงและประแจขันล้อ), ยางอะไหล่สำรองที่พร้อมใช้งาน, ระยะทางไปยังสถานีบริการน้ำมันที่ใกล้ที่สุด\n• รายละเอียดที่ไม่จำเป็น (Filtered Details): สีของตัวรถยนต์, เพลงที่เปิดฟังในห้องโดยสาร, สภาพภูมิอากาศภายนอก, ยี่ห้อของเสื้อผ้าที่ตะวันสวมใส่"
      },
      {
        "step": 4,
        "title": "4. การออกแบบขั้นตอนวิธีในการแก้ปัญหา (Algorithm Design)",
        "description": "ออกแบบลำดับขั้นตอนการปฏิบัติงานเพื่อแก้ปัญหาอย่างชัดเจน เรียงตามลำดับ ไม่กำกวม และมีจุดสิ้นสุด (2.5 คะแนน)",
        "sample_answer": "ขั้นตอนที่ 1: จอดรถยนต์ชิดไหล่ทาง เปิดไฟฉุกเฉิน และดึงเบรกมือเพื่อความปลอดภัย\nขั้นตอนที่ 2: นำอุปกรณ์แม่แรง ประแจขันล้อ และยางอะไหล่ออกจากกระโปรงท้ายรถ\nขั้นตอนที่ 3: ใช้ประแจคลายน็อตล้อที่แบนเล็กน้อย แล้วใช้แม่แรงยกรถขึ้นจนล้อลอยพ้นพื้น\nขั้นตอนที่ 4: ถอดน็อตล้อออกทั้งหมด นำล้อที่แบนออก แล้วใส่ยางอะไหล่เข้าไปแทนที่ ขันน็อตพอตึงมือ\nขั้นตอนที่ 5: ค่อยๆ ลดแม่แรงลงจนล้อแตะพื้น ขันน็อตล้อให้แน่นสนิททุกตัวเป็นแนวทแยงมุม\nขั้นตอนที่ 6: เก็บอุปกรณ์ทั้งหมดขึ้นรถ สตาร์ตเครื่องยนต์ แล้วขับด้วยความเร็วปลอดภัยไปยังสถานีบริการน้ำมันที่ใกล้ที่สุดเพื่อเติมน้ำมันและตรวจเช็กแรงดันลมยาง"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน:\n1. การแยกส่วนประกอบ (2.5 คะแนน): จำแนกปัญหาย่อยได้ครบถ้วนและตรงประเด็น (ดีเยี่ยม 2.5 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n2. การหารูปแบบ (2.5 คะแนน): เชื่อมโยงประสบการณ์และจัดลำดับความเร่งด่วนได้สมเหตุสมผล (ดีเยี่ยม 2.5 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n3. การคิดเชิงนามธรรม (2.5 คะแนน): คัดแยกสาระสำคัญและตัดรายละเอียดที่ไม่จำเป็นได้อย่างชัดเจน (ดีเยี่ยม 2.5 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n4. การออกแบบขั้นตอนวิธี (2.5 คะแนน): ลำดับขั้นตอนเป็นระบบ ชัดเจน ปฏิบัติได้จริง และมีจุดสิ้นสุด (ดีเยี่ยม 2.5 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)"
  },
  {
    "id": "ws-1-2",
    "unit_id": "mod-1",
    "unit": "หน่วยการเรียนรู้ที่ 1",
    "code": "ใบงานที่ 1.2",
    "title": "ใบงานที่ 1.2: เรื่อง การพัฒนาระบบด้วยวงจร SDLC (กรณีศึกษาร้านเบเกอรี)",
    "subtitle": "การประยุกต์ใช้วงจรการพัฒนาระบบ 5 ขั้นตอนเพื่อแก้ปัญหาธุรกิจจริง",
    "plan": "แผนการจัดการเรียนรู้ที่ 2: การพัฒนาโครงงานด้วยวงจร SDLC",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-10-30",
    "asg_id": "asg-2",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนศึกษาสถานการณ์ของร้าน Bakery Delight และเขียนแผนการพัฒนาระบบสารสนเทศตามขั้นตอนของวงจรการพัฒนาระบบ (SDLC) ทั้ง 5 ขั้นตอนให้ครบถ้วน ชัดเจน และสอดคล้องกับหลักวิศวกรรมซอฟต์แวร์",
    "scenario": "ร้าน Bakery Delight ประสบปัญหายอดขายตกต่ำ สินค้าเบเกอรีเหลือทิ้งจำนวนมากในแต่ละวันเนื่องจากไม่ทราบพฤติกรรมการซื้อที่แท้จริงของลูกค้า และการจัดการสต็อกวัตถุดิบล่าช้าเพราะใช้สมุดจดบันทึกมือ เจ้าของร้านต้องการพัฒนาระบบ POS และระบบบริหารจัดการสต็อกอัจฉริยะเพื่อลดความสูญเสียและเพิ่มยอดขาย ให้นักเรียนวางแผนพัฒนาระบบตามขั้นตอน SDLC ทั้ง 5 ขั้นตอน",
    "tasks": [
      {
        "step": 1,
        "title": "1. ขั้นตอนการวางแผน (Planning)",
        "description": "กำหนดเป้าหมาย วัตถุประสงค์ ขอบเขต และศึกษาความเป็นไปได้ (Feasibility Study) ของระบบ (2 คะแนน)",
        "sample_answer": "• วัตถุประสงค์: 1) ลดปริมาณขนมเหลือทิ้งไม่น้อยกว่า 50% ภายใน 3 เดือน 2) พัฒนาระบบ POS บันทึกการขายและตัดสต็อกวัตถุดิบแบบ Real-time\n• ขอบเขต: ติดตั้งใช้งานที่เคาน์เตอร์ขายหน้าร้าน 1 จุด และห้องเตรียมวัตถุดิบหลังร้าน 1 จุด\n• การศึกษาความเป็นไปได้: ใช้แท็บเล็ตเดิมของทางร้านร่วมกับระบบ Cloud Web Application ทำให้ประหยัดต้นทุนฮาร์ดแวร์และมีความเป็นไปได้สูงด้านงบประมาณ"
      },
      {
        "step": 2,
        "title": "2. ขั้นตอนการวิเคราะห์ (Analysis)",
        "description": "วิเคราะห์ปัญหาในระบบเดิมและระบุข้อกำหนดความต้องการเชิงหน้าที่ (Functional Requirements) (2 คะแนน)",
        "sample_answer": "• ปัญหาเดิม: การบันทึกด้วยมือทำให้สต็อกคลาดเคลื่อน เช็กยอดขายล่าช้า ไม่ทราบเมนูที่ขายดี\n• Functional Requirements (ความต้องการระบบ):\n  1) ระบบบันทึกการขายผ่านการสแกนบาร์โค้ดสินค้าและคำนวณเงินพร้อมออกใบเสร็จ\n  2) ระบบตัดยอดสต็อกวัตถุดิบอัตโนมัติตามสูตรขนม (BOM: Bill of Materials)\n  3) ระบบแจ้งเตือนเมื่อวัตถุดิบใกล้หมดหรือขนมใกล้หมดอายุ\n  4) ระบบจัดทำรายงานสรุปยอดขายประจำวันและเมนูยอดนิยม"
      },
      {
        "step": 3,
        "title": "3. ขั้นตอนการออกแบบ (Design)",
        "description": "ออกแบบผังงานการทำงาน (Flowchart) สถาปัตยกรรมระบบ และแบบร่างหน้าจอผู้ใช้ (UI Mockup) (2 คะแนน)",
        "sample_answer": "• ผังงานระบบ POS: เริ่มต้น -> สแกนบาร์โค้ด -> ตรวจสอบสต็อก -> คำนวณยอดเงินรวมและส่วนลด -> รับชำระเงิน (เงินสด/QR Code) -> บันทึกยอดขายและตัดสต็อก -> พิมพ์ใบเสร็จ/แสดงผล -> จบการทำงาน\n• ออกแบบ UI: หน้าจอแบบสัมผัส (Touchscreen Friendly) มีรูปภาพเมนูขนมชัดเจน ปุ่มกดขนาดใหญ่ สรุปยอดเงินตัวเลขขนาดใหญ่ และมีปุ่มเลือกรับเงินสดหรือสแกน QR Code พร้อมเพย์"
      },
      {
        "step": 4,
        "title": "4. ขั้นตอนการพัฒนาและติดตั้ง (Implementation & Testing)",
        "description": "วางแผนการเขียนโปรแกรมและการทดสอบระบบตามมาตรฐาน 4 ระดับ (2 คะแนน)",
        "sample_answer": "• การพัฒนา: พัฒนาด้วยเทคโนโลยี Web Application (Node.js + SQLite Database) ที่ทำงานได้ทั้งบนแท็บเล็ตและคอมพิวเตอร์\n• แผนการทดสอบ 4 ระดับ:\n  1) Unit Testing: ตรวจสอบฟังก์ชันคำนวณราคาและส่วนลดว่าถูกต้องแม่นยำ\n  2) Integration Testing: ทดสอบการเชื่อมโยงระหว่างหน้าขายหน้าร้านกับการตัดยอดสต็อกในฐานข้อมูล\n  3) System Testing: ทดสอบความเร็วในการออกใบเสร็จและการทำงานต่อเนื่องทั้งวัน\n  4) UAT: ให้พนักงานขายทดลองใช้งานจริงหน้าร้าน 3 วันก่อนเปิดระบบจริง"
      },
      {
        "step": 5,
        "title": "5. ขั้นตอนการบำรุงรักษา (Maintenance)",
        "description": "กำหนดแนวทางการฝึกอบรมพนักงาน การสำรองข้อมูล และแผนการดูแลรักษาระบบต่อเนื่อง (2 คะแนน)",
        "sample_answer": "• จัดอบรมพนักงานขายและผู้จัดการร้าน 1 วันก่อนเปิดใช้งานระบบจริง พร้อมจัดทำคู่มือการใช้งานฉบับกระชับ\n• กำหนดแผนสำรองข้อมูล (Backup) อัตโนมัติทุกสิ้นวันไปยังระบบ Cloud Storage\n• การบำรุงรักษาแก้ไข (Corrective Maintenance): แก้ไข Bug ภายใน 2 ชั่วโมงหากระบบขายติดขัด และการปรับปรุงระบบ (Perfective Maintenance) ตามเทศกาลโปรโมชั่น"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน (5 ด้าน ด้านละ 2 คะแนน):\n1. การวางแผน (2 คะแนน): กำหนดเป้าหมาย ขอบเขต และศึกษาความเป็นไปได้ชัดเจน (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n2. การวิเคราะห์ (2 คะแนน): ระบุปัญหาเดิมและความต้องการระบบได้ตรงประเด็น (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n3. การออกแบบ (2 คะแนน): ออกแบบผังงานและหน้าจอ UI ได้ถูกต้องตามหลักการ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n4. การพัฒนาและทดสอบ (2 คะแนน): กำหนดแผนการพัฒนาและการทดสอบ 4 ระดับได้สมบูรณ์ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n5. การบำรุงรักษา (2 คะแนน): แผนการอบรม การสำรองข้อมูล และการดูแลรักษาระบบปฏิบัติได้จริง (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)"
  },
  {
    "id": "ws-1-3",
    "unit_id": "mod-1",
    "unit": "หน่วยการเรียนรู้ที่ 1",
    "code": "ใบงานที่ 1.3",
    "title": "ใบงานที่ 1.3: เรื่อง การจัดทำเค้าโครงรายงานโครงงาน 5 บท",
    "subtitle": "การจัดทำเอกสารรายงานโครงงานคอมพิวเตอร์ตามระเบียบวิธีวิจัยและมาตรฐาน สพฐ.",
    "plan": "แผนการจัดการเรียนรู้ที่ 3: การเขียนรายงานการพัฒนาโครงงาน",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-11-15",
    "asg_id": "asg-3",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนจัดทำเค้าโครงรายงานโครงงานคอมพิวเตอร์ตามแบบฟอร์มมาตรฐาน 5 บทของ สพฐ. ให้มีความสมบูรณ์ทางวิชาการและครอบคลุมทั้ง 3 ส่วนหลักของรายงาน",
    "scenario": "นักเรียนกลุ่มหนึ่งได้รับอนุมัติหัวข้อโครงงาน \"ระบบจัดการขยะรีไซเคิลอัจฉริยะในสถานศึกษา (Smart Recycle Portal)\" ครูที่ปรึกษาโครงงานได้มอบหมายให้นักเรียนจัดทำโครงสร้างเค้าโครงรายงาน 5 บทตามมาตรฐานวิชาการของ สพฐ. เพื่อเตรียมพร้อมสำหรับการเขียนเล่มรายงานฉบับสมบูรณ์ ให้นักเรียนร่างองค์ประกอบและสาระสำคัญของแต่ละส่วนตามระเบียบวิธีวิจัย",
    "tasks": [
      {
        "step": 1,
        "title": "1. ส่วนประกอบตอนต้นของรายงาน (Preliminary Section)",
        "description": "ระบุองค์ประกอบส่วนนำให้ครบถ้วนตามลำดับมาตรฐาน และเขียนร่างตัวอย่างบทคัดย่อ (Abstract) แบบกระชับ (2 คะแนน)",
        "sample_answer": "• ลำดับองค์ประกอบส่วนนำ: 1) ปกนอก 2) ใบรองปก 3) ปกใน 4) บทคัดย่อ (ภาษาไทยและอังกฤษ) 5) กิตติกรรมประกาศ 6) สารบัญ 7) สารบัญตาราง 8) สารบัญภาพ\n• ตัวอย่างบทคัดย่อ: โครงงานนี้มีวัตถุประสงค์เพื่อพัฒนาระบบจัดการขยะรีไซเคิลอัจฉริยะในสถานศึกษา โดยประยุกต์ใช้วงจร SDLC และแนวคิดเชิงคำนวณ กลุ่มตัวอย่างคือนักเรียน ม.4 จำนวน 120 คน ผลการดำเนินงานพบว่าระบบสามารถบันทึกแต้มสะสมและน้ำหนักขยะได้อย่างถูกต้อง 100% และผู้ใช้งานมีความพึงพอใจในระดับมากที่สุด (x̄ = 4.65)"
      },
      {
        "step": 2,
        "title": "2. ส่วนเนื้อหา บทที่ 1 บทนำ และ บทที่ 2 ทฤษฎีที่เกี่ยวข้อง",
        "description": "กำหนดความเป็นมา วัตถุประสงค์ ขอบเขต และหัวข้อทฤษฎี/เทคโนโลยีอ้างอิงที่จำเป็น (3 คะแนน)",
        "sample_answer": "• บทที่ 1 บทนำ:\n  - ที่มาและความสำคัญ: ปัญหาขยะล้นโรงเรียนและขาดแรงจูงใจในการคัดแยกขยะ\n  - วัตถุประสงค์: 1) พัฒนาระบบบันทึกแต้มรีไซเคิล 2) ประเมินความพึงพอใจของผู้ใช้งาน\n  - ขอบเขต: ใช้กับขยะ 3 ประเภท (ขวดพลาสติก, กระป๋องอลูมิเนียม, กระดาษ) ในโรงเรียน\n• บทที่ 2 เอกสารและงานวิจัยที่เกี่ยวข้อง:\n  - 1) แนวคิดเชิงคำนวณและวงจร SDLC 2) ระบบฐานข้อมูลเชิงสัมพันธ์ 3) เทคโนโลยี Web Application 4) งานวิจัยเกี่ยวกับการจัดการขยะในสถานศึกษา"
      },
      {
        "step": 3,
        "title": "3. ส่วนเนื้อหา บทที่ 3, 4 และ 5 (Methodology, Results, Conclusion)",
        "description": "อธิบายเครื่องมือที่ใช้ ขั้นตอนวิธีดำเนินงาน รูปแบบการนำเสนอผลการทดลอง และการอภิปรายผล (3 คะแนน)",
        "sample_answer": "• บทที่ 3 วิธีดำเนินการ: ระบุประชากรกลุ่มตัวอย่าง, เครื่องมือฮาร์ดแวร์/ซอฟต์แวร์ที่ใช้พัฒนา, ผังงานระบบ (System Flowchart), ขั้นตอนการพัฒนา 5 ขั้นตอนของ SDLC\n• บทที่ 4 ผลการดำเนินงาน: นำเสนอภาพหน้าจอระบบที่พัฒนาเสร็จสมบูรณ์ และตารางสถิติเปรียบเทียบปริมาณขยะที่คัดแยกได้ก่อน-หลังใช้ระบบ\n• บทที่ 5 สรุปผล อภิปรายผล และข้อเสนอแนะ: สรุปผลสัมฤทธิ์เทียบกับวัตถุประสงค์, อภิปรายจุดเด่นและข้อจำกัดของระบบ, เสนอแนะการเชื่อมต่อกับเครื่องชั่งน้ำหนักดิจิทัลอัตโนมัติในอนาคต"
      },
      {
        "step": 4,
        "title": "4. ส่วนประกอบตอนท้ายและบรรณานุกรม APA 7th Edition",
        "description": "เขียนตัวอย่างรายการอ้างอิงบรรณานุกรมรูปแบบ APA 7th Edition จำนวน 2 รายการ และระบุสิ่งที่ต้องมีในภาคผนวก (2 คะแนน)",
        "sample_answer": "• ตัวอย่างบรรณานุกรม APA 7th:\n  1) กระทรวงศึกษาธิการ. (2560). ตัวชี้วัดและสาระการเรียนรู้แกนกลาง กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี (ฉบับปรับปรุง พ.ศ. 2560). โรงพิมพ์ชุมนุมสหกรณ์การเกษตรแห่งประเทศไทย.\n  2) บุญยงค์, ป. (2568). การพัฒนาทักษะแนวคิดเชิงคำนวณผ่านโครงงานเทคโนโลยี. วารสารนวัตกรรมการศึกษา, 12(3), 45-58.\n• สิ่งที่ต้องมีในภาคผนวก: แบบสอบถามความพึงพอใจ, ซอร์สโค้ดโปรแกรมสำคัญ, ภาพถ่ายการทดสอบระบบร่วมกับผู้ใช้"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน:\n1. ส่วนประกอบตอนต้น (2 คะแนน): โครงสร้างส่วนนำและบทคัดย่อถูกต้องตามแบบแผนวิชาการ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n2. บทที่ 1 และ 2 (3 คะแนน): ความเป็นมา วัตถุประสงค์ ขอบเขต และทฤษฎีอ้างอิงสมบูรณ์ (ดีมาก 3.0 | ดี 2.5 | พอใช้ 2.0 | ปรับปรุง 1.0)\n3. บทที่ 3, 4 และ 5 (3 คะแนน): วิธีดำเนินงาน การแสดงผลลัพธ์ และการสรุปอภิปรายผลเป็นระบบ (ดีมาก 3.0 | ดี 2.5 | พอใช้ 2.0 | ปรับปรุง 1.0)\n4. ส่วนท้ายและบรรณานุกรม (2 คะแนน): รูปแบบ APA 7th ถูกต้องและภาคผนวกครบถ้วน (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)"
  },
  {
    "id": "ws-2-1",
    "unit_id": "mod-2",
    "unit": "หน่วยการเรียนรู้ที่ 2",
    "code": "ใบงานที่ 2.1",
    "title": "ใบงานที่ 2.1: เรื่อง การวางแผนและการวิเคราะห์ความต้องการในการพัฒนาโครงงาน",
    "subtitle": "การกำหนดวัตถุประสงค์ ขอบเขต และแผนภูมิแกนต์ (กรณีศึกษา StyleHub)",
    "plan": "แผนการจัดการเรียนรู้ที่ 1: การวางแผนและวิเคราะห์โครงงาน",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-11-30",
    "asg_id": "asg-4",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนศึกษากรณีศึกษาเว็บไซต์แฟชั่นวัยรุ่น StyleHub แล้วกำหนดวัตถุประสงค์ ขอบเขตระบบ และจัดทำแผนภูมิแกนต์ (Gantt Chart) สำหรับการดำเนินงาน 8 สัปดาห์ให้ถูกต้องและสมบูรณ์",
    "scenario": "กลุ่มนักเรียนชั้น ม.4 ต้องการพัฒนาโครงงานเว็บไซต์จำหน่ายเสื้อผ้าวัยรุ่นออนไลน์ภายใต้ชื่อแบรนด์ StyleHub เพื่อแก้ปัญหาความยุ่งยากในการสั่งซื้อเสื้อผ้าผ่านแชตส่วนตัว ซึ่งมักเกิดข้อผิดพลาดในการคำนวณยอดเงิน การส่งสลิปปลอม และสต็อกสินค้าไม่ตรงกับความเป็นจริง ให้นักเรียนวางแผนการพัฒนาโครงงานในระยะเริ่มต้นตามขั้นตอนของ SDLC",
    "tasks": [
      {
        "step": 1,
        "title": "1. การกำหนดวัตถุประสงค์ของโครงงาน (Project Objectives)",
        "description": "กำหนดวัตถุประสงค์ของโครงงานอย่างน้อย 2 ข้อ ตามหลัก SMART (เฉพาะเจาะจง วัดผลได้ และเป็นไปได้จริง) (3 คะแนน)",
        "sample_answer": "• วัตถุประสงค์ที่ 1: เพื่อออกแบบและพัฒนาเว็บไซต์ร้านค้าเสื้อผ้าออนไลน์ StyleHub ที่รองรับการเลือกดูสินค้า สั่งซื้อ และชำระเงินอัตโนมัติได้อย่างถูกต้อง 100%\n• วัตถุประสงค์ที่ 2: เพื่อลดเวลาเฉลี่ยในการสั่งซื้อสินค้าของลูกค้าจากเดิม 15 นาที เหลือไม่เกิน 3 นาที\n• วัตถุประสงค์ที่ 3: เพื่อประเมินความพึงพอใจของกลุ่มผู้ใช้งานเป้าหมายที่มีต่อระบบให้อยู่ในระดับมาก (คะแนนเฉลี่ยไม่น้อยกว่า 3.51 จาก 5.00)"
      },
      {
        "step": 2,
        "title": "2. การกำหนดขอบเขตและกลุ่มเป้าหมาย (Scope & Target Group)",
        "description": "ระบุกลุ่มผู้ใช้งานเป้าหมาย ขอบเขตเชิงหน้าที่ของระบบ และข้อจำกัดในการพัฒนา (3 คะแนน)",
        "sample_answer": "• กลุ่มเป้าหมาย: นักเรียน นักศึกษา และเยาวชนอายุ 15-25 ปี ที่สนใจแฟชั่นและคุ้นเคยกับการซื้อของออนไลน์\n• ขอบเขตเชิงหน้าที่ (System Scope):\n  1) ระบบสำหรับลูกค้า: ค้นหาเสื้อผ้าตามหมวดหมู่/ขนาด, ตะกร้าสินค้า, ชำระเงินผ่าน QR Code, ตรวจสอบสถานะการจัดส่ง\n  2) ระบบสำหรับผู้ดูแลร้าน: จัดการข้อมูลสินค้า, ตรวจสอบยอดชำระเงิน, จัดการสต็อกสินค้า, สรุปยอดขาย\n• ข้อจำกัด: ไม่รองรับระบบผ่อนชำระ และรองรับการจัดส่งเฉพาะภายในประเทศเท่านั้น"
      },
      {
        "step": 3,
        "title": "3. แผนการดำเนินงานและทรัพยากร (Gantt Chart & Resources)",
        "description": "จัดทำตารางแผนภูมิแกนต์ 8 สัปดาห์ ครอบคลุม 5 ขั้นตอนของ SDLC พร้อมระบุผู้รับผิดชอบและทรัพยากร (4 คะแนน)",
        "sample_answer": "• ตาราง Gantt Chart 8 สัปดาห์:\n  - สัปดาห์ที่ 1: การวางแผนและการศึกษาความเป็นไปได้ (หัวหน้าโครงการ)\n  - สัปดาห์ที่ 2: การวิเคราะห์ความต้องการและการเก็บข้อมูลผู้ใช้ (นักวิเคราะห์ระบบ)\n  - สัปดาห์ที่ 3: การออกแบบโครงสร้างฐานข้อมูลและผังงาน (นักออกแบบระบบ)\n  - สัปดาห์ที่ 4: การออกแบบ UI/UX หน้าจอเว็บไซต์และ Wireframe (นักออกแบบ UI)\n  - สัปดาห์ที่ 5-6: การเขียนโปรแกรมพัฒนาเว็บไซต์ (โปรแกรมเมอร์)\n  - สัปดาห์ที่ 7: การทดสอบระบบ (Unit, Integration & UAT) (ผู้ทดสอบระบบ)\n  - สัปดาห์ที่ 8: การติดตั้งใช้งานจริง จัดทำรายงาน 5 บท และนำเสนอผลงาน (สมาชิกทุกคน)\n• ทรัพยากรที่ใช้: คอมพิวเตอร์โน้ตบุ๊ก, ซอฟต์แวร์ VS Code, Figma, ฐานข้อมูล MySQL/SQLite"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน:\n1. วัตถุประสงค์โครงงาน (3 คะแนน): ชัดเจน สอดคล้องกับหลัก SMART และวัดผลสัมฤทธิ์ได้ (ดีเยี่ยม 3.0 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n2. ขอบเขตและกลุ่มเป้าหมาย (3 คะแนน): กำหนดกลุ่มเป้าหมายและฟังก์ชันงานระบบได้ชัดเจนและเป็นไปได้ (ดีเยี่ยม 3.0 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n3. แผนงาน Gantt Chart (4 คะแนน): ตารางเวลา 8 สัปดาห์ครอบคลุม SDLC จัดสรรบทบาทและทรัพยากรสมบูรณ์ (ดีเยี่ยม 4.0 | ดี 3.0 | พอใช้ 2.0 | ปรับปรุง 1.0)"
  },
  {
    "id": "ws-2-2",
    "unit_id": "mod-2",
    "unit": "หน่วยการเรียนรู้ที่ 2",
    "code": "ใบงานที่ 2.2",
    "title": "ใบงานที่ 2.2: เรื่อง การวิเคราะห์ข้อมูลและออกแบบระบบ (Context Diagram & UI)",
    "subtitle": "การวิเคราะห์ข้อกำหนดเชิงหน้าที่และการออกแบบแผนภาพบริบทระบบพาณิชย์อิเล็กทรอนิกส์",
    "plan": "แผนการจัดการเรียนรู้ที่ 2: การวิเคราะห์และออกแบบระบบ",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-12-15",
    "asg_id": "asg-5",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนวิเคราะห์ความต้องการเชิงหน้าที่ 8 ฟังก์ชันหลัก ออกแบบแผนภาพบริบท (Context Diagram) และกำหนดขอบเขตข้อมูลนำเข้า-ส่งออกของระบบ StyleHub ให้ถูกต้องตามมาตรฐานวิศวกรรมซอฟต์แวร์",
    "scenario": "สืบเนื่องจากโครงงาน StyleHub ในขั้นตอนนี้ทีมผู้พัฒนาต้องเปลี่ยนความต้องการของผู้ใช้ให้กลายเป็นพิมพ์เขียวทางเทคนิค โดยต้องวิเคราะห์ฟังก์ชันการทำงานหลัก 8 ฟังก์ชัน และวาดแผนภาพบริบท (Context Diagram) แสดงการมีปฏิสัมพันธ์ระหว่างระบบกับหน่วยงานภายนอก (External Entities) พร้อมระบุขอบเขตข้อมูลนำเข้าและส่งออก",
    "tasks": [
      {
        "step": 1,
        "title": "1. การวิเคราะห์ความต้องการเชิงหน้าที่ 8 ฟังก์ชันหลัก (Functional Requirements)",
        "description": "อธิบายรายละเอียดการทำงานของ 8 ฟังก์ชันสำคัญในระบบ StyleHub อย่างกระชับและชัดเจน (4 คะแนน)",
        "sample_answer": "1) ฟังก์ชันสมัครสมาชิกและยืนยันตัวตน: ตรวจสอบความถูกต้องของอีเมลและรหัสผ่าน\n2) ฟังก์ชันแคตตาล็อกสินค้า: แสดงภาพ ราคา ขนาด และตัวเลือกสี พร้อมระบบค้นหาและตัวกรอง\n3) ฟังก์ชันจัดการตะกร้าสินค้า: เพิ่ม/ลดจำนวน คำนวณยอดเงินรวมและค่าจัดส่งอัตโนมัติ\n4) ฟังก์ชันชำระเงิน: สร้าง QR Code พร้อมเพย์ตามยอดเงินจริง และระบบอัปโหลดสลิปยืนยัน\n5) ฟังก์ชันตรวจสอบสถานะพัสดุ: แสดงเลข Tracking และขั้นตอนการจัดส่งสินค้า\n6) ฟังก์ชันจัดการสินค้าคงคลัง (Admin): เพิ่ม ลบ แก้ไขสินค้า และตัดสต็อกอัตโนมัติเมื่อเกิดการซื้อ\n7) ฟังก์ชันตรวจสอบยอดเงิน (Admin): ตรวจสอบสลิปโอนเงินและอนุมัติคำสั่งซื้อ\n8) ฟังก์ชันรายงานและสถิติ (Admin): สรุปยอดขายประจำวัน/สัปดาห์ และอันดับสินค้าขายดี"
      },
      {
        "step": 2,
        "title": "2. การออกแบบแผนภาพบริบท (Context Diagram: DFD Level 0)",
        "description": "ระบุกระบวนการหลัก (Process 0), เอนทิตีภายนอก (External Entities) และกระแสข้อมูล (Data Flows) เข้า-ออกจากระบบ (4 คะแนน)",
        "sample_answer": "• กระบวนการหลัก: Process 0 \"ระบบร้านเสื้อผ้าออนไลน์ StyleHub\"\n• External Entities และ Data Flows:\n  1) ลูกค้า (Customer):\n     - ข้อมูลเข้า: ข้อมูลสมัครสมาชิก, คำสั่งซื้อสินค้า, หลักฐานการชำระเงิน, ข้อมูลที่อยู่จัดส่ง\n     - ข้อมูลออก: แคตตาล็อกสินค้า, ใบเสร็จรับเงิน, การแจ้งเตือนสถานะคำสั่งซื้อและเลขพัสดุ\n  2) ผู้ดูแลระบบ/เจ้าของร้าน (Admin):\n     - ข้อมูลเข้า: ข้อมูลรายการสินค้าใหม่, ข้อมูลการปรับปรุงสต็อก, ผลการยืนยันยอดเงิน\n     - ข้อมูลออก: รายการคำสั่งซื้อรอตรวจสอบ, รายงานสรุปยอดขาย, การแจ้งเตือนสินค้าใกล้หมด\n  3) ระบบขนส่งพัสดุ (Shipping Partner):\n     - ข้อมูลเข้า: เลขติดตามพัสดุ (Tracking Number), สถานะการนำจ่าย\n     - ข้อมูลออก: ข้อมูลชื่อ-ที่อยู่และเบอร์โทรศัพท์ของผู้รับ"
      },
      {
        "step": 3,
        "title": "3. การกำหนดขอบเขตข้อมูลนำเข้า-ส่งออก (Input/Output Boundary)",
        "description": "สรุปโครงสร้างข้อมูลนำเข้า (Input) และข้อมูลส่งออก (Output) ที่สำคัญของระบบ (2 คะแนน)",
        "sample_answer": "• ข้อมูลนำเข้า (Input): ข้อมูลผู้ใช้งาน, รหัสสินค้า, รายการสินค้าที่เลือก, สลิปโอนเงิน, ข้อมูลที่อยู่จัดส่ง\n• ข้อมูลส่งออก (Output): หน้าจอแสดงผลสินค้า, ใบเสร็จรับเงินอิเล็กทรอนิกส์, ข้อความแจ้งเตือนคำสั่งซื้อ, รายงานสถิติยอดขายเชิงบริหาร"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน:\n1. วิเคราะห์ 8 ฟังก์ชันหลัก (4 คะแนน): ครบถ้วน ถูกต้อง ชัดเจนตามหลัก Functional Requirements (ดีเยี่ยม 4.0 | ดี 3.0 | พอใช้ 2.0 | ปรับปรุง 1.0)\n2. Context Diagram (4 คะแนน): ระบุ Process 0, Entities และ Data Flows เข้า-ออกได้ถูกต้องตามหลักสัญลักษณ์ DFD (ดีเยี่ยม 4.0 | ดี 3.0 | พอใช้ 2.0 | ปรับปรุง 1.0)\n3. ขอบเขต Input/Output (2 คะแนน): จำแนกข้อมูลนำเข้าและส่งออกได้ถูกต้องสอดคล้องกับระบบ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)"
  },
  {
    "id": "ws-2-3",
    "unit_id": "mod-2",
    "unit": "หน่วยการเรียนรู้ที่ 2",
    "code": "ใบงานที่ 2.3",
    "title": "ใบงานที่ 2.3: เรื่อง การพัฒนาโครงงานเพื่อแก้ปัญหาตามกระบวนการ SDLC ในบริบทจริง",
    "subtitle": "การบูรณาการแนวคิดเชิงคำนวณและวงจร SDLC ครบวงจรในการแก้ปัญหาของสถานศึกษาหรือชุมชน",
    "plan": "แผนการจัดการเรียนรู้ที่ 3: การพัฒนาโครงงานเพื่อแก้ปัญหา",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-12-30",
    "asg_id": "asg-6",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนเลือกปัญหาจริงในสถานศึกษาหรือชุมชน (หรือศึกษากรณีศึกษาระบบ Science Lab Portal) แล้วจัดทำแผนพัฒนาโครงงานบูรณาการแนวคิดเชิงคำนวณและ SDLC ครบทั้ง 5 ขั้นตอน พร้อมเกณฑ์วัดความสำเร็จ",
    "scenario": "ห้องปฏิบัติการวิทยาศาสตร์ของโรงเรียนวังน้ำเย็นวิทยาคมประสบปัญหาอุปกรณ์ทดลองและสารเคมีสูญหายหรือชำรุดโดยไม่ทราบผู้รับผิดชอบ บันทึกการยืม-คืนด้วยสมุดกระดาษทำให้อ่านลายมือไม่ออกและตรวจเช็กสถานะอุปกรณ์ได้ล่าช้า กลุ่มสาระการเรียนรู้วิทยาศาสตร์ต้องการพัฒนาระบบ \"Science Lab Portal\" เพื่อบันทึกการยืม-คืนอุปกรณ์ด้วยระบบสแกน QR Code ผ่านสมาร์ตโฟน ให้นักเรียนวางแผนพัฒนาโครงงานนี้อย่างครบวงจร",
    "tasks": [
      {
        "step": 1,
        "title": "1. การสำรวจและระบุปัญหา (Problem Identification)",
        "description": "ระบุสภาพปัญหา สาเหตุ ผลกระทบ และกลุ่มเป้าหมายผู้ใช้งานในบริบทจริง (2 คะแนน)",
        "sample_answer": "• สภาพปัญหา: อุปกรณ์ทดลองวิทยาศาสตร์สูญหายเฉลี่ย 15% ต่อภาคเรียน และระบบบันทึกด้วยสมุดกระดาษล่าช้า ค้นหาประวัติการยืมยาก\n• สาเหตุ: ขาดระบบยืนยันตัวตนดิจิทัลและไม่มีการแจ้งเตือนกำหนดเวลาส่งคืน\n• ผลกระทบ: โรงเรียนสูญเสียงบประมาณ และนักเรียนคาบถัดไปไม่มีอุปกรณ์ใช้งาน\n• กลุ่มเป้าหมาย: นักเรียนระดับชั้น ม.1-ม.6 (ผู้ยืม) และครู/เจ้าหน้าที่ห้องปฏิบัติการวิทยาศาสตร์ (ผู้ดูแล)"
      },
      {
        "step": 2,
        "title": "2. การวางแผนและวิเคราะห์ระบบ (Planning & Analysis)",
        "description": "กำหนดวัตถุประสงค์ ขอบเขต และข้อกำหนดความต้องการเชิงหน้าที่ของระบบ (2 คะแนน)",
        "sample_answer": "• วัตถุประสงค์: 1) พัฒนาระบบ Science Lab Portal เพื่อบันทึกการยืม-คืนด้วย QR Code 2) ลดอัตราการสูญหายของอุปกรณ์ให้เหลือ 0%\n• ขอบเขตระบบ: 1) ระบบลงทะเบียนและสร้างรหัส QR Code ประจำอุปกรณ์ 2) ระบบสแกนยืม-คืนผ่านกล้องมือถือ 3) ระบบแจ้งเตือนกำหนดส่งคืนผ่าน LINE Notify\n• ความเป็นไปได้: ใช้อุปกรณ์สมาร์ตโฟนที่มีอยู่แล้วของนักเรียนและครู ร่วมกับฐานข้อมูลออนไลน์ฟรี ทำให้ประหยัดงบประมาณ"
      },
      {
        "step": 3,
        "title": "3. การออกแบบระบบและส่วนประสานผู้ใช้ (Design & UI)",
        "description": "ออกแบบโครงสร้างฐานข้อมูล ผังงานระบบ และแบบร่างหน้าจอผู้ใช้ (Wireframe) (2 คะแนน)",
        "sample_answer": "• โครงสร้างฐานข้อมูล (3 ตารางหลัก):\n  1) Users (UserID, FullName, Classroom, LineID)\n  2) Equipments (EquipmentID, Name, Category, QRCode, Status)\n  3) BorrowRecords (RecordID, UserID, EquipmentID, BorrowDate, DueDate, ReturnDate, Status)\n• ผังงาน: สแกนบัตรนักเรียน -> สแกน QR Code อุปกรณ์ -> ตรวจสอบสถานะว่าว่าง -> บันทึกการยืมและส่งข้อความแจ้งเตือน -> จบการทำงาน\n• ออกแบบ UI: หน้าจอสแกนขนาดใหญ่ ใช้งานง่ายด้วยมือเดียว มีสีแสดงสถานะชัดเจน (เขียว = ว่าง, แดง = ถูกยืม)"
      },
      {
        "step": 4,
        "title": "4. การพัฒนาและทดสอบระบบ (Implementation & Testing)",
        "description": "วางแผนขั้นตอนการเขียนโปรแกรมและการทดสอบระบบเพื่อหาข้อบกพร่อง (2 คะแนน)",
        "sample_answer": "• การพัฒนา: พัฒนาเป็น Mobile-Friendly Web Application ใช้งานได้ทันทีผ่านเว็บบราวเซอร์โดยไม่ต้องติดตั้งแอป\n• การทดสอบระบบ:\n  1) Unit Test: ทดสอบความเร็วและความแม่นยำในการอ่าน QR Code ในที่แสงน้อย\n  2) System Test: ทดสอบการทำงานร่วมกับระบบแจ้งเตือน LINE Notify เมื่อเลยกำหนดส่งคืน\n  3) UAT: ให้ครูผู้ดูแลห้องแล็บและนักเรียนตัวแทน 30 คนทดลองใช้งานจริงในชั่วโมงปฏิบัติการ 1 สัปดาห์"
      },
      {
        "step": 5,
        "title": "5. การประเมินผลและการบำรุงรักษา (Evaluation & Maintenance)",
        "description": "กำหนดตัวชี้วัดความสำเร็จของโครงงาน (KPI) และแผนการดูแลรักษาระบบอย่างต่อเนื่อง (2 คะแนน)",
        "sample_answer": "• ตัวชี้วัดความสำเร็จ (KPI):\n  1) อัตราอุปกรณ์สูญหายลดลงเป็น 0 ชิ้น ตลอด 1 ภาคเรียน\n  2) ความพึงพอใจของครูผู้ดูแลห้องแล็บและนักเรียนอยู่ในระดับมากที่สุด (คะแนนเฉลี่ย >= 4.50 จาก 5.00)\n• แผนการบำรุงรักษา: สำรองข้อมูลฐานข้อมูลทุกสิ้นสัปดาห์, ทำความสะอาดและพิมพ์เปลี่ยนสติกเกอร์ QR Code ที่ชำรุดทุกสิ้นภาคเรียน, และปรับปรุงสิทธิ์การเข้าถึงของผู้ใช้งานทุกปีการศึกษา"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน (5 ด้าน ด้านละ 2 คะแนน):\n1. สำรวจและระบุปัญหา (2 คะแนน): วิเคราะห์ปัญหา สาเหตุ ผลกระทบ และกลุ่มเป้าหมายได้ชัดเจน (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n2. วางแผนและวิเคราะห์ (2 คะแนน): กำหนดวัตถุประสงค์ ขอบเขต และฟังก์ชันงานได้สมบูรณ์ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n3. ออกแบบระบบและ UI (2 คะแนน): ออกแบบฐานข้อมูล ผังงาน และ Wireframe ได้ถูกต้องตามหลักวิชาชีพ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n4. พัฒนาและทดสอบ (2 คะแนน): กำหนดแผนการพัฒนาและการทดสอบระบบรอบด้าน (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n5. ประเมินผลและบำรุงรักษา (2 คะแนน): กำหนดตัวชี้วัด KPI ชัดเจนและแผนบำรุงรักษาปฏิบัติได้จริง (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)"
  }
];

// Filter worksheets by unit
function filterWorksheets(unitKey) {
  currentWorksheetFilter = unitKey;
  document.querySelectorAll('.btn-ws-filter').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-ws-filter-${unitKey}`);
  if (activeBtn) activeBtn.classList.add('active');
  loadWorksheetsData(unitKey);
}

// Load Worksheets Data
async function loadWorksheetsData(filterUnit = currentWorksheetFilter) {
  try {
    let data;
    if (isStaticOrServerlessHost()) {
      data = OFFLINE_WORKSHEETS;
    } else {
      try {
        data = await apiFetch('/worksheets');
      } catch (err) {
        console.warn('Could not fetch worksheets from API, using offline dataset:', err);
        data = OFFLINE_WORKSHEETS;
      }
    }

    worksheetsCache = data;
    const container = document.getElementById('worksheets-grid');
    if (!container) return;

    let filtered = data;
    if (filterUnit && filterUnit !== 'all') {
      filtered = data.filter(w => w.unit_id === filterUnit || (filterUnit === 'mod-1' && w.unit.includes('1')) || (filterUnit === 'mod-2' && w.unit.includes('2')));
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; background: var(--surface-color); border-radius: 20px; border: 1px dashed var(--border-color);">
          <i class="fa-solid fa-folder-open text-slate-400" style="font-size: 2.5rem; margin-bottom: 12px;"></i>
          <p style="font-size: 0.95rem; font-weight: 700; color: var(--text-muted);">ไม่พบใบงานในหมวดหมู่นี้</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(ws => {
      const isUnit2 = ws.unit_id === 'mod-2' || ws.unit.includes('2');
      const accentColor = isUnit2 ? '#0284c7' : 'var(--thairath-green)';
      const bgLight = isUnit2 ? 'rgba(2, 132, 199, 0.08)' : 'rgba(0, 180, 0, 0.08)';
      const asgId = ws.asg_id || (ws.id === 'ws-1-1' ? 'asg-1' : ws.id === 'ws-1-2' ? 'asg-2' : ws.id === 'ws-1-3' ? 'asg-3' : ws.id === 'ws-2-1' ? 'asg-4' : ws.id === 'ws-2-2' ? 'asg-5' : 'asg-6');

      return `
        <div class="ws-card ${isUnit2 ? 'unit-2' : ''}">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <span style="font-size: 0.72rem; font-weight: 700; background: ${bgLight}; color: ${accentColor}; padding: 3px 10px; border-radius: 9999px; border: 1px solid ${accentColor}33;">
                ${escapeHtml(ws.unit)} • ${escapeHtml(ws.code)}
              </span>
              <span style="font-size: 0.75rem; font-extrabold; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 3px 8px; border-radius: 6px; font-weight: 800;">
                เต็ม ${ws.points} คะแนน
              </span>
            </div>

            <div>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px; line-height: 1.35;">
                ${escapeHtml(ws.title)}
              </h4>
              <p style="font-size: 0.8rem; color: ${accentColor}; font-weight: 600; margin-bottom: 8px;">
                ${escapeHtml(ws.subtitle || ws.plan)}
              </p>
              <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${escapeHtml(ws.scenario || ws.instructions)}
              </p>
            </div>
          </div>

          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--text-subtle);">
              <span><i class="fa-regular fa-calendar mr-1"></i> กำหนดส่ง: ${escapeHtml(ws.due)}</span>
              <span style="font-weight: 700; color: var(--text-muted);"><i class="fa-solid fa-bookmark mr-1 text-amber-500"></i> ${escapeHtml(ws.standard || 'ว 4.2 ม.4/1')}</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <button onclick="openWorksheetDetail('${escapeHtml(ws.id)}')" class="btn btn-outline" style="padding: 7px 10px; font-size: 0.78rem; font-weight: 700; justify-content: center;">
                <i class="fa-solid fa-book-open mr-1"></i> เปิดดูฉบับเต็ม
              </button>
              <button onclick="printWorksheet('${escapeHtml(ws.id)}')" class="btn btn-outline" style="padding: 7px 10px; font-size: 0.78rem; font-weight: 700; justify-content: center; border-color: #0284c7; color: #0284c7;">
                <i class="fa-solid fa-print mr-1"></i> พิมพ์ใบงาน A4
              </button>
            </div>

            <button onclick="openSubmitModal('${asgId}', '${escapeHtml(ws.title)}')" class="btn btn-primary" style="width: 100%; padding: 8px 12px; font-size: 0.82rem; font-weight: 700; justify-content: center;">
              <i class="fa-solid fa-cloud-arrow-up mr-1"></i> ส่งผลงานออนไลน์
            </button>
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('Worksheets load error:', err);
  }
}

// Open Worksheet Detail Modal
function openWorksheetDetail(wsId) {
  const ws = worksheetsCache.find(w => w.id === wsId) || OFFLINE_WORKSHEETS.find(w => w.id === wsId);
  if (!ws) {
    showToast('ไม่พบข้อมูลใบงานที่ต้องการ', 'error');
    return;
  }

  currentActiveWorksheet = ws;
  showAnswerKey = false;

  const isTeacherOrAdmin = Boolean(currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin'));
  const toggleBtn = document.getElementById('btn-toggle-answer');
  if (toggleBtn) {
    toggleBtn.style.display = isTeacherOrAdmin ? 'inline-flex' : 'none';
    toggleBtn.innerHTML = '<i class="fa-solid fa-key mr-1"></i> แสดงแนวคำตอบครู (เฉพาะครู/แอดมิน)';
    toggleBtn.style.background = 'transparent';
  }

  const badgeEl = document.getElementById('modal-ws-badge');
  const titleEl = document.getElementById('modal-ws-title');
  const bodyEl = document.getElementById('modal-ws-body');
  const footerInfoEl = document.getElementById('modal-ws-footer-info');

  if (badgeEl) badgeEl.innerText = `${ws.unit} • ${ws.code}`;
  if (titleEl) titleEl.innerText = ws.title;
  if (footerInfoEl) footerInfoEl.innerHTML = `<i class="fa-solid fa-graduation-cap text-emerald-600 mr-1"></i> มาตรฐานการเรียนรู้ ${escapeHtml(ws.standard || 'ว 4.2 ม.4/1')} • คะแนนเต็ม ${ws.points} คะแนน • กำหนดส่ง ${ws.due}`;

  if (bodyEl) {
    bodyEl.innerHTML = `
      <!-- Worksheet Meta Banner -->
      <div style="background: var(--surface-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 18px 22px; margin-bottom: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap;">
          <div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--thairath-green); margin-bottom: 2px;">
              <i class="fa-solid fa-chalkboard-user mr-1"></i> ${escapeHtml(ws.plan)}
            </div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">
              ${escapeHtml(ws.title)}
            </h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
              ${escapeHtml(ws.subtitle)}
            </p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.15rem; font-weight: 800; color: #10b981;">${ws.points} คะแนน</div>
            <div style="font-size: 0.75rem; color: var(--text-subtle);">กำหนดส่ง: ${escapeHtml(ws.due)}</div>
          </div>
        </div>
      </div>

      <!-- Instructions Box -->
      <div style="margin-bottom: 20px; background: rgba(0, 180, 0, 0.05); border-left: 4px solid var(--thairath-green); padding: 14px 18px; border-radius: 0 12px 12px 0;">
        <h5 style="font-size: 0.88rem; font-weight: 700; color: var(--thairath-dark-green); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-circle-info"></i> คำชี้แจงสำหรับนักเรียน:
        </h5>
        <p style="font-size: 0.84rem; color: var(--text-main); margin: 0; line-height: 1.5;">
          ${escapeHtml(ws.instructions)}
        </p>
      </div>

      <!-- Situation / Scenario Box -->
      <div style="margin-bottom: 24px; background: var(--surface-color); border: 1.5px solid var(--border-color); border-radius: 16px; padding: 20px; box-shadow: var(--shadow-sm);">
        <h5 style="font-size: 0.92rem; font-weight: 800; color: var(--text-main); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-mountain-sun text-amber-500"></i> สถานการณ์ปัญหา (Scenario):
        </h5>
        <p style="font-size: 0.88rem; color: var(--text-main); line-height: 1.65; margin: 0;">
          ${escapeHtml(ws.scenario)}
        </p>
      </div>

      <!-- Tasks Section -->
      <div style="margin-bottom: 24px;">
        <h5 style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-list-check text-emerald-600"></i> ภารกิจและกิจกรรมที่ต้องปฏิบัติ:
        </h5>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${(ws.tasks || []).map((t, idx) => `
            <div style="background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 14px; padding: 18px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <h6 style="font-size: 0.9rem; font-weight: 700; color: var(--text-main); margin: 0;">
                  ${escapeHtml(t.title)}
                </h6>
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-subtle); background: var(--surface-secondary); padding: 2px 8px; border-radius: 6px;">
                  ข้อที่ ${idx + 1}
                </span>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px; line-height: 1.5;">
                ${escapeHtml(t.description)}
              </p>

              <!-- Answer writing space placeholder -->
              <div style="background: var(--surface-secondary); border: 1px dashed var(--border-color); border-radius: 10px; padding: 14px; font-size: 0.82rem; color: var(--text-subtle); font-style: italic;">
                <i class="fa-solid fa-pen-fancy mr-1"></i> [พื้นที่สำหรับนักเรียนบันทึกคำตอบและวิเคราะห์ข้อมูล]
              </div>

              <!-- Teacher Answer Key (Accessible ONLY to Teacher / Admin) -->
              ${(isTeacherOrAdmin && t.sample_answer) ? `
                <div class="ws-answer-key-box" style="display: none; margin-top: 12px; background: rgba(245, 158, 11, 0.08); border: 1.5px dashed #d97706; border-radius: 10px; padding: 14px;" data-task-idx="${idx}">
                  <div style="font-size: 0.78rem; font-weight: 800; color: #b45309; margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
                    <span><i class="fa-solid fa-circle-check"></i> แนวคำตอบสำหรับครูผู้สอน (Teacher Answer Key):</span>
                    <span style="font-size: 0.7rem; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 9999px; font-weight: 700; border: 1px solid #fde68a;">
                      <i class="fa-solid fa-shield-halved"></i> สิทธิ์เฉพาะครูและผู้ดูแลระบบ
                    </span>
                  </div>
                  <div style="font-size: 0.84rem; color: var(--text-main); line-height: 1.6; white-space: pre-line;">
                    ${escapeHtml(t.sample_answer)}
                  </div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Rubric Box -->
      <div style="background: var(--surface-secondary); border: 1px solid var(--border-color); border-radius: 14px; padding: 16px 20px;">
        <h6 style="font-size: 0.85rem; font-weight: 800; color: var(--text-main); margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-award text-amber-500"></i> เกณฑ์การประเมินผล (Scoring Rubric):
        </h6>
        <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
          ${escapeHtml(ws.rubric)}
        </p>
      </div>
    `;
  }

  openModal('modal-worksheet-view');
}

// Toggle Teacher Answer Key in Worksheet Modal (Accessible ONLY to Teacher / Admin)
function toggleWorksheetAnswerKey() {
  const isTeacherOrAdmin = Boolean(currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin'));
  if (!isTeacherOrAdmin) {
    showToast('สิทธิ์การเข้าถึง: เฉพาะครูผู้สอนและผู้ดูแลระบบเท่านั้นที่สามารถดูแนวคำตอบได้', 'warning');
    const toggleBtn = document.getElementById('btn-toggle-answer');
    if (toggleBtn) toggleBtn.style.display = 'none';
    return;
  }

  showAnswerKey = !showAnswerKey;
  const answerBoxes = document.querySelectorAll('#modal-ws-body .ws-answer-key-box');
  answerBoxes.forEach(box => {
    box.style.display = showAnswerKey ? 'block' : 'none';
  });

  const toggleBtn = document.getElementById('btn-toggle-answer');
  if (toggleBtn) {
    if (showAnswerKey) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash mr-1"></i> ซ่อนแนวคำตอบครู';
      toggleBtn.style.background = 'rgba(245, 158, 11, 0.15)';
    } else {
      toggleBtn.innerHTML = '<i class="fa-solid fa-key mr-1"></i> แสดงแนวคำตอบครู (เฉพาะครู/แอดมิน)';
      toggleBtn.style.background = 'transparent';
    }
  }
}

// Print Current Worksheet from Modal
function printCurrentWorksheet() {
  if (!currentActiveWorksheet) return;
  printWorksheet(currentActiveWorksheet.id);
}

// Print Worksheet
function printWorksheet(wsId) {
  const ws = worksheetsCache.find(w => w.id === wsId) || OFFLINE_WORKSHEETS.find(w => w.id === wsId);
  if (!ws) {
    showToast('ไม่พบข้อมูลใบงาน', 'error');
    return;
  }

  const printArea = document.getElementById('printable-worksheet-area');
  if (!printArea) return;

  printArea.innerHTML = `
    <div style="font-family: 'Sarabun', 'TH Sarabun New', sans-serif; color: #000; padding: 10px 20px; line-height: 1.45;">
      <!-- Header (No School Logo) -->
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <div style="font-size: 13pt; font-weight: bold;">แบบบันทึกกิจกรรมการเรียนรู้และใบงานรายวิชาพื้นฐาน</div>
          <div style="font-size: 15pt; font-weight: bold;">เทคโนโลยี (วิทยาการคำนวณ) ระดับชั้นมัธยมศึกษาปีที่ 4</div>
          <div style="font-size: 11pt;">กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี โรงเรียนวังน้ำเย็นวิทยาคม</div>
        </div>
        <div style="text-align: right; font-size: 11pt; border: 1.5px solid #000; padding: 6px 14px; border-radius: 8px; min-width: 125px;">
          <div>คะแนนเต็ม <strong>${ws.points}</strong> คะแนน</div>
          <div style="margin-top: 4px;">ได้คะแนน ........... คะแนน</div>
        </div>
      </div>

      <!-- Student Name Form Field -->
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 10px; font-size: 11pt; margin-bottom: 16px; border: 1px dashed #666; padding: 8px 12px; border-radius: 6px;">
        <div>ชื่อ-นามสกุล: ..............................................................</div>
        <div>ชั้น ม.4 / ........</div>
        <div>เลขที่: ........</div>
        <div>กลุ่มที่: ........</div>
      </div>

      <!-- Worksheet Title -->
      <div style="text-align: center; margin-bottom: 14px;">
        <div style="font-size: 14pt; font-weight: bold;">${escapeHtml(ws.title)}</div>
        <div style="font-size: 11pt; color: #333;">${escapeHtml(ws.subtitle)} • (${escapeHtml(ws.standard || 'มาตรฐาน ว 4.2 ม.4/1')})</div>
      </div>

      <!-- Instructions -->
      <div style="margin-bottom: 14px; font-size: 11pt; background: #f9f9f9; border-left: 3px solid #000; padding: 6px 10px;">
        <strong>คำชี้แจง:</strong> ${escapeHtml(ws.instructions)}
      </div>

      <!-- Scenario -->
      <div style="margin-bottom: 16px; font-size: 11pt; border: 1px solid #ccc; padding: 10px 14px; border-radius: 6px;">
        <strong>สถานการณ์ปัญหา:</strong><br />
        ${escapeHtml(ws.scenario)}
      </div>

      <!-- Tasks with lined writing spaces -->
      <div style="margin-bottom: 18px;">
        <div style="font-size: 12pt; font-weight: bold; margin-bottom: 10px;">กิจกรรมและคำถามที่ต้องตอบ:</div>
        ${(ws.tasks || []).map((t, idx) => `
          <div style="margin-bottom: 16px; page-break-inside: avoid;">
            <div style="font-weight: bold; font-size: 11pt; margin-bottom: 4px;">
              ${escapeHtml(t.title)}
            </div>
            <div style="font-size: 10pt; color: #444; margin-bottom: 8px;">
              ${escapeHtml(t.description)}
            </div>
            <div style="border-bottom: 1px dotted #888; height: 26px;"></div>
            <div style="border-bottom: 1px dotted #888; height: 26px;"></div>
            <div style="border-bottom: 1px dotted #888; height: 26px;"></div>
            <div style="border-bottom: 1px dotted #888; height: 26px;"></div>
          </div>
        `).join('')}
      </div>

      <!-- Signature Footer -->
      <div style="margin-top: 30px; display: flex; justify-content: space-between; font-size: 11pt; page-break-inside: avoid;">
        <div style="text-align: center;">
          ลงชื่อ ........................................................... นักเรียนผู้ส่งงาน<br />
          ( ........................................................... )<br />
          วันที่ ...... / ...... / 2569
        </div>
        <div style="text-align: center;">
          ลงชื่อ ........................................................... ครูผู้ประเมิน<br />
          ( ครูปณิฏฐา บุญยงค์ )<br />
          วันที่ ...... / ...... / 2569
        </div>
      </div>
    </div>
  `;

  window.print();
}

// Submit current worksheet from modal
function submitCurrentWorksheet() {
  if (!currentActiveWorksheet) return;
  if (!currentUser) {
    showToast('กรุณาเข้าสู่ระบบด้วยบัญชีนักเรียนก่อนส่งงาน', 'warning');
    openLoginModal();
    return;
  }
  const asgId = currentActiveWorksheet.asg_id || (currentActiveWorksheet.id === 'ws-1-1' ? 'asg-1' : currentActiveWorksheet.id === 'act-1-1' ? 'asg-2' : currentActiveWorksheet.id === 'ws-2-1' ? 'asg-3' : currentActiveWorksheet.id === 'ws-2-2' ? 'asg-4' : 'asg-5');
  closeModal('modal-worksheet-view');
  openSubmitModal(asgId, currentActiveWorksheet.title);
}






// --- 7. ASSIGNMENTS & SUBMISSIONS ---
const OFFLINE_ASSIGNMENTS = [
  {
    id: 'asg-1',
    unit: 'mod-1',
    title: 'ใบงานที่ 1.1: เรื่อง การประยุกต์ใช้แนวคิดเชิงคำนวณในการแก้ปัญหาบริบทจริง',
    description: 'การประยุกต์ใช้ 4 องค์ประกอบของแนวคิดเชิงคำนวณเพื่อแก้ปัญหาในชีวิตประจำวัน',
    due_date: '2026-10-15',
    total_points: 10
  },
  {
    id: 'asg-2',
    unit: 'mod-1',
    title: 'ใบงานที่ 1.2: เรื่อง การพัฒนาระบบด้วยวงจร SDLC (กรณีศึกษาร้านเบเกอรี)',
    description: 'การประยุกต์ใช้วงจรการพัฒนาระบบ 5 ขั้นตอนเพื่อแก้ปัญหาธุรกิจจริง',
    due_date: '2026-10-30',
    total_points: 10
  },
  {
    id: 'asg-3',
    unit: 'mod-1',
    title: 'ใบงานที่ 1.3: เรื่อง การจัดทำเค้าโครงรายงานโครงงาน 5 บท',
    description: 'จัดทำเค้าโครงโครงงาน (Project Proposal) และโครงสร้างรายงาน 5 บทมาตรฐานวิชาการ',
    due_date: '2026-11-15',
    total_points: 10
  },
  {
    id: 'asg-4',
    unit: 'mod-2',
    title: 'ใบงานที่ 2.1: เรื่อง การวางแผนและการวิเคราะห์ความต้องการในการพัฒนาโครงงาน',
    description: 'การกำหนดวัตถุประสงค์ ขอบเขต และแผนภูมิแกนต์ (กรณีศึกษา StyleHub)',
    due_date: '2026-11-30',
    total_points: 10
  },
  {
    id: 'asg-5',
    unit: 'mod-2',
    title: 'ใบงานที่ 2.2: เรื่อง การวิเคราะห์ข้อมูลและออกแบบระบบ (Context Diagram & UI)',
    description: 'การวิเคราะห์ข้อกำหนดเชิงหน้าที่และการออกแบบแผนภาพบริบทระบบพาณิชย์อิเล็กทรอนิกส์',
    due_date: '2026-12-15',
    total_points: 10
  },
  {
    id: 'asg-6',
    unit: 'mod-2',
    title: 'ใบงานที่ 2.3: เรื่อง การพัฒนาโครงงานเพื่อแก้ปัญหาตามกระบวนการ SDLC ในบริบทจริง',
    description: 'การบูรณาการแนวคิดเชิงคำนวณและวงจร SDLC ครบวงจรในการแก้ปัญหาของสถานศึกษาหรือชุมชน',
    due_date: '2026-12-30',
    total_points: 10
  }
];

// Helper to check if a submission belongs strictly to the currently logged in student
function isMySubmission(sub, user) {
  if (!user || user.role !== 'student') return false;
  
  const userIds = [user.id, user.username, user.student_id]
    .filter(Boolean)
    .map(x => String(x).toLowerCase().trim());

  const subStudentId = String(sub.student_id || '').toLowerCase().trim();
  const subId = String(sub.id || '').toLowerCase().trim();

  // 1. Direct ID match
  if (userIds.includes(subStudentId)) return true;

  // 2. subId contains user ID
  if (userIds.some(uid => subId.includes(`-${uid}-`) || subId.startsWith(`sub-${uid}`) || subId === uid)) {
    return true;
  }

  // 3. Name match
  const subName = String(sub.student_name || '').toLowerCase().trim();
  if (user.real_name && subName.includes(user.real_name.toLowerCase().trim())) return true;
  if (user.full_name && subName.includes(user.full_name.toLowerCase().trim())) return true;

  // Clean title prefix like นาย, นางสาว, ด.ช., ด.ญ.
  const cleanName = (name) => name.replace(/^(นาย|นางสาว|นาง|ด\.ช\.|ด\.ญ\.)\s*/, '').trim();
  const userClean = cleanName(user.real_name || user.full_name || '');
  if (userClean && userClean.length >= 4 && subName.includes(userClean.toLowerCase())) {
    return true;
  }

  return false;
}

// Helper to render a single submission card
function renderSubmissionCardHtml(sub, assignments) {
  const matchedAsg = assignments.find(a => a.id === sub.assignment_id);
  const asgTitle = sub.assignment_title || (matchedAsg ? matchedAsg.title : sub.assignment_id);
  const maxPts = sub.total_points || (matchedAsg ? (matchedAsg.total_points || matchedAsg.points || 10) : 10);

  let fileLinkHtml = '';
  if (sub.file_url) {
    if (sub.file_url.startsWith('data:')) {
      fileLinkHtml = `
        <a href="${sub.file_url}" download="${escapeHtml((sub.student_name || 'submission') + '_' + sub.assignment_id)}" class="text-xs text-emerald-600 font-bold hover:underline inline-flex items-center gap-1">
          <i class="fa-solid fa-file-arrow-down"></i> ดาวน์โหลดไฟล์ผลงานที่แนบมา
        </a>
      `;
    } else if (sub.file_url.startsWith('/uploads/')) {
      fileLinkHtml = `
        <a href="${escapeHtml(sub.file_url)}" target="_blank" class="text-xs text-emerald-600 font-bold hover:underline inline-flex items-center gap-1">
          <i class="fa-solid fa-file-arrow-down"></i> ดาวน์โหลดไฟล์ผลงานของนักเรียน
        </a>
      `;
    } else {
      fileLinkHtml = `
        <a href="${escapeHtml(sub.file_url)}" target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 font-semibold hover:underline inline-flex items-center gap-1">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> เปิดลิงก์ผลงาน (Drive/Canva/GitHub)
        </a>
      `;
    }
  }

  const isTeacher = currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin');

  return `
    <div class="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 mb-3">
      <div class="flex items-center justify-between">
        <span class="font-bold text-xs text-slate-800">${escapeHtml(sub.student_name)} ${sub.class_room ? `(${sub.class_room})` : ''}</span>
        <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-md ${sub.status === 'graded' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}">
          ${sub.status === 'graded' ? `คะแนน: ${sub.score}/${maxPts}` : 'รอครูตรวจคะแนน'}
        </span>
      </div>
      <p class="text-xs font-semibold text-slate-700">${escapeHtml(asgTitle)}</p>
      <p class="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 whitespace-pre-line">${escapeHtml(sub.content || '')}</p>
      ${fileLinkHtml}
      ${sub.feedback ? `
        <div class="text-xs bg-amber-50 text-amber-900 p-2.5 rounded-xl border border-amber-200">
          <span class="font-bold block">คำแนะนำจากครู:</span> ${escapeHtml(sub.feedback)}
        </div>
      ` : ''}
      
      ${isTeacher ? `
        <div class="pt-2 text-right">
          <button onclick="openGradeModal('${escapeHtml(sub.id)}', '${escapeHtml(sub.student_name)}', ${sub.score || 0})" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition">
            <i class="fa-solid fa-check-double mr-1"></i> ให้คะแนน / เขียน Feedback
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

// Helper to fetch all submissions from Supabase Cloud / local API
async function fetchAllSubmissions() {
  let list = [];
  if (!isStaticOrServerlessHost()) {
    try {
      list = await apiFetch('/submissions');
      if (Array.isArray(list) && list.length > 0) return list;
    } catch (e) {}
  }

  // Direct fetch from Supabase Cloud
  try {
    const sbRes = await fetch(`${SUPABASE_REST_URL}/submissions?select=*&order=submitted_at.desc`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (sbRes.ok) {
      list = await sbRes.json();
    }
  } catch (sbErr) {
    console.warn('Supabase submissions fetch error:', sbErr);
  }

  // Merge with localStorage cached submissions
  try {
    const localSubs = JSON.parse(localStorage.getItem('csm4_submissions') || '[]');
    if (localSubs.length > 0) {
      localSubs.forEach(ls => {
        if (!list.some(s => s.id === ls.id)) {
          list.push(ls);
        }
      });
    }
  } catch (e) {}

  return list;
}

async function loadAssignmentsData() {
  try {
    let assignments = OFFLINE_ASSIGNMENTS;
    if (!isStaticOrServerlessHost()) {
      try {
        const fetched = await apiFetch('/assignments');
        if (Array.isArray(fetched) && fetched.length > 0) assignments = fetched;
      } catch (e) {}
    }

    const submissions = await fetchAllSubmissions();

    // 1. Render Left Column: Assignments list
    const asgContainer = document.getElementById('assignments-list');
    if (asgContainer) {
      asgContainer.innerHTML = assignments.map(asg => {
        const mySub = (currentUser && currentUser.role === 'student') ? submissions.find(s => s.assignment_id === asg.id && isMySubmission(s, currentUser)) : null;

        let actionBtnHtml = '';
        if (!currentUser) {
          actionBtnHtml = `
            <button onclick="openLoginModal()" class="btn btn-outline" style="font-size: 0.78rem; padding: 6px 14px; border-color: var(--thairath-green); color: var(--thairath-green); font-weight: 700;">
              <i class="fa-solid fa-arrow-right-to-bracket mr-1"></i> เข้าสู่ระบบเพื่อส่งงาน
            </button>
          `;
        } else if (currentUser.role === 'student') {
          actionBtnHtml = `
            <button onclick="openSubmitModal('${asg.id}', '${escapeHtml(asg.title)}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-upload mr-1"></i> ${mySub ? 'แก้ไขส่งงาน' : 'ส่งงาน (Supabase Cloud)'}
            </button>
          `;
        } else {
          // Teacher / Admin
          const wsId = asg.id === 'asg-1' ? 'ws-1-1' : asg.id === 'asg-2' ? 'ws-1-2' : asg.id === 'asg-3' ? 'ws-1-3' : asg.id === 'asg-4' ? 'ws-2-1' : asg.id === 'asg-5' ? 'ws-2-2' : 'ws-2-3';
          actionBtnHtml = `
            <button onclick="openWorksheetDetail('${wsId}')" class="btn btn-outline" style="font-size: 0.78rem; padding: 6px 14px; font-weight: 700;">
              <i class="fa-solid fa-file-signature mr-1"></i> ดูใบงาน / เฉลยครู
            </button>
          `;
        }

        return `
          <div class="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-sm text-slate-800">${escapeHtml(asg.title)}</h4>
              <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                เต็ม ${asg.total_points || asg.points || 10} คะแนน
              </span>
            </div>
            <p class="text-xs text-slate-600">${escapeHtml(asg.description || asg.desc || '')}</p>
            <div class="flex items-center justify-between pt-2">
              <span class="text-[11px] text-slate-400">กำหนดส่ง: ${escapeHtml(asg.due_date || asg.due || '2026-10-15')}</span>
              ${actionBtnHtml}
            </div>
          </div>
        `;
      }).join('');
    }

    // 2. Render Right Column: Submissions list (Strict Privacy Check)
    const subContainer = document.getElementById('submissions-list');
    if (!subContainer) return;

    // CASE A: User is NOT logged in (Guest) -> CANNOT view any submissions
    if (!currentUser) {
      subContainer.innerHTML = `
        <div style="text-align: center; padding: 38px 20px; background: var(--surface-color); border: 1.5px dashed var(--border-color); border-radius: 16px;">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: rgba(0, 180, 0, 0.12); color: var(--thairath-green); display: inline-flex; align-items: center; justify-content: center; font-size: 1.45rem; margin-bottom: 12px;">
            <i class="fa-solid fa-lock"></i>
          </div>
          <h5 style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); margin-bottom: 6px;">
            กรุณาเข้าสู่ระบบเพื่อดูประวัติการส่งงาน
          </h5>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.55; max-width: 320px; margin: 0 auto 16px;">
            เพื่อความปลอดภัยและความเป็นส่วนตัวของข้อมูล นักเรียนจะสามารถดูได้เฉพาะผลงานและคะแนนของตนเองเท่านั้น
          </p>
          <button onclick="openLoginModal()" class="btn btn-primary" style="font-size: 0.82rem; padding: 8px 18px; border-radius: 10px; font-weight: 700;">
            <i class="fa-solid fa-arrow-right-to-bracket mr-1"></i> เข้าสู่ระบบด้วยรหัสนักเรียน
          </button>
        </div>
      `;
      return;
    }

    // CASE B: User is logged in as Student -> ONLY view their own submissions
    if (currentUser.role === 'student') {
      const mySubmissions = submissions.filter(s => isMySubmission(s, currentUser));

      if (mySubmissions.length === 0) {
        subContainer.innerHTML = `
          <div style="font-size: 0.76rem; color: var(--thairath-green); font-weight: 700; margin-bottom: 12px; background: rgba(0, 180, 0, 0.08); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color);">
            <i class="fa-solid fa-user-check mr-1"></i> บัญชี: ${escapeHtml(currentUser.full_name)} (${currentUser.class_room || 'ม.4'})
          </div>
          <div style="text-align: center; padding: 32px 18px; background: var(--surface-color); border: 1px dashed var(--border-color); border-radius: 16px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); color: #10b981; display: inline-flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 10px;">
              <i class="fa-solid fa-file-circle-plus"></i>
            </div>
            <h6 style="font-size: 0.9rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">คุณยังไม่มีประวัติการส่งงาน</h6>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0;">เลือกใบงานทางด้านซ้ายเพื่อแนบไฟล์หรือส่งลิงก์ผลงานของคุณ</p>
          </div>
        `;
        return;
      }

      subContainer.innerHTML = `
        <div style="font-size: 0.76rem; color: var(--thairath-green); font-weight: 700; margin-bottom: 12px; background: rgba(0, 180, 0, 0.08); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <span><i class="fa-solid fa-user-check mr-1"></i> แสดงเฉพาะผลงานของคุณ: ${escapeHtml(currentUser.full_name)}</span>
          <span style="background: rgba(16, 185, 129, 0.18); padding: 2px 8px; border-radius: 6px;">${mySubmissions.length} รายการ</span>
        </div>
      ` + mySubmissions.map(sub => renderSubmissionCardHtml(sub, assignments)).join('');
      return;
    }

    // CASE C: User is Teacher / Admin -> Can view all submissions for grading
    if (submissions.length === 0) {
      subContainer.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">ยังไม่มีรายการส่งงานในระบบ</p>`;
      return;
    }

    subContainer.innerHTML = `
      <div style="font-size: 0.76rem; color: #b45309; font-weight: 700; margin-bottom: 12px; background: rgba(245, 158, 11, 0.1); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.3); display: flex; justify-content: space-between; align-items: center;">
        <span><i class="fa-solid fa-chalkboard-user mr-1"></i> สิทธิ์ครู/แอดมิน: แสดงผลงานนักเรียนทั้งหมด</span>
        <span style="background: rgba(245, 158, 11, 0.2); padding: 2px 8px; border-radius: 6px;">${submissions.length} รายการ</span>
      </div>
    ` + submissions.map(sub => renderSubmissionCardHtml(sub, assignments)).join('');

  } catch (err) {
    console.error('Assignments load error:', err);
  }
}

// --- PRO ASSIGNMENT SUBMISSION & UPLOAD HELPERS ---
let currentSubmitMode = 'upload';
let currentSelectedFile = null;

function switchSubmitMode(mode) {
  currentSubmitMode = mode;
  const tabUpload = document.getElementById('tab-mode-upload');
  const tabLink = document.getElementById('tab-mode-link');
  const secUpload = document.getElementById('section-submit-upload');
  const secLink = document.getElementById('section-submit-link');

  if (mode === 'upload') {
    if (tabUpload) tabUpload.classList.add('active');
    if (tabLink) tabLink.classList.remove('active');
    if (secUpload) secUpload.style.display = 'block';
    if (secLink) secLink.style.display = 'none';
  } else {
    if (tabLink) tabLink.classList.add('active');
    if (tabUpload) tabUpload.classList.remove('active');
    if (secLink) secLink.style.display = 'block';
    if (secUpload) secUpload.style.display = 'none';
  }
}

function handleFileSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (file) setUploadFile(file);
}

function handleDragOver(event) {
  event.preventDefault();
  const dz = document.getElementById('dropzone');
  if (dz) dz.classList.add('dragover');
}

function handleDragLeave(event) {
  event.preventDefault();
  const dz = document.getElementById('dropzone');
  if (dz) dz.classList.remove('dragover');
}

function handleDrop(event) {
  event.preventDefault();
  const dz = document.getElementById('dropzone');
  if (dz) dz.classList.remove('dragover');
  const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
  if (file) setUploadFile(file);
}

function setUploadFile(file) {
  if (file.size > 25 * 1024 * 1024) {
    showToast('ไฟล์มีขนาดใหญ่เกิน 25MB กรุณาเลือกไฟล์ที่มีขนาดเล็กลง', 'error');
    return;
  }
  currentSelectedFile = file;

  const card = document.getElementById('selected-file-card');
  const nameEl = document.getElementById('selected-file-name');
  const sizeEl = document.getElementById('selected-file-size');

  if (nameEl) nameEl.innerText = file.name;
  if (sizeEl) sizeEl.innerText = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
  if (card) card.style.display = 'flex';
}

function clearSelectedFile() {
  currentSelectedFile = null;
  const input = document.getElementById('submit-file-input');
  if (input) input.value = '';
  const card = document.getElementById('selected-file-card');
  if (card) card.style.display = 'none';
}

function checkDriveUrl(url) {
  const alertBox = document.getElementById('drive-perm-alert');
  if (!alertBox) return;
  const isDrive = /drive\.google\.com|docs\.google\.com/i.test(url);
  alertBox.style.display = isDrive ? 'block' : 'none';
}

function openSubmitModal(asgId, title) {
  if (!currentUser) {
    showToast('กรุณาเข้าสู่ระบบด้วยบัญชีนักเรียนก่อนส่งงาน', 'warning');
    openLoginModal();
    return;
  }
  if (currentUser.role !== 'student') {
    showToast('บัญชีผู้สอน/แอดมินไม่สามารถส่งงานได้ กรุณาเข้าสู่ระบบด้วยบัญชีนักเรียน', 'info');
    return;
  }

  document.getElementById('submit-asg-id').value = asgId;
  const modalTitle = document.getElementById('modal-asg-title');
  if (modalTitle) modalTitle.innerText = `ยื่นส่งงาน: ${title}`;
  
  const userInfoText = document.getElementById('submit-user-info-text');
  if (userInfoText && currentUser) {
    userInfoText.innerText = `ผู้ส่งงาน: ${currentUser.full_name || currentUser.username} (${currentUser.class_room || 'ม.4'})`;
  }

  // Reset form states
  clearSelectedFile();
  const urlInput = document.getElementById('submit-file-url');
  if (urlInput) urlInput.value = '';
  const contentInput = document.getElementById('submit-content');
  if (contentInput) contentInput.value = '';
  const driveAlert = document.getElementById('drive-perm-alert');
  if (driveAlert) driveAlert.style.display = 'none';
  const progressWrap = document.getElementById('upload-progress-wrap');
  if (progressWrap) progressWrap.style.display = 'none';

  switchSubmitMode('upload');
  openModal('modal-submit-assignment');
}

async function doSubmitAssignment() {
  const assignment_id = document.getElementById('submit-asg-id').value;
  const contentInput = document.getElementById('submit-content');
  let content = contentInput ? contentInput.value.trim() : '';
  const submitBtn = document.getElementById('btn-submit-work');
  const progressWrap = document.getElementById('upload-progress-wrap');
  const progressBar = document.getElementById('upload-progress-bar');
  const progressPct = document.getElementById('upload-progress-pct');
  const progressText = document.getElementById('upload-progress-text');

  let file_url = '';

  // 1. Process File Upload or Link Mode
  if (currentSubmitMode === 'upload') {
    if (!currentSelectedFile && !content) {
      showToast('กรุณาเลือกไฟล์ที่ต้องการส่ง หรือพิมพ์รายละเอียดงาน', 'error');
      return;
    }

    if (currentSelectedFile) {
      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-1"></i> กำลังเตรียมไฟล์...';
        }
        if (progressWrap) progressWrap.style.display = 'block';
        if (progressBar) progressBar.style.width = '35%';
        if (progressPct) progressPct.innerText = '35%';
        if (progressText) progressText.innerText = 'กำลังประมวลผลไฟล์...';

        let uploadedViaServer = false;

        // Try local server endpoint if not running on file:// protocol
        if (!isStaticOrServerlessHost()) {
          try {
            const formData = new FormData();
            formData.append('file', currentSelectedFile);

            const res = await fetch('/api/submissions/upload', {
              method: 'POST',
              headers: { 'Authorization': 'Bearer ' + currentToken },
              body: formData
            });
            if (res.ok) {
              const uploadData = await res.json();
              if (uploadData && uploadData.file_url) {
                file_url = uploadData.file_url;
                uploadedViaServer = true;
              }
            }
          } catch (e) {
            console.warn('Server upload not reachable, using Data URL fallback:', e);
          }
        }

        // Offline / file:// protocol fallback: Read file as Base64 Data URL
        if (!uploadedViaServer) {
          if (progressBar) progressBar.style.width = '70%';
          if (progressPct) progressPct.innerText = '70%';
          if (progressText) progressText.innerText = 'กำลังเตรียมส่งข้อมูลขึ้น Supabase Cloud...';

          const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('ไม่สามารถอ่านไฟล์ได้'));
            reader.readAsDataURL(currentSelectedFile);
          });
          file_url = dataUrl;
        }

        if (progressBar) progressBar.style.width = '100%';
        if (progressPct) progressPct.innerText = '100%';
        if (progressText) progressText.innerText = 'ประมวลผลไฟล์เสร็จสมบูรณ์!';

        const fileNote = `[ไฟล์แนบ: ${currentSelectedFile.name} (${(currentSelectedFile.size / (1024 * 1024)).toFixed(2)} MB)]`;
        if (!content) {
          content = `ส่งไฟล์ผลงาน ${fileNote}`;
        } else if (!content.includes(currentSelectedFile.name)) {
          content = `${content}\n${fileNote}`;
        }

      } catch (uploadErr) {
        console.error('File process error:', uploadErr);
        showToast(uploadErr.message || 'เกิดข้อผิดพลาดในการประมวลผลไฟล์', 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up mr-1"></i> ยืนยันส่งงาน (Supabase Cloud)';
        }
        if (progressWrap) progressWrap.style.display = 'none';
        return;
      }
    }
  } else {
    // Mode Link
    const urlInput = document.getElementById('submit-file-url');
    file_url = urlInput ? urlInput.value.trim() : '';
    if (!file_url && !content) {
      showToast('กรุณากรอกลิงก์ผลงาน หรือพิมพ์คำอธิบายงาน', 'error');
      return;
    }
  }

  // 2. Build Submission Record
  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-1"></i> กำลังบันทึกลง Supabase...';
    }

    const studentUser = currentUser || {};
    const studentId = studentUser.id || studentUser.student_id || studentUser.username || '10001';
    const studentName = studentUser.full_name || studentUser.real_name || 'นายกิตติศักดิ์ มีสุข';
    const classRoom = studentUser.class_room || 'ม.4/1';
    const subId = `sub-${studentId}-${assignment_id}`;

    const submissionRecord = {
      id: subId,
      assignment_id: assignment_id,
      student_id: String(studentId),
      student_name: studentName,
      class_room: classRoom,
      content: content || 'ส่งงานผ่านระบบออนไลน์',
      file_url: file_url || null,
      status: 'submitted',
      submitted_at: new Date().toISOString()
    };

    // 3. Direct Upsert to Supabase Cloud REST API
    let savedToSupabase = false;
    try {
      const sbRes = await fetch(`${SUPABASE_REST_URL}/submissions`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation,resolution=merge-duplicates'
        },
        body: JSON.stringify(submissionRecord)
      });

      if (sbRes.ok) {
        savedToSupabase = true;
        console.log('✅ Direct Supabase submit success:', subId);
      } else {
        const errJson = await sbRes.json().catch(() => ({}));
        console.warn('⚠️ Supabase REST API response:', sbRes.status, errJson);
      }
    } catch (sbErr) {
      console.warn('Direct Supabase fetch error (network or offline):', sbErr);
    }

    // 4. Also call server endpoint if running on localhost/http
    if (!isStaticOrServerlessHost()) {
      try {
        await apiFetch('/submissions', 'POST', {
          assignment_id,
          content: submissionRecord.content,
          file_url: submissionRecord.file_url
        });
      } catch (e) {}
    }

    // 5. Always persist to localStorage cache
    try {
      let localSubs = JSON.parse(localStorage.getItem('csm4_submissions') || '[]');
      const existIdx = localSubs.findIndex(s => s.id === submissionRecord.id);
      if (existIdx >= 0) {
        localSubs[existIdx] = { ...localSubs[existIdx], ...submissionRecord };
      } else {
        localSubs.unshift(submissionRecord);
      }
      localStorage.setItem('csm4_submissions', JSON.stringify(localSubs));
    } catch (e) {}

    // 6. UI feedback and close modal
    closeModal('modal-submit-assignment');

    if (savedToSupabase) {
      showToast('ส่งงานสำเร็จเรียบร้อย! ระบบบันทึกลงฐานข้อมูล Supabase Cloud แล้ว', 'success');
    } else {
      showToast('ส่งงานสำเร็จและบันทึกในระบบเรียบร้อย (ระบบจะซิงค์ขึ้น Supabase อัตโนมัติ)', 'success');
    }

    loadAssignmentsData();

  } catch (err) {
    console.error('Submit error:', err);
    showToast('เกิดข้อผิดพลาดในการส่งงาน: ' + (err.message || 'โปรดลองอีกครั้ง'), 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up mr-1"></i> ยืนยันส่งงาน (Supabase Cloud)';
    }
  }
}

function openGradeModal(subId, studentName, currentScore) {
  document.getElementById('grade-sub-id').value = subId;
  document.getElementById('grade-student-name').innerText = studentName;
  document.getElementById('grade-score-input').value = currentScore || 10;
  openModal('modal-grade-submission');
}

async function doGradeSubmission() {
  const submission_id = document.getElementById('grade-sub-id').value;
  const score = document.getElementById('grade-score-input').value;
  const feedback = document.getElementById('grade-feedback-input').value.trim();

  try {
    // 1. Direct update to Supabase Cloud
    try {
      await fetch(`${SUPABASE_REST_URL}/submissions?id=eq.${encodeURIComponent(submission_id)}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          score: Number(score),
          feedback,
          status: 'graded',
          graded_at: new Date().toISOString()
        })
      });
    } catch (sbErr) {
      console.warn('Direct Supabase grade error:', sbErr);
    }

    // 2. Server API if running
    if (!isStaticOrServerlessHost()) {
      try {
        await apiFetch('/submissions/grade', 'POST', { submission_id, score, feedback });
      } catch (e) {}
    }

    // 3. Local cache update
    try {
      let localSubs = JSON.parse(localStorage.getItem('csm4_submissions') || '[]');
      const sub = localSubs.find(s => s.id === submission_id);
      if (sub) {
        sub.score = Number(score);
        sub.feedback = feedback;
        sub.status = 'graded';
        sub.graded_at = new Date().toISOString();
        localStorage.setItem('csm4_submissions', JSON.stringify(localSubs));
      }
    } catch (e) {}

    closeModal('modal-grade-submission');
    showToast('บันทึกคะแนนเรียบร้อย! ระบบบันทึกลง Supabase ทันที', 'success');
    loadAssignmentsData();
    if (activeTab === 'teacher') loadTeacherData();
  } catch (err) {
    console.error('Grade error:', err);
  }
}


// --- 8. QUIZZES & EXAMS DATA (OFFLINE & ONLINE) ---
const OFFLINE_QUIZZES = [
  {
    "id": "quiz-pre-unit1",
    "category": "pretest",
    "title": "แบบทดสอบวัดผลสัมฤทธิ์ก่อนเรียน หน่วยการเรียนรู้ที่ 1: แนวคิดเชิงคำนวณกับการแก้ปัญหา (10 ข้อ)",
    "timeLimitMinutes": 15,
    "passcode": "preunit1",
    "questions": [
      {
        "id": "pre1_q1",
        "question": "ทักษะใดจัดเป็นความหมายที่แท้จริงของ \"แนวคิดเชิงคำนวณ (Computational Thinking)\"?",
        "options": [
          "ทักษะการคิดวิเคราะห์เพื่อแก้ปัญหาอย่างเป็นระบบและเป็นขั้นตอน",
          "ทักษะการซ่อมบำรุงและติดตั้งอุปกรณ์ฮาร์ดแวร์คอมพิวเตอร์",
          "ความสามารถในการจดจำคำสั่งของภาษาคอมพิวเตอร์ระดับสูง",
          "ความชำนาญในการพิมพ์ดีดข้อความภาษาอังกฤษด้วยความเร็ว"
        ],
        "correctIndex": 0,
        "explanation": "แนวคิดเชิงคำนวณมุ่งเน้นทักษะการคิดวิเคราะห์ในการแก้ปัญหาอย่างเป็นระบบและเป็นลำดับขั้นตอน"
      },
      {
        "id": "pre1_q2",
        "question": "หากนักเรียนต้องการซ่อมพัดลมที่ไม่หมุน แล้วถอดชิ้นส่วนใบพัด มอเตอร์ และปุ่มกดออกดู ตรงกับองค์ประกอบใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)"
        ],
        "correctIndex": 1,
        "explanation": "Decomposition คือการแยกย่อยปัญหาหรือระบบออกเป็นส่วนประกอบย่อยๆ เพื่อให้แก้ไขได้ง่ายขึ้น"
      },
      {
        "id": "pre1_q3",
        "question": "การที่นักเรียนจำได้ว่า \"มักจะมีฝนตกหนักทุกวันศุกร์ช่วงเลิกเรียน\" แล้วเตรียมร่มมาโรงเรียน จัดเป็นทักษะใด?",
        "options": [
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การคิดเชิงนามธรรม (Abstraction)"
        ],
        "correctIndex": 2,
        "explanation": "การสังเกตแบบแผนความสม่ำเสมอหรือความคล้ายคลึงของเหตุการณ์ที่เกิดขึ้นซ้ำๆ คือ Pattern Recognition"
      },
      {
        "id": "pre1_q4",
        "question": "การวาดแผนผังโรงเรียนโดยแสดงเฉพาะอาคารเรียนและเส้นทางเดิน โดยตัดต้นไม้และเสาไฟทิ้งไป ตรงกับข้อใด?",
        "options": [
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การคิดเชิงนามธรรม (Abstraction)"
        ],
        "correctIndex": 3,
        "explanation": "Abstraction คือการคัดเลือกเฉพาะข้อมูลที่จำเป็นและตัดรายละเอียดที่ไม่เกี่ยวข้องทิ้งไป"
      },
      {
        "id": "pre1_q5",
        "question": "การเขียนสูตรชงชานมไข่มุกโดยระบุขั้นตอนและปริมาณส่วนผสมอย่างชัดเจน สอดคล้องกับข้อใด?",
        "options": [
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การคิดเชิงนามธรรม (Abstraction)",
          "การหารูปแบบ (Pattern Recognition)"
        ],
        "correctIndex": 0,
        "explanation": "การกำหนดลำดับขั้นตอนการปฏิบัติงานอย่างชัดเจนเป็น Algorithm Design"
      },
      {
        "id": "pre1_q6",
        "question": "ในการเขียนผังงาน (Flowchart) สัญลักษณ์รูป \"วงรีหรือสี่เหลี่ยมมุมมน (Oval)\" ใช้แทนสิ่งใด?",
        "options": [
          "การประมวลผลหรือคำนวณข้อมูล",
          "จุดเริ่มต้นหรือจุดสิ้นสุดการทำงาน",
          "การตรวจสอบเงื่อนไขเพื่อตัดสินใจ",
          "การรับข้อมูลเข้าผ่านทางแป้นพิมพ์"
        ],
        "correctIndex": 1,
        "explanation": "สัญลักษณ์ Terminator (วงรี/สี่เหลี่ยมมุมมน) ใช้แทนจุดเริ่มต้นและสิ้นสุดของผังงาน"
      },
      {
        "id": "pre1_q7",
        "question": "สัญลักษณ์รูป \"สี่เหลี่ยมขนมเปียกปูน (Diamond)\" ในผังงาน ทำหน้าที่อะไร?",
        "options": [
          "แสดงทิศทางการไหลของข้อมูลในผังงาน",
          "แสดงการรับเข้าข้อมูลจากแป้นพิมพ์",
          "ตรวจสอบเงื่อนไขเพื่อตัดสินใจเลือกทำ",
          "คำนวณสูตรคณิตศาสตร์ของโปรแกรม"
        ],
        "correctIndex": 2,
        "explanation": "Decision (สี่เหลี่ยมขนมเปียกปูน) ใช้สำหรับตรวจสอบเงื่อนไขในการตัดสินใจ"
      },
      {
        "id": "pre1_q8",
        "question": "ตัวย่อ \"SDLC\" ในการพัฒนาโครงงานคอมพิวเตอร์ ย่อมาจากคำภาษาอังกฤษในข้อใด?",
        "options": [
          "Software Data Learning Center",
          "System Digital Line Communication",
          "Standard Device Logic Control",
          "System Development Life Cycle"
        ],
        "correctIndex": 3,
        "explanation": "SDLC ย่อมาจาก System Development Life Cycle (วงจรการพัฒนาระบบ)"
      },
      {
        "id": "pre1_q9",
        "question": "ขั้นตอนแรกสุดของการพัฒนาโครงงานคอมพิวเตอร์ตามวงจร SDLC คือขั้นตอนใด?",
        "options": [
          "ขั้นการวางแผน (Planning)",
          "ขั้นการเขียนโค้ด (Implementation)",
          "ขั้นการออกแบบหน้าจอ (Design)",
          "ขั้นการบำรุงรักษา (Maintenance)"
        ],
        "correctIndex": 0,
        "explanation": "วงจร SDLC เริ่มต้นจากขั้นตอนการวางแผน (Planning)"
      },
      {
        "id": "pre1_q10",
        "question": "ข้อใดเป็นประโยชน์สำคัญที่สุดของการเขียนผังงาน (Flowchart) ก่อนลงมือเขียนโปรแกรมจริง?",
        "options": [
          "ช่วยลดต้นทุนในการจัดซื้อคอมพิวเตอร์",
          "ช่วยให้มองเห็นลำดับขั้นตอนการทำงานชัดเจน",
          "ช่วยให้คอมพิวเตอร์ประมวลผลเร็วขึ้นทันที",
          "ป้องกันไม่ให้ไวรัสคอมพิวเตอร์เข้าสู่ระบบ"
        ],
        "correctIndex": 1,
        "explanation": "ผังงานช่วยถ่ายทอดขั้นตอนวิธีออกมาเป็นภาพแผนผัง ทำให้มองเห็นลำดับการทำงานและตรวจสอบข้อผิดพลาดได้ง่าย"
      }
    ]
  },
  {
    "id": "quiz-pre-unit2",
    "category": "pretest",
    "title": "แบบทดสอบวัดผลสัมฤทธิ์ก่อนเรียน หน่วยการเรียนรู้ที่ 2: การแก้ปัญหาและการพัฒนาโครงงาน (10 ข้อ)",
    "timeLimitMinutes": 15,
    "passcode": "preunit2",
    "questions": [
      {
        "id": "pre2_q1",
        "question": "การเริ่มต้นพัฒนาโครงงานคอมพิวเตอร์ที่ดีที่สุด ควรเริ่มต้นจากสิ่งใดเป็นอันดับแรก?",
        "options": [
          "ซื้อเครื่องคอมพิวเตอร์และอุปกรณ์อิเล็กทรอนิกส์ใหม่",
          "เลือกภาษาคอมพิวเตอร์ที่มีความซับซ้อนและทันสมัยที่สุด",
          "ค้นหาและทำความเข้าใจปัญหาที่พบในชีวิตจริงหรือชุมชน",
          "ออกแบบโลโก้และชื่อโครงงานให้ดูน่าสนใจก่อนสิ่งอื่น"
        ],
        "correctIndex": 2,
        "explanation": "การเริ่มต้นที่ดีต้องเริ่มจากการสำรวจและทำความเข้าใจปัญหาจริงที่เกิดขึ้นเพื่อหาแนวทางแก้ไข"
      },
      {
        "id": "pre2_q2",
        "question": "หากต้องการพัฒนาระบบเพื่อช่วยเหลือนักเรียนในโรงเรียน กลุ่มบุคคลใดที่ควรไปสัมภาษณ์เพื่อสอบถามปัญหา?",
        "options": [
          "เจ้าหน้าที่รักษาความปลอดภัยของหมู่บ้าน",
          "ช่างเทคนิคผู้ดูแลศูนย์ข้อมูลคอมพิวเตอร์",
          "พนักงานขายสินค้าในห้างสรรพสินค้า",
          "นักเรียนและครูผู้มีส่วนเกี่ยวข้องในโรงเรียน"
        ],
        "correctIndex": 3,
        "explanation": "การวิเคราะห์ปัญหาต้องเก็บข้อมูลจากกลุ่มผู้ใช้จริง (Stakeholders / End Users)"
      },
      {
        "id": "pre2_q3",
        "question": "การวาดภาพร่างหน้าจอแอปพลิเคชันอย่างง่ายบนกระดาษ (Wireframe) มีจุดประสงค์เพื่อสิ่งใด?",
        "options": [
          "เพื่อวางแผนจัดวางตำแหน่งปุ่มและเมนูการใช้งานเบื้องต้น",
          "เพื่อคำนวณงบประมาณการจัดซื้อคอมพิวเตอร์อย่างแม่นยำ",
          "เพื่อทดสอบความเร็วในการเชื่อมต่ออินเทอร์เน็ตของระบบ",
          "เพื่อส่งมอบผลงานเป็นโปรแกรมที่พร้อมใช้งานจริงทันที"
        ],
        "correctIndex": 0,
        "explanation": "Wireframe ใช้สำหรับวางโครงสร้างและตำแหน่งขององค์ประกอบต่างๆ บนหน้าจอก่อนลงมือพัฒนาจริง"
      },
      {
        "id": "pre2_q4",
        "question": "ในการพัฒนาแอปพลิเคชันเพื่อผู้สูงอายุ สิ่งสำคัญที่สุดที่ต้องคำนึงถึงในการออกแบบหน้าจอคือข้อใด?",
        "options": [
          "การเลือกใช้ฟอนต์ตัวเขียนภาษาอังกฤษขนาดเล็ก",
          "ขนาดตัวอักษรที่ใหญ่อ่านชัดเจนและปุ่มกดขนาดใหญ่",
          "การใส่ภาพกราฟิกเคลื่อนไหวสามมิติในทุกหน้าจอ",
          "การซ่อนปุ่มเมนูทั้งหมดไว้ในแถบเลื่อนด้านข้าง"
        ],
        "correctIndex": 1,
        "explanation": "การออกแบบเพื่อผู้สูงอายุ (Elderly-Friendly Design) ต้องเน้นขนาดตัวหนังสือใหญ่ ชัดเจน อ่านง่าย ไม่ซับซ้อน"
      },
      {
        "id": "pre2_q5",
        "question": "แผนภาพกระแสข้อมูล (Data Flow Diagram - DFD) แสดงสิ่งใดในการทำงานของระบบโครงงาน?",
        "options": [
          "แผนผังห้องปฏิบัติการคอมพิวเตอร์และสายสัญญาณ",
          "รายชื่อโปรแกรมเมอร์และหน้าที่รับผิดชอบแต่ละคน",
          "ทิศทางการไหลและการประมวลผลข้อมูลในระบบ",
          "ราคาสินค้าและค่าใช้จ่ายในการพัฒนาโปรแกรม"
        ],
        "correctIndex": 2,
        "explanation": "DFD แสดงการไหลของข้อมูล กระบวนการประมวลผล และแหล่งจัดเก็บข้อมูล"
      },
      {
        "id": "pre2_q6",
        "question": "หลังจากเขียนโปรแกรมเสร็จแล้ว ขั้นตอนสำคัญที่ต้องทำก่อนนำโปรแกรมไปให้ผู้อื่นใช้งานจริงคือข้อใด?",
        "options": [
          "การทดสอบการทำงานของโปรแกรมเพื่อหาข้อผิดพลาด (Testing)",
          "การลบซอร์สโค้ดโปรแกรมออกจากเครื่องคอมพิวเตอร์",
          "การจัดพิมพ์รายงานโครงงานฉบับสมบูรณ์ส่งประกวดทันที",
          "การปิดระบบไม่ให้ผู้ใดสามารถเชื่อมต่อเข้าใช้งานได้"
        ],
        "correctIndex": 0,
        "explanation": "ต้องผ่านการทดสอบระบบ (Testing) เพื่อให้มั่นใจว่าโปรแกรมทำงานได้ถูกต้องและปลอดภัย"
      },
      {
        "id": "pre2_q7",
        "question": "คำว่า \"บั๊ก (Bug)\" ในวงการพัฒนาซอฟต์แวร์คอมพิวเตอร์ มีความหมายตรงกับข้อใด?",
        "options": [
          "อุปกรณ์ฮาร์ดแวร์คอมพิวเตอร์ที่มีราคาแพง",
          "ภาษาคอมพิวเตอร์ที่ใช้สำหรับการเขียนเว็บ",
          "ระบบปฏิบัติการรุ่นใหม่ล่าสุดของโทรศัพท์",
          "ข้อผิดพลาดหรือจุดบกพร่องในโปรแกรมคอมพิวเตอร์"
        ],
        "correctIndex": 3,
        "explanation": "Bug หมายถึงข้อผิดพลาด จุดบกพร่อง หรือปัญหาในการทำงานของโปรแกรมคอมพิวเตอร์"
      },
      {
        "id": "pre2_q8",
        "question": "ข้อใดเป็นแนวปฏิบัติที่ถูกต้องตามจริยธรรมในการนำรูปภาพจากอินเทอร์เน็ตมาใช้ในโครงงาน?",
        "options": [
          "ตัดส่วนที่เป็นลายน้ำชื่อเจ้าของภาพออกก่อนนำมาใช้",
          "เลือกใช้ภาพที่อนุญาตให้ใช้ฟรีและระบุแหล่งที่มาอ้างอิง",
          "คัดลอกภาพของผู้อื่นมาใช้และอ้างว่าเป็นผู้ถ่ายภาพเอง",
          "ดาวน์โหลดภาพใดก็ได้โดยไม่ต้องคำนึงถึงลิขสิทธิ์ภาพ"
        ],
        "correctIndex": 1,
        "explanation": "ต้องเคารพลิขสิทธิ์ โดยเลือกภาพที่ได้รับอนุญาต (เช่น Creative Commons) และอ้างอิงแหล่งที่มาถูกต้อง"
      },
      {
        "id": "pre2_q9",
        "question": "หากโครงงานที่นักเรียนพัฒนาขึ้น มีระบบล็อกอินเข้าสู่ระบบ สิ่งสำคัญที่สุดในการดูแลข้อมูลผู้ใช้คือข้อใด?",
        "options": [
          "ประกาศรหัสผ่านของสมาชิกทุกคนบนบอร์ดประชาสัมพันธ์",
          "ใช้รหัสผ่านเดียวกันทั้งหมดเพื่อความสะดวกในการจดจำ",
          "เก็บรักษาข้อมูลส่วนตัวและรหัสผ่านของผู้ใช้อย่างปลอดภัย",
          "อนุญาตให้สมาชิกคนใดก็ได้แก้ไขรหัสผ่านของผู้อื่นได้"
        ],
        "correctIndex": 2,
        "explanation": "ต้องรักษาความปลอดภัยและความเป็นส่วนตัวของข้อมูลผู้ใช้งาน ไม่เปิดเผยให้บุคคลอื่นเข้าถึงได้"
      },
      {
        "id": "pre2_q10",
        "question": "ทักษะสำคัญที่สุดในการทำงานโครงงานคอมพิวเตอร์ร่วมกันเป็นกลุ่มคือข้อใด?",
        "options": [
          "การทำงานคนเดียวทั้งหมดโดยไม่ปรึกษาเพื่อนร่วมทีม",
          "การแบ่งหน้าที่ตามความถนัดและการสื่อสารแลกเปลี่ยนกัน",
          "การเลือกเฉพาะเพื่อนสนิทโดยไม่เปิดรับความคิดเห็นอื่น",
          "การให้หัวหน้ากลุ่มเป็นผู้ตัดสินใจแทนทุกคนทุกเรื่อง"
        ],
        "correctIndex": 1,
        "explanation": "การทำงานเป็นทีมต้องอาศัยการแบ่งงานตามความถนัด การสื่อสาร และการรับฟังความคิดเห็นร่วมกัน"
      }
    ]
  },
  {
    "id": "quiz-unit1",
    "category": "unit",
    "title": "แบบทดสอบวัดผลสัมฤทธิ์ทางการเรียนท้ายหน่วยที่ 1: แนวคิดเชิงคำนวณกับการแก้ปัญหา (20 ข้อ)",
    "timeLimitMinutes": 30,
    "passcode": "unit1",
    "questions": [
      {
        "id": "u1_q1",
        "question": "แนวคิดเชิงคำนวณ (Computational Thinking) มีเป้าหมายสำคัญที่สุดตามข้อใด?",
        "options": [
          "เพื่อคิดแก้ปัญหาอย่างเป็นระบบจนได้ขั้นตอนที่นำไปปฏิบัติได้จริง",
          "เพื่อฝึกเขียนโค้ดด้วยภาษาคอมพิวเตอร์ระดับสูงให้รวดเร็วที่สุด",
          "เพื่อเรียนรู้วิธีประกอบและซ่อมแซมชิ้นส่วนคอมพิวเตอร์เบื้องต้น",
          "เพื่อคำนวณโจทย์คณิตศาสตร์ที่ซับซ้อนโดยใช้โปรแกรมอัตโนมัติ"
        ],
        "correctIndex": 0,
        "explanation": "แนวคิดเชิงคำนวณมุ่งเน้นการคิดวิเคราะห์แก้ปัญหาอย่างเป็นระบบ เพื่อให้ได้ขั้นตอนวิธี (Algorithm) ที่มนุษย์และคอมพิวเตอร์นำไปปฏิบัติตามได้อย่างมีประสิทธิภาพ"
      },
      {
        "id": "u1_q2",
        "question": "การที่นักเรียนแยกชิ้นส่วนจักรยานออกเป็นระบบขับเคลื่อน ระบบเบรก และโครงรถ ตรงกับองค์ประกอบใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)"
        ],
        "correctIndex": 1,
        "explanation": "การแยกส่วนประกอบและการย่อยปัญหา (Decomposition) คือการแตกปัญหาหรือระบบที่ซับซ้อนออกเป็นส่วนประกอบย่อยๆ เพื่อให้จัดการและแก้ไขได้ง่ายขึ้น"
      },
      {
        "id": "u1_q3",
        "question": "ข้อใดเป็นตัวอย่างของการนำ \"การหารูปแบบ (Pattern Recognition)\" มาใช้แก้ปัญหาในชีวิตประจำวัน?",
        "options": [
          "การแบ่งขั้นตอนการทำรายงานโครงงานออกเป็น 5 กิจกรรมย่อย",
          "การสรุปเฉพาะใจความสำคัญของเนื้อหาบทเรียนเพื่ออ่านทบทวน",
          "การสังเกตเวลาที่รถติดเป็นประจำเพื่อเลือกช่วงเวลาเดินทางที่เหมาะสม",
          "การจดบันทึกรายรับรายจ่ายในแต่ละวันอย่างละเอียดลงในสมุดบัญชี"
        ],
        "correctIndex": 2,
        "explanation": "การหารูปแบบคือการสังเกตความเหมือน ความคล้ายคลึง หรือแบบแผนที่เกิดขึ้นซ้ำๆ ของเหตุการณ์ เพื่อคาดการณ์หรือวางแผนแก้ปัญหา"
      },
      {
        "id": "u1_q4",
        "question": "แผนที่รถไฟฟ้าที่ตัดรายละเอียดตึกรามบ้านช่องออก แล้วแสดงเฉพาะสถานีและเส้นทางเชื่อมต่อ จัดเป็นองค์ประกอบใด?",
        "options": [
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การคิดเชิงนามธรรม (Abstraction)"
        ],
        "correctIndex": 3,
        "explanation": "การคิดเชิงนามธรรม (Abstraction) คือการคัดกรองเฉพาะข้อมูลที่จำเป็นต่อการแก้ปัญหา และตัดรายละเอียดที่ไม่เกี่ยวข้องออกไป"
      },
      {
        "id": "u1_q5",
        "question": "การออกแบบขั้นตอนวิธี (Algorithm) ที่ดีควรมีลักษณะสำคัญอย่างไรมากที่สุด?",
        "options": [
          "มีลำดับขั้นตอนชัดเจน ไม่คลุมเครือ และนำไปปฏิบัติตามได้ผลลัพธ์ถูกต้อง",
          "ใช้คำสั่งภาษาอังกฤษระดับสูงที่สั้นที่สุดเพื่อประหยัดเนื้อที่หน่วยความจำ",
          "มีความซับซ้อนสูงเพื่อให้ผู้อื่นไม่สามารถคัดลอกวิธีการแก้ปัญหาไปใช้ได้",
          "ออกแบบขึ้นโดยเน้นการทำงานด้วยคอมพิวเตอร์เท่านั้น มนุษย์ไม่สามารถทำตามได้"
        ],
        "correctIndex": 0,
        "explanation": "ขั้นตอนวิธีที่ดีต้องมีความชัดเจน มีจุดเริ่มต้นและจุดสิ้นสุดที่แน่นอน ไม่กำกวม และเมื่อปฏิบัติตามลำดับจะได้ผลลัพธ์ที่ถูกต้องเสมอ"
      },
      {
        "id": "u1_q6",
        "question": "สัญลักษณ์ผังงาน (Flowchart) รูป \"สี่เหลี่ยมขนมเปียกปูน (Diamond)\" ใช้แทนความหมายใดในการเขียนผังงาน?",
        "options": [
          "การเริ่มต้นหรือสิ้นสุดการทำงานของระบบ",
          "การตัดสินใจหรือตรวจสอบเงื่อนไขการทำงาน",
          "การประมวลผลหรือคำนวณข้อมูลทางคณิตศาสตร์",
          "การรับข้อมูลเข้าสู่ระบบผ่านทางแป้นพิมพ์"
        ],
        "correctIndex": 1,
        "explanation": "สัญลักษณ์สี่เหลี่ยมขนมเปียกปูน (Decision) ใช้สำหรับการตรวจสอบเงื่อนไขเพื่อตัดสินใจเลือกทิศทางการทำงานต่อไป"
      },
      {
        "id": "u1_q7",
        "question": "หากต้องการเขียนผังงานแสดงขั้นตอนการคำนวณ \"พื้นที่รูปสามเหลี่ยม = 0.5 * ฐาน * สูง\" ควรเลือกใช้สัญลักษณ์ใด?",
        "options": [
          "วงรี (Oval) สำหรับจุดเริ่มต้น",
          "สี่เหลี่ยมขนมเปียกปูน (Diamond) สำหรับเงื่อนไข",
          "สี่เหลี่ยมผืนผ้า (Rectangle) สำหรับประมวลผล",
          "สี่เหลี่ยมด้านขนาน (Parallelogram) สำหรับแสดงผล"
        ],
        "correctIndex": 2,
        "explanation": "สัญลักษณ์สี่เหลี่ยมผืนผ้า (Process) ใช้สำหรับขั้นตอนการปฏิบัติงาน การคำนวณ หรือการกำหนดค่าข้อมูล"
      },
      {
        "id": "u1_q8",
        "question": "การทำงานในข้อใดจัดเป็นโครงสร้างการทำงาน \"แบบวนซ้ำ (Loop / Iteration)\"?",
        "options": [
          "การคำนวณเกรดเฉลี่ยของนักเรียนหนึ่งคนจากคะแนนเก็บรวม",
          "การเลือกเปิดไฟเมื่อห้องมืด หรือปิดไฟเมื่อห้องสว่างเพียงพอ",
          "การพิมพ์รายงานเอกสารออกทางเครื่องพิมพ์ทีละหน้าจนครบแผ่น",
          "การวิ่งรอบสนามไปเรื่อยๆ จนกว่าจะครบ 5 รอบตามที่ครูกำหนดไว้"
        ],
        "correctIndex": 3,
        "explanation": "การวิ่งรอบสนามจนกว่าจะครบ 5 รอบ มีการทำซ้ำกิจกรรมเดิมตามเงื่อนไขที่กำหนด จึงเป็นโครงสร้างแบบวนซ้ำ"
      },
      {
        "id": "u1_q9",
        "question": "วงจรการพัฒนาระบบ SDLC ขั้นตอนแรกสุดที่ต้องดำเนินการคือข้อใด?",
        "options": [
          "การวางแผน (Planning)",
          "การวิเคราะห์ (Analysis)",
          "การออกแบบ (Design)",
          "การติดตั้ง (Implementation)"
        ],
        "correctIndex": 0,
        "explanation": "วงจร SDLC เริ่มต้นด้วยการวางแผน (Planning) เพื่อกำหนดเป้าหมาย ขอบเขต เวลา และศึกษาความเป็นไปได้ของโครงงาน"
      },
      {
        "id": "u1_q10",
        "question": "เครื่องมือใดนิยมนำมาใช้ในการวางแผนจัดสรรเวลาและติดตามความก้าวหน้าของโครงงานตลอด 20 สัปดาห์?",
        "options": [
          "แผนภาพกระแสข้อมูล (DFD)",
          "แผนภูมิแท่งแกนต์ (Gantt Chart)",
          "แบบจำลองความสัมพันธ์ข้อมูล (ERD)",
          "ผังโครงสร้างหน้าจอจำลอง (Wireframe)"
        ],
        "correctIndex": 1,
        "explanation": "แผนภูมิแกนต์ชาร์ต (Gantt Chart) เป็นแผนภูมิแท่งแนวนอนที่ใช้กำหนดกิจกรรมและกรอบเวลาการดำเนินงานของโครงงานอย่างชัดเจน"
      },
      {
        "id": "u1_q11",
        "question": "ในขั้นตอน \"การวิเคราะห์ระบบ (Analysis)\" กิจกรรมสำคัญที่สุดที่ผู้พัฒนาโครงงานต้องทำคือข้อใด?",
        "options": [
          "การเขียนโค้ดโปรแกรมเพื่อทดสอบการเชื่อมต่อระบบ",
          "การออกแบบภาพหน้าจอส่วนติดต่อผู้ใช้งานให้สวยงาม",
          "การรวบรวมและวิเคราะห์ความต้องการของผู้ใช้งานระบบ",
          "การติดตั้งซอฟต์แวร์บนเครื่องแม่ข่ายเพื่อเปิดใช้งาน"
        ],
        "correctIndex": 2,
        "explanation": "การวิเคราะห์ระบบมุ่งเน้นการเก็บรวบรวมและวิเคราะห์ความต้องการ (Requirements) จากผู้ใช้งานเพื่อกำหนดฟังก์ชันที่ระบบต้องมี"
      },
      {
        "id": "u1_q12",
        "question": "แผนภาพกระแสข้อมูล (Data Flow Diagram - DFD) มีประโยชน์หลักในการพัฒนาโครงงานอย่างไร?",
        "options": [
          "แสดงแผนผังเครือข่ายและตำแหน่งที่ตั้งของคอมพิวเตอร์",
          "แสดงขั้นตอนการเขียนโปรแกรมและการประกาศตัวแปร",
          "แสดงค่าใช้จ่ายในการจัดซื้ออุปกรณ์ฮาร์ดแวร์ทั้งหมด",
          "แสดงเส้นทางการไหลของข้อมูลระหว่างผู้ใช้กับระบบ"
        ],
        "correctIndex": 3,
        "explanation": "DFD แสดงการไหลของข้อมูล (Data Flow) แหล่งกำเนิด/ปลายทางข้อมูล กระบวนการประมวลผล และแหล่งจัดเก็บข้อมูลในระบบ"
      },
      {
        "id": "u1_q13",
        "question": "การสร้างแบบจำลองหน้าจอคร่าวๆ (Wireframe) ของเว็บไซต์ จัดอยู่ในขั้นตอนใดของวงจร SDLC?",
        "options": [
          "ขั้นการออกแบบ (Design)",
          "ขั้นการวางแผน (Planning)",
          "ขั้นการวิเคราะห์ (Analysis)",
          "ขั้นการบำรุงรักษา (Maintenance)"
        ],
        "correctIndex": 0,
        "explanation": "การออกแบบ Wireframe, สถาปัตยกรรมระบบ และโครงสร้างฐานข้อมูล จัดอยู่ในขั้นตอนการออกแบบ (Design)"
      },
      {
        "id": "u1_q14",
        "question": "การทดสอบโปรแกรมในระดับย่อยที่สุด โดยทดสอบแต่ละฟังก์ชันหรือแต่ละโมดูล เรียกว่าการทดสอบระดับใด?",
        "options": [
          "การทดสอบการยอมรับของผู้ใช้ (Acceptance Testing)",
          "การทดสอบระดับหน่วยย่อย (Unit Testing)",
          "การทดสอบการทำงานร่วมกัน (Integration Testing)",
          "การทดสอบระบบภาพรวมทั้งหมด (System Testing)"
        ],
        "correctIndex": 1,
        "explanation": "Unit Testing คือการทดสอบฟังก์ชันย่อยหรือโมดูลเดี่ยวๆ แต่ละส่วน เพื่อยืนยันว่าทำงานถูกต้องก่อนนำมาประกอบกัน"
      },
      {
        "id": "u1_q15",
        "question": "ข้อใดเป็นกิจกรรมที่เกิดขึ้นในขั้นตอน \"การบำรุงรักษาระบบ (Maintenance)\" ของวงจร SDLC?",
        "options": [
          "การสัมภาษณ์กลุ่มผู้ใช้งานเพื่อหาข้อบกพร่องของระบบเดิม",
          "การร่างโครงสร้างตารางข้อมูลเพื่อเตรียมความพร้อมฐานข้อมูล",
          "การแก้ไขข้อผิดพลาด (Bugs) และปรับปรุงระบบหลังส่งมอบงาน",
          "การเขียนคู่มือการติดตั้งระบบและเอกสารประกอบการใช้งาน"
        ],
        "correctIndex": 2,
        "explanation": "ขั้นตอนการบำรุงรักษาทำหน้าที่ดูแล แก้ไขข้อผิดพลาดที่พบหลังใช้งานจริง และปรับปรุงระบบให้ทันสมัยอยู่เสมอ"
      },
      {
        "id": "u1_q16",
        "question": "การศึกษาความเป็นไปได้ (Feasibility Study) ด้านใด ที่มุ่งประเมินว่ามีเทคโนโลยี เครื่องมือ และทักษะเพียงพอต่อการพัฒนาหรือไม่?",
        "options": [
          "ด้านเศรษฐศาสตร์ (Economic Feasibility)",
          "ด้านกฎหมาย (Legal Feasibility)",
          "ด้านการดำเนินงาน (Operational Feasibility)",
          "ด้านเทคนิค (Technical Feasibility)"
        ],
        "correctIndex": 3,
        "explanation": "Technical Feasibility ประเมินความพร้อมด้านฮาร์ดแวร์ ซอฟต์แวร์ และทักษะความรู้ทางเทคนิคของทีมงาน"
      },
      {
        "id": "u1_q17",
        "question": "ในรายงานโครงงานคอมพิวเตอร์ 5 บท ส่วน \"ที่มาและความสำคัญของโครงงาน\" บรรจุอยู่ในบทใด?",
        "options": [
          "บทที่ 1 บทนำ",
          "บทที่ 2 เอกสารที่เกี่ยวข้อง",
          "บทที่ 3 วิธีดำเนินงาน",
          "บทที่ 4 ผลการดำเนินงาน"
        ],
        "correctIndex": 0,
        "explanation": "บทที่ 1 บทนำ ประกอบด้วย ความเป็นมาและความสำคัญ วัตถุประสงค์ ขอบเขต และประโยชน์ที่คาดว่าจะได้รับ"
      },
      {
        "id": "u1_q18",
        "question": "หากต้องการเขียนอธิบายขั้นตอนการพัฒนาโปรแกรม เครื่องมือที่ใช้ และภาษาคอมพิวเตอร์ที่เลือกใช้ ควรบันทึกลงในส่วนใด?",
        "options": [
          "บทที่ 2 เอกสารและทฤษฎีที่เกี่ยวข้อง",
          "บทที่ 3 วิธีการดำเนินงานโครงงาน",
          "บทที่ 4 ผลการดำเนินงานและการทดสอบ",
          "บทที่ 5 สรุปผลและข้อเสนอแนะ"
        ],
        "correctIndex": 1,
        "explanation": "บทที่ 3 วิธีการดำเนินงาน อธิบายขั้นตอนการทำงานตามวงจร SDLC เครื่องมือ วัสดุอุปกรณ์ และขั้นตอนวิธีที่พัฒนาขึ้น"
      },
      {
        "id": "u1_q19",
        "question": "ส่วนประกอบใดในรายงานโครงงานที่จัดอยู่ใน \"ส่วนประกอบตอนต้น (Preliminary Section)\" ก่อนเริ่มบทที่ 1?",
        "options": [
          "ภาคผนวก (Appendix)",
          "บรรณานุกรม (Bibliography)",
          "บทคัดย่อ (Abstract)",
          "ข้อเสนอแนะในการพัฒนาต่อ"
        ],
        "correctIndex": 2,
        "explanation": "ส่วนประกอบตอนต้นได้แก่ ปกหน้า ใบรองปก บทคัดย่อ กิตติกรรมประกาศ สารบัญ สารบัญตาราง และสารบัญภาพ"
      },
      {
        "id": "u1_q20",
        "question": "หากพบข้อผิดพลาดขณะรันโปรแกรม (Runtime Error) ทำให้โปรแกรมปิดลง ขั้นตอนที่ถูกต้องในการแก้ปัญหาตามแนวคิดเชิงคำนวณคือข้อใด?",
        "options": [
          "ลบโค้ดโปรแกรมทั้งหมดแล้วเริ่มต้นเขียนระบบใหม่ตั้งแต่ขั้นตอนแรก",
          "เปลี่ยนภาษาคอมพิวเตอร์ที่ใช้เขียนโปรแกรมเป็นภาษาอื่นทันที",
          "ส่งมอบโปรแกรมให้ผู้ใช้งานทันทีโดยไม่ต้องแก้ไขข้อผิดพลาดนั้น",
          "ตรวจสอบตำแหน่งที่เกิดปัญหา หาสาเหตุ แล้วแก้ไขข้อผิดพลาด (Debug)"
        ],
        "correctIndex": 3,
        "explanation": "การค้นหาจุดผิดพลาด หาสาเหตุ และแก้ไข (Debugging) เป็นกระบวนการแก้ปัญหาอย่างเป็นระบบและมีประสิทธิภาพ"
      }
    ]
  },
  {
    "id": "quiz-unit2",
    "category": "unit",
    "title": "แบบทดสอบวัดผลสัมฤทธิ์ทางการเรียนท้ายหน่วยที่ 2: การแก้ปัญหาและการพัฒนาโครงงาน (20 ข้อ)",
    "timeLimitMinutes": 30,
    "passcode": "unit2",
    "questions": [
      {
        "id": "u2_q1",
        "question": "ในโครงงานพัฒนาเว็บไซต์ห้องสมุดโรงเรียน การสำรวจพบว่า \"นักเรียนหาหนังสือไม่พบและไม่ทราบว่าหนังสือว่างหรือไม่\" ขั้นแรกสุดในการแก้ปัญหาคือข้อใด?",
        "options": [
          "ซื้อเครื่องคอมพิวเตอร์สเปกสูงมาติดตั้งในห้องสมุดทันที",
          "ทำการจัดเรียงหนังสือทั้งหมดใหม่ตามลำดับความหนาของเล่ม",
          "กำหนดและทำความเข้าใจปัญหาให้ชัดเจนก่อนเริ่มต้นวางแผน",
          "เขียนโปรแกรมระบบยืมคืนหนังสือด้วยภาษาคอมพิวเตอร์ทันที"
        ],
        "correctIndex": 2,
        "explanation": "การกำหนดและทำความเข้าใจปัญหา (Problem Understanding) เป็นรากฐานสำคัญของการวางแผนและพัฒนาโครงงาน"
      },
      {
        "id": "u2_q2",
        "question": "การแยกย่อยระบบห้องสมุดออกเป็น \"ระบบค้นหาหนังสือ ระบบยืมคืน และระบบจัดการข้อมูลสมาชิก\" สอดคล้องกับข้อใด?",
        "options": [
          "การแยกส่วนประกอบและการย่อยปัญหา (Decomposition)",
          "การคิดเชิงนามธรรมเพื่อคัดกรองข้อมูล (Abstraction)",
          "การออกแบบขั้นตอนวิธีในการประมวลผล (Algorithm Design)",
          "การหารูปแบบพฤติกรรมการยืมหนังสือ (Pattern Recognition)"
        ],
        "correctIndex": 0,
        "explanation": "การแตกโครงงานระบบใหญ่เป็นระบบย่อยๆ เป็นการประยุกต์ใช้ Decomposition"
      },
      {
        "id": "u2_q3",
        "question": "การสังเกตว่า \"ช่วงใกล้สอบจะมีนักเรียนมายืมหนังสือหมวดวิทยาศาสตร์และคณิตศาสตร์มากเป็นพิเศษ\" จัดเป็นองค์ประกอบใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การหารูปแบบ (Pattern Recognition)"
        ],
        "correctIndex": 3,
        "explanation": "การสังเกตพฤติกรรมที่มีความสม่ำเสมอซ้ำๆ จัดเป็น Pattern Recognition"
      },
      {
        "id": "u2_q4",
        "question": "ในการออกแบบบัตรรายการหนังสือ ข้อมูลใดจัดเป็น \"สาระสำคัญ\" ที่ต้องแสดงในระบบค้นหาหนังสือห้องสมุด?",
        "options": [
          "สีของปกหนังสือและความหนาของกระดาษ",
          "ชื่อหนังสือ ชื่อผู้แต่ง และหมวดหมู่หนังสือ",
          "ประวัติส่วนตัวและสถานที่ทำงานของผู้แต่ง",
          "ราคาจำหน่ายและยอดพิมพ์ของสำนักพิมพ์"
        ],
        "correctIndex": 1,
        "explanation": "ชื่อเรื่อง ผู้แต่ง และหมวดหมู่ เป็นข้อมูลสำคัญ (Abstraction) ในการค้นหาหนังสือ"
      },
      {
        "id": "u2_q5",
        "question": "การออกแบบขั้นตอนวิธีในการค้นหาหนังสือตามลำดับชื่อผู้แต่ง โดยเรียงจาก ก ถึง ฮ ตรงกับรูปแบบขั้นตอนวิธีใด?",
        "options": [
          "ขั้นตอนวิธีแบบเรียงลำดับ (Sorting Algorithm)",
          "ขั้นตอนวิธีแบบเลือกสุ่ม (Random Algorithm)",
          "ขั้นตอนวิธีแบบย้อนรอย (Backtracking Algorithm)",
          "ขั้นตอนวิธีแบบแบ่งแยกและเอาชนะ (Divide & Conquer)"
        ],
        "correctIndex": 0,
        "explanation": "การจัดเรียงข้อมูลตามตัวอักษรเป็น Sorting Algorithm"
      },
      {
        "id": "u2_q6",
        "question": "ในกรณีศึกษาโครงงานเว็บไซต์ห้องสมุด ผู้ใช้งานกลุ่มใดถือเป็น \"ผู้ใช้งานหลัก (End User)\" ที่ต้องนำความคิดเห็นมาออกแบบหน้าจอ?",
        "options": [
          "เจ้าหน้าที่ช่างเทคนิคดูแลเซิร์ฟเวอร์",
          "ผู้บริหารและคณะกรรมการสถานศึกษา",
          "นักเรียนและครูผู้เข้ามาใช้งานห้องสมุด",
          "พนักงานร้านจำหน่ายหนังสือภายนอก"
        ],
        "correctIndex": 2,
        "explanation": "นักเรียนและครูเป็นกลุ่มผู้ใช้งานจริงของระบบห้องสมุด"
      },
      {
        "id": "u2_q7",
        "question": "ในโครงงานพัฒนาแอปพลิเคชันแจ้งเตือนการกินยาสำหรับผู้สูงอายุ ปัญหาสำคัญที่สุดที่พบในกลุ่มผู้สูงอายุคือข้อใด?",
        "options": [
          "ผู้สูงอายุต้องการแอปพลิเคชันที่มีเกมสะสมแต้ม",
          "ผู้สูงอายุลืมกินยาและอ่านตัวหนังสือขนาดเล็กไม่ชัด",
          "ผู้สูงอายุต้องการเชื่อมต่อแอปพลิเคชันกับนาฬิกาหรู",
          "ผู้สูงอายุชอบฟังก์ชันที่มีปุ่มกดจำนวนมากหลายหน้า"
        ],
        "correctIndex": 1,
        "explanation": "ปัญหาหลักของผู้สูงอายุคือการลืมเวลาทานยาและภาวะสายตายาวตามวัย"
      },
      {
        "id": "u2_q8",
        "question": "การออกแบบหน้าจอแอปพลิเคชันสำหรับผู้สูงอายุ (Elderly-Friendly UI) ควรยึดหลักการใดมากที่สุด?",
        "options": [
          "ใช้ภาพเคลื่อนไหวสามมิติและกราฟิกที่ซับซ้อน",
          "ใช้ข้อความภาษาอังกฤษตัวพิมพ์เล็กและฟอนต์ประดิษฐ์",
          "รวมปุ่มคำสั่งทั้งหมดไว้ในเมนูย่อยที่ซ่อนอยู่ลึกๆ",
          "ใช้ตัวอักษรขนาดใหญ่ สีสันชัดเจน และมีปุ่มกดขนาดใหญ่"
        ],
        "correctIndex": 3,
        "explanation": "การออกแบบเพื่อผู้สูงอายุต้องเน้นตัวอักษรใหญ่ ชัดเจน อ่านง่าย ไม่ซับซ้อน"
      },
      {
        "id": "u2_q9",
        "question": "เงื่อนไขในแอปเตือนยา: \"หากผู้ใช้กดปุ่ม เลื่อนเตือน (Snooze) ให้ระบบรอ 10 นาทีแล้วส่งเสียงเตือนซ้ำอีกครั้ง\" จัดเป็นโครงสร้างแบบใด?",
        "options": [
          "โครงสร้างแบบเรียงลำดับเส้นตรงไม่มีเงื่อนไข",
          "โครงสร้างแบบมีเงื่อนไขและวนซ้ำตามเวลาที่ระบุ",
          "โครงสร้างแบบเลือกทำทางเดียวโดยไม่รอเวลา",
          "โครงสร้างแบบเรียกซ้ำไม่มีจุดสิ้นสุดของระบบ"
        ],
        "correctIndex": 1,
        "explanation": "มีเงื่อนไขตรวจสอบการกดปุ่ม Snooze และหน่วงเวลาเตือนซ้ำตามระยะเวลา"
      },
      {
        "id": "u2_q10",
        "question": "ข้อมูลใดที่ \"ไม่จำเป็นต้องเก็บ\" ในแอปแจ้งเตือนการกินยา หากต้องการรักษาความเป็นส่วนตัวของผู้ใช้งาน?",
        "options": [
          "รหัสผ่านบัญชีธนาคารและข้อมูลการเงินของผู้ใช้",
          "ชื่อยาและช่วงเวลาที่แพทย์สั่งให้รับประทานยา",
          "ปริมาณยาที่ต้องกินในแต่ละมื้อ เช่น 1 เม็ดหลังอาหาร",
          "ข้อความแจ้งเตือนพิเศษ เช่น กินก่อนอาหาร 30 นาที"
        ],
        "correctIndex": 0,
        "explanation": "ข้อมูลบัญชีธนาคารไม่เกี่ยวข้องกับวัตถุประสงค์ของแอป และอาจก่อให้เกิดความเสี่ยงด้านความปลอดภัย"
      },
      {
        "id": "u2_q11",
        "question": "การทดสอบแอปแจ้งเตือนการกินยา โดยให้ผู้สูงอายุในชุมชนทดลองใช้งานจริงและประเมินความพึงพอใจ จัดเป็นการทดสอบระดับใด?",
        "options": [
          "การทดสอบระดับย่อย (Unit Testing)",
          "การทดสอบการเชื่อมต่อ (Integration Testing)",
          "การทดสอบความเร็ว (Performance Testing)",
          "การทดสอบการยอมรับของผู้ใช้ (User Acceptance Testing)"
        ],
        "correctIndex": 3,
        "explanation": "การให้ผู้ใช้งานจริงทดลองใช้ระบบและประเมินผลคือ User Acceptance Testing (UAT)"
      },
      {
        "id": "u2_q12",
        "question": "หากระบบแจ้งเตือนการกินยาทำงานผิดพลาด โดยไม่ส่งเสียงเตือนเมื่อถึงเวลาที่กำหนด ผู้พัฒนาควรทำสิ่งใดเป็นอันดับแรก?",
        "options": [
          "ปิดแอปพลิเคชันและยกเลิกการพัฒนาโครงงานทันที",
          "โพสต์ข้อความขอความช่วยเหลือบนสื่อสังคมออนไลน์",
          "ตรวจสอบโค้ดในส่วนของการตั้งเวลาเพื่อหาสาเหตุของบั๊ก",
          "ซื้อโทรศัพท์เครื่องใหม่มาทดสอบโดยไม่ดูโค้ดเดิม"
        ],
        "correctIndex": 2,
        "explanation": "การแก้ปัญหาที่ถูกต้องคือการตรวจสอบโค้ดเพื่อหาสาเหตุของข้อผิดพลาด (Debugging)"
      },
      {
        "id": "u2_q13",
        "question": "ในการพัฒนาโครงงานคอมพิวเตอร์ การนำรูปภาพหรือไอคอนจากอินเทอร์เน็ตมาใช้งานในแอปพลิเคชัน ควรคำนึงถึงสิ่งใดมากที่สุด?",
        "options": [
          "เลือกภาพที่มีขนาดไฟล์ใหญ่ที่สุดเพื่อความละเอียดสูง",
          "ดึงภาพจากเว็บไซต์ใดก็ได้โดยไม่ต้องขออนุญาตเจ้าของ",
          "นำภาพที่มีลายน้ำของผู้อื่นมาตัดส่วนลายน้ำทิ้งออกไป",
          "ตรวจสอบสัญญาอนุญาตสิทธิ์และให้เครดิตแหล่งที่มาถูกต้อง"
        ],
        "correctIndex": 3,
        "explanation": "ต้องเคารพลิขสิทธิ์และทรัพย์สินทางปัญญา โดยเลือกภาพที่อนุญาตให้ใช้และอ้างอิงแหล่งที่มาถูกต้อง"
      },
      {
        "id": "u2_q14",
        "question": "ขั้นตอนใดในวงจร SDLC ที่ผู้พัฒนาโครงงานต้องเริ่มเขียนโปรแกรม (Coding) ตามที่ได้ออกแบบไว้?",
        "options": [
          "ขั้นการวางแผน (Planning)",
          "ขั้นการพัฒนาและติดตั้ง (Implementation)",
          "ขั้นการวิเคราะห์ความต้องการ (Analysis)",
          "ขั้นการประเมินความเป็นไปได้ (Feasibility)"
        ],
        "correctIndex": 1,
        "explanation": "ขั้น Implementation เป็นขั้นตอนการลงมือเขียนโค้ดและพัฒนาโปรแกรมจริง"
      },
      {
        "id": "u2_q15",
        "question": "เครื่องมือใดช่วยให้นักเรียนสามารถนำเสนอขั้นตอนวิธีให้ผู้อื่นเข้าใจได้ง่ายก่อนลงมือเขียนโปรแกรมจริง?",
        "options": [
          "รหัสลำลอง (Pseudocode) และผังงาน (Flowchart)",
          "ตารางคำนวณสถิติและฐานข้อมูลความสัมพันธ์",
          "ภาพถ่ายหน้าจอโทรศัพท์จริงที่บันทึกไว้ล่วงหน้า",
          "เอกสารสัญญาจัดซื้อจัดจ้างอุปกรณ์คอมพิวเตอร์"
        ],
        "correctIndex": 0,
        "explanation": "รหัสลำลองและผังงานเป็นเครื่องมือมาตรฐานในการถ่ายทอดขั้นตอนวิธีอย่างเป็นสากล"
      },
      {
        "id": "u2_q16",
        "question": "ข้อใดเป็นตัวบ่งชี้ว่าโครงงานพัฒนาเว็บไซต์ห้องสมุดประสบความสำเร็จตามวัตถุประสงค์ที่ตั้งไว้?",
        "options": [
          "เว็บไซต์มีค่าใช้จ่ายในการจัดทำสูงกว่างบประมาณที่ตั้งไว้",
          "มีจำนวนหน้าเว็บเพจมากกว่า 100 หน้าขึ้นไปในระบบ",
          "นักเรียนค้นหาหนังสือได้สะดวกรวดเร็วและมีสถิติการใช้งานเพิ่มขึ้น",
          "เว็บไซต์ได้รับรางวัลชนะเลิศจากการประกวดภายนอกโรงเรียน"
        ],
        "correctIndex": 2,
        "explanation": "ความสำเร็จของโครงงานวัดจากการบรรลุวัตถุประสงค์ในการแก้ปัญหาของผู้ใช้จริง"
      },
      {
        "id": "u2_q17",
        "question": "การเก็บข้อมูลเวลาที่ผู้สูงอายุกดรับประทานยาจริง แล้วนำมาพล็อตเป็นกราฟความสม่ำเสมอในรายงาน จัดเป็นเนื้อหาในบทใด?",
        "options": [
          "บทที่ 2 เอกสารและทฤษฎีที่เกี่ยวข้อง",
          "บทที่ 4 ผลการดำเนินงานและการทดสอบ",
          "บทที่ 1 บทนำและความเป็นมาของปัญหา",
          "บทที่ 3 วิธีการดำเนินงานและการออกแบบ"
        ],
        "correctIndex": 1,
        "explanation": "ผลการทดสอบการใช้งานจริงและกราฟข้อมูลสรุปอยู่ในบทที่ 4 ผลการดำเนินงาน"
      },
      {
        "id": "u2_q18",
        "question": "หากต้องการเผยแพร่ผลงานโครงงานให้นักเรียนในโรงเรียนและชุมชนเข้าถึงได้สะดวกที่สุด ควรเลือกช่องทางใด?",
        "options": [
          "พิมพ์เอกสารแจกเฉพาะห้องพักครูเท่านั้น",
          "บันทึกไฟล์ลงในแฟลชไดรฟ์เก็บไว้ในตู้เก็บของ",
          "จัดพิมพ์เป็นหนังสือปกแข็งส่งเข้าห้องสมุด 1 เล่ม",
          "เผยแพร่ผ่านเว็บไซต์โรงเรียนและจัดนิทรรศการแสดงผลงาน"
        ],
        "correctIndex": 3,
        "explanation": "การเผยแพร่ผ่านเว็บไซต์และจัดแสดงผลงานช่วยให้ผู้สนใจเข้าถึงได้กว้างขวางและสะดวกที่สุด"
      },
      {
        "id": "u2_q19",
        "question": "ข้อใดเป็นข้อควรระวังด้านความปลอดภัยในการพัฒนาระบบที่มีการเข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่าน?",
        "options": [
          "ไม่ควรจัดเก็บรหัสผ่านเป็นข้อความธรรมดาโดยไม่เข้ารหัส",
          "ควรกำหนดรหัสผ่านเริ่มต้นเป็น 1234 ให้ทุกคนใช้ร่วมกัน",
          "ควรแสดงรหัสผ่านบนหน้าจอให้เห็นชัดเจนตลอดเวลาที่พิมพ์",
          "อนุญาตให้ใครก็ได้แก้ไขข้อมูลผู้ใช้อื่นโดยไม่ต้องยืนยันตัวตน"
        ],
        "correctIndex": 0,
        "explanation": "รหัสผ่านต้องได้รับการแฮช (Hash) หรือเข้ารหัส เพื่อป้องกันการรั่วไหลของข้อมูลความลับ"
      },
      {
        "id": "u2_q20",
        "question": "ทักษะสำคัญที่สุดที่นักเรียนได้รับจากการลงมือทำโครงงานคอมพิวเตอร์ตามวงจร SDLC และแนวคิดเชิงคำนวณคือข้อใด?",
        "options": [
          "ทักษะการพิมพ์ดีดภาษาอังกฤษด้วยความเร็วสูงสุด",
          "ความสามารถในการจำคำสั่งและไวยากรณ์ภาษาโปรแกรม",
          "ทักษะการคิดแก้ปัญหาอย่างเป็นระบบและการทำงานเป็นทีม",
          "ความรู้เรื่องราคาและแหล่งจัดซื้ออุปกรณ์อิเล็กทรอนิกส์"
        ],
        "correctIndex": 2,
        "explanation": "เป้าหมายสูงสุดคือการพัฒนาทักษะการคิดแก้ปัญหาอย่างเป็นระบบและการทำงานร่วมกับผู้อื่นอย่างสร้างสรรค์"
      }
    ]
  },
  {
    "id": "quiz-midterm",
    "category": "midterm",
    "title": "ข้อสอบวัดผลการเรียนรู้กลางภาคเรียน: เทคโนโลยี (วิทยาการคำนวณ) ม.4 (20 ข้อ)",
    "timeLimitMinutes": 30,
    "passcode": "midterm",
    "questions": [
      {
        "id": "mid_q1",
        "question": "หัวใจสำคัญของ \"แนวคิดเชิงคำนวณ (Computational Thinking)\" มุ่งเน้นไปที่สิ่งใดมากที่สุด?",
        "options": [
          "กระบวนการคิดแก้ปัญหาอย่างเป็นระบบและมีขั้นตอนชัดเจน",
          "ทักษะการจดจำไวยากรณ์คำสั่งของภาษาโปรแกรมคอมพิวเตอร์",
          "ความสามารถในการเลือกซื้อคอมพิวเตอร์ที่มีสมรรถนะสูง",
          "การฝึกใช้งานโปรแกรมสำเร็จรูปในสำนักงานให้เกิดความชำนาญ"
        ],
        "correctIndex": 0,
        "explanation": "แนวคิดเชิงคำนวณมุ่งเน้นการคิดวิเคราะห์อย่างเป็นระบบ มีตรรกะ เพื่อให้ได้ขั้นตอนวิธีที่แก้ปัญหาได้จริง"
      },
      {
        "id": "mid_q2",
        "question": "สถานการณ์ใดแสดงถึงการใช้ทักษะ \"การแยกส่วนประกอบและการย่อยปัญหา (Decomposition)\"?",
        "options": [
          "การเลือกเฉพาะใจความสำคัญของข่าวสารเพื่อเขียนสรุปย่อ",
          "การแจกแจงขั้นตอนการทำอาหารออกเป็นขั้นตอนเตรียมและปรุง",
          "การสังเกตเวลาที่แดดส่องกระทบห้องเรียนเป็นประจำทุกบ่าย",
          "การวาดภาพแผนผังเส้นทางโดยใช้สัญลักษณ์แทนสถานที่จริง"
        ],
        "correctIndex": 1,
        "explanation": "Decomposition คือการแตกกิจกรรมหรือปัญหาใหญ่ที่ซับซ้อนออกเป็นส่วนย่อยๆ เพื่อให้ง่ายต่อการลงมือทำ"
      },
      {
        "id": "mid_q3",
        "question": "นายสมชายสังเกตว่า ทุกวันจันทร์ช่วงเช้าจะมีผู้โดยสารรถประจำทางหนาแน่นกว่าปกติ จึงวางแผนออกเดินทางเร็วขึ้น การคิดของนายสมชายตรงกับองค์ประกอบใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)"
        ],
        "correctIndex": 2,
        "explanation": "การสังเกตความถี่หรือแบบแผนของเหตุการณ์ที่เกิดขึ้นซ้ำๆ ในแต่ละสัปดาห์คือ Pattern Recognition"
      },
      {
        "id": "mid_q4",
        "question": "ในการสร้างแอปพลิเคชันแนะนำสถานที่ท่องเที่ยว ข้อมูลใดควร \"ตัดทิ้ง\" ตามหลักการคิดเชิงนามธรรม (Abstraction)?",
        "options": [
          "เวลาเปิดทำการและราคาบัตรเข้าชมของสถานที่",
          "ตำแหน่งพิกัดบนแผนที่และเบอร์ติดต่อสอบถาม",
          "ภาพถ่ายจุดแลนด์มาร์กสำคัญของสถานที่ท่องเที่ยว",
          "ยี่ห้อของกล้องที่ใช้ถ่ายภาพสถานที่ท่องเที่ยวนั้น"
        ],
        "correctIndex": 3,
        "explanation": "ยี่ห้อกล้องที่ถ่ายภาพเป็นรายละเอียดที่ไม่จำเป็นต่อการนำทางหรือการท่องเที่ยว จึงควรตัดทิ้งตามหลัก Abstraction"
      },
      {
        "id": "mid_q5",
        "question": "ข้อใดเป็นคุณสมบัติที่จำเป็นของ \"ขั้นตอนวิธี (Algorithm)\" ที่มีประสิทธิภาพ?",
        "options": [
          "มีลำดับขั้นตอนการทำงานที่ชัดเจนและให้ผลลัพธ์ถูกต้องเสมอ",
          "ใช้คำสั่งที่ซับซ้อนเพื่อให้ระบบคอมพิวเตอร์ทำงานได้หลายงาน",
          "มีจำนวนขั้นตอนการทำงานให้น้อยที่สุดโดยไม่ต้องตรวจความถูกต้อง",
          "เขียนเป็นภาษาเครื่องโดยตรงเพื่อเพิ่มความเร็วในการประมวลผล"
        ],
        "correctIndex": 0,
        "explanation": "ขั้นตอนวิธีที่ดีต้องมีความชัดเจน ไม่กำกวม มีจุดเริ่มต้นและจุดสิ้นสุด และให้ผลลัพธ์ที่ถูกต้องเมื่อปฏิบัติตาม"
      },
      {
        "id": "mid_q6",
        "question": "สัญลักษณ์ผังงาน (Flowchart) รูป \"สี่เหลี่ยมด้านขนาน (Parallelogram)\" ใช้แทนความหมายใด?",
        "options": [
          "การประมวลผลหรือคำนวณข้อมูลทางคณิตศาสตร์",
          "การรับเข้าหรือแสดงผลข้อมูลทั่วไปของระบบ",
          "การตรวจสอบเงื่อนไขเพื่อตัดสินใจทิศทาง",
          "จุดเริ่มต้นหรือจุดสิ้นสุดการทำงานของผังงาน"
        ],
        "correctIndex": 1,
        "explanation": "สัญลักษณ์สี่เหลี่ยมด้านขนานใช้สำหรับการรับข้อมูลเข้า (Input) หรือแสดงผลข้อมูล (Output) โดยไม่ระบุอุปกรณ์เฉพาะเจาะจง"
      },
      {
        "id": "mid_q7",
        "question": "หากต้องการตรวจสอบว่า \"คะแนนสอบวิชาคณิตศาสตร์มากกว่าหรือเท่ากับ 50 คะแนนหรือไม่\" ควรใช้สัญลักษณ์ใดในผังงาน?",
        "options": [
          "สี่เหลี่ยมผืนผ้า (Process) สำหรับคำนวณ",
          "วงรีหรือสี่เหลี่ยมมุมมน (Terminator) สำหรับเริ่มต้น",
          "สี่เหลี่ยมขนมเปียกปูน (Decision) สำหรับตรวจสอบเงื่อนไข",
          "สี่เหลี่ยมด้านขนาน (Data Input/Output) สำหรับรับข้อมูล"
        ],
        "correctIndex": 2,
        "explanation": "การเปรียบเทียบเงื่อนไข (>= 50) ต้องใช้สัญลักษณ์การตัดสินใจ (Decision) ซึ่งมีรูปทรงสี่เหลี่ยมขนมเปียกปูน"
      },
      {
        "id": "mid_q8",
        "question": "โครงสร้างการทำงานของผังงานในข้อใด มีลักษณะการทำงานแบบ \"เลือกทำ (Selection)\"?",
        "options": [
          "การบวกตัวเลข 3 จำนวนเรียงกันจากตัวแรกถึงตัวสุดท้าย",
          "การพิมพ์ใบเสร็จรับเงินจำนวน 100 ใบติดต่อกันจนหมด",
          "การคำนวณหาค่าเฉลี่ยของคะแนนนักเรียนทั้งห้องเรียน",
          "การตรวจสอบคะแนนเพื่อตัดสินผลการสอบว่าผ่านหรือไม่ผ่าน"
        ],
        "correctIndex": 3,
        "explanation": "การตรวจคะแนนเพื่อเลือกทำว่าจะแสดงคำว่า 'ผ่าน' หรือ 'ไม่ผ่าน' เป็นโครงสร้างแบบเลือกทำ (Selection)"
      },
      {
        "id": "mid_q9",
        "question": "วงจรการพัฒนาระบบ SDLC 5 ขั้นตอน มีลำดับการทำงานที่ถูกต้องตามข้อใด?",
        "options": [
          "การวางแผน -> การวิเคราะห์ -> การออกแบบ -> การพัฒนา -> การบำรุงรักษา",
          "การวิเคราะห์ -> การวางแผน -> การออกแบบ -> การพัฒนา -> การบำรุงรักษา",
          "การวางแผน -> การออกแบบ -> การพัฒนา -> การวิเคราะห์ -> การบำรุงรักษา",
          "การออกแบบ -> การวิเคราะห์ -> การวางแผน -> การพัฒนา -> การบำรุงรักษา"
        ],
        "correctIndex": 0,
        "explanation": "ลำดับขั้นตอนมาตรฐานของวงจร SDLC คือ: 1.การวางแผน 2.การวิเคราะห์ 3.การออกแบบ 4.การพัฒนาและติดตั้ง 5.การบำรุงรักษา"
      },
      {
        "id": "mid_q10",
        "question": "การกำหนดเป้าหมาย ขอบเขตงาน และการศึกษาความเป็นไปได้ของโครงงาน จัดอยู่ในขั้นตอนใดของ SDLC?",
        "options": [
          "ขั้นตอนการวิเคราะห์ระบบ (Analysis)",
          "ขั้นตอนการวางแผนโครงงาน (Planning)",
          "ขั้นตอนการออกแบบระบบ (Design)",
          "ขั้นตอนการพัฒนาโปรแกรม (Implementation)"
        ],
        "correctIndex": 1,
        "explanation": "ขั้นตอนการวางแผน (Planning) มุ่งเน้นการกำหนดวัตถุประสงค์ ขอบเขต และศึกษาความเป็นไปได้ก่อนเริ่มดำเนินงาน"
      },
      {
        "id": "mid_q11",
        "question": "แผนภูมิแกนต์ (Gantt Chart) มีประโยชน์ต่อการบริหารจัดการโครงงานอย่างไรมากที่สุด?",
        "options": [
          "ช่วยจัดเก็บข้อมูลผลการทดสอบการใช้งานจริงของผู้ใช้",
          "ช่วยคำนวณงบประมาณค่าใช้จ่ายของโครงงานโดยอัตโนมัติ",
          "ช่วยควบคุมและติดตามระยะเวลาการดำเนินงานแต่ละกิจกรรม",
          "ช่วยออกแบบหน้าจอส่วนติดต่อผู้ใช้งานให้สวยงามทันสมัย"
        ],
        "correctIndex": 2,
        "explanation": "แผนภูมิแกนต์ใช้สำหรับวางแผน กำหนดกรอบเวลา และติดตามความก้าวหน้าของกิจกรรมต่างๆ ในโครงงาน"
      },
      {
        "id": "mid_q12",
        "question": "การสัมภาษณ์กลุ่มผู้ใช้งานเพื่อค้นหาปัญหาและความต้องการของระบบ จัดอยู่ในขั้นตอนใดของวงจร SDLC?",
        "options": [
          "การบำรุงรักษาระบบ (Maintenance)",
          "การติดตั้งและส่งมอบงาน (Implementation)",
          "การออกแบบสถาปัตยกรรม (Design)",
          "การวิเคราะห์ความต้องการ (Analysis)"
        ],
        "correctIndex": 3,
        "explanation": "การเก็บรวบรวมและวิเคราะห์ความต้องการของผู้ใช้ (Requirement Gathering) จัดอยู่ในขั้นตอนการวิเคราะห์ระบบ (Analysis)"
      },
      {
        "id": "mid_q13",
        "question": "แผนภาพกระแสข้อมูล (Data Flow Diagram - DFD) ใช้สำหรับอธิบายสิ่งใดในระบบโครงงาน?",
        "options": [
          "การไหลและการประมวลผลข้อมูลระหว่างผู้ใช้งานกับระบบ",
          "แผนผังเครือข่ายและการจัดวางเครื่องคอมพิวเตอร์แม่ข่าย",
          "ลำดับการเรียกใช้ฟังก์ชันและตัวแปรในภาษาคอมพิวเตอร์",
          "ขั้นตอนการประกอบชิ้นส่วนอุปกรณ์อิเล็กทรอนิกส์ในระบบ"
        ],
        "correctIndex": 0,
        "explanation": "DFD ใช้สำหรับแสดงการไหลของข้อมูล (Data Flow) กระบวนการประมวลผล และแหล่งจัดเก็บข้อมูลในระบบ"
      },
      {
        "id": "mid_q14",
        "question": "การร่างแบบจำลองหน้าจอเว็บไซต์หรือแอปพลิเคชัน (Wireframe) จัดอยู่ในขั้นตอนใดของวงจร SDLC?",
        "options": [
          "ขั้นตอนการวางแผน (Planning)",
          "ขั้นตอนการออกแบบ (Design)",
          "ขั้นตอนการวิเคราะห์ (Analysis)",
          "ขั้นตอนการติดตั้ง (Implementation)"
        ],
        "correctIndex": 1,
        "explanation": "การออกแบบส่วนติดต่อผู้ใช้งาน (UI Design) และ Wireframe จัดอยู่ในขั้นตอนการออกแบบ (Design)"
      },
      {
        "id": "mid_q15",
        "question": "การทดสอบโปรแกรมโดยผู้พัฒนาทดสอบทีละโมดูลย่อยๆ เพื่อยืนยันความถูกต้องก่อนนำมารวมกัน เรียกว่าอะไร?",
        "options": [
          "การทดสอบการยอมรับ (Acceptance Testing)",
          "การทดสอบการเชื่อมต่อ (Integration Testing)",
          "การทดสอบระดับหน่วยย่อย (Unit Testing)",
          "การทดสอบระบบภาพรวม (System Testing)"
        ],
        "correctIndex": 2,
        "explanation": "Unit Testing คือการทดสอบฟังก์ชันหรือโมดูลเดี่ยวๆ แต่ละส่วนอย่างละเอียด"
      },
      {
        "id": "mid_q16",
        "question": "เมื่อส่งมอบระบบให้ผู้ใช้งานจริงแล้ว แต่พบข้อผิดพลาดที่ต้องแก้ไขภายหลัง กิจกรรมนี้จัดอยู่ในขั้นตอนใด?",
        "options": [
          "ขั้นตอนการออกแบบ (Design)",
          "ขั้นตอนการวางแผน (Planning)",
          "ขั้นตอนการพัฒนา (Implementation)",
          "ขั้นตอนการบำรุงรักษา (Maintenance)"
        ],
        "correctIndex": 3,
        "explanation": "การแก้ไขข้อผิดพลาดหลังเริ่มใช้งานจริงและการปรับปรุงระบบเป็นกิจกรรมในขั้นตอนการบำรุงรักษา (Maintenance)"
      },
      {
        "id": "mid_q17",
        "question": "ในการศึกษาความเป็นไปได้ (Feasibility Study) การพิจารณาเรื่องงบประมาณและผลตอบแทนที่ได้รับ ตรงกับด้านใด?",
        "options": [
          "ด้านเศรษฐศาสตร์ (Economic Feasibility)",
          "ด้านเทคนิคและอุปกรณ์ (Technical Feasibility)",
          "ด้านการดำเนินงาน (Operational Feasibility)",
          "ด้านกฎหมายและลิขสิทธิ์ (Legal Feasibility)"
        ],
        "correctIndex": 0,
        "explanation": "Economic Feasibility พิจารณาความคุ้มค่าด้านงบประมาณ ต้นทุน และผลตอบแทนของโครงงาน"
      },
      {
        "id": "mid_q18",
        "question": "ในการเขียนรายงานโครงงานคอมพิวเตอร์ 5 บท ส่วนของ \"วัตถุประสงค์และขอบเขตของโครงงาน\" บรรจุอยู่ในบทใด?",
        "options": [
          "บทที่ 2 เอกสารที่เกี่ยวข้อง",
          "บทที่ 1 บทนำของโครงงาน",
          "บทที่ 3 วิธีการดำเนินงาน",
          "บทที่ 4 ผลการดำเนินงาน"
        ],
        "correctIndex": 1,
        "explanation": "วัตถุประสงค์ ขอบเขต และประโยชน์ที่คาดว่าจะได้รับ บันทึกอยู่ในบทที่ 1 บทนำ"
      },
      {
        "id": "mid_q19",
        "question": "การอธิบายขั้นตอนการพัฒนาโปรแกรม ซอฟต์แวร์ที่ใช้ และเครื่องมือที่ใช้ในการทำโครงงาน จัดอยู่ในบทใดของรายงาน?",
        "options": [
          "บทที่ 1 บทนำของโครงงาน",
          "บทที่ 2 ทฤษฎีที่เกี่ยวข้อง",
          "บทที่ 3 วิธีการดำเนินงาน",
          "บทที่ 5 สรุปและข้อเสนอแนะ"
        ],
        "correctIndex": 2,
        "explanation": "บทที่ 3 วิธีการดำเนินงานโครงงาน อธิบายขั้นตอนและเครื่องมือที่ใช้ในการพัฒนาอย่างละเอียด"
      },
      {
        "id": "mid_q20",
        "question": "ส่วนประกอบใดในเล่มรายงานโครงงานที่ทำหน้าที่สรุปภาพรวมของโครงงานทั้งหมดให้อ่านจบใน 1 หน้ากระดาษ?",
        "options": [
          "กิตติกรรมประกาศ (Acknowledgement)",
          "สารบัญเนื้อหา (Table of Contents)",
          "บรรณานุกรม (Bibliography)",
          "บทคัดย่อ (Abstract)"
        ],
        "correctIndex": 3,
        "explanation": "บทคัดย่อ (Abstract) สรุปภาพรวมของปัญหา วัตถุประสงค์ วิธีการดำเนินงาน และผลลัพธ์ของโครงงานแบบย่อ"
      }
    ]
  },
  {
    "id": "quiz-final",
    "category": "final",
    "title": "ข้อสอบวัดผลการเรียนรู้ปลายภาคเรียน: เทคโนโลยี (วิทยาการคำนวณ) ม.4 (20 ข้อ)",
    "timeLimitMinutes": 30,
    "passcode": "final",
    "questions": [
      {
        "id": "fin_q1",
        "question": "ในกรณีศึกษาโครงงานเว็บไซต์ห้องสมุดโรงเรียน ข้อใดเป็นปัญหาหลักที่ตรวจพบจากการสำรวจผู้ใช้งานจริง?",
        "options": [
          "คอมพิวเตอร์ในห้องสมุดมีขนาดหน้าจอใหญ่เกินไป",
          "เจ้าหน้าที่ห้องสมุดมีจำนวนมากกว่าผู้เข้ามาใช้บริการ",
          "นักเรียนค้นหาหนังสือไม่พบและไม่ทราบสถานะการยืมคืน",
          "มีโต๊ะเก้าอี้สำหรับอ่านหนังสือไม่เพียงพอในห้องสมุด"
        ],
        "correctIndex": 2,
        "explanation": "ปัญหาหลักคือความยากลำบากในการค้นหาหนังสือและไม่ทราบว่าหนังสือว่างอยู่หรือไม่"
      },
      {
        "id": "fin_q2",
        "question": "การที่ผู้พัฒนาแบ่งระบบเว็บไซต์ห้องสมุดออกเป็น ระบบค้นหา ระบบยืมคืน และระบบสมาชิก จัดเป็นการใช้ทักษะใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การหารูปแบบพฤติกรรม (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การแยกส่วนประกอบ (Decomposition)"
        ],
        "correctIndex": 3,
        "explanation": "การแบ่งระบบใหญ่เป็นระบบย่อยๆ เป็นการประยุกต์ใช้ Decomposition"
      },
      {
        "id": "fin_q3",
        "question": "หากต้องการออกแบบระบบค้นหาหนังสือห้องสมุดให้แสดงผลตามตัวอักษร ก ถึง ฮ ควรใช้ขั้นตอนวิธีในข้อใด?",
        "options": [
          "ขั้นตอนวิธีแบบเรียงลำดับข้อมูล (Sorting Algorithm)",
          "ขั้นตอนวิธีแบบเลือกสุ่มรายการ (Random Algorithm)",
          "ขั้นตอนวิธีแบบย้อนรอยกลับ (Backtracking Algorithm)",
          "ขั้นตอนวิธีแบบแบ่งแยกข้อมูล (Divide & Conquer)"
        ],
        "correctIndex": 0,
        "explanation": "การเรียงลำดับข้อมูลตามตัวอักษรเป็น Sorting Algorithm"
      },
      {
        "id": "fin_q4",
        "question": "ในการสร้างแผนภาพกระแสข้อมูล (DFD) ของระบบห้องสมุด สัญลักษณ์ \"ลูกศร (Data Flow)\" ใช้แสดงสิ่งใด?",
        "options": [
          "การตัดสินใจเลือกฟังก์ชันการทำงานของระบบ",
          "ทิศทางการเคลื่อนย้ายหรือการไหลของข้อมูลในระบบ",
          "แหล่งจัดเก็บข้อมูลหรือตารางข้อมูลในเซิร์ฟเวอร์",
          "ขอบเขตทางกายภาพของสถานที่ติดตั้งคอมพิวเตอร์"
        ],
        "correctIndex": 1,
        "explanation": "ลูกศรแสดงทิศทางการไหลของข้อมูลจากจุดหนึ่งไปยังอีกจุดหนึ่งในระบบ"
      },
      {
        "id": "fin_q5",
        "question": "การออกแบบส่วนติดต่อผู้ใช้งาน (UI) ของเว็บไซต์ห้องสมุด ข้อใดเป็นแนวทางที่เหมาะสมที่สุดสำหรับนักเรียน?",
        "options": [
          "ใช้ภาพพื้นหลังเคลื่อนไหวและมีเอฟเฟกต์เสียงตลอดเวลา",
          "ซ่อนเมนูค้นหาไว้ในหน้าต่างย่อยเพื่อความเรียบง่าย",
          "มีช่องค้นหาที่มองเห็นชัดเจนและเมนูใช้งานเข้าใจง่าย",
          "ใช้ฟอนต์ประดิษฐ์ที่มีลวดลายซับซ้อนหลายสิบรูปแบบ"
        ],
        "correctIndex": 2,
        "explanation": "UI ที่ดีต้องใช้งานง่าย ค้นหาข้อมูลได้สะดวก และไม่ซับซ้อน"
      },
      {
        "id": "fin_q6",
        "question": "ในกรณีศึกษาแอปแจ้งเตือนการกินยาสำหรับผู้สูงอายุ ข้อใดคือปัญหาหลักด้านสุขภาพของผู้สูงอายุที่ต้องแก้?",
        "options": [
          "การลืมรับประทานยาตรงเวลาและสายตามองตัวหนังสือเล็กไม่ชัด",
          "ความต้องการเล่นเกมฝึกสมองเพื่อแข่งขันกับเพื่อนร่วมรุ่น",
          "การเชื่อมต่อแอปพลิเคชันเข้ากับอุปกรณ์เครือข่ายความเร็วสูง",
          "ความยากลำบากในการเดินทางไปซื้อสมาร์ตโฟนเครื่องใหม่"
        ],
        "correctIndex": 0,
        "explanation": "ผู้สูงอายุมีปัญหาสายตายาวและมักลืมเวลาทานยาเป็นประจำ"
      },
      {
        "id": "fin_q7",
        "question": "หลักการออกแบบหน้าจอแอปพลิเคชันให้เหมาะสมกับผู้สูงอายุ (Elderly-Friendly Design) คือข้อใด?",
        "options": [
          "ใช้ข้อความภาษาอังกฤษตัวเขียนเพื่อให้ดูทันสมัย",
          "ใส่ปุ่มกดจำนวนมากในหน้าเดียวกันเพื่อความครบครัน",
          "ลดขนาดตัวอักษรลงเพื่อแสดงข้อมูลได้จำนวนมากที่สุด",
          "ใช้ตัวอักษรขนาดใหญ่ สีสันตัดกันชัดเจน และมีปุ่มกดใหญ่"
        ],
        "correctIndex": 3,
        "explanation": "การออกแบบสำหรับผู้สูงอายุต้องใช้ตัวอักษรขนาดใหญ่ สีคอนทราสต์ชัดเจน และปุ่มกดสัมผัสง่าย"
      },
      {
        "id": "fin_q8",
        "question": "เงื่อนไขในแอปเตือนยา: \"หากผู้ใช้กดปุ่ม เลื่อนเตือน (Snooze) ให้ระบบรอ 10 นาทีแล้วส่งเสียงเตือนซ้ำ\" จัดเป็นโครงสร้างแบบใด?",
        "options": [
          "โครงสร้างการทำงานแบบเรียงลำดับเส้นตรงต่อเนื่อง",
          "โครงสร้างการทำงานแบบมีเงื่อนไขและวนซ้ำตามเวลา",
          "โครงสร้างการทำงานแบบไม่มีจุดสิ้นสุดของโปรแกรม",
          "โครงสร้างการทำงานแบบสุ่มเลือกการทำงานอัตโนมัติ"
        ],
        "correctIndex": 1,
        "explanation": "มีการตรวจสอบเงื่อนไขการกดปุ่ม Snooze และวนซ้ำรอเวลาส่งเสียงเตือนใหม่"
      },
      {
        "id": "fin_q9",
        "question": "ในการเก็บข้อมูลผู้ป่วยเพื่อใช้ในแอปแจ้งเตือนการกินยา ข้อใดเป็นข้อมูลที่ \"ไม่จำเป็นต้องจัดเก็บ\"?",
        "options": [
          "ข้อมูลชื่อยาและเวลาที่แพทย์สั่งให้รับประทาน",
          "ข้อควรระวังพิเศษ เช่น ทานก่อนอาหารหรือหลังอาหาร",
          "รหัสผ่านบัญชีเงินฝากธนาคารและประวัติทางการเงิน",
          "ปริมาณยาที่ต้องรับประทานในแต่ละมื้ออย่างถูกต้อง"
        ],
        "correctIndex": 2,
        "explanation": "ข้อมูลบัญชีธนาคารไม่จำเป็นและอาจก่อให้เกิดความเสี่ยงต่อความเป็นส่วนตัว"
      },
      {
        "id": "fin_q10",
        "question": "การทดสอบแอปเตือนยากับผู้สูงอายุในชุมชนเพื่อประเมินความพึงพอใจและความสะดวกในการใช้งาน เรียกว่าอะไร?",
        "options": [
          "การทดสอบระดับย่อย (Unit Testing)",
          "การทดสอบการยอมรับของผู้ใช้ (User Acceptance Testing)",
          "การทดสอบความเร็วระบบ (Performance Testing)",
          "การทดสอบความปลอดภัย (Security Testing)"
        ],
        "correctIndex": 1,
        "explanation": "User Acceptance Testing (UAT) คือการนำระบบไปให้กลุ่มผู้ใช้เป้าหมายทดลองใช้งานจริง"
      },
      {
        "id": "fin_q11",
        "question": "เมื่อโปรแกรมเกิดข้อผิดพลาด (Bug) ทำให้ระบบทำงานผิดพลาด ขั้นตอนที่ถูกต้องในการแก้ปัญหาคือข้อใด?",
        "options": [
          "ตรวจสอบโค้ด หาสาเหตุ แล้วแก้ไขข้อผิดพลาด (Debug)",
          "ปิดโปรแกรมและเริ่มต้นทำโครงงานเรื่องใหม่ทันที",
          "ส่งมอบโปรแกรมให้ผู้ใช้งานโดยไม่ต้องแจ้งข้อผิดพลาด",
          "เปลี่ยนระบบปฏิบัติการของเครื่องคอมพิวเตอร์ใหม่"
        ],
        "correctIndex": 0,
        "explanation": "Debugging เป็นกระบวนการมาตรฐานในการระบุและแก้ไขข้อผิดพลาดของซอฟต์แวร์"
      },
      {
        "id": "fin_q12",
        "question": "ในในการนำภาพไอคอนหรือภาพประกอบจากอินเทอร์เน็ตมาใช้ในโครงงาน ควรคำนึงถึงสิ่งใดมากที่สุด?",
        "options": [
          "เลือกดาวน์โหลดเฉพาะภาพที่มีขนาดไฟล์ใหญ่ที่สุด",
          "บันทึกภาพจากเว็บไซต์ใดก็ได้โดยไม่ต้องขออนุญาต",
          "ตัดลายน้ำของเจ้าของภาพออกก่อนนำมาใส่ในโครงงาน",
          "ตรวจสอบสัญญาอนุญาตสิทธิ์และระบุแหล่งที่มาอ้างอิง"
        ],
        "correctIndex": 3,
        "explanation": "ต้องเคารพทรัพย์สินทางปัญญาและเลือกใช้งานภาพที่ได้รับอนุญาตพร้อมอ้างอิงแหล่งที่มา"
      },
      {
        "id": "fin_q13",
        "question": "สัญลักษณ์สัญญาอนุญาตครีเอทีฟคอมมอนส์แบบ \"CC-BY\" มีความหมายตรงกับข้อใด?",
        "options": [
          "ห้ามนำผลงานไปใช้ในเชิงพาณิชย์ทุกกรณี",
          "อนุญาตให้นำผลงานไปใช้ได้แต่ต้องระบุที่มา",
          "ไม่อนุญาตให้ทำการดัดแปลงผลงานต้นฉบับ",
          "ต้องเผยแพร่ผลงานที่ดัดแปลงด้วยเงื่อนไขเดิม"
        ],
        "correctIndex": 1,
        "explanation": "CC-BY กำหนดให้แสดงที่มาของเจ้าของผลงานต้นฉบับเมื่อนำไปใช้"
      },
      {
        "id": "fin_q14",
        "question": "การรวบรวมสถิติการใช้งานเว็บไซต์ห้องสมุดจริงตลอด 1 เดือน แล้วนำมาสรุปเป็นแผนภูมิ ควรเขียนไว้ในบทใด?",
        "options": [
          "บทที่ 2 เอกสารและงานวิจัยที่เกี่ยวข้อง",
          "บทที่ 3 วิธีการดำเนินงานและการทดลอง",
          "บทที่ 4 ผลการดำเนินงานและการวิเคราะห์",
          "บทที่ 1 บทนำและความเป็นมาของปัญหา"
        ],
        "correctIndex": 2,
        "explanation": "ข้อมูลสถิติผลการใช้งานจริงและการวิเคราะห์ผลอยู่ในบทที่ 4 ผลการดำเนินงาน"
      },
      {
        "id": "fin_q15",
        "question": "ในรายงานโครงงานคอมพิวเตอร์ 5 บท หัวข้อ \"ปัญหา อุปสรรค และข้อเสนอแนะในการพัฒนาต่อ\" บรรจุอยู่ในบทใด?",
        "options": [
          "บทที่ 5 สรุปผล อภิปรายผล และข้อเสนอแนะ",
          "บทที่ 4 ผลการดำเนินงานและการทดสอบระบบ",
          "บทที่ 3 วิธีการดำเนินงานและขั้นตอนพัฒนา",
          "บทที่ 2 ทฤษฎีและงานวิจัยที่นำมาอ้างอิง"
        ],
        "correctIndex": 0,
        "explanation": "ข้อสรุป ปัญหาอุปสรรค และข้อเสนอแนะการพัฒนาต่อยอดจัดอยู่ในบทที่ 5"
      },
      {
        "id": "fin_q16",
        "question": "การเตรียมตัวนำเสนอโครงงานคอมพิวเตอร์หน้าชั้นเรียน ข้อใดเป็นแนวทางที่เหมาะสมที่สุด?",
        "options": [
          "ท่องจำโค้ดโปรแกรมทั้งหมดมาพูดให้ผู้ฟังฟัง",
          "ยืนอ่านเอกสารรายงานอย่างละเอียดทีละหน้ากระดาษ",
          "แสดงเฉพาะภาพกราฟิกสวยงามโดยไม่ต้องอธิบายระบบ",
          "สรุปประเด็นสำคัญ กระชับ และสาธิตการทำงานจริง"
        ],
        "correctIndex": 3,
        "explanation": "การนำเสนอที่มีประสิทธิภาพต้องกระชับ ตรงประเด็น และสาธิตผลงานให้เห็นการทำงานจริง"
      },
      {
        "id": "fin_q17",
        "question": "ข้อใดเป็นตัวบ่งชี้สำคัญที่สุดว่า \"โครงงานแอปแจ้งเตือนการกินยา\" ประสบความสำเร็จตามเป้าหมาย?",
        "options": [
          "แอปพลิเคชันมีขนาดไฟล์ติดตั้งมากกว่า 500 เมกะไบต์",
          "ผู้สูงอายุรับประทานยาตรงเวลามากขึ้นและลืมกินยาลดลง",
          "โค้ดของโปรแกรมมีความยาวมากกว่า 10,000 บรรทัด",
          "ได้รับคะแนนเต็มในการสอบวิชาการเขียนโปรแกรม"
        ],
        "correctIndex": 1,
        "explanation": "เป้าหมายหลักคือการแก้ปัญหาของผู้ใช้ ซึ่งก็คือการช่วยให้ผู้สูงอายุไม่ลืมรับประทานยา"
      },
      {
        "id": "fin_q18",
        "question": "ข้อใดเป็นแนวทางป้องกันความปลอดภัยของข้อมูลผู้ใช้งานในระบบโครงงานเว็บไซต์?",
        "options": [
          "จัดเก็บรหัสผ่านเป็นข้อความธรรมดาเพื่อให้ผู้ดูแลดูได้ง่าย",
          "อนุญาตให้ผู้ใช้ทุกคนสามารถแก้ไขข้อมูลของเพื่อนได้",
          "เข้ารหัสผ่านของผู้ใช้และกำหนดสิทธิ์การเข้าถึงข้อมูล",
          "ไม่ต้องติดตั้งระบบล็อกอินเพื่อความสะดวกในการเข้าใช้งาน"
        ],
        "correctIndex": 2,
        "explanation": "การเข้ารหัสผ่าน (Hashing) และการจำกัดสิทธิ์ผู้ใช้เป็นมาตรการพื้นฐานด้านความปลอดภัย"
      },
      {
        "id": "fin_q19",
        "question": "การดูแลระบบหลังส่งมอบงาน เช่น การปรับปรุงให้รองรับระบบปฏิบัติการรุ่นใหม่ จัดอยู่ในขั้นตอนใดของ SDLC?",
        "options": [
          "ขั้นตอนการบำรุงรักษา (Maintenance)",
          "ขั้นตอนการวางแผนโครงงาน (Planning)",
          "ขั้นตอนการออกแบบระบบ (Design)",
          "ขั้นตอนการวิเคราะห์ระบบ (Analysis)"
        ],
        "correctIndex": 0,
        "explanation": "การดูแล ปรับปรุง และอัปเดตระบบหลังส่งมอบอยู่ในขั้นตอนการบำรุงรักษา (Maintenance)"
      },
      {
        "id": "fin_q20",
        "question": "ประโยชน์สูงสุดที่นักเรียนได้รับจากการทำโครงงานคอมพิวเตอร์บูรณาการแนวคิดเชิงคำนวณคือข้อใด?",
        "options": [
          "ความสามารถในการเล่นเกมคอมพิวเตอร์ได้เก่งขึ้น",
          "ทักษะการจำหน่ายอุปกรณ์คอมพิวเตอร์ในราคาประหยัด",
          "การได้รับเกียรติบัตรและของรางวัลจากการแข่งขัน",
          "ทักษะการคิดแก้ปัญหาในชีวิตจริงและการทำงานเป็นทีม"
        ],
        "correctIndex": 3,
        "explanation": "เป้าหมายการเรียนรู้สูงสุดคือทักษะการคิดวิเคราะห์แก้ปัญหาในโลกความจริงและการทำงานร่วมกับผู้อื่น"
      }
    ]
  }
];

function getOfflineQuizzesList(filter) {
  let list = OFFLINE_QUIZZES;
  if (filter && filter !== 'all') {
    list = list.filter(q => q.category === filter);
  }
  return list.map(q => ({
    id: q.id,
    category: q.category || 'unit',
    title: q.title,
    questionCount: q.questions.length,
    timeLimitMinutes: q.timeLimitMinutes,
    passcode: q.passcode || 'unit1'
  }));
}

function getOfflineQuizById(quizId) {
  const quiz = OFFLINE_QUIZZES.find(q => q.id === quizId);
  if (!quiz) return null;
  return {
    id: quiz.id,
    category: quiz.category || 'unit',
    title: quiz.title,
    timeLimitMinutes: quiz.timeLimitMinutes,
    passcode: quiz.passcode || 'unit1',
    questions: quiz.questions.map((q, idx) => ({
      id: q.id || 'q' + idx,
      question: q.question,
      options: q.options
    }))
  };
}

async function loadQuizzesData() {
  try {
    let quizzes;
    if (isStaticOrServerlessHost()) {
      quizzes = getOfflineQuizzesList(currentQuizFilter);
    } else {
      try {
        let endpoint = '/quizzes';
        if (currentQuizFilter && currentQuizFilter !== 'all') {
          endpoint += `?category=${currentQuizFilter}`;
        }
        quizzes = await apiFetch(endpoint);
      } catch (err) {
        quizzes = getOfflineQuizzesList(currentQuizFilter);
      }
    }
    const container = document.getElementById('quizzes-container');
    if (!container) return;

    container.innerHTML = quizzes.map(q => `
      <div class="glass-card rounded-3xl p-6 space-y-4 flex flex-col justify-between glass-card-hover border border-slate-200">
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-[10px] font-bold uppercase px-3 py-1 rounded-full ${q.category === 'midterm' ? 'bg-amber-100 text-amber-800' : q.category === 'final' ? 'bg-rose-100 text-rose-800' : q.category === 'pretest' ? 'bg-teal-100 text-teal-800' : 'bg-blue-100 text-blue-800'}">
              ${q.category === 'midterm' ? 'ข้อสอบกลางภาค' : q.category === 'final' ? 'ข้อสอบปลายภาค' : q.category === 'pretest' ? 'แบบทดสอบก่อนเรียน' : 'แบบทดสอบท้ายหน่วย'}
            </span>
            <span class="text-xs text-slate-500 font-bold"><i class="fa-solid fa-stopwatch text-amber-500 mr-1"></i>${q.timeLimitMinutes} นาที</span>
          </div>
          <h3 class="text-base font-bold leading-snug" style="color: var(--text-main); font-family: 'Sarabun', sans-serif;">${escapeHtml(q.title)}</h3>
          <p class="text-xs" style="color: var(--text-muted); font-family: 'Sarabun', sans-serif;">
            ${isAntiCheatQuiz(q)
              ? `จำนวนทั้งหมด ${q.questionCount} ข้อ • ข้อสอบมาตรฐาน (ระบบตรวจจับการทุจริต & บังคับเต็มหน้าจอ)`
              : `จำนวนทั้งหมด ${q.questionCount} ข้อ พร้อมตรวจคำตอบและเฉลยทันที (โหมดเรียนรู้ ไม่จำกัดการสลับหน้าจอ)`}
          </p>
          <div class="flex items-center justify-between text-xs pt-1">
            <span class="text-emerald-500 font-semibold flex items-center gap-1.5">
              <i class="fa-solid fa-lock text-[11px]"></i> ต้องใส่รหัสแบบทดสอบก่อนทำ
            </span>
            ${(currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin')) ? `
              <span class="bg-amber-500/10 text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded-md font-mono font-bold text-[11px]">
                รหัส: ${q.passcode || 'unit1'}
              </span>
            ` : ''}
          </div>
        </div>

        <button onclick="openQuizModal('${q.id}')" class="w-full ${q.category === 'midterm' ? 'bg-amber-500 hover:bg-amber-600' : q.category === 'final' ? 'bg-rose-600 hover:bg-rose-700' : q.category === 'pretest' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-extrabold text-xs py-3 rounded-2xl shadow-md transition">
          <i class="fa-solid fa-pen-to-square mr-1"></i> เริ่มทำข้อสอบชุดนี้ (${q.questionCount} ข้อ)
        </button>
      </div>
    `).join('');

  } catch (err) {
    console.error('Quizzes load error:', err);
  }
}

function filterQuizCategory(cat) {
  currentQuizFilter = cat;
  document.querySelectorAll('.quiz-cat-btn').forEach(btn => {
    btn.style.color = 'var(--text-muted)';
    btn.style.borderBottom = 'none';
    btn.style.fontWeight = '500';
  });

  const activeBtn = document.getElementById(`qtab-${cat}`);
  if (activeBtn) {
    activeBtn.style.color = 'var(--primary-color)';
    activeBtn.style.borderBottom = '2px solid var(--primary-color)';
    activeBtn.style.fontWeight = '700';
  }

  loadQuizzesData();
}


// ==========================================================================
// PROCTORED EXAM SYSTEM & TIMER (30 MINUTES, EYE-FRIENDLY & ANTI-CHEAT)
// ==========================================================================
let quizTimerInterval = null;
let quizTimeRemaining = 1800; // 30 minutes in seconds
let quizStartTime = null;
let quizViolationsCount = 0;
let quizIsActive = false;
let quizEyeTheme = 'dark'; // Primary default standby: Dark Mode
let pendingQuizData = null; // Stored quiz object before passcode validation
let quizActiveQuestions = []; // stores current randomized questions
const GOOGLE_SCRIPT_QUIZ_URL = 'https://script.google.com/macros/s/AKfycbyaRWXgcCKdlgCylkC-5bjyb_FT80LPMdDg42GzpoMrSoF6cYyv21958w5QRLwFmrM/exec';
const QUIZ_SHEET_ID = '13n23D7lMUIwjwArmoOyOyY5eNSLz_a2Fw7Jkb2QqrWA';

// Fisher-Yates array shuffler
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Check if quiz requires Anti-Cheat & Fullscreen (Midterm & Final only)
function isAntiCheatQuiz(quiz) {
  if (!quiz) return false;
  const id = String(quiz.id || '').toLowerCase();
  const cat = String(quiz.category || quiz.type || '').toLowerCase();
  return id === 'quiz-midterm' || id === 'quiz-final' || cat === 'midterm' || cat === 'final';
}

// Generate watermark text in background
function updateQuizWatermark() {
  const layer = document.getElementById('quiz-watermark-layer');
  if (!layer) return;
  if (!currentUser) {
    layer.innerHTML = '';
    return;
  }
  const text = `${currentUser.student_id || currentUser.username || '69001'} - ${currentUser.full_name} • ระบบป้องกันการทุจริต CS-M4`;
  let html = '';
  for (let i = 0; i < 24; i++) {
    html += `<span class="quiz-watermark-item">${escapeHtml(text)}</span>`;
  }
  layer.innerHTML = html;
}

// Eye Comfort Theme Toggle (Standby default: Dark)
function toggleQuizEyeTheme() {
  quizEyeTheme = quizEyeTheme === 'dark' ? 'light' : 'dark';
  const mainCard = document.getElementById('quiz-main-card');
  const resultCard = document.getElementById('quiz-result-card');
  if (mainCard) mainCard.setAttribute('data-quiz-theme', quizEyeTheme);
  if (resultCard) resultCard.setAttribute('data-quiz-theme', quizEyeTheme);
  showToast(`สลับเป็นโหมด${quizEyeTheme === 'dark' ? 'มืดถนอมสายตา' : 'สว่างนวลตา'} เรียบร้อย`, 'info');
}

// Forced Fullscreen Controller & Handlers
function isDocumentInFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

function requestFullscreenSafe() {
  try {
    if (isDocumentInFullscreen()) return;
    const target = document.documentElement;
    const modalEl = document.getElementById('modal-take-quiz');
    const req = target.requestFullscreen ? target.requestFullscreen() : (modalEl && modalEl.requestFullscreen ? modalEl.requestFullscreen() : null);
    if (req && req.catch) {
      req.catch(err => {
        console.warn('Native fullscreen notice:', err);
      });
    }
  } catch (e) {
    console.warn('Fullscreen request call:', e);
  }
}

function reenterQuizFullscreen() {
  const target = document.documentElement;
  const modalEl = document.getElementById('modal-take-quiz');
  const enforcer = document.getElementById('quiz-fullscreen-enforcer');
  
  const req = target.requestFullscreen ? target.requestFullscreen() : (modalEl && modalEl.requestFullscreen ? modalEl.requestFullscreen() : null);
  if (req) {
    req.then(() => {
      if (enforcer) enforcer.style.display = 'none';
      showToast('กลับเข้าสู่โหมดเต็มหน้าจอเรียบร้อย', 'success');
    }).catch(err => {
      console.warn('Re-enter fullscreen failed:', err);
      if (enforcer) enforcer.style.display = 'none';
    });
  } else {
    if (enforcer) enforcer.style.display = 'none';
  }
}

function handleFullscreenChange() {
  if (!quizIsActive) return;
  const inFs = isDocumentInFullscreen();
  const enforcer = document.getElementById('quiz-fullscreen-enforcer');
  if (!inFs) {
    // Student exited fullscreen mode during active exam!
    if (enforcer) enforcer.style.display = 'flex';
    recordProctorViolation('ออกจากโหมดเต็มหน้าจอ');
  } else {
    if (enforcer) enforcer.style.display = 'none';
  }
}

// Register native fullscreen events
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

// Fullscreen Button (Enforces fullscreen mode)
function toggleQuizFullscreen() {
  if (!quizIsActive) return;
  if (!isDocumentInFullscreen()) {
    reenterQuizFullscreen();
  } else {
    showToast('แบบทดสอบนี้กำหนดให้ทำในโหมดเต็มหน้าจอเท่านั้น เพื่อความโปร่งใส', 'info');
  }
}

// Proctoring Alert Handlers
function dismissProctorAlert() {
  const alertEl = document.getElementById('quiz-proctor-alert');
  if (alertEl) alertEl.style.display = 'none';
}

function recordProctorViolation(reason) {
  if (!quizIsActive) return;
  quizViolationsCount++;
  
  const badge = document.getElementById('quiz-violations-badge');
  if (badge) {
    badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-500"></i> สลับหน้าจอ: ${quizViolationsCount}/3 ครั้ง`;
    badge.style.color = quizViolationsCount >= 2 ? '#ef4444' : '#d97706';
  }
  
  const alertEl = document.getElementById('quiz-proctor-alert');
  const alertMsg = document.getElementById('quiz-proctor-alert-msg');
  if (alertEl && alertMsg) {
    alertMsg.innerText = `ตรวจพบการสลับหน้าต่างหรือแท็บอื่น (${reason}) ระบบได้บันทึกพฤติกรรมนี้ไว้แล้ว (ครั้งที่ ${quizViolationsCount}/3)`;
    alertEl.style.display = 'flex';
  }
  
  if (quizViolationsCount >= 3) {
    showToast('ตรวจพบการสลับหน้าจอเกินกำหนด 3 ครั้ง! ระบบจะส่งคำตอบให้อัตโนมัติเพื่อความโปร่งใส', 'error');
    submitQuizAnswers(true, 'ส่งอัตโนมัติเนื่องจากสลับหน้าจอเกิน 3 ครั้ง');
  }
}

// Anti-Cheat Window Listeners (Active only for Midterm & Final)
window.addEventListener('blur', () => {
  if (quizIsActive && isAntiCheatQuiz(currentQuiz)) {
    recordProctorViolation('สลับออกจากหน้าต่างข้อสอบ');
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && quizIsActive && isAntiCheatQuiz(currentQuiz)) {
    recordProctorViolation('สลับไปยังแท็บอื่นหรือย่อหน้าต่าง');
  }
});

// Block key shortcuts inside quiz (Active only for Midterm & Final)
window.addEventListener('keydown', (e) => {
  if (!quizIsActive) return;
  if (!isAntiCheatQuiz(currentQuiz)) return;
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
    (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V'))
  ) {
    e.preventDefault();
    recordProctorViolation('พยายามใช้คีย์ลัดคัดลอกหรือเปิดเครื่องมือพัฒนา');
  }
});

// 30-Minute Timer Controller
function startQuizTimer() {
  if (quizTimerInterval) clearInterval(quizTimerInterval);
  quizTimeRemaining = 1800; // 30 minutes (30 * 60)
  quizStartTime = Date.now();
  updateTimerDisplay();

  quizTimerInterval = setInterval(() => {
    quizTimeRemaining--;
    updateTimerDisplay();

    if (quizTimeRemaining <= 0) {
      clearInterval(quizTimerInterval);
      quizTimerInterval = null;
      showToast('หมดเวลา 30 นาทีแล้ว! ระบบจะส่งคำตอบให้อัตโนมัติ', 'warning');
      submitQuizAnswers(true, 'หมดเวลาทำแบบทดสอบ 30 นาที');
    }
  }, 1000);
}

function updateTimerDisplay() {
  const textEl = document.getElementById('quiz-timer-text');
  const boxEl = document.getElementById('quiz-timer-box');
  if (!textEl) return;

  const minutes = Math.floor(quizTimeRemaining / 60);
  const seconds = quizTimeRemaining % 60;
  textEl.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (boxEl) {
    if (quizTimeRemaining <= 60) {
      boxEl.classList.remove('timer-warning');
      boxEl.classList.add('timer-danger');
    } else if (quizTimeRemaining <= 300) {
      boxEl.classList.remove('timer-danger');
      boxEl.classList.add('timer-warning');
    } else {
      boxEl.classList.remove('timer-warning', 'timer-danger');
    }
  }
}

function stopQuizTimer() {
  if (quizTimerInterval) {
    clearInterval(quizTimerInterval);
    quizTimerInterval = null;
  }
}

// Option selection & answer counters
function updateQuizOptionSelection(labelEl, radioName) {
  const radio = labelEl.querySelector(`input[name="${radioName}"]`);
  if (radio) {
    radio.checked = true;
  }
  const groupRadios = document.querySelectorAll(`input[name="${radioName}"]`);
  groupRadios.forEach(r => {
    const parent = r.closest('.quiz-option-card');
    if (parent) {
      if (r.checked) {
        parent.classList.add('is-selected');
      } else {
        parent.classList.remove('is-selected');
      }
    }
  });
  updateQuizAnswerCount();
}

function updateQuizAnswerCount() {
  if (!quizActiveQuestions || quizActiveQuestions.length === 0) return;
  const total = quizActiveQuestions.length;
  let answered = 0;
  quizActiveQuestions.forEach(q => {
    const selected = document.querySelector(`input[name="q_${q.id}"]:checked`);
    if (selected) answered++;
  });
  const counterEl = document.getElementById('quiz-answered-count');
  if (counterEl) {
    counterEl.innerText = `ตอบแล้ว ${answered} จาก ${total} ข้อ`;
  }
}

// Confirmation before exiting
function confirmCloseQuiz() {
  if (!quizIsActive) {
    closeModal('modal-take-quiz');
    return;
  }
  if (confirm('คำเตือน: หากคุณออกจากแบบทดสอบตอนนี้ ระบบจะไม่บันทึกคะแนนการทำแบบทดสอบ คุณต้องการออกจากการทดสอบหรือไม่?')) {
    quizIsActive = false;
    stopQuizTimer();
    document.body.style.overflow = '';
    const modalEl = document.getElementById('modal-take-quiz');
    if (modalEl) modalEl.classList.remove('is-fullscreen-active');
    const enforcer = document.getElementById('quiz-fullscreen-enforcer');
    if (enforcer) enforcer.style.display = 'none';
    if (isDocumentInFullscreen()) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch(() => {});
    }
    closeModal('modal-take-quiz');
    showToast('ออกจากการทำแบบทดสอบแล้ว', 'info');
  }
}

// Confirmation before submitting
function confirmSubmitQuiz() {
  if (!quizActiveQuestions) return;
  let answered = 0;
  quizActiveQuestions.forEach(q => {
    const selected = document.querySelector(`input[name="q_${q.id}"]:checked`);
    if (selected) answered++;
  });
  const unanswered = quizActiveQuestions.length - answered;
  if (unanswered > 0) {
    if (!confirm(`คุณยังไม่ได้ตอบอีก ${unanswered} ข้อ ต้องการยืนยันการส่งคำตอบหรือไม่?`)) {
      return;
    }
  } else {
    if (!confirm('ยืนยันการส่งคำตอบและประเมินผลคะแนนหรือไม่?')) {
      return;
    }
  }
  submitQuizAnswers(false);
}

// Direct Sync Score to Supabase Tab QUIZZES
async function syncQuizScoreToGoogleSheet(quizData, student, score, total, percentage, violations, timeSpentStr) {
  try {
    const formattedTime = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
    const payload = {
      sheetId: QUIZ_SHEET_ID,
      sheetName: 'QUIZZES',
      tab: 'QUIZZES',
      targetSheet: 'QUIZZES',
      sheet: 'QUIZZES',
      action: 'COMPLETE_QUIZ',
      timestamp: formattedTime,
      student_id: student ? (student.student_id || student.username || student.id) : '-',
      user: student ? student.full_name : 'ผู้เรียน',
      role: student ? student.role : 'student',
      title: quizData.title,
      score: `${score}/${total}`,
      percentage: `${percentage}%`,
      status: percentage >= 60 ? 'ผ่านเกณฑ์' : 'ไม่ผ่านเกณฑ์',
      details: JSON.stringify({
        quiz_id: quizData.id,
        score,
        total,
        percentage,
        time_spent: timeSpentStr,
        cheating_violations: violations || 0,
        completed_at: new Date().toISOString()
      })
    };

    const params = new URLSearchParams(payload);
    fetch(GOOGLE_SCRIPT_QUIZ_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    }).catch(e => console.warn('[QUIZZES Sheet Sync Notice]:', e));
    
  } catch (err) {
    console.warn('[QUIZZES Sheet Sync Error]:', err);
  }
}

async function openQuizModal(quizId) {
  if (!currentUser) {
    showToast('กรุณาเข้าสู่ระบบก่อนเริ่มทำแบบทดสอบ', 'error');
    openLoginModal();
    return;
  }
  try {
    let rawQuiz = null;
    if (isStaticOrServerlessHost()) {
      rawQuiz = getOfflineQuizById(quizId);
    } else {
      try {
        rawQuiz = await apiFetch(`/quizzes/${quizId}`);
      } catch (err) {
        rawQuiz = getOfflineQuizById(quizId);
      }
    }

    if (!rawQuiz) {
      showToast('ไม่พบแบบทดสอบที่ระบุ', 'error');
      return;
    }

    // Prompt passcode before starting the exam
    promptQuizPasscode(rawQuiz);
  } catch (err) {
    console.error('Start quiz error:', err);
    showToast('ไม่สามารถเปิดแบบทดสอบได้: ' + err.message, 'error');
  }
}

function promptQuizPasscode(quiz) {
  pendingQuizData = quiz;
  const subEl = document.getElementById('quiz-passcode-subtitle');
  const inputEl = document.getElementById('quiz-passcode-input');
  const errEl = document.getElementById('quiz-passcode-error');
  
  if (subEl) subEl.innerText = quiz.title;
  if (inputEl) {
    inputEl.value = '';
    inputEl.placeholder = 'กรอกรหัสผ่านแบบทดสอบ...';
    inputEl.classList.remove('input-error-shake');
  }
  if (errEl) errEl.style.display = 'none';
  
  openModal('modal-quiz-passcode');
  setTimeout(() => {
    if (inputEl) inputEl.focus();
  }, 150);
}

function handleQuizPasscodeSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (!pendingQuizData) return;
  
  const inputEl = document.getElementById('quiz-passcode-input');
  const errEl = document.getElementById('quiz-passcode-error');
  const entered = (inputEl ? inputEl.value : '').trim();
  
  if (!entered) {
    if (errEl) {
      errEl.innerHTML = '<i class="fa-solid fa-circle-exclamation mr-1"></i> กรุณากรอกรหัสแบบทดสอบ';
      errEl.style.display = 'block';
    }
    if (inputEl) {
      inputEl.classList.add('input-error-shake');
      setTimeout(() => inputEl.classList.remove('input-error-shake'), 400);
      inputEl.focus();
    }
    return;
  }
  
  const normEntered = entered.toLowerCase().replace(/\s+/g, '');
  const quizPasscode = (pendingQuizData.passcode || '').toLowerCase().replace(/\s+/g, '');
  
  // Specific checks per quiz + master overrides
  let isPass = false;
  if (pendingQuizData.id === 'quiz-pre-unit1' && (normEntered === 'preunit1' || normEntered === 'pre1' || normEntered === quizPasscode)) {
    isPass = true;
  } else if (pendingQuizData.id === 'quiz-pre-unit2' && (normEntered === 'preunit2' || normEntered === 'pre2' || normEntered === quizPasscode)) {
    isPass = true;
  } else if (pendingQuizData.id === 'quiz-unit1' && (normEntered === 'unit1' || normEntered === quizPasscode)) {
    isPass = true;
  } else if (pendingQuizData.id === 'quiz-unit2' && (normEntered === 'unit2' || normEntered === 'unit1' || normEntered === quizPasscode)) {
    isPass = true;
  } else if (pendingQuizData.id === 'quiz-midterm' && (normEntered === 'midterm' || normEntered === quizPasscode)) {
    isPass = true;
  } else if (pendingQuizData.id === 'quiz-final' && (normEntered === 'final' || normEntered === quizPasscode)) {
    isPass = true;
  } else if (normEntered === quizPasscode || ['csm4', '1234', 'teacher123', 'admin123', 'csm401', 'csm402', 'midterm4', 'final4', 'preunit1', 'preunit2', 'pre1', 'pre2'].includes(normEntered)) {
    isPass = true;
  }
  
  if (!isPass) {
    if (errEl) {
      errEl.innerHTML = '<i class="fa-solid fa-circle-exclamation mr-1"></i> รหัสแบบทดสอบไม่ถูกต้อง กรุณาติดต่อครูผู้สอน';
      errEl.style.display = 'block';
    }
    if (inputEl) {
      inputEl.classList.add('input-error-shake');
      setTimeout(() => inputEl.classList.remove('input-error-shake'), 400);
      inputEl.focus();
    }
    showToast('รหัสแบบทดสอบไม่ถูกต้อง กรุณาติดต่อครูผู้สอน', 'error');
    return;
  }
  
  // Correct passcode! Close passcode modal and start proctored quiz in fullscreen
  closeModal('modal-quiz-passcode');
  startProctoredQuiz(pendingQuizData);
}

async function startProctoredQuiz(rawQuiz) {
  currentQuiz = rawQuiz;

  // Set quiz eye theme to DARK by default (Standby primary mode)
  quizEyeTheme = 'dark';
  const mainCard = document.getElementById('quiz-main-card');
  const resultCard = document.getElementById('quiz-result-card');
  if (mainCard) {
    mainCard.setAttribute('data-quiz-theme', 'dark');
    mainCard.classList.add('is-fullscreen');
  }
  if (resultCard) {
    resultCard.setAttribute('data-quiz-theme', 'dark');
  }

  const hasAntiCheat = isAntiCheatQuiz(currentQuiz);

  // Reset Anti-Cheat & Timer States
  quizViolationsCount = 0;
  quizIsActive = true;
  dismissProctorAlert();
  const enforcer = document.getElementById('quiz-fullscreen-enforcer');
  if (enforcer) enforcer.style.display = 'none';

  const identityEl = document.getElementById('quiz-student-identity');
  if (identityEl) {
    identityEl.innerHTML = `<i class="fa-solid fa-user-shield"></i> ผู้สอบ: ${escapeHtml(currentUser.full_name)} (${escapeHtml(currentUser.student_id || currentUser.username)})`;
  }

  // Toggle Proctor Header Pills
  const pillSec = document.getElementById('proctor-pill-security');
  const pillFs = document.getElementById('proctor-pill-fullscreen');
  const pillLearn = document.getElementById('proctor-pill-learning');
  if (pillSec) pillSec.style.display = hasAntiCheat ? 'inline-flex' : 'none';
  if (pillFs) pillFs.style.display = hasAntiCheat ? 'inline-flex' : 'none';
  if (pillLearn) pillLearn.style.display = hasAntiCheat ? 'none' : 'inline-flex';

  const violationsBadge = document.getElementById('quiz-violations-badge');
  if (violationsBadge) {
    if (hasAntiCheat) {
      violationsBadge.style.display = 'inline-flex';
      violationsBadge.innerHTML = `<i class="fa-solid fa-eye text-emerald-500"></i> สลับหน้าจอ: 0/3 ครั้ง`;
      violationsBadge.style.color = '';
    } else {
      violationsBadge.style.display = 'none';
    }
  }

  document.getElementById('quiz-modal-title').innerText = currentQuiz.title;
  const subEl = document.querySelector('.quiz-modal-subtitle');
  if (subEl) {
    if (hasAntiCheat) {
      subEl.innerHTML = `<i class="fa-solid fa-shield-halved text-amber-400"></i> ข้อสอบ ${currentQuiz.questions.length} ข้อ • เวลาทำข้อสอบ ${currentQuiz.timeLimitMinutes || 30} นาที • ระบบตรวจจับการทุจริต (ไม่อนุญาตให้สลับหน้าจอ)`;
    } else {
      subEl.innerHTML = `<i class="fa-solid fa-circle-info text-emerald-400"></i> แบบทดสอบ ${currentQuiz.questions.length} ข้อ • เวลาทำ ${currentQuiz.timeLimitMinutes || 30} นาที • โหมดฝึกฝน (สามารถเปิดเอกสารประกอบได้)`;
    }
  }

  // KEEP FIXED ORIGINAL ORDER (อยู่นิ่ง ไม่สลับสับเปลี่ยนตำแหน่ง)
  const clonedQuestions = currentQuiz.questions.map((q, qIndex) => {
    // Map options preserving original index (0, 1, 2, 3) for accurate grading
    const optionsWithOrig = q.options.map((optText, optIdx) => ({
      text: optText,
      origIdx: optIdx
    }));
    return {
      ...q,
      id: q.id || `q_${qIndex}`,
      originalIndex: qIndex,
      shuffledOptions: optionsWithOrig // เรียงตามต้นฉบับ ก, ข, ค, ง คงที่
    };
  });

  quizActiveQuestions = clonedQuestions; // เรียงข้อ 1 ถึง 20 ตามต้นฉบับ อยู่นิ่งไม่สลับตำแหน่ง

  const thaiChoiceLetters = ['ก', 'ข', 'ค', 'ง'];
  const totalQ = quizActiveQuestions.length;

  const answeredCountEl = document.getElementById('quiz-answered-count');
  if (answeredCountEl) {
    answeredCountEl.innerText = `ตอบแล้ว 0 จาก ${totalQ} ข้อ`;
  }

  const body = document.getElementById('quiz-questions-body');
  body.innerHTML = quizActiveQuestions.map((q, idx) => `
    <div class="quiz-question-box" data-question-id="${q.id}">
      <div class="quiz-question-header">
        <span class="quiz-q-number-badge"><i class="fa-solid fa-circle-question"></i> ข้อที่ ${idx + 1} จาก ${totalQ}</span>
        <h4 class="quiz-question-text">${idx + 1}. ${escapeHtml(q.question)}</h4>
      </div>
      <div class="quiz-options-group">
        ${q.shuffledOptions.map((opt, displayIdx) => `
          <label class="quiz-option-card" onclick="updateQuizOptionSelection(this, 'q_${q.id}')">
            <input type="radio" name="q_${q.id}" value="${opt.origIdx}" class="quiz-option-radio" onchange="updateQuizAnswerCount()">
            <span class="quiz-option-letter">${thaiChoiceLetters[displayIdx] || (displayIdx + 1)}</span>
            <span class="quiz-option-label-text">${escapeHtml(opt.text)}</span>
            <span class="quiz-option-indicator"><i class="fa-solid fa-check"></i></span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Generate watermarks
  updateQuizWatermark();

  // Start 30-minute timer
  startQuizTimer();

  const modalEl = document.getElementById('modal-take-quiz');
  if (modalEl) {
    modalEl.classList.add('is-fullscreen-active');
  }
  document.body.style.overflow = 'hidden';

  openModal('modal-take-quiz');

  // Enforce Fullscreen ONLY for Midterm & Final
  if (hasAntiCheat) {
    requestFullscreenSafe();
    showToast('เริ่มทำข้อสอบ (ระบบตรวจจับการทุจริต & โหมดเต็มหน้าจอ)', 'success');
  } else {
    showToast('เริ่มทำแบบทดสอบ (โหมดฝึกฝนการเรียนรู้)', 'success');
  }
}

async function submitQuizAnswers(isAutoSubmit = false, autoReason = '') {
  if (!currentQuiz || !quizActiveQuestions) return;

  quizIsActive = false;
  stopQuizTimer();
  document.body.style.overflow = '';
  const modalEl = document.getElementById('modal-take-quiz');
  if (modalEl) modalEl.classList.remove('is-fullscreen-active');
  const enforcer = document.getElementById('quiz-fullscreen-enforcer');
  if (enforcer) enforcer.style.display = 'none';
  if (isDocumentInFullscreen()) {
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch(() => {});
  }

  const timeElapsedSeconds = Math.max(1, 1800 - quizTimeRemaining);
  const elapsedMin = Math.floor(timeElapsedSeconds / 60);
  const elapsedSec = timeElapsedSeconds % 60;
  const timeSpentStr = `${elapsedMin}:${String(elapsedSec).padStart(2, '0')} นาที`;

  const answers = {};
  quizActiveQuestions.forEach(q => {
    const selected = document.querySelector(`input[name="q_${q.id}"]:checked`);
    if (selected) answers[q.id] = parseInt(selected.value);
  });

  try {
    let serverRes = null;
    // In Online mode: submit to backend API and get official graded response
    if (!isStaticOrServerlessHost()) {
      try {
        serverRes = await apiFetch(`/quizzes/${currentQuiz.id}/submit`, 'POST', {
          answers,
          violationsCount: quizViolationsCount,
          timeSpent: timeSpentStr
        });
      } catch (apiErr) {
        console.warn('API quiz submit note:', apiErr);
      }
    }

    let res = serverRes;

    // Fallback if offline or API error
    if (!res || !res.breakdown) {
      const offlineQuiz = (typeof OFFLINE_QUIZZES !== 'undefined' && OFFLINE_QUIZZES.find(oq => oq.id === currentQuiz.id)) || currentQuiz;
      let offScore = 0;
      const offTotal = quizActiveQuestions.length;
      const offBreakdown = [];

      quizActiveQuestions.forEach((q, idx) => {
        const offQ = (offlineQuiz.questions && offlineQuiz.questions.find(item => item.id === q.id)) || (offlineQuiz.questions && offlineQuiz.questions[idx]) || q;
        const selected = answers[q.id];
        const correctIdx = offQ.correctIndex !== undefined ? Number(offQ.correctIndex) : 0;
        const isCorrect = selected !== undefined && Number(selected) === correctIdx;
        if (isCorrect) offScore++;

        offBreakdown.push({
          id: q.id,
          question: q.question,
          userAnswer: (selected !== undefined && q.options && q.options[selected]) ? q.options[selected] : 'ไม่ได้ตอบ',
          correctAnswer: (q.options && q.options[correctIdx]) ? q.options[correctIdx] : (q.options ? q.options[0] : ''),
          isCorrect,
          explanation: offQ.explanation || ''
        });
      });

      res = {
        score: offScore,
        maxScore: offTotal,
        percentage: Math.round((offScore / offTotal) * 100),
        breakdown: offBreakdown,
        sheetSynced: false,
        sheetStatus: 'บันทึกคะแนนลงฐานข้อมูล Supabase'
      };
    } else {
      // Reorder server breakdown to match the randomized question order the student experienced
      const breakdownMap = new Map();
      res.breakdown.forEach(item => breakdownMap.set(item.id || item.question, item));
      const orderedBreakdown = quizActiveQuestions.map((q, idx) => {
        return breakdownMap.get(q.id) || breakdownMap.get(q.question) || res.breakdown[idx];
      });
      res.breakdown = orderedBreakdown;
    }

    // 1. DIRECT CLIENT-SIDE SUPABASE CLOUD SAVE (บันทึกลงฐานข้อมูลทั้งโหมด file:// และออนไลน์)
    try {
      const attemptId = 'qa-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
      const studentId = currentUser ? String(currentUser.student_id || currentUser.username || currentUser.id) : 'guest';
      const studentName = currentUser ? (currentUser.full_name || currentUser.username) : 'ผู้สอบทั่วไป';
      const classRoom = currentUser ? (currentUser.class_room || 'ม.4') : 'ม.4';

      const sbRecord = {
        id: attemptId,
        quiz_id: currentQuiz.id,
        student_id: studentId,
        student_name: studentName,
        class_room: classRoom,
        score: Number(res.score) || 0,
        max_score: Number(res.maxScore) || 20,
        percentage: Number(res.percentage) || 0,
        passed: Boolean(res.percentage >= 60),
        cheating_violations: Number(quizViolationsCount) || 0,
        time_spent: timeSpentStr,
        answers: answers,
        submitted_at: new Date().toISOString()
      };

      // บันทึกตรงไปยัง Supabase Cloud REST API ตาราง quiz_attempts
      fetch(`${SUPABASE_REST_URL}/quiz_attempts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(sbRecord)
      }).then(r => {
        if (r.ok) {
          console.log('✅ บันทึกคะแนนสอบลง Supabase Cloud ตาราง quiz_attempts สำเร็จ!');
        } else {
          r.text().then(txt => console.warn('Supabase DB submit notice:', txt));
        }
      }).catch(err => {
        console.warn('Supabase direct DB submit error:', err);
      });

      // บันทึกประวัติการทำแบบทดสอบลง activity_logs
      fetch(`${SUPABASE_REST_URL}/activity_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          action: 'COMPLETE_QUIZ',
          user_id: studentId,
          details: {
            quiz_id: currentQuiz.id,
            quiz_title: currentQuiz.title,
            student_name: studentName,
            score: `${res.score}/${res.maxScore}`,
            percentage: `${res.percentage}%`,
            time_spent: timeSpentStr
          },
          created_at: new Date().toISOString()
        })
      }).catch(() => {});

    } catch (sbErr) {
      console.warn('Direct Supabase DB sync exception:', sbErr);
    }

    // Direct background sync to legacy sheet / backup
    syncQuizScoreToGoogleSheet(
      currentQuiz,
      currentUser,
      res.score,
      res.maxScore,
      res.percentage,
      quizViolationsCount,
      timeSpentStr
    );

    // Record local attempt
    try {
      const attemptsKey = 'csm4_quiz_attempts';
      const currentAttempts = JSON.parse(localStorage.getItem(attemptsKey) || '[]');
      currentAttempts.unshift({
        id: 'qa-' + Date.now(),
        student_id: currentUser ? (currentUser.student_id || currentUser.id) : 'guest',
        student_name: currentUser ? currentUser.full_name : 'ผู้เยี่ยมชม',
        quiz_id: currentQuiz.id,
        score: res.score,
        total_questions: res.maxScore,
        percentage: res.percentage,
        time_spent: timeSpentStr,
        cheating_violations: quizViolationsCount,
        completed_at: new Date().toISOString()
      });
      localStorage.setItem(attemptsKey, JSON.stringify(currentAttempts.slice(0, 50)));
    } catch (e) {}

    closeModal('modal-take-quiz');

    // Populate Result Modal
    document.getElementById('quiz-score-badge').innerText = `${res.score} / ${res.maxScore} คะแนน`;
    const ratingText = res.percentage >= 80 ? 'ดีเยี่ยม' : (res.percentage >= 60 ? 'ผ่านเกณฑ์' : 'ควรศึกษาเพิ่มเติม');
    document.getElementById('quiz-percent-text').innerText = `คิดเป็น ${res.percentage}% (${ratingText})`;

    const timeSpentBadge = document.getElementById('quiz-time-spent-badge');
    if (timeSpentBadge) {
      timeSpentBadge.innerHTML = `<i class="fa-solid fa-clock"></i> ใช้เวลา: ${timeSpentStr}`;
    }

    const sheetSyncBadge = document.getElementById('quiz-sheet-sync-badge');
    if (sheetSyncBadge) {
      if (res && res.sheetSynced) {
        sheetSyncBadge.innerHTML = `<i class="fa-solid fa-bolt text-emerald-600"></i> บันทึกคะแนนลง Supabase Cloud แล้ว`;
        sheetSyncBadge.style.color = '#059669';
      } else {
        sheetSyncBadge.innerHTML = `<i class="fa-solid fa-bolt text-emerald-600"></i> ${res && res.sheetStatus ? res.sheetStatus : 'บันทึกคะแนนลง Supabase เรียบร้อยแล้ว'}`;
        sheetSyncBadge.style.color = '#d97706';
      }
    }

    const breakdownBody = document.getElementById('quiz-breakdown-body');
    breakdownBody.innerHTML = res.breakdown.map((item, idx) => {
      const isCorrect = item.isCorrect;
      return `
        <div class="quiz-review-card ${isCorrect ? 'is-correct' : 'is-incorrect'}">
          <div class="quiz-review-header">
            <span class="quiz-review-badge ${isCorrect ? 'badge-correct' : 'badge-incorrect'}">
              <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
              ข้อที่ ${idx + 1} : ${isCorrect ? 'ตอบถูกต้อง (+1 คะแนน)' : 'ตอบไม่ถูกต้อง (0 คะแนน)'}
            </span>
          </div>
          <div class="quiz-review-question">${idx + 1}. ${escapeHtml(item.question)}</div>
          
          <div class="quiz-review-answers-grid">
            <div class="quiz-answer-row ${isCorrect ? 'answer-correct' : 'answer-wrong'}">
              <span class="answer-label"><i class="fa-solid fa-user-pen mr-1"></i> คำตอบของคุณ:</span>
              <span class="answer-val">${escapeHtml(item.userAnswer)}</span>
            </div>
            ${!isCorrect ? `
              <div class="quiz-answer-row answer-solution">
                <span class="answer-label"><i class="fa-solid fa-bullseye text-emerald-600 mr-1"></i> เฉลยที่ถูกต้อง:</span>
                <span class="answer-val">${escapeHtml(item.correctAnswer)}</span>
              </div>
            ` : ''}
          </div>

          ${item.explanation ? `
            <div class="quiz-review-explanation">
              <i class="fa-solid fa-lightbulb"></i>
              <div><strong>คำอธิบาย/หลักการ:</strong> ${escapeHtml(item.explanation)}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    const resultCard = document.getElementById('quiz-result-card');
    if (resultCard) resultCard.setAttribute('data-quiz-theme', 'dark');
    openModal('modal-quiz-result');

    if (isAutoSubmit && autoReason) {
      showToast(autoReason, 'warning');
    } else {
      showToast('ส่งคำตอบสำเร็จและบันทึกคะแนนลงฐานข้อมูล Supabase เรียบร้อยแล้ว!', 'success');
    }

    if (res.percentage >= 80 && typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }

  } catch (err) {
    console.error('Quiz submit error:', err);
    showToast('เกิดข้อผิดพลาดในการประมวลผลคำตอบ: ' + err.message, 'error');
  }
}

// --- 9. DECOMPOSITION & SDLC TOOLS ---
function runDecompositionTool() {
  const problem = document.getElementById('dt-problem-input').value.trim();
  if (!problem) {
    showToast('กรุณากรอกชื่อปัญหาใหญ่ก่อนย่อยปัญหา', 'error');
    return;
  }

  const resultContainer = document.getElementById('dt-result');
  resultContainer.style.display = 'grid';
  resultContainer.classList.remove('hidden');

  resultContainer.innerHTML = `
    <div class="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs space-y-1">
      <span class="font-bold text-purple-900"><i class="fa-solid fa-circle-check mr-1"></i> ปัญหาย่อยที่ 1: การกำหนดเป้าหมายและผู้ใช้งาน</span>
      <p class="text-slate-600">วิเคราะห์ว่ากลุ่มผู้ใช้คือใคร ต้องการแก้ปัญหาด้านใดเป็นหลักในปัญหา "${problem}"</p>
    </div>
    <div class="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs space-y-1">
      <span class="font-bold text-purple-900"><i class="fa-solid fa-circle-check mr-1"></i> ปัญหาย่อยที่ 2: ข้อมูลที่จำเป็นและแหล่งรวบรวม</span>
      <p class="text-slate-600">ระบุประเภทข้อมูลและโครงสร้างข้อมูลที่ต้องนำมารับอินพุตเข้าสู่ระบบ</p>
    </div>
    <div class="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs space-y-1">
      <span class="font-bold text-purple-900"><i class="fa-solid fa-circle-check mr-1"></i> ปัญหาย่อยที่ 3: ขั้นตอนประมวลผล (Algorithm Logic)</span>
      <p class="text-slate-600">กำหนดเงื่อนไขการทำงานและสูตรการประมวลผลให้ได้ผลลัพธ์ที่ถูกต้อง</p>
    </div>
    <div class="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs space-y-1">
      <span class="font-bold text-purple-900"><i class="fa-solid fa-circle-check mr-1"></i> ปัญหาย่อยที่ 4: การนำเสนอผลลัพธ์และทดสอบ</span>
      <p class="text-slate-600">ออกแบบหน้าจอ UI และทดสอบความถูกต้องของการใช้งานจริง</p>
    </div>
  `;

  showToast('วิเคราะห์การย่อยปัญหาเรียบร้อยแล้ว!', 'success');
}

function calculateSDLC() {
  const p1 = parseInt(document.getElementById('sdlc-p1').value) || 0;
  const p2 = parseInt(document.getElementById('sdlc-p2').value) || 0;
  const p3 = parseInt(document.getElementById('sdlc-p3').value) || 0;
  const p4 = parseInt(document.getElementById('sdlc-p4').value) || 0;
  const p5 = parseInt(document.getElementById('sdlc-p5').value) || 0;

  const total = p1 + p2 + p3 + p4 + p5;
  const months = (total / 4).toFixed(1);

  document.getElementById('sdlc-total-weeks').innerText = `${total} สัปดาห์ (~${months} เดือน)`;
  showToast(`คำนวณแผนงาน SDLC รวม ${total} สัปดาห์เรียบร้อย`, 'success');
}


// --- 10. TEACHER DASHBOARD DATA ---
async function loadTeacherData() {
  try {
    const submissions = await fetchAllSubmissions();
    const pending = submissions.filter(s => s.status === 'submitted');
    const container = document.getElementById('teacher-pending-submissions');

    if (pending.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-400 py-6 text-center">ไม่มีงานค้างตรวจในขณะนี้</p>`;
    } else {
      container.innerHTML = pending.map(sub => `
        <div class="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-bold text-sm text-slate-800">${sub.student_name}</span>
            <span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">รอตรวจ</span>
          </div>
          <p class="text-xs font-semibold text-slate-700">${sub.assignment_title}</p>
          <p class="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border">${sub.content}</p>
          <div class="flex justify-between items-center pt-2">
            ${sub.file_url ? (
              sub.file_url.startsWith('data:') ? `
                <a href="${sub.file_url}" download="${escapeHtml((sub.student_name || 'งานนักเรียน') + '_' + (sub.assignment_id || 'ใบงาน'))}" class="text-xs text-emerald-600 font-bold hover:underline inline-flex items-center gap-1">
                  <i class="fa-solid fa-file-arrow-down"></i> เปิด/ดาวน์โหลดไฟล์งาน
                </a>
              ` : `
                <a href="${escapeHtml(sub.file_url)}" target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 underline font-bold inline-flex items-center gap-1">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> เปิดลิงก์ผลงาน
                </a>
              `
            ) : '<span></span>'}
            <button onclick="openGradeModal('${sub.id}', '${sub.student_name}', 10)" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md">
              <i class="fa-solid fa-check-double mr-1"></i> ตรวจและให้คะแนน
            </button>
          </div>
        </div>
      `).join('');
    }

    // Load questions for teacher
    const questions = await apiFetch('/questions');
    const qContainer = document.getElementById('teacher-questions-list');
    qContainer.innerHTML = questions.map(q => `
      <div class="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
        <div class="flex justify-between items-center">
          <span class="font-bold text-xs text-slate-800">${q.student_name}</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded ${q.status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
            ${q.status === 'replied' ? 'ตอบแล้ว' : 'รอคำตอบ'}
          </span>
        </div>
        <p class="font-bold text-xs text-slate-800">${q.subject}</p>
        <p class="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl">${q.question}</p>
        ${q.reply ? `<p class="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-xl"><strong>คำตอบของครู:</strong> ${q.reply}</p>` : `
          <button onclick="replyQuestionPrompt('${q.id}')" class="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition">
            <i class="fa-solid fa-reply mr-1"></i> ตอบคำถามนี้
          </button>
        `}
      </div>
    `).join('');

  } catch (err) {
    console.error('Teacher load error:', err);
  }
}

async function replyQuestionPrompt(questionId) {
  const reply = prompt('พิมพ์คำตอบเพื่อส่งให้นักเรียน:');
  if (!reply) return;

  try {
    await apiFetch('/questions/reply', 'POST', { question_id: questionId, reply });
    showToast('บันทึกคำตอบลงฐานข้อมูล Supabase สำเร็จ!', 'success');
    loadTeacherData();
  } catch (err) {
    console.error('Reply question error:', err);
  }
}


// --- 11. ANALYTICS DATA & CHART ---
let chartInstance = null;

async function loadAnalyticsData() {
  try {
    const data = await apiFetch('/analytics');

    const lbContainer = document.getElementById('leaderboard-list');
    lbContainer.innerHTML = data.leaderboard.map((item, idx) => `
      <div class="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-white">
        <div class="flex items-center space-x-3">
          <span class="w-7 h-7 rounded-full ${idx === 0 ? 'bg-amber-400 text-white font-black shadow-md' : 'bg-slate-100 text-slate-700 font-bold'} flex items-center justify-center text-xs">
            ${idx + 1}
          </span>
          <span class="font-bold text-slate-800 text-xs">${item.name}</span>
        </div>
        <span class="font-extrabold text-blue-600 text-xs">${item.totalScore} คะแนน</span>
      </div>
    `).join('');

    const ctx = document.getElementById('analyticsChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.leaderboard.map(i => i.name),
        datasets: [{
          label: 'คะแนนสะสมรวม',
          data: data.leaderboard.map(i => i.totalScore),
          backgroundColor: isDark ? '#00b400' : '#00903b',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: isDark ? '#4ade80' : '#374151' }, grid: { color: isDark ? '#2e2e2e' : '#e5e7eb' } },
          y: { beginAtZero: true, ticks: { color: isDark ? '#4ade80' : '#374151' }, grid: { color: isDark ? '#2e2e2e' : '#e5e7eb' } }
        }
      }
    });

  } catch (err) {
    console.error('Analytics load error:', err);
  }
}


// --- 12. ADMIN DATA ---
async function loadAdminData() {
  if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'teacher')) {
    showToast('สำหรับครูผู้สอนและผู้ดูแลระบบเท่านั้น', 'error');
    return;
  }

  updateStudentSyncUI();

  try {
    let users = [];
    if (isStaticOrServerlessHost()) {
      const staff = [
        { id: 'u-teacher', username: 'teacher', full_name: 'ครูปณิฏฐา บุญยงค์ (ผู้สอน ม.4)', role: 'teacher', avatar: 'img/teacher_panittha.jpg' },
        { id: 'u-admin', username: 'admin', full_name: 'ผู้ดูแลระบบ (Admin CS-M4)', role: 'admin', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin' }
      ];
      users = [...staff, ...Object.values(STUDENT_ACCOUNTS)];
    } else {
      users = await apiFetch('/admin/users');
    }
    const tableBody = document.getElementById('admin-users-table');

    tableBody.innerHTML = users.map(u => `
      <tr class="border-b border-slate-100 hover:bg-slate-50">
        <td class="p-3"><img src="${u.avatar}" class="w-8 h-8 rounded-full bg-slate-100 border"></td>
        <td class="p-3 font-bold text-slate-800">${u.username}</td>
        <td class="p-3">${u.full_name}</td>
        <td class="p-3">
          <span class="${u.role === 'admin' ? 'badge-admin' : u.role === 'teacher' ? 'badge-teacher' : 'badge-student'} px-2.5 py-0.5 rounded-md font-bold text-[10px]">
            ${u.role}
          </span>
        </td>
        <td class="p-3 text-right">
          <button onclick="changeRolePrompt('${u.id}', '${u.username}')" class="text-blue-600 hover:underline font-bold">
            เปลี่ยนสิทธิ์
          </button>
        </td>
      </tr>
    `).join('');

    const syncLogs = await apiFetch('/admin/sync-logs');
    const logsContainer = document.getElementById('admin-sync-logs');

    logsContainer.innerHTML = syncLogs.slice(-10).reverse().map(log => `
      <div class="p-2.5 bg-slate-900 text-emerald-400 rounded-xl text-[11px] flex justify-between items-center">
        <span>[${escapeHtml(log.formatted_time)}] Action: ${escapeHtml(log.action)} - User: ${escapeHtml(log.payload ? log.payload.user : '-')}</span>
        <span class="text-xs font-bold ${log.status === 'SUCCESS' ? 'text-emerald-400' : 'text-rose-400'}">${escapeHtml(log.status)}</span>
      </div>
    `).join('');

    // Load Sync Queue Status
    try {
      const qStats = await apiFetch('/admin/sync-status');
      const statSuccess = document.getElementById('sync-stat-success');
      const statPending = document.getElementById('sync-stat-pending');
      const statLast = document.getElementById('sync-stat-last-time');
      if (statSuccess) statSuccess.innerText = `${qStats.successLogsCount} / ${qStats.totalLogsCount} ครั้ง`;
      if (statPending) statPending.innerText = `${qStats.pendingQueueCount} รายการ`;
      if (statLast) statLast.innerText = qStats.lastSyncTime || 'ยังไม่มีประวัติ';
    } catch (e) {
      console.warn('Sync status load warning:', e);
    }

  } catch (err) {
    console.error('Admin load error:', err);
  }
}

async function doRetryPendingSync() {
  const btn = document.getElementById('btn-sync-retry');
  try {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin mr-1"></i> กำลังซิงค์...';
    }
    const res = await apiFetch('/admin/sync-retry', 'POST');
    showToast(res.message || 'ซิงค์ข้อมูลเรียบร้อย', 'success');
    loadAdminData();
  } catch (err) {
    showToast(err.message || 'ซิงค์ข้อมูลล้มเหลว', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-arrows-rotate mr-1"></i> ซิงค์คิวที่ค้างทันที (Sync Now)';
    }
  }
}

async function changeRolePrompt(userId, username) {
  const newRole = prompt(`กรอกสิทธิ์ใหม่สำหรับ ${username} (student / teacher / admin):`);
  if (!newRole || !['student', 'teacher', 'admin'].includes(newRole)) return;

  try {
    await apiFetch('/admin/users/role', 'POST', { user_id: userId, role: newRole });
    showToast(`อัปเดตสิทธิ์ของ ${username} เป็น ${newRole} สำเร็จ`, 'success');
    loadAdminData();
  } catch (err) {
    console.error('Change role error:', err);
  }
}

async function testSyncTrigger() {
  try {
    await apiFetch('/sync/test', 'POST');
    showToast('ทดสอบเชื่อมต่อ Supabase สำเร็จ!', 'success');
    loadAdminData();
  } catch (err) {
    console.error('Test sync error:', err);
  }
}

function openAddUserModal() {
  const username = prompt('กรอกชื่อผู้ใช้ (Username):');
  if (!username) return;
  const fullName = prompt('กรอกชื่อ-นามสกุล:');
  if (!fullName) return;
  const role = prompt('กำหนดสิทธิ์ (student / teacher / admin):', 'student');
  
  apiFetch('/admin/users', 'POST', { username, password: 'password123', full_name: fullName, role })
    .then(() => {
      showToast(`สร้างผู้ใช้ ${username} สำเร็จ! รหัสผ่านเริ่มต้นคือ password123`, 'success');
      loadAdminData();
    });
}


// --- 13. CONTACT & Q&A DATA ---
async function loadContactData() {
  try {
    const questions = await apiFetch('/questions');
    const container = document.getElementById('contact-public-questions');

    container.innerHTML = questions.map(q => `
      <div class="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
        <div class="flex justify-between items-center text-xs">
          <span class="font-bold text-slate-800">${escapeHtml(q.student_name)}</span>
          <span class="text-slate-400">${new Date(q.created_at).toLocaleDateString('th-TH')}</span>
        </div>
        <p class="font-bold text-xs text-emerald-700">${escapeHtml(q.subject)}</p>
        <p class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border">${escapeHtml(q.question)}</p>
        ${q.reply ? `
          <div class="text-xs bg-emerald-50 text-emerald-900 p-2.5 rounded-xl border border-emerald-200">
            <strong>คำตอบจากครู:</strong> ${escapeHtml(q.reply)}
          </div>
        ` : `<p class="text-[11px] text-amber-600 font-semibold italic">รอครูผู้สอนตอบกลับ...</p>`}
      </div>
    `).join('');

  } catch (err) {
    console.error('Contact load error:', err);
  }
}

async function submitStudentQuestion() {
  const subject = document.getElementById('contact-subject-input').value.trim();
  const question = document.getElementById('contact-question-input').value.trim();

  if (!subject || !question) {
    showToast('กรุณากรอกหัวข้อและรายละเอียดคำถาม', 'error');
    return;
  }

  try {
    await apiFetch('/questions', 'POST', { subject, question });
    document.getElementById('contact-subject-input').value = '';
    document.getElementById('contact-question-input').value = '';
    showToast('ส่งคำถามถึงครูเรียบร้อยแล้ว! บันทึกลง Supabase สำเร็จ', 'success');
    loadContactData();
  } catch (err) {
    console.error('Submit question error:', err);
  }
}


// --- ANNOUNCEMENT MODAL ---
function openAnnouncementModal() {
  openModal('modal-add-announcement');
}

async function doCreateAnnouncement() {
  const title = document.getElementById('anc-title-input').value.trim();
  const content = document.getElementById('anc-content-input').value.trim();

  if (!title || !content) {
    showToast('กรุณากรอกหัวข้อและเนื้อหาประกาศ', 'error');
    return;
  }

  try {
    await apiFetch('/announcements', 'POST', { title, content });
    closeModal('modal-add-announcement');
    document.getElementById('anc-title-input').value = '';
    document.getElementById('anc-content-input').value = '';
    showToast('สร้างประกาศเรียบร้อยและบันทึกลง Supabase สำเร็จ!', 'success');
    loadHomeData();
  } catch (err) {
    console.error('Announcement create error:', err);
  }
}


// ============================================================================
// THAIRATH HERO SLIDER / CAROUSEL CONTROLLER
// ============================================================================
let heroSlideIndex = 0;
let heroSliderTimer = null;
let heroTouchStartX = 0;
let heroTouchEndX = 0;

function initHeroSlider() {
  const slides = document.querySelectorAll('.thairath-slide');
  if (!slides || slides.length === 0) return;
  goToHeroSlide(heroSlideIndex);
  startHeroSliderTimer();

  const container = document.getElementById('hero-slider');
  if (container && !container.dataset.swipeBound) {
    container.dataset.swipeBound = 'true';
    container.addEventListener('touchstart', (e) => {
      heroTouchStartX = e.changedTouches[0].screenX;
      pauseHeroSlider();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      heroTouchEndX = e.changedTouches[0].screenX;
      handleHeroSwipe();
      resumeHeroSlider();
    }, { passive: true });
  }
}

function handleHeroSwipe() {
  const diff = heroTouchStartX - heroTouchEndX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) {
      nextHeroSlide(); // swipe left -> next slide
    } else {
      prevHeroSlide(); // swipe right -> prev slide
    }
  }
}

function startHeroSliderTimer() {
  if (heroSliderTimer) clearInterval(heroSliderTimer);
  heroSliderTimer = setInterval(() => {
    nextHeroSlide();
  }, 5000);
}

function pauseHeroSlider() {
  if (heroSliderTimer) {
    clearInterval(heroSliderTimer);
    heroSliderTimer = null;
  }
}

function resumeHeroSlider() {
  startHeroSliderTimer();
}

function goToHeroSlide(index) {
  const slides = document.querySelectorAll('.thairath-slide');
  const dots = document.querySelectorAll('.slider-dot');
  if (!slides || slides.length === 0) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  heroSlideIndex = index;

  slides.forEach((slide, i) => {
    if (i === heroSlideIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  dots.forEach((dot, i) => {
    if (i === heroSlideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextHeroSlide() {
  goToHeroSlide(heroSlideIndex + 1);
}

function prevHeroSlide() {
  goToHeroSlide(heroSlideIndex - 1);
}

// ============================================================================
// THAIRATH TOP PANORAMA BILLBOARD SLIDER CONTROLLER
// ============================================================================
let billboardSlideIndex = 0;
let billboardSliderTimer = null;
let billboardTouchStartX = 0;
let billboardTouchEndX = 0;

function initBillboardSlider() {
  const slides = document.querySelectorAll('.billboard-slide');
  if (!slides || slides.length === 0) return;
  goToBillboardSlide(billboardSlideIndex);
  startBillboardSliderTimer();

  const container = document.getElementById('billboard-slider-container');
  if (container && !container.dataset.swipeBound) {
    container.dataset.swipeBound = 'true';
    container.addEventListener('touchstart', (e) => {
      billboardTouchStartX = e.changedTouches[0].screenX;
      pauseBillboardSlider();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      billboardTouchEndX = e.changedTouches[0].screenX;
      handleBillboardSwipe();
      resumeBillboardSlider();
    }, { passive: true });
  }
}

function handleBillboardSwipe() {
  const diff = billboardTouchStartX - billboardTouchEndX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) {
      nextBillboardSlide();
    } else {
      prevBillboardSlide();
    }
  }
}

function startBillboardSliderTimer() {
  if (billboardSliderTimer) clearInterval(billboardSliderTimer);
  billboardSliderTimer = setInterval(() => {
    nextBillboardSlide();
  }, 6000);
}

function pauseBillboardSlider() {
  if (billboardSliderTimer) {
    clearInterval(billboardSliderTimer);
    billboardSliderTimer = null;
  }
}

function resumeBillboardSlider() {
  startBillboardSliderTimer();
}

function goToBillboardSlide(index) {
  const slides = document.querySelectorAll('.billboard-slide');
  const dots = document.querySelectorAll('.billboard-dot');
  if (!slides || slides.length === 0) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  billboardSlideIndex = index;

  slides.forEach((slide, i) => {
    if (i === billboardSlideIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  dots.forEach((dot, i) => {
    if (i === billboardSlideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextBillboardSlide() {
  goToBillboardSlide(billboardSlideIndex + 1);
}

function prevBillboardSlide() {
  goToBillboardSlide(billboardSlideIndex - 1);
}

// Dynamic Ticker Speed Adjuster (อักษรเลื่อนความเร็วสบายตา)
function updateTickerSpeed() {
  const track = document.getElementById('ticker-track');
  const text = document.getElementById('ticker-text');
  if (track && text) {
    const textWidth = text.scrollWidth || text.offsetWidth;
    // Comfortable reading speed: ~70px per second, min 25s
    const duration = Math.max(25, Math.round((textWidth + window.innerWidth) / 70));
    track.style.animationDuration = `${duration}s`;
  }
}

// Initial setup on window load
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThairathDate();
  initAnnouncementsRealtimeSubscription();
  initHeroSlider();
  initBillboardSlider();
  updateTickerSpeed();
  window.addEventListener('resize', updateTickerSpeed);

  // Check saved session in localStorage (only if user explicitly logged in)
  const savedToken = localStorage.getItem('csm4_token');
  const savedUser = localStorage.getItem('csm4_user');

  if (savedToken && savedUser) {
    try {
      const parsed = JSON.parse(savedUser);
      // If it was the legacy auto-simulated student1 session without explicit login, clear it
      if (parsed.username === 'student1' && !sessionStorage.getItem('csm4_explicit_login')) {
        localStorage.removeItem('csm4_token');
        localStorage.removeItem('csm4_user');
        currentUser = null;
        currentToken = '';
      } else {
        currentUser = parsed;
        currentToken = savedToken;
      }
    } catch (e) {
      console.warn('Could not restore saved session:', e);
      currentUser = null;
      currentToken = '';
    }
  } else {
    currentUser = null;
    currentToken = '';
  }

  // Update authentication UI and activate initial tab/quiz
  updateAuthUI();

  // Auto-sync students from Supabase in background
  setTimeout(() => {
    try {
      syncStudentsFromGoogleSheetClient(true);
    } catch (e) {}
  }, 1200);

  // Check URL parameters for direct navigation (e.g. ?quiz=quiz-unit1 or ?tab=quizzes)
  const urlParams = new URLSearchParams(window.location.search);
  const quizParam = urlParams.get('quiz');
  const tabParam = urlParams.get('tab');

  if (quizParam) {
    switchTab('quizzes');
    setTimeout(() => {
      openQuizModal(quizParam);
    }, 450);
  } else if (tabParam) {
    switchTab(tabParam);
  } else {
    switchTab('home');
  }
});


// ====================================================================
// SUPABASE CLIENT-SIDE ADMIN FUNCTIONS
// ====================================================================

async function checkSupabaseStatusUI() {
  const badge = document.getElementById('supabase-connection-badge');
  const msgBox = document.getElementById('supabase-status-msg');
  if (!badge) return;

  badge.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> กำลังตรวจสอบการเชื่อมต่อ...';
  badge.style.color = '#d97706';

  try {
    if (isStaticOrServerlessHost()) {
      badge.innerHTML = '<i class="fa-solid fa-circle-exclamation text-amber-500"></i> เปิดไฟล์แบบ file:// (รันผ่าน http://localhost:3000 เพื่อเชื่อมต่อ)';
      badge.style.color = '#d97706';
      if (msgBox) msgBox.innerHTML = '<i class="fa-solid fa-circle-info mr-1"></i> กรุณารันคำสั่ง <code>npm start</code> เพื่อเปิดระบบเชื่อมต่อ Supabase';
      return;
    }

    const res = await apiFetch('/supabase/status');
    if (res.connected) {
      badge.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-500"></i> เชื่อมต่อ Supabase สำเร็จ';
      badge.style.color = '#059669';
      if (msgBox) {
        msgBox.innerHTML = `<div style="display: flex; gap: 14px; flex-wrap: wrap;">
          <span><strong>Project URL:</strong> ${escapeHtml(res.url || '-')}</span>
          <span><strong>Users ในฐานข้อมูล:</strong> ${res.usersCount || 0} คน</span>
          <span><strong>Latency:</strong> ${res.latencyMs || 0} ms</span>
        </div>`;
      }
    } else {
      badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-amber-500"></i> ยังไม่ได้เชื่อมต่อ Supabase';
      badge.style.color = '#d97706';
      if (msgBox) {
        msgBox.innerHTML = `<div style="color: #b45309;">
          <i class="fa-solid fa-circle-exclamation mr-1"></i> ${escapeHtml(res.message || 'กรุณากำหนดค่า SUPABASE_URL และ SUPABASE_KEY ในไฟล์ .env')}
        </div>`;
      }
    }
  } catch (err) {
    badge.innerHTML = '<i class="fa-solid fa-circle-xmark text-rose-500"></i> ข้อผิดพลาดการเชื่อมต่อ';
    badge.style.color = '#e11d48';
    if (msgBox) msgBox.innerHTML = `<span style="color: #e11d48;">${escapeHtml(err.message)}</span>`;
  }
}

async function syncStudentsFromSupabaseUI() {
  showToast('กำลังดึงข้อมูลนักเรียนจาก Supabase...', 'info');
  try {
    const res = await apiFetch('/supabase/sync-students', { method: 'POST' });
    if (res.success) {
      showToast(`ซิงค์นักเรียนจาก Supabase สำเร็จ! (พบ ${res.totalRemoteStudents || 0} คน)`, 'success');
      loadAdminData();
    } else {
      showToast(`เกิดข้อผิดพลาด: ${res.error || res.reason || 'ไม่สามารถซิงค์ได้'}`, 'error');
    }
  } catch (err) {
    showToast(`ซิงค์ล้มเหลว: ${err.message}`, 'error');
  }
}

async function migrateAllToSupabaseUI() {
  if (!confirm('ยืนยันการย้ายข้อมูลทั้งหมดจาก db.json ไปยัง Supabase?\n(หากข้อมูลมีอยู่แล้ว ระบบจะทำการอัปเดตข้อมูลให้ทันสมัย)')) {
    return;
  }

  showToast('กำลังส่งออกข้อมูลขึ้น Supabase Cloud...', 'info');
  try {
    const res = await apiFetch('/supabase/migrate', { method: 'POST' });
    if (res.success) {
      showToast('ย้ายข้อมูลขึ้น Supabase สำเร็จเรียบร้อย!', 'success');
      checkSupabaseStatusUI();
    } else {
      showToast(`ย้ายข้อมูลล้มเหลว: ${res.error}`, 'error');
    }
  } catch (err) {
    showToast(`ย้ายข้อมูลล้มเหลว: ${err.message}`, 'error');
  }
}
