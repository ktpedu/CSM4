
// ====================================================================
// PROGRESSIVE WEB APP (PWA) & SERVICE WORKER SYSTEM
// ====================================================================
let deferredInstallPrompt = null;

function initPwaServiceWorker() {
  // 1. Register Service Worker with relative scope
  if ('serviceWorker' in navigator) {
    const swUrl = './sw.js';
    navigator.serviceWorker.register(swUrl, { scope: './' })
      .then((registration) => {
        console.log('[PWA] Service Worker registered successfully, scope:', registration.scope);

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showToast('มีเนื้อหาเวอร์ชันใหม่พร้อมใช้งาน รีเฟรชเพื่ออัปเดต', 'info', 5000);
              }
            });
          }
        });
      })
      .catch((err) => {
        console.warn('[PWA] Service Worker registration failed:', err);
      });

    // Auto-reload on controller change (smooth update activation)
    let isReloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!isReloading) {
        isReloading = true;
        window.location.reload();
      }
    });
  }

  // 2. Network connectivity listeners (Online / Offline detection)
  window.addEventListener('online', handleOnlineState);
  window.addEventListener('offline', handleOfflineState);

  // Initial check on load
  if (!navigator.onLine) {
    handleOfflineState();
  }

  // 3. Listen for browser install prompt (Add to Home Screen - Android / Chrome / Edge)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;

    // Show header install button
    const headerInstallBtn = document.getElementById('btn-header-install-pwa');
    if (headerInstallBtn) headerInstallBtn.style.display = 'inline-flex';

    // Show floating install banner if not dismissed recently
    const dismissedAt = localStorage.getItem('csm4_pwa_dismissed_at');
    const now = Date.now();
    const cooldownDays = 3 * 24 * 60 * 60 * 1000; // 3 days cooldown
    if (!dismissedAt || (now - parseInt(dismissedAt, 10)) > cooldownDays) {
      setTimeout(() => {
        showPwaInstallBanner();
      }, 3500);
    }
  });

  // 4. Handle successful installation
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App successfully installed to Home Screen');
    deferredInstallPrompt = null;
    hidePwaInstallBanner();

    const headerInstallBtn = document.getElementById('btn-header-install-pwa');
    if (headerInstallBtn) headerInstallBtn.style.display = 'none';

    showToast('ติดตั้งแอป CS-M4 เรียบร้อยแล้ว! สามารถเปิดใช้งานได้จากหน้าจอโฮม', 'success', 6000);
  });
}

function handleOnlineState() {
  const banner = document.getElementById('pwa-offline-banner');
  if (banner) banner.style.display = 'none';
  showToast('เชื่อมต่ออินเทอร์เน็ตแล้ว ข้อมูลพร้อมเชื่อมต่อ Supabase', 'success', 3500);
}

function handleOfflineState() {
  const banner = document.getElementById('pwa-offline-banner');
  if (banner) banner.style.display = 'flex';
  showToast('อยู่ในโหมดออฟไลน์: คุณสามารถเปิดอ่านบทเรียน สไลด์ และใบงานที่แคชไว้ได้ตามปกติ', 'warning', 5000);
}

function showPwaInstallBanner() {
  // If already installed and launched as standalone app, don't show
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    return;
  }
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.style.display = 'flex';
}

function hidePwaInstallBanner() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.style.display = 'none';
}

function dismissPwaInstallBanner() {
  hidePwaInstallBanner();
  localStorage.setItem('csm4_pwa_dismissed_at', Date.now().toString());
}

async function triggerPwaInstall() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    console.log('[PWA] User response to install prompt:', choice.outcome);
    if (choice.outcome === 'accepted') {
      deferredInstallPrompt = null;
    }
    hidePwaInstallBanner();
  } else {
    // Check if iOS device
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIos) {
      hidePwaInstallBanner();
      openModal('modal-pwa-ios');
    } else {
      showToast('สามารถติดตั้งแอปได้โดยเลือก "เพิ่มไปยังหน้าจอหลัก" (Add to Home screen) ในเมนูของเบราว์เซอร์', 'info', 5000);
    }
  }
}

function promptPwaInstall() {
  triggerPwaInstall();
}
