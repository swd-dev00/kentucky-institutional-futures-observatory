const lenses = [
  ['01','Governance & Accountability','Decision transparency, algorithmic oversight, recourse mechanisms, and public trust provisions.'],
  ['02','Talent & Capacity','Internal technical literacy, procurement skills, vendor dependency, and workforce transition support.'],
  ['03','Data Infrastructure','Data hygiene, storage sovereignty, legacy bottlenecks, and interoperability across county lines.'],
  ['04','Procurement & Contracting','Vendor lock-in risks, cost escalation, performance metrics, and proprietary black boxes.'],
  ['05','Public-Service Access','Digital exclusion, automated denial recourse, hybrid service availability, and equity impact.'],
  ['06','Physical & Digital Safeguards','Cybersecurity readiness, infrastructure resilience, and privacy safeguards.']
];

const instruments = [
  ['01','Kentucky Institutional AI Readiness Index','A framework for assessing governance, talent, data, infrastructure, procurement, and safeguards.','IN DEVELOPMENT','in-development'],
  ['02','Annual State of Institutional Futures Report','A planned synthesis of verified findings, documented developments, and unresolved research questions.','FORTHCOMING','forthcoming'],
  ['03','County and Regional Readiness Profiles','Place-based profiles designed to preserve regional context rather than flatten statewide variation.','RESEARCH FRAMEWORK','research-framework'],
  ['04','Rural Digital Access Monitor','A proposed view of affordability, reliability, accessibility, skills, devices, and service access.','IN DEVELOPMENT','in-development'],
  ['05','Public-Sector AI Procurement Tracker','A planned record of public procurements, contract terms, purposes, and oversight provisions.','RESEARCH FRAMEWORK','research-framework'],
  ['06','Kentucky AI Adoption Map','A future evidence map distinguishing announcements, procurements, pilots, and implemented systems.','FORTHCOMING','forthcoming'],
  ['07','Community Automation Concern Register','A proposed structured record of community-reported concerns, with verification status kept explicit.','IN DEVELOPMENT','in-development'],
  ['08','Institutional Case Studies','Documented examinations of decisions, operating conditions, public consequences, and institutional response.','RESEARCH FRAMEWORK','research-framework'],
  ['09','Policy and Infrastructure Briefs','Focused editorial research on governance choices, public systems, infrastructure, and implementation conditions.','FORTHCOMING','forthcoming']
];

document.addEventListener('DOMContentLoaded', () => {
  renderLenses();
  renderInstruments();
  setupDrawer();
  setupConcernDraft();
  drawTerritorialNetwork();
});

function renderLenses() {
  const grid = document.getElementById('lens-grid');
  if (!grid) return;
  grid.innerHTML = lenses.map(([number, title, description]) => `
    <article class="lens-card">
      <div><p class="eyebrow">Lens ${number}</p><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div>
      <div class="lens-state">Active audit focus</div>
    </article>
  `).join('');
}

function renderInstruments() {
  const rows = document.getElementById('instrument-rows');
  if (!rows) return;
  rows.innerHTML = instruments.map(([number, name, purpose, maturity, className]) => `
    <tr><td>${number}</td><td>${escapeHtml(name)}</td><td>${escapeHtml(purpose)}</td><td><span class="maturity ${className}">${maturity}</span></td></tr>
  `).join('');
}

function setupDrawer() {
  const menuButton = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeButton = document.getElementById('drawer-close');
  const links = [...document.querySelectorAll('.mobile-link')];
  if (!menuButton || !drawer || !closeButton) return;
  let open = false;

  const focusables = () => [closeButton, ...links].filter((element) => !element.hasAttribute('disabled'));
  const setOpen = (next) => {
    open = next;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close primary navigation' : 'Open primary navigation');
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    if (open) {
      drawer.removeAttribute('inert');
      document.body.classList.add('drawer-open');
      requestAnimationFrame(() => closeButton.focus());
    } else {
      drawer.setAttribute('inert', '');
      document.body.classList.remove('drawer-open');
      menuButton.focus();
    }
  };

  menuButton.addEventListener('click', () => setOpen(!open));
  closeButton.addEventListener('click', () => setOpen(false));
  links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  setOpen(false);
}

function setupConcernDraft() {
  const form = document.getElementById('concern-form');
  const result = document.getElementById('draft-result');
  const title = document.getElementById('draft-title');
  const copyButton = document.getElementById('copy-draft');
  const downloadButton = document.getElementById('download-draft');
  const copyStatus = document.getElementById('copy-status');
  const formMessage = document.getElementById('form-message');
  if (!form || !result || !title || !copyButton || !downloadButton || !copyStatus || !formMessage) return;

  const startedAt = performance.now();
  let draft = '';
  const showMessage = (message) => {
    formMessage.textContent = message;
    formMessage.hidden = false;
    formMessage.focus();
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (String(data.get('website-hp') || '').trim() || performance.now() - startedAt < 2000) {
      showMessage('Please review the form and try again.');
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    draft = [
      'KENTUCKY INSTITUTIONAL FUTURES OBSERVATORY',
      'LOCAL CONCERN DRAFT — NOT TRANSMITTED',
      '',
      `Name: ${data.get('name') || 'Anonymous'}`,
      `Email: ${data.get('email') || 'Not provided'}`,
      `County/Region: ${data.get('county')}`,
      `Institution: ${data.get('institution') || 'None specified'}`,
      `Category: ${data.get('category')}`,
      '',
      'Description:',
      String(data.get('description')),
      '',
      'This draft was generated locally in browser memory. It has not been transmitted to any server.'
    ].join('\n');
    formMessage.hidden = true;
    result.hidden = false;
    title.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });

  copyButton.addEventListener('click', async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
    } catch {
      const fallback = document.createElement('textarea');
      fallback.value = draft;
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand('copy');
      fallback.remove();
    }
    copyStatus.textContent = 'Summary copied to clipboard successfully.';
    copyStatus.hidden = false;
  });

  downloadButton.addEventListener('click', () => {
    if (!draft) return;
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `kifo-concern-draft-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  });
}

function drawTerritorialNetwork() {
  const canvas = document.getElementById('territory-canvas');
  if (!canvas || typeof ResizeObserver === 'undefined') return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const hubs = [
    {label:'PURCHASE',x:.12,y:.7,tone:'blue'},{label:'WESTERN',x:.27,y:.56,tone:'blue'},
    {label:'BLUEGRASS',x:.57,y:.39,tone:'rust'},{label:'JEFFERSON',x:.66,y:.19,tone:'rust'},
    {label:'EASTERN',x:.77,y:.59,tone:'blue'},{label:'APPALACHIA',x:.89,y:.73,tone:'rust'}
  ];
  const links = [[0,1],[1,2],[2,3],[2,4],[4,5],[1,4]];
  const draw = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width); const height = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(42,92,117,.16)'; ctx.lineWidth = 1;
    for (let radius=55; radius<Math.max(width,height)*1.2; radius+=70) { ctx.beginPath(); ctx.ellipse(width*.83,height*.5,radius,radius*.72,-.18,0,Math.PI*2); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(45,79,60,.38)'; ctx.setLineDash([3,7]);
    links.forEach(([a,b]) => { ctx.beginPath(); ctx.moveTo(hubs[a].x*width,hubs[a].y*height); ctx.lineTo(hubs[b].x*width,hubs[b].y*height); ctx.stroke(); });
    ctx.setLineDash([]); ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace'; ctx.textBaseline = 'middle';
    hubs.forEach((hub) => { const x=hub.x*width,y=hub.y*height,color=hub.tone==='rust'?'#c14e3a':'#2a5c75'; ctx.strokeStyle=color; ctx.beginPath(); ctx.arc(x,y,7,0,Math.PI*2); ctx.stroke(); ctx.fillStyle=color; ctx.beginPath(); ctx.arc(x,y,2.5,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(15,23,21,.72)'; ctx.fillText(hub.label,x+12,y); });
  };
  new ResizeObserver(draw).observe(canvas); draw();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
