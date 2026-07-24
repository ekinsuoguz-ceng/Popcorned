import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Sol Üst Köşe: Logo ve İsim */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Logo Alanı (İster emoji koy, ister <img> ile kendi logonu çağır) */}
          <span className="text-3xl transition-transform duration-300 group-hover:rotate-12">
            🍿
          </span>
          
          {/* Web Site İsmi */}
          <span className="font-black text-xl tracking-wider text-white group-hover:text-amber-400 transition-colors duration-200">
            <span className="text-amber-500">POPCORNED</span>
          </span>
        </Link>

        {/* Sağ Taraf: İleride buraya başka linkler veya arama çubuğu koyabilirsin */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
          <Link href="/movies" className="hover:text-white transition-colors">FİLMLER</Link>
        </div>

      </div>
    </nav>
  );
}