import React, { useState } from 'react';
import { ShieldCheck, X, Key, Mail, AlertCircle, Sparkles, UserPlus, Phone, User, Lock, CheckCircle2 } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  // Login State
  const [email, setEmail] = useState('head@mathurgiri.org');
  const [password, setPassword] = useState('admin123');

  // Register State
  const [regForm, setRegForm] = useState({
    name: '',
    role: 'President/Head',
    phone: '',
    email: '',
    password: '',
    adminSecretKey: ''
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'लॉगिन करता आले नाही. माहिती तपासा.');
      } else {
        onLoginSuccess(data.user, data.token);
        onClose();
      }
    } catch (err) {
      setLoading(false);
      setError('सर्व्हर जोडणीत त्रुटी आली. थोड्या वेळाने प्रयत्न करा.');
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm)
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'नोंदणी करता आली नाही.');
      } else {
        setSuccessMsg('समिती सदस्य नोंदणी यशस्वी झाली! आता तुम्ही लॉगिन करू शकता.');
        setEmail(regForm.email);
        setPassword(regForm.password);
        setTimeout(() => {
          setActiveTab('login');
          setSuccessMsg('');
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
      setError('सर्व्हर जोडणीत त्रुटी आली.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 max-w-md w-full border border-amber-400/50 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/30 flex items-center justify-center text-amber-300 border border-amber-400/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                समिती ॲडमिन पोर्टल (Admin Portal)
              </h3>
              <p className="text-xs text-amber-200/80">
                अधिकृत गोटेगाव मठ समिती सदस्यांसाठी
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-amber-400 border border-amber-500/30 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-amber-500/30">
          <button
            onClick={() => { setActiveTab('login'); setError(''); setSuccessMsg(''); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'login'
                ? 'saffron-gradient-btn text-slate-950 shadow-md'
                : 'text-amber-200/80 hover:text-amber-300'
            }`}
          >
            लॉगिन करा (Login)
          </button>

          <button
            onClick={() => { setActiveTab('register'); setError(''); setSuccessMsg(''); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'register'
                ? 'saffron-gradient-btn text-slate-950 shadow-md'
                : 'text-amber-200/80 hover:text-amber-300'
            }`}
          >
            नवीन नोंदणी (Register)
          </button>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="bg-rose-950/80 border border-rose-700 text-rose-200 text-xs p-3 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs p-3 rounded-xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-amber-200">
                ईमेल आयडी (Committee Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="head@mathurgiri.org"
                  className="w-full bg-slate-900/90 text-amber-100 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-amber-500/30 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-amber-200">
                पासवर्ड (Password)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/90 text-amber-100 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-amber-500/30 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-amber-500/20 text-[11px] text-amber-300/80 space-y-1">
              <div>💡 <strong>डेमो लॉगिन (Demo Credentials):</strong></div>
              <div>• अध्यक्ष (President): <code className="text-amber-200">head@mathurgiri.org</code> / <code className="text-amber-200">admin123</code></div>
              <div>• खजिनदार (Treasurer): <code className="text-amber-200">treasurer@mathurgiri.org</code> / <code className="text-amber-200">admin123</code></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full saffron-gradient-btn text-slate-950 font-bold text-xs py-3 rounded-xl shadow-lg flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'तपासणी चालू आहे...' : 'लॉगिन करा (Login)'}</span>
            </button>
          </form>
        )}

        {/* TAB 2: REGISTER FORM (Protected by Admin Secret Key) */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-amber-200">पूर्ण नाव (Full Name)*</label>
              <div className="relative">
                <User className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="उदा. श्री महादेवराव पाटील"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  className="w-full bg-slate-900/90 text-amber-100 text-xs pl-9 pr-4 py-2 rounded-xl border border-amber-500/30 focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-200">पद (Role)*</label>
                <select
                  value={regForm.role}
                  onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                  className="w-full bg-slate-900/90 text-amber-100 text-xs p-2 rounded-xl border border-amber-500/30 focus:border-amber-400"
                >
                  <option value="President/Head">अध्यक्ष (President)</option>
                  <option value="Vice-President">उपाध्यक्ष (Vice-President)</option>
                  <option value="Manager">व्यवस्थापक (Manager)</option>
                  <option value="Treasurer">खजिनदार (Treasurer)</option>
                  <option value="Event Leader">उत्सव प्रमुख (Event Leader)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-200">फोन नंबर (Phone)*</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="+91 98230 11223"
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    className="w-full bg-slate-900/90 text-amber-100 text-xs pl-9 pr-4 py-2 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-amber-200">ईमेल आयडी (Email)*</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="patil@mathurgiri.org"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  className="w-full bg-slate-900/90 text-amber-100 text-xs pl-9 pr-4 py-2 rounded-xl border border-amber-500/30 focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-amber-200">पासवर्ड (Password)*</label>
              <div className="relative">
                <Key className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  className="w-full bg-slate-900/90 text-amber-100 text-xs pl-9 pr-4 py-2 rounded-xl border border-amber-500/30 focus:border-amber-400"
                />
              </div>
            </div>

            {/* Admin Secret Verification Key */}
            <div className="space-y-1 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/40">
              <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                <span>गुप्त समिती की (Admin Secret Key)*</span>
                <span className="text-[10px] text-amber-400 font-mono">डीफॉल्ट Key: GOTEGAON_MATH_2026</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="GOTEGAON_MATH_2026"
                  value={regForm.adminSecretKey}
                  onChange={(e) => setRegForm({ ...regForm, adminSecretKey: e.target.value })}
                  className="w-full bg-slate-900 text-amber-100 text-xs pl-9 pr-4 py-2 rounded-xl border border-amber-400 focus:border-amber-300 font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-300">
                🔒 अनोळखी व्यक्तींनी नोंदणी करू नये म्हणून समिती गुप्त पासवर्ड आवश्यक आहे.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full saffron-gradient-btn text-slate-950 font-bold text-xs py-3 rounded-xl shadow-lg flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'नोंदणी होत आहे...' : 'समिती सदस्य नोंदणी करा (Register Admin)'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
