import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, HeartHandshake, ArrowRight, Volume2, VolumeX, Shield, Users, Landmark, Flame } from 'lucide-react';

export default function HeroSection() {
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
          const utterance = new SpeechSynthesisUtterance("ॐ श्री मथुरा गिरी महाराजाय नमः");
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
          <span>॥ शांततेचे व भक्तीचे पवित्र स्थान | गोटेगाव ग्रामस्थ संचलित ॥</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            <span className="block text-amber-400 text-lg sm:text-2xl font-cinzel tracking-wider uppercase mb-2">
              Shri Mathur Giri Maharaj Math Sansthan, Gotegaon
            </span>
            <span className="gold-gradient-text">
              श्री मथुरा गिरी महाराज मठ संस्थान गोटेगाव
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed">
            यावर्षी गोटेगाव ग्रामस्थांनी एकमुखाने एकत्र येऊन, कोणत्याही शासकीय अनुदानाशिवाय, 
            स्वतःच्या वर्गणीतून जुन्या मठाच्या ठिकाणी उभं केलं आहे हे 
            <strong className="text-amber-300 font-semibold"> भव्य नवीन मठ संस्थान</strong>. 
            सर्व भाविकांच्या शांती, भक्ती आणि आध्यात्मिक प्रगतीचे हे केंद्र आहे.
          </p>
        </div>

        {/* Devotional Mantra Card & Chanting Player Mock */}
        <div className="max-w-md mx-auto glass-panel p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/40">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-left">
              <div className="text-xs text-amber-300/80 font-medium">नामस्मरण मंतर (Chanting)</div>
              <div className="text-sm font-bold text-amber-100 font-heading">
                ॥ ॐ श्री मथुरा गिरी महाराजाय नमः ॥
              </div>
            </div>
          </div>
          <button 
            onClick={toggleAudio}
            title={isPlayingAudio ? "Mute Mantras" : "Play Mantras"}
            className={`p-2.5 rounded-xl border transition-all ${
              isPlayingAudio 
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/50' 
                : 'bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-slate-800'
            }`}
          >
            {isPlayingAudio ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => scrollToSection('gallery')}
            className="w-full sm:w-auto saffron-gradient-btn text-slate-950 font-bold text-sm px-7 py-3.5 rounded-xl flex items-center justify-center space-x-2 border border-amber-300/40"
          >
            <span>मठाची फोटो गॅलरी (Old to New Math)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection('transparency')}
            className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-semibold text-sm px-7 py-3.5 rounded-xl border border-amber-500/40 flex items-center justify-center space-x-2 transition-all hover:scale-105"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>ग्रामस्थ लोकवर्गणी हिशोब (Transparency)</span>
          </button>
        </div>

        {/* Highlight Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
          <div className="glass-panel p-4 rounded-xl border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
            <div className="text-2xl font-bold text-amber-400 font-heading">१००%</div>
            <div className="text-xs text-slate-300 font-medium mt-1">लोकवर्गणी (No Govt Aid)</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
            <div className="text-2xl font-bold text-amber-400 font-heading">२०२६</div>
            <div className="text-xs text-slate-300 font-medium mt-1">नवीन मंदिर निर्मिती वर्ष</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
            <div className="text-2xl font-bold text-amber-400 font-heading">५ सदस्य</div>
            <div className="text-xs text-slate-300 font-medium mt-1">अधिकृत विश्वस्त समिती</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
            <div className="text-2xl font-bold text-amber-400 font-heading">वार्षिक उत्सव</div>
            <div className="text-xs text-slate-300 font-medium mt-1">जयंती व पुण्यतिथी सोहळा</div>
          </div>
        </div>

      </div>
    </section>
  );
}
