"use client";

import React, { useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation"; // 'next/router' DEĞİL, kesinlikle 'next/navigation' olmalı!


export default function SearchInput() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const runSearch = (term: string) => {
        // Eğer arama terimi boşsa, ana sayfaya yönlendiriyoruz
        if (term.trim()) {
            router.push(`/movies?q=${encodeURIComponent(term.trim())}`);
        } else {
            router.replace("/movies");
        }
    };

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            runSearch(searchTerm);
        }, 400); 
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [searchTerm]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            runSearch(searchTerm);
        }
    }

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto">
            <input
                type="text"
                placeholder="Film ismi yazın..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900/90 border border-gray-800 text-white rounded-xl px-5 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-500"
            />
            <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
            >
                🔍
            </button>
        </form>
    );
}