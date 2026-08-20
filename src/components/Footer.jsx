import React from 'react';
import { Landmark, Heart, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-300 pt-14 pb-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
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

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              गोटेगाव | संपूर्ण ग्रामस्थांच्या एकतेतून व लोकवर्गणीतून यावर्षी साकारलेला भव्य नवीन मठ संस्थान. 
              येथे येणाऱ्या प्रत्येक भाविकाला शांती, समाधान आणि विठ्ठल नामाचा आनंद प्राप्त होतो.
            </p>

            <div className="flex items-center space-x-2 text-xs text-amber-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>१००% गोटेगाव ग्रामस्थ संचलित | शासकीय अनुदानाशिवाय निर्मित</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
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
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-amber-200 text-sm">
              मठ संपर्क व पत्ता (Address)
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>श्री मथुरा गिरी महाराज मठ संस्थान, मुख्य चौक, गोटेगाव, ता. केज, जि. बीड - ४३१५१७</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98230 11223 (अध्यक्ष: श्री गणेश बोराडे)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@mathurgiri.org</span>
              </li>
            </ul>
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
