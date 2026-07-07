const CATALOGO = [
  {
    titulo: "Scarface", anio: "1983",
    cita: "Say hello to my little friend.",
    imdbId: "tt0086250",
    categoria: "Clásicos",
    video: "https://drive.google.com/file/d/16KZCMxxSco19C5IYVnKas7OEv_VoBu0t/view?usp=sharing",
    posterFallback: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Forrest Gump", anio: "1994",
    cita: "Life is like a box of chocolates, you never know what you're gonna get.",
    imdbId: "tt0109830",
    categoria: "Drama",
    video: "https://www.lookmovie2.to/movies/play/1689756706-forrest-gump-1994",
    posterFallback: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "The Truman Show", anio: "1998",
    cita: "Good morning, and in case I don't see ya: good afternoon, good evening, and good night.",
    imdbId: "tt0120382",
    categoria: "Drama",
    video: "https://www.lookmovie2.to/movies/play/1689756708-the-truman-show-1998",
    posterFallback: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Eyes Wide Shut", anio: "1999",
    cita: "Fidelio.",
    imdbId: "tt0120730",
    categoria: "Drama",
    video: "https://dn600309.us.archive.org/0/items/eyes-wide-shut-tom-cruise-nicole-kidman-sydney-pollack-director-stalnley-kubrick/EYES%20WIDE%20SHUT%20-%20Tom%20Cruise%20Nicole%20Kidman%20Sydney%20Pollack%20-%20Director%20Stalnley%20Kubrick%20%28his%20last%20film%20direction%29%20-%20Based%20on%20the%20novella%20Traumnovelle%20%28Dream%20Story%29%20by%20Arthur%20Schnitzler.m4v",
    posterFallback: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "The Secret Life of Walter Mitty", anio: "2013",
    cita: "Beautiful things don't ask for attention.",
    imdbId: "tt0359950",
    categoria: "Aventura",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "La vida es bella", anio: "1997",
    imdbId: "tt0118799",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Soul", anio: "2020",
    cita: "I'm not a big fan of this idea that everyone has a purpose.",
    imdbId: "tt2948372",
    categoria: "Animación",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Whiplash", anio: "2014",
    imdbId: "tt2582802",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "En busca de la felicidad", anio: "2006",
    cita: "Don't ever let somebody tell you you can't do something.",
    imdbId: "tt0454921",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "The Social Network", anio: "2010",
    cita: "You don't get to 500 million friends without making a few enemies.",
    imdbId: "tt1285016",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Jojo Rabbit", anio: "2019",
    cita: "Heil myself.",
    imdbId: "tt2584384",
    categoria: "Comedia",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Good Will Hunting", anio: "1997",
    imdbId: "tt0119217",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Interstellar", anio: "2014",
    imdbId: "tt0816692",
    categoria: "Ciencia ficción",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Don Jon", anio: "2013",
    imdbId: "tt2229499",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "The Shack", anio: "2017",
    imdbId: "tt2872518",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "La lista de Schindler", anio: "1993",
    cita: "Whoever saves one life, saves the world entire.",
    imdbId: "tt0108052",
    categoria: "Bélica",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=500&auto=format&fit=crop&sat=-100",
    backdropFallback: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600&auto=format&fit=crop&sat=-100"
  },
  {
    titulo: "Ven y mira", anio: "1985",
    imdbId: "tt0091251",
    categoria: "Bélica",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=500&auto=format&fit=crop&sat=-60",
    backdropFallback: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop&sat=-60"
  },
  {
    titulo: "Cinderella Man", anio: "2005",
    imdbId: "tt0352248",
    categoria: "Deporte",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Rocky", anio: "1976",
    imdbId: "tt0075148",
    categoria: "Deporte",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "La Pasión de Cristo", anio: "2004",
    imdbId: "tt0335345",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Una vida oculta", anio: "2019",
    imdbId: "tt5827916",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Goodfellas", anio: "1990",
    imdbId: "tt0099685",
    categoria: "Crimen",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500&auto=format&fit=crop&sat=-100",
    backdropFallback: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop&sat=-100"
  },
  {
    titulo: "Inglourious Basterds", anio: "2009",
    imdbId: "tt0361748",
    categoria: "Bélica",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Dead Poets Society", anio: "1989",
    imdbId: "tt0097165",
    categoria: "Drama",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=500&auto=format&fit=crop",
    backdropFallback: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1600&auto=format&fit=crop"
  },
  {
    titulo: "Sin novedad en el frente", anio: "2022",
    imdbId: "tt1016150",
    categoria: "Bélica",
    video: "",
    posterFallback: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=500&auto=format&fit=crop&sat=-40",
    backdropFallback: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop&sat=-40"
  }
];
