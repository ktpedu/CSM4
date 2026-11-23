// ====================================================================
// COMPUTING SCIENCE M.4 (CS-M4) - CORE APPLICATION ORCHESTRATOR
// School: Wangnamyenwittayakom School
// Version: 5.7 (Modular Architecture)
// ====================================================================

// Fallback auto-loader: Ensure all modules are loaded if app.js is referenced standalone
(function ensureModulesLoaded() {
  if (typeof isStaticOrServerlessHost === 'undefined') {
    const modules = [
      'js/config.js',
      'js/modules/auth.js',
      'js/modules/lessons.js',
      'js/modules/worksheets.js',
      'js/modules/assignments.js',
      'js/modules/quizzes.js',
      'js/modules/teacher.js',
      'js/modules/pwa.js'
    ];
    modules.forEach(src => {
      if (!document.querySelector(`script[src*="${src}"]`)) {
        const s = document.createElement('script');
        s.src = src + '?v=5.7';
        s.async = false;
        document.head.appendChild(s);
      }
    });
  }
})();

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

  // Sync Mobile Bottom Navigation buttons active state
  document.querySelectorAll('.mobile-bottom-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeMobileBtn = document.getElementById(`m-nav-${tabId}`);
  if (activeMobileBtn) {
    activeMobileBtn.classList.add('active');
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
  else if (tabId === 'worksheets') setWorksheetCategory(currentWorksheetCategory || 'theory');
  else if (tabId === 'assignments') loadAssignmentsData();
  else if (tabId === 'quizzes') {
    studentQuizAttemptsCache = null;
    loadQuizzesData();
  }
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
        <div style="font-size: 0.82rem; margin-top: 4px;">ระบบพร้อมแสดงผลทันทีเมื่อคุณครูมีประกาศใหม่</div>
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
              <i class="fa-solid fa-bolt mr-1"></i> อัปเดตล่าสุด
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




function handleMobileProfileClick() {
  if (currentUser) {
    toggleUserDropdown();
  } else {
    openLoginModal();
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

  // Initialize Progressive Web App (PWA) & Service Worker
  initPwaServiceWorker();
});
