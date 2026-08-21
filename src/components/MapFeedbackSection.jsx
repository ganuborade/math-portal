import React from 'react';
import { MapPin, MessageSquare, ExternalLink, UploadCloud, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

// User's Google Form link
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdLPQDmZlunvG1TAb8fPePKSg65SxLzghKN0UjwSsjSKRHgiA/viewform?embedded=true";
const GOOGLE_FORM_DIRECT_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdLPQDmZlunvG1TAb8fPePKSg65SxLzghKN0UjwSsjSKRHgiA/viewform?usp=header";

export default function MapFeedbackSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <section id="map-feedback" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-3 ${
          isDark 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
            : 'bg-amber-100 border-amber-300 text-amber-900'
        }`}>
          <MapPin className="w-4 h-4 text-amber-500" />
          <span>{t('navMapFeedback')}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-heading gold-gradient-text tracking-tight mb-3">
          {t('mapFeedbackTitle')}
        </h2>
        <p className={`text-sm sm:text-base font-medium ${isDark ? 'text-amber-100/80' : 'text-slate-700'}`}>
          {t('mapFeedbackSubtitle')}
        </p>
      </div>

      {/* Grid Layout: Map (Left) & Feedback (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* 1. Google Map Embed & Location Details Card */}
        <div className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
          isDark 
            ? 'glass-panel border-amber-500/20 shadow-2xl shadow-amber-950/20 text-white' 
            : 'bg-white/95 border border-amber-300/80 shadow-xl text-slate-800'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-xl font-bold font-heading ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                {t('mapTitle')}
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('mapAddressTitle')}
              </p>
            </div>
          </div>

          {/* Map iframe */}
          <div className="w-full h-80 rounded-xl overflow-hidden border border-amber-500/30 shadow-inner relative bg-slate-900 mb-5">
            <iframe
              title="Gotegaon Math Location Map"
              src="https://maps.google.com/maps?q=Gotegaon,Beed,Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Location Info & Direct Directions Button */}
          <div className={`p-4 rounded-xl mb-4 border ${
            isDark ? 'bg-slate-900/80 border-amber-500/20 text-amber-100' : 'bg-amber-50 border-amber-200 text-slate-800'
          }`}>
            <div className="flex items-start space-x-3">
              <Navigation className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{t('mapAddressTitle')}</p>
                <p className="text-xs opacity-80">{t('mapAddressSub')}</p>
              </div>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Gotegaon+Beed+Maharashtra"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full saffron-gradient-btn text-white py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
          >
            <span>{t('getDirections')}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 2. Feedback & Photo Upload Card (Google Form ONLY) */}
        <div className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
          isDark 
            ? 'glass-panel border-amber-500/20 shadow-2xl shadow-amber-950/20 text-white' 
            : 'bg-white/95 border border-amber-300/80 shadow-xl text-slate-800'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-xl font-bold font-heading ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                {t('feedbackTitle')}
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('feedbackSub')}
              </p>
            </div>
          </div>

          {/* Google Form Embed & Direct Link Section */}
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              isDark ? 'bg-slate-900/80 border-amber-500/30 text-amber-100' : 'bg-amber-50 border-amber-300 text-slate-800'
            }`}>
              <p className={`font-semibold text-sm mb-1 ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>
                {t('googleFormNoticeTitle')}
              </p>
              <p>{t('googleFormNotice')}</p>
            </div>

            {/* Action Button to Open Google Form in New Tab */}
            <a
              href={GOOGLE_FORM_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full saffron-gradient-btn text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
            >
              <UploadCloud className="w-5 h-5" />
              <span>{t('openGoogleForm')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Embedded Frame Card */}
            <div className={`w-full h-96 rounded-xl overflow-hidden border relative shadow-inner ${
              isDark ? 'border-amber-500/30 bg-white' : 'border-amber-300 bg-white'
            }`}>
              <iframe
                title="Devotee Feedback Google Form"
                src={GOOGLE_FORM_URL}
                className="w-full h-full border-0"
              >
                {t('googleFormFallback')}
              </iframe>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
