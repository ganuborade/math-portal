import React from 'react';
import { Heart, ShieldCheck, Users, Landmark, Award, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function HistorySection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <section id="history" className={`py-20 px-4 sm:px-6 lg:px-8 relative border-t transition-colors duration-300 ${
      isDark ? 'bg-slate-950/60 border-amber-500/10' : 'bg-amber-50/50 border-amber-300/40 text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${
            isDark 
              ? 'text-amber-400 bg-amber-950/50 border-amber-500/30' 
              : 'text-amber-900 bg-amber-100 border-amber-300'
          }`}>
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>{t('historyBadge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            {t('historyTitle')}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {t('historySub')}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Old Math & Maharaj Legacy */}
          <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-6 transition-all ${
            isDark 
              ? 'glass-panel border-amber-500/30 hover:border-amber-400/50' 
              : 'bg-white/95 border-amber-300/80 shadow-lg text-slate-800'
          }`}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-400/40 text-amber-500">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className={`font-heading text-2xl font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                {t('historyCard1Title')}
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {t('historyCard1Desc')}
              </p>
            </div>
            
            <div className={`p-4 rounded-2xl border text-xs font-medium italic ${
              isDark ? 'bg-amber-950/40 border-amber-500/20 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              {t('historyCard1Quote')}
            </div>
          </div>

          {/* Card 2: Village Unity & Building New Temple */}
          <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-6 ${
            isDark 
              ? 'glass-panel-gold border-amber-400/40' 
              : 'bg-gradient-to-br from-amber-100 to-amber-50 border-amber-400/80 shadow-lg text-slate-900'
          }`}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/30 flex items-center justify-center border border-amber-400/50 text-amber-600">
                <Users className="w-6 h-6" />
              </div>
              <h3 className={`font-heading text-2xl font-bold ${isDark ? 'text-white' : 'text-amber-950'}`}>
                {t('historyCard2Title')}
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-amber-100/90' : 'text-slate-800'}`}>
                {t('historyCard2Desc')}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border text-xs flex items-center space-x-2 font-medium ${
              isDark ? 'bg-slate-950/70 border-amber-400/30 text-amber-200' : 'bg-white border-amber-300 text-amber-950 shadow-sm'
            }`}>
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <span>{t('historyCard2Badge')}</span>
            </div>
          </div>

        </div>

        {/* 3 Pillars of Sansthan */}
        <div className="grid sm:grid-cols-3 gap-6 pt-4">
          <div className={`p-5 rounded-2xl border text-center space-y-2 ${
            isDark ? 'glass-panel border-amber-500/20' : 'bg-white/90 border-amber-300 shadow-sm'
          }`}>
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className={`font-heading font-bold text-base ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>{t('pillar1Title')}</h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('pillar1Desc')}</p>
          </div>

          <div className={`p-5 rounded-2xl border text-center space-y-2 ${
            isDark ? 'glass-panel border-amber-500/20' : 'bg-white/90 border-amber-300 shadow-sm'
          }`}>
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
              <Users className="w-5 h-5" />
            </div>
            <h4 className={`font-heading font-bold text-base ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>{t('pillar2Title')}</h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('pillar2Desc')}</p>
          </div>

          <div className={`p-5 rounded-2xl border text-center space-y-2 ${
            isDark ? 'glass-panel border-amber-500/20' : 'bg-white/90 border-amber-300 shadow-sm'
          }`}>
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
              <Award className="w-5 h-5" />
            </div>
            <h4 className={`font-heading font-bold text-base ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>{t('pillar3Title')}</h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('pillar3Desc')}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
