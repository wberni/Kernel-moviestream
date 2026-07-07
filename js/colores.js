// ============================================================
// KERNEL — color de ambientación automático
// ============================================================
// Analiza el afiche de cada película y calcula un color
// dominante y "vivo" (no gris, no casi-negro, no casi-blanco)
// para usar como acento visual de esa ficha.
//
// Si el afiche no permite leer sus píxeles (CORS) o falla por
// cualquier motivo, se usa un color de respaldo prolijo.
// ============================================================

const KERNEL_COLOR_RESPALDO = '#D9A441';

function kernelColorDominante(imgUrl){
  return new Promise((resolve) => {
    if(!imgUrl){ resolve(KERNEL_COLOR_RESPALDO); return; }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const timeout = setTimeout(() => resolve(KERNEL_COLOR_RESPALDO), 4000);

    img.onload = () => {
      try{
        const size = 48;
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        let mejor = null, mejorScore = -1;
        const buckets = {};

        for(let i = 0; i < data.length; i += 4){
          const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
          if(a < 200) continue;
          const max = Math.max(r,g,b), min = Math.min(r,g,b);
          const lum = (max + min) / 2;
          const sat = max === min ? 0 : (max - min) / (255 - Math.abs(2*lum - 255));
          if(lum < 25 || lum > 235) continue; // descarta casi-negro / casi-blanco

          const key = `${Math.round(r/16)}-${Math.round(g/16)}-${Math.round(b/16)}`;
          if(!buckets[key]) buckets[key] = { r:0, g:0, b:0, n:0, sat };
          buckets[key].r += r; buckets[key].g += g; buckets[key].b += b; buckets[key].n += 1;
        }

        Object.values(buckets).forEach(bucket => {
          const score = bucket.n * (0.4 + bucket.sat);
          if(score > mejorScore){ mejorScore = score; mejor = bucket; }
        });

        clearTimeout(timeout);
        if(!mejor){ resolve(KERNEL_COLOR_RESPALDO); return; }
        const r = Math.round(mejor.r / mejor.n);
        const g = Math.round(mejor.g / mejor.n);
        const b = Math.round(mejor.b / mejor.n);
        resolve(kernelRGBaHex(r, g, b));
      } catch(err){
        clearTimeout(timeout);
        resolve(KERNEL_COLOR_RESPALDO); // típicamente un bloqueo de CORS
      }
    };
    img.onerror = () => { clearTimeout(timeout); resolve(KERNEL_COLOR_RESPALDO); };
    img.src = imgUrl;
  });
}

function kernelRGBaHex(r, g, b){
  const h = n => n.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

// Le agrega colorAmbiente a cada película del catálogo (si no tiene uno puesto a mano).
async function kernelAplicarColores(catalogo){
  await Promise.all(catalogo.map(async m => {
    if(m.colorAmbiente) return; // el manual manda
    m.colorAmbiente = await kernelColorDominante(m.poster);
  }));
  return catalogo;
}
