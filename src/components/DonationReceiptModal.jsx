import React from 'react';
import { Printer, X, ShieldCheck, CheckCircle2, QrCode, FileText } from 'lucide-react';

export function formatAmountWords(num) {
  if (!num || isNaN(num)) return 'शून्य रुपये फक्त';
  const val = Math.floor(Number(num));
  
  // Custom Marathi Lakh / Thousand Format
  if (val >= 10000000) {
    const cr = (val / 10000000).toFixed(2);
    return `${cr} कोटी रुपये फक्त`;
  }
  if (val >= 100000) {
    const lk = (val / 100000).toFixed(2);
    return `${lk} लाख रुपये फक्त`;
  }
  if (val >= 1000) {
    const th = (val / 1000).toFixed(0);
    return `${th} हजार रुपये फक्त`;
  }
  return `${val.toLocaleString('en-IN')} रुपये फक्त`;
}

export default function DonationReceiptModal({ record, onClose }) {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  const amountNum = Number(record.amount || 0);
  const amountFormatted = amountNum.toLocaleString('en-IN');
  const amountWords = formatAmountWords(amountNum);
  const receiptNo = record.receipt_no || `REC-MATH-${record.id || '2026'}`;
  const recordDate = record.date || new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-slate-950 p-2 sm:p-4 rounded-3xl border-2 border-amber-400/80 shadow-2xl space-y-4">
        
        {/* Printable Official Receipt Frame */}
        <div 
          id="printable-donation-receipt" 
          className="p-6 sm:p-8 rounded-2xl border-4 border-double border-amber-500/80 bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/60 text-amber-100 space-y-6 relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center space-y-2 border-b border-amber-500/40 pb-4">
            <div className="flex items-center justify-center space-x-2 text-amber-400">
              <span className="text-xl">☸</span>
              <span className="text-xs font-bold uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40">
                ॥ श्री मथुरा गिरी महाराज प्रसन्न ॥
              </span>
              <span className="text-xl">☸</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-200 tracking-wide">
              श्री मथुरा गिरी महाराज मठ संस्थान
            </h1>
            <p className="text-xs text-amber-300/90 font-medium">
              मु. पो. गोटेगाव, ता. केज, जि. बीड - ४३१५१७ | स्वायत्त धार्मिक विश्वस्त संस्था
            </p>
            <div className="inline-block bg-amber-500 text-slate-950 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
              अधिकृत देणगी / वर्गणी पावती (OFFICIAL DONATION RECEIPT)
            </div>
          </div>

          {/* Receipt Top Info Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs bg-slate-900/90 p-3 rounded-xl border border-amber-500/30 font-mono gap-2">
            <div>
              <span className="text-amber-400/80">पावती क्रमांक (Receipt No): </span>
              <strong className="text-amber-200 text-sm">{receiptNo}</strong>
            </div>
            <div>
              <span className="text-amber-400/80">दिनांक (Date): </span>
              <strong className="text-white text-sm">{recordDate}</strong>
            </div>
          </div>

          {/* Core Receipt Details */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed bg-amber-950/20 p-4 sm:p-6 rounded-2xl border border-amber-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-3 gap-1">
              <span className="text-amber-300 font-semibold shrink-0">श्री / श्रीमती / संस्था (Donor Name):</span>
              <span className="font-heading font-bold text-base sm:text-lg text-white">
                {record.donor_or_purpose}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-3 gap-1">
              <span className="text-amber-300 font-semibold shrink-0">देणगीचा प्रकार / उद्देश (Category):</span>
              <span className="font-semibold text-amber-200">
                {record.category || 'श्री मठ निर्माण सेवेसाठी वर्गणी'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-3 gap-1">
              <span className="text-amber-300 font-semibold shrink-0">देणगी रक्कम अंकी (Amount in Figures):</span>
              <span className="font-mono font-bold text-xl text-emerald-400 bg-slate-950 px-3 py-1 rounded-lg border border-emerald-500/40">
                ₹{amountFormatted}/-
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-1">
              <span className="text-amber-300 font-semibold shrink-0">रक्कम अक्षरी (Amount in Words):</span>
              <span className="font-serif italic font-bold text-amber-200 text-sm">
                {amountWords}
              </span>
            </div>

            {record.notes && (
              <div className="pt-2 border-t border-amber-500/20 text-xs">
                <span className="text-amber-400/80 font-semibold">विशेष टिप्पणी (Notes): </span>
                <span className="text-slate-300 italic">{record.notes}</span>
              </div>
            )}
          </div>

          {/* Verification Badge */}
          <div className="flex items-center justify-between text-[11px] text-amber-300/80 bg-slate-900/60 p-2.5 rounded-xl border border-amber-500/20">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>१००% पारदर्शक डिजिटल नोंदणीकृत पावती (Verified Audit Logged)</span>
            </div>
            <div className="flex items-center space-x-1 text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>VALID SANSTHAN RECEIPT</span>
            </div>
          </div>

          {/* Footer Signatures */}
          <div className="pt-4 flex items-end justify-between border-t border-amber-500/30 text-xs">
            <div className="text-left space-y-1">
              <div className="w-12 h-12 bg-amber-950/80 rounded-lg border border-amber-500/30 flex items-center justify-center text-amber-400">
                <QrCode className="w-8 h-8" />
              </div>
              <span className="text-[9px] text-amber-300/70 font-mono block">डिजिटल क्युआर तपासणी</span>
            </div>

            <div className="text-center space-y-1">
              <div className="w-24 h-10 mx-auto flex items-center justify-center text-amber-400/40 text-[10px] font-serif italic border-b border-amber-500/30">
                [ शिक्का / Seal ]
              </div>
              <span className="text-[10px] text-amber-300/80 block pt-1">मठ संस्थान अधिकृत शिक्का</span>
            </div>

            <div className="text-right space-y-1">
              <div className="h-8 flex items-end justify-end">
                <span className="text-[10px] text-amber-300 font-serif italic border-b border-amber-400/50 pb-0.5">
                  अध्यक्ष स्वाक्षरी (President Signature)
                </span>
              </div>
              <p className="font-heading font-bold text-amber-200 text-sm pt-1">
                श्री गणेश बोराडे
              </p>
              <p className="text-[10px] font-semibold text-amber-300/90">
                अध्यक्ष - श्री मथुरा गिरी महाराज मठ संस्थान, गोटेगाव
              </p>
            </div>
          </div>

        </div>

        {/* Action Controls Bar */}
        <div className="p-3 flex items-center justify-between bg-slate-900/90 rounded-2xl border border-amber-500/30 no-print">
          <div className="text-xs text-amber-200/80 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>ही पावती प्रिंंटरवरून किंवा मोबाइलमध्ये PDF म्हणून सेव्ह करू शकता.</span>
          </div>

          <div className="flex items-center space-x-3">
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
              <span>🖨️ देणगी पावती प्रिंट करा (Print Receipt)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
