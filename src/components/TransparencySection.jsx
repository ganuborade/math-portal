import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, TrendingDown, Wallet, CheckCircle2, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function TransparencySection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [financeData, setFinanceData] = useState({
    summary: { totalCollected: 0, totalSpent: 0, remainingBalance: 0, totalDonors: 0 },
    records: []
  });
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); // all, collection, expense
  const [searchQuery, setSearchQuery] = useState('');

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
    <section id="transparency" className={`py-20 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300 ${
      isDark ? '' : 'bg-amber-50/40'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full border ${
            isDark ? 'text-emerald-400 bg-emerald-950/50 border-emerald-500/30' : 'text-emerald-900 bg-emerald-100 border-emerald-300'
          }`}>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{t('transparencyBadge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            {t('transparencyTitle')}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {t('transparencySub')}
          </p>
        </div>

        {/* 3 Core Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Collections */}
          <div className={`p-6 rounded-3xl border space-y-3 relative overflow-hidden ${
            isDark ? 'glass-panel border-emerald-500/30' : 'bg-white border-emerald-300/80 shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                {t('totalCollectedLbl')}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-emerald-600">
              {formatRupee(summary.totalCollected)}
            </div>
            <div className={`text-xs flex items-center space-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{summary.totalDonors} {t('totalDonorsSub')}</span>
            </div>
          </div>

          {/* Total Expenses */}
          <div className={`p-6 rounded-3xl border space-y-3 relative overflow-hidden ${
            isDark ? 'glass-panel border-rose-500/30' : 'bg-white border-rose-300/80 shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">
                {t('totalSpentLbl')}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-500">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-rose-600">
              {formatRupee(summary.totalSpent)}
            </div>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('totalSpentSub')}
            </div>
          </div>

          {/* Available Balance */}
          <div className={`p-6 rounded-3xl border space-y-3 relative overflow-hidden ${
            isDark ? 'glass-panel-gold border-amber-400/50' : 'bg-gradient-to-br from-amber-100 to-amber-50 border-amber-400/80 shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                {t('remainingBalanceLbl')}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/30 flex items-center justify-center text-amber-500">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className={`text-3xl font-bold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatRupee(summary.remainingBalance)}
            </div>
            <div className={`text-xs font-medium ${isDark ? 'text-amber-200/90' : 'text-amber-900'}`}>
              {t('remainingBalanceSub')}
            </div>
          </div>

        </div>

        {/* Audit Log Table Section */}
        <div className={`rounded-3xl p-6 border space-y-6 ${
          isDark ? 'glass-panel border-amber-500/30' : 'bg-white border-amber-300/80 shadow-lg'
        }`}>
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : isDark ? 'bg-slate-900 text-amber-200 hover:bg-slate-800 border border-amber-500/20' : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {t('filterAll')} ({records.length})
              </button>
              <button
                onClick={() => setFilterType('collection')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === 'collection'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : isDark ? 'bg-slate-900 text-emerald-300 hover:bg-slate-800 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300'
                }`}
              >
                {t('filterCollections')}
              </button>
              <button
                onClick={() => setFilterType('expense')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === 'expense'
                    ? 'bg-rose-500 text-slate-950 shadow-md font-bold'
                    : isDark ? 'bg-slate-900 text-rose-300 hover:bg-slate-800 border border-rose-500/20' : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-300'
                }`}
              >
                {t('filterExpenses')}
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs pl-9 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  isDark ? 'bg-slate-900/90 text-amber-100 border-amber-500/30' : 'bg-slate-50 text-slate-900 border-amber-300'
                }`}
              />
            </div>

          </div>

          {/* Table */}
          <div className={`overflow-x-auto rounded-2xl border ${
            isDark ? 'border-amber-500/20' : 'border-amber-200'
          }`}>
            <table className={`w-full text-left text-xs ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              <thead className={`font-heading text-xs uppercase tracking-wider ${
                isDark ? 'bg-slate-900/90 text-amber-300' : 'bg-amber-100/80 text-amber-950'
              }`}>
                <tr>
                  <th className="py-3.5 px-4">{t('tableReceiptNo')}</th>
                  <th className="py-3.5 px-4">{t('tableType')}</th>
                  <th className="py-3.5 px-4">{t('tablePurpose')}</th>
                  <th className="py-3.5 px-4">{t('tableCategory')}</th>
                  <th className="py-3.5 px-4">{t('tableDate')}</th>
                  <th className="py-3.5 px-4 text-right">{t('tableAmount')}</th>
                  <th className="py-3.5 px-4 text-center">{t('tableStatus')}</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-amber-500/10' : 'divide-amber-200'}`}>
                {filteredRecords.map((item) => (
                  <tr key={item.id} className={`transition-colors ${
                    isDark ? 'hover:bg-amber-950/20' : 'hover:bg-amber-50/80'
                  }`}>
                    <td className="py-3 px-4 font-mono font-bold text-amber-500">
                      {item.receipt_no || `REC-${item.id}`}
                    </td>
                    <td className="py-3 px-4">
                      {item.type === 'collection' ? (
                        <span className={`px-2.5 py-0.5 rounded-md border text-[11px] font-medium ${
                          isDark ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}>
                          {t('typeIncome')}
                        </span>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-md border text-[11px] font-medium ${
                          isDark ? 'bg-rose-950/80 text-rose-300 border-rose-800' : 'bg-rose-100 text-rose-900 border-rose-300'
                        }`}>
                          {t('typeExpense')}
                        </span>
                      )}
                    </td>
                    <td className={`py-3 px-4 font-medium ${isDark ? 'text-amber-100' : 'text-slate-900'}`}>
                      {item.donor_or_purpose}
                      {item.notes && <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.notes}</div>}
                    </td>
                    <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.category}</td>
                    <td className={`py-3 px-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {new Date(item.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className={`py-3 px-4 text-right font-bold text-sm font-mono ${
                      item.type === 'collection' ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      {item.type === 'collection' ? '+' : '-'}{formatRupee(item.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-mono inline-flex items-center space-x-1 ${
                        isDark ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      }`}>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>{t('verifiedStatus')}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
}
