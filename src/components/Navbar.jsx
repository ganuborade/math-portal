import React, { useState } from 'react';
import { 
  ShieldCheck, HeartHandshake, Image as ImageIcon, Calendar, IndianRupee, Menu, X, Landmark, UserCheck, 
  Sun, Moon, Globe, MapPin 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenAdminLogin, adminUser, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-950/90 border-amber-500/20 shadow-lg shadow-amber-950/30' 
        : 'bg-white/90 border-amber-300/50 shadow-md text-slate-900'
    }`}>
      {/* Top Devotional Ticker Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 text-amber-50 text-xs py-1 px-4 text-center font-medium tracking-wide flex justify-between items-center px-6">
        <span className="hidden sm:inline opacity-90">{t('tickerDevotional')}</span>
        <span className="mx-auto sm:mx-0">{t('tickerSub')}</span>
        <span className="hidden md:inline font-mono opacity-90">{t('tickerContact')}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-md shadow-amber-600/40 group-hover:scale-105 transition-transform">
              <div className={`w-full h-full rounded-full flex items-center justify-center border ${
                isDark ? 'bg-slate-950 border-amber-300/40' : 'bg-amber-50 border-amber-400'
              }`}>
                <Landmark className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div>
              <h1 className="font-heading text-lg sm:text-xl font-bold tracking-tight gold-gradient-text leading-tight">
                {t('brandTitle')}
              </h1>
              <p className={`text-xs font-body font-medium ${isDark ? 'text-amber-300/80' : 'text-amber-800/90'}`}>
                {t('brandSub')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center space-x-6 text-sm font-medium ${
            isDark ? 'text-amber-100/90' : 'text-slate-700'
          }`}>
            <button 
              onClick={() => scrollToSection('history')} 
              className="hover:text-amber-500 transition-colors flex items-center space-x-1 py-1"
            >
              <span>{t('navHistory')}</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="hover:text-amber-500 transition-colors flex items-center space-x-1 py-1"
            >
              <ImageIcon className="w-4 h-4 text-amber-500" />
              <span>{t('navGallery')}</span>
            </button>

            <button 
              onClick={() => scrollToSection('events')} 
              className="hover:text-amber-500 transition-colors flex items-center space-x-1 py-1"
            >
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>{t('navEvents')}</span>
            </button>

            <button 
              onClick={() => scrollToSection('transparency')} 
              className="hover:text-amber-500 transition-colors flex items-center space-x-1 py-1"
            >
              <IndianRupee className="w-4 h-4 text-amber-500" />
              <span>{t('navTransparency')}</span>
            </button>

            <button 
              onClick={() => scrollToSection('map-feedback')} 
              className="hover:text-amber-500 transition-colors flex items-center space-x-1 py-1 text-amber-400 font-semibold"
            >
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{t('navMapFeedback')}</span>
            </button>
          </nav>

          {/* Action Controls: Theme, Language & Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {/* Language Selector Dropdown */}
            <div className={`relative flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold ${
              isDark ? 'bg-slate-900 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-300 text-slate-800'
            }`}>
              <Globe className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs font-semibold py-0.5"
              >
                <option value="mr" className="bg-slate-900 text-white">मराठी (MR)</option>
                <option value="en" className="bg-slate-900 text-white">English (EN)</option>
                <option value="hi" className="bg-slate-900 text-white">हिंदी (HI)</option>
              </select>
            </div>

            {/* Dark / Light Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDark ? t('themeLight') : t('themeDark')}
              className={`p-2 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-slate-900 border-amber-500/30 text-amber-400 hover:bg-slate-800' 
                  : 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-800" />}
            </button>

            {/* Donate Button */}
            <button
              onClick={() => scrollToSection('donate')}
              className="saffron-gradient-btn text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center space-x-2 border border-amber-300/30 shrink-0"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{t('navDonate')}</span>
            </button>

            {/* Admin Login / Session Status */}
            {adminUser ? (
              <div className={`flex items-center space-x-2 border rounded-xl px-3 py-1.5 ${
                isDark ? 'bg-slate-900 border-amber-500/40' : 'bg-amber-50 border-amber-300'
              }`}>
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <div className="text-left leading-none">
                  <div className="text-xs font-bold text-amber-400">{adminUser.name}</div>
                  <div className="text-[10px] opacity-70">{adminUser.role}</div>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-xs text-rose-500 hover:underline ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className={`text-xs font-medium px-3.5 py-2.5 rounded-xl border transition-all flex items-center space-x-1.5 ${
                  isDark 
                    ? 'bg-slate-900/90 text-amber-300 border-amber-500/30 hover:border-amber-400' 
                    : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>{t('adminLogin')}</span>
              </button>
            )}
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border ${
                isDark ? 'bg-slate-900 border-amber-500/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-900'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg border ${
                isDark ? 'bg-slate-900 border-amber-500/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-900'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-3 ${
          isDark ? 'bg-slate-950/95 border-amber-500/30' : 'bg-amber-50/95 border-amber-300'
        }`}>
          
          {/* Mobile Language Switcher Row */}
          <div className={`p-2 rounded-xl border flex items-center justify-between ${
            isDark ? 'bg-slate-900 border-amber-500/30 text-amber-200' : 'bg-white border-amber-300 text-slate-800'
          }`}>
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <Globe className="w-4 h-4 text-amber-500" />
              <span>{t('languageLabel')}:</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-amber-500 text-slate-950 font-bold px-2 py-1 rounded-lg text-xs"
            >
              <option value="mr">मराठी (MR)</option>
              <option value="en">English (EN)</option>
              <option value="hi">हिंदी (HI)</option>
            </select>
          </div>

          <button 
            onClick={() => scrollToSection('history')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 font-medium"
          >
            {t('navHistory')}
          </button>
          <button 
            onClick={() => scrollToSection('gallery')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 font-medium flex items-center space-x-2"
          >
            <ImageIcon className="w-4 h-4 text-amber-500" />
            <span>{t('navGallery')}</span>
          </button>
          <button 
            onClick={() => scrollToSection('events')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 font-medium flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>{t('navEvents')}</span>
          </button>
          <button 
            onClick={() => scrollToSection('transparency')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 font-medium flex items-center space-x-2"
          >
            <IndianRupee className="w-4 h-4 text-amber-500" />
            <span>{t('navTransparency')}</span>
          </button>
          <button 
            onClick={() => scrollToSection('map-feedback')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 font-semibold text-amber-500 flex items-center space-x-2"
          >
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{t('navMapFeedback')}</span>
          </button>

          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('donate')}
              className="w-full saffron-gradient-btn text-white py-2.5 rounded-xl font-semibold text-center flex items-center justify-center space-x-2"
            >
              <HeartHandshake className="w-5 h-5" />
              <span>{t('navDonate')}</span>
            </button>

            {adminUser ? (
              <div className="bg-slate-900 p-3 rounded-xl flex items-center justify-between border border-amber-500/40 text-white">
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
                className={`w-full py-2.5 rounded-xl border font-medium flex items-center justify-center space-x-2 ${
                  isDark ? 'bg-slate-900 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>{t('adminLogin')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
