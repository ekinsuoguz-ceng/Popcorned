"use client";

import { confetti } from "@tsparticles/confetti";


export default function PopcornClicker() {
  const handlePopcornClick = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Tek bir satırla PNG görselini fırlatıyoruz!
    await confetti({
      particleCount: 30,
      spread: 90,
      startVelocity: 30,
      origin: { x, y },
      scalar: 10, // Görünen boyutu bu kontrol ediyor (piksel boyutu ≈ 5 * scalar). Büyütmek için bu sayıyı artır.
      // Burası çok temiz: Doğrudan tipi "image" yapıp URL veriyoruz
      shapes: ["image"],
      shapeOptions: {
        image: {
          src: "/popcorn.png", // Public klasöründeki PNG yolun
          width: 64, // Sadece en-boy oranı ve önyükleme için; ekrandaki boyutu etkilemez
          height: 64,
        },
      },
    });
  };

  return (
    <span
      onClick={handlePopcornClick}
      className="inline-block text-8xl mb-2 animate-bounce cursor-pointer select-none active:scale-95 transition-transform duration-100"
    >
      🍿
    </span>
  );
}