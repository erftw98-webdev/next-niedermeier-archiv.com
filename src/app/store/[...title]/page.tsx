"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import artData from '../../../assets/datenbank-onepage-gallery.json';

export default function StorePage({ params }: { params: Promise<{ title: string[] }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.title ? resolvedParams.title[0] : "";
  
  // Wir suchen die Arbeit in der JSON
  const work = artData.find((item: any) => item.id === id);

  // State für das aktuell ausgewählte Bild (Standard: das erste Bild)
  const [selectedImage, setSelectedImage] = useState(0);

  if (!work) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-light">Arbeit mit ID {id} nicht gefunden.</p>
        <Link href="/" className="mt-4 text-blue-500 underline">Zurück zum Archiv</Link>
      </div>
    );
  }

  // Pfad-Generator
  const getImagePath = (imgName: string) => `/images/archiv/${work.folder}/${imgName}`;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans">
      {/* Navigation / Header */}
      <nav className="p-6 border-b bg-white flex justify-between items-center">
        <Link href="/" className="text-xs uppercase tracking-[0.3em] font-medium hover:opacity-50 transition-all">
          Niedermeier Archiv
        </Link>
        <div className="text-[10px] uppercase tracking-widest text-gray-400">
          Single View / Store
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LINK SEITE: BILDER (SingleView Bereich) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Hauptbild Ansicht */}
            <div className="bg-white p-4 shadow-sm border border-gray-100 flex items-center justify-center min-h-[60vh]">
              <img 
                src={getImagePath(work.images[selectedImage])} 
                alt={work.id}
                className="max-w-full max-h-[80vh] object-contain shadow-2xl"
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/1200x800?text=Bild+wird+geladen..."; }}
              />
            </div>

            {/* Thumbnail Leiste (Wenn mehr als ein Bild da ist) */}
            {work.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto py-4">
                {work.images.map((img: string, index: number) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-24 h-24 flex-shrink-0 border-2 transition-all ${selectedImage === index ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={getImagePath(img)} className="w-full h-full object-cover" alt="Thumb" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RECHTE SEITE: DATEN & KAUF (StoreView Bereich) */}
          <div className="lg:col-span-4">
            <div className="sticky top-12">
              <header className="mb-10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-2">Inventar-Nr.</span>
                <h1 className="text-4xl font-light tracking-tight">{work.id}</h1>
              </header>

              <section className="space-y-6 mb-12">
                <div className="flex justify-between border-b pb-3 text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className="font-medium text-green-700 underline underline-offset-4">Verfügbar</span>
                </div>
                <div className="flex justify-between border-b pb-3 text-sm">
                  <span className="text-gray-400">Medium</span>
                  <span className="font-medium">Originalarbeit</span>
                </div>
                <div className="flex justify-between border-b pb-3 text-sm">
                  <span className="text-gray-400">Zertifikat</span>
                  <span className="font-medium">Handsigniert</span>
                </div>
              </section>

              {/* STORE BOX */}
              <div className="bg-white border p-8 shadow-sm">
                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Preis</span>
                  <span className="text-3xl font-light">3.500,00 €</span>
                </div>
                
                <p className="text-[11px] text-gray-400 mb-8 leading-relaxed">
                  Inkl. MwSt., zzgl. versicherter Kunstversand. <br />
                  Lieferzeit ca. 7-14 Werktage.
                </p>

                <button className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-colors shadow-lg active:scale-[0.98]">
                  In den Warenkorb
                </button>
                
                <button className="w-full mt-3 border border-gray-200 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-gray-50 transition-colors">
                  Anfrage stellen
                </button>
              </div>

              {/* Archiv Details */}
              <div className="mt-12">
                <h3 className="text-xs uppercase tracking-widest mb-4 font-semibold">Archiv-Info</h3>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  Diese Arbeit ist Teil des physischen Niedermeier-Archivs. 
                  Referenz-Ordner: <span className="text-black not-italic font-mono">{work.folder}</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}