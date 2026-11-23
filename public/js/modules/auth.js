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

    // Toggle teacher / admin tabs in top navigation
    const navTeacherLi = document.getElementById('nav-teacher-li');
    if (navTeacherLi) {
      navTeacherLi.style.display = (currentUser.role === 'teacher' || currentUser.role === 'admin') ? 'inline-block' : 'none';
    }
    const navAdminLi = document.getElementById('nav-admin-li');
    if (navAdminLi) {
      navAdminLi.style.display = (currentUser.role === 'admin') ? 'inline-block' : 'none';
    }

    // Update Student Personalized Hub Banner (Logged In)
    const bannerIcon = document.getElementById('student-banner-icon');
    const bannerBadge = document.getElementById('student-banner-badge');
    const bannerTitle = document.getElementById('student-banner-title');
    const bannerSub = document.getElementById('student-banner-sub');
    const bannerActions = document.getElementById('student-banner-actions');
    const mNavProfileText = document.getElementById('m-nav-profile-text');

    if (bannerIcon) bannerIcon.innerText = currentUser.role === 'student' ? '👋' : '👨‍🏫';
    if (bannerBadge) {
      bannerBadge.innerText = currentUser.role === 'student' 
        ? `นักเรียนห้อง ${currentUser.class_room || 'ม.4'} • เลขประจำตัว ${currentUser.username}`
        : `บัญชี${currentUser.role === 'teacher' ? 'ครูผู้สอน' : 'ผู้ดูแลระบบ'}`;
      bannerBadge.style.background = currentUser.role === 'student' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(59, 130, 246, 0.25)';
      bannerBadge.style.color = currentUser.role === 'student' ? '#6ee7b7' : '#93c5fd';
    }
    if (bannerTitle) {
      bannerTitle.innerText = `ยินดีต้อนรับ, ${currentUser.full_name}`;
    }
    if (bannerSub) {
      bannerSub.innerText = currentUser.role === 'student'
        ? `พร้อมเริ่มบทเรียน ทำใบงาน หรือเข้าสอบออนไลน์ได้ทันที ตรวจสอบผลคะแนนได้ตลอดเวลา`
        : `คุณกำลังเข้าสู่ระบบในฐานะ${currentUser.role === 'teacher' ? 'ครูผู้สอน' : 'ผู้ดูแลระบบ'} สามารถจัดการคะแนนและตรวจงานได้ที่เมนูระบบจัดการ`;
    }
    if (bannerActions) {
      if (currentUser.role === 'student') {
        bannerActions.innerHTML = `
          <button type="button" onclick="switchTab('analytics')" class="btn" style="background: rgba(255,255,255,0.15); color: #ffffff; font-weight: 700; padding: 10px 18px; border-radius: 12px; font-size: 0.88rem; border: 1px solid rgba(255,255,255,0.25); cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-chart-line text-emerald-400"></i> ดูคะแนนของฉัน
          </button>
          <button type="button" onclick="logout()" class="btn" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; font-weight: 700; padding: 10px 14px; border-radius: 12px; font-size: 0.88rem; border: 1px solid rgba(239, 68, 68, 0.4); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="ออกจากระบบ">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> ออกจากระบบ
          </button>
        `;
      } else {
        bannerActions.innerHTML = `
          <button type="button" onclick="switchTab('teacher')" class="btn" style="background: #10b981; color: #ffffff; font-weight: 700; padding: 10px 18px; border-radius: 12px; font-size: 0.88rem; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35);">
            <i class="fa-solid fa-chalkboard-user"></i> แดชบอร์ดครูผู้สอน
          </button>
        `;
      }
    }
    if (mNavProfileText) {
      mNavProfileText.innerText = currentUser.class_room ? currentUser.class_room : (currentUser.role === 'student' ? 'นักเรียน' : 'ครู');
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

    const navTeacherLi = document.getElementById('nav-teacher-li');
    if (navTeacherLi) navTeacherLi.style.display = 'none';
    const navAdminLi = document.getElementById('nav-admin-li');
    if (navAdminLi) navAdminLi.style.display = 'none';

    // Reset Student Personalized Hub Banner (Guest)
    const bannerIcon = document.getElementById('student-banner-icon');
    const bannerBadge = document.getElementById('student-banner-badge');
    const bannerTitle = document.getElementById('student-banner-title');
    const bannerSub = document.getElementById('student-banner-sub');
    const bannerActions = document.getElementById('student-banner-actions');
    const mNavProfileText = document.getElementById('m-nav-profile-text');

    if (bannerIcon) bannerIcon.innerText = '🎓';
    if (bannerBadge) {
      bannerBadge.innerText = 'ระบบการเรียนรู้ออนไลน์ ม.4';
      bannerBadge.style.background = 'rgba(16, 185, 129, 0.25)';
      bannerBadge.style.color = '#6ee7b7';
    }
    if (bannerTitle) bannerTitle.innerText = 'ศูนย์การเรียนรู้วิทยาการคำนวณ ม.4 (CS-M4)';
    if (bannerSub) bannerSub.innerText = 'เลือก 5 เมนูหลักด้านล่าง เพื่อเข้าสู่บทเรียน ทำใบงาน ส่งการบ้าน หรือทำแบบทดสอบได้ทันทีในคลิกเดียว';
    if (bannerActions) {
      bannerActions.innerHTML = `
        <button type="button" onclick="openLoginModal()" id="btn-banner-login" class="btn" style="background: #10b981; color: #ffffff; font-weight: 700; padding: 10px 20px; border-radius: 12px; font-size: 0.9rem; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35); display: inline-flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-arrow-right-to-bracket"></i> เข้าสู่ระบบนักเรียน (เลข 5 หลัก)
        </button>
      `;
    }
    if (mNavProfileText) {
      mNavProfileText.innerText = 'เข้าสู่ระบบ';
    }
  }

  // Hide Management Menu from Students and Guests to keep Top Nav clean & professional
  const mgmtNav = document.getElementById('nav-group-management-li');
  if (mgmtNav) {
    mgmtNav.style.display = (currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin')) ? 'block' : 'none';
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

// ==========================================
// SECURE AUTHENTICATION (SALTED SHA-256 HASH)
// ==========================================
const AUTH_SALT = 'csm4_wny_salt_2026_teacher_auth';
const TEACHER_AUTH_HASH = 'e3e18a24113d8c724734a52c7d05303faf4c929795297a6c756c16119c1a1242';
const ADMIN_AUTH_HASH = '36d34632f21cbe0b789a54bd3847d44a87137b14d36259e34686dbfc0a963017';

async function computeSha256(text) {
  if (typeof crypto !== 'undefined' && crypto.subtle && typeof TextEncoder !== 'undefined') {
    const data = new TextEncoder().encode(text);
    const hashBuf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  return '';
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
        const inputHash = await computeSha256(AUTH_SALT + (password || '').trim());
        const customTeacherHash = localStorage.getItem('csm4_teacher_custom_hash');
        const customAdminHash = localStorage.getItem('csm4_admin_custom_hash');

        let isValid = false;
        if (username === 'teacher') {
          isValid = inputHash === (customTeacherHash || TEACHER_AUTH_HASH);
        } else if (username === 'admin') {
          isValid = inputHash === (customAdminHash || ADMIN_AUTH_HASH);
        }

        if (isValid) {
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

    studentQuizAttemptsCache = null;
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
  studentQuizAttemptsCache = null;
  updateAuthUI();
  showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
  if (activeTab === 'teacher' || activeTab === 'admin') {
    switchTab('home');
  } else {
    switchTab(activeTab);
  }
}

// Quick Switch Role (safe compatibility helper)
async function quickSwitchRole(role) {
  if (role === 'teacher' || role === 'admin') {
    openLoginModal();
    const uInput = document.getElementById('login-username');
    if (uInput) {
      uInput.value = role;
      const pInput = document.getElementById('login-password');
      if (pInput) pInput.focus();
    }
    return;
  }
  const defaultStudent = typeof STUDENT_ACCOUNTS !== 'undefined' ? Object.keys(STUDENT_ACCOUNTS)[0] || '10101' : '10101';
  await handleLogin(defaultStudent, defaultStudent);
}



// ==========================================
// TEACHER / ADMIN PASSWORD MANAGEMENT
// ==========================================
function openChangePasswordModal() {
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
    showToast('กรุณาเข้าสู่ระบบด้วยบัญชีครูหรือแอดมินก่อนดำเนินการ', 'error');
    return;
  }
  const form = document.getElementById('form-change-password');
  if (form) form.reset();
  const errMsg = document.getElementById('change-pwd-error-msg');
  if (errMsg) errMsg.style.display = 'none';
  openModal('modal-change-password');
  setTimeout(() => {
    const currInput = document.getElementById('input-curr-pwd');
    if (currInput) currInput.focus();
  }, 100);
}

async function handleChangePasswordSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
    showToast('ไม่มีสิทธิ์เข้าถึงฟังก์ชันนี้', 'error');
    return;
  }

  const currInput = document.getElementById('input-curr-pwd');
  const newInput = document.getElementById('input-new-pwd');
  const confirmInput = document.getElementById('input-confirm-pwd');
  const errMsg = document.getElementById('change-pwd-error-msg');
  const errText = document.getElementById('change-pwd-error-text');
  const submitBtn = document.getElementById('btn-submit-change-pwd');

  const currPwd = (currInput ? currInput.value : '').trim();
  const newPwd = (newInput ? newInput.value : '').trim();
  const confirmPwd = (confirmInput ? confirmInput.value : '').trim();

  const showError = (msg) => {
    if (errText) errText.textContent = msg;
    if (errMsg) errMsg.style.display = 'flex';
  };

  if (errMsg) errMsg.style.display = 'none';

  if (!currPwd) {
    showError('กรุณากรอกรหัสผ่านปัจจุบัน');
    if (currInput) currInput.focus();
    return;
  }
  if (!newPwd || newPwd.length < 6) {
    showError('รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
    if (newInput) newInput.focus();
    return;
  }
  if (newPwd !== confirmPwd) {
    showError('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน');
    if (confirmInput) confirmInput.focus();
    return;
  }

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-1"></i> กำลังบันทึก...';
    }

    const currentHash = await computeSha256(AUTH_SALT + currPwd);
    const storageKey = currentUser.role === 'admin' ? 'csm4_admin_custom_hash' : 'csm4_teacher_custom_hash';
    const defaultHash = currentUser.role === 'admin' ? ADMIN_AUTH_HASH : TEACHER_AUTH_HASH;
    const expectedHash = localStorage.getItem(storageKey) || defaultHash;

    if (currentHash !== expectedHash) {
      showError('รหัสผ่านปัจจุบันไม่ถูกต้อง');
      if (currInput) {
        currInput.value = '';
        currInput.focus();
      }
      return;
    }

    const newHash = await computeSha256(AUTH_SALT + newPwd);
    localStorage.setItem(storageKey, newHash);

    closeModal('modal-change-password');
    showToast('เปลี่ยนรหัสผ่านสำเร็จเรียบร้อยแล้ว', 'success');
  } catch (err) {
    showError('เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน: ' + (err.message || ''));
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk mr-1"></i> บันทึกรหัสผ่าน';
    }
  }
}

function handleResetDefaultPassword() {
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) return;
  const targetName = currentUser.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : 'ครูผู้สอน';
  const confirmed = confirm(`ต้องการรีเซ็ตรหัสผ่านของ${targetName}กลับเป็นรหัสเริ่มต้นใช่หรือไม่?`);
  if (!confirmed) return;

  const storageKey = currentUser.role === 'admin' ? 'csm4_admin_custom_hash' : 'csm4_teacher_custom_hash';
  localStorage.removeItem(storageKey);
  closeModal('modal-change-password');
  showToast(`รีเซ็ตรหัสผ่านของ${targetName}กลับเป็นค่าเริ่มต้นเรียบร้อยแล้ว`, 'info');
}

