import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Mic, Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function EventsSection() {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const upcomingEvent = events.length > 0 ? events[0] : null;
  const localeStr = language === 'en' ? 'en-IN' : language === 'hi' ? 'hi-IN' : 'mr-IN';

  return (
    <section id="events" className={`py-20 px-4 sm:px-6 lg:px-8 relative border-t transition-colors duration-300 ${
      isDark ? 'bg-slate-950/80 border-amber-500/10' : 'bg-white border-amber-300/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full border ${
            isDark ? 'text-amber-400 bg-amber-950/50 border-amber-500/30' : 'text-amber-900 bg-amber-100 border-amber-300'
          }`}>
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>{t('eventsBadge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            {t('eventsTitle')}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {t('eventsSub')}
          </p>
        </div>

        {/* Featured Banner Card for Next Utsav */}
        {upcomingEvent && (
          <div className={`rounded-3xl p-6 sm:p-8 border relative overflow-hidden shadow-2xl space-y-6 ${
            isDark ? 'glass-panel-gold border-amber-400/50' : 'bg-gradient-to-br from-amber-100 to-amber-50 border-amber-300 text-slate-900'
          }`}>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              
              {/* Event Banner Image */}
              <div className="w-full lg:w-1/2 h-72 rounded-2xl overflow-hidden relative border border-amber-400/30 bg-slate-900 shrink-0 shadow-md">
                <img
                  src={upcomingEvent.banner_image_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'}
                  alt={upcomingEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider flex items-center space-x-1 shadow-lg">
                  <Bell className="w-4 h-4 animate-bounce" />
                  <span>{t('upcomingHighlight')}</span>
                </span>
              </div>

              {/* Event Information */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="space-y-2">
                  <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">
                    {upcomingEvent.event_type}
                  </span>
                  <h3 className={`font-heading text-2xl sm:text-3xl font-bold leading-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {upcomingEvent.title}
                  </h3>
                  {upcomingEvent.subtitle && (
                    <p className={`text-sm font-medium ${isDark ? 'text-amber-200/90' : 'text-amber-900'}`}>
                      {upcomingEvent.subtitle}
                    </p>
                  )}
                </div>

                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {upcomingEvent.description}
                </p>

                {/* Event Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className={`p-3 rounded-xl border flex items-center space-x-3 text-xs ${
                    isDark ? 'bg-slate-950/80 border-amber-500/20' : 'bg-white border-amber-300 shadow-xs'
                  }`}>
                    <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <div className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('dateLabel')}</div>
                      <div className={`font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                        {new Date(upcomingEvent.event_date).toLocaleDateString(localeStr, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {upcomingEvent.kirtankar_name && (
                    <div className={`p-3 rounded-xl border flex items-center space-x-3 text-xs ${
                      isDark ? 'bg-slate-950/80 border-amber-500/20' : 'bg-white border-amber-300 shadow-xs'
                    }`}>
                      <Mic className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <div className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('kirtankarLabel')}</div>
                        <div className={`font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>{upcomingEvent.kirtankar_name}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`p-3.5 rounded-xl border flex items-center space-x-3 text-xs font-medium ${
                  isDark ? 'bg-amber-950/50 border-amber-400/30 text-amber-200' : 'bg-amber-100/80 border-amber-300 text-amber-950'
                }`}>
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{t('locationLabel')}: {upcomingEvent.location}</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* All Events List Grid */}
        <div className="grid md:grid-cols-3 gap-6 pt-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 ${
                isDark ? 'glass-panel border-amber-500/20 hover:border-amber-400/50' : 'bg-white border-amber-300/80 shadow-md hover:border-amber-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-amber-500 font-medium">
                  <span className={`px-2.5 py-1 rounded-lg border ${
                    isDark ? 'bg-amber-950/60 border-amber-500/30' : 'bg-amber-100 border-amber-300 text-amber-900'
                  }`}>
                    {evt.event_type}
                  </span>
                  <span>{new Date(evt.event_date).toLocaleDateString(localeStr)}</span>
                </div>

                <h4 className={`font-heading font-bold text-lg leading-snug ${
                  isDark ? 'text-amber-100' : 'text-amber-950'
                }`}>
                  {evt.title}
                </h4>

                <p className={`text-xs line-clamp-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {evt.description}
                </p>
              </div>

              {evt.kirtankar_name && (
                <div className={`pt-3 border-t text-xs font-medium flex items-center space-x-1.5 ${
                  isDark ? 'border-amber-500/10 text-amber-300' : 'border-amber-200 text-amber-900'
                }`}>
                  <Mic className="w-3.5 h-3.5 text-amber-500" />
                  <span>{evt.kirtankar_name}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
