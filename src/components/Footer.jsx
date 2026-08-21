import React from 'react';
import { Landmark, Heart, MapPin, Phone, Mail, ShieldCheck, Navigation, ExternalLink, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const mapUrl = "https://www.google.com/maps/place/Shri+Mthur+Giri+Maharaj+Sansthan+Gotegaon/@18.6325101,76.0856975,196m/data=!3m1!1e3!4m6!3m5!1s0x3bc56bb44c57f33b:0x7826f6f2dccf346a!8m2!3d18.6325012!4d76.0863546!16s%2Fg%2F11sw13f96x?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D";
  const mapEmbedUrl = "https://maps.google.com/maps?q=18.6325012,76.0863546&t=m&z=17&output=embed&iwloc=near";

  return (
    <footer className={`border-t transition-colors duration-300 pt-14 pb-8 px-4 sm:px-6 lg:px-8 relative ${
      isDark ? 'bg-slate-950 border-amber-500/20 text-slate-300' : 'bg-amber-100/60 border-amber-300 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-md">
                <div className={`w-full h-full rounded-full flex items-center justify-center ${
                  isDark ? 'bg-slate-950' : 'bg-amber-50'
                }`}>
                  <Landmark className="w-5 h-5 text-amber-500" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl gold-gradient-text">
                {t('brandTitle')}
              </h3>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('footerMission')}
            </p>

            <div className="flex items-center space-x-2 text-xs text-amber-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{t('footerTrustBadge')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className={`font-heading font-bold text-sm ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
              {t('quickLinksHeader')}
            </h4>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><a href="#history" className="hover:text-amber-500 transition-colors">{t('navHistory')}</a></li>
              <li><a href="#gallery" className="hover:text-amber-500 transition-colors">{t('navGallery')}</a></li>
              <li><a href="#events" className="hover:text-amber-500 transition-colors">{t('navEvents')}</a></li>
              <li><a href="#transparency" className="hover:text-amber-500 transition-colors">{t('navTransparency')}</a></li>
              <li><a href="#donate" className="hover:text-amber-500 transition-colors">{t('navDonate')}</a></li>
              <li><a href="#user-manual" className="hover:text-amber-500 transition-colors text-amber-400 font-bold">{t('navManual')}</a></li>
              <li><a href="#disclaimer" className="hover:text-amber-500 transition-colors">{t('disclaimerBadge')}</a></li>
              <li>
                <a href="#map-feedback" className="hover:text-amber-500 transition-colors text-amber-500 font-semibold flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t('navMapFeedback')}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`font-heading font-bold text-sm ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
              {t('contactHeader')}
            </h4>
            <ul className={`space-y-2.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li>
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-2 hover:text-amber-500 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span>{t('addressFull')}</span>
                    <span className="mt-1 inline-flex items-center space-x-1 text-[11px] text-amber-500 font-bold underline">
                      <span>{t('openMapsLink')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              </li>
              <li className="flex items-center space-x-2 pt-1">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+91 9000000000 ({t('presidentName')})</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>info@mathurgiri.org</span>
              </li>
            </ul>
          </div>

          {/* Embedded Interactive Google Map */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className={`font-heading font-bold text-sm flex items-center space-x-1.5 ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                <Navigation className="w-4 h-4 text-amber-500" />
                <span>{t('googleMapHeader')}</span>
              </h4>
            </div>

            <div className={`relative rounded-2xl overflow-hidden border-2 shadow-xl group ${
              isDark ? 'border-amber-500/40 bg-slate-900' : 'border-amber-300 bg-white'
            }`}>
              <iframe
                title="Shri Mathur Giri Maharaj Sansthan Gotegaon Location"
                src={mapEmbedUrl}
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-36 contrast-[110%] group-hover:scale-105 transition-all duration-300"
              />
              <div className={`p-2 border-t flex items-center justify-between text-[11px] ${
                isDark ? 'bg-slate-900/90 border-amber-500/30' : 'bg-amber-50 border-amber-300'
              }`}>
                <span className="font-medium truncate pr-1">📍 {t('mapLocationTag')}</span>
                <a
                  href="#map-feedback"
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center space-x-1 shrink-0 transition-all shadow-md text-[10px]"
                >
                  <Navigation className="w-3 h-3" />
                  <span>{t('navMapFeedback')}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4 ${
          isDark ? 'border-amber-500/10 text-slate-400' : 'border-amber-300/60 text-slate-600'
        }`}>
          <div>
            © 2026 Mathur Giri Maharaj Math Sansthan Gotegaon. {t('devotionalBlessing')}
          </div>
          <div className="flex items-center space-x-1">
            <span>{t('craftedByVillagers')}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}
