import React, { useState, useEffect } from 'react';
import { HeartHandshake, QrCode, Phone, Mail, ShieldCheck, Copy, Check, Users, Building, CreditCard, ExternalLink } from 'lucide-react';

export default function DonateSection() {
  const [committee, setCommittee] = useState([]);
  const [copiedField, setCopiedField] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    fetch('/api/committee')
      .then((res) => res.json())
      .then((data) => setCommittee(data))
      .catch(() => {});
  }, []);

  const bankDetails = {
    accountName: 'Shri Mathur Giri Maharaj Math Sansthan Gotegaon',
    bankName: 'Maharastra Gramin Bank (MGB)',
    accountNumber: '110210100000082',
    ifscCode: 'MGBB0001002',
    branch: 'Yusufwadgaon Branch',
    upiId: 'yusufwadgaon@mgb'
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="donate" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950/90 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider bg-amber-950/50 px-3 py-1 rounded-full border border-amber-500/30">
            <HeartHandshake className="w-4 h-4" />
            <span>दान व अधिकृत संपर्क - Donations & Committee Contacts</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            मठाच्या विकासासाठी व अन्नदानासाठी आपले योगदान
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            आपण थेट अधिकृत बँकेत दान करू शकता किंवा पावतीसाठी व चौकशीसाठी आमच्या ५ सदस्य समितीशी थेट संपर्क साधू शकता.
          </p>
        </div>

        {/* Bank Details & UPI QR Card */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Bank Account Info Card */}
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-400/50 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/30 flex items-center justify-center border border-amber-300/40 text-amber-300">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  अधिकृत बँक खात्याचा तपशील (Bank Account Details)
                </h3>
                <p className="text-xs text-amber-200/80">
                  मठाचे अधिकृत राष्ट्रीयीकृत बँक खाते
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">खातेदाराचे नाव (Account Name)</div>
                  <div className="text-amber-100 font-semibold">{bankDetails.accountName}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.accountName, 'accName')}
                  className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                  title="Copy Name"
                >
                  {copiedField === 'accName' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">बँकेचे नाव (Bank Name)</div>
                    <div className="text-amber-100 font-semibold">{bankDetails.bankName}</div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">IFSC कोड</div>
                    <div className="text-amber-200 font-mono font-bold">{bankDetails.ifscCode}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bankDetails.ifscCode, 'ifsc')}
                    className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300"
                  >
                    {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">खाते क्रमांक (Account Number)</div>
                  <div className="text-amber-200 font-mono font-bold text-base">{bankDetails.accountNumber}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.accountNumber, 'accNo')}
                  className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300"
                >
                  {copiedField === 'accNo' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setShowQrModal(true)}
                className="w-full saffron-gradient-btn text-slate-950 font-bold text-xs sm:text-sm py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg"
              >
                <QrCode className="w-5 h-5" />
                <span>UPI QR कोड द्वारे दान करा (Scan UPI QR)</span>
              </button>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <h3 className="font-heading text-2xl font-bold text-amber-200">
              पारदर्शक पावती व समितीशी संपर्क नियम
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-light">
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>दान पाठवल्यानंतर त्वरित पावती मिळवण्यासाठी खालील समिती सदस्यांना व्हाट्सॲप करा.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>सर्व दात्यांची नावे वेबसाईटच्या पारदर्शकता विभागात जाहीर केली जातात.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>अन्नदान, मंदिर बांधकाम, किंवा ध्वनी क्षेपकासाठी स्वतंत्र दान देता येते.</span>
              </li>
            </ul>

            <div className="bg-amber-950/60 p-4 rounded-2xl border border-amber-500/30 text-xs text-amber-200 flex items-center space-x-2">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <span>कोणत्याही शंकेसाठी अथवा माहितीसाठी: +91 98230 11223 (अध्यक्ष)</span>
            </div>
          </div>

        </div>

        {/* 5 Committee Members Directory */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-heading text-2xl font-bold gold-gradient-text">
              अधिकृत ५ सदस्य मध्यवर्ती समिती (5 Core Committee Members)
            </h3>
            <p className="text-xs text-slate-300">
              गोटेगाव मठाची व्यवस्था आणि निधी पारदर्शकता सांभाळणारी प्रमुख समिती.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committee.map((member) => (
              <div
                key={member.id}
                className="glass-panel p-5 rounded-2xl border border-amber-500/30 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-950/80 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-500/30">
                      {member.role}
                    </span>
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>

                  <h4 className="font-heading font-bold text-amber-100 text-lg">
                    {member.name}
                  </h4>

                  {member.bio && (
                    <p className="text-slate-300 text-xs">{member.bio}</p>
                  )}
                </div>

                <div className="pt-3 border-t border-amber-500/10 space-y-2">
                  <a
                    href={`tel:${member.phone}`}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs py-2 px-3 rounded-xl border border-amber-500/20 flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* UPI QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-gold p-6 rounded-3xl border border-amber-400/50 max-w-sm w-full text-center space-y-4 shadow-2xl relative">
            <h3 className="font-heading font-bold text-lg text-white">
              UPI QR Code द्वारे थेट दान करा
            </h3>
            <p className="text-xs text-amber-200/90">
              GPay, PhonePe, Paytm किंवा कोणत्याही UPI ॲपवरून स्कॅन करा.
            </p>

            <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center border-4 border-amber-500 shadow-inner">
              {/* QR Code Placeholder Graphic */}
              <div className="text-center space-y-2">
                <QrCode className="w-32 h-32 text-slate-900 mx-auto" />
                <div className="text-[10px] text-slate-600 font-mono font-bold">mathurgiri.gotegaon@sbi</div>
              </div>
            </div>

            <div className="text-xs text-amber-200 font-mono bg-slate-950/80 p-2.5 rounded-xl border border-amber-500/30">
              UPI ID: {bankDetails.upiId}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-300 py-2 rounded-xl text-xs font-bold border border-amber-500/30"
            >
              बंद करा (Close)
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
