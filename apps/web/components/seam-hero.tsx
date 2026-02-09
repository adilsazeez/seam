'use client';

import React from 'react';
import Link from 'next/link';
import { Shirt, Sparkles, ArrowRight } from 'lucide-react';

const SeamHero = () => {
    return (
        <div className="relative min-h-screen bg-[#FDFCFB] flex items-center overflow-hidden font-sans">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F3F0EC] -skew-x-6 transform translate-x-20 hidden lg:block" />

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Side: Strategic Copy */}
                <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-black rounded-lg">
                            <Shirt className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold tracking-widest uppercase text-xs text-black">Seam AI</span>
                    </div>

                    <h1 className="text-6xl font-serif text-slate-900 leading-tight mb-6 font-display">
                        Your wardrobe, <br />
                        <span className="italic text-slate-500">perfectly</span> threaded.
                    </h1>

                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        Seam is an intelligent digital closet that digitizes your clothes and uses
                        computational style theory to suggest the perfect outfit for any occasion.
                        No more "nothing to wear"—just data-driven style.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link href="/wardrobe">
                            <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition-all flex items-center gap-2">
                                Login to Wardrobe <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                        <button className="text-slate-900 font-medium px-6 py-4 border border-slate-200 rounded-full hover:bg-white transition-all">
                            Explore Demo
                        </button>
                    </div>

                    <div className="mt-12 flex gap-8 items-center text-slate-400">
                        <div className="flex items-center gap-2 text-sm">
                            <Sparkles className="w-4 h-4" /> Powered by pgvector
                        </div>
                        <div className="w-px h-4 bg-slate-200" />
                        <span className="text-sm">Computer Vision Matching</span>
                    </div>
                </div>

                {/* Right Side: Visual Teaser (The "Wardrobe Grid") */}
                <div className="relative hidden lg:block">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-12">
                            <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden shadow-xl animate-pulse" />
                            <div className="h-48 bg-slate-300 rounded-2xl overflow-hidden shadow-lg animate-pulse" />
                        </div>
                        <div className="space-y-4">
                            <div className="h-48 bg-slate-300 rounded-2xl overflow-hidden shadow-lg animate-pulse" />
                            <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden shadow-xl animate-pulse" />
                        </div>
                    </div>
                    {/* Floating AI Tag Badge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                            <span className="text-sm font-semibold text-slate-900">AI Match Found: 98%</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SeamHero;
