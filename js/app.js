/* =========================================================
   EMPOWA360 — shared app logic
   Change BRAND / USER below to rebrand. Logo file: assets/logo.png
   ========================================================= */
(() => {
'use strict';

const BRAND = { name: 'Empowa360', logo: 'assets/logo.png' };
const USER  = { name: 'Elizabeth Mercer', role: 'Sales Operations Lead' };

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- icons (24px grid, 1.8 stroke) ---------- */
const P = {
  dashboard:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
  usercheck:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  userminus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6"/>',
  user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  team:'<circle cx="12" cy="8" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M7 20v-1a5 5 0 0 1 10 0v1"/><path d="M1 19v-1a3 3 0 0 1 3-3M23 19v-1a3 3 0 0 0-3-3"/>',
  trend:'<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  check:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/>',
  tick:'<path d="M20 6 9 17l-5-5"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
  filetext:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  bars:'<path d="M12 20V10M18 20V4M6 20v-4"/>',
  settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus:'<path d="M5 12h14M12 5v14"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  sliders:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  left:'<path d="m15 18-6-6 6-6"/>', right:'<path d="m9 18 6-6-6-6"/>', down:'<path d="m6 9 6 6 6-6"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/>',
  dollar:'<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  pr:'<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  clip:'<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  more:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  trash:'<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  upright:'<path d="M7 7h10v10M7 17 17 7"/>', downright:'<path d="m7 7 10 10M17 7v10H7"/>', flat:'<path d="M5 12h14"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  filep:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M12 18v-6M9 15h6"/>',
  folderp:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M12 10v6M9 13h6"/>',
  pluscircle:'<circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>'
};
const icon = (n, s = 18) => `<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;

/* ---------- avatars (initials, deterministic colour) ---------- */
const AV = ['#2563EB','#7C3AED','#0891B2','#059669','#D97706','#DB2777','#475569'];
const hash = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const initials = n => String(n).split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
const avatar = (name, size = 32) => `<span class="avatar" style="--s:${size}px;--c:${AV[hash(name) % AV.length]}" title="${esc(name)}">${esc(initials(name))}</span>`;

/* ---------- storage (demo persistence across pages) ---------- */
const store = {
  get(k, d = []) { try { const v = JSON.parse(localStorage.getItem('e360:' + k)); return v ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('e360:' + k, JSON.stringify(v)); } catch (e) {} },
  push(k, item) { const a = store.get(k); a.unshift(item); store.set(k, a); },
  reset() { try { Object.keys(localStorage).filter(k => k.startsWith('e360:') && k !== 'e360:theme').forEach(k => localStorage.removeItem(k)); } catch (e) {} }
};

/* ---------- theme ---------- */
const theme = {
  get: () => document.documentElement.getAttribute('data-theme'),
  toggle() {
    const n = theme.get() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    try { localStorage.setItem('e360:theme', n); } catch (e) {}
    window.dispatchEvent(new Event('themechange'));
    $$('[data-theme-btn]').forEach(paintThemeBtn);
  }
};
const paintThemeBtn = b => { b.innerHTML = icon(theme.get() === 'dark' ? 'sun' : 'moon', 18); b.setAttribute('aria-label', theme.get() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); };
const bindThemeBtns = () => $$('[data-theme-btn]').forEach(b => { paintThemeBtn(b); b.addEventListener('click', theme.toggle); });

/* ---------- toast ---------- */
function toast(msg, type = 'info') {
  let box = $('.toasts'); if (!box) { box = document.createElement('div'); box.className = 'toasts'; box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
  const t = document.createElement('div'); t.className = 'toast ' + type;
  t.innerHTML = (type === 'ok' ? icon('tick', 16) : '') + `<span>${esc(msg)}</span>`;
  box.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 280); }, 3200);
}

/* ---------- loading helper ---------- */
async function busy(btn, ms = 700) { btn.classList.add('loading'); btn.disabled = true; await sleep(ms); btn.classList.remove('loading'); btn.disabled = false; }

/* ---------- modal ---------- */
function modal(o) {
  const bg = document.createElement('div'); bg.className = 'modal-bg';
  const field = f => {
    const req = f.required ? ' required' : '';
    let input;
    if (f.type === 'select') input = `<select class="select" name="${f.name}"${req}>${f.options.map(op => { const v = typeof op === 'object' ? op.value : op, l = typeof op === 'object' ? op.label : op; return `<option value="${esc(v)}"${String(f.value) === String(v) ? ' selected' : ''}>${esc(l)}</option>`; }).join('')}</select>`;
    else if (f.type === 'textarea') input = `<textarea class="textarea" name="${f.name}" placeholder="${esc(f.placeholder || '')}">${esc(f.value || '')}</textarea>`;
    else input = `<input class="input" name="${f.name}" type="${f.type || 'text'}" placeholder="${esc(f.placeholder || '')}" value="${esc(f.value ?? '')}"${f.step ? ` step="${f.step}"` : ''}${f.min != null ? ` min="${f.min}"` : ''}${req}>`;
    return `<div class="field${f.span ? ' span2' : ''}"><label for="m_${f.name}">${esc(f.label)}</label>${input.replace('name="' + f.name + '"', `name="${f.name}" id="m_${f.name}"`)}<div class="err" data-err="${f.name}"></div></div>`;
  };
  bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt"><form novalidate>
    <div class="modal-head"><div><h3 id="mt">${esc(o.title)}</h3>${o.sub ? `<p>${esc(o.sub)}</p>` : ''}</div><button type="button" class="icon-btn" data-x aria-label="Close">${icon('x')}</button></div>
    ${o.html ? `<div>${o.html}</div>` : `<div class="modal-body">${(o.fields || []).map(field).join('')}</div>`}
    <div class="modal-foot">${o.hideCancel ? '' : `<button type="button" class="btn btn-outline" data-x>${esc(o.cancel || 'Cancel')}</button>`}${o.submit === false ? '' : `<button type="submit" class="btn ${o.danger ? 'btn-danger-solid' : 'btn-primary'}">${esc(o.submit || 'Save')}</button>`}</div></form></div>`;
  document.body.appendChild(bg);
  const form = $('form', bg), prevFocus = document.activeElement;
  const close = () => { bg.remove(); document.removeEventListener('keydown', onKey); prevFocus && prevFocus.focus && prevFocus.focus(); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  bg.addEventListener('mousedown', e => { if (e.target === bg) close(); });
  $$('[data-x]', bg).forEach(b => b.addEventListener('click', close));
  form.addEventListener('submit', async e => {
    e.preventDefault();
    let ok = true; const vals = {};
    (o.fields || []).forEach(f => {
      const el = form.elements[f.name]; const v = (el.value || '').trim(); vals[f.name] = v;
      let msg = '';
      if (f.required && !v) msg = `${f.label} is required`;
      else if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'Enter a valid email address';
      el.classList.toggle('bad', !!msg); $(`[data-err="${f.name}"]`, bg).textContent = msg; if (msg) ok = false;
    });
    if (!ok) { const bad = $('.bad', bg); bad && bad.focus(); return; }
    const btn = $('[type=submit]', bg); if (btn) await busy(btn, 650);
    close(); o.onSubmit && o.onSubmit(vals);
  });
  setTimeout(() => { const first = $('input,select,textarea', bg) || $('[type=submit]', bg); first && first.focus(); }, 30);
  return { close, el: bg };
}
const confirmBox = o => modal({ title: o.title, sub: o.body, fields: [], submit: o.confirm || 'Confirm', danger: o.danger, onSubmit: o.onConfirm });

/* ---------- stats cards ---------- */
function countUp(el, to, o = {}) {
  const d = o.decimals || 0, dur = 900, t0 = performance.now();
  const f = n => (o.prefix || '') + n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) + (o.suffix || '');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = f(to); return; }
  (function tick(now) { const t = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - t, 3); el.textContent = f(to * e); if (t < 1) requestAnimationFrame(tick); })(t0);
}
function stats(sel, items, six) {
  const root = typeof sel === 'string' ? $(sel) : sel;
  root.className = 'stats' + (six ? ' six' : '');
  root.innerHTML = items.map((s, i) => {
    const dir = s.dir || 'up', ic = dir === 'down' ? 'downright' : dir === 'flat' ? 'flat' : 'upright';
    return `<article class="card stat fade-in" style="animation-delay:${i * 40}ms"><div class="stat-top"><span>${esc(s.label)}</span>${s.icon ? `<span class="chip ${s.tone || ''}">${icon(s.icon, 18)}</span>` : ''}</div>
      <div class="stat-val" data-i="${i}">${s.text != null ? esc(s.text) : '0'}</div>
      <div class="stat-foot">${s.delta ? `<span class="delta ${dir}">${icon(ic, 14)}${esc(s.delta)}</span>` : ''}<span>${esc(s.note ?? 'vs last month')}</span></div></article>`;
  }).join('');
  items.forEach((s, i) => { if (s.count != null) countUp($(`[data-i="${i}"]`, root), s.count, s); });
}

/* ---------- data table (search, filter, sort, pagination, skeleton) ---------- */
function pageList(c, n) {
  if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1);
  const s = new Set([1, n, c - 1, c, c + 1]); if (c <= 3) { s.add(2); s.add(3); } if (c >= n - 2) { s.add(n - 1); s.add(n - 2); }
  const a = [...s].filter(x => x >= 1 && x <= n).sort((a, b) => a - b), out = [];
  a.forEach((x, i) => { if (i && x - a[i - 1] > 1) out.push('…'); out.push(x); }); return out;
}
function table(o) {
  const root = typeof o.el === 'string' ? $(o.el) : o.el;
  const thead = $('thead', root), tbody = $('tbody', root), info = $('.info', root), pager = $('.pager', root);
  const S = { page: 1, q: '', pred: null, key: null, dir: 1 }, size = o.pageSize || 8;
  let data = o.data, filtered = data, loaded = false;
  thead.innerHTML = '<tr>' + o.cols.map((c, i) => `<th class="${c.cls || ''}${c.sort ? ' sortable' : ''}" data-i="${i}">${c.label ?? ''}${c.sort ? '<span class="sort-ind"></span>' : ''}</th>`).join('') + '</tr>';
  const val = (c, r) => typeof c.sort === 'function' ? c.sort(r) : r[c.key];
  function apply() {
    const q = S.q.toLowerCase();
    filtered = data.filter(r => (!S.pred || S.pred(r)) && (!q || (o.text ? o.text(r) : JSON.stringify(Object.values(r))).toLowerCase().includes(q)));
    if (S.key != null) { const c = o.cols[S.key]; filtered = [...filtered].sort((a, b) => { const x = val(c, a), y = val(c, b); return (x > y ? 1 : x < y ? -1 : 0) * S.dir; }); }
    const pages = Math.max(1, Math.ceil(filtered.length / size)); if (S.page > pages) S.page = pages;
  }
  function render() {
    apply();
    const total = filtered.length, pages = Math.max(1, Math.ceil(total / size)), a = (S.page - 1) * size, rows = filtered.slice(a, a + size);
    $$('th', thead).forEach((th, i) => th.classList.remove('asc', 'desc'));
    if (S.key != null) $$('th', thead)[S.key].classList.add(S.dir > 0 ? 'asc' : 'desc');
    tbody.innerHTML = rows.length ? rows.map(r => `<tr${o.rowAttr ? ' ' + o.rowAttr(r) : ''}>` + o.cols.map(c => `<td class="${c.cls || ''}">${c.render ? c.render(r) : esc(r[c.key])}</td>`).join('') + '</tr>').join('') : `<tr><td colspan="${o.cols.length}"><div class="empty">No ${o.label || 'results'} match your filters.</div></td></tr>`;
    info.innerHTML = total ? `Showing <b>${a + 1}-${a + rows.length}</b> of <b>${total.toLocaleString()}</b> ${o.label || 'results'}` : `No ${o.label || 'results'}`;
    if (o.pager === 'numbers') {
      pager.innerHTML = `<button class="pg" data-p="${S.page - 1}" ${S.page === 1 ? 'disabled' : ''} aria-label="Previous page">${icon('left', 16)}</button>` +
        pageList(S.page, pages).map(p => p === '…' ? '<span class="pg-gap">…</span>' : `<button class="pg ${p === S.page ? 'on' : ''}" data-p="${p}" aria-label="Page ${p}">${p}</button>`).join('') +
        `<button class="pg" data-p="${S.page + 1}" ${S.page === pages ? 'disabled' : ''} aria-label="Next page">${icon('right', 16)}</button>`;
    } else {
      pager.innerHTML = `<button class="btn btn-outline btn-sm" data-p="${S.page - 1}" ${S.page === 1 ? 'disabled' : ''}>Previous</button><button class="btn btn-primary btn-sm" data-p="${S.page + 1}" ${S.page === pages ? 'disabled' : ''}>Next</button>`;
    }
    o.onRender && o.onRender(rows, filtered);
  }
  function skeleton() {
    tbody.innerHTML = Array.from({ length: Math.min(size, 6) }, () => '<tr>' + o.cols.map(() => `<td><div class="sk" style="width:${50 + Math.random() * 40}%"></div></td>`).join('') + '</tr>').join('');
    info.innerHTML = '<div class="sk" style="width:160px"></div>';
  }
  pager.addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (!b || b.disabled) return; S.page = +b.dataset.p; render(); root.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
  thead.addEventListener('click', e => { const th = e.target.closest('th.sortable'); if (!th) return; const i = +th.dataset.i; S.dir = S.key === i ? -S.dir : 1; S.key = i; S.page = 1; render(); });
  const ctl = {
    refresh: render,
    setData(d) { data = d; S.page = 1; render(); },
    setPred(p) { S.pred = p; S.page = 1; render(); },
    setQuery(q) { S.q = q; S.page = 1; render(); },
    get rows() { return filtered; },
    get all() { return data; }
  };
  if (o.search) { const si = $(o.search); if (si) { let t; si.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => ctl.setQuery(si.value.trim()), 140); }); const q = new URLSearchParams(location.search).get('q'); if (q) { si.value = q; S.q = q; } } }
  skeleton(); setTimeout(() => { loaded = true; render(); }, o.instant ? 0 : 480);
  return ctl;
}

/* ---------- seeded data helpers ---------- */
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const shuffle = (a, r) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, r) => a[Math.floor(r() * a.length)];
const NAMES = { first: ['Aaliyah','Bruno','Camille','Dmitri','Esme','Farid','Greta','Hiro','Imani','Jonas','Keiko','Luca','Mira','Nikolai','Oluwaseun','Priya','Quentin','Rosa','Soren','Tamsin','Uma','Viktor','Wen','Ximena','Yusuf','Zara','Anders','Beatriz','Caleb','Dalia'],
  last: ['Okafor','Lindqvist','Moreau','Petrov','Nakamura','Haddad','Alvarez','Kowalski','Bianchi','Osei','Tanaka','Fischer','Rahman','Dubois','Novak','Silva','Ibrahim','Larsen','Chen','Murphy','Santos','Volkov','Adeyemi','Ricci','Hansen','Mehta','Costa','Berg','Park','Quinn'],
  co: ['Northwind','Bluepeak','Solstice','Ferro','Lumen','Cascade','Helix','Granite','Vantage','Orchid','Meridian','Atlas','Kestrel','Juniper','Harbor','Summit','Ember','Tidal','Quartz','Redwood'],
  coSfx: ['Labs','Group','Partners','Systems','Digital','Holdings','Logistics','Studio','Capital','Works'] };
const slug = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '');
const money = (n, d = 0) => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtDate = d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
const isoDay = d => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const addDays = (n, base = new Date()) => { const d = new Date(base); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + n); return d; };

/* ---------- downloads ---------- */
function download(name, text, type = 'text/csv') { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 500); }
const csv = rows => rows.map(r => r.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');

/* ---------- charts (theme-aware) ---------- */
const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const colors = () => ({ primary: css('--primary'), grid: css('--border'), tick: css('--text-3'), surface: css('--surface'), text: css('--text'), text2: css('--text-2'), soft: css('--border-strong'), green: '#10B981', purple: '#8B5CF6', amber: '#F59E0B', gray: '#9CA3AF' });
function chart(canvasSel, build) {
  const cv = typeof canvasSel === 'string' ? $(canvasSel) : canvasSel; let inst;
  const draw = () => { if (!window.Chart) return; inst && inst.destroy(); Chart.defaults.font.family = 'Inter, system-ui, sans-serif'; Chart.defaults.color = css('--text-3'); inst = new Chart(cv, build(colors(), cv.getContext('2d'))); cv._chart = inst; };
  draw(); window.addEventListener('themechange', draw); return { redraw: draw, get inst() { return inst; } };
}

/* ---------- shell ---------- */
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: 'dashboard.html' },
  { id: 'customers', label: 'Customers', icon: 'users', href: 'customers.html' },
  { id: 'leads', label: 'Leads', icon: 'userplus', href: 'leads.html', badge: 14 },
  { id: 'sales', label: 'Sales', icon: 'trend', href: 'sales.html' },
  { id: 'projects', label: 'Projects', icon: 'folder', href: 'projects.html' },
  { id: 'tasks', label: 'Tasks', icon: 'check', href: 'tasks.html' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', href: 'calendar.html' },
  { id: 'invoices', label: 'Invoices', icon: 'file', href: 'invoices.html' },
  { id: 'reports', label: 'Reports', icon: 'bars', href: 'reports.html' },
  { id: 'team', label: 'Team', icon: 'team', href: 'team.html' }
];
const brandHTML = () => `<img class="brand-mark" src="${BRAND.logo}" alt="" onerror="this.remove()"><span>${esc(BRAND.name)}</span>`;
const NOTIFS = [
  { t: '<b>David Miller</b> sent you the project specifications document', time: '2 hours ago' },
  { t: 'Invoice <b>#INV-2026-004</b> is now overdue', time: '4 hours ago' },
  { t: '<b>Sarah Jenkins</b> mentioned you in the lead overview sheet', time: 'Yesterday' },
  { t: 'New task assigned: <b>Review October commissions</b>', time: 'Oct 15' }
];
const PAGES = [
  ['Dashboard','dashboard.html','dashboard'],['Customers','customers.html','users'],['Leads','leads.html','userplus'],['Sales Pipeline','sales.html','trend'],['Projects','projects.html','folder'],
  ['Tasks','tasks.html','check'],['Calendar','calendar.html','calendar'],['Invoices','invoices.html','file'],['Reports & Analytics','reports.html','bars'],['Team','team.html','team'],
  ['Notifications & Messages','messages.html','mail'],['My Profile','profile.html','user'],['Settings','settings.html','settings']
];
const ENTITIES = [
  ['Marcus Aurelius','Customer · Roma Consulting','customers.html?q=Marcus','users'],['Elena Rostova','Customer · Siberia Tech','customers.html?q=Elena','users'],['Julian Vance','Lead · AeroMedia Corp','leads.html?q=Julian','userplus'],
  ['Enterprise Upgrade','Deal · Zeta Logistics','sales.html?q=Enterprise','trend'],['INV-2026-004','Invoice · Siberia Tech','invoices.html?q=INV-2026-004','file'],['API Integration & Sync','Project · Zeta Logistics','projects.html','folder'],['Q3 Sales Pipeline Performance','Report','reports.html?q=Q3','bars']
];
function buildShell() {
  const page = document.body.dataset.page; if (!page) return;
  const links = NAV.map(n => `<a class="nav-link${n.id === page ? ' active' : ''}" href="${n.href}" data-tip="${n.label}"${n.id === page ? ' aria-current="page"' : ''}>${icon(n.icon, 20)}<span class="nav-label">${n.label}</span>${n.badge ? `<span class="nav-badge">${n.badge}</span>` : ''}</a>`).join('');
  const read = store.get('notifRead', false);
  document.body.insertAdjacentHTML('afterbegin', `
  <header class="topbar">
    <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open navigation">${icon('menu', 20)}</button>
    <a class="brand" href="dashboard.html" data-brand aria-label="${esc(BRAND.name)} home"></a>
    <button class="search" id="searchBtn" type="button" aria-haspopup="dialog">${icon('search', 16)}<span>Search prospects, contacts, sales pipelines…</span><kbd>⌘ K</kbd></button>
    <div class="top-actions">
      <button class="icon-btn" data-theme-btn></button>
      <a class="chip-btn${page === 'messages' ? ' on' : ''}" href="messages.html" aria-label="Messages">${icon('mail', 18)}<i class="dot${read ? ' off' : ''}" id="mailDot"></i></a>
      <button class="chip-btn" id="bellBtn" aria-haspopup="true" aria-label="Notifications">${icon('bell', 18)}<i class="dot${read ? ' off' : ''}" id="bellDot"></i></button>
      <div class="vr"></div>
      <button class="user" id="userBtn" aria-haspopup="true"><span class="user-meta"><b>${esc(USER.name)}</b><small>${esc(USER.role)}</small></span>${avatar(USER.name, 36)}</button>
    </div>
  </header>
  <aside class="sidebar" id="sidebar" aria-label="Primary"><nav class="nav">${links}</nav>
    <div class="side-foot"><a class="nav-link${page === 'settings' ? ' active' : ''}" href="settings.html" data-tip="Settings">${icon('settings', 20)}<span class="nav-label">Settings</span></a>
    <button class="collapse-btn" id="railBtn" aria-label="Collapse sidebar">${icon('left', 20)}<span>Collapse</span></button></div></aside>
  <div class="scrim" id="scrim"></div><div class="tip" id="tip"></div>`);
  $$('[data-brand]').forEach(el => el.innerHTML = brandHTML());
  try { if (innerWidth > 900 && localStorage.getItem('e360:rail') === '1') document.body.classList.add('rail'); } catch (e) {}
  $('#railBtn').addEventListener('click', () => { const on = document.body.classList.toggle('rail'); try { localStorage.setItem('e360:rail', on ? '1' : '0'); } catch (e) {} $('#tip').classList.remove('show'); });
  $('#menuBtn').addEventListener('click', () => document.body.classList.toggle('nav-open'));
  $('#scrim').addEventListener('click', () => document.body.classList.remove('nav-open'));
  const tip = $('#tip');
  $$('.sidebar [data-tip]').forEach(a => { a.addEventListener('mouseenter', () => { if (!document.body.classList.contains('rail') || innerWidth <= 900) return; const r = a.getBoundingClientRect(); tip.textContent = a.dataset.tip; tip.style.left = r.right + 12 + 'px'; tip.style.top = r.top + r.height / 2 - 15 + 'px'; tip.classList.add('show'); }); a.addEventListener('mouseleave', () => tip.classList.remove('show')); });
  $('#searchBtn').addEventListener('click', openPalette);
  // popovers
  let pop = null; const closePop = () => { pop && pop.remove(); pop = null; };
  document.addEventListener('click', e => { if (pop && !pop.contains(e.target) && !e.target.closest('#bellBtn,#userBtn')) closePop(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePop(); });
  $('#bellBtn').addEventListener('click', () => {
    if (pop && pop.dataset.k === 'bell') return closePop(); closePop();
    pop = document.createElement('div'); pop.className = 'pop'; pop.dataset.k = 'bell';
    const rd = store.get('notifRead', false);
    pop.innerHTML = `<div class="pop-head"><span>Notifications</span><button class="link" id="markRead" style="background:none;border:0;font-size:13px">Mark all read</button></div>${NOTIFS.map(n => `<a class="pop-item" href="messages.html"><i class="ud${rd ? ' read' : ''}"></i><div><p>${n.t}</p><small>${n.time}</small></div></a>`).join('')}<a class="pop-item" href="messages.html" style="justify-content:center;color:var(--primary);font-weight:600;font-size:13px">View all</a>`;
    document.body.appendChild(pop);
    $('#markRead', pop).addEventListener('click', ev => { ev.stopPropagation(); store.set('notifRead', true); $$('.ud', pop).forEach(u => u.classList.add('read')); $$('#mailDot,#bellDot').forEach(d => d.classList.add('off')); toast('All notifications marked as read', 'ok'); });
  });
  $('#userBtn').addEventListener('click', () => {
    if (pop && pop.dataset.k === 'user') return closePop(); closePop();
    pop = document.createElement('div'); pop.className = 'pop sm'; pop.dataset.k = 'user';
    pop.innerHTML = `<a class="menu-link" href="profile.html">${icon('user', 16)}My Profile</a><a class="menu-link" href="settings.html">${icon('settings', 16)}Settings</a><a class="menu-link" href="login.html">${icon('logout', 16)}Sign out</a>`;
    document.body.appendChild(pop);
  });
}

/* ---------- command palette ---------- */
function openPalette() {
  if ($('.cp')) return;
  const bg = document.createElement('div'); bg.className = 'modal-bg'; bg.style.alignItems = 'start';
  const items = [...PAGES.map(p => ({ l: p[0], s: 'Page', h: p[1], i: p[2] })), ...ENTITIES.map(e => ({ l: e[0], s: e[1], h: e[2], i: e[3] }))];
  bg.innerHTML = `<div class="cp" role="dialog" aria-modal="true" aria-label="Search"><div class="cp-in">${icon('search', 18)}<input id="cpIn" placeholder="Search pages, people, deals, invoices…" autocomplete="off" aria-label="Search"><kbd>Esc</kbd></div><div class="cp-list" id="cpList"></div></div>`;
  document.body.appendChild(bg);
  const inp = $('#cpIn', bg), list = $('#cpList', bg); let sel = 0, shown = [];
  const draw = () => { const q = inp.value.trim().toLowerCase(); shown = items.filter(i => !q || (i.l + ' ' + i.s).toLowerCase().includes(q)).slice(0, 9); sel = Math.min(sel, Math.max(0, shown.length - 1)); list.innerHTML = shown.length ? shown.map((i, n) => `<div class="cp-item${n === sel ? ' on' : ''}" data-n="${n}"><span class="chip">${icon(i.i, 16)}</span><div><div style="font-weight:600">${esc(i.l)}</div></div><small>${esc(i.s)}</small></div>`).join('') : `<div class="empty">No results for “${esc(inp.value)}”</div>`; };
  const go = n => { const it = shown[n]; if (it) location.href = it.h; };
  const close = () => { bg.remove(); document.removeEventListener('keydown', key); };
  const key = e => { if (e.key === 'Escape') close(); else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(shown.length - 1, sel + 1); draw(); } else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); draw(); } else if (e.key === 'Enter') go(sel); };
  document.addEventListener('keydown', key);
  bg.addEventListener('mousedown', e => { if (e.target === bg) close(); });
  list.addEventListener('click', e => { const el = e.target.closest('[data-n]'); if (el) go(+el.dataset.n); });
  list.addEventListener('mousemove', e => { const el = e.target.closest('[data-n]'); if (el && +el.dataset.n !== sel) { sel = +el.dataset.n; $$('.cp-item', list).forEach((x, n) => x.classList.toggle('on', n === sel)); } });
  inp.addEventListener('input', () => { sel = 0; draw(); }); draw(); inp.focus();
}
document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && document.body.dataset.page) { e.preventDefault(); openPalette(); } });

/* ---------- animate progress bars on load ---------- */
function bars(root = document) { requestAnimationFrame(() => setTimeout(() => $$('.bar>i[data-w]', root).forEach(i => i.style.width = i.dataset.w + '%'), 60)); }

/* ---------- boot ---------- */
function boot() { buildShell(); $$('[data-brand]').forEach(el => { if (!el.innerHTML) el.innerHTML = brandHTML(); }); bindThemeBtns(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

window.E = { $, $$, esc, sleep, icon, avatar, initials, hash, store, theme, toast, busy, modal, confirm: confirmBox, stats, countUp, table, rng, shuffle, pick, NAMES, slug, money, fmtDate, isoDay, addDays, download, csv, chart, colors, bars, openPalette, USER, BRAND };
})();
