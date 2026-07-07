// ============================================================
// KERNEL — integración con TMDb (The Movie Database)
// ============================================================
// No hace falta tocar este archivo. Funciona automáticamente:
// - Si TMDB_API_KEY (en config.js) está vacía, se usan los
//   campos de respaldo (posterFallback / backdropFallback) y
//   no hay tráiler ni datos automáticos.
// - Si hay clave, busca cada "imdbId" en TMDb (en español,
//   gracias a TMDB_LANGUAGE) y completa: título, año, duración,
//   director, reparto, sinopsis, género, cita, rating, póster,
//   backdrop, galería y el ID del tráiler oficial de YouTube.
// - Cualquier dato que hayas escrito a mano en catalogo.js
//   (por ejemplo tu propio "trailerId" o "colorAmbiente") tiene
//   siempre prioridad y nunca se pisa.
// ============================================================

function kernelSlug(texto){
  return texto
    .toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

async function kernelBuscarEnTMDb(imdbId){
  const findUrl = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id&language=${TMDB_LANGUAGE}`;
  const findRes = await fetch(findUrl);
  if(!findRes.ok) throw new Error('TMDb (find) respondió ' + findRes.status);
  const findData = await findRes.json();
  const hit = (findData.movie_results || [])[0];
  if(!hit) throw new Error('No se encontró ' + imdbId + ' en TMDb');

  const detUrl = `https://api.themoviedb.org/3/movie/${hit.id}?api_key=${TMDB_API_KEY}&language=${TMDB_LANGUAGE}&append_to_response=credits,images,videos&include_image_language=${TMDB_LANGUAGE.slice(0,2)},en,null`;
  const detRes = await fetch(detUrl);
  if(!detRes.ok) throw new Error('TMDb (detalle) respondió ' + detRes.status);
  const det = await detRes.json();

  // Si el resumen en español viene vacío (pasa en algunos títulos), pedimos el de respaldo en inglés.
  if(!det.overview){
    try{
      const detEnUrl = `https://api.themoviedb.org/3/movie/${hit.id}?api_key=${TMDB_API_KEY}&language=en-US`;
      const detEnRes = await fetch(detEnUrl);
      const detEn = await detEnRes.json();
      det.overview = detEn.overview;
      if(!det.tagline) det.tagline = detEn.tagline;
    }catch(e){ /* si falla, seguimos sin sinopsis */ }
  }
  return det;
}

function kernelMejorTrailer(videos){
  const lista = (videos?.results || []).filter(v => v.site === 'YouTube' && v.type === 'Trailer');
  if(lista.length === 0) return null;
  const oficial = lista.find(v => v.official);
  return (oficial || lista[0]).key;
}

// Combina los datos manuales de una película con lo que devuelve TMDb,
// dando prioridad SIEMPRE a lo que el usuario ya escribió a mano.
async function kernelEnriquecerPelicula(m){
  if(!m.imdbId || !TMDB_API_KEY){
    return {
      ...m,
      titulo: m.titulo || m.imdbId,
      poster: m.poster || m.posterFallback,
      backdrop: m.backdrop || m.backdropFallback,
      fuente: 'respaldo'
    };
  }
  try{
    const det = await kernelBuscarEnTMDb(m.imdbId);

    const director = (det.credits?.crew || []).find(c => c.job === 'Director');
    const reparto = (det.credits?.cast || []).slice(0, 3).map(c => c.name).join(', ');
    const generos = (det.genres || []).map(g => g.name);
    const runtimeMin = det.runtime;
    const duracion = runtimeMin ? `${Math.floor(runtimeMin / 60)}h ${runtimeMin % 60}m` : null;
    const anio = det.release_date ? det.release_date.slice(0, 4) : null;
    const galeriaAuto = (det.images?.backdrops || [])
      .slice(0, 6)
      .map(b => `https://image.tmdb.org/t/p/w780${b.file_path}`);
    const trailerAuto = kernelMejorTrailer(det.videos);

    return {
      ...m,
      titulo: m.titulo || det.title,
      anio: m.anio || anio,
      duracion: m.duracion || duracion,
      idioma: m.idioma || 'Español',
      director: m.director || (director ? director.name : m.director),
      reparto: m.reparto || (reparto || m.reparto),
      sinopsis: m.sinopsis || det.overview,
      generos: (m.generos && m.generos.length) ? m.generos : generos,
      cita: m.cita || det.tagline || m.cita,
      rating: (m.rating !== undefined && m.rating !== null) ? m.rating : Math.round(det.vote_average),
      poster: m.poster || (det.poster_path ? `https://image.tmdb.org/t/p/w500${det.poster_path}` : m.posterFallback),
      backdrop: m.backdrop || (det.backdrop_path ? `https://image.tmdb.org/t/p/original${det.backdrop_path}` : m.backdropFallback),
      galeria: (m.galeria && m.galeria.length) ? m.galeria : galeriaAuto,
      trailerId: m.trailerId || trailerAuto,
      fuente: 'tmdb'
    };
  } catch(err){
    console.warn('KERNEL: no se pudo autocompletar con TMDb ->', m.imdbId, err.message);
    return {
      ...m,
      titulo: m.titulo || m.imdbId,
      poster: m.poster || m.posterFallback,
      backdrop: m.backdrop || m.backdropFallback,
      fuente: 'respaldo'
    };
  }
}

// Recorre todo el catálogo, enriquece cada película y arma el slug final.
async function kernelPrepararCatalogo(catalogoOriginal){
  const enriquecido = await Promise.all(catalogoOriginal.map(kernelEnriquecerPelicula));
  enriquecido.forEach(m => { m.slug = kernelSlug(m.titulo || m.imdbId || 'sin-titulo'); });
  return enriquecido;
}

