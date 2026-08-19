import React from 'react';
import { Crown, ShieldCheck, Printer, X, Award, CheckCircle2, QrCode } from 'lucide-react';

export default function PresidentCertificateModal({ record, onClose }) {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  const amountFormatted = Number(record.amount).toLocaleString('en-IN');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-gradient-to-b from-amber-950/90 via-slate-950 to-amber-950 p-2 rounded-3xl border-2 border-amber-400 shadow-2xl space-y-4">
        
        {/* Printable Certificate Frame */}
        <div id="printable-certificate" className="p-8 sm:p-10 rounded-2xl border-4 border-double border-amber-400/80 bg-slate-950/95 space-y-6 text-center relative overflow-hidden">
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-2 left-2 text-amber-400/40 text-xl font-serif">❖</div>
          <div className="absolute top-2 right-2 text-amber-400/40 text-xl font-serif">❖</div>
          <div className="absolute bottom-2 left-2 text-amber-400/40 text-xl font-serif">❖</div>
          <div className="absolute bottom-2 right-2 text-amber-400/40 text-xl font-serif">❖</div>

          {/* Header & Seal */}
          <div className="space-y-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-500/20">
              <Crown className="w-9 h-9 text-amber-300" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                अधिकृत संस्थागत आभार व सन्मान पत्र
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-200 gold-gradient-text pt-1">
                श्री मथुरा गिरी महाराज मठ संस्थान, गोटेगाव
              </h2>
              <p className="text-xs text-amber-100/80 font-medium">
                (स्वायत्त धार्मिक संस्था - गोटेगाव, ता. जि. धाराशिव / उस्मानाबाद)
              </p>
            </div>
          </div>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-4" />

          {/* Certificate Body */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <p className="font-serif italic text-amber-300">
              "॥ श्री मथुरा गिरी महाराज प्रसन्न ॥"
            </p>

            <p className="text-slate-300">
              विशेष कृतज्ञतापूर्वक सन्मानित करण्यात येते की,
            </p>

            <div className="py-2 bg-amber-500/10 rounded-2xl border border-amber-400/30">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-wide">
                {record.donor_or_purpose}
              </h3>
              <p className="text-xs text-amber-300 font-semibold mt-1">
                (गावातील/भाविकांचे श्रद्धावंत देणगीदार)
              </p>
            </div>

            <p className="text-slate-300 max-w-lg mx-auto">
              आपण श्री मथुरा गिरी महाराज मठाच्या नूतनीकरण व भव्य बांधकाम सेवेसाठी स्वच्छ व पारदर्शक भावनेने <strong className="text-amber-300 font-mono text-base">₹{amountFormatted}/-</strong> (अक्षरी रु. {amountFormatted} फक्त) इतकी स्वेच्छा वर्गणी समर्पित केली आहे.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left text-xs bg-slate-900/90 p-3 rounded-xl border border-amber-500/20 font-mono">
              <div>
                <span className="text-amber-400/80 block text-[10px]">पावती क्र (Receipt No):</span>
                <strong className="text-white">{record.receipt_no || 'REC-MATH-2026'}</strong>
              </div>
              <div>
                <span className="text-amber-400/80 block text-[10px]">प्रवर्ग (Category):</span>
                <strong className="text-white">{record.category}</strong>
              </div>
              <div>
                <span className="text-amber-400/80 block text-[10px]">दिनांक (Date):</span>
                <strong className="text-white">{record.date}</strong>
              </div>
              <div>
                <span className="text-amber-400/80 block text-[10px]">डिजिटल नोंद (Status):</span>
                <strong className="text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Public Audit</span>
                </strong>
              </div>
            </div>

            <p className="text-[11px] text-amber-200/90 italic pt-1">
              श्री गुरु मथुरा गिरी महाराज आपणास व आपल्या संपूर्ण कुटुंबास उत्तम आरोग्य, समृद्धी व दीर्घायुष्य देवो, हीच प्रार्थना!
            </p>
          </div>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-4" />

          {/* Footer Signatures */}
          <div className="pt-2 flex items-end justify-between text-xs">
            <div className="text-left space-y-1">
              <div className="w-12 h-12 bg-amber-950 rounded-lg border border-amber-500/30 flex items-center justify-center text-amber-400">
                <QrCode className="w-8 h-8" />
              </div>
              <span className="text-[9px] text-amber-300/70 font-mono block">Digital QR Verify</span>
            </div>

            <div className="text-right space-y-1">
              <div className="inline-flex items-center space-x-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/30">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>डिजिटल स्वाक्षरीकृत</span>
              </div>
              <p className="font-heading font-bold text-amber-200 text-sm">
                श्री महादेवराव पाटील
              </p>
              <p className="text-[10px] text-amber-300/80">
                अध्यक्ष - श्री मथुरा गिरी महाराज मठ संस्थान
              </p>
            </div>
          </div>

        </div>

        {/* Modal Action Controls */}
        <div className="p-3 flex items-center justify-end space-x-3 bg-slate-900/90 rounded-2xl border border-amber-500/30">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-amber-200 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            बंद करा (Close)
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 saffron-gradient-btn text-slate-950 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-amber-600/30 hover:scale-105 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>पावती व सन्मानपत्र प्रिंट करा (Print Certificate)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
