/* =========================================================
   EMPOWA360 — demo data + shared forms
   Rows from the Figma screens are kept verbatim; the rest is
   generated deterministically so totals match the designs.
   Swap D.* with your API calls when you wire a backend.
   ========================================================= */
(() => {
'use strict';
const { rng, shuffle, pick, NAMES, slug, store, addDays, isoDay, modal, toast, esc } = E;

const exact = (total, targets, fixed, r) => {   // statuses with exact overall counts
  const left = { ...targets }; fixed.forEach(s => left[s]--);
  const pool = []; Object.entries(left).forEach(([k, n]) => { for (let i = 0; i < n; i++) pool.push(k); });
  return [...fixed, ...shuffle(pool, r)];
};
const person = (i, r) => {
  const f = NAMES.first[i % 30], l = NAMES.last[(Math.floor(i / 30) + i) % 30];
  return i >= 900 ? `${f} ${String.fromCharCode(65 + (i % 26))}. ${l}` : `${f} ${l}`;
};
const company = r => `${pick(NAMES.co, r)} ${pick(NAMES.coSfx, r)}`;
const AGO = ['4 hours ago', '8 hours ago', 'Yesterday', '2 days ago', '3 days ago', '5 days ago', '1 week ago', '2 weeks ago', '3 weeks ago'];

/* ---------- customers (1,248: 986 active / 262 inactive) ---------- */
const C8 = [
  ['Marcus Aurelius', 'Roma Consulting', 'marcus@roma.co', '+1 (555) 019-2831', 'Active', '2 mins ago'],
  ['Elena Rostova', 'Siberia Tech', 'elena.r@siberiatech.io', '+1 (555) 048-1920', 'Active', '1 hour ago'],
  ['Kofi Anan', 'Zuri Ventures', 'kofi@zuriventures.com', '+1 (555) 012-4829', 'Active', '3 hours ago'],
  ['Devin Booker', 'Phoenix Media', 'd.booker@phoenix.co', '+1 (555) 083-9121', 'Inactive', '2 days ago'],
  ['Mei-Ling Zhou', 'Lotus Logistics', 'zhou.ml@lotuslog.cn', '+1 (555) 091-8273', 'Active', '5 hours ago'],
  ['Amélie Dubois', 'Atelier Paris', 'amelie@atelierparis.fr', '+1 (555) 023-4581', 'Active', 'Yesterday'],
  ['Santiago Gomez', 'Andes Mining', 's.gomez@andes.cl', '+1 (555) 062-1190', 'Inactive', '1 week ago'],
  ['Sarah Jenkins', 'Apex Creative', 'sarah@apexcreative.net', '+1 (555) 041-3829', 'Active', '3 mins ago']
];
function customers() {
  const r = rng(11), st = exact(1248, { Active: 986, Inactive: 262 }, C8.map(c => c[4]), r), out = [];
  for (let i = 0; i < 1248; i++) {
    if (i < 8) { const c = C8[i]; out.push({ id: 'c' + i, name: c[0], company: c[1], email: c[2], phone: c[3], status: c[4], last: c[5] }); continue; }
    const n = person(i, r), co = company(r);
    out.push({ id: 'c' + i, name: n, company: co, email: `${slug(n.split(' ')[0])}.${slug(n.split(' ').pop())}@${slug(co)}.com`, phone: `+1 (555) ${String(100 + Math.floor(r() * 899))}-${String(1000 + Math.floor(r() * 8999))}`, status: st[i], last: pick(AGO, r) });
  }
  return [...store.get('customers'), ...out];
}

/* ---------- leads (1,847) ---------- */
const L8 = [
  ['Julian Vance', 'AeroMedia Corp', 'julian@aeromedia.com', 'New', 'Inbound Email', 'David Miller', '2026-10-24'],
  ['Sophia Martinez', 'Apex Systems', 'sophia@apexsys.io', 'Contacted', 'LinkedIn', 'Sarah Jenkins', '2026-10-23'],
  ['Marcus Brody', 'Zeta Logistics', 'brody@zetalog.com', 'Qualified', 'Referral', 'David Miller', '2026-10-22'],
  ['Elena Rostova', 'Siberia Tech', 'elena@sibtech.ru', 'Proposal', 'Website Form', 'Elizabeth Mercer', '2026-10-20'],
  ['Christian Bale', 'Wayne Ent.', 'bale@waynecorp.com', 'Won', 'Partner', 'Sarah Jenkins', '2026-10-19'],
  ['Tariq Al-Farsi', 'Oman Capital', 'tariq@omancap.om', 'Lost', 'Cold Call', 'David Miller', '2026-10-18'],
  ['Fiona Gallagher', 'Gallagher Realty', 'fiona@gallrealty.co', 'Proposal', 'Inbound Call', 'Elizabeth Mercer', '2026-10-15'],
  ['Arthur Pendragon', 'Camelot Group', 'arthur@camelot.org', 'Contacted', 'LinkedIn', 'Sarah Jenkins', '2026-10-14']
];
const SOURCES = ['Inbound Email', 'LinkedIn', 'Referral', 'Website Form', 'Partner', 'Cold Call', 'Inbound Call'];
const OWNERS = ['David Miller', 'Sarah Jenkins', 'Elizabeth Mercer'];
function leads() {
  const r = rng(23), T = { New: 284, Contacted: 300, Qualified: 560, Proposal: 360, Won: 200, Lost: 143 };
  const st = exact(1847, T, L8.map(l => l[3]), r), out = [];
  for (let i = 0; i < 1847; i++) {
    if (i < 8) { const l = L8[i]; out.push({ id: 'l' + i, name: l[0], company: l[1], email: l[2], status: l[3], source: l[4], owner: l[5], last: l[6] }); continue; }
    const n = person(i + 40, r), co = company(r);
    out.push({ id: 'l' + i, name: n, company: co, email: `${slug(n.split(' ')[0])}@${slug(co)}.com`, status: st[i], source: pick(SOURCES, r), owner: pick(OWNERS, r), last: isoDay(addDays(-(Math.floor(i / 7) + 1), new Date('2026-10-13T12:00:00'))) });
  }
  return [...store.get('leads'), ...out];
}

/* ---------- invoices (142) ---------- */
const I8 = [
  ['AeroMedia Corp', 12500, '2026-10-12', '2026-11-12', 'Paid'], ['Apex Systems', 8200, '2026-10-15', '2026-11-15', 'Pending'],
  ['Zeta Logistics', 45000, '2026-10-18', '2026-11-18', 'Paid'], ['Siberia Tech', 22100, '2026-10-20', '2026-11-20', 'Overdue'],
  ['Wayne Ent.', 150000, '2026-10-22', '2026-11-22', 'Draft'], ['Oman Capital', 5400, '2026-10-24', '2026-11-24', 'Pending'],
  ['Gallagher Realty', 9800, '2026-10-26', '2026-11-26', 'Paid'], ['Camelot Group', 3400, '2026-10-28', '2026-11-28', 'Draft']
];
function invoices() {
  const r = rng(37), out = [];
  I8.forEach((v, i) => out.push({ id: `INV-2026-${String(i + 1).padStart(3, '0')}`, client: v[0], amount: v[1], issued: v[2], due: v[3], status: v[4] }));
  for (let k = 0; k < 134; k++) {
    const issued = addDays(-(Math.round(k * 2.6) + 4), new Date('2026-10-10T12:00:00')), s = r();
    out.push({ id: `INV-2025-${String(134 - k).padStart(3, '0')}`, client: company(r), amount: Math.round((2000 + r() * 60000) / 100) * 100, issued: isoDay(issued), due: isoDay(addDays(30, issued)), status: s < .72 ? 'Paid' : s < .86 ? 'Pending' : s < .94 ? 'Draft' : 'Overdue' });
  }
  return [...store.get('invoices'), ...out];
}

/* ---------- tasks (32) ---------- */
const T8 = [
  ['Empowa360 Brand Refresh', 'Brand Refresh', 'David Miller', 'High', 'In Progress', '2026-11-15'], ['API Integration & Sync', 'API Integration', 'Sarah Jenkins', 'Medium', 'To Do', '2026-12-10'],
  ['Customer Portal Redesign', 'Customer Portal', 'Elizabeth Mercer', 'High', 'Review', '2026-10-24'], ['Security Audit Action Items', 'Brand Refresh', 'David Miller', 'High', 'In Progress', '2026-10-15'],
  ['Onboarding Flow Optimization', 'Customer Portal', 'Sarah Jenkins', 'Low', 'Done', '2027-01-30'], ['Marketing Campaign Asset Dev', 'API Integration', 'Elizabeth Mercer', 'Medium', 'To Do', '2026-11-30'],
  ['Database Schema Expansion', 'API Integration', 'David Miller', 'High', 'Done', '2026-11-05'], ['Billing Flow Review', 'Customer Portal', 'Sarah Jenkins', 'Low', 'Review', '2026-10-29']
];
const TV = ['Review', 'Draft', 'Update', 'Prepare', 'Audit', 'Schedule', 'Finalize', 'Document'], TO = ['pricing sheet', 'HubSpot field mapping', 'renewal contracts', 'onboarding checklist', 'Q4 forecast', 'lead routing rules', 'support macros', 'quarterly deck'];
const TP = ['Brand Refresh', 'API Integration', 'Customer Portal'];
function tasks() {
  const r = rng(51), out = T8.map((v, i) => ({ id: 't' + i, name: v[0], project: v[1], assignee: v[2], priority: v[3], status: v[4], due: v[5] }));
  for (let i = 0; i < 24; i++) {
    const late = i === 3 || i === 11, done = !late && r() < .55;
    out.push({ id: 't' + (8 + i), name: `${TV[i % 8]} ${TO[(i * 3) % 8]}`, project: pick(TP, r), assignee: pick(OWNERS, r), priority: pick(['High', 'Medium', 'Low'], r), status: done ? 'Done' : late ? 'To Do' : pick(['To Do', 'In Progress', 'Review', 'In Progress'], r), due: late ? (i === 3 ? '2026-10-01' : '2026-10-03') : isoDay(addDays(2 + i * 2, new Date('2026-10-07T12:00:00'))) });
  }
  return [...store.get('tasks'), ...out];
}

/* ---------- deals / projects / team / reports ---------- */
const deals = () => [...store.get('deals'), ...[
  ['Enterprise Upgrade', 'Zeta Logistics', 45000, 'Closed Won', 100, 'Elizabeth M.', '2026-11-12'], ['Midmarket Subscription', 'Camelot Group', 12500, 'Proposal', 70, 'Sarah Jenkins', '2026-11-28'],
  ['Custom API Integration', 'Siberia Tech', 28000, 'Negotiation', 90, 'David Miller', '2026-12-05'], ['Cloud Migration Deal', 'Apex Systems', 60000, 'Discovery', 20, 'David Miller', '2027-01-15'],
  ['Security Audit Package', 'AeroMedia Corp', 8500, 'Closed Lost', 0, 'Sarah Jenkins', '2026-10-30']
].map((v, i) => ({ id: 'd' + i, name: v[0], company: v[1], value: v[2], stage: v[3], prob: v[4], owner: v[5], close: v[6] }))];
const projects = () => [...store.get('projects'), ...[
  ['Empowa360', 'Empowa360 Brand Refresh', 'Active', 85, '2026-11-15', ['David Miller', 'Sarah Jenkins']], ['Zeta Logistics', 'API Integration & Sync', 'Active', 40, '2026-12-10', ['David Miller']],
  ['Camelot Group', 'Customer Portal Redesign', 'Completed', 100, '2026-10-24', ['Elizabeth Mercer', 'Julian Vance']], ['Apex Systems', 'Onboarding Flow Optimization', 'On Hold', 15, '2027-01-30', ['Sophia Martinez', 'Sarah Jenkins']],
  ['AeroMedia Corp', 'Security Audit Action Items', 'Overdue', 95, '2026-10-15', ['Arthur Pendragon', 'Marcus Brody']], ['Siberia Tech', 'Marketing Campaign Asset Dev', 'Active', 60, '2026-11-30', ['Julian Vance', 'Sarah Jenkins']]
].map((v, i) => ({ id: 'p' + i, client: v[0], name: v[1], status: v[2], progress: v[3], due: v[4], team: v[5] }))];
const team = () => [...store.get('team'), ...[
  ['Sarah Jenkins', 'Sales Manager', 'Sales', 'sarah.j@empowa360.com', 94, 'online'], ['David Miller', 'Account Executive', 'Sales', 'david.m@empowa360.com', 88, 'away'], ['Julian Vance', 'Marketing Lead', 'Marketing', 'julian.v@empowa360.com', 91, 'online'],
  ['Sophia Martinez', 'Project Manager', 'Operations', 'sophia.m@apexsys.io', 85, 'online'], ['Marcus Brody', 'Customer Success', 'Support', 'brody@zetalog.com', 92, 'away'], ['Arthur Pendragon', 'Business Analyst', 'Product', 'arthur@camelot.org', 80, 'offline']
].map((v, i) => ({ id: 'm' + i, name: v[0], role: v[1], dept: v[2], email: v[3], perf: v[4], presence: v[5] }))];
const reports = () => [...store.get('reports'), ...[
  ['Q3 Sales Pipeline Performance', 'Sales', 'Elizabeth Mercer', '2026-10-24', 'Ready'], ['Inbound Lead Conversion Audit', 'Marketing', 'Sarah Jenkins', '2026-10-22', 'Ready'],
  ['Annual Projected Financial Forecast', 'Finance', 'David Miller', '2026-10-20', 'Processing'], ['Monthly Customer Support SLA', 'Operations', 'Marcus Brody', '2026-10-18', 'Scheduled'],
  ['Ad-hoc Referral Acquisition Audit', 'Marketing', 'Elizabeth Mercer', '2026-10-15', 'Ready'], ['Territory Assignment Optimization', 'Sales', 'Sarah Jenkins', '2026-10-10', 'Ready']
].map((v, i) => ({ id: 'r' + i, name: v[0], type: v[1], by: v[2], date: v[3], status: v[4] }))];
const events = () => {
  const d = n => isoDay(addDays(n));
  return [...store.get('events'), ...[
    ['Client Sync', 'Meeting', d(-6), '09:00', '10:00', 'blue'], ['Dev Deadline', 'Deadline', d(-4), '17:00', '18:00', 'green'],
    ['Empowa360 Kickoff', 'Meeting', d(1), '10:00', '11:30', 'blue'], ['API Spec Freeze', 'Deadline', d(2), '14:00', '15:00', 'green'],
    ['Sprint Review Phase 1', 'Review', d(5), '16:00', '17:00', 'purple'], ['User Persona Alignment', 'Meeting', d(7), '11:00', '12:00', 'blue']
  ].map((v, i) => ({ id: 'e' + i, title: v[0], kind: v[1], date: v[2], start: v[3], end: v[4], tone: v[5] }))];
};

window.D = { customers, leads, invoices, tasks, deals, projects, team, reports, events, OWNERS, SOURCES };

/* ---------- shared forms (each one saves to the demo store) ---------- */
const uid = p => p + Date.now().toString(36);
const F = {
  customer(cb) { modal({ title: 'Add Customer', sub: 'Create a new client record.', fields: [
    { name: 'name', label: 'Full name', required: true, placeholder: 'Jane Cooper' }, { name: 'company', label: 'Company', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'], span: true }], submit: 'Add customer',
    onSubmit: v => { const it = { id: uid('c'), ...v, phone: v.phone || '—', last: 'Just now' }; store.push('customers', it); toast(`${v.name} added to customers`, 'ok'); cb && cb(it); } }); },
  lead(cb) { modal({ title: 'Add Lead', sub: 'Capture a new prospect.', fields: [
    { name: 'name', label: 'Lead name', required: true }, { name: 'company', label: 'Company', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true, span: true }, { name: 'source', label: 'Source', type: 'select', options: SOURCES }, { name: 'owner', label: 'Assigned to', type: 'select', options: OWNERS }], submit: 'Add lead',
    onSubmit: v => { const it = { id: uid('l'), ...v, status: 'New', last: isoDay(new Date()) }; store.push('leads', it); toast(`${v.name} added as a new lead`, 'ok'); cb && cb(it); } }); },
  project(cb) { modal({ title: 'New Project', sub: 'Start tracking a client deliverable.', fields: [
    { name: 'name', label: 'Project name', required: true, span: true }, { name: 'client', label: 'Client', required: true }, { name: 'due', label: 'Due date', type: 'date', required: true, value: isoDay(addDays(30)) },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'On Hold'], span: true }], submit: 'Create project',
    onSubmit: v => { const it = { id: uid('p'), ...v, progress: 0, team: [E.USER.name] }; store.push('projects', it); toast(`Project “${v.name}” created`, 'ok'); cb && cb(it); } }); },
  invoice(cb) { modal({ title: 'Create Invoice', sub: 'Bill a client and track collection.', fields: [
    { name: 'client', label: 'Client', required: true, span: true }, { name: 'amount', label: 'Amount (USD)', type: 'number', required: true, min: 1, step: '0.01', placeholder: '2500' }, { name: 'due', label: 'Due date', type: 'date', required: true, value: isoDay(addDays(30)) },
    { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Pending'], value: 'Pending', span: true }], submit: 'Create invoice',
    onSubmit: v => { const n = D.invoices().filter(i => i.id.startsWith('INV-2026')).length + 1; const it = { id: `INV-2026-${String(n).padStart(3, '0')}`, client: v.client, amount: +v.amount, issued: isoDay(new Date()), due: v.due, status: v.status }; store.push('invoices', it); toast(`Invoice ${it.id} created`, 'ok'); cb && cb(it); } }); },
  task(cb) { modal({ title: 'Add Task', sub: 'Assign work to a teammate.', fields: [
    { name: 'name', label: 'Task name', required: true, span: true }, { name: 'project', label: 'Project', type: 'select', options: TP }, { name: 'assignee', label: 'Assignee', type: 'select', options: OWNERS },
    { name: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'], value: 'Medium' }, { name: 'due', label: 'Due date', type: 'date', required: true, value: isoDay(addDays(7)) }], submit: 'Add task',
    onSubmit: v => { const it = { id: uid('t'), ...v, status: 'To Do' }; store.push('tasks', it); toast('Task added', 'ok'); cb && cb(it); } }); },
  deal(cb) { modal({ title: 'New Deal', sub: 'Add an opportunity to the pipeline.', fields: [
    { name: 'name', label: 'Deal name', required: true, span: true }, { name: 'company', label: 'Company', required: true }, { name: 'value', label: 'Value (USD)', type: 'number', required: true, min: 1 },
    { name: 'stage', label: 'Stage', type: 'select', options: ['Discovery', 'Proposal', 'Negotiation'] }, { name: 'close', label: 'Expected close', type: 'date', required: true, value: isoDay(addDays(45)) }], submit: 'Create deal',
    onSubmit: v => { const p = { Discovery: 20, Proposal: 70, Negotiation: 90 }[v.stage]; const it = { id: uid('d'), name: v.name, company: v.company, value: +v.value, stage: v.stage, prob: p, owner: 'Elizabeth M.', close: v.close }; store.push('deals', it); toast(`Deal “${v.name}” created`, 'ok'); cb && cb(it); } }); },
  event(cb, date) { modal({ title: 'New Event', sub: 'Schedule a commitment.', fields: [
    { name: 'title', label: 'Title', required: true, span: true }, { name: 'date', label: 'Date', type: 'date', required: true, value: date || isoDay(new Date()) }, { name: 'kind', label: 'Type', type: 'select', options: ['Meeting', 'Deadline', 'Review'] },
    { name: 'start', label: 'Starts', type: 'time', required: true, value: '10:00' }, { name: 'end', label: 'Ends', type: 'time', required: true, value: '11:00' }], submit: 'Add event',
    onSubmit: v => { const it = { id: uid('e'), ...v, tone: { Meeting: 'blue', Deadline: 'green', Review: 'purple' }[v.kind] }; store.push('events', it); toast(`“${v.title}” scheduled`, 'ok'); cb && cb(it); } }); },
  member(cb) { modal({ title: 'Add Member', sub: 'Invite a teammate to the workspace.', fields: [
    { name: 'name', label: 'Full name', required: true }, { name: 'role', label: 'Job title', required: true }, { name: 'email', label: 'Work email', type: 'email', required: true, span: true },
    { name: 'dept', label: 'Department', type: 'select', options: ['Sales', 'Marketing', 'Operations', 'Support', 'Product'], span: true }], submit: 'Send invite',
    onSubmit: v => { const it = { id: uid('m'), ...v, perf: 75, presence: 'offline' }; store.push('team', it); toast(`Invite sent to ${v.email}`, 'ok'); cb && cb(it); } }); },
  report(cb) { modal({ title: 'Generate Report', sub: 'Build a report from live CRM data.', fields: [
    { name: 'name', label: 'Report name', required: true, span: true, placeholder: 'Q4 Pipeline Forecast' }, { name: 'type', label: 'Type', type: 'select', options: ['Sales', 'Marketing', 'Finance', 'Operations'] }, { name: 'when', label: 'Delivery', type: 'select', options: ['Run now', 'Schedule'] }], submit: 'Generate',
    onSubmit: v => { const it = { id: uid('r'), name: v.name, type: v.type, by: E.USER.name, date: isoDay(new Date()), status: v.when === 'Schedule' ? 'Scheduled' : 'Processing' }; store.push('reports', it); toast(v.when === 'Schedule' ? 'Report scheduled' : 'Generating report…', 'ok'); cb && cb(it); } }); }
};
window.F = F;
})();
