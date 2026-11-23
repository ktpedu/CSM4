// --- 7. ASSIGNMENTS & SUBMISSIONS ---
const OFFLINE_ASSIGNMENTS = [
  {
    id: 'asg-1',
    category: 'theory',
    unit: 'mod-1',
    title: 'ใบงานที่ 1.1: เรื่อง การประยุกต์ใช้แนวคิดเชิงคำนวณในการแก้ปัญหาบริบทจริง',
    description: 'การประยุกต์ใช้ 4 องค์ประกอบของแนวคิดเชิงคำนวณเพื่อแก้ปัญหาในชีวิตประจำวัน',
    due_date: '2026-10-15',
    total_points: 10
  },
  {
    id: 'asg-2',
    category: 'theory',
    unit: 'mod-1',
    title: 'ใบงานที่ 1.2: เรื่อง การพัฒนาระบบด้วยวงจร SDLC (กรณีศึกษาร้านเบเกอรี)',
    description: 'การประยุกต์ใช้วงจรการพัฒนาระบบ 5 ขั้นตอนเพื่อแก้ปัญหาธุรกิจจริง',
    due_date: '2026-10-30',
    total_points: 10
  },
  {
    id: 'asg-3',
    category: 'theory',
    unit: 'mod-1',
    title: 'ใบงานที่ 1.3: เรื่อง การจัดทำเค้าโครงรายงานโครงงาน 5 บท',
    description: 'จัดทำเค้าโครงโครงงาน (Project Proposal) และโครงสร้างรายงาน 5 บทมาตรฐานวิชาการ',
    due_date: '2026-11-15',
    total_points: 10
  },
  {
    id: 'asg-4',
    category: 'theory',
    unit: 'mod-2',
    title: 'ใบงานที่ 2.1: เรื่อง การวางแผนและการวิเคราะห์ความต้องการในการพัฒนาโครงงาน',
    description: 'การกำหนดวัตถุประสงค์ ขอบเขต และแผนภูมิแกนต์ (กรณีศึกษา StyleHub)',
    due_date: '2026-11-30',
    total_points: 10
  },
  {
    id: 'asg-5',
    category: 'theory',
    unit: 'mod-2',
    title: 'ใบงานที่ 2.2: เรื่อง การวิเคราะห์ข้อมูลและออกแบบระบบ (Context Diagram & UI)',
    description: 'การวิเคราะห์ข้อกำหนดเชิงหน้าที่และการออกแบบแผนภาพบริบทระบบพาณิชย์อิเล็กทรอนิกส์',
    due_date: '2026-12-15',
    total_points: 10
  },
  {
    id: 'asg-6',
    category: 'theory',
    unit: 'mod-2',
    title: 'ใบงานที่ 2.3: เรื่อง การพัฒนาโครงงานเพื่อแก้ปัญหาตามกระบวนการ SDLC ในบริบทจริง',
    description: 'การบูรณาการแนวคิดเชิงคำนวณและวงจร SDLC ครบวงจรในการแก้ปัญหาของสถานศึกษาหรือชุมชน',
    due_date: '2026-12-30',
    total_points: 10
  }
,
  {
    id: 'asg-flow-1',
    category: 'practical',
    unit: 'practical',
    ws_id: 'ws-flow-1',
    title: 'ใบงานปฏิบัติที่ 1.4: การออกแบบผังงานแบบลำดับ (Sequence Flowchart)',
    description: 'ฝึกออกแบบและเขียนผังงานแบบลำดับ 10 ข้อ ด้วยโปรแกรม Flowgorithm หรือวาดผังงาน (ส่งเป็นไฟล์ .fprg หรือภาพถ่ายผังงาน)',
    due_date: '2026-11-20',
    total_points: 10
  },
  {
    id: 'asg-flow-2',
    category: 'practical',
    unit: 'practical',
    ws_id: 'ws-flow-2',
    title: 'ใบงานปฏิบัติที่ 1.5: การออกแบบผังงานแบบมีเงื่อนไข (Selection Flowchart)',
    description: 'ฝึกออกแบบผังงานแบบมีเงื่อนไขตัดสินใจ True/False 10 ข้อ ด้วยโปรแกรม Flowgorithm หรือวาดผังงาน (ส่งเป็นไฟล์ .fprg หรือภาพถ่ายผังงาน)',
    due_date: '2026-11-25',
    total_points: 10
  },
  {
    id: 'asg-flow-3',
    category: 'practical',
    unit: 'practical',
    ws_id: 'ws-flow-3',
    title: 'ใบงานปฏิบัติที่ 1.6: การเขียนผังงานแบบหลายทางเลือก (Multiple Alternatives Flowchart)',
    description: 'ฝึกออกแบบผังงานเงื่อนไขซับซ้อนหลายทางเลือก 10 ข้อ ด้วยโปรแกรม Flowgorithm หรือวาดผังงาน (ส่งเป็นไฟล์ .fprg หรือภาพถ่ายผังงาน)',
    due_date: '2026-11-30',
    total_points: 10
  }];

// Current category filter for Assignments tab: 'theory' | 'practical' | 'all'
let currentAssignmentCategory = 'theory';

function filterAssignmentsCategory(category) {
  currentAssignmentCategory = category || 'theory';
  if (typeof window !== 'undefined') {
    window.currentAssignmentCategory = currentAssignmentCategory;
  }
  ['theory', 'practical', 'all'].forEach(cat => {
    const btn = document.getElementById(`asg-filter-btn-${cat}`);
    if (btn) {
      if (cat === currentAssignmentCategory) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });
  loadAssignmentsData();
}

function loadSubmissionsData() {
  return loadAssignmentsData();
}

// Helper to check if a submission belongs strictly to the currently logged in student
function isMySubmission(sub, user) {
  if (!user || user.role !== 'student') return false;
  if (!sub) return false;
  
  const userIds = [user.id, user.username, user.student_id]
    .filter(Boolean)
    .map(x => String(x).toLowerCase().trim());

  const subStudentId = String(sub.student_id || '').toLowerCase().trim();
  const subId = String(sub.id || '').toLowerCase().trim();

  // 1. Direct ID match
  if (subStudentId && userIds.includes(subStudentId)) return true;

  // 2. subId contains user ID
  if (userIds.some(uid => uid && (subId.includes(`-${uid}-`) || subId.startsWith(`sub-${uid}`) || subId.endsWith(`-${uid}`) || subId === uid))) {
    return true;
  }

  // 3. Name match with cleaning (strip title prefix and room tags)
  const cleanName = (name) => String(name || '')
    .replace(/^(นาย|นางสาว|นาง|ด\.ช\.|ด\.ญ\.)\s*/, '')
    .replace(/\s*\([^)]*\)/g, '')
    .trim()
    .toLowerCase();

  const userClean = cleanName(user.real_name || user.full_name || user.username || '');
  const subClean = cleanName(sub.student_name || '');

  if (userClean && subClean && userClean.length >= 3 && subClean.length >= 3) {
    if (userClean === subClean || userClean.includes(subClean) || subClean.includes(userClean)) {
      return true;
    }
  }

  return false;
}

// Helper to render a single submission card
function renderSubmissionCardHtml(sub, assignments) {
  const matchedAsg = (assignments || []).find(a => a.id === sub.assignment_id);
  const asgTitle = sub.assignment_title || (matchedAsg ? matchedAsg.title : sub.assignment_id);
  const maxPts = sub.total_points || (matchedAsg ? (matchedAsg.total_points || matchedAsg.points || 10) : 10);

  const fileInfo = analyzeSubmissionFile(sub.file_url, sub.content);
  let fileLinkHtml = '';
  if (sub.file_url && sub.file_url.startsWith('http')) {
    fileLinkHtml = `
      <a href="${escapeHtml(sub.file_url)}" target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 font-bold hover:underline inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> เปิดลิงก์ ${fileInfo.label} ↗
      </a>
    `;
  } else {
    fileLinkHtml = `
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

  const isTeacher = currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin');

  let cleanStudentName = sub.student_name || 'นักเรียน';
  if (sub.class_room && cleanStudentName.includes(`(${sub.class_room})`)) {
    cleanStudentName = cleanStudentName.replace(`(${sub.class_room})`, '').trim();
  }

  let formattedDate = '';
  if (sub.submitted_at) {
    try {
      formattedDate = new Date(sub.submitted_at).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' });
    } catch (e) {}
  }

  return `
    <div class="p-4 rounded-2xl border space-y-2 mb-3 shadow-sm hover:shadow-md transition" style="background: var(--surface-color); border: 1px solid var(--border-color); color: var(--text-main);">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <span class="font-bold text-xs" style="color: var(--text-main); font-size: 0.92rem;">
          ${escapeHtml(cleanStudentName)} ${sub.class_room ? `<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">${escapeHtml(sub.class_room)}</span>` : ''}
        </span>
        <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full ${sub.status === 'graded' ? 'bg-blue-100 text-blue-700' : (sub.status === 'returned' || sub.status === 'revision_requested') ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-700'}">
          ${sub.status === 'graded' ? `ตรวจแล้ว: ${sub.score}/${maxPts} คะแนน` : (sub.status === 'returned' || sub.status === 'revision_requested') ? '⚠️ ส่งกลับให้แก้ไข (ขอให้ส่งใหม่)' : 'รอครูตรวจคะแนน'}
        </span>
      </div>
      <p class="text-xs font-semibold" style="color: var(--thairath-green); font-size: 0.88rem;"><i class="fa-solid fa-file-lines mr-1.5"></i>${escapeHtml(asgTitle)}</p>
      <p class="text-xs p-2.5 rounded-xl border whitespace-pre-line" style="background: var(--surface-secondary); border-color: var(--border-color); color: var(--text-main); font-size: 0.84rem; line-height: 1.5;">${escapeHtml(sub.content || '')}</p>
      ${fileLinkHtml}
      ${formattedDate ? `<div style="font-size: 0.72rem; color: var(--text-subtle);"><i class="fa-regular fa-clock mr-1"></i>ส่งเมื่อ: ${formattedDate}</div>` : ''}
      ${sub.feedback ? `
        <div class="text-xs ${(sub.status === 'returned' || sub.status === 'revision_requested') ? 'bg-rose-50 text-rose-950 border-rose-300' : 'bg-amber-50 text-amber-900 border-amber-200'} p-3 rounded-xl border">
          <span class="font-bold block ${(sub.status === 'returned' || sub.status === 'revision_requested') ? 'text-rose-800' : 'text-amber-800'} mb-1">
            <i class="fa-solid ${(sub.status === 'returned' || sub.status === 'revision_requested') ? 'fa-triangle-exclamation' : 'fa-comment-dots'} mr-1"></i>
            ${(sub.status === 'returned' || sub.status === 'revision_requested') ? 'ข้อความแจ้งเตือนจากครู (กรุณาแก้ไขตามนี้):' : 'คำแนะนำจากครู:'}
          </span>
          <p class="whitespace-pre-line">${escapeHtml(sub.feedback)}</p>
        </div>
      ` : ''}
      ${(sub.status === 'returned' || sub.status === 'revision_requested') && currentUser && currentUser.role === 'student' ? `
        <div class="pt-1">
          <button type="button" onclick="openSubmitModal('${escapeHtml(sub.assignment_id)}', '${escapeHtml(asgTitle)}')" class="btn btn-primary" style="background: #f59e0b; border-color: #d97706; font-size: 0.78rem; padding: 7px 16px; border-radius: 10px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <i class="fa-solid fa-cloud-arrow-up"></i> แนบไฟล์ส่งงานใหม่ (แก้ไขตามครูแจ้ง)
          </button>
        </div>
      ` : ''}
      
      ${isTeacher ? `
        <div class="pt-2 text-right">
          <button onclick="openGradeModal('${escapeHtml(sub.id)}', '${escapeHtml(sub.student_name)}', ${(sub.score !== undefined && sub.score !== null) ? sub.score : 10})" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-md inline-flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-check-double"></i> ตรวจและให้คะแนน
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

// Global submissions in-memory cache & file on-demand cache
let allSubmissionsGlobalCache = [];
const submissionFileCache = {};

// Helper to fetch all submissions from Supabase Cloud / local API (Optimized to avoid statement timeout)
async function fetchAllSubmissions(forceFresh = false) {
  let list = [];
  if (!isStaticOrServerlessHost()) {
    try {
      list = await apiFetch('/submissions');
      if (Array.isArray(list) && list.length > 0) {
        allSubmissionsGlobalCache = list;
        return list;
      }
    } catch (e) {}
  }

  // Direct fetch metadata from Supabase Cloud (Excludes massive base64 file_url to prevent 57014 statement timeout)
  try {
    const sbRes = await fetch(`${SUPABASE_REST_URL}/submissions?select=id,assignment_id,student_id,student_name,class_room,content,score,feedback,status,submitted_at,graded_at&order=submitted_at.desc`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (sbRes.ok) {
      list = await sbRes.json();
    } else {
      console.warn('Supabase submissions metadata fetch status:', sbRes.status);
    }
  } catch (sbErr) {
    console.warn('Supabase submissions fetch error:', sbErr);
  }

  // Fetch short HTTP links in parallel (only URLs, e.g. Google Drive / GoodNotes / Canva)
  try {
    const linksRes = await fetch(`${SUPABASE_REST_URL}/submissions?file_url=like.http*&select=id,file_url`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (linksRes.ok) {
      const linksData = await linksRes.json();
      if (Array.isArray(linksData)) {
        const linkMap = {};
        linksData.forEach(item => {
          linkMap[item.id] = item.file_url;
        });
        list.forEach(s => {
          if (linkMap[s.id]) {
            s.file_url = linkMap[s.id];
            s.has_file = true;
          } else if (s.content && (s.content.includes('[ไฟล์แนบ:') || s.content.includes('ส่งงานผ่านระบบออนไลน์'))) {
            s.has_file = true;
          }
        });
      }
    }
  } catch (e) {}

  // Fill in assignment titles from OFFLINE_ASSIGNMENTS if missing
  list.forEach(s => {
    if (!s.assignment_title && typeof OFFLINE_ASSIGNMENTS !== 'undefined') {
      const match = OFFLINE_ASSIGNMENTS.find(a => a.id === s.assignment_id);
      if (match) {
        s.assignment_title = match.title;
      }
    }
    // Also attach cached file_url if loaded previously
    if (submissionFileCache[s.id]) {
      s.file_url = submissionFileCache[s.id];
    }
  });

  // Merge with localStorage cached submissions
  try {
    const localSubs = JSON.parse(localStorage.getItem('csm4_submissions') || '[]');
    if (localSubs.length > 0) {
      localSubs.forEach(ls => {
        const existIdx = list.findIndex(s => s.id === ls.id);
        if (existIdx >= 0) {
          if (ls.file_url && !list[existIdx].file_url) {
            list[existIdx].file_url = ls.file_url;
          }
        } else {
          list.unshift(ls);
        }
      });
    }
  } catch (e) {}

  // Sort newest submissions first
  list.sort((a, b) => new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0));

  allSubmissionsGlobalCache = list;
  return list;
}

// --- UNIVERSAL FILE DETECTOR & VIEWER SUITE ---
function analyzeSubmissionFile(fileUrl, contentText) {
  if (!fileUrl) {
    if (contentText) {
      const multiMatch = contentText.match(/\[ไฟล์แนบทั้งหมด\s*(\d+)\s*ไฟล์\]/i);
      if (multiMatch) {
        const count = parseInt(multiMatch[1], 10);
        return {
          isMultiple: true,
          filesCount: count,
          files: [],
          isImage: false,
          isPdf: false,
          isHttpLink: false,
          mime: 'application/json',
          ext: 'zip',
          label: `📁 แนบ ${count} ไฟล์`
        };
      }
      const singleMatch = contentText.match(/\[ไฟล์แนบ:\s*([^\s\]]+)/i);
      if (singleMatch) {
        const fname = singleMatch[1];
        const ext = (fname.split('.').pop() || '').toLowerCase();
        const isFprg = ext === 'fprg';
        const isPdf = ext === 'pdf';
        const isImg = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext);
        return {
          isMultiple: false,
          filesCount: 1,
          files: [],
          isImage: isImg,
          isPdf: isPdf,
          isFprg: isFprg,
          isHttpLink: false,
          mime: isPdf ? 'application/pdf' : isImg ? `image/${ext}` : isFprg ? 'application/xml' : 'application/octet-stream',
          ext: ext || 'bin',
          label: isFprg ? '📊 Flowgorithm (.fprg)' : isImg ? `🖼️ รูปภาพ (${ext.toUpperCase()})` : isPdf ? '📄 เอกสาร (PDF)' : `📁 ไฟล์ ${ext.toUpperCase()}`
        };
      }
    }
    return { isImage: false, isPdf: false, isHttpLink: false, isMultiple: false, mime: '', ext: 'bin', label: 'ไม่มีไฟล์แนบ', files: [] };
  }

  // Detect Multi-file JSON payload array
  if (typeof fileUrl === 'string' && fileUrl.trim().startsWith('[') && fileUrl.trim().endsWith(']')) {
    try {
      const parsed = JSON.parse(fileUrl);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const types = [...new Set(parsed.map(f => (f.ext || '').toUpperCase()).filter(Boolean))];
        const typesStr = types.length > 0 ? ` (${types.join(', ')})` : '';
        return {
          isMultiple: true,
          filesCount: parsed.length,
          files: parsed,
          isImage: false,
          isPdf: false,
          isHttpLink: false,
          mime: 'application/json',
          ext: 'zip',
          label: `📁 แนบ ${parsed.length} ไฟล์${typesStr}`
        };
      }
    } catch (e) {}
  }
  
  if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    let label = 'ลิงก์ภายนอก';
    if (fileUrl.includes('drive.google.com')) label = 'Google Drive';
    else if (fileUrl.includes('goodnotes.com')) label = 'GoodNotes';
    else if (fileUrl.includes('canva.')) label = 'Canva';
    return { isImage: false, isPdf: false, isHttpLink: true, mime: 'text/html', ext: 'url', label };
  }

  // Data URL parsing
  const mimeMatch = fileUrl.match(/^data:([^;]+);base64,/i);
  const mime = mimeMatch ? mimeMatch[1].toLowerCase() : '';

  // Check from contentText filename if mime is generic
  const filenameMatch = (contentText || '').match(/\[ไฟล์แนบ:\s*([^\s\]]+)/i);
  const originalFilename = filenameMatch ? filenameMatch[1] : '';

  // Detect Flowgorithm (.fprg) file
  if (originalFilename.match(/\.fprg$/i) || (fileUrl && fileUrl.toLowerCase().includes('.fprg')) || (contentText && contentText.toLowerCase().includes('.fprg'))) {
    return { isImage: false, isPdf: false, isFprg: true, isHttpLink: false, mime: 'application/xml', ext: 'fprg', label: '📊 Flowgorithm (.fprg)' };
  }

  if (mime.includes('image/jpeg') || mime.includes('image/jpg') || originalFilename.match(/\.(jpe?g)$/i)) {
    return { isImage: true, isPdf: false, isHttpLink: false, mime: 'image/jpeg', ext: 'jpg', label: '🖼️ รูปภาพ (JPG)' };
  }
  if (mime.includes('image/png') || originalFilename.match(/\.png$/i)) {
    return { isImage: true, isPdf: false, isHttpLink: false, mime: 'image/png', ext: 'png', label: '🖼️ รูปภาพ (PNG)' };
  }
  if (mime.includes('pdf') || originalFilename.match(/\.pdf$/i)) {
    return { isImage: false, isPdf: true, isHttpLink: false, mime: 'application/pdf', ext: 'pdf', label: '📄 เอกสาร (PDF)' };
  }
  if (mime.includes('image/')) {
    return { isImage: true, isPdf: false, isHttpLink: false, mime, ext: 'jpg', label: '🖼️ รูปภาพ' };
  }

  return { isImage: false, isPdf: false, isHttpLink: false, mime, ext: 'bin', label: '📁 ไฟล์แนบ' };
}

function dataUrlToBlob(dataUrl, expectedMime) {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = expectedMime || (mimeMatch ? mimeMatch[1] : 'application/octet-stream');
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


// Download a single record from multi-file array
function downloadSingleFileRecord(file, studentName, classRoom, asgId, index) {
  if (!file || !file.url) return;
  try {
    const ext = file.ext || (file.name.split('.').pop() || 'bin').toLowerCase();
    const mime = file.type || (ext === 'pdf' ? 'application/pdf' : ext === 'fprg' ? 'application/xml' : ['png','jpg','jpeg'].includes(ext) ? `image/${ext}` : 'application/octet-stream');
    const blob = dataUrlToBlob(file.url, mime);
    const blobUrl = URL.createObjectURL(blob);

    const filename = file.name || `file_${index || 1}.${ext}`;
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
    showToast(`ดาวน์โหลด ${filename} สำเร็จ!`, 'success');
  } catch (err) {
    console.error('Download error:', err);
    showToast('เกิดข้อผิดพลาดในการดาวน์โหลด: ' + err.message, 'error');
  }
}

// Download all files in a multi-file submission (ZIP or batch)
async function downloadAllSubmissionFiles(files, studentName, classRoom, asgId) {
  if (!Array.isArray(files) || files.length === 0) return;

  const cleanName = (studentName || 'student').replace(/[^\u0E00-\u0E7Fa-zA-Z0-9_-]/g, '_');
  const cleanRoom = (classRoom || 'm4').replace(/[^\u0E00-\u0E7Fa-zA-Z0-9_-]/g, '_');
  const basePrefix = `${cleanName}_${cleanRoom}_${asgId || 'worksheet'}`;

  // If JSZip is available, package into a single ZIP file!
  if (typeof JSZip !== 'undefined') {
    showToast('กำลังบีบอัดไฟล์ ZIP สำหรับดาวน์โหลด...', 'info');
    try {
      const zip = new JSZip();
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const fname = f.name || `file_${i+1}.${f.ext || 'bin'}`;
        if (f.url && f.url.startsWith('data:')) {
          const b64Data = f.url.split(',')[1];
          zip.file(fname, b64Data, { base64: true });
        }
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = `${basePrefix}_all_files.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(zipUrl), 30000);
      showToast(`ดาวน์โหลด ${basePrefix}_all_files.zip สำเร็จ!`, 'success');
      return;
    } catch (zipErr) {
      console.warn('Zip creation failed, fallback to sequential download:', zipErr);
    }
  }

  // Fallback: download each file
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    setTimeout(() => {
      downloadSingleFileRecord(f, studentName, classRoom, asgId, i + 1);
    }, i * 300);
  }
}

// Multi-file Viewer renderer
function renderMultiFileViewer(areaEl, files, sub, asgId, btnDownload, btnNewTab) {
  let activeIdx = 0;

  function updateView(idx) {
    activeIdx = idx;
    const file = files[idx];
    if (!file) return;

    // Update tab styles
    const tabs = document.querySelectorAll('.multi-file-tab-btn');
    tabs.forEach((tab, tIdx) => {
      if (tIdx === idx) {
        tab.style.background = '#059669';
        tab.style.color = '#ffffff';
        tab.style.borderColor = '#34d399';
        tab.style.boxShadow = '0 2px 10px rgba(16, 185, 129, 0.45)';
      } else {
        tab.style.background = 'rgba(255, 255, 255, 0.08)';
        tab.style.color = '#cbd5e1';
        tab.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        tab.style.boxShadow = 'none';
      }
    });

    const fileContentEl = document.getElementById('multi-file-active-content');
    if (!fileContentEl) return;

    const ext = (file.ext || (file.name ? file.name.split('.').pop() : '')).toLowerCase();
    const isImg = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext) || (file.url && file.url.startsWith('data:image/'));
    const isPdf = ext === 'pdf' || (file.url && file.url.startsWith('data:application/pdf'));
    const isFprg = ext === 'fprg' || (file.name && file.name.endsWith('.fprg'));

    if (isImg) {
      fileContentEl.innerHTML = `
        <div style="max-height: 60vh; overflow: auto; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 4px;">
          <div style="background: #020617; padding: 10px; border-radius: 12px; border: 1.5px solid #1e293b; max-width: 100%; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.6);">
            <img src="${file.url}" alt="${escapeHtml(file.name)}" style="max-width: 100%; max-height: 52vh; object-fit: contain; border-radius: 6px; cursor: zoom-in;" onclick="openInNewTab('${file.url}', { mime: '${file.type || 'image/png'}' })" title="คลิกเปิดดูรูปขนาดเต็ม" />
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;">
            <span style="font-size: 0.82rem; color: #38bdf8; font-weight: 700; background: rgba(56, 189, 248, 0.12); padding: 4px 12px; border-radius: 6px; border: 1px solid rgba(56, 189, 248, 0.3);">
              <i class="fa-solid fa-image mr-1"></i> ${escapeHtml(file.name)} (${(file.size / 1024).toFixed(1)} KB)
            </span>
            <button type="button" onclick="openInNewTab('${file.url}', { mime: '${file.type || 'image/png'}' })" class="btn" style="background: rgba(255,255,255,0.1); color: #ffffff; font-size: 0.78rem; font-weight: 700; padding: 4px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.25); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-magnifying-glass-plus"></i> ดูรูปขนาดเต็ม (แท็บใหม่)
            </button>
          </div>
        </div>
      `;
    } else if (isPdf) {
      const pdfBlob = dataUrlToBlob(file.url, 'application/pdf');
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);
      fileContentEl.innerHTML = `
        <object data="${pdfBlobUrl}" type="application/pdf" style="width: 100%; height: 55vh; border-radius: 8px; border: none;">
          <div style="color: #cbd5e1; padding: 30px 20px;">
            <i class="fa-solid fa-file-pdf text-4xl text-rose-500 mb-2 block"></i>
            <p style="font-weight: 700; margin-bottom: 8px;">${escapeHtml(file.name)}</p>
            <a href="${pdfBlobUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 8px 18px; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> คลิกเปิดไฟล์ PDF ในแท็บใหม่
            </a>
          </div>
        </object>
      `;
    } else if (isFprg) {
      let previewCode = '';
      try {
        if (file.url && file.url.startsWith('data:')) {
          const b64 = file.url.split(',')[1];
          if (b64) {
            const decoded = atob(b64);
            if (decoded && (decoded.includes('<flowgorithm') || decoded.includes('<?xml'))) {
              previewCode = decoded.slice(0, 3000);
            }
          }
        }
      } catch (e) {}

      fileContentEl.innerHTML = `
        <div style="padding: 16px; color: #cbd5e1; max-width: 720px; margin: 0 auto; text-align: center;">
          <div style="width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #0284c7, #2563eb); color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 1.6rem; margin-bottom: 10px; box-shadow: 0 4px 16px rgba(2, 132, 199, 0.4);">
            <i class="fa-solid fa-diagram-project"></i>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #ffffff; margin-bottom: 4px;">${escapeHtml(file.name)}</h4>
          <p style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 12px;">
            ไฟล์ผังงาน Flowgorithm • ${(file.size / 1024).toFixed(1)} KB
          </p>
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
            <button type="button" onclick="downloadSingleFileRecord(window.__currentMultiFiles[${idx}], '${escapeHtml(sub?.student_name)}', '${escapeHtml(sub?.class_room)}', '${escapeHtml(asgId)}', ${idx})" class="btn btn-primary" style="padding: 8px 18px; font-weight: 700; font-size: 0.84rem; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
              <i class="fa-solid fa-download"></i> ดาวน์โหลด ${escapeHtml(file.name)}
            </button>
            <a href="flowgorithm-guide.html" target="_blank" class="btn" style="background: rgba(2, 132, 199, 0.15); color: #38bdf8; border: 1.5px solid rgba(2, 132, 199, 0.4); padding: 8px 16px; font-weight: 700; font-size: 0.84rem; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; border-radius: 8px;">
              <i class="fa-solid fa-book-open"></i> คู่มือ Flowgorithm ↗
            </a>
          </div>
          ${previewCode ? `
            <div style="text-align: left; background: #020617; border: 1px solid #1e293b; border-radius: 10px; padding: 10px 14px; font-family: monospace; font-size: 0.74rem; color: #94a3b8; max-height: 200px; overflow: auto; white-space: pre-wrap; line-height: 1.45;">
              <div style="color: #38bdf8; font-weight: 700; margin-bottom: 4px; border-bottom: 1px solid #1e293b; padding-bottom: 2px;">โครงสร้างไฟล์ Flowgorithm XML (.fprg):</div>
              ${escapeHtml(previewCode)}
            </div>
          ` : ''}
        </div>
      `;
    } else {
      fileContentEl.innerHTML = `
        <div style="padding: 30px; text-align: center; color: #cbd5e1;">
          <i class="fa-solid fa-file text-4xl text-blue-400 mb-2 block"></i>
          <h4 style="font-weight: 700; margin-bottom: 6px;">${escapeHtml(file.name)}</h4>
          <p style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 14px;">ขนาด: ${(file.size / 1024).toFixed(1)} KB</p>
          <button type="button" onclick="downloadSingleFileRecord(window.__currentMultiFiles[${idx}], '${escapeHtml(sub?.student_name)}', '${escapeHtml(sub?.class_room)}', '${escapeHtml(asgId)}', ${idx})" class="btn btn-primary" style="padding: 8px 18px;">
            <i class="fa-solid fa-download mr-1"></i> ดาวน์โหลดไฟล์นี้
          </button>
        </div>
      `;
    }

    if (btnDownload) {
      btnDownload.innerHTML = `<i class="fa-solid fa-download"></i> โหลดไฟล์ที่เลือก (.${ext ? ext.toUpperCase() : 'FILE'})`;
      btnDownload.onclick = () => {
        downloadSingleFileRecord(file, sub?.student_name, sub?.class_room, asgId, idx);
      };
    }

    if (btnNewTab) {
      btnNewTab.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> เปิดไฟล์นี้ในแท็บใหม่';
      btnNewTab.onclick = () => {
        openInNewTab(file.url, { mime: file.type || (isImg ? 'image/png' : 'application/octet-stream') });
      };
    }
  }

  window.__currentMultiFiles = files;
  window.__currentMultiFileSwitcher = updateView;

  areaEl.innerHTML = `
    <div style="display: flex; flex-direction: column; width: 100%; height: 100%; gap: 10px;">
      
      <!-- Multi-file Tabs Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e293b; padding-bottom: 8px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; gap: 6px; overflow-x: auto; max-width: 100%; padding-bottom: 4px;">
          ${files.map((f, i) => {
            const ext = (f.ext || '').toLowerCase();
            const icon = ext === 'fprg' ? 'fa-diagram-project' : ['png','jpg','jpeg','webp'].includes(ext) ? 'fa-image' : ext === 'pdf' ? 'fa-file-pdf' : 'fa-file';
            return `
              <button type="button" class="multi-file-tab-btn" onclick="window.__currentMultiFileSwitcher(${i})" style="padding: 7px 14px; border-radius: 8px; font-size: 0.8rem; font-weight: 800; border: 1.5px solid transparent; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; transition: all 0.2s;">
                <i class="fa-solid ${icon}"></i>
                <span>${i + 1}. ${escapeHtml(f.name.length > 24 ? f.name.slice(0, 22) + '...' : f.name)}</span>
              </button>
            `;
          }).join('')}
        </div>

        <button type="button" onclick="downloadAllSubmissionFiles(window.__currentMultiFiles, '${escapeHtml(sub?.student_name)}', '${escapeHtml(sub?.class_room)}', '${escapeHtml(asgId)}')" class="btn" style="background: linear-gradient(135deg, #0284c7, #2563eb); color: white; font-size: 0.8rem; font-weight: 800; padding: 7px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);">
          <i class="fa-solid fa-file-zipper"></i> ดาวน์โหลดทุกไฟล์ (${files.length} ไฟล์ .zip)
        </button>
      </div>

      <!-- Active File Viewer Area -->
      <div id="multi-file-active-content" style="flex: 1; display: flex; align-items: center; justify-content: center; min-height: 420px;">
      </div>
    </div>
  `;

  updateView(0);
}

function downloadSubmissionFile(fileUrl, studentName, classRoom, asgId, fileInfo) {
  if (!fileUrl) return;

  if (fileUrl.startsWith('http')) {
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  try {
    const info = fileInfo || analyzeSubmissionFile(fileUrl);
    const blob = dataUrlToBlob(fileUrl, info.mime);
    const blobUrl = URL.createObjectURL(blob);

    const cleanName = (studentName || 'student')
      .replace(/[^\u0E00-\u0E7Fa-zA-Z0-9_-]/g, '_')
      .replace(/_{2,}/g, '_');
    const cleanRoom = (classRoom || 'm4')
      .replace(/[^\u0E00-\u0E7Fa-zA-Z0-9_-]/g, '_');
    const filename = `${cleanName}_${cleanRoom}_${asgId || 'worksheet'}.${info.ext}`;

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
    showToast(`ดาวน์โหลด ${filename} สำเร็จ!`, 'success');
  } catch (err) {
    console.error('Download error:', err);
    showToast('เกิดข้อผิดพลาดในการดาวน์โหลด: ' + err.message, 'error');
  }
}

async function downloadSubmissionFileById(subId, studentName, classRoom, asgId) {
  let sub = Array.isArray(allSubmissionsGlobalCache) ? allSubmissionsGlobalCache.find(s => s.id === subId) : null;
  let fileUrl = sub?.file_url || submissionFileCache[subId];

  if (fileUrl) {
    const info = analyzeSubmissionFile(fileUrl, sub?.content);
    if (info.isMultiple) {
      downloadAllSubmissionFiles(info.files, studentName || sub?.student_name, classRoom || sub?.class_room, asgId);
    } else {
      downloadSubmissionFile(fileUrl, studentName || sub?.student_name, classRoom || sub?.class_room, asgId, info);
    }
    return;
  }

  showToast('กำลังเตรียมดาวน์โหลดไฟล์...', 'info');
  try {
    const res = await fetch(`${SUPABASE_REST_URL}/submissions?id=eq.${encodeURIComponent(subId)}&select=file_url`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    });
    if (!res.ok) throw new Error('ไม่สามารถดึงข้อมูลไฟล์ได้');
    const data = await res.json();
    fileUrl = data[0]?.file_url;
    if (!fileUrl) {
      showToast('ไม่พบไฟล์แนบสำหรับรายการนี้', 'warning');
      return;
    }
    submissionFileCache[subId] = fileUrl;
    if (sub) sub.file_url = fileUrl;
    const info = analyzeSubmissionFile(fileUrl, sub?.content);
    if (info.isMultiple) {
      downloadAllSubmissionFiles(info.files, studentName || sub?.student_name, classRoom || sub?.class_room, asgId);
    } else {
      downloadSubmissionFile(fileUrl, studentName || sub?.student_name, classRoom || sub?.class_room, asgId, info);
    }
  } catch (err) {
    showToast('เกิดข้อผิดพลาด: ' + err.message, 'error');
  }
}

function openInNewTab(fileUrl, fileInfo) {
  if (fileUrl.startsWith('http')) {
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
    return;
  }
  try {
    const info = fileInfo || analyzeSubmissionFile(fileUrl);
    const blob = dataUrlToBlob(fileUrl, info.mime);
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank', 'noopener,noreferrer');
  } catch (e) {
    window.open(fileUrl, '_blank');
  }
}

// In-Browser Instant Work Previewer (Opens modal without requiring download to disk)
async function previewSubmissionWork(subId, studentName, asgId) {
  let sub = Array.isArray(allSubmissionsGlobalCache) ? allSubmissionsGlobalCache.find(s => s.id === subId) : null;
  
  const nameEl = document.getElementById('viewer-student-name');
  const roomEl = document.getElementById('viewer-student-room');
  const badgeEl = document.getElementById('viewer-file-type-badge');
  const asgEl = document.getElementById('viewer-asg-title');
  const areaEl = document.getElementById('viewer-content-area');
  const noteEl = document.getElementById('viewer-student-note');
  const btnDownload = document.getElementById('btn-viewer-download');
  const btnNewTab = document.getElementById('btn-viewer-new-tab');
  const btnGrade = document.getElementById('btn-viewer-grade');

  if (nameEl) nameEl.innerText = studentName || sub?.student_name || 'งานนักเรียน';
  if (roomEl) roomEl.innerText = sub?.class_room || 'ม.4';
  if (asgEl) asgEl.innerText = sub?.assignment_title || asgId || 'ใบงาน';

  if (noteEl) {
    if (sub?.content && sub.content.trim()) {
      noteEl.style.display = 'block';
      noteEl.innerHTML = `<strong>ข้อความจากนักเรียน:</strong> ${escapeHtml(sub.content)}`;
    } else {
      noteEl.style.display = 'none';
    }
  }

  if (areaEl) {
    areaEl.innerHTML = '<div style="color: #94a3b8; font-size: 0.9rem;"><i class="fa-solid fa-circle-notch fa-spin text-2xl mb-2 block text-emerald-400"></i>กำลังโหลดไฟล์งานของนักเรียน...</div>';
  }

  // Handle Teacher Navigation & Integrated Grading Toolbar Setup
  const isTeacher = currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin');
  const navContainer = document.getElementById('viewer-nav-container');
  const gradingBar = document.getElementById('viewer-teacher-grading-bar');
  const navCounter = document.getElementById('viewer-nav-counter');
  const prevBtn = document.getElementById('btn-viewer-prev');
  const nextBtn = document.getElementById('btn-viewer-next');

  if (isTeacher) {
    // Resolve active navigation list
    if (Array.isArray(window.__teacherCurrentFilteredSubmissions) && window.__teacherCurrentFilteredSubmissions.some(s => s.id === subId)) {
      window.currentViewerSubmissionList = window.__teacherCurrentFilteredSubmissions;
    } else if (Array.isArray(allSubmissionsGlobalCache)) {
      window.currentViewerSubmissionList = allSubmissionsGlobalCache.filter(s => s.status === 'submitted');
      if (window.currentViewerSubmissionList.length === 0) window.currentViewerSubmissionList = [...allSubmissionsGlobalCache];
    } else {
      window.currentViewerSubmissionList = [];
    }

    let foundIdx = window.currentViewerSubmissionList.findIndex(s => s.id === subId);
    if (foundIdx === -1) {
      if (sub) {
        window.currentViewerSubmissionList.push(sub);
        foundIdx = window.currentViewerSubmissionList.length - 1;
      } else {
        foundIdx = 0;
      }
    }
    window.currentViewerSubIndex = foundIdx;

    if (navContainer) navContainer.style.display = 'flex';
    if (navCounter) navCounter.innerText = `${foundIdx + 1} / ${window.currentViewerSubmissionList.length}`;
    if (prevBtn) {
      prevBtn.disabled = foundIdx <= 0;
      prevBtn.style.opacity = foundIdx <= 0 ? '0.4' : '1';
    }
    if (nextBtn) {
      nextBtn.disabled = foundIdx >= window.currentViewerSubmissionList.length - 1;
      nextBtn.style.opacity = foundIdx >= window.currentViewerSubmissionList.length - 1 ? '0.4' : '1';
    }

    if (gradingBar) {
      gradingBar.style.display = 'block';
      const hiddenSubId = document.getElementById('viewer-sub-id');
      const scoreInput = document.getElementById('viewer-inline-score-input');
      const feedbackInput = document.getElementById('viewer-inline-feedback-input');

      if (hiddenSubId) hiddenSubId.value = subId;
      if (scoreInput) scoreInput.value = (sub?.score !== undefined && sub?.score !== null) ? sub.score : 10;
      if (feedbackInput) feedbackInput.value = sub?.feedback || '';

      const currentScore = Number(scoreInput ? scoreInput.value : 10);
      document.querySelectorAll('.quick-score-btn').forEach(btn => {
        if (Number(btn.dataset.score) === currentScore) {
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

    if (btnGrade) btnGrade.style.display = 'none';
  } else {
    if (navContainer) navContainer.style.display = 'none';
    if (gradingBar) gradingBar.style.display = 'none';
    if (btnGrade) btnGrade.style.display = 'none';
  }

  openModal('modal-view-submission-work');

  // Wire up grade button to open grade modal directly
  if (btnGrade) {
    btnGrade.onclick = () => {
      closeModal('modal-view-submission-work');
      openGradeModal(subId, studentName, sub?.score || 10);
    };
  }

  // Fetch file if not in cache
  let fileUrl = sub?.file_url || submissionFileCache[subId];
  if (!fileUrl) {
    try {
      const res = await fetch(`${SUPABASE_REST_URL}/submissions?id=eq.${encodeURIComponent(subId)}&select=file_url`, {
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
      });
      if (res.ok) {
        const data = await res.json();
        fileUrl = data[0]?.file_url;
        if (fileUrl) {
          submissionFileCache[subId] = fileUrl;
          if (sub) sub.file_url = fileUrl;
        }
      }
    } catch (e) {
      console.warn('Preview file fetch error:', e);
    }
  }

  if (!fileUrl) {
    if (areaEl) {
      areaEl.innerHTML = `
        <div style="padding: 30px; color: #cbd5e1;">
          <i class="fa-solid fa-file-circle-xmark text-4xl text-amber-400 mb-3 block"></i>
          <h4 style="font-weight: 700; margin-bottom: 6px;">ไม่พบไฟล์แนบ</h4>
          <p style="font-size: 0.85rem; color: #94a3b8;">นักเรียนอาจส่งเฉพาะข้อความคำตอบ หรือส่งงานผ่านลิงก์อื่น</p>
        </div>
      `;
    }
    if (btnDownload) btnDownload.style.display = 'none';
    if (btnNewTab) btnNewTab.style.display = 'none';
    return;
  }

  // Detect MIME & extension
  const fileInfo = analyzeSubmissionFile(fileUrl, sub?.content);

  if (badgeEl) {
    badgeEl.innerText = fileInfo.label;
    badgeEl.style.background = fileInfo.isImage ? 'rgba(16, 185, 129, 0.2)' : fileInfo.isPdf ? 'rgba(239, 68, 68, 0.2)' : 'rgba(2, 132, 199, 0.2)';
    badgeEl.style.color = fileInfo.isImage ? '#6ee7b7' : fileInfo.isPdf ? '#fca5a5' : '#7dd3fc';
  }

  // Setup download button
  if (btnDownload) {
    btnDownload.style.display = 'inline-flex';
    btnDownload.innerHTML = `<i class="fa-solid fa-download"></i> ${fileInfo.isMultiple ? 'โหลดทั้งหมด (.zip)' : `โหลด .${fileInfo.ext}`}`;
    btnDownload.onclick = () => {
      downloadSubmissionFile(fileUrl, studentName || sub?.student_name, sub?.class_room, asgId, fileInfo);
    };
  }

  // Setup new tab button
  if (btnNewTab) {
    btnNewTab.style.display = 'inline-flex';
    btnNewTab.onclick = () => {
      openInNewTab(fileUrl, fileInfo);
    };
  }

  
  // If multi-file, delegate to multi-file renderer!
  if (fileInfo.isMultiple) {
    if (badgeEl) {
      badgeEl.innerText = fileInfo.label;
      badgeEl.style.background = 'rgba(2, 132, 199, 0.2)';
      badgeEl.style.color = '#7dd3fc';
    }
    renderMultiFileViewer(areaEl, fileInfo.files, sub, asgId, btnDownload, btnNewTab);
    return;
  }
// Render preview inside areaEl
  if (areaEl) {
    if (fileInfo.isImage) {
      areaEl.innerHTML = `
        <div style="max-height: 65vh; overflow: auto; width: 100%; display: flex; justify-content: center; align-items: center;">
          <img src="${fileUrl}" alt="ผลงานของนักเรียน" style="max-width: 100%; max-height: 65vh; object-fit: contain; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);" />
        </div>
      `;
    } else if (fileInfo.isPdf) {
      const pdfBlob = dataUrlToBlob(fileUrl, 'application/pdf');
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);
      areaEl.innerHTML = `
        <object data="${pdfBlobUrl}" type="application/pdf" style="width: 100%; height: 65vh; border-radius: 8px; border: none;">
          <div style="color: #cbd5e1; padding: 40px 20px;">
            <i class="fa-solid fa-file-pdf text-4xl text-rose-500 mb-3 block"></i>
            <p style="font-weight: 700; margin-bottom: 8px;">เบราว์เซอร์ไม่รองรับการแสดงตัวอย่าง PDF ในหน้าต่างนี้</p>
            <a href="${pdfBlobUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 8px 18px; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> คลิกเปิดไฟล์ PDF ในแท็บใหม่
            </a>
          </div>
        </object>
      `;
    } else if (fileInfo.isFprg) {
      let previewCode = '';
      try {
        if (fileUrl.startsWith('data:')) {
          const b64 = fileUrl.split(',')[1];
          if (b64) {
            const decoded = atob(b64);
            if (decoded && (decoded.includes('<flowgorithm') || decoded.includes('<?xml'))) {
              previewCode = decoded.slice(0, 3500);
            }
          }
        }
      } catch (e) {}

      areaEl.innerHTML = `
        <div style="padding: 24px; color: #cbd5e1; max-width: 720px; margin: 0 auto; text-align: center;">
          <div style="width: 76px; height: 76px; border-radius: 20px; background: linear-gradient(135deg, #0284c7, #2563eb); color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 2.2rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(2, 132, 199, 0.4);">
            <i class="fa-solid fa-diagram-project"></i>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin-bottom: 6px;">ไฟล์ผังงาน Flowgorithm (.fprg)</h4>
          <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 18px; line-height: 1.5;">
            ไฟล์โปรแกรมผังงานต้นฉบับ สามารถดาวน์โหลดไปเปิดรันและทดสอบขั้นตอนวิธี (Step-by-Step Interactive Simulation) ในโปรแกรม Flowgorithm ได้ทันที
          </p>
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
            <button type="button" onclick="downloadSubmissionFileById('${escapeHtml(sub.id)}', '${escapeHtml(studentName || sub?.student_name)}', '${escapeHtml(sub?.class_room)}', '${escapeHtml(asgId)}')" class="btn btn-primary" style="padding: 10px 24px; font-weight: 700; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35); cursor: pointer;">
              <i class="fa-solid fa-cloud-arrow-down"></i> ดาวน์โหลดไฟล์ .fprg
            </button>
            <a href="flowgorithm-guide.html" target="_blank" class="btn" style="background: rgba(2, 132, 199, 0.15); color: #38bdf8; border: 1.5px solid rgba(2, 132, 199, 0.4); padding: 10px 20px; font-weight: 700; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; border-radius: 8px;">
              <i class="fa-solid fa-book-open"></i> คู่มือ Flowgorithm ↗
            </a>
          </div>
          ${previewCode ? `
            <div style="text-align: left; background: #090d16; border: 1px solid #1e293b; border-radius: 12px; padding: 14px; margin-top: 14px;">
              <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
                <span><i class="fa-solid fa-code text-sky-400 mr-1"></i> โครงสร้าง Flowgorithm XML Code:</span>
                <span>(ตัวอย่างเนื้อหาไฟล์ผังงาน)</span>
              </div>
              <pre style="margin: 0; font-family: 'Consolas', monospace; font-size: 0.75rem; color: #a5f3fc; overflow-x: auto; max-height: 240px; line-height: 1.45; white-space: pre-wrap;">${escapeHtml(previewCode)}</pre>
            </div>
          ` : ''}
        </div>
      `;
    } else if (fileInfo.isHttpLink) {
      areaEl.innerHTML = `
        <div style="padding: 40px 20px; color: #cbd5e1;">
          <i class="fa-solid fa-link text-4xl text-sky-400 mb-3 block"></i>
          <h4 style="font-weight: 700; margin-bottom: 8px;">ลิงก์ผลงานภายนอก (${fileInfo.label})</h4>
          <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 20px; word-break: break-all; max-width: 500px; margin-left: auto; margin-right: auto;">${escapeHtml(fileUrl)}</p>
          <a href="${escapeHtml(fileUrl)}" target="_blank" rel="noopener noreferrer" class="btn" style="background: #0284c7; color: white; font-weight: 700; padding: 10px 24px; border-radius: 12px; font-size: 0.9rem; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> เปิดดูงานใน ${fileInfo.label} (แท็บใหม่) ↗
          </a>
        </div>
      `;
    }
  }
}

// Backward compatibility alias
function openOrDownloadSubmissionFile(subId, studentName, asgId) {
  previewSubmissionWork(subId, studentName, asgId);
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
      let filteredAssignments = assignments;
      if (currentAssignmentCategory === 'theory') {
        filteredAssignments = assignments.filter(a => a.category === 'theory' || (!a.id.startsWith('asg-flow-') && a.unit !== 'practical'));
      } else if (currentAssignmentCategory === 'practical') {
        filteredAssignments = assignments.filter(a => a.category === 'practical' || a.id.startsWith('asg-flow-') || a.unit === 'practical');
      }

      asgContainer.innerHTML = filteredAssignments.map(asg => {
        const mySub = (currentUser && currentUser.role === 'student') ? submissions.find(s => s.assignment_id === asg.id && isMySubmission(s, currentUser)) : null;

        let actionBtnHtml = '';
        if (!currentUser) {
          actionBtnHtml = `
            <button onclick="openLoginModal()" class="btn btn-outline" style="font-size: 0.78rem; padding: 6px 14px; border-color: var(--thairath-green); color: var(--thairath-green); font-weight: 700;">
              <i class="fa-solid fa-arrow-right-to-bracket mr-1"></i> เข้าสู่ระบบเพื่อส่งงาน
            </button>
          `;
        } else if (currentUser.role === 'student') {
          let btnText = 'ส่งงาน (Supabase Cloud)';
          let btnBg = 'bg-emerald-600 hover:bg-emerald-700';
          let btnIcon = 'fa-upload';

          if (mySub) {
            if (mySub.status === 'returned' || mySub.status === 'revision_requested') {
              btnText = 'ส่งงานใหม่ (ครูส่งกลับแก้ไข)';
              btnBg = 'bg-amber-600 hover:bg-amber-700';
              btnIcon = 'fa-rotate-left';
            } else if (mySub.status === 'graded') {
              btnText = `ส่งแล้ว (ตรวจแล้ว ${mySub.score} คะแนน)`;
              btnBg = 'bg-blue-600 hover:bg-blue-700';
              btnIcon = 'fa-check';
            } else {
              btnText = 'ส่งแล้ว (รอครูตรวจคะแนน)';
              btnBg = 'bg-emerald-600 hover:bg-emerald-700';
              btnIcon = 'fa-clock';
            }
          }

          actionBtnHtml = `
            <button onclick="openSubmitModal('${asg.id}', '${escapeHtml(asg.title)}')" class="${btnBg} text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm transition">
              <i class="fa-solid ${btnIcon} mr-1"></i> ${btnText}
            </button>
          `;
        } else {
          // Teacher / Admin
          const wsId = asg.ws_id || (asg.id === 'asg-1' ? 'ws-1-1' : asg.id === 'asg-2' ? 'ws-1-2' : asg.id === 'asg-3' ? 'ws-1-3' : asg.id === 'asg-4' ? 'ws-2-1' : asg.id === 'asg-5' ? 'ws-2-2' : asg.id === 'asg-6' ? 'ws-2-3' : asg.id === 'asg-flow-1' ? 'ws-flow-1' : asg.id === 'asg-flow-2' ? 'ws-flow-2' : asg.id === 'asg-flow-3' ? 'ws-flow-3' : 'ws-1-1');
          actionBtnHtml = `
            <button onclick="openWorksheetDetail('${wsId}')" class="btn btn-outline" style="font-size: 0.78rem; padding: 6px 14px; font-weight: 700;">
              <i class="fa-solid fa-file-signature mr-1"></i> ดูใบงาน / เฉลยครู
            </button>
          `;
        }

        return `
          <div class="p-4 rounded-2xl border border-slate-200 bg-white space-y-2" style="background: var(--surface-color); border: 1px solid var(--border-color);">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-sm text-slate-800" style="color: var(--text-main); font-size: 0.98rem; font-weight: 800;">${escapeHtml(asg.title)}</h4>
              <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                เต็ม ${asg.total_points || asg.points || 10} คะแนน
              </span>
            </div>
            <p class="text-xs text-slate-600" style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6;">${escapeHtml(asg.description || asg.desc || '')}</p>
            <div class="flex items-center justify-between pt-2">
              <span class="text-[11px] text-slate-400" style="color: var(--text-subtle); font-size: 0.8rem; font-weight: 600;">กำหนดส่ง: ${escapeHtml(asg.due_date || asg.due || '2026-10-15')}</span>
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

// --- PRO MULTI-FILE ASSIGNMENT SUBMISSION & UPLOAD SYSTEM ---
let currentSubmitMode = 'upload';
let currentSelectedFiles = [];
let currentSelectedFile = null; // backward compatibility

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
  const files = event.target.files;
  if (files && files.length > 0) {
    addUploadFiles(Array.from(files));
  }
  event.target.value = '';
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
  const files = event.dataTransfer && event.dataTransfer.files;
  if (files && files.length > 0) {
    addUploadFiles(Array.from(files));
  }
}

function addUploadFiles(newFiles) {
  let addedCount = 0;
  for (const file of newFiles) {
    if (file.size > 25 * 1024 * 1024) {
      showToast(`ไฟล์ "${file.name}" มีขนาดใหญ่เกิน 25MB`, 'error');
      continue;
    }
    const isDup = currentSelectedFiles.some(f => f.name === file.name && f.size === file.size);
    if (!isDup) {
      currentSelectedFiles.push(file);
      addedCount++;
    }
  }
  currentSelectedFile = currentSelectedFiles[0] || null;
  renderSelectedFilesList();
  if (addedCount > 0) {
    showToast(`แนบไฟล์สำเร็จ ${addedCount} ไฟล์ (รวมทั้งหมด ${currentSelectedFiles.length} ไฟล์)`, 'success');
  }
}

function removeSelectedFile(index) {
  if (index >= 0 && index < currentSelectedFiles.length) {
    const removed = currentSelectedFiles.splice(index, 1);
    currentSelectedFile = currentSelectedFiles[0] || null;
    renderSelectedFilesList();
    if (removed[0]) {
      showToast(`นำไฟล์ "${removed[0].name}" ออกแล้ว`, 'info');
    }
  }
}

function clearSelectedFiles() {
  currentSelectedFiles = [];
  currentSelectedFile = null;
  const input = document.getElementById('submit-file-input');
  if (input) input.value = '';
  renderSelectedFilesList();
}

function clearSelectedFile() {
  clearSelectedFiles();
}

function renderSelectedFilesList() {
  const container = document.getElementById('selected-files-container');
  const listEl = document.getElementById('selected-files-list');
  const countBadge = document.getElementById('selected-files-count-badge');

  if (!container || !listEl) return;

  if (currentSelectedFiles.length === 0) {
    container.style.display = 'none';
    listEl.innerHTML = '';
    return;
  }

  container.style.display = 'block';

  let totalBytes = 0;
  listEl.innerHTML = currentSelectedFiles.map((file, idx) => {
    totalBytes += file.size;
    const sizeStr = file.size < 1024 * 1024 
      ? (file.size / 1024).toFixed(1) + ' KB' 
      : (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    const ext = (file.name.split('.').pop() || '').toLowerCase();
    let iconClass = 'fa-file-lines text-slate-400';
    let iconBg = 'rgba(100, 116, 139, 0.15)';
    if (ext === 'fprg') {
      iconClass = 'fa-diagram-project text-blue-500';
      iconBg = 'rgba(2, 132, 199, 0.15)';
    } else if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext)) {
      iconClass = 'fa-file-image text-emerald-500';
      iconBg = 'rgba(16, 185, 129, 0.15)';
    } else if (ext === 'pdf') {
      iconClass = 'fa-file-pdf text-rose-500';
      iconBg = 'rgba(239, 68, 68, 0.15)';
    } else if (['zip', 'rar', '7z'].includes(ext)) {
      iconClass = 'fa-file-zipper text-amber-500';
      iconBg = 'rgba(245, 158, 11, 0.15)';
    }

    return `
      <div style="display: flex; align-items: center; justify-content: space-between; background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 10px; padding: 8px 12px; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px; overflow: hidden; flex: 1;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: ${iconBg}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem;">
            <i class="fa-solid ${iconClass}"></i>
          </div>
          <div style="overflow: hidden; text-align: left; flex: 1;">
            <div style="font-weight: 700; font-size: 0.84rem; color: var(--text-main); white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" title="${escapeHtml(file.name)}">
              ${escapeHtml(file.name)}
            </div>
            <div style="font-size: 0.72rem; color: var(--text-subtle);">
              ${sizeStr} • <span style="text-transform: uppercase; font-weight: 600;">${escapeHtml(ext)}</span>
            </div>
          </div>
        </div>
        <button type="button" onclick="removeSelectedFile(${idx})" style="background: none; border: none; cursor: pointer; padding: 6px; color: #ef4444; border-radius: 6px; transition: background 0.2s;" title="ลบไฟล์นี้">
          <i class="fa-solid fa-trash-can" style="font-size: 0.95rem;"></i>
        </button>
      </div>
    `;
  }).join('');

  const totalStr = totalBytes < 1024 * 1024 
    ? (totalBytes / 1024).toFixed(1) + ' KB' 
    : (totalBytes / (1024 * 1024)).toFixed(2) + ' MB';

  if (countBadge) {
    countBadge.innerHTML = `<i class="fa-solid fa-paperclip mr-1"></i> แนบแล้ว ${currentSelectedFiles.length} ไฟล์ (ขนาดรวม ${totalStr})`;
  }
}

// Client-side image compressor (draws to offscreen canvas if > 1.5MB to save Supabase payload limit)
async function compressImageFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1920;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('ไม่สามารถอ่านไฟล์ได้'));
    reader.readAsDataURL(file);
  });
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
    const rawName = currentUser.full_name || currentUser.username || 'นักเรียน';
    const roomStr = currentUser.class_room ? `(${currentUser.class_room})` : '';
    const cleanDisplay = (roomStr && rawName.includes(roomStr)) ? rawName : `${rawName} ${roomStr}`.trim();
    userInfoText.innerText = `ผู้ส่งงาน: ${cleanDisplay}`;
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
    if (currentSelectedFiles.length === 0 && !content) {
      showToast('กรุณาเลือกไฟล์ที่ต้องการส่ง หรือพิมพ์รายละเอียดงาน', 'error');
      return;
    }

    if (currentSelectedFiles.length > 0) {
      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-1"></i> กำลังเตรียมไฟล์...';
        }
        if (progressWrap) progressWrap.style.display = 'block';

        const fileRecords = [];
        const total = currentSelectedFiles.length;

        for (let i = 0; i < total; i++) {
          const file = currentSelectedFiles[i];
          const pct = Math.round(((i + 0.5) / total) * 90);
          if (progressBar) progressBar.style.width = pct + '%';
          if (progressPct) progressPct.innerText = pct + '%';
          if (progressText) progressText.innerText = `กำลังประมวลผลไฟล์ (${i + 1}/${total}): ${file.name}`;

          let fileDataUrl = '';
          const isLargeImage = file.type && file.type.startsWith('image/') && file.size > 1.5 * 1024 * 1024;
          if (isLargeImage) {
            fileDataUrl = await compressImageFile(file);
          } else {
            fileDataUrl = await readFileAsDataUrl(file);
          }

          fileRecords.push({
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream',
            ext: (file.name.split('.').pop() || '').toLowerCase(),
            url: fileDataUrl
          });
        }

        if (progressBar) progressBar.style.width = '100%';
        if (progressPct) progressPct.innerText = '100%';
        if (progressText) progressText.innerText = 'ประมวลผลไฟล์ทั้งหมดเสร็จสมบูรณ์!';

        if (fileRecords.length === 1) {
          file_url = fileRecords[0].url;
          const fileNote = `[ไฟล์แนบ: ${fileRecords[0].name} (${(fileRecords[0].size / 1024).toFixed(1)} KB)]`;
          if (!content) content = `ส่งไฟล์ผลงาน ${fileNote}`;
          else if (!content.includes(fileRecords[0].name)) content = `${content}\n${fileNote}`;
        } else {
          file_url = JSON.stringify(fileRecords);
          const fileNotes = fileRecords.map((f, i) => `${i + 1}) ${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join('\n');
          const summaryNote = `[ไฟล์แนบทั้งหมด ${fileRecords.length} ไฟล์]:\n${fileNotes}`;
          if (!content) content = summaryNote;
          else content = `${content}\n\n${summaryNote}`;
        }

      } catch (uploadErr) {
        console.error('File process error:', uploadErr);
        showToast(uploadErr.message || 'เกิดข้อผิดพลาดในการประมวลผลไฟล์', 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane mr-1"></i> ยืนยันการส่งงาน';
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
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-1"></i> กำลังส่งงานเข้าระบบ...';
    }

    const studentUser = currentUser || {};
    const studentId = studentUser.id || studentUser.student_id || studentUser.username || '10001';
    let studentName = studentUser.full_name || studentUser.real_name || 'นักเรียน';
    const classRoom = studentUser.class_room || 'ม.4/1';
    if (classRoom && studentName.includes(`(${classRoom})`)) {
      studentName = studentName.replace(`(${classRoom})`, '').trim();
    }
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

    // 5. Always persist to in-memory cache and localStorage
    submissionFileCache[subId] = file_url;
    let localSubs = JSON.parse(localStorage.getItem('csm4_submissions') || '[]');
    const existIdx = localSubs.findIndex(s => s.id === subId);
    if (existIdx >= 0) {
      localSubs[existIdx] = { ...localSubs[existIdx], ...submissionRecord };
    } else {
      localSubs.unshift(submissionRecord);
    }
    localStorage.setItem('csm4_submissions', JSON.stringify(localSubs));

    // Update global memory array
    if (Array.isArray(allSubmissionsGlobalCache)) {
      const gIdx = allSubmissionsGlobalCache.findIndex(s => s.id === subId);
      if (gIdx >= 0) {
        allSubmissionsGlobalCache[gIdx] = { ...allSubmissionsGlobalCache[gIdx], ...submissionRecord };
      } else {
        allSubmissionsGlobalCache.unshift(submissionRecord);
      }
    }

    // UI feedback
    const fileCount = currentSelectedFiles.length;
    showToast(
      fileCount > 1
        ? `ส่งงานพร้อมแนบ ${fileCount} ไฟล์เรียบร้อยแล้ว!`
        : 'ส่งงานเรียบร้อยแล้ว! ผลงานถูกบันทึกลงระบบแล้ว',
      'success'
    );
    closeModal('modal-submit-assignment');

    // Refresh assignments/submissions tab if active
    if (activeTab === 'assignments') {
      loadAssignmentsData();
      loadSubmissionsData();
    }
    if (currentUser && currentUser.role === 'teacher') {
      loadTeacherSubmissions();
    }

  } catch (err) {
    console.error('Submit error:', err);
    showToast('เกิดข้อผิดพลาดในการส่งงาน: ' + err.message, 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane mr-1"></i> ยืนยันการส่งงาน';
    }
    if (progressWrap) progressWrap.style.display = 'none';
  }
}

function openGradeModal(subId, studentName, currentScore) {
  document.getElementById('grade-sub-id').value = subId;
  document.getElementById('grade-student-name').innerText = studentName;
  document.getElementById('grade-score-input').value = (currentScore !== undefined && currentScore !== null && currentScore !== '') ? currentScore : 10;
  
  const sub = Array.isArray(allSubmissionsGlobalCache) ? allSubmissionsGlobalCache.find(s => s.id === subId) : null;
  const asgEl = document.getElementById('grade-assignment-title');
  const contentEl = document.getElementById('grade-student-content');
  const fileContainer = document.getElementById('grade-file-action-container');
  const feedbackInput = document.getElementById('grade-feedback-input');

  if (feedbackInput) {
    feedbackInput.value = sub?.feedback || '';
  }

  if (sub) {
    if (asgEl) asgEl.innerText = sub.assignment_title || sub.assignment_id || 'ใบงาน';
    if (contentEl) contentEl.innerText = sub.content || '(ไม่มีข้อความเพิ่มเติม)';
    if (fileContainer) {
      const fileInfo = analyzeSubmissionFile(sub?.file_url, sub?.content);
      if (sub.file_url && sub.file_url.startsWith('http')) {
        fileContainer.innerHTML = `
          <a href="${escapeHtml(sub.file_url)}" target="_blank" rel="noopener noreferrer" class="btn" style="background: #0284c7; color: white; font-size: 0.8rem; padding: 7px 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; border-radius: 8px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> เปิดดูไฟล์งานใน ${fileInfo.label} ↗
          </a>
        `;
      } else {
        fileContainer.innerHTML = `
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button type="button" onclick="previewSubmissionWork('${escapeHtml(sub.id)}', '${escapeHtml(sub.student_name)}', '${escapeHtml(sub.assignment_id)}')" class="btn" style="background: #10b981; color: white; font-size: 0.8rem; padding: 7px 14px; display: inline-flex; align-items: center; gap: 6px; border-radius: 8px; border: none; cursor: pointer;">
              <i class="fa-solid fa-eye"></i> ${fileInfo.isMultiple ? `เปิดดูผลงาน (${fileInfo.filesCount} ไฟล์)` : `เปิดดูผลงาน (${fileInfo.ext.toUpperCase()})`}
            </button>
            <button type="button" onclick="downloadSubmissionFileById('${escapeHtml(sub.id)}', '${escapeHtml(sub.student_name)}', '${escapeHtml(sub.class_room)}', '${escapeHtml(sub.assignment_id)}')" class="btn btn-outline" style="font-size: 0.8rem; padding: 7px 12px; display: inline-flex; align-items: center; gap: 6px; border-radius: 8px; cursor: pointer;">
              <i class="fa-solid fa-download"></i> โหลด .${fileInfo.ext}
            </button>
          </div>
        `;
      }
    }
  }

  openModal('modal-grade-submission');
}

async function doGradeSubmission() {
  const submission_id = document.getElementById('grade-sub-id').value;
  const scoreRaw = document.getElementById('grade-score-input').value.trim();
  const feedback = document.getElementById('grade-feedback-input').value.trim();

  if (!submission_id) return;

  if (scoreRaw === '' || isNaN(scoreRaw) || Number(scoreRaw) < 0 || Number(scoreRaw) > 20) {
    showToast('กรุณากรอกคะแนนประเมินที่ถูกต้อง (0 - 20 คะแนน)', 'error');
    return;
  }
  const score = Number(scoreRaw);

  try {
    showToast('กำลังบันทึกคะแนน...', 'info');

    // 1. Direct update to Supabase Cloud
    const sbRes = await fetch(`${SUPABASE_REST_URL}/submissions?id=eq.${encodeURIComponent(submission_id)}`, {
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
    });

    if (!sbRes.ok) {
      console.warn('Supabase PATCH returned:', sbRes.status);
    }

    // 2. Server API fallback if not static
    if (!isStaticOrServerlessHost()) {
      try {
        await apiFetch('/submissions/grade', 'POST', { submission_id, score, feedback });
      } catch (e) {}
    }

    // 3. Local and in-memory cache update
    if (Array.isArray(allSubmissionsGlobalCache)) {
      const target = allSubmissionsGlobalCache.find(s => s.id === submission_id);
      if (target) {
        target.score = Number(score);
        target.feedback = feedback || 'ตรวจเรียบร้อยแล้ว';
        target.status = 'graded';
        target.graded_at = new Date().toISOString();
      }
    }

    try {
      let localSubs = JSON.parse(localStorage.getItem('csm4_submissions') || '[]');
      const sub = localSubs.find(s => s.id === submission_id);
      if (sub) {
        sub.score = Number(score);
        sub.feedback = feedback || 'ตรวจเรียบร้อยแล้ว';
        sub.status = 'graded';
        sub.graded_at = new Date().toISOString();
        localStorage.setItem('csm4_submissions', JSON.stringify(localSubs));
      }
    } catch (e) {}

    closeModal('modal-grade-submission');
    showToast('บันทึกคะแนนเรียบร้อย! ข้อมูลอัปเดตลง Supabase ทันที', 'success');

    // Refresh views
    if (typeof renderTeacherPendingSubmissions === 'function') renderTeacherPendingSubmissions();
    if (typeof loadAssignmentsData === 'function') loadAssignmentsData();
  } catch (err) {
    console.error('Grade error:', err);
    showToast('เกิดข้อผิดพลาดในการบันทึกคะแนน: ' + err.message, 'error');
  }
}

async function doReturnSubmissionForRevision() {
  const submission_id = document.getElementById('grade-sub-id').value;
  let feedback = document.getElementById('grade-feedback-input').value.trim();

  if (!submission_id) return;

  if (!feedback) {
    const promptFeedback = prompt('กรุณาระบุสิ่งที่นักเรียนต้องแก้ไข หรือเหตุผลที่ให้ส่งใหม่:\n(เช่น "แนบไฟล์ผิด กรุณาแนบไฟล์ใบงานที่ทำเสร็จแล้วส่งใหม่"):');
    if (!promptFeedback || !promptFeedback.trim()) {
      showToast('กรุณาระบุข้อเสนอแนะเพื่อให้นักเรียนทราบจุดที่ต้องแก้ไข', 'error');
      return;
    }
    feedback = promptFeedback.trim();
    document.getElementById('grade-feedback-input').value = feedback;
  }

  try {
    showToast('กำลังส่งกลับให้นักเรียนแก้ไข...', 'info');

    // 1. Direct update to Supabase Cloud (Must use 'revision_requested' per database constraint)
    const sbRes = await fetch(`${SUPABASE_REST_URL}/submissions?id=eq.${encodeURIComponent(submission_id)}`, {
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
    });

    if (!sbRes.ok) {
      const errJson = await sbRes.json().catch(() => ({}));
      console.warn('Supabase PATCH returned:', sbRes.status, errJson);
      throw new Error(errJson.message || 'บันทึกสถานะไม่สำเร็จ (' + sbRes.status + ')');
    }

    // 2. Server API fallback if not static
    if (!isStaticOrServerlessHost()) {
      try {
        await apiFetch('/submissions/grade', 'POST', {
          submission_id,
          score: null,
          feedback,
          status: 'revision_requested'
        });
      } catch (e) {}
    }

    // 3. Local and in-memory cache update
    if (Array.isArray(allSubmissionsGlobalCache)) {
      const target = allSubmissionsGlobalCache.find(s => s.id === submission_id);
      if (target) {
        target.score = null;
        target.feedback = feedback;
        target.status = 'revision_requested';
        target.graded_at = new Date().toISOString();
      }
    }

    try {
      let localSubs = JSON.parse(localStorage.getItem('csm4_submissions') || '[]');
      const sub = localSubs.find(s => s.id === submission_id);
      if (sub) {
        sub.score = null;
        sub.feedback = feedback;
        sub.status = 'revision_requested';
        sub.graded_at = new Date().toISOString();
        localStorage.setItem('csm4_submissions', JSON.stringify(localSubs));
      }
    } catch (e) {}

    closeModal('modal-grade-submission');
    showToast('ส่งกลับให้นักเรียนแก้ไขเรียบร้อยแล้ว! สถานะอัปเดตบนระบบทันที', 'success');

    // Refresh views
    if (typeof renderTeacherPendingSubmissions === 'function') renderTeacherPendingSubmissions();
    if (typeof loadAssignmentsData === 'function') loadAssignmentsData();
  } catch (err) {
    console.error('Return submission error:', err);
    showToast('เกิดข้อผิดพลาดในการส่งกลับ: ' + err.message, 'error');
  }
}

async function doDeleteSubmissionPrompt() {
  const submission_id = document.getElementById('grade-sub-id').value;
  const studentName = document.getElementById('grade-student-name').innerText;

  if (!submission_id) return;

  const confirmed = confirm(`ยืนยันการลบรายการส่งงานของ "${studentName}" หรือไม่?\n\n- ข้อมูลการส่งงานจะถูกลบออกจากฐานข้อมูล Supabase\n- นักเรียนจะสามารถเข้ามากดส่งงานใหม่ได้ทันที`);
  if (!confirmed) return;

  try {
    showToast('กำลังลบข้อมูลส่งงาน...', 'info');

    // 1. Direct delete from Supabase Cloud
    const sbRes = await fetch(`${SUPABASE_REST_URL}/submissions?id=eq.${encodeURIComponent(submission_id)}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!sbRes.ok) {
      console.warn('Supabase DELETE returned:', sbRes.status);
    }

    // 2. Remove from global in-memory cache
    if (Array.isArray(allSubmissionsGlobalCache)) {
      allSubmissionsGlobalCache = allSubmissionsGlobalCache.filter(s => s.id !== submission_id);
    }

    // 3. Remove from localStorage
    try {
      let localSubs = JSON.parse(localStorage.getItem('csm4_submissions') || '[]');
      localSubs = localSubs.filter(s => s.id !== submission_id);
      localStorage.setItem('csm4_submissions', JSON.stringify(localSubs));
    } catch (e) {}

    closeModal('modal-grade-submission');
    showToast(`ลบข้อมูลส่งงานของ ${studentName} เรียบร้อย! นักเรียนสามารถส่งงานใหม่ได้ทันที`, 'success');

    // Refresh views
    if (typeof renderTeacherPendingSubmissions === 'function') renderTeacherPendingSubmissions();
    if (typeof loadAssignmentsData === 'function') loadAssignmentsData();
  } catch (err) {
    console.error('Delete submission error:', err);
    showToast('เกิดข้อผิดพลาดในการลบข้อมูล: ' + err.message, 'error');
  }
}

// Global Browser Window Exports
if (typeof window !== 'undefined') {
  window.currentAssignmentCategory = currentAssignmentCategory;
  window.filterAssignmentsCategory = filterAssignmentsCategory;
  window.loadAssignmentsData = loadAssignmentsData;
  window.loadSubmissionsData = loadSubmissionsData;
  window.openSubmitModal = openSubmitModal;
  window.previewSubmissionWork = previewSubmissionWork;
  window.downloadSubmissionFileById = downloadSubmissionFileById;
  window.openOrDownloadSubmissionFile = openOrDownloadSubmissionFile;
  window.doSubmitAssignment = doSubmitAssignment;
  window.isMySubmission = isMySubmission;
}


