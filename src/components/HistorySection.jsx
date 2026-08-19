import React from 'react';
import { Heart, ShieldCheck, Users, Landmark, Award, BookOpen } from 'lucide-react';

export default function HistorySection() {
  return (
    <section id="history" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950/60 border-t border-amber-500/10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider bg-amber-950/50 px-3 py-1 rounded-full border border-amber-500/30">
            <BookOpen className="w-4 h-4" />
            <span>इतिहास आणि गोटेगाव ग्रामस्थांची एकता</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            मठ संस्थानचा इतिहास व ग्रामस्थांचा संकल्प
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            गोटेगावचे आराध्य दैवत श्री मथुरा गिरी महाराज यांच्या प्रेरणेने आणि संपूर्ण गावाच्या अभेद्य एकतेतून उभा राहिलेला भक्तीचा महामेरू.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Old Math & Maharaj Legacy */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col justify-between space-y-6 hover:border-amber-400/50 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-400/40 text-amber-400">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-amber-200">
                १. जुना मठ व श्री मथुरा गिरी महाराज परंपरा
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                गोटेगाव मध्ये अनेक दशकांपासून श्री मथुरा गिरी महाराज यांचे वास्तव्याने पावन झालेला जुना मठ हे संपूर्ण पंचक्रोशीतील भाविकांचे श्रद्धास्थान होते. 
                महाराजांच्या हयातीत त्यांनी गावात भक्ती, शांतता, समता आणि ईश्वरसेवेचा संदेश दिला. 
                महाराजांच्या समाधीनंतरही ग्रामस्थांनी ही परंपरा अविरत चालू ठेवली.
              </p>
            </div>
            
            <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-500/20 text-xs text-amber-300 font-medium italic">
              "महाराजांचा मुख्य संदेश: शांतता, सत्य आणि निष्काम सेवा"
            </div>
          </div>

          {/* Card 2: Village Unity & Building New Temple */}
          <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-400/40 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/30 flex items-center justify-center border border-amber-300/50 text-amber-300">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                २. गोटेगाव ग्रामस्थांची स्वाभिमानी लोकवर्गणी (२०२६)
              </h3>
              <p className="text-amber-100/90 text-sm leading-relaxed">
                जुन्या मठाची जागा अपुरी पडू लागल्याने, यावर्षी सर्व गोटेगाव ग्रामस्थ एकत्र आले. 
                कोणत्याही शासकीय अनुदानाची अपेक्षा न ठेवता, गावकऱ्यांनी स्वतःच्या श्रमातून आणि स्वेच्छेने जमवलेल्या लोकवर्गणीतून 
                या मठाचे पुनरुज्जीवन करण्याचा ऐतिहासिक निर्णय घेतला आणि भव्य नवीन मठ निर्मित केला.
              </p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-2xl border border-amber-400/30 text-xs text-amber-200 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>कोणतेही शासकीय अनुदान नाही — पूर्णतः गोटेगाव ग्रामस्थ व भाविक वर्गणी!</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Sansthan */}
        <div className="grid sm:grid-cols-3 gap-6 pt-4">
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-amber-200 text-base">शांतता व भक्ती</h4>
            <p className="text-xs text-slate-400">येणाऱ्या सर्व भाविकांना मानसिक शांतता आणि विठ्ठल नामाचा नामजप प्राप्त होतो.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-amber-200 text-base">ग्रामस्थ एकता</h4>
            <p className="text-xs text-slate-400">जाती-धर्म भेदापलीकडे जाऊन संपूर्ण गोटेगाव एका कुटुंबाप्रमाणे एकत्र काम करते.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-amber-200 text-base">१००% पारदर्शकता</h4>
            <p className="text-xs text-slate-400">जमा होणाऱ्या प्रत्येक रुपयाचा आणि खर्चाचा हिशोब वेबसाईटवर जाहीर प्रदर्शित.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
