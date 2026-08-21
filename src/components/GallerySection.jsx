import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, ZoomIn, X, Tag, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function GallerySection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

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
    { key: 'All', label: t('catAll') },
    { key: 'Old Math & Maharaj', label: t('catOld') },
    { key: 'Construction Phase', label: t('catConstruction') },
    { key: 'New Temple View', label: t('catNew') },
    { key: 'Cultural Events', label: t('catEvents') },
  ];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className={`py-20 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300 ${
      isDark ? '' : 'bg-amber-50/30'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full border ${
            isDark ? 'text-amber-400 bg-amber-950/50 border-amber-500/30' : 'text-amber-900 bg-amber-100 border-amber-300'
          }`}>
            <ImageIcon className="w-4 h-4 text-amber-500" />
            <span>{t('galleryBadge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            {t('galleryTitle')}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {t('gallerySub')}
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
                  : isDark ? 'bg-slate-900/90 text-amber-200/80 hover:bg-slate-800 border border-amber-500/20' : 'bg-white text-slate-800 hover:bg-amber-100 border border-amber-300 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        {loading ? (
          <div className={`text-center py-12 animate-pulse ${isDark ? 'text-amber-300/70' : 'text-amber-800'}`}>
            {t('loadingGallery')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col ${
                  isDark ? 'glass-panel border-amber-500/30 hover:border-amber-400/60' : 'bg-white border-amber-300/80 shadow-md hover:border-amber-400'
                }`}
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
                  <h3 className={`font-heading font-bold text-base leading-snug transition-colors ${
                    isDark ? 'text-amber-200 group-hover:text-amber-400' : 'text-amber-900 group-hover:text-amber-600'
                  }`}>
                    {photo.title}
                  </h3>
                  {photo.caption && (
                    <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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
          <div className={`relative max-w-4xl w-full rounded-3xl border overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 max-h-[90vh] flex flex-col ${
            isDark ? 'glass-panel-gold border-amber-400/50' : 'bg-white border-amber-300 text-slate-900'
          }`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center space-x-2 text-amber-500 text-sm font-bold font-heading">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{selectedPhoto.title}</span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className={`p-2 rounded-xl border transition-colors ${
                  isDark ? 'bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-rose-950 hover:text-rose-300' : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                }`}
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
              <div className="flex items-center justify-between text-xs text-amber-500">
                <span className={`px-3 py-1 rounded-lg border font-medium ${
                  isDark ? 'bg-amber-950/60 border-amber-500/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
                }`}>
                  {t('categoryLabel')}: {selectedPhoto.category}
                </span>
              </div>
              {selectedPhoto.caption && (
                <p className={`text-sm leading-relaxed p-3.5 rounded-xl border ${
                  isDark ? 'bg-slate-900/80 border-amber-500/20 text-slate-200' : 'bg-amber-50 border-amber-200 text-slate-800'
                }`}>
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
