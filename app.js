// TechDesk App Logic
// Main application controller

let allNews = [];
let bookmarks = [];
let currentTab = 'feed';
let currentCat = 'all';
let currentQ = '';

// Initialize
document.getElementById('dateDisplay').textContent = 
  new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

// Load bookmarks from localStorage
function loadBookmarks() {
  const stored = localStorage.getItem('techdesk_bookmarks');
  if (stored) {
    try {
      bookmarks = JSON.parse(stored);
      updateBookmarkBadge();
    } catch (e) {
      bookmarks = [];
    }
  }
}

function saveBookmarks() {
  localStorage.setItem('techdesk_bookmarks', JSON.stringify(bookmarks));
}

function updateBookmarkBadge() {
  const badge = document.getElementById('bmBadge');
  badge.textContent = bookmarks.length;
  badge.style.display = bookmarks.length ? 'inline' : 'none';
}

// Tab switching
function setTab(btn, tab) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentTab = tab;
  
  document.getElementById('feedView').style.display = 'none';
  document.getElementById('coView').style.display = 'none';
  document.getElementById('bmView').style.display = 'none';
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('sectionTitle').textContent = TABS[tab] || '';
  
  if (tab === 'companies') {
    document.getElementById('searchSection').style.display = 'none';
    document.getElementById('coView').style.display = 'block';
    renderCompanies();
  } else if (tab === 'bookmarks') {
    document.getElementById('searchSection').style.display = 'none';
    document.getElementById('bmView').style.display = 'block';
    renderBookmarks();
  } else {
    document.getElementById('feedView').style.display = 'block';
    currentCat = tab === 'feed' ? 'all' : tab;
    if (allNews.length) renderNews(allNews);
  }
}

// Load news briefing
function loadBriefing() {
  const btn = document.getElementById('fetchBtn');
  const sp = document.getElementById('spinner');
  const lb = document.getElementById('fetchLabel');
  
  btn.disabled = true;
  sp.style.display = 'block';
  lb.textContent = 'Loading…';
  
  // Simulate realistic load time
  setTimeout(() => {
    allNews = NEWS_DATA;
    renderNews(allNews);
    
    const now = new Date();
    document.getElementById('updateBar').textContent = 
      `${allNews.length} stories loaded • Updated ${now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })} • Curated for Placement Success`;
    
    btn.disabled = false;
    sp.style.display = 'none';
    lb.textContent = 'Refresh Briefing';
  }, 600);
}

// Search functionality
function onSI() {
  const val = document.getElementById('searchInput').value.trim();
  document.getElementById('scBtn').style.display = val ? 'block' : 'none';
}

function qs(term) {
  document.getElementById('searchInput').value = term;
  document.getElementById('scBtn').style.display = 'block';
  doSearch();
}

function doSearch() {
  currentQ = document.getElementById('searchInput').value.trim().toLowerCase();
  if (allNews.length) renderNews(allNews);
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('scBtn').style.display = 'none';
  currentQ = '';
  if (allNews.length) renderNews(allNews);
}

function hl(txt, q) {
  if (!q || !txt) return txt || '';
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return txt.replace(
    new RegExp(`(${escaped})`, 'gi'),
    '<mark style="background:rgba(192,57,43,0.18);color:inherit;padding:0 2px;">$1</mark>'
  );
}

// Glossary tooltips
function glos(text) {
  if (!text) return '';
  let result = text;
  for (const [term, def] of Object.entries(GLOSSARY)) {
    const regex = new RegExp(`\\b(${term})\\b`, 'gi');
    result = result.replace(
      regex,
      `<span class="gt">$1<span class="tip">${def}</span></span>`
    );
  }
  return result;
}

// Tag helpers
const TAG_CLASS = {
  ai: 'ai',
  market: 'market',
  career: 'career',
  tech: 'tech',
  hiring: 'hiring',
  industry: 'industry'
};

const TAG_LABEL = {
  ai: 'AI & Tech',
  market: 'Market',
  career: 'Career',
  tech: 'Technology',
  hiring: 'Hiring',
  industry: 'Industry'
};

const tc = t => TAG_CLASS[t] || 'industry';
const tl = t => TAG_LABEL[t] || t;

// Bookmark management
const isBM = id => bookmarks.some(b => b.id === id);

function toggleBM(id, e) {
  if (e) e.stopPropagation();
  
  const story = allNews.find(n => n.id === id);
  if (!story) return;
  
  if (isBM(id)) {
    bookmarks = bookmarks.filter(b => b.id !== id);
  } else {
    bookmarks.push(story);
  }
  
  saveBookmarks();
  updateBookmarkBadge();
  
  // Re-render current view
  if (['feed', 'hiring', 'ai', 'market', 'career'].includes(currentTab)) {
    renderNews(allNews);
  } else if (currentTab === 'bookmarks') {
    renderBookmarks();
  }
}

// Detail block for expanded cards
function detailBlock(n, q) {
  if (!n.detail) return '';
  return `<div class="card-detail">
    ${glos(hl(n.detail, q))}
    ${n.placement_tip ? `<div class="placement-note">
      <strong>📌 Placement Strategy</strong>
      ${hl(n.placement_tip, q)}
    </div>` : ''}
  </div>`;
}

// Render news feed
function renderNews(news) {
  let filtered = currentCat === 'all' ? news : news.filter(n => n.tag === currentCat);
  
  const bar = document.getElementById('srBar');
  if (currentQ) {
    filtered = filtered.filter(n => {
      const searchText = [
        n.title,
        n.summary,
        n.detail || '',
        n.source || '',
        (n.companies || []).join(' ')
      ].join(' ').toLowerCase();
      return searchText.includes(currentQ);
    });
    
    bar.style.display = 'block';
    bar.innerHTML = filtered.length 
      ? `Showing <span>${filtered.length}</span> result${filtered.length !== 1 ? 's' : ''} for "<span>${document.getElementById('searchInput').value.trim()}</span>"`
      : `No results for "<span>${document.getElementById('searchInput').value.trim()}</span>"`;
  } else {
    bar.style.display = 'none';
  }
  
  if (!filtered.length) {
    document.getElementById('feedView').innerHTML = `
      <div class="empty-state">
        <h2>${currentQ ? 'No matching stories' : 'No stories in this category'}</h2>
        <p>${currentQ ? 'Try a different search term.' : 'Try another tab or load the briefing.'}</p>
      </div>`;
    return;
  }
  
  const q = currentQ;
  const feat = filtered.find(n => n.featured) || filtered[0];
  const rest = filtered.filter(n => n !== feat);
  
  // Featured story
  const kp = (feat.key_points || []).map(p => `<li>${glos(hl(p, q))}</li>`).join('');
  const fb = isBM(feat.id);
  
  const fHTML = `<div class="featured-story" id="c${feat.id}" onclick="this.classList.toggle('expanded')">
    <div>
      <div class="featured-label">Top Story · ${feat.importance}</div>
      <div class="featured-headline">${hl(feat.title, q)}</div>
      <div class="featured-summary">${glos(hl(feat.summary, q))}</div>
      <div class="card-meta" style="margin-bottom:0">
        <span class="card-tag ${tc(feat.tag)}">${tl(feat.tag)}</span>
        <div style="display:flex;gap:.5rem;align-items:center;">
          <span>${feat.source || 'TechDesk'}</span>
          ${feat.placement_relevance ? '<span class="placement-pill">📌 Placement Intel</span>' : ''}
          <button class="icon-btn${fb ? ' on' : ''}" onclick="toggleBM(${feat.id},event)" title="Bookmark">🔖</button>
          <button class="icon-btn" onclick="event.stopPropagation();openShare(${feat.id})" title="Share">📤</button>
        </div>
      </div>
      ${detailBlock(feat, q)}
    </div>
    <div class="featured-right">
      <div class="key-points-title">Key Takeaways</div>
      <ul class="key-points">${kp}</ul>
    </div>
  </div>`;
  
  // Regular cards
  const gHTML = rest.map((n, i) => {
    const bm = isBM(n.id);
    return `<div class="news-card" style="animation-delay:${i * 0.06}s" onclick="this.classList.toggle('expanded')">
      <div class="card-top">
        <span class="card-tag ${tc(n.tag)}">${tl(n.tag)}</span>
        <div class="card-icons">
          <button class="icon-btn${bm ? ' on' : ''}" onclick="toggleBM(${n.id},event)" title="Bookmark">🔖</button>
          <button class="icon-btn" onclick="event.stopPropagation();openShare(${n.id})" title="Share">📤</button>
        </div>
      </div>
      <div class="card-headline">${hl(n.title, q)}</div>
      <div class="card-summary">${glos(hl(n.summary, q))}</div>
      ${detailBlock(n, q)}
      <div class="card-meta">
        <span>${n.source || 'TechDesk'}</span>
        ${n.placement_relevance ? '<span class="placement-pill">📌 Placement Intel</span>' : '<span></span>'}
      </div>
    </div>`;
  }).join('');
  
  document.getElementById('feedView').innerHTML = 
    fHTML + (rest.length ? `<div class="news-grid">${gHTML}</div>` : '');
}

// Company tracker
function renderCompanies() {
  if (!allNews.length) {
    document.getElementById('coView').innerHTML = `
      <div style="font-family:var(--sans);font-size:.85rem;color:var(--text-muted);text-align:center;padding:3rem;">
        Load the briefing first to see company-wise intelligence.
      </div>`;
    return;
  }
  
  const map = {};
  allNews.forEach(n => {
    const mentioned = n.companies && n.companies.length 
      ? n.companies 
      : COMPANIES.filter(c => (n.title + ' ' + n.summary).includes(c));
    
    mentioned.forEach(c => {
      if (!map[c]) map[c] = [];
      map[c].push(n);
    });
  });
  
  const keys = Object.keys(map).sort();
  if (!keys.length) {
    document.getElementById('coView').innerHTML = `
      <div style="font-family:var(--sans);font-size:.85rem;color:var(--text-muted);text-align:center;padding:3rem;">
        No company mentions found. Refresh briefing.
      </div>`;
    return;
  }
  
  const cards = keys.map(co => {
    const stories = map[co];
    return `<div class="co-card">
      <div class="co-name">
        ${co}
        <span class="co-count">${stories.length} stor${stories.length === 1 ? 'y' : 'ies'}</span>
      </div>
      ${stories.map(s => `<div class="co-story" onclick="jumpTo(${s.id})">${s.title}</div>`).join('')}
    </div>`;
  }).join('');
  
  document.getElementById('coView').innerHTML = `<div class="company-grid">${cards}</div>`;
}

function jumpTo(id) {
  const feedBtn = document.querySelector('.nav-btn');
  setTab(feedBtn, 'feed');
  feedBtn.classList.add('active');
  
  setTimeout(() => {
    const el = document.getElementById(`c${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('expanded');
    }
  }, 150);
}

// Bookmarks view
function renderBookmarks() {
  if (!bookmarks.length) {
    document.getElementById('bmView').innerHTML = `
      <div class="bm-empty">
        No saved stories yet. Hit 🔖 on any card to bookmark it for later reading.
      </div>`;
    return;
  }
  
  const cards = bookmarks.map((n, i) => `
    <div class="news-card" style="animation-delay:${i * 0.06}s;border-right:1px solid var(--border)!important;" onclick="this.classList.toggle('expanded')">
      <div class="card-top">
        <span class="card-tag ${tc(n.tag)}">${tl(n.tag)}</span>
        <div class="card-icons">
          <button class="icon-btn on" onclick="toggleBM(${n.id},event)" title="Remove bookmark">🔖</button>
          <button class="icon-btn" onclick="event.stopPropagation();openShare(${n.id})" title="Share">📤</button>
        </div>
      </div>
      <div class="card-headline">${n.title}</div>
      <div class="card-summary">${glos(n.summary)}</div>
      ${detailBlock(n, '')}
      <div class="card-meta">
        <span>${n.source || 'TechDesk'}</span>
        ${n.placement_relevance ? '<span class="placement-pill">📌 Placement Intel</span>' : '<span></span>'}
      </div>
    </div>`).join('');
  
  document.getElementById('bmView').innerHTML = 
    `<div class="news-grid" style="grid-template-columns:repeat(auto-fill,minmax(290px,1fr))">${cards}</div>`;
}

// Share modal
const SITE_URL = 'https://techdesk.app';
let _shareStory = null;

function openShare(id) {
  _shareStory = allNews.find(n => n.id === id) || bookmarks.find(n => n.id === id);
  if (!_shareStory) return;
  
  const s = _shareStory;
  document.getElementById('scPreview').innerHTML = `
    <div class="share-card" id="scEl">
      <div class="sc-brand">TechDesk</div>
      <div class="sc-tag">${tl(s.tag)} · ${s.importance}</div>
      <div class="sc-title">${s.title}</div>
      <div class="sc-summary">${s.summary}</div>
      <div class="sc-cta">
        <span>${new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}</span>
        <span class="sc-cta-link">techdesk.app</span>
      </div>
    </div>`;
  
  document.getElementById('igNote').classList.remove('visible');
  document.getElementById('copyToast').classList.remove('visible');
  document.getElementById('shareModal').classList.add('open');
}

function closeModal() {
  document.getElementById('shareModal').classList.remove('open');
  _shareStory = null;
}

function _shareText() {
  if (!_shareStory) return '';
  return `${_shareStory.title}\n\n${_shareStory.summary}\n\nRead more on TechDesk 👉 ${SITE_URL}`;
}

function shareWA() {
  const text = encodeURIComponent(_shareText());
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareTwitter() {
  const text = encodeURIComponent(`${_shareStory.title}\n\n${SITE_URL} — IT Industry Intel for Placements 🚀`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function shareLinkedIn() {
  const url = encodeURIComponent(SITE_URL);
  const title = encodeURIComponent(_shareStory.title);
  const summary = encodeURIComponent(_shareStory.summary);
  window.open(
    `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
    '_blank'
  );
}

function shareIG() {
  document.getElementById('igNote').classList.add('visible');
  downloadCard();
}

function copyLink() {
  const text = `${_shareStory.title} — ${SITE_URL}`;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopyToast();
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showCopyToast();
}

function showCopyToast() {
  const toast = document.getElementById('copyToast');
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2500);
}

function downloadCard() {
  const el = document.getElementById('scEl');
  if (!el) return;
  
  html2canvas(el, {
    scale: 2.5,
    backgroundColor: null,
    useCORS: true
  }).then(canvas => {
    const a = document.createElement('a');
    a.download = `techdesk-${Date.now()}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  });
}

// Initialize on load
loadBookmarks();