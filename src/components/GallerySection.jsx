import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, ZoomIn, X, Tag, Sparkles } from 'lucide-react';

export default function GallerySection() {
  const [photos, setPhotos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const categories = [
    { key: 'All', label: 'सर्व फोटो (All Photos)' },
    { key: 'Old Math & Maharaj', label: 'जुना मठ व महाराज फोटो (Old Heritage)' },
    { key: 'Construction Phase', label: 'काम चालू असतानाचे फोटो (Construction)' },
    { key: 'New Temple View', label: 'नवीन भव्य मंदिर (New Temple)' },
    { key: 'Cultural Events', label: 'उत्सव व कीर्तन फोटो (Events)' },
  ];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider bg-amber-950/50 px-3 py-1 rounded-full border border-amber-500/30">
            <ImageIcon className="w-4 h-4" />
            <span>चित्रपट व जुन्या आठवणी - Photo Gallery</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            जुन्या मठापासून ते नवीन मठाच्या विकासाची छायाचित्रे
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            श्री मथुरा गिरी महाराजांच्या जुन्या स्मृती, मठाचे जुने रूप, गावकऱ्यांच्या कष्टाने झालेले बांधकाम आणि आजचे भव्य स्वरूप.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'saffron-gradient-btn text-white font-bold border border-amber-300/40 shadow-lg shadow-amber-600/30'
                  : 'bg-slate-900/90 text-amber-200/80 hover:bg-slate-800 border border-amber-500/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        {loading ? (
          <div className="text-center py-12 text-amber-300/70 animate-pulse">
            छायाचित्रे लोड होत आहेत... (Loading Gallery Photos...)
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group glass-panel rounded-2xl overflow-hidden border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Box */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-amber-300 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center space-x-1 backdrop-blur-md">
                    <Tag className="w-3 h-3 text-amber-400" />
                    <span>{photo.category}</span>
                  </span>

                  {/* Zoom Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-xs">
                    <div className="p-3 rounded-full bg-amber-500 text-slate-950 shadow-lg">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Caption Box */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="font-heading font-bold text-amber-200 text-base leading-snug group-hover:text-amber-400 transition-colors">
                    {photo.title}
                  </h3>
                  {photo.caption && (
                    <p className="text-slate-300 text-xs line-clamp-2">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full glass-panel-gold rounded-3xl border border-amber-400/50 overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center space-x-2 text-amber-300 text-sm font-bold font-heading">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{selectedPhoto.title}</span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-xl bg-slate-900 text-amber-400 border border-amber-500/30 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="flex-1 overflow-hidden rounded-2xl bg-black flex items-center justify-center max-h-[60vh]">
              <img
                src={selectedPhoto.image_url}
                alt={selectedPhoto.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Modal Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-300/80">
                <span className="bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/30 font-medium">
                  प्रवर्ग: {selectedPhoto.category}
                </span>
              </div>
              {selectedPhoto.caption && (
                <p className="text-slate-200 text-sm leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-amber-500/20">
                  {selectedPhoto.caption}
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
