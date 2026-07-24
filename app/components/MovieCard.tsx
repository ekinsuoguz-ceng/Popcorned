import Link from 'next/link';
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null; // Görsel bazen boş (null) gelebilir, TS hatasını önlemek için ekledik
  release_date?: string;       // Opsiyonel yaptık
  vote_average?: number;       // Opsiyonel yaptık
}

export default function MovieCard({ movie }: { movie: Movie }) {
  // Eğer TMDB'den afiş görseli gelmezse kırılmayı önlemek için yedek (fallback) görsel atıyoruz
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500&auto=format&fit=crop'; // Şık bir sinema arka planı
  // Yıl bilgisini güvenli bir şekilde çekiyoruz
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Bilinmiyor';
  
 
  const ratingOutOfFive = (movie.vote_average || 0) / 2; 
  const totalStars = 5;
  
  return (
    <Link 
      href={`/movies/${movie.id}`} 
      className="block h-full group" // Hover efektlerini tetiklemek için 'group' ekledik
    >
      <div className="border border-gray-800 rounded-xl overflow-hidden shadow-lg bg-black text-white hover:scale-105 transition-transform duration-200 flex flex-col h-full">
        {/* Görsel Alanı: TMDB posterleri 2:3 oranında, genişlik grid'den sabit geldiği için yükseklik otomatik ve tüm kartlarda eşit olur */}
        <div className="relative aspect-[2/3] w-full bg-black overflow-hidden">
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-black"
            loading="lazy"
          />
        </div>
        
        {/* İçerik Alanı */}
        <div className="p-4 flex flex-col flex-grow justify-between bg-gradient-to-b from-gray-950 to-black">
          <div>
            <h2 className="font-bold text-lg line-clamp-1 group-hover:text-amber-400 transition-colors duration-200">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              📅 {releaseYear}
            </p>
          </div>
          
          <div className="flex items-center gap-0.5 text-lg select-none">
            {[...Array(totalStars)].map((_, index) => {
                // Her yıldızın başlangıç puan eşiği (örn: 1. yıldız için 0, 2. için 1...)
                const starValue = index; 
                
                // Eğer kalan puan bu yıldızdan büyük veya eşitse tam doludur
                const isFullStar = ratingOutOfFive >= starValue + 0.75;
                
                // Eğer puan bu yıldızın ortasındaysa yarım yıldızdır (Örn: 3.3 için 3. yıldız yarım olur)
                const isHalfStar = ratingOutOfFive >= starValue + 0.25 && ratingOutOfFive < starValue + 0.75;

                if (isFullStar) {
                  return <span key={index} className="text-amber-400">★</span>;
                } else if (isHalfStar) {
                  // Yarım yıldız efekti için CSS gradyanı (Sol taraf sarı, sağ taraf gri)
                  return (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-amber-400 from-50% to-gray-600 to-50% bg-clip-text text-transparent"
                    >
                      ★
                    </span>
                  );
                } else {
                  return <span key={index} className="text-gray-600">★</span>;
                }
              })}
          </div>
        </div>
      </div>
    </Link>
  );
}