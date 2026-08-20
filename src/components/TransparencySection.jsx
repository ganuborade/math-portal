import React, { useState, useEffect } from 'react';
import { IndianRupee, ShieldCheck, TrendingUp, TrendingDown, Wallet, FileText, CheckCircle2, Search, Printer } from 'lucide-react';
import DonationReceiptModal from './DonationReceiptModal';

export default function TransparencySection() {
  const [financeData, setFinanceData] = useState({
    summary: { totalCollected: 0, totalSpent: 0, remainingBalance: 0, totalDonors: 0 },
    records: []
  });
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); // all, collection, expense
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceiptRecord, setSelectedReceiptRecord] = useState(null);

  useEffect(() => {
    fetch('/api/finances')
      .then((res) => res.json())
      .then((data) => {
        setFinanceData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const { summary, records } = financeData;

  const filteredRecords = records.filter((r) => {
    const matchesType = filterType === 'all' || r.type === filterType;
    const matchesSearch = r.donor_or_purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (r.receipt_no && r.receipt_no.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const formatRupee = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="transparency" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider bg-emerald-950/50 px-3.5 py-1 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ग्रामस्थ लोकवर्गणी हिशोब व १००% पारदर्शकता</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            मठ निर्माण निधी जमा व खर्चाचा थेट हिशोब
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            गोटेगाव ग्रामस्थांनी व बाहेरून आलेल्या भाविकांनी दिलेल्या प्रत्येक रुपयाचा अधिकृत हिशोब आणि पावती नोंदणी.
          </p>
        </div>

        {/* 3 Core Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Collections */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                एकूण जमा वर्गणी (Total Collected)
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-emerald-300">
              {formatRupee(summary.totalCollected)}
            </div>
            <div className="text-xs text-slate-400 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{summary.totalDonors} वर्गणीदार व भाविकांचे योगदान</span>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">
                एकूण खर्च (Total Spent)
              </span>
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-rose-300">
              {formatRupee(summary.totalSpent)}
            </div>
            <div className="text-xs text-slate-400">
              बांधकाम, दगडी कोरीव काम व उत्सव महाप्रसाद खर्च
            </div>
          </div>

          {/* Available Balance */}
          <div className="glass-panel-gold p-6 rounded-3xl border border-amber-400/50 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                शिल्लक निधी (Current Fund Balance)
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/30 flex items-center justify-center text-amber-300">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-white">
              {formatRupee(summary.remainingBalance)}
            </div>
            <div className="text-xs text-amber-200/90 font-medium">
              मठाच्या पुढील टप्प्यासाठी अधिकृत बँकेत सुरक्षित
            </div>
          </div>

        </div>

        {/* Audit Log Table Section */}
        <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-amber-200 hover:bg-slate-800 border border-amber-500/20'
                }`}
              >
                सर्व नोंदी ({records.length})
              </button>
              <button
                onClick={() => setFilterType('collection')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === 'collection'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-emerald-300 hover:bg-slate-800 border border-emerald-500/20'
                }`}
              >
                जमा (Collections)
              </button>
              <button
                onClick={() => setFilterType('expense')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === 'expense'
                    ? 'bg-rose-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-rose-300 hover:bg-slate-800 border border-rose-500/20'
                }`}
              >
                खर्च (Expenses)
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="पावती किंवा नावाने शोधा..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 text-amber-100 text-xs pl-9 pr-4 py-2 rounded-xl border border-amber-500/30 focus:outline-none focus:border-amber-400"
              />
            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-amber-500/20">
            <table className="w-full text-left text-xs text-slate-200">
              <thead className="bg-slate-900/90 text-amber-300 font-heading text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">पावती नं / आयडी</th>
                  <th className="py-3.5 px-4">प्रकार (Type)</th>
                  <th className="py-3.5 px-4">वर्गणीदार / खर्चाचे कारण</th>
                  <th className="py-3.5 px-4">वर्ग (Category)</th>
                  <th className="py-3.5 px-4">दिनांक</th>
                  <th className="py-3.5 px-4 text-right">रक्कम (Amount)</th>
                  <th className="py-3.5 px-4 text-center">पावती (Receipt)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10">
                {filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-950/20 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-amber-300">
                      {item.receipt_no || `REC-${item.id}`}
                    </td>
                    <td className="py-3 px-4">
                      {item.type === 'collection' ? (
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[11px] font-medium">
                          + जमा (Income)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-950/80 text-rose-300 border border-rose-800 text-[11px] font-medium">
                          - खर्च (Expense)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-amber-100">
                      {item.donor_or_purpose}
                      {item.notes && <div className="text-[11px] text-slate-400">{item.notes}</div>}
                    </td>
                    <td className="py-3 px-4 text-slate-300">{item.category}</td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(item.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className={`py-3 px-4 text-right font-bold text-sm font-mono ${
                      item.type === 'collection' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {item.type === 'collection' ? '+' : '-'}{formatRupee(item.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.type === 'collection' ? (
                        <button
                          onClick={() => setSelectedReceiptRecord(item)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[11px] font-bold inline-flex items-center space-x-1 transition-all"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-400" />
                          <span>🧾 पावती</span>
                        </button>
                      ) : (
                        <span className="text-slate-500 text-[11px]">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Donation Receipt Modal */}
      {selectedReceiptRecord && (
        <DonationReceiptModal
          record={selectedReceiptRecord}
          onClose={() => setSelectedReceiptRecord(null)}
        />
      )}
    </section>
  );
}
