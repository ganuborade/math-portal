import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Volume2, VolumeX, Shield, Flame, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioIntervalRef = useRef(null);

  // Play Sacred Temple Bell Chime + Meditative Om Drone + Speech Chant
  const playDevotionalSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();

        // Layer 1: 432Hz Temple Bell Ring (Ting-Ting)
        const oscBell = ctx.createOscillator();
        const gainBell = ctx.createGain();
        oscBell.type = 'sine';
        oscBell.frequency.setValueAtTime(432, ctx.currentTime);
        gainBell.gain.setValueAtTime(0.25, ctx.currentTime);
        gainBell.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
        oscBell.connect(gainBell);
        gainBell.connect(ctx.destination);
        oscBell.start();
        oscBell.stop(ctx.currentTime + 2.5);

        // Layer 2: Meditative 108Hz Sacred Om Tambura Drone Chord
        const omFreqs = [108, 216, 324]; // Sacred Om harmonics
        omFreqs.forEach((freq, idx) => {
          const oscOm = ctx.createOscillator();
          const gainOm = ctx.createGain();
          oscOm.type = 'triangle'; // Rich, warm vocal-like tone
          oscOm.frequency.setValueAtTime(freq, ctx.currentTime);
          
          gainOm.gain.setValueAtTime(0.001, ctx.currentTime);
          gainOm.gain.linearRampToValueAtTime(0.12 / (idx + 1), ctx.currentTime + 0.8);
          gainOm.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);
          
          oscOm.connect(gainOm);
          gainOm.connect(ctx.destination);
          oscOm.start(ctx.currentTime + 0.2);
          oscOm.stop(ctx.currentTime + 4.5);
        });
      }

      // Layer 3: Vocal Speech Chant
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utter = () => {
          const utterance = new SpeechSynthesisUtterance("राम कृष्ण हरी");
          utterance.rate = 0.8;
          utterance.pitch = 1.0;

          const voices = window.speechSynthesis.getVoices();
          const devVoice = voices.find(v => v.lang.includes('mr') || v.lang.includes('hi') || v.lang.includes('IN')) || voices[0];
          if (devVoice) utterance.voice = devVoice;

          window.speechSynthesis.speak(utterance);
        };

        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = utter;
        } else {
          utter();
        }
      }
    } catch (e) {
      console.log('Audio playback notice:', e);
    }
  };

  useEffect(() => {
    if (isPlayingAudio) {
      playDevotionalSound();
      audioIntervalRef.current = setInterval(() => {
        playDevotionalSound();
      }, 5500);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [isPlayingAudio]);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Devotional Ambient Light Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Traditional Border Patterns */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60" />

      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">

        {/* Sacred Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel-gold border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-medium tracking-wide animate-pulse-slow">
          <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>{t('heroBadge')}</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            <span className="block text-amber-400 text-lg sm:text-2xl font-cinzel tracking-wider uppercase mb-2">
              {t('heroSubHeading')}
            </span>
            <span className="gold-gradient-text">
              {t('heroTitle')}
            </span>
          </h1>

          <p className={`max-w-3xl mx-auto text-sm sm:text-base lg:text-lg font-light leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {t('heroDesc')}
          </p>
        </div>

        {/* Devotional Mantra Card & Chanting Player */}
        <div className={`max-w-md mx-auto p-4 rounded-2xl border flex items-center justify-between shadow-xl ${
          isDark ? 'glass-panel border-amber-500/30' : 'bg-white/90 border-amber-300 text-slate-900'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/40">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-left">
              <div className={`text-xs font-medium ${isDark ? 'text-amber-300/80' : 'text-amber-800'}`}>
                {t('heroMantraTitle')}
              </div>
              <div className={`text-sm font-bold font-heading ${isDark ? 'text-amber-100' : 'text-amber-950'}`}>
                {t('heroMantraText')}
              </div>
            </div>
          </div>
          <button 
            onClick={toggleAudio}
            title={isPlayingAudio ? "Mute Mantras" : "Play Mantras"}
            className={`p-2.5 rounded-xl border transition-all ${
              isPlayingAudio 
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/50' 
                : isDark ? 'bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-slate-800' : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
            }`}
          >
            {isPlayingAudio ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => scrollToSection('gallery')}
            className="w-full sm:w-auto saffron-gradient-btn text-white font-bold text-sm px-7 py-3.5 rounded-xl flex items-center justify-center space-x-2 border border-amber-300/40"
          >
            <span>{t('heroGalleryBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection('transparency')}
            className={`w-full sm:w-auto font-semibold text-sm px-7 py-3.5 rounded-xl border flex items-center justify-center space-x-2 transition-all hover:scale-105 ${
              isDark 
                ? 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border-amber-500/40' 
                : 'bg-white hover:bg-amber-50 text-amber-900 border-amber-300 shadow-sm'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-500" />
            <span>{t('heroTransparencyBtn')}</span>
          </button>

          <a
            href="https://www.google.com/maps/place/Shri+Mthur+Giri+Maharaj+Sansthan+Gotegaon/@18.6325101,76.0856975,196m/data=!3m1!1e3!4m6!3m5!1s0x3bc56bb44c57f33b:0x7826f6f2dccf346a!8m2!3d18.6325012!4d76.0863546!16s%2Fg%2F11sw13f96x?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto font-semibold text-sm px-7 py-3.5 rounded-xl border flex items-center justify-center space-x-2 transition-all hover:scale-105 ${
              isDark 
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-400/50' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{t('heroMapBtn')}</span>
          </a>
        </div>

        {/* Highlight Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
          <div className={`p-4 rounded-xl border text-center transition-colors ${
            isDark ? 'glass-panel border-amber-500/20' : 'bg-white/90 border-amber-300 shadow-sm'
          }`}>
            <div className="text-2xl font-bold text-amber-500 font-heading">{t('heroStat1Val')}</div>
            <div className={`text-xs font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('heroStat1Lbl')}</div>
          </div>

          <div className={`p-4 rounded-xl border text-center transition-colors ${
            isDark ? 'glass-panel border-amber-500/20' : 'bg-white/90 border-amber-300 shadow-sm'
          }`}>
            <div className="text-2xl font-bold text-amber-500 font-heading">{t('heroStat2Val')}</div>
            <div className={`text-xs font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('heroStat2Lbl')}</div>
          </div>

          <div className={`p-4 rounded-xl border text-center transition-colors ${
            isDark ? 'glass-panel border-amber-500/20' : 'bg-white/90 border-amber-300 shadow-sm'
          }`}>
            <div className="text-2xl font-bold text-amber-500 font-heading">{t('heroStat3Val')}</div>
            <div className={`text-xs font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('heroStat3Lbl')}</div>
          </div>

          <div className={`p-4 rounded-xl border text-center transition-colors ${
            isDark ? 'glass-panel border-amber-500/20' : 'bg-white/90 border-amber-300 shadow-sm'
          }`}>
            <div className="text-2xl font-bold text-amber-500 font-heading">{t('heroStat4Val')}</div>
            <div className={`text-xs font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('heroStat4Lbl')}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
