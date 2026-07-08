// ============================================================
// Todo en una sola página. No hay ningún archivo "pelicula.html":
// cambiar de vista (catálogo <-> ficha de película) se resuelve
// acá adentro con JavaScript, así que un clic en una tarjeta
// nunca puede "redirigir a ningún lado" ni romperse.
// ============================================================

function extractDriveId(url){
  if(!url) return null;
  const patterns = [/\/file\/d\/([a-zA-Z0-9_-]+)/, /[?&]id=([a-zA-Z0-9_-]+)/, /\/d\/([a-zA-Z0-9_-]+)/];
  for(const p of patterns){ const m = url.match(p); if(m) return m[1]; }
  return null;
}
function toDriveEmbed(url){
  const id = extractDriveId(url);
  return id ? `https://drive.google.com/file/d/${id}/preview` : url;
}

// El botón "Reproducir" SIEMPRE usa el link de Google Drive de esa película.
function mostrarModal(titulo, tag){
  document.getElementById('playerTitle').textContent = titulo || '';
  document.getElementById('playerTag').textContent = tag || 'REPRODUCIENDO';
  document.getElementById('playerBackdrop').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function cerrarModal(){
  document.getElementById('playerBackdrop').classList.remove('show');
  document.getElementById('playerMount').innerHTML = '';
  document.getElementById('playerLoading').style.display = 'none';
  document.getElementById('playerFallback').classList.remove('show');
  document.body.style.overflow = '';
  if(ytPlayerActual){ try{ ytPlayerActual.destroy(); }catch(e){} ytPlayerActual = null; }
}

function openPlayer(videoUrl, titulo){
  if(!videoUrl){ alert('Esta película todavía no tiene link de Google Drive cargado en el campo "video" de catalogo.js'); return; }
  mostrarModal(titulo, 'REPRODUCIENDO');
  const driveId = extractDriveId(videoUrl);
  const mount = document.getElementById('playerMount');
  const fallback = document.getElementById('playerFallback');
  const fallbackLink = document.getElementById('playerFallbackLink');

  if(driveId){
    // Google Drive sí permite incrustarse en un <iframe> (usando /preview).
    document.getElementById('playerLoading').style.display = 'flex';
    mount.innerHTML = `<iframe src="https://drive.google.com/file/d/${driveId}/preview" allow="autoplay; fullscreen" allowfullscreen onload="document.getElementById('playerLoading').style.display='none'"></iframe>`;
    return;
  }

  // Los sitios de streaming (lookmovie, archive.org, etc.) casi siempre
  // bloquean que los metan en un <iframe> de otra web (header
  // X-Frame-Options / Content-Security-Policy: frame-ancestors), así que
  // meterlos ahí adentro se queda en blanco o directo no carga.
  // En vez de mostrar una pantalla rota, abrimos el link en una pestaña
  // nueva y avisamos.
  document.getElementById('playerLoading').style.display = 'none';
  fallbackLink.href = videoUrl;
  fallbackLink.textContent = 'Abrirlo en la web ↗';
  fallback.querySelector('p').textContent = 'Este sitio no permite reproducirse dentro de otra web (bloquea la incrustación). Lo abrimos en una pestaña aparte.';
  fallback.classList.add('show');
  window.open(videoUrl, '_blank', 'noopener');
}

// ---- Tráiler: usa la API oficial de YouTube para poder DETECTAR cuando
// el dueño del video bloqueó la reproducción incrustada, y en ese caso
// mostrar nuestro propio aviso en vez de dejar que YouTube nos empuje
// fuera de la web (eso es lo que pasaba antes con el <iframe> pelado).
let ytApiListo = false, ytApiCargando = false;
let ytPlayerActual = null;
function cargarYouTubeAPI(){
  return new Promise(resolve => {
    if(ytApiListo){ resolve(); return; }
    if(!ytApiCargando){
      ytApiCargando = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => { ytApiListo = true; resolve(); };
    // por si el script ya estaba cargado de una carga previa
    if(window.YT && window.YT.Player){ ytApiListo = true; resolve(); }
  });
}

function openTrailerModal(trailerId, titulo){
  if(!trailerId){ alert('Todavía no hay tráiler para esta película (necesita la clave de TMDb, o un trailerId puesto a mano en catalogo.js).'); return; }
  mostrarModal(titulo, 'TRÁILER');
  const loading = document.getElementById('playerLoading');
  const fallback = document.getElementById('playerFallback');
  const mount = document.getElementById('playerMount');
  const fallbackLink = document.getElementById('playerFallbackLink');
  fallback.classList.remove('show');
  fallback.querySelector('p').textContent = 'Este tráiler no se puede reproducir acá adentro (el dueño del video desactivó la reproducción incrustada en otras webs).';
  loading.style.display = 'flex';
  mount.innerHTML = '<div id="ytMount" style="position:absolute;inset:0;"></div>';
  fallbackLink.href = `https://www.youtube.com/watch?v=${trailerId}`;
  fallbackLink.textContent = 'Abrirlo en YouTube ↗';

  cargarYouTubeAPI().then(() => {
    ytPlayerActual = new YT.Player('ytMount', {
      width: '100%', height: '100%', videoId: trailerId,
      playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
      events: {
        onReady: () => { loading.style.display = 'none'; },
        onError: () => {
          // Códigos 101 / 150 = el dueño del video no permite reproducción incrustada.
          loading.style.display = 'none';
          mount.innerHTML = '';
          fallback.classList.add('show');
        }
      }
    });
  });
}

document.getElementById('closePlayer').onclick = cerrarModal;
document.getElementById('playerBackdrop').addEventListener('click', e => {
  if(e.target.id === 'playerBackdrop') cerrarModal();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && document.getElementById('playerBackdrop').classList.contains('show')) cerrarModal();
});

const irisSVG = `<svg viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#D9A441" stroke-width="2" opacity="0.35"/>
  <circle cx="50" cy="50" r="34" stroke="#D9A441" stroke-width="2" opacity="0.55"/>
  <path d="M50 8 L58 30 L50 50 L42 30 Z" fill="#D9A441"/>
  <path d="M92 50 L70 58 L50 50 L70 42 Z" fill="#D9A441"/>
  <path d="M50 92 L42 70 L50 50 L58 70 Z" fill="#D9A441"/>
  <path d="M8 50 L30 42 L50 50 L30 58 Z" fill="#D9A441"/>
  <circle cx="50" cy="50" r="7" fill="#0E0B08" stroke="#D9A441" stroke-width="2"/>
</svg>`;

let CATALOGO_LISTO = [];

function groupByCategory(list){
  const map = {};
  list.forEach(m => { const c = m.categoria || 'General'; (map[c] = map[c] || []).push(m); });
  return map;
}

function habilitarArrastre(el){
  let down=false, startX=0, startScroll=0;
  el.addEventListener('mousedown', e => { down=true; el.classList.add('dragging'); startX=e.pageX; startScroll=el.scrollLeft; });
  window.addEventListener('mouseup', () => { down=false; el.classList.remove('dragging'); });
  window.addEventListener('mousemove', e => { if(!down) return; el.scrollLeft = startScroll - (e.pageX - startX); });
}

// ---------- Vista: INICIO ----------
function renderHome(){
  document.title = 'Kernel — Tu cine privado';
  const cards = CATALOGO_LISTO.map(m => `
    <div class="pasarela-card" data-slug="${m.slug}" tabindex="0" role="button" aria-label="Abrir ${m.titulo}">
      <img src="${m.poster}" alt="${m.titulo}" loading="lazy" onerror="this.style.opacity=0.15">
      <div class="pasarela-label">
        <h3>${m.titulo}</h3>
        <div class="meta mono">${m.anio || ''}</div>
      </div>
    </div>
  `).join('');

  document.getElementById('app').innerHTML = `
    <header class="site">
      <button class="brand link-reset" id="brandHome">${irisSVG}<span>KERNEL</span></button>
      <nav class="site-nav mono">
        <button class="link-reset" id="navInicio">Inicio</button>
        <span class="dot"></span>
        <button class="link-reset" id="navCatalogo">Catálogo</button>
      </nav>
    </header>
    <section class="home-hero">
      <div class="eyebrow mono">Cine privado</div>
      <h1>${CATALOGO_LISTO.length} películas.<br>Un solo lugar para verlas.</h1>
    </section>
    <div class="pasarela-wrap" id="pasarela">
      ${CATALOGO_LISTO.length === 0
        ? `<div class="empty-row">Todavía no hay películas. Editá <strong>catalogo.js</strong> para agregar títulos.</div>`
        : `<div class="pasarela" id="pasarelaTrack">${cards}</div>
           <div class="pasarela-hint mono">arrastrá para recorrer el catálogo</div>`
      }
    </div>
    <footer class="site">
      <span class="mono">KERNEL — catálogo personal</span>
      <span class="mono">${CATALOGO_LISTO.length} títulos</span>
    </footer>
  `;

  document.getElementById('brandHome').addEventListener('click', renderHome);
  document.getElementById('navInicio').addEventListener('click', renderHome);
  document.getElementById('navCatalogo').addEventListener('click', () => {
    document.getElementById('pasarela')?.scrollIntoView({ behavior:'smooth', block:'start' });
  });

  document.querySelectorAll('.pasarela-card').forEach(card => {
    const abrir = () => { renderDetail(card.dataset.slug); window.scrollTo(0,0); };
    card.addEventListener('click', abrir);
    card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); abrir(); } });
  });

  const track = document.getElementById('pasarelaTrack');
  if(track) habilitarArrastre(track);
}

// ---------- Vista: FICHA DE PELÍCULA ----------
function renderDetail(slug){
  const m = CATALOGO_LISTO.find(x => x.slug === slug);
  if(!m){ renderHome(); return; }
  document.documentElement.style.setProperty('--accent-movie', m.colorAmbiente || '#D9A441');
  document.title = `${m.titulo} — Kernel`;

  const generos = (m.generos || []).map(g => `<span class="genre-pill">${g}</span>`).join('');
  const clips = (m.galeria || []).map((src, i) => `
    <button class="clip-item" data-trailer="${m.trailerId || ''}">
      <img src="${src}" alt="Escena de ${m.titulo}">
      <span class="play-mini">▶</span>
      <span class="clip-title">Escena</span>
      <span class="clip-num">${String(i+1).padStart(2,'0')}</span>
    </button>
  `).join('');
  const tieneTrailer = !!m.trailerId;

  document.getElementById('app').innerHTML = `
    <nav class="movie-topnav">
      <button class="hamburger" id="backBtn">←</button>
      <div class="movie-topnav-links mono">
        <button class="scroll-link" data-target="detalle-${m.slug}">Sinopsis</button>
        <button class="scroll-link" data-target="clips-${m.slug}">Escenas</button>
      </div>
      <button class="brand-mini" id="brandMini">KERNEL</button>
    </nav>

    <section class="movie-hero" id="movieHero" style="background-image:url('${m.backdrop || m.poster}')">
      <div class="movie-hero-grain"></div>
      ${tieneTrailer ? `<div class="movie-hero-trailer" id="heroTrailer"></div><div class="movie-hero-hint mono">pasá el mouse para ver el tráiler</div>` : ''}
      <div class="movie-hero-grid">
        <div class="movie-hero-main" id="detalle-${m.slug}">
          <h1 class="movie-title poster-font">${m.titulo}</h1>
          <div class="movie-subline mono">
            <span>${m.anio || ''}</span>
            <span class="dot"></span>
            <span>${m.clasificacion || '—'}</span>
            <span class="dot"></span>
            <span>${m.duracion || ''}</span>
            <span class="dot"></span>
            <span>Idioma: ${m.idioma || '—'}</span>
          </div>
          <p class="movie-desc">${m.sinopsis || ''}</p>
          <div class="genre-pills">${generos}</div>
          ${m.galeria && m.galeria.length ? `<button class="learn-more scroll-link" data-target="clips-${m.slug}">Ver escenas <span class="arrow">↗</span></button>` : ''}
          <div class="movie-actor-line">
            <span class="index-num">01</span>
            <div>
              <div class="label">Reparto</div>
              <div class="value">${m.reparto || '—'}</div>
            </div>
          </div>
        </div>
        <aside class="movie-sidebar">
          <div class="side-item"><div class="label">Estreno</div><div class="value">${m.anio || '—'}</div></div>
          <div class="side-item"><div class="label">Dirección</div><div class="value">${m.director || '—'}</div></div>
          <div class="side-item"><div class="label">Rating</div><div class="value">${m.rating != null ? m.rating + ' / 10' : '—'}</div></div>
          ${tieneTrailer ? `
            <button class="trailer-widget" id="trailerWidget">
              <img src="${m.backdrop || m.poster}" alt="Tráiler de ${m.titulo}">
              <span class="play-circle">▶</span>
              <span class="widget-label mono">Ver tráiler</span>
            </button>
          ` : ''}
        </aside>
      </div>
    </section>

    <div class="movie-actions">
      <button class="play-btn" id="playBtn">▶ Reproducir</button>
      ${tieneTrailer ? `<button class="btn-outline" id="trailerBtn">Ver tráiler</button>` : ''}
    </div>

    ${clips ? `
      <section class="clips-section" id="clips-${m.slug}">
        <div class="clips-head"><h2>Escenas</h2></div>
        <div class="clips-list">${clips}</div>
      </section>
    ` : ''}

    ${m.cita ? `<div class="movie-quote">"${m.cita}"</div>` : ''}
  `;

  document.getElementById('backBtn').addEventListener('click', () => { renderHome(); window.scrollTo(0,0); });
  document.getElementById('brandMini').addEventListener('click', () => { renderHome(); window.scrollTo(0,0); });
  document.getElementById('playBtn').addEventListener('click', () => openPlayer(m.video, m.titulo));
  document.querySelectorAll('.scroll-link').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById(a.dataset.target)?.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  if(tieneTrailer){
    document.getElementById('trailerBtn')?.addEventListener('click', () => openTrailerModal(m.trailerId, m.titulo));
    document.getElementById('trailerWidget')?.addEventListener('click', () => openTrailerModal(m.trailerId, m.titulo));
    document.querySelectorAll('.clip-item').forEach(btn => {
      btn.addEventListener('click', () => openTrailerModal(btn.dataset.trailer, m.titulo));
    });


    const hero = document.getElementById('movieHero');
    const trailerBox = document.getElementById('heroTrailer');
    let cargado = false, timer = null;
    hero.addEventListener('mouseenter', () => {
      timer = setTimeout(() => {
        if(!cargado){
          trailerBox.innerHTML = `<iframe src="https://www.youtube.com/embed/${m.trailerId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${m.trailerId}&modestbranding=1&rel=0" allow="autoplay; encrypted-media"></iframe>`;
          cargado = true;
        }
        trailerBox.classList.add('show');
      }, 450);
    });
    hero.addEventListener('mouseleave', () => { clearTimeout(timer); trailerBox.classList.remove('show'); });
  }
}

// ---------- Arranque ----------
// Todo dentro de esta misma página: no hay router por hash ni
// ningún link real que un navegador (o un preview/sandbox) pueda
// interpretar como "ir a otro lado". Cambiar de vista es 100%
// JavaScript llamando a renderHome() / renderDetail().
(async () => {
  const catalogo = await kernelPrepararCatalogo(CATALOGO);
  await kernelAplicarColores(catalogo);
  CATALOGO_LISTO = catalogo;
  renderHome();

  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 1300);
})();