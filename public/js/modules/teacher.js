// --- 10. TEACHER DASHBOARD DATA ---
let currentTeacherSubmissionsFilter = 'all';
let currentTeacherSubmissionsStatus = 'submitted'; // 'submitted' (รอตรวจ) | 'graded' (ตรวจแล้ว)
let currentTeacherSubmissionsCategory = 'all';

function filterTeacherSubmissions(room) {
  currentTeacherSubmissionsFilter = room;
  renderTeacherPendingSubmissions();
}

function setTeacherSubmissionsStatus(status) {
  currentTeacherSubmissionsStatus = status;
  currentTeacherSubmissionsFilter = 'all';
  renderTeacherPendingSubmissions();
}

function filterTeacherSubmissionsCategory(category) {
  currentTeacherSubmissionsCategory = category || 'all';
  if (typeof window !== 'undefined') {
    window.currentTeacherSubmissionsCategory = currentTeacherSubmissionsCategory;
  }
  ['all', 'theory', 'practical'].forEach(cat => {
    const btn = document.getElementById(`btn-t-subs-cat-${cat}`);
    if (btn) {
      if (cat === currentTeacherSubmissionsCategory) {
        btn.style.background = 'var(--thairath-green)';
        btn.style.color = '#fff';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--text-muted)';
      }
    }
  });
  renderTeacherPendingSubmissions();
}

function renderTeacherPendingSubmissions() {
  const container = document.getElementById('teacher-pending-submissions');
  if (!container) return;

  let allItems = allSubmissionsGlobalCache || [];
  if (currentTeacherSubmissionsCategory === 'theory') {
    allItems = allItems.filter(s => !s.assignment_id || (!s.assignment_id.startsWith('asg-flow-') && !s.assignment_id.startsWith('ws-flow-')));
  } else if (currentTeacherSubmissionsCategory === 'practical') {
    allItems = allItems.filter(s => s.assignment_id && (s.assignment_id.startsWith('asg-flow-') || s.assignment_id.startsWith('ws-flow-')));
  }

  const submittedItems = allItems.filter(s => s.status === 'submitted');
  const returnedItems = allItems.filter(s => s.status === 'returned' || s.status === 'revision_requested');
  const gradedItems = allItems.filter(s => s.status === 'graded');

  const pendingCount = submittedItems.length;
  const returnedCount = returnedItems.length;
  const gradedCount = gradedItems.length;

  const targetList = currentTeacherSubmissionsStatus === 'graded' 
    ? gradedItems 
    : currentTeacherSubmissionsStatus === 'returned'
      ? returnedItems
      : submittedItems;

  // Update Badge & Title
  const badge = document.getElementById('teacher-pending-badge');
  if (badge) {
    if (currentTeacherSubmissionsStatus === 'graded') {
      badge.innerText = `${gradedCount} รายการ (ตรวจแล้ว)`;
      badge.style.background = 'rgba(16, 185, 129, 0.15)';
      badge.style.color = '#059669';
    } else if (currentTeacherSubmissionsStatus === 'returned') {
      badge.innerText = `${returnedCount} รายการ (ส่งกลับแก้ไข)`;
      badge.style.background = 'rgba(249, 115, 22, 0.15)';
      badge.style.color = '#ea580c';
    } else {
      badge.innerText = `${pendingCount} รายการ (รอตรวจ)`;
      badge.style.background = 'rgba(245, 158, 11, 0.15)';
      badge.style.color = '#d97706';
    }
  }

  const titleEl = document.getElementById('teacher-submissions-title');
  if (titleEl) {
    titleEl.innerText = currentTeacherSubmissionsStatus === 'graded' 
      ? 'รายการส่งงานที่ตรวจแล้ว' 
      : currentTeacherSubmissionsStatus === 'returned'
        ? 'รายการส่งงานที่ส่งกลับให้นักเรียนแก้ไข'
        : 'รายการส่งงานที่รอครูตรวจ';
  }

  // Update Toggle Button styles
  const btnSubmitted = document.getElementById('btn-subs-status-submitted');
  const btnReturned = document.getElementById('btn-subs-status-returned');
  const btnGraded = document.getElementById('btn-subs-status-graded');
  
  if (btnSubmitted) {
    btnSubmitted.className = currentTeacherSubmissionsStatus === 'submitted' ? 'btn-status-toggle active-submitted' : 'btn-status-toggle';
    btnSubmitted.innerHTML = `<i class="fa-solid fa-clock-rotate-left mr-1"></i> รอตรวจ (${pendingCount})`;
  }
  if (btnReturned) {
    btnReturned.className = currentTeacherSubmissionsStatus === 'returned' ? 'btn-status-toggle active-returned' : 'btn-status-toggle';
    btnReturned.innerHTML = `<i class="fa-solid fa-rotate-left mr-1"></i> ส่งกลับแก้ไข (${returnedCount})`;
  }
  if (btnGraded) {
    btnGraded.className = currentTeacherSubmissionsStatus === 'graded' ? 'btn-status-toggle active-graded' : 'btn-status-toggle';
    btnGraded.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> ตรวจแล้ว (${gradedCount})`;
  }

  // Render classroom filter buttons based on active status tab
  const filterContainer = document.getElementById('teacher-submissions-filter-container');
  if (filterContainer) {
    const roomCounts = {};
    targetList.forEach(s => {
      const r = s.class_room || 'อื่นๆ';
      roomCounts[r] = (roomCounts[r] || 0) + 1;
    });

    const rooms = Object.keys(roomCounts).sort();
    filterContainer.innerHTML = `
      <button type="button" onclick="filterTeacherSubmissions('all')" style="padding: 4px 12px; border-radius: 999px; font-size: 0.74rem; font-weight: 700; border: 1px solid var(--border-color); cursor: pointer; background: ${currentTeacherSubmissionsFilter === 'all' ? 'var(--thairath-green)' : 'var(--surface-secondary)'}; color: ${currentTeacherSubmissionsFilter === 'all' ? '#fff' : 'var(--text-main)'};">
        ทั้งหมด (${targetList.length})
      </button>
      ${rooms.map(r => `
        <button type="button" onclick="filterTeacherSubmissions('${r}')" style="padding: 4px 12px; border-radius: 999px; font-size: 0.74rem; font-weight: 700; border: 1px solid var(--border-color); cursor: pointer; background: ${currentTeacherSubmissionsFilter === r ? 'var(--thairath-green)' : 'var(--surface-secondary)'}; color: ${currentTeacherSubmissionsFilter === r ? '#fff' : 'var(--text-main)'};">
          ${r} (${roomCounts[r]})
        </button>
      `).join('')}
    `;
  }

  // Filter items by classroom
  const filtered = currentTeacherSubmissionsFilter === 'all' 
    ? targetList 
    : targetList.filter(s => (s.class_room || 'อื่นๆ') === currentTeacherSubmissionsFilter);

  // Cache currently viewed teacher list for seamless next/prev navigation in viewer modal
  window.__teacherCurrentFilteredSubmissions = filtered;

  if (filtered.length === 0) {
    if (currentTeacherSubmissionsStatus === 'graded') {
      container.innerHTML = `<p class="text-xs text-slate-400 py-8 text-center"><i class="fa-solid fa-clipboard-check text-slate-400 text-lg block mb-1"></i>ยังไม่มีรายการที่ตรวจแล้วในตัวกรองนี้</p>`;
    } else if (currentTeacherSubmissionsStatus === 'returned') {
      container.innerHTML = `<p class="text-xs text-slate-400 py-8 text-center"><i class="fa-solid fa-rotate-left text-slate-400 text-lg block mb-1"></i>ไม่มีรายการที่ส่งกลับให้แก้ไขในตัวกรองนี้</p>`;
    } else {
      container.innerHTML = `<p class="text-xs text-slate-400 py-8 text-center"><i class="fa-solid fa-circle-check text-emerald-500 text-lg block mb-1"></i>ไม่มีงานค้างตรวจในขณะนี้</p>`;
    }
    return;
  }

  container.innerHTML = filtered.map(sub => {
    const formattedDate = sub.submitted_at 
      ? new Date(sub.submitted_at).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })
      : '';

    const isGraded = sub.status === 'graded';
    const isReturned = sub.status === 'returned' || sub.status === 'revision_requested';
    const scoreVal = (sub.score !== undefined && sub.score !== null) ? sub.score : 10;
    const fileInfo = analyzeSubmissionFile(sub.file_url, sub.content);

    let fileBtnHtml = '';
    if (sub.file_url && sub.file_url.startsWith('http')) {
      fileBtnHtml = `
        <a href="${escapeHtml(sub.file_url)}" target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 font-bold hover:underline inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> เปิดลิงก์ ${fileInfo.label} ↗
        </a>
      `;
    } else {
      fileBtnHtml = `
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button type="button" onclick="previewSubmissionWork('${escapeHtml(sub.id)}', '${escapeHtml(sub.student_name)}', '${escapeHtml(sub.assignment_id)}')" class="text-xs text-emerald-700 font-bold hover:bg-emerald-100 inline-flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300 cursor-pointer shadow-sm">
            <i class="fa-solid fa-eye text-emerald-600"></i> ${fileInfo.isMultiple ? `เปิดดูผลงาน (${fileInfo.filesCount} ไฟล์)` : `เปิดดูผลงาน (${fileInfo.ext.toUpperCase()})`}
          </button>
          <button type="button" onclick="downloadSubmissionFileById('${escapeHtml(sub.id)}', '${escapeHtml(sub.student_name)}', '${escapeHtml(sub.class_room)}', '${escapeHtml(sub.assignment_id)}')" class="text-xs text-slate-700 font-semibold hover:bg-slate-100 inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer" title="ดาวน์โหลดเก็บลงเครื่อง">
            <i class="fa-solid fa-download text-slate-500"></i> ${fileInfo.isMultiple ? 'โหลดทั้งหมด (.zip)' : `โหลด .${fileInfo.ext}`}
          </button>
        </div>
      `;
    }

    let statusBadgeHtml = '';
    if (isGraded) {
      statusBadgeHtml = `<span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">ตรวจแล้ว: ${sub.score}/10 คะแนน</span>`;
    } else if (isReturned) {
      statusBadgeHtml = `<span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200"><i class="fa-solid fa-rotate-left mr-1"></i>ส่งกลับแก้ไข</span>`;
    } else {
      statusBadgeHtml = `<span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">รอตรวจ</span>`;
    }

    return `
      <div class="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-sm transition hover:shadow-md">
        <div class="flex justify-between items-center flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm text-slate-800">${escapeHtml(sub.student_name)}</span>
            ${sub.class_room ? `<span class="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">${escapeHtml(sub.class_room)}</span>` : ''}
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] text-slate-400"><i class="fa-regular fa-clock mr-1"></i>${formattedDate}</span>
            ${statusBadgeHtml}
          </div>
        </div>
        <p class="text-xs font-semibold text-emerald-700"><i class="fa-solid fa-book-open mr-1.5"></i>${escapeHtml(sub.assignment_title || sub.assignment_id)}</p>
        <p class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 whitespace-pre-line">${escapeHtml(sub.content || '(ไม่มีรายละเอียดเพิ่มเติม)')}</p>
        
        ${isReturned && sub.feedback ? `
          <div class="text-xs bg-orange-50 text-orange-950 p-2.5 rounded-xl border border-orange-200">
            <strong class="text-orange-800"><i class="fa-solid fa-triangle-exclamation mr-1"></i>แจ้งให้นักเรียนแก้ไข:</strong> ${escapeHtml(sub.feedback)}
          </div>
        ` : ''}

        ${isGraded && sub.feedback ? `
          <div class="text-xs bg-emerald-50 text-emerald-900 p-2.5 rounded-xl border border-emerald-200">
            <strong>ข้อเสนอแนะครู:</strong> ${escapeHtml(sub.feedback)}
          </div>
        ` : ''}

        <div class="flex justify-between items-center pt-2 flex-wrap gap-2">
          ${fileBtnHtml}
          <button type="button" onclick="openGradeModal('${escapeHtml(sub.id)}', '${escapeHtml(sub.student_name)}', ${isGraded ? scoreVal : 'null'})" class="${isGraded ? 'bg-slate-700 hover:bg-slate-800' : isReturned ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md inline-flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid ${isGraded ? 'fa-pen-to-square' : isReturned ? 'fa-pen' : 'fa-check-double'}"></i> ${isGraded ? 'แก้ไขคะแนน' : isReturned ? 'จัดการผล/ส่งใหม่' : 'ตรวจและให้คะแนน'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function loadTeacherData() {
  try {
    const submissions = await fetchAllSubmissions(true);
    renderTeacherPendingSubmissions();

    // Load questions for teacher from Supabase Cloud directly
    let questions = [];
    try {
      const qRes = await fetch(`${SUPABASE_REST_URL}/questions?select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (qRes.ok) questions = await qRes.json();
    } catch (e) {}

    const qContainer = document.getElementById('teacher-questions-list');
    if (qContainer) {
      if (questions.length === 0) {
        qContainer.innerHTML = `<p class="text-xs text-slate-400 py-6 text-center">ไม่มีคำถามจากนักเรียนในขณะนี้</p>`;
      } else {
        qContainer.innerHTML = questions.map(q => `
          <div class="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <div class="flex justify-between items-center">
              <span class="font-bold text-xs text-slate-800">${escapeHtml(q.student_name)}</span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded ${q.status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                ${q.status === 'replied' ? 'ตอบแล้ว' : 'รอคำตอบ'}
              </span>
            </div>
            <p class="font-bold text-xs text-slate-800">${escapeHtml(q.subject)}</p>
            <p class="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl">${escapeHtml(q.question)}</p>
            ${q.reply ? `<p class="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-xl"><strong>คำตอบของครู:</strong> ${escapeHtml(q.reply)}</p>` : `
              <button onclick="replyQuestionPrompt('${q.id}')" class="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition">
                <i class="fa-solid fa-reply mr-1"></i> ตอบคำถามนี้
              </button>
            `}
          </div>
        `).join('');
      }
    }

  } catch (err) {
    console.error('Teacher load error:', err);
  }

  // Load Quiz Attempts for Teacher Management (Always fetch fresh data)
  loadTeacherQuizAttempts(true);
}

async function replyQuestionPrompt(questionId) {
  const reply = prompt('พิมพ์คำตอบเพื่อส่งให้นักเรียน:');
  if (!reply) return;

  try {
    const res = await fetch(`${SUPABASE_REST_URL}/questions?id=eq.${encodeURIComponent(questionId)}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reply: reply,
        replied_by: (currentUser && currentUser.full_name) || 'ครูปณิฏฐา บุญยงค์',
        status: 'replied',
        updated_at: new Date().toISOString()
      })
    });
    if (!res.ok) throw new Error('เกิดข้อผิดพลาดในการบันทึกคำตอบ');
    showToast('บันทึกคำตอบเข้าระบบสำเร็จ!', 'success');
    loadTeacherData();
  } catch (err) {
    console.error('Reply question error:', err);
    showToast('เกิดข้อผิดพลาด: ' + err.message, 'error');
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

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.leaderboard.map(i => i.name),
        datasets: [{
          label: 'คะแนนสะสมรวม',
          data: data.leaderboard.map(i => i.totalScore),
          backgroundColor: '#107548',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#334155' }, grid: { color: '#e2e8f0' } },
          y: { beginAtZero: true, ticks: { color: '#334155' }, grid: { color: '#e2e8f0' } }
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
    let questions = [];

    // 1. Fetch directly from Supabase Cloud REST
    try {
      const qRes = await fetch(`${SUPABASE_REST_URL}/questions?select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (qRes.ok) {
        questions = await qRes.json();
      }
    } catch (sbErr) {
      console.warn('Supabase questions fetch error:', sbErr);
    }

    // 2. Fallback to API if not static
    if ((!questions || questions.length === 0) && !isStaticOrServerlessHost()) {
      try {
        questions = await apiFetch('/questions');
      } catch (e) {}
    }

    const container = document.getElementById('contact-public-questions');
    if (!container) return;

    if (!questions || questions.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-400 py-6 text-center"><i class="fa-solid fa-comments text-slate-300 text-lg block mb-1"></i>ยังไม่มีคำถามจากนักเรียนในขณะนี้</p>`;
      return;
    }

    container.innerHTML = questions.map(q => `
      <div class="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-sm">
        <div class="flex justify-between items-center text-xs">
          <span class="font-bold text-slate-800">${escapeHtml(q.student_name || 'นักเรียน')}</span>
          <span class="text-slate-400">${q.created_at ? new Date(q.created_at).toLocaleDateString('th-TH') : ''}</span>
        </div>
        <p class="font-bold text-xs text-emerald-700">${escapeHtml(q.subject)}</p>
        <p class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">${escapeHtml(q.question)}</p>
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

  const studentName = (currentUser && currentUser.full_name) || 'นักเรียน (ไม่ระบุชื่อ)';
  const studentId = (currentUser && (currentUser.student_id || currentUser.id || currentUser.username)) || 'guest';

  const newQ = {
    id: 'q-' + Date.now(),
    student_id: String(studentId),
    student_name: studentName,
    subject: subject,
    question: question,
    reply: null,
    replied_by: null,
    created_at: new Date().toISOString(),
    status: 'pending'
  };

  try {
    // 1. Direct insert to Supabase Cloud REST
    let savedToSupabase = false;
    try {
      const sbRes = await fetch(`${SUPABASE_REST_URL}/questions`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(newQ)
      });
      if (sbRes.ok) savedToSupabase = true;
    } catch (sbErr) {
      console.warn('Supabase question post error:', sbErr);
    }

    // 2. Also try API if running on server host
    if (!isStaticOrServerlessHost()) {
      try {
        await apiFetch('/questions', 'POST', { subject, question });
      } catch (e) {}
    }

    document.getElementById('contact-subject-input').value = '';
    document.getElementById('contact-question-input').value = '';
    showToast('ส่งคำถามถึงคุณครูเรียบร้อยแล้ว!', 'success');
    loadContactData();
  } catch (err) {
    console.error('Submit question error:', err);
    showToast('เกิดข้อผิดพลาดในการส่งคำถาม: ' + err.message, 'error');
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

  const authorName = (currentUser && currentUser.full_name) || 'ครูปณิฏฐา บุญยงค์';
  const newAnc = {
    id: 'anc-' + Date.now(),
    title: title,
    content: content,
    author: authorName,
    date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString()
  };

  try {
    // 1. Save directly to Supabase Cloud REST
    try {
      await fetch(`${SUPABASE_REST_URL}/announcements`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(newAnc)
      });
    } catch (e) {
      console.warn('Supabase announcement save error:', e);
    }

    // Immediately update in-memory cache and re-render UI
    if (typeof latestAnnouncementsCache !== 'undefined' && Array.isArray(latestAnnouncementsCache)) {
      latestAnnouncementsCache.unshift(newAnc);
      if (typeof renderAnnouncementsUI === 'function') {
        renderAnnouncementsUI(latestAnnouncementsCache);
      }
    }

    // 2. Try server API if not static
    if (!isStaticOrServerlessHost()) {
      try {
        await apiFetch('/announcements', 'POST', { title, content });
      } catch (e) {}
    }

    closeModal('modal-add-announcement');
    document.getElementById('anc-title-input').value = '';
    document.getElementById('anc-content-input').value = '';
    showToast('สร้างประกาศเรียบร้อยและบันทึกลง Supabase สำเร็จ!', 'success');
    if (typeof loadHomeData === 'function') loadHomeData();
  } catch (err) {
    console.error('Announcement create error:', err);
    showToast('เกิดข้อผิดพลาดในการสร้างประกาศ: ' + err.message, 'error');
  }
}






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





// --- TEACHER SUBMISSION VIEWER NAVIGATION & IN-MODAL GRADING SUITE ---
function navigateViewerSubmission(delta) {
  if (!Array.isArray(window.currentViewerSubmissionList) || window.currentViewerSubmissionList.length === 0) return;
  const newIdx = (window.currentViewerSubIndex || 0) + delta;
  if (newIdx >= 0 && newIdx < window.currentViewerSubmissionList.length) {
    const nextSub = window.currentViewerSubmissionList[newIdx];
    window.currentViewerSubIndex = newIdx;
    previewSubmissionWork(nextSub.id, nextSub.student_name, nextSub.assignment_id);
  }
}

function setViewerQuickScore(score) {
  const scoreInput = document.getElementById('viewer-inline-score-input');
  if (scoreInput) scoreInput.value = score;
  document.querySelectorAll('.quick-score-btn').forEach(btn => {
    if (Number(btn.dataset.score) === score) {
      btn.style.background = 'rgba(16, 185, 129, 0.25)';
      btn.style.borderColor = '#10b981';
      btn.style.color = '#34d399';
    } else {
      btn.style.background = 'rgba(255, 255, 255, 0.06)';
      btn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      btn.style.color = '#cbd5e1';
    }
  });
}

function setViewerQuickFeedback(text) {
  const fbInput = document.getElementById('viewer-inline-feedback-input');
  if (fbInput) {
    fbInput.value = text;
    fbInput.focus();
  }
}

async function doViewerSaveGrade(andNext = false) {
  const subId = document.getElementById('viewer-sub-id').value;
  const scoreRaw = document.getElementById('viewer-inline-score-input').value.trim();
  const feedback = document.getElementById('viewer-inline-feedback-input').value.trim();

  if (!subId) return;
  if (scoreRaw === '' || isNaN(scoreRaw) || Number(scoreRaw) < 0 || Number(scoreRaw) > 20) {
    showToast('กรุณากรอกคะแนนประเมินที่ถูกต้อง (0 - 20 คะแนน)', 'error');
    return;
  }
  const score = Number(scoreRaw);

  try {
    showToast('กำลังบันทึกคะแนน...', 'info');

    // 1. Direct update to Supabase Cloud
    await fetch(`${SUPABASE_REST_URL}/submissions?id=eq.${encodeURIComponent(subId)}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        score: score,
        feedback: feedback || 'ตรวจเรียบร้อยแล้ว',
        status: 'graded',
        graded_at: new Date().toISOString()
      })
    }).catch(e => console.warn('Supabase PATCH error:', e));

    // 2. Server API fallback if not static
    if (!isStaticOrServerlessHost()) {
      try {
        await apiFetch('/submissions/grade', 'POST', { submission_id: subId, score, feedback });
      } catch (e) {}
    }

    // 3. Update global in-memory cache
    if (Array.isArray(allSubmissionsGlobalCache)) {
      const target = allSubmissionsGlobalCache.find(s => s.id === subId);
      if (target) {
        target.score = score;
        target.feedback = feedback || 'ตรวจเรียบร้อยแล้ว';
        target.status = 'graded';
        target.graded_at = new Date().toISOString();
      }
    }

    // 4. Update localStorage
    try {
      let localSubs = JSON.parse(localStorage.getItem('csm4_submissions') || '[]');
      const s = localSubs.find(item => item.id === subId);
      if (s) {
        s.score = score;
        s.feedback = feedback || 'ตรวจเรียบร้อยแล้ว';
        s.status = 'graded';
        s.graded_at = new Date().toISOString();
        localStorage.setItem('csm4_submissions', JSON.stringify(localSubs));
      }
    } catch (e) {}

    showToast(`บันทึกคะแนน ${score} คะแนนเรียบร้อย!`, 'success');

    // Refresh background tables
    if (typeof renderTeacherPendingSubmissions === 'function') renderTeacherPendingSubmissions();
    if (typeof loadAssignmentsData === 'function') loadAssignmentsData();

    // 5. Navigate to Next student if requested!
    if (andNext) {
      const nextIdx = (window.currentViewerSubIndex || 0) + 1;
      if (Array.isArray(window.currentViewerSubmissionList) && nextIdx < window.currentViewerSubmissionList.length) {
        navigateViewerSubmission(1);
      } else {
        showToast('🎉 ตรวจครบทุกผลงานในรายการแล้ว!', 'success');
        closeModal('modal-view-submission-work');
      }
    }
  } catch (err) {
    console.error('Viewer grade error:', err);
    showToast('เกิดข้อผิดพลาดในการบันทึกคะแนน', 'error');
  }
}

async function doViewerReturnRevision() {
  const subId = document.getElementById('viewer-sub-id').value;
  let feedback = document.getElementById('viewer-inline-feedback-input').value.trim();

  if (!subId) return;
  if (!feedback) {
    const promptFeedback = prompt('กรุณาระบุสิ่งที่นักเรียนต้องแก้ไข หรือเหตุผลที่ให้ส่งใหม่:\n(เช่น "แนบไฟล์ผิด กรุณาแนบไฟล์ผังงานที่สมบูรณ์"):');
    if (!promptFeedback || !promptFeedback.trim()) {
      showToast('กรุณาระบุข้อเสนอแนะเพื่อให้เด็กทราบจุดแก้ไข', 'error');
      return;
    }
    feedback = promptFeedback.trim();
    document.getElementById('viewer-inline-feedback-input').value = feedback;
  }

  try {
    showToast('กำลังส่งกลับให้นักเรียนแก้ไข...', 'info');

    await fetch(`${SUPABASE_REST_URL}/submissions?id=eq.${encodeURIComponent(subId)}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        score: null,
        feedback: feedback,
        status: 'revision_requested',
        graded_at: new Date().toISOString()
      })
    }).catch(e => console.warn('Supabase revision PATCH error:', e));

    if (Array.isArray(allSubmissionsGlobalCache)) {
      const target = allSubmissionsGlobalCache.find(s => s.id === subId);
      if (target) {
        target.score = null;
        target.feedback = feedback;
        target.status = 'revision_requested';
        target.graded_at = new Date().toISOString();
      }
    }

    showToast('ส่งกลับให้นักเรียนแก้ไขเรียบร้อย!', 'success');

    if (typeof renderTeacherPendingSubmissions === 'function') renderTeacherPendingSubmissions();
    if (typeof loadAssignmentsData === 'function') loadAssignmentsData();

    const nextIdx = (window.currentViewerSubIndex || 0) + 1;
    if (Array.isArray(window.currentViewerSubmissionList) && nextIdx < window.currentViewerSubmissionList.length) {
      navigateViewerSubmission(1);
    } else {
      closeModal('modal-view-submission-work');
    }
  } catch (err) {
    console.error('Viewer return revision error:', err);
    showToast('เกิดข้อผิดพลาดในการส่งกลับแก้ไข', 'error');
  }
}

if (typeof window !== 'undefined') {
  window.filterTeacherSubmissions = filterTeacherSubmissions;
  window.setTeacherSubmissionsStatus = setTeacherSubmissionsStatus;
  window.filterTeacherSubmissionsCategory = filterTeacherSubmissionsCategory;
  window.renderTeacherPendingSubmissions = renderTeacherPendingSubmissions;
}
