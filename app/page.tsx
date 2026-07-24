import Link from 'next/link';
import PopcornClicker from './components/PopcornClicker';

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Arka planda patlamış mısır sarısı şık bir parlama efekti */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* İçerik Kutusu */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <PopcornClicker />
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
          <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent uppercase">
            Popcorned
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-8 font-medium max-w-md mx-auto">
          Mısırını kap ve sinema dünyasının en popüler yapımlarına göz atmaya hemen başla!
        </p>

        {/* Filmler sayfasına yönlendiren buton */}
        <Link 
          href="/movies" 
          className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-lg rounded-full shadow-lg shadow-yellow-500/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Filmleri Keşfet
        </Link>
      </div>

      {/* Alt bilgi */}
      <footer className="absolute bottom-6 text-xs text-gray-600 tracking-widest font-mono uppercase">
        © 2026 Popcorned App • Powered by TMDB
      </footer>
    </main>
  );
}