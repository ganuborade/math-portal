import React, { useState, useEffect } from 'react';
import { HeartHandshake, QrCode, Phone, ShieldCheck, Copy, Check, Users, Building } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function DonateSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [committee, setCommittee] = useState([]);
  const [copiedField, setCopiedField] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    fetch('/api/committee')
      .then((res) => res.json())
      .then((data) => setCommittee(data))
      .catch(() => { });
  }, []);

  const bankDetails = {
    accountName: 'Shri Mathur Giri Maharaj Math Sansthan',
    bankName: 'Maharastra Gramin Bank (MGB)',
    accountNumber: '00000',
    ifscCode: 'MAHG0004546',
    branch: 'Ysuf wadgaon',
    upiId: 'gotegaonmath123@ybl'
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="donate" className={`py-20 px-4 sm:px-6 lg:px-8 relative border-t transition-colors duration-300 ${
      isDark ? 'bg-slate-950/90 border-amber-500/10' : 'bg-white border-amber-300/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${
            isDark ? 'text-amber-400 bg-amber-950/50 border-amber-500/30' : 'text-amber-900 bg-amber-100 border-amber-300'
          }`}>
            <HeartHandshake className="w-4 h-4 text-amber-500" />
            <span>{t('donateBadge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold gold-gradient-text">
            {t('donateTitle')}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {t('donateSub')}
          </p>
        </div>

        {/* Bank Details & UPI QR Card */}
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Bank Account Info Card */}
          <div className={`rounded-3xl p-6 sm:p-8 border space-y-6 shadow-xl ${
            isDark ? 'glass-panel-gold border-amber-400/50' : 'bg-gradient-to-br from-amber-100 to-amber-50 border-amber-300 text-slate-900'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/30 flex items-center justify-center border border-amber-400/40 text-amber-600">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`font-heading text-xl font-bold ${isDark ? 'text-white' : 'text-amber-950'}`}>
                  {t('bankCardTitle')}
                </h3>
                <p className={`text-xs ${isDark ? 'text-amber-200/80' : 'text-amber-900'}`}>
                  {t('bankCardSub')}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-slate-950/80 border-amber-500/20' : 'bg-white border-amber-300 shadow-xs'
              }`}>
                <div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('accountNameLbl')}</div>
                  <div className={`font-semibold ${isDark ? 'text-amber-100' : 'text-amber-950'}`}>{bankDetails.accountName}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.accountName, 'accName')}
                  className="p-1.5 rounded-lg bg-amber-500/20 text-amber-500 hover:bg-amber-500/30"
                  title="Copy Name"
                >
                  {copiedField === 'accName' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-950/80 border-amber-500/20' : 'bg-white border-amber-300 shadow-xs'
                }`}>
                  <div>
                    <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('bankNameLbl')}</div>
                    <div className={`font-semibold ${isDark ? 'text-amber-100' : 'text-amber-950'}`}>{bankDetails.bankName}</div>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-950/80 border-amber-500/20' : 'bg-white border-amber-300 shadow-xs'
                }`}>
                  <div>
                    <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('ifscLbl')}</div>
                    <div className="text-amber-500 font-mono font-bold">{bankDetails.ifscCode}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bankDetails.ifscCode, 'ifsc')}
                    className="p-1.5 rounded-lg bg-amber-500/20 text-amber-500"
                  >
                    {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-slate-950/80 border-amber-500/20' : 'bg-white border-amber-300 shadow-xs'
              }`}>
                <div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('accountNoLbl')}</div>
                  <div className="text-amber-500 font-mono font-bold text-base">{bankDetails.accountNumber}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.accountNumber, 'accNo')}
                  className="p-1.5 rounded-lg bg-amber-500/20 text-amber-500"
                >
                  {copiedField === 'accNo' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setShowQrModal(true)}
                className="w-full saffron-gradient-btn text-white font-bold text-xs sm:text-sm py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg"
              >
                <QrCode className="w-5 h-5" />
                <span>{t('scanQrBtn')}</span>
              </button>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className={`rounded-3xl p-6 sm:p-8 border space-y-6 ${
            isDark ? 'glass-panel border-amber-500/30' : 'bg-white border-amber-300/80 shadow-md'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className={`font-heading text-2xl font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
              {t('rulesTitle')}
            </h3>

            <ul className={`space-y-3 text-xs sm:text-sm font-light ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li className="flex items-start space-x-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{t('rule1')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{t('rule2')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{t('rule3')}</span>
              </li>
            </ul>

            <div className={`p-4 rounded-2xl border text-xs flex items-center space-x-2 font-medium ${
              isDark ? 'bg-amber-950/60 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <Phone className="w-5 h-5 text-amber-500 shrink-0" />
              <span>{t('contactPhoneNote')}</span>
            </div>
          </div>

        </div>

        {/* 5 Committee Members Directory */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-heading text-2xl font-bold gold-gradient-text">
              {t('committeeTitle')}
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {t('committeeSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committee.map((member) => (
              <div
                key={member.id}
                className={`rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 ${
                  isDark ? 'glass-panel border-amber-500/30 hover:border-amber-400/50' : 'bg-white border-amber-300/80 shadow-md hover:border-amber-400'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      isDark ? 'bg-amber-950/80 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>
                      {member.role}
                    </span>
                    <Users className="w-4 h-4 text-amber-500" />
                  </div>

                  <h4 className={`font-heading font-bold text-lg ${isDark ? 'text-amber-100' : 'text-slate-900'}`}>
                    {member.name}
                  </h4>

                  {member.bio && (
                    <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{member.bio}</p>
                  )}
                </div>

                <div className={`pt-3 border-t space-y-2 ${isDark ? 'border-amber-500/10' : 'border-amber-200'}`}>
                  <a
                    href={`tel:${member.phone}`}
                    className={`w-full text-xs py-2 px-3 rounded-xl border flex items-center justify-center space-x-2 transition-colors ${
                      isDark ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/20' : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
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
          <div className={`p-6 rounded-3xl border max-w-sm w-full text-center space-y-4 shadow-2xl relative ${
            isDark ? 'glass-panel-gold border-amber-400/50' : 'bg-white border-amber-300 text-slate-900'
          }`}>
            <h3 className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('qrModalTitle')}
            </h3>
            <p className={`text-xs ${isDark ? 'text-amber-200/90' : 'text-slate-600'}`}>
              {t('qrModalSub')}
            </p>

            <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center border-4 border-amber-500 shadow-inner">
              {/* QR Code Placeholder Graphic */}
              <div className="text-center space-y-2">
                <QrCode className="w-32 h-32 text-slate-900 mx-auto" />
                <div className="text-[10px] text-slate-600 font-mono font-bold">mathurgiri.gotegaon@sbi</div>
              </div>
            </div>

            <div className={`text-xs font-mono p-2.5 rounded-xl border ${
              isDark ? 'bg-slate-950/80 text-amber-200 border-amber-500/30' : 'bg-amber-50 text-slate-900 border-amber-300'
            }`}>
              UPI ID: {bankDetails.upiId}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className={`w-full py-2 rounded-xl text-xs font-bold border ${
                isDark ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/30' : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
              }`}
            >
              {t('closeBtn')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
