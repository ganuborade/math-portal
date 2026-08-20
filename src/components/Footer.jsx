import React from 'react';
import { Landmark, Heart, MapPin, Phone, Mail, ShieldCheck, Navigation, ExternalLink } from 'lucide-react';

export default function Footer() {
  const mapUrl = "https://www.google.com/maps/place/Shri+Mthur+Giri+Maharaj+Sansthan+Gotegaon/@18.6325101,76.0856975,196m/data=!3m1!1e3!4m6!3m5!1s0x3bc56bb44c57f33b:0x7826f6f2dccf346a!8m2!3d18.6325012!4d76.0863546!16s%2Fg%2F11sw13f96x?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D";
  const mapEmbedUrl = "https://maps.google.com/maps?q=18.6325012,76.0863546&t=m&z=17&output=embed&iwloc=near";

  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-300 pt-14 pb-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl gold-gradient-text">
                श्री मथुरा गिरी महाराज मठ संस्थान
              </h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              गोटेगाव | संपूर्ण ग्रामस्थांच्या एकतेतून व लोकवर्गणीतून यावर्षी साकारलेला भव्य नवीन मठ संस्थान. 
              येथे येणाऱ्या प्रत्येक भाविकाला शांती, समाधान आणि विठ्ठल नामाचा आनंद प्राप्त होतो.
            </p>

            <div className="flex items-center space-x-2 text-xs text-amber-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>१००% गोटेगाव ग्रामस्थ संचलित | शासकीय अनुदानाशिवाय निर्मित</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-amber-200 text-sm">
              त्वरित दुवे (Quick Links)
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#history" className="hover:text-amber-400 transition-colors">मठाचा इतिहास व गोटेगाव एकता</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">छायाचित्रे गॅलरी (Photos)</a></li>
              <li><a href="#events" className="hover:text-amber-400 transition-colors">वार्षिक उत्सव व जयंती</a></li>
              <li><a href="#transparency" className="hover:text-amber-400 transition-colors">ग्रामस्थ हिशोब व पारदर्शकता</a></li>
              <li><a href="#donate" className="hover:text-amber-400 transition-colors">दान व समिती संपर्क</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-amber-200 text-sm">
              मठ संपर्क व पत्ता (Address)
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-2 text-slate-300 hover:text-amber-400 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span>श्री मथुरा गिरी महाराज मठ संस्थान, गोटेगाव, ता. केज, जि. बीड - ४३१५१७</span>
                    <span className="mt-1 inline-flex items-center space-x-1 text-[11px] text-amber-400 font-bold underline decoration-amber-500/50">
                      <span>गूगल मॅपवर उघडा (Open Maps)</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              </li>
              <li className="flex items-center space-x-2 pt-1">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 9096040485 (अध्यक्ष: श्री. बोराडे)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@mathurgiri.org</span>
              </li>
            </ul>
          </div>

          {/* Embedded Interactive Google Map */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-amber-200 text-sm flex items-center space-x-1.5">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>गूगल मॅप स्थान (Google Map)</span>
              </h4>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl group bg-slate-900">
              <iframe
                title="Shri Mathur Giri Maharaj Sansthan Gotegaon Location"
                src={mapEmbedUrl}
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-36 grayscale-[30%] contrast-[110%] group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="p-2 bg-slate-900/90 border-t border-amber-500/30 flex items-center justify-between text-[11px]">
                <span className="text-amber-200 font-medium truncate pr-1">📍 गोटेगाव, ता. केज, बीड</span>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center space-x-1 shrink-0 transition-all shadow-md text-[10px]"
                >
                  <Navigation className="w-3 h-3" />
                  <span>मॅप दिशा (Navigate)</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 Mathur Giri Maharaj Math Sansthan Gotegaon. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>निर्मिती व सेवा: गोटेगाव ग्रामस्थ व भाविक परिवार</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}

