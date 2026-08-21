import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, Phone, Sparkles, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function DisclaimerSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <section id="disclaimer" className={`py-16 px-4 sm:px-6 lg:px-8 relative border-t transition-colors duration-300 ${
      isDark ? 'bg-slate-950/90 border-amber-500/10' : 'bg-slate-50 border-amber-300/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full border ${
            isDark ? 'text-amber-400 bg-amber-950/50 border-amber-500/30' : 'text-amber-900 bg-amber-100 border-amber-300'
          }`}>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>{t('disclaimerBadge')}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            {t('disclaimerTitle')}
          </h2>

          <p className={`text-sm sm:text-base max-w-3xl mx-auto font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {t('disclaimerSub')}
          </p>
        </div>

        {/* 4 Core Disclaimer Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Point 1: Under Testing */}
          <div className={`p-6 rounded-3xl border space-y-3 transition-all ${
            isDark ? 'glass-panel border-amber-500/30 hover:border-amber-400/50' : 'bg-white border-amber-300/80 shadow-md hover:border-amber-400'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className={`font-heading text-lg font-bold ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>
                {t('disclaimerPoint1Title')}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {t('disclaimerPoint1Desc')}
            </p>
          </div>

          {/* Point 2: Info Verification */}
          <div className={`p-6 rounded-3xl border space-y-3 transition-all ${
            isDark ? 'glass-panel border-amber-500/30 hover:border-amber-400/50' : 'bg-white border-amber-300/80 shadow-md hover:border-amber-400'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-500 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className={`font-heading text-lg font-bold ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>
                {t('disclaimerPoint2Title')}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {t('disclaimerPoint2Desc')}
            </p>
          </div>

          {/* Point 3: Non-Commercial Community */}
          <div className={`p-6 rounded-3xl border space-y-3 transition-all ${
            isDark ? 'glass-panel border-amber-500/30 hover:border-amber-400/50' : 'bg-white border-amber-300/80 shadow-md hover:border-amber-400'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className={`font-heading text-lg font-bold ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>
                {t('disclaimerPoint3Title')}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {t('disclaimerPoint3Desc')}
            </p>
          </div>

          {/* Point 4: Media Usage & Privacy */}
          <div className={`p-6 rounded-3xl border space-y-3 transition-all ${
            isDark ? 'glass-panel border-amber-500/30 hover:border-amber-400/50' : 'bg-white border-amber-300/80 shadow-md hover:border-amber-400'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className={`font-heading text-lg font-bold ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>
                {t('disclaimerPoint4Title')}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {t('disclaimerPoint4Desc')}
            </p>
          </div>

        </div>

        {/* Action Alert Banner */}
        <div className={`p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ${
          isDark ? 'bg-amber-950/60 border-amber-400/40 text-amber-100' : 'bg-amber-100/90 border-amber-300 text-amber-950'
        }`}>
          <div className="flex items-center space-x-3 text-xs sm:text-sm font-medium">
            <Phone className="w-6 h-6 text-amber-500 shrink-0 animate-bounce" />
            <span>{t('disclaimerAlertText')}</span>
          </div>

          <a
            href="tel:+919000000000"
            className="saffron-gradient-btn text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl flex items-center space-x-2 shrink-0 shadow-lg"
          >
            <Phone className="w-4 h-4" />
            <span>{t('disclaimerReportBtn')}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
