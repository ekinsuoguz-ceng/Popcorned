"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from '@/app/services/tmdb';

// Next.js dinamik rotalarda URL'deki parametreleri 'params' içinden alır
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MovieDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-400">
          Film detayları yükleniyor...
        </div>
      </main>
    );
  }

  if (isError || !movie) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-400">
          Film detayları yüklenemedi. Lütfen tekrar deneyin.
        </div>
      </main>
    );
  }

  // Arka plan kapak görseli ve poster görseli için URL'ler
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Arka Planda Büyük Bulanık Film Görseli */}
      <div className="absolute inset-0 h-[60vh] w-full overflow-hidden opacity-30 pointer-events-none">
        <img src={backdropUrl} alt="" className="w-full h-full object-cover blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* İçerik Alanı */}
      <div className="relative z-10 max-w-5xl mx-auto pt-32 px-6 flex flex-col md:flex-row gap-12">
        {/* Sol Taraf: Film Posteri */}
        <div className="w-full md:w-80 flex-shrink-0 mx-auto md:mx-0 bg-black rounded-2xl p-2 shadow-2xl border border-gray-800">
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className="rounded-xl w-full object-contain h-[450px] bg-black"
          />
        </div>

        {/* Sağ Taraf: Film Bilgileri */}
        <div className="flex-col flex justify-center">
          <h1 className="text-4xl md:text-5xl font-black mb-2">{movie.title}</h1>
          <p className="text-gray-400 italic mb-6 text-lg">{movie.tagline}</p>
          
          {/* Hap Bilgiler */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <span className="bg-amber-500 text-black px-3 py-1 rounded-full font-bold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-gray-300">
              ⏱️ {movie.runtime} dakika
            </span>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-gray-300">
              📅 {movie.release_date}
            </span>
          </div>

          {/* Film Özeti */}
          <h2 className="text-xl font-bold mb-2 text-amber-400">Özet</h2>
          <p className="text-gray-300 leading-relaxed text-lg max-w-2xl">
            {movie.overview || "Bu film için henüz Türkçe özet eklenmemiş."}
          </p>
        </div>
      </div>
    </main>
  );
}