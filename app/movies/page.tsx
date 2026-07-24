import { getPopularMovies, searchMovies } from '@/app/services/tmdb'; // searchMovies fonksiyonunu ekledik
import MovieCard from '@/app/components/MovieCard';
import SearchInput from '@/app/components/SearchInput'; // Yeni arama bileşenimizi import ettik
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

// Next.js 15+ standartlarına uygun, hem 'gorunum' hem de 'q' parametresini yakalayan güvenli tip
interface PageProps {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: PageProps) {
  // 1. URL'den gelen tüm parametreleri (gorunum ve q) sunucuda çözüyoruz
  const resolvedSearchParams = await searchParams;
  
  // Görünüm seçimi (varsayılan 5)
  const view = resolvedSearchParams.gorunum || "5"; 
  const viewStr = Array.isArray(view) ? view[0] : view;

  // Arama sorgusu (varsayılan boş string)
  const rawQuery = resolvedSearchParams.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery || "";

  // 2. VERİ ÇEKME MANTIĞI: Arama varsa arama sonuçlarını, yoksa popüler filmleri getiriyoruz
  let movies: Movie[] = [];
  if (query) {
    movies = await searchMovies(query);
  } else {
    movies = await getPopularMovies();
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 p-8">
      
      {/* Üst Başlık, Arama Çubuğu ve Filtre Alanı */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto border-b border-gray-900 pb-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {query ? `"${query}" Sonuçları` : "Popüler Filmler"}
          </h1>
          <p className="text-gray-400 mt-2">
            {query ? `${movies.length} film listeleniyor` : "En çok tercih edilen filmlere göz atın"}
          </p>
        </div>

        {/* ORTAYA EKLEDİĞİMİZ ARAMA ÇUBUĞU */}
        <div className="w-full md:w-auto flex-1 max-w-md">
          <SearchInput />
        </div>

        {/* SAĞ KÖŞEDEKİ FİLTRE BUTONLARI (Arama parametresini koruyan akıllı Link yapısı) */}
        <div className="flex items-center gap-3 bg-gray-900/80 border border-gray-800 p-1.5 rounded-xl shrink-0">
          <h1 className="text-sm text-gray-400 pl-2">Görünüm:</h1>
          
          {/* Linklerin sonuna mevcut aramayı (q) ekliyoruz ki görünüm değişince arama kaybolmasın */}
          <Link
            href={`?gorunum=3${query ? `&q=${encodeURIComponent(query)}` : ""}`}
            scroll={false}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
              viewStr === "3"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            -
          </Link>
          
          <Link
            href={`?gorunum=5${query ? `&q=${encodeURIComponent(query)}` : ""}`}
            scroll={false}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
              viewStr === "5"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            +
          </Link>
        </div>
      </header>

      {/* Film Listeleme Durumu */}
      {movies.length === 0 ? (
        <div className="max-w-2xl mx-auto rounded-xl border border-gray-800 bg-gray-900 p-12 text-center text-gray-400">
          {query ? (
            <div>
              <p>Aradığınız kriterlere uygun film bulunamadı.</p>
              <Link href="/movies" className="block mt-4 text-amber-500 hover:underline font-medium text-sm">
                Popüler filmlere geri dön
              </Link>
            </div>
          ) : (
            "Film verileri yüklenemedi. TMDB API anahtarını ayarlayın veya daha sonra tekrar deneyin."
          )}
        </div>
      ) : (
        
        /* DİNAMİK SUNUCU TARAFLI GRID ALANI */
        <div 
          className={`grid gap-6 max-w-7xl mx-auto transition-all duration-500 ${
            viewStr === "3" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          }`}
        >
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}