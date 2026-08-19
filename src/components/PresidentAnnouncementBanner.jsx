import React, { useState, useEffect } from 'react';
import { Crown, Megaphone, Bell, ChevronRight, X, Sparkles, Calendar } from 'lucide-react';

export default function PresidentAnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAnnouncements(data);
        }
      })
      .catch(() => {});
  }, []);

  if (closed || announcements.length === 0) return null;

  const currentNotice = announcements[0];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-500/40 text-amber-100 py-2.5 px-4 text-xs shadow-lg shadow-amber-950/40 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3 min-w-0">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider flex items-center space-x-1 shrink-0 animate-pulse">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>अध्यक्षीय जाहीर सूचना</span>
            </span>

            <p className="font-medium text-amber-100 truncate cursor-pointer hover:text-amber-300 transition-colors" onClick={() => setSelectedNotice(currentNotice)}>
              <strong className="text-amber-400 font-bold mr-1.5">[{currentNotice.title}]:</strong>
              {currentNotice.message}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setSelectedNotice(currentNotice)}
              className="hidden sm:flex items-center space-x-1 text-[11px] font-bold text-amber-300 hover:text-amber-100 bg-amber-500/20 hover:bg-amber-500/30 px-3 py-1 rounded-lg border border-amber-500/30 transition-all"
            >
              <span>संपूर्ण संदेश पहा</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setClosed(true)}
              className="p-1 rounded-lg hover:bg-amber-500/20 text-amber-300/70 hover:text-amber-200 transition-colors"
              title="बंद करा"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full glass-panel-gold rounded-3xl border border-amber-400/50 p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Crown className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    अधिकृत अध्यक्षीय संदेश (Official Announcement)
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {selectedNotice.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                className="p-2 rounded-xl bg-slate-900 text-amber-400 border border-amber-500/30 hover:bg-rose-950 hover:text-rose-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20">
              <p className="whitespace-pre-line text-amber-50">{selectedNotice.message}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-amber-300/80 pt-2 border-t border-amber-500/20">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>प्रसिद्ध दिनांक: {selectedNotice.date}</span>
              </div>
              <span className="font-semibold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30">
                {selectedNotice.author || 'श्री मथुरा गिरी महाराज मठ संस्थागत अध्यक्ष'}
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
