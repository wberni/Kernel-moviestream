# Kernel — cine privado

## Estructura

```
kernel/
├── index.html          # página principal (sin CSS/JS embebido)
├── css/
│   └── style.css        # todos los estilos
└── js/
    ├── catalogo.js       # tu catálogo de películas (CATALOGO)
    ├── config.js         # tu clave de TMDb (TMDB_API_KEY)
    ├── tmdb.js           # integración con la API de TMDb
    ├── colores.js        # color de ambientación automático por afiche
    └── app.js            # UI: render de inicio, ficha y reproductor
```

## Cómo agregar una película

Editá `js/catalogo.js` y agregá un bloque nuevo al array `CATALOGO`:

```js
{
  titulo: "Nombre", anio: "2000",
  imdbId: "tt0000000",
  categoria: "Categoría",
  video: "", // tu link de Google Drive
  posterFallback: "url-imagen-poster",
  backdropFallback: "url-imagen-fondo"
}
```

Con `imdbId` puesto y la clave de TMDb cargada en `js/config.js`, todo lo demás
(sinopsis, reparto, director, género, rating, póster, backdrop, galería,
tráiler y frase) se completa solo. Si escribís algo a mano (por ejemplo
`cita`), eso siempre tiene prioridad y nunca se pisa.

## Cómo cargar tu clave de TMDb

Abrí `js/config.js` y pegá tu clave en `TMDB_API_KEY` (la conseguís gratis en
https://www.themoviedb.org/settings/api).

## Cómo usarlo

Simplemente abrí `index.html` en el navegador (doble clic alcanza). No
necesita servidor ni instalación.
