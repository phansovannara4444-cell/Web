/* ================================================================
   files-loader.js  –  Google Drive File Browser
   CMS powered by Google Sheets — no code edits needed!

   ════════════════════════════════════════════════════════════════
   HOW TO ADD A NEW FILE (no code editing ever again!)
   ════════════════════════════════════════════════════════════════
   1. Upload your file to Google Drive
   2. Right-click → Share → "Anyone with the link" → Copy link
      URL: https://drive.google.com/file/d/FILE_ID/view
      Copy only the FILE_ID part (long string between /d/ and /view)
   3. Open your Google Sheet and add a new row:
      | FILE_ID | Your Title | Description | category | type | date |
   4. Save — your file appears on the site within seconds. Done!

   COLUMN FORMAT
   ─────────────
   id       → Google Drive file ID
   title    → Display name on the card
   desc     → Short description (optional)
   category → portfolio | resume | student-report | 3d-cad | my-project | battery-pack | blog
   type     → pdf | doc | zip | video | image
   date     → YYYY-MM-DD  e.g. 2025-04-07
   cover    → (optional) Drive IMAGE file ID for cover thumbnail
              Leave blank → auto Drive thumbnail of the file itself
   status   → (optional) Completed | In Progress | Planned  (default: Completed)
   tags     → (optional) Comma-separated tech tags  e.g. STM32, Solar, MPPT

   LAYOUT
   ──────
   portfolio, 3d-cad, my-project, battery-pack, blog, student-report
   → Cool numbered project-list with cover image, status badge, tags
   All other / empty categories → thumbnail grid
   ================================================================ */

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxUhUubenb3b3nGwcjThkfcHNVqv7jcLnSsi10PTkP_3zC5CD_tJyGliRch7yTINHDozgoomOyWJmB/pub?gid=0&single=true&output=csv';

const DRIVE_FOLDERS = {
    'portfolio':      'https://drive.google.com/drive/folders/1kcyWRPWkA-atqME7VOwnxQbtxovAbTHz?usp=sharing',
    'resume':         'https://drive.google.com/drive/folders/1bGj8xrSuzJ-WyW9H9R0OfzpJsSz4WCgf?usp=sharing',
    'student-report': 'https://drive.google.com/drive/folders/1knU2UpKT-hBXuihG4kl4c1ihmJJ3l9Hl?usp=sharing',
    '3d-cad':         'https://drive.google.com/drive/folders/1SMZRgO8P8dUzXKu-B8ityYH_cgm7qq-G?usp=sharing',
    'my-project':     'https://drive.google.com/drive/folders/1N3lUFAEFXri4QPim---v6qHsMZJLx4HO?usp=sharing',
    'battery-pack':   'https://drive.google.com/drive/folders/1oc3SUw0HAyEDS08CRJYBe3b_dE7pYNNJ?usp=sharing',
    'blog':           'https://drive.google.com/drive/folders/1OsLVXXinX4-zhgi_8sajDnR4yWoRwb01?usp=sharing',
};

/* ================================================================
   INTERNALS — no need to edit below this line
   ================================================================ */

(function () {
    'use strict';

    // ── CSV Parser ────────────────────────────────────────────
    function parseCSV(text) {
        const lines = text.trim().split('\n');
        if (lines.length < 2) return [];
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
        const rows = [];
        for (let i = 1; i < lines.length; i++) {
            const cols = splitCSVLine(lines[i]);
            if (!cols.length || !cols[0]) continue;
            const obj = {};
            headers.forEach((h, idx) => {
                obj[h] = (cols[idx] || '').trim().replace(/^"|"$/g, '');
            });
            if (obj.id && obj.title && obj.category) rows.push(obj);
        }
        return rows;
    }

    function splitCSVLine(line) {
        const result = [];
        let cur = '', inQuote = false;
        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') {
                if (inQuote && line[i+1] === '"') { cur += '"'; i++; }
                else inQuote = !inQuote;
            } else if (c === ',' && !inQuote) {
                result.push(cur); cur = '';
            } else {
                cur += c;
            }
        }
        result.push(cur);
        return result;
    }

    // ── URL builders ──────────────────────────────────────────
    function driveViewUrl(id)     { return `https://drive.google.com/file/d/${id}/view`; }
    function drivePreviewUrl(id)  { return `https://drive.google.com/file/d/${id}/preview`; }
    function driveDownloadUrl(id) { return `https://drive.google.com/uc?export=download&id=${id}`; }
    function driveThumbnailUrl(id){ return `https://drive.google.com/thumbnail?id=${id}&sz=w400`; }

    // ── Helpers ───────────────────────────────────────────────
    function esc(s) {
        if (!s) return '';
        return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
    function fmtDate(d) {
        if (!d) return '';
        try { return new Date(d).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }); }
        catch { return d; }
    }

    const TYPE_META = {
        pdf:   { icon: 'ri-file-pdf-2-line',  label: 'PDF',   cls: 'type-pdf'   },
        doc:   { icon: 'ri-file-word-2-line',  label: 'DOC',   cls: 'type-doc'   },
        zip:   { icon: 'ri-file-zip-line',     label: 'ZIP',   cls: 'type-zip'   },
        video: { icon: 'ri-video-line',        label: 'Video', cls: 'type-video' },
        image: { icon: 'ri-image-line',        label: 'Image', cls: 'type-image' },
    };
    function meta(type) { return TYPE_META[type] || { icon:'ri-file-line', label:'File', cls:'type-file' }; }

    // ── Fetch sheet (cached) ──────────────────────────────────
    let cachedFiles = null;

    async function fetchFiles() {
        if (cachedFiles) return cachedFiles;
        try {
            const res = await fetch(SHEET_CSV_URL);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const text = await res.text();
            cachedFiles = parseCSV(text);
            return cachedFiles;
        } catch (err) {
            console.warn('[files-loader] Could not load Google Sheet:', err.message);
            return [];
        }
    }

    // ── Modal singleton ───────────────────────────────────────
    let modalEl = null;

    function getModal() {
        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.className = 'gdv-modal-bg';
            modalEl.innerHTML = `
<div class="gdv-modal">
    <div class="gdv-modal-head">
        <div class="gdv-modal-meta">
            <span class="gdv-modal-badge" id="gdv-modal-badge"></span>
            <span class="gdv-modal-title" id="gdv-modal-title"></span>
        </div>
        <div class="gdv-modal-btns">
            <a class="gdv-btn gdv-btn-primary" id="gdv-modal-dl" target="_blank" rel="noopener">
                <i class="ri-download-line"></i> Download
            </a>
            <button class="gdv-modal-close" id="gdv-modal-close">
                <i class="ri-close-line"></i>
            </button>
        </div>
    </div>
    <div class="gdv-modal-body" id="gdv-modal-body"></div>
</div>`;
            document.body.appendChild(modalEl);
            document.getElementById('gdv-modal-close').onclick = closeModal;
            modalEl.addEventListener('click', e => { if (e.target === modalEl) closeModal(); });
            document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
        }
        return modalEl;
    }

    function openModal(file) {
        const m  = getModal();
        const t  = meta(file.type);
        document.getElementById('gdv-modal-title').textContent = file.title;
        const badge = document.getElementById('gdv-modal-badge');
        badge.className   = `gdv-modal-badge ${t.cls}`;
        badge.textContent = t.label;
        document.getElementById('gdv-modal-dl').href     = driveDownloadUrl(file.id);

        const body = document.getElementById('gdv-modal-body');
        if (file.type === 'image') {
            body.innerHTML = `<img class="gdv-preview-img" src="${driveThumbnailUrl(file.id)}" alt="${esc(file.title)}">`;
        } else if (file.type === 'pdf' || file.type === 'video') {
            body.innerHTML = `<iframe class="gdv-frame" src="${drivePreviewUrl(file.id)}" allowfullscreen allow="autoplay"></iframe>`;
        } else {
            body.innerHTML = `<div class="gdv-no-preview">
                <div class="gdv-no-icon ${t.cls}"><i class="${t.icon}"></i></div>
                <p class="gdv-no-title">${esc(file.title)}</p>
                <p class="gdv-no-sub">Preview not available for ${t.label} files.</p>
                <a href="${driveDownloadUrl(file.id)}" class="gdv-btn gdv-btn-primary" target="_blank" style="margin-top:.75rem">
                    <i class="ri-download-line"></i> Download ${t.label}
                </a>
            </div>`;
        }
        m.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modalEl) return;
        modalEl.classList.remove('open');
        document.body.style.overflow = '';
        const body = document.getElementById('gdv-modal-body');
        if (body) body.innerHTML = ''; // stop iframe playback
    }

    // ── Category accent config ────────────────────────────────
    const CAT_CONFIG = {
        'portfolio':      { color:'#a78bfa', rgb:'167,139,250', num:'#a78bfa33', icon:'ri-layout-grid-line',      label:'Portfolio'      },
        '3d-cad':         { color:'#38bdf8', rgb:'56,189,248',  num:'#38bdf833', icon:'ri-box-3-line',             label:'3D CAD'         },
        'my-project':     { color:'#f87171', rgb:'248,113,113', num:'#f8717133', icon:'ri-tools-line',             label:'My Project'     },
        'battery-pack':   { color:'#34d399', rgb:'52,211,153',  num:'#34d39933', icon:'ri-battery-2-charge-line',  label:'Battery Pack'   },
        'blog':           { color:'#fb923c', rgb:'251,146,60',  num:'#fb923c33', icon:'ri-article-line',           label:'Blog'           },
        'student-report': { color:'#f472b6', rgb:'244,114,182', num:'#f472b633', icon:'ri-file-text-line',         label:'Student Report' },
    };
    function catCfg(cat) {
        return CAT_CONFIG[cat] || { color:'#10b981', rgb:'16,185,129', num:'#10b98133', icon:'ri-file-line', label:'Files' };
    }

    // ── Status helpers ────────────────────────────────────────
    function resolveStatus(status) {
        if (/progress|ongoing|wip/i.test(status))  return { cls:'gdv-status-progress', label:'In Progress' };
        if (/plan|upcoming/i.test(status))          return { cls:'gdv-status-planned',  label:'Planned'     };
        return { cls:'gdv-status-completed', label: status || 'Completed' };
    }

    // ── Render list (used for ALL listed sections) ────────────
    function renderList(container, files, category) {
        const cfg  = catCfg(category);
        const list = document.createElement('div');
        list.className = 'gdv-project-list';

        files.forEach((file, idx) => {
            const t      = meta(file.type);
            const num    = String(idx + 1).padStart(2, '0');
            const tags   = file.tags   || '';
            const st     = resolveStatus(file.status || '');

            // Cover image: custom cover → auto Drive thumbnail → icon fallback
            const coverSrc = file.cover
                ? driveThumbnailUrl(file.cover)
                : driveThumbnailUrl(file.id);

            // Tags HTML — fall back to file type tag
            const tagsHtml = tags
                ? tags.split(',').map(tag => `<span class="gdv-proj-tag">${esc(tag.trim())}</span>`).join('')
                : `<span class="gdv-proj-tag">${t.label}</span>`;

            const item = document.createElement('div');
            item.className = 'gdv-project-item';
            item.style.setProperty('--cat-color', cfg.color);
            item.style.setProperty('--cat-rgb',   cfg.rgb);

            item.innerHTML = `
<div class="gdv-proj-num" style="color:${cfg.num}">${num}</div>
<div class="gdv-proj-cover ${t.cls}">
    <img class="gdv-proj-cover-img"
         src="${coverSrc}"
         alt="${esc(file.title)}"
         loading="lazy"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="gdv-proj-cover-fallback" style="display:none">
        <i class="${t.icon}"></i>
    </div>
    <span class="gdv-type-badge">${t.label}</span>
</div>
<div class="gdv-proj-body">
    <div class="gdv-proj-header">
        <h3 class="gdv-proj-title">${esc(file.title)}</h3>
        <span class="gdv-proj-status ${st.cls}">${esc(st.label)}</span>
    </div>
    ${file.desc ? `<p class="gdv-proj-desc">${esc(file.desc)}</p>` : ''}
    <div class="gdv-proj-footer">
        <div class="gdv-proj-meta">
            <div class="gdv-proj-tags">${tagsHtml}</div>
            ${file.date ? `<span class="gdv-proj-date"><i class="ri-calendar-line"></i> ${fmtDate(file.date)}</span>` : ''}
        </div>
        <div class="gdv-proj-actions">
            <a class="gdv-proj-btn gdv-proj-view" href="${driveDownloadUrl(file.id)}" target="_blank" rel="noopener noreferrer">
                <i class="ri-eye-line"></i> Open
            </a>
            <a class="gdv-proj-btn gdv-proj-dl" href="${driveDownloadUrl(file.id)}" target="_blank" rel="noopener noreferrer" download>
                <i class="ri-download-line"></i> Download
            </a>
        </div>
    </div>
</div>`;

            // Desktop: View button opens modal
            item.querySelector('.gdv-proj-view').addEventListener('click', (e) => {
                if (window.innerWidth > 768) {
                    e.preventDefault();
                    openModal(file);
                }
                // On mobile: default anchor behaviour opens the URL directly — no JS needed
            });

            list.appendChild(item);
        });

        container.innerHTML = '';
        container.appendChild(list);
    }

    // ── Render grid ───────────────────────────────────────────
    const LIST_CATEGORIES = new Set(['portfolio','3d-cad','my-project','battery-pack','blog','student-report']);

    function renderGrid(container, files, category) {
        if (!files.length) {
            container.innerHTML = `<div class="gdv-empty">
                <i class="ri-folder-open-line"></i>
                <p>No files yet in this section.</p>
            </div>`;
            return;
        }

        // Use cool project-list for all named sections
        if (LIST_CATEGORIES.has(category)) {
            renderList(container, files, category);
            return;
        }

        // ── Fallback GRID layout (generic / unnamed sections) ──
        const grid = document.createElement('div');
        grid.className = 'gdv-grid';

        files.forEach(file => {
            const t    = meta(file.type);
            const card = document.createElement('div');
            card.className = 'gdv-card';

            const coverSrc = file.cover ? driveThumbnailUrl(file.cover) : driveThumbnailUrl(file.id);
            const thumbHtml = `
                <img class="gdv-thumb-img" src="${coverSrc}" alt="${esc(file.title)}" loading="lazy"
                     onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="gdv-thumb-fallback ${t.cls}" style="display:none"><i class="${t.icon}"></i></div>`;

            card.innerHTML = `
<div class="gdv-card-thumb ${t.cls}">${thumbHtml}<span class="gdv-type-badge">${t.label}</span></div>
<div class="gdv-card-body">
    <div class="gdv-card-title">${esc(file.title)}</div>
    ${file.desc ? `<div class="gdv-card-desc">${esc(file.desc)}</div>` : ''}
    <div class="gdv-card-date"><i class="ri-calendar-line"></i> ${fmtDate(file.date)}</div>
</div>
<div class="gdv-card-actions">
    <a class="gdv-action-btn gdv-preview-btn" href="${driveDownloadUrl(file.id)}" target="_blank" rel="noopener noreferrer"><i class="ri-eye-line"></i> View</a>
    <a class="gdv-action-btn gdv-dl-btn" href="${driveDownloadUrl(file.id)}" target="_blank" rel="noopener noreferrer"><i class="ri-download-line"></i></a>
</div>`;

            card.querySelector('.gdv-preview-btn').addEventListener('click', (e) => {
                if (window.innerWidth > 768) {
                    e.preventDefault();
                    openModal(file);
                }
                // Mobile: anchor fires naturally, opens file directly
            });
            grid.appendChild(card);
        });

        container.innerHTML = '';
        container.appendChild(grid);
    }

    // ── Loading skeleton ──────────────────────────────────────
    function showSkeleton(container) {
        container.innerHTML = `<div class="gdv-grid">
            ${[1,2,3].map(() => `
            <div class="gdv-skeleton">
                <div class="gdv-skel-thumb"></div>
                <div class="gdv-skel-body">
                    <div class="gdv-skel-line w70"></div>
                    <div class="gdv-skel-line w50"></div>
                </div>
            </div>`).join('')}
        </div>`;
    }

    // ── Live stats counters from sheet ────────────────────────
    function animateCount(el, target) {
        if (!el || target < 1) return;
        const duration = 900;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + '+';
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target + '+';
        }
        requestAnimationFrame(tick);
    }

    function updateStatsFromSheet(allFiles) {
        // Projects Built = portfolio + my-project + 3d-cad + battery-pack
        const projects = allFiles.filter(f =>
            ['portfolio','my-project','3d-cad','battery-pack'].includes(f.category)
        ).length;

        // 3D CAD files
        const cad = allFiles.filter(f => f.category === '3d-cad').length;

        // Blog posts
        const blog = allFiles.filter(f => f.category === 'blog').length;

        // Battery packs
        const battery = allFiles.filter(f => f.category === 'battery-pack').length;

        if (projects > 0) animateCount(document.getElementById('stat-projects'), projects);
        if (cad      > 0) animateCount(document.getElementById('stat-cad'),      cad);
        if (blog     > 0) animateCount(document.getElementById('stat-blog'),     blog);
        if (battery  > 0) animateCount(document.getElementById('stat-battery'),  battery);
    }

    // ── Auto-fill CV download button from sheet ───────────────
    function autofillCVButton(allFiles) {
        const btn = document.getElementById('downloadCVBtn');
        if (!btn) return;

        // Find the first file with category "resume" and type "pdf"
        const cv = allFiles.find(f => f.category === 'resume' && f.type === 'pdf');
        if (!cv) return;

        btn.href = driveDownloadUrl(cv.id);
        // Remove the placeholder fallback target if it was CV_FILE_ID
        btn.removeAttribute('target');
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener');
        console.log('[files-loader] CV button auto-filled with ID:', cv.id);
    }

    // ── Init ──────────────────────────────────────────────────
    async function init() {
        const containers = document.querySelectorAll('[data-gdrive-browser]');

        containers.forEach(c => showSkeleton(c));

        const allFiles = await fetchFiles();

        // Auto-fill the hero Download CV button
        autofillCVButton(allFiles);

        // Update hero stats counters from live sheet data
        updateStatsFromSheet(allFiles);

        containers.forEach(container => {
            const category = container.dataset.gdriveBrowser || '';
            const files    = allFiles.filter(f => !category || f.category === category);
            renderGrid(container, files, category);
        });
    }

    // ── Inject CSS ────────────────────────────────────────────
    function injectStyles() {
        const s = document.createElement('style');
        s.textContent = `
.gdv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 1.1rem; margin-top: .75rem;
}
.gdv-empty {
    text-align: center; padding: 2.5rem 1rem;
    color: rgba(255,255,255,.35);
    border: 2px dashed rgba(255,255,255,.1);
    border-radius: 12px;
    display: flex; flex-direction: column; align-items: center; gap: .5rem;
}
.gdv-empty i { font-size: 2rem; }
/* skeleton */
.gdv-skeleton {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.06);
    border-radius: 14px; overflow: hidden;
}
.gdv-skel-thumb {
    height: 160px;
    background: linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.04) 75%);
    background-size: 200% 100%; animation: gdv-shimmer 1.4s infinite;
}
.gdv-skel-body { padding: .75rem; display:flex; flex-direction:column; gap:.5rem; }
.gdv-skel-line {
    height: 10px; border-radius: 4px;
    background: linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.04) 75%);
    background-size: 200% 100%; animation: gdv-shimmer 1.4s infinite;
}
.gdv-skel-line.w70 { width:70%; } .gdv-skel-line.w50 { width:50%; }
@keyframes gdv-shimmer { to { background-position: -200% 0; } }
/* card */
.gdv-card {
    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
    border-radius: 14px; overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform .2s, border-color .2s, box-shadow .2s;
}
.gdv-card:hover { transform:translateY(-3px); border-color:rgba(16,185,129,.35); box-shadow:0 12px 32px rgba(0,0,0,.25); }
.gdv-card-thumb {
    height: 160px; display:flex; align-items:center; justify-content:center;
    font-size: 2.6rem; position:relative; overflow:hidden; flex-shrink:0;
}
.gdv-thumb-img { width:100%; height:100%; object-fit:cover; transition: transform .4s ease; }
.gdv-card:hover .gdv-thumb-img { transform: scale(1.05); }
.gdv-thumb-fallback {
    width:100%; height:100%;
    align-items:center; justify-content:center; font-size:2.6rem;
    position:absolute; inset:0;
}
.type-pdf   { background:rgba(239,68,68,.12);  color:#f87171; }
.type-doc   { background:rgba(59,130,246,.12);  color:#60a5fa; }
.type-zip   { background:rgba(245,158,11,.12);  color:#fbbf24; }
.type-video { background:rgba(168,85,247,.12);  color:#c084fc; }
.type-image { background:rgba(16,185,129,.08);  color:#10b981; }
.type-file  { background:rgba(148,163,184,.08); color:#94a3b8; }
.gdv-type-badge {
    position:absolute; top:.5rem; right:.5rem;
    background:rgba(0,0,0,.55); color:#fff;
    font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em;
    padding:.2rem .5rem; border-radius:4px; backdrop-filter:blur(4px);
}
.gdv-card-body { padding:.75rem; flex:1; }
.gdv-card-title {
    font-size:.875rem; font-weight:600; color:#f0f4f8; margin-bottom:.3rem;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
.gdv-card-desc {
    font-size:.75rem; color:rgba(255,255,255,.4); margin-bottom:.35rem;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
.gdv-card-date { font-size:.72rem; color:rgba(255,255,255,.3); display:flex; align-items:center; gap:.3rem; }
.gdv-card-actions { display:flex; border-top:1px solid rgba(255,255,255,.06); }
.gdv-action-btn {
    flex:1; padding:.55rem; display:flex; align-items:center; justify-content:center; gap:.3rem;
    background:none; border:none; color:rgba(255,255,255,.5);
    font-family:inherit; font-size:.8rem; font-weight:500;
    cursor:pointer; text-decoration:none; transition:.15s;
}
.gdv-action-btn:hover { color:#fff; }
.gdv-preview-btn { border-right:1px solid rgba(255,255,255,.06); }
.gdv-preview-btn:hover { background:rgba(16,185,129,.1); color:#10b981; }
.gdv-dl-btn:hover { background:rgba(59,130,246,.1); color:#60a5fa; }
/* folder link */
.gdv-folder-link { margin-top:1rem; text-align:center; }
/* buttons */
.gdv-btn {
    display:inline-flex; align-items:center; gap:.4rem;
    padding:.5rem 1.1rem; border-radius:8px;
    font-family:inherit; font-size:.825rem; font-weight:600;
    text-decoration:none; cursor:pointer; transition:.2s; border:none;
}
.gdv-btn-primary { background:linear-gradient(135deg,#10b981,#06d6a0); color:#fff; }
.gdv-btn-primary:hover { opacity:.88; }
.gdv-btn-outline { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.15); color:#f0f4f8; }
.gdv-btn-outline:hover { background:rgba(255,255,255,.1); }
.gdv-btn-ghost { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); color:rgba(255,255,255,.7); }
.gdv-btn-ghost:hover { background:rgba(255,255,255,.08); color:#f0f4f8; }
/* modal */
.gdv-modal-bg {
    display:none; position:fixed; inset:0;
    background:rgba(0,0,0,.8); backdrop-filter:blur(8px);
    z-index:9999; align-items:center; justify-content:center; padding:1rem;
}
.gdv-modal-bg.open { display:flex; }
.gdv-modal {
    background:#111827; border:1px solid rgba(255,255,255,.1);
    border-radius:16px; width:100%; max-width:820px; max-height:92vh;
    display:flex; flex-direction:column; overflow:hidden;
    animation:gdvSlide .3s cubic-bezier(.16,1,.3,1) both;
}
@keyframes gdvSlide { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.gdv-modal-head {
    display:flex; align-items:center; gap:.75rem; flex-wrap:wrap;
    padding:1rem 1.25rem; border-bottom:1px solid rgba(255,255,255,.08); flex-shrink:0;
}
.gdv-modal-meta { display:flex; align-items:center; gap:.6rem; flex:1; min-width:0; overflow:hidden; }
.gdv-modal-badge {
    font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em;
    padding:.25rem .6rem; border-radius:4px; white-space:nowrap; flex-shrink:0;
}
.gdv-modal-title { font-size:.95rem; font-weight:700; color:#f0f4f8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.gdv-modal-btns { display:flex; align-items:center; gap:.5rem; flex-shrink:0; }
.gdv-modal-close {
    width:34px; height:34px;
    background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
    border-radius:8px; color:rgba(255,255,255,.6); font-size:1.1rem;
    cursor:pointer; transition:.15s;
    display:flex; align-items:center; justify-content:center;
}
.gdv-modal-close:hover { background:rgba(239,68,68,.15); color:#fca5a5; border-color:rgba(239,68,68,.2); }
.gdv-modal-body { flex:1; overflow:auto; }
.gdv-frame { width:100%; height:72vh; border:none; display:block; background:#0a0f1e; }
.gdv-preview-img { max-width:100%; max-height:72vh; display:block; margin:1rem auto; border-radius:8px; }
.gdv-no-preview {
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    min-height:280px; padding:2rem; gap:.75rem; text-align:center;
}
.gdv-no-icon { font-size:3.5rem; padding:1rem; border-radius:16px; margin-bottom:.5rem; }
.gdv-no-title { font-size:1rem; font-weight:700; color:#f0f4f8; }
.gdv-no-sub { font-size:.85rem; color:rgba(255,255,255,.4); max-width:340px; }
/* section header */
.gdrive-section { margin-top:2.5rem; }
.gdrive-section-head {
    display:flex; align-items:center; gap:.6rem;
    font-size:.85rem; font-weight:700; color:rgba(255,255,255,.5);
    text-transform:uppercase; letter-spacing:.1em; margin-bottom:.75rem;
}
.gdrive-section-head i { color:#10b981; font-size:1rem; }

/* ── Project / Section List (all named categories) ─────── */
.gdv-project-list {
    display: flex; flex-direction: column; gap: .85rem; margin-top: .75rem;
}
.gdv-project-item {
    --cat-color: #10b981;
    --cat-rgb:   16,185,129;
    display: flex; align-items: stretch; gap: 0;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 14px; overflow: hidden;
    transition: transform .22s, border-color .22s, box-shadow .22s;
    position: relative;
    text-decoration: none; color: inherit; cursor: pointer;
}
.gdv-project-item::before {
    content: ''; position: absolute; inset: 0 auto 0 0;
    width: 3px;
    background: linear-gradient(180deg, var(--cat-color), rgba(var(--cat-rgb),.4));
    opacity: 0; transition: opacity .22s;
}
.gdv-project-item:hover {
    transform: translateY(-2px);
    border-color: rgba(var(--cat-rgb),.3);
    box-shadow: 0 10px 32px rgba(0,0,0,.3);
}
.gdv-project-item:hover::before { opacity: 1; }

/* Number */
.gdv-proj-num {
    font-size: 1.1rem; font-weight: 800;
    font-family: 'Syne', sans-serif;
    line-height: 1; flex-shrink: 0; width: 2.6rem; min-width: 2.6rem;
    display: flex; align-items: center; justify-content: center;
    letter-spacing: .01em; opacity: .45;
    padding: 0 .3rem;
}

/* Cover thumbnail — sits between number and body */
.gdv-proj-cover {
    width: 130px; min-width: 130px;
    position: relative; overflow: hidden; cursor: pointer;
    display: flex; align-items: stretch;
    flex-shrink: 0;
    border-left: 1px solid rgba(255,255,255,.06);
    border-right: 1px solid rgba(255,255,255,.06);
}
.gdv-proj-cover-img {
    width: 100%; height: 100%; object-fit: cover;
    object-position: center top;
    transition: transform .45s ease;
    display: block; min-height: 90px;
}
.gdv-project-item:hover .gdv-proj-cover-img { transform: scale(1.06); }
.gdv-proj-cover-fallback {
    width: 100%; height: 100%; min-height: 90px;
    align-items: center; justify-content: center;
    font-size: 2rem; position: absolute; inset: 0;
}
.gdv-proj-cover .gdv-type-badge {
    position: absolute; bottom: .4rem; left: .4rem; right: auto; top: auto;
    font-size: .6rem; padding: .18rem .45rem;
}

/* Body */
.gdv-proj-body {
    flex: 1; min-width: 0;
    display: flex; flex-direction: column; justify-content: center;
    padding: .85rem 1.2rem .85rem 1rem;
}
.gdv-proj-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: .6rem; flex-wrap: wrap; margin-bottom: .35rem;
}
.gdv-proj-title {
    font-size: .95rem; font-weight: 700; color: #f0f4f8;
    flex: 1; min-width: 0;
}
.gdv-proj-desc {
    font-size: .8rem; color: rgba(255,255,255,.45);
    line-height: 1.55; margin-bottom: .6rem;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
}
.gdv-proj-footer {
    display: flex; align-items: center; justify-content: space-between;
    gap: .6rem; flex-wrap: wrap;
}
.gdv-proj-meta {
    display: flex; flex-wrap: wrap; align-items: center; gap: .5rem;
}
.gdv-proj-tags { display: flex; flex-wrap: wrap; gap: .35rem; }
.gdv-proj-tag {
    font-size: .68rem; font-weight: 500;
    color: rgba(255,255,255,.5);
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 4px; padding: .18rem .52rem;
}
.gdv-proj-date {
    font-size: .7rem; color: rgba(255,255,255,.28);
    display: flex; align-items: center; gap: .25rem;
}

/* Status badge */
.gdv-proj-status {
    font-size: .65rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: .06em; padding: .25rem .65rem; border-radius: 5px;
    white-space: nowrap; flex-shrink: 0; align-self: flex-start;
}
.gdv-status-completed { background:rgba(16,185,129,.15);  color:#10b981; border:1px solid rgba(16,185,129,.25); }
.gdv-status-progress  { background:rgba(245,158,11,.15);  color:#f59e0b; border:1px solid rgba(245,158,11,.25); }
.gdv-status-planned   { background:rgba(99,102,241,.15);  color:#818cf8; border:1px solid rgba(99,102,241,.25); }

/* Action buttons */
.gdv-proj-actions { display: flex; gap: .4rem; flex-shrink: 0; }
.gdv-proj-btn {
    display: inline-flex; align-items: center; gap: .28rem;
    font-family: inherit; font-size: .73rem; font-weight: 600;
    padding: .32rem .8rem; border-radius: 7px;
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(255,255,255,.05); color: rgba(255,255,255,.6);
    cursor: pointer; text-decoration: none; transition: .15s;
    white-space: nowrap;
}
.gdv-proj-view:hover { background:rgba(var(--cat-rgb),.12); color:var(--cat-color); border-color:rgba(var(--cat-rgb),.3); }
.gdv-proj-dl:hover   { background:rgba(59,130,246,.12); color:#60a5fa; border-color:rgba(59,130,246,.25); }

/* Responsive */
@media (max-width:640px) {
    .gdv-proj-cover { width:80px; min-width:80px; }
    .gdv-proj-num   { width:1.8rem; min-width:1.8rem; font-size:.85rem; }
    .gdv-proj-body  { padding:.7rem .75rem; }
    .gdv-proj-actions { gap:.3rem; }
    .gdv-proj-btn   { font-size:.68rem; padding:.28rem .6rem; }
}
@media (max-width:420px) {
    .gdv-proj-cover { display:none; }
    .gdv-proj-num   { display:none; }
    .gdv-proj-actions { gap:.3rem; }
    .gdv-proj-btn   { font-size:.68rem; padding:.28rem .6rem; }
}
        `;
        document.head.appendChild(s);
    }

    // ── Boot ──────────────────────────────────────────────────
    injectStyles();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
