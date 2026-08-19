import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Mic, Bell, Sparkles, Heart } from 'lucide-react';

export default function EventsSection() {
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

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950/80 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider bg-amber-950/50 px-3 py-1 rounded-full border border-amber-500/30">
            <Calendar className="w-4 h-4" />
            <span>सांस्कृतिक उत्सव व कार्यक्रम - Cultural Functions</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            मठातील वार्षिक उत्सव, जयंती व पुण्यतिथी सोहळा
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            श्री मथुरा गिरी महाराज जयंती, पुण्यतिथी स्मृती दिन, अखंड हरिनाम सप्ताह व महाप्रसाद सोहळा.
          </p>
        </div>

        {/* Featured Banner Card for Next Utsav */}
        {upcomingEvent && (
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-400/50 relative overflow-hidden shadow-2xl space-y-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              
              {/* Event Banner Image */}
              <div className="w-full lg:w-1/2 h-72 rounded-2xl overflow-hidden relative border border-amber-400/30 bg-slate-900 shrink-0">
                <img
                  src={upcomingEvent.banner_image_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'}
                  alt={upcomingEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider flex items-center space-x-1 shadow-lg">
                  <Bell className="w-4 h-4 animate-bounce" />
                  <span>आगामी प्रमुख उत्सव (Upcoming Highlight)</span>
                </span>
              </div>

              {/* Event Information */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="space-y-2">
                  <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
                    {upcomingEvent.event_type}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {upcomingEvent.title}
                  </h3>
                  {upcomingEvent.subtitle && (
                    <p className="text-amber-200/90 text-sm font-medium">
                      {upcomingEvent.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-slate-200 text-sm leading-relaxed">
                  {upcomingEvent.description}
                </p>

                {/* Event Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/20 flex items-center space-x-3 text-xs">
                    <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-slate-400 font-medium">दिनांक (Date)</div>
                      <div className="text-amber-200 font-bold">
                        {new Date(upcomingEvent.event_date).toLocaleDateString('mr-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {upcomingEvent.kirtankar_name && (
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/20 flex items-center space-x-3 text-xs">
                      <Mic className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-slate-400 font-medium">कीर्तनकार (Kirtankar)</div>
                        <div className="text-amber-200 font-bold">{upcomingEvent.kirtankar_name}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-amber-950/50 p-3.5 rounded-xl border border-amber-400/30 flex items-center space-x-3 text-xs text-amber-200 font-medium">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>स्थान: {upcomingEvent.location}</span>
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
              className="glass-panel rounded-2xl p-5 border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
                  <span className="bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    {evt.event_type}
                  </span>
                  <span>{new Date(evt.event_date).toLocaleDateString('en-IN')}</span>
                </div>

                <h4 className="font-heading font-bold text-amber-100 text-lg leading-snug">
                  {evt.title}
                </h4>

                <p className="text-slate-300 text-xs line-clamp-3">
                  {evt.description}
                </p>
              </div>

              {evt.kirtankar_name && (
                <div className="pt-3 border-t border-amber-500/10 text-xs text-amber-300 font-medium flex items-center space-x-1.5">
                  <Mic className="w-3.5 h-3.5 text-amber-400" />
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
