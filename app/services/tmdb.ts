const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

// Popüler filmleri çeken fonksiyon
export const getPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=1`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error('Filmler yüklenirken bir hata oluştu.');
  }

  const data = await res.json();
  return data.results;
};

// Belirli bir film ID'sine göre detayları çeken yeni fonksiyon
export const getMovieDetails = async (id: string) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=tr-TR`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error('Film detayları yüklenirken bir hata oluştu.');
  }

  return await res.json();
};

// Arama fonksiyonu
export const searchMovies = async (query: string) => {
  if (!query.trim()) return [];

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query.trim())}&language=tr-TR&page=1`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    // Hatanın ne olduğunu anlamak için sessizce logluyoruz ama uygulamayı çökertmiyoruz
    console.error(`TMDB Arama Hatası Kodu: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return data.results || [];
};
