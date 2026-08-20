import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, Image as ImageIcon, Calendar, IndianRupee, Menu, X, Landmark, UserCheck } from 'lucide-react';

export default function Navbar({ onOpenAdminLogin, adminUser, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-amber-950/30">
      {/* Top Devotional Ticker Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 text-amber-50 text-xs py-1 px-4 text-center font-medium tracking-wide flex justify-between items-center px-6">
        <span className="hidden sm:inline opacity-90">🚩 जय श्री मथुरा गिरी महाराज ! जय विठ्ठल रुक्मिणी ! 🚩</span>
        <span className="mx-auto sm:mx-0">📍 गोटेगाव ग्रामस्थ संचलित | 100% लोकवर्गणी निर्मित भव्य मठ संस्थान</span>
        <span className="hidden md:inline font-mono opacity-90">📞 अधिकृत संपर्क: +91 0000000000</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-md shadow-amber-600/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center border border-amber-300/40">
                <Landmark className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="font-heading text-lg sm:text-xl font-bold tracking-tight gold-gradient-text leading-tight">
                मथुरा गिरी महाराज मठ
              </h1>
              <p className="text-xs text-amber-300/80 font-body font-medium">
                गोटेगाव | Mathur Giri Maharaj Math Sansthan
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-amber-100/90">
            <button 
              onClick={() => scrollToSection('history')} 
              className="hover:text-amber-400 transition-colors flex items-center space-x-1 py-1"
            >
              <span>इतिहास व गोटेगाव एकता</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="hover:text-amber-400 transition-colors flex items-center space-x-1 py-1"
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>फोटो गॅलरी</span>
            </button>

            <button 
              onClick={() => scrollToSection('events')} 
              className="hover:text-amber-400 transition-colors flex items-center space-x-1 py-1"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>सांस्कृतिक उत्सव</span>
            </button>

            <button 
              onClick={() => scrollToSection('transparency')} 
              className="hover:text-amber-400 transition-colors flex items-center space-x-1 py-1"
            >
              <IndianRupee className="w-4 h-4 text-amber-400" />
              <span>पारदर्शकता व हिशोब</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => scrollToSection('donate')}
              className="saffron-gradient-btn text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center space-x-2 border border-amber-300/30"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>दान व संपर्क</span>
            </button>

            {adminUser ? (
              <div className="flex items-center space-x-2 bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-1.5">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <div className="text-left leading-none">
                  <div className="text-xs font-bold text-amber-300">{adminUser.name}</div>
                  <div className="text-[10px] text-slate-400">{adminUser.role}</div>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-xs text-rose-400 hover:underline ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="bg-slate-900/90 hover:bg-slate-800 text-amber-300 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all flex items-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>समिती लॉगिन</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-amber-400 border border-amber-500/30 hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-3">
          <button 
            onClick={() => scrollToSection('history')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-amber-100 font-medium"
          >
            इतिहास व गोटेगाव एकता (History)
          </button>
          <button 
            onClick={() => scrollToSection('gallery')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-amber-100 font-medium flex items-center space-x-2"
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>फोटो गॅलरी (Photos Timeline)</span>
          </button>
          <button 
            onClick={() => scrollToSection('events')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-amber-100 font-medium flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>सांस्कृतिक उत्सव (Events)</span>
          </button>
          <button 
            onClick={() => scrollToSection('transparency')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-amber-100 font-medium flex items-center space-x-2"
          >
            <IndianRupee className="w-4 h-4 text-amber-400" />
            <span>पारदर्शकता व हिशोब (Transparency)</span>
          </button>

          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('donate')}
              className="w-full saffron-gradient-btn text-white py-2.5 rounded-xl font-semibold text-center flex items-center justify-center space-x-2"
            >
              <HeartHandshake className="w-5 h-5" />
              <span>दान व संपर्क (Donate / Contact)</span>
            </button>

            {adminUser ? (
              <div className="bg-slate-900 p-3 rounded-xl flex items-center justify-between border border-amber-500/40">
                <div>
                  <div className="text-sm font-bold text-amber-300">{adminUser.name}</div>
                  <div className="text-xs text-slate-400">{adminUser.role}</div>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-xs text-rose-400 bg-rose-950/40 px-3 py-1 rounded-lg border border-rose-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsMobileMenuOpen(false); onOpenAdminLogin(); }}
                className="w-full bg-slate-900 text-amber-300 py-2.5 rounded-xl border border-amber-500/30 font-medium flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>समिती लॉगिन (Committee Admin)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
