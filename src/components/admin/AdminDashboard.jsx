import React, { useState, useEffect } from 'react';
import { Calendar, PlusCircle, IndianRupee, Image as ImageIcon, ShieldCheck, CheckCircle2, AlertCircle, Trash2, Crown, Lock, Upload, Link, X, Award, Megaphone, Users, Target, TrendingUp, Printer, FileText } from 'lucide-react';
import PresidentCertificateModal from './PresidentCertificateModal';
import DonationReceiptModal from '../DonationReceiptModal';

function DeviceImagePicker({ label, value, onChange, required = false, placeholder = "https://images.unsplash.com/photo-..." }) {
  const [mode, setMode] = useState('device');

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('कृपया फोटो फाईलच निवडा (Please select an image file).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        onChange(resizedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-amber-300 font-semibold text-xs">
          {label} {required && '*'}
        </label>
        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-amber-500/20 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('device')}
            className={`px-2 py-0.5 rounded flex items-center space-x-1 transition-all ${
              mode === 'device' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-amber-200/70 hover:text-amber-200'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>📱 डिव्हाइसवरून फोटो (File)</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded flex items-center space-x-1 transition-all ${
              mode === 'url' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-amber-200/70 hover:text-amber-200'
            }`}
          >
            <Link className="w-3 h-3" />
            <span>🌐 वेब URL (Link)</span>
          </button>
        </div>
      </div>

      {mode === 'device' ? (
        <div className="space-y-2">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-amber-500/40 rounded-xl p-4 bg-slate-900/80 hover:bg-slate-900 cursor-pointer transition-all hover:border-amber-400">
            <Upload className="w-6 h-6 text-amber-400 mb-1" />
            <span className="text-xs text-amber-200 font-semibold">
              मोबाईल किंवा कॉम्प्युटरवरून फोटो निवडा (Choose Photo from Device)
            </span>
            <span className="text-[10px] text-amber-100/60 mt-0.5">
              JPG, PNG, WEBP (ऑटोमॅटिक सेव्ह होतो)
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400 text-xs"
        />
      )}

      {value && (
        <div className="relative rounded-xl overflow-hidden border border-amber-500/40 bg-slate-950 p-2 flex items-center space-x-3">
          <img src={value} alt="Preview" className="w-16 h-12 object-cover rounded-lg border border-amber-500/30 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>फोटो निवडला गेला आहे (Photo Ready)</span>
            </p>
            <p className="text-[10px] text-amber-100/60 truncate">
              {value.startsWith('data:') ? 'Local Device Photo Upload' : value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="px-2 py-1 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-[10px] rounded-lg flex items-center space-x-1 shrink-0"
          >
            <X className="w-3 h-3" />
            <span>काढा</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard({ user, token, onRefreshData }) {
  const [activeTab, setActiveTab] = useState('events'); // events, finances, gallery
  const [statusMsg, setStatusMsg] = useState(null);

  // All authenticated committee members have full management & deletion capabilities
  const isPresident = Boolean(user);

  // Existing Data Lists for Management & Deletion
  const [eventsList, setEventsList] = useState([]);
  const [financesList, setFinancesList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [announcementsList, setAnnouncementsList] = useState([]);
  const [committeeList, setCommitteeList] = useState([]);
  const [selectedCertificateRecord, setSelectedCertificateRecord] = useState(null);
  const [selectedDonationReceiptRecord, setSelectedDonationReceiptRecord] = useState(null);

  // Form States
  const [announcementForm, setAnnouncementForm] = useState({ title: '', message: '', priority: 'high' });
  const [goalForm, setGoalForm] = useState({ target_amount: 1500000, project_title: 'गर्भगृह राजस्थानी गुलाबी दगडी कोरीव काम व सुवर्ण कळस' });

  // Form States
  const [eventForm, setEventForm] = useState({
    title: '', subtitle: '', event_type: 'Jayanti Mahotsav', event_date: '', location: 'Mathur Giri Maharaj Math Sansthan, Gotegaon', description: '', banner_image_url: '', kirtankar_name: ''
  });

  const [financeForm, setFinanceForm] = useState({
    type: 'collection', donor_or_purpose: '', amount: '', category: 'Village Contribution', date: new Date().toISOString().split('T')[0], receipt_no: '', notes: ''
  });

  const [galleryForm, setGalleryForm] = useState({
    title: '', category: 'Old Math & Maharaj', image_url: '', caption: ''
  });

  const showNotification = (msg, isError = false) => {
    setStatusMsg({ msg, isError });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Fetch Existing Data
  const fetchAllData = async () => {
    try {
      const [resE, resF, resG, resA, resC, resGoal] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/finances'),
        fetch('/api/gallery'),
        fetch('/api/announcements'),
        fetch('/api/committee'),
        fetch('/api/goals')
      ]);
      if (resE.ok) setEventsList(await resE.json());
      if (resF.ok) {
        const finData = await resF.json();
        setFinancesList(finData.records || finData);
      }
      if (resG.ok) setGalleryList(await resG.json());
      if (resA.ok) setAnnouncementsList(await resA.json());
      if (resC.ok) setCommitteeList(await resC.json());
      if (resGoal.ok) {
        const goalData = await resGoal.json();
        if (goalData.target_amount) setGoalForm(goalData);
      }
    } catch (e) {
      console.error('Error fetching admin data:', e);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleResponseError = async (res, defaultMsg) => {
    const data = await res.json().catch(() => ({}));
    if (res.status === 401 || res.status === 403 || (data.error && data.error.toLowerCase().includes('token'))) {
      showNotification('तुमचा लॉगिन सेशन संपला आहे (Session Expired). कृपया पुन्हा ॲडमिन लॉगिन करा.', true);
      setTimeout(() => {
        localStorage.removeItem('math_admin_user');
        localStorage.removeItem('math_admin_token');
        window.location.reload();
      }, 2000);
    } else {
      showNotification(data.error || defaultMsg, true);
    }
  };

  // Submit Handlers (Available to ALL Committee Members)
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventForm)
      });
      if (res.ok) {
        showNotification('नवा उत्सव बॅनर यशस्वीरित्या प्रसिद्ध झाला!');
        setEventForm({ title: '', subtitle: '', event_type: 'Jayanti Mahotsav', event_date: '', location: 'Mathur Giri Maharaj Math Sansthan, Gotegaon', description: '', banner_image_url: '', kirtankar_name: '' });
        fetchAllData();
        onRefreshData();
      } else {
        await handleResponseError(res, 'उत्सव जतन करता आला नाही.');
      }
    } catch {
      showNotification('सर्व्हर जोडणीत त्रुटी.', true);
    }
  };

  const handleFinanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/finances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(financeForm)
      });
      if (res.ok) {
        showNotification('हिशोब नोंद यशस्वीरित्या पारदर्शकतेसाठी जोडली!');
        setFinanceForm({ type: 'collection', donor_or_purpose: '', amount: '', category: 'Village Contribution', date: new Date().toISOString().split('T')[0], receipt_no: '', notes: '' });
        fetchAllData();
        onRefreshData();
      } else {
        await handleResponseError(res, 'हिशोब जतन करता आला नाही.');
      }
    } catch {
      showNotification('सर्व्हर जोडणीत त्रुटी.', true);
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(galleryForm)
      });
      if (res.ok) {
        showNotification('फोटो गॅलरीमध्ये जोडला गेला!');
        setGalleryForm({ title: '', category: 'Old Math & Maharaj', image_url: '', caption: '' });
        fetchAllData();
        onRefreshData();
      } else {
        await handleResponseError(res, 'फोटो जतन करता आला नाही.');
      }
    } catch {
      showNotification('सर्व्हर जोडणीत त्रुटी.', true);
    }
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(announcementForm)
      });
      if (res.ok) {
        showNotification('अध्यक्षीय जाहीर सूचना वेबसाईटवर प्रसिद्ध झाली!');
        setAnnouncementForm({ title: '', message: '', priority: 'high' });
        fetchAllData();
        onRefreshData();
      } else {
        const data = await res.json();
        showNotification(data.error || 'सूचना प्रसिद्ध करता आली नाही.', true);
      }
    } catch {
      showNotification('सर्व्हर त्रुटी.', true);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!isPresident) {
      showNotification('केवळ अध्यक्षांना ही नोंद डिलीट करण्याचा अधिकार आहे.', true);
      return;
    }
    if (!window.confirm('ही जाहीर सूचना डिलीट करायची आहे का?')) return;
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('जाहीर सूचना डिलीट केली.');
        fetchAllData();
        onRefreshData();
      }
    } catch {}
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    if (!isPresident) {
      showNotification('केवळ अध्यक्ष उद्दिष्ट बदलू शकतात.', true);
      return;
    }
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(goalForm)
      });
      if (res.ok) {
        showNotification('विकास निधी उद्दिष्ट यशस्वीरित्या अद्ययावत केले!');
        fetchAllData();
        onRefreshData();
      }
    } catch {
      showNotification('सर्व्हर त्रुटी.', true);
    }
  };

  // DELETE Handlers (Only President/Head Authorized)
  const handleDeleteEvent = async (id, title) => {
    if (!isPresident) {
      showNotification('केवळ अध्यक्षांना ही नोंद डिलीट करण्याचा अधिकार आहे.', true);
      return;
    }
    if (!window.confirm(`तुम्हाला "${title}" हा कार्यक्रम नक्की डिलीट करायचा आहे का?`)) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(data.message || 'कार्यक्रम यशस्वीरित्या डिलीट केला!');
        fetchAllData();
        onRefreshData();
      } else {
        showNotification(data.error || 'डिलीट करता आले नाही.', true);
      }
    } catch {
      showNotification('सर्व्हर त्रुटी.', true);
    }
  };

  const handleDeleteFinance = async (id, name) => {
    if (!isPresident) {
      showNotification('केवळ अध्यक्षांना ही नोंद डिलीट करण्याचा अधिकार आहे.', true);
      return;
    }
    if (!window.confirm(`तुम्हाला "${name}" ची हिशोब नोंद नक्की डिलीट करायची आहे का?`)) return;

    try {
      const res = await fetch(`/api/finances/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(data.message || 'हिशोब नोंद यशस्वीरित्या डिलीट केली!');
        fetchAllData();
        onRefreshData();
      } else {
        showNotification(data.error || 'डिलीट करता आले नाही.', true);
      }
    } catch {
      showNotification('सर्व्हर त्रुटी.', true);
    }
  };

  const handleDeleteGallery = async (id, title) => {
    if (!isPresident) {
      showNotification('केवळ अध्यक्षांना ही नोंद डिलीट करण्याचा अधिकार आहे.', true);
      return;
    }
    if (!window.confirm(`तुम्हाला "${title}" फोटो नक्की डिलीट करायचा आहे का?`)) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(data.message || 'फोटो गॅलरीतून डिलीट केला!');
        fetchAllData();
        onRefreshData();
      } else {
        showNotification(data.error || 'डिलीट करता आले नाही.', true);
      }
    } catch {
      showNotification('सर्व्हर त्रुटी.', true);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-950/95 border-b border-amber-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="glass-panel-gold p-6 rounded-3xl border border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/30 flex items-center justify-center border border-amber-300/40 text-amber-300 shrink-0">
              {isPresident ? <Crown className="w-8 h-8 text-amber-300" /> : <ShieldCheck className="w-8 h-8 text-amber-300" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                  अधिकृत समिती ॲडमिन पॅनेल
                </span>
                {isPresident && (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <Crown className="w-3 h-3" />
                    <span>अध्यक्ष अधिकार (Full Delete Rights)</span>
                  </span>
                )}
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                स्वागत आहे, {user.name} ({user.role})
              </h2>
              <p className="text-xs text-amber-100/80">
                {isPresident
                  ? 'अध्यक्ष म्हणून तुम्हाला नवीन माहिती जोडणे आणि जुन्या नोंदी डिलीट (हटवणे) करण्याचा पूर्ण अधिकार आहे.'
                  : 'समिती सदस्य म्हणून तुम्हाला वेबसाईटवर नवीन कार्यक्रम, जमा-खर्च आणि गॅलरी फोटो जोडण्याचा अधिकार आहे.'}
              </p>
            </div>
          </div>
        </div>

        {/* Role Authorization Badge Note */}
        {!isPresident ? (
          <div className="p-3 bg-slate-900 border border-amber-500/20 rounded-2xl text-xs text-amber-200/80 flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>टीप:</strong> सर्व समिती सदस्यांना नवीन माहिती जोडण्याचा (+ Add) अधिकार आहे. नोंद डिलीट (Delete) करण्याचा अधिकार केवळ <strong>अध्यक्षांकडे (President)</strong> आहे.
            </span>
          </div>
        ) : (
          <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-2xl text-xs text-amber-200 flex items-center space-x-2">
            <Crown className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>अध्यक्ष विशेष अधिकार सक्रिय:</strong> आपण खालील तक्त्यामध्ये कोणत्याही कार्यक्रमाचे, हिशोबाचे किंवा फोटोचे <strong>[🗑️ डिलीट / Delete]</strong> बटण दाबून नोंद कायमची हटवू शकता.
            </span>
          </div>
        )}

        {/* Status Notification Toast */}
        {statusMsg && (
          <div className={`p-4 rounded-2xl border flex items-center space-x-3 text-xs sm:text-sm font-medium ${
            statusMsg.isError
              ? 'bg-rose-950/80 border-rose-700 text-rose-200'
              : 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
          }`}>
            {statusMsg.isError ? <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            <span>{statusMsg.msg}</span>
          </div>
        )}

        {/* Dashboard Management Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-amber-500/20 pb-4">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'events'
                ? 'saffron-gradient-btn text-white border border-amber-300/40'
                : 'bg-slate-900 text-amber-200 hover:bg-slate-800 border border-amber-500/20'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>उत्सव व बॅनर (Events)</span>
          </button>

          <button
            onClick={() => setActiveTab('finances')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'finances'
                ? 'saffron-gradient-btn text-white border border-amber-300/40'
                : 'bg-slate-900 text-amber-200 hover:bg-slate-800 border border-amber-500/20'
            }`}
          >
            <IndianRupee className="w-4 h-4 text-amber-400" />
            <span>जमा-खर्च & पावती (Finances)</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'gallery'
                ? 'saffron-gradient-btn text-white border border-amber-300/40'
                : 'bg-slate-900 text-amber-200 hover:bg-slate-800 border border-amber-500/20'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>फोटो गॅलरी (Gallery)</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'announcements'
                ? 'saffron-gradient-btn text-white border border-amber-300/40'
                : 'bg-slate-900 text-amber-200 hover:bg-slate-800 border border-amber-500/20'
            }`}
          >
            <Megaphone className="w-4 h-4 text-amber-400" />
            <span>👑 अध्यक्षीय सूचना (Notices)</span>
          </button>

          <button
            onClick={() => setActiveTab('committee')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'committee'
                ? 'saffron-gradient-btn text-white border border-amber-300/40'
                : 'bg-slate-900 text-amber-200 hover:bg-slate-800 border border-amber-500/20'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>🏛️ समिती सदस्य (Committee)</span>
          </button>
        </div>

        {/* TAB 1: Cultural Events / Banners */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            {/* Add Event Form */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6">
              <h3 className="font-heading font-bold text-lg text-amber-200 flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <span>नवीन उत्सव किंवा कार्यक्रम बॅनर प्रसिद्ध करा (Add Event Banner)</span>
              </h3>

              <form onSubmit={handleEventSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">कार्यक्रम नाव (Event Title)*</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. श्री मथुरा गिरी महाराज जयंती महोत्सव"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">उपशीर्षक (Subtitle)</label>
                  <input
                    type="text"
                    placeholder="उदा. अखंड हरिनाम सप्ताह व महाप्रसाद"
                    value={eventForm.subtitle}
                    onChange={(e) => setEventForm({ ...eventForm, subtitle: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">प्रकार (Event Type)*</label>
                  <select
                    value={eventForm.event_type}
                    onChange={(e) => setEventForm({ ...eventForm, event_type: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  >
                    <option value="Jayanti Mahotsav">जयंती महोत्सव (Jayanti)</option>
                    <option value="Punyatithi">पुण्यतिथी स्मृती दिन (Punyatithi)</option>
                    <option value="Utsav">वारी / दिंडी / उत्सव (Dindi Utsav)</option>
                    <option value="Bhandara">महाप्रसाद व महाभंडारा (Bhandara)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">दिनांक व वेळ (Date & Time)*</label>
                  <input
                    type="datetime-local"
                    required
                    value={eventForm.event_date}
                    onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">कीर्तनकार नाव (Kirtankar Name)</label>
                  <input
                    type="text"
                    placeholder="उदा. ह.भ.प. प्रकाश महाराज"
                    value={eventForm.kirtankar_name}
                    onChange={(e) => setEventForm({ ...eventForm, kirtankar_name: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <DeviceImagePicker
                    label="बॅनर फोटो (Banner Image)"
                    value={eventForm.banner_image_url}
                    onChange={(imgVal) => setEventForm({ ...eventForm, banner_image_url: imgVal })}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-amber-300 font-semibold">माहिती व तपशील (Event Description)*</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="कार्यक्रमाची संपूर्ण माहिती लिहा..."
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full saffron-gradient-btn text-slate-950 font-bold text-sm py-3 rounded-xl flex items-center justify-center space-x-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>प्रसिद्ध करा (Publish Banner)</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Manage & Delete Existing Events */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <h4 className="font-heading font-bold text-amber-200 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>प्रसिद्ध केलेले कार्यक्रम व बॅनर (Current Published Events)</span>
                </h4>
                {isPresident && (
                  <span className="text-xs text-rose-300 font-medium">👑 अध्यक्ष अधिकार: डिलीट पर्याय उपलब्ध</span>
                )}
              </div>

              <div className="space-y-3">
                {eventsList.length === 0 ? (
                  <p className="text-xs text-amber-100/60">कोणतेही कार्यक्रम उपलब्ध नाहीत.</p>
                ) : (
                  eventsList.map((item) => (
                    <div key={item.id} className="bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-md font-bold">{item.event_type}</span>
                          <h5 className="font-bold text-white text-sm">{item.title}</h5>
                        </div>
                        <p className="text-xs text-amber-100/70">{item.subtitle}</p>
                        <p className="text-[11px] text-amber-300/80">📅 {item.event_date} | 📍 {item.location}</p>
                      </div>

                      {isPresident ? (
                        <button
                          onClick={() => handleDeleteEvent(item.id, item.title)}
                          className="bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 shrink-0 transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-rose-400" />
                          <span>डिलीट करा (Delete)</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-amber-200/40 italic shrink-0">(केवळ अध्यक्ष डिलीट करू शकतात)</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Financial Records */}
        {activeTab === 'finances' && (
          <div className="space-y-8">
            {/* Add Financial Form */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6">
              <h3 className="font-heading font-bold text-lg text-amber-200 flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <span>नवीन जमा वर्गणी किंवा खर्चाची पारदर्शक नोंद करा (Add Financial Entry)</span>
              </h3>

              <form onSubmit={handleFinanceSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">नोंदीचा प्रकार (Entry Type)*</label>
                  <select
                    value={financeForm.type}
                    onChange={(e) => setFinanceForm({ ...financeForm, type: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  >
                    <option value="collection">+ जमा वर्गणी (Donation Collection)</option>
                    <option value="expense">- बांधकाम/उत्सव खर्च (Expense)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">
                    {financeForm.type === 'collection' ? 'दात्याचे / गावकऱ्यांचे नाव*' : 'खर्चाचे विवरण / काम*'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={financeForm.type === 'collection' ? 'उदा. श्री विठ्ठलराव पाटील व कुटुंब' : 'उदा. गर्भगृह दगडी कोरीव काम'}
                    value={financeForm.donor_or_purpose}
                    onChange={(e) => setFinanceForm({ ...financeForm, donor_or_purpose: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">रक्कम (₹ Amount)*</label>
                  <input
                    type="number"
                    required
                    placeholder="50000"
                    value={financeForm.amount}
                    onChange={(e) => setFinanceForm({ ...financeForm, amount: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">प्रवर्ग (Category)*</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. मंदिर बांधकाम / महाप्रसाद"
                    value={financeForm.category}
                    onChange={(e) => setFinanceForm({ ...financeForm, category: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">पावती / बिल क्रमांक (Receipt No)</label>
                  <input
                    type="text"
                    placeholder="REC-105"
                    value={financeForm.receipt_no}
                    onChange={(e) => setFinanceForm({ ...financeForm, receipt_no: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">दिनांक (Date)*</label>
                  <input
                    type="date"
                    required
                    value={financeForm.date}
                    onChange={(e) => setFinanceForm({ ...financeForm, date: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full saffron-gradient-btn text-slate-950 font-bold text-sm py-3 rounded-xl flex items-center justify-center space-x-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>नोंद जतन करा (Save Entry)</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Manage & Delete Existing Finances */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <h4 className="font-heading font-bold text-amber-200 flex items-center space-x-2">
                  <IndianRupee className="w-4 h-4 text-amber-400" />
                  <span>सध्याचे जमा-खर्च हिशोब (Existing Financial Records)</span>
                </h4>
                {isPresident && (
                  <span className="text-xs text-rose-300 font-medium">👑 अध्यक्ष अधिकार: डिलीट पर्याय उपलब्ध</span>
                )}
              </div>

              <div className="space-y-3">
                {financesList.length === 0 ? (
                  <p className="text-xs text-amber-100/60">कोणत्याही नोंदी उपलब्ध नाहीत.</p>
                ) : (
                  financesList.map((item) => (
                    <div key={item.id} className="bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                            item.type === 'collection' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {item.type === 'collection' ? '+ जमा वर्गणी' : '- खर्च'}
                          </span>
                          <h5 className="font-bold text-white text-sm">{item.donor_or_purpose}</h5>
                        </div>
                        <p className="text-xs text-amber-100/80 font-mono font-bold">
                          रक्कम: ₹{Number(item.amount).toLocaleString('en-IN')} | पावती: {item.receipt_no || 'N/A'}
                        </p>
                        <p className="text-[11px] text-amber-300/70">प्रवर्ग: {item.category} | दिनांक: {item.date}</p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-2">
                        {item.type === 'collection' && (
                          <>
                            <button
                              onClick={() => setSelectedDonationReceiptRecord(item)}
                              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-950/40"
                            >
                              <Printer className="w-4 h-4 text-emerald-400" />
                              <span>🧾 देणगी पावती प्रिंट (Receipt)</span>
                            </button>
                            <button
                              onClick={() => setSelectedCertificateRecord(item)}
                              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5 transition-all shadow-md shadow-amber-950/40"
                            >
                              <Award className="w-4 h-4 text-amber-400" />
                              <span>📜 अध्यक्षीय प्रमाणपत्र (Certificate)</span>
                            </button>
                          </>
                        )}

                        {isPresident ? (
                          <button
                            onClick={() => handleDeleteFinance(item.id, item.donor_or_purpose)}
                            className="bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 shrink-0 transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-rose-400" />
                            <span>डिलीट</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-amber-200/40 italic shrink-0">(केवळ अध्यक्ष डिलीट करू शकतात)</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Photo Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            {/* Add Photo Form */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6">
              <h3 className="font-heading font-bold text-lg text-amber-200 flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <span>फोटो गॅलरीत नवीन छायाचित्र जोडा (Add Photo)</span>
              </h3>

              <form onSubmit={handleGallerySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">शीर्षक (Photo Title)*</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. नवीन मठाचे गर्भगृह दर्शन"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">प्रवर्ग (Category)*</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  >
                    <option value="Old Math & Maharaj">जुना मठ व महाराज (Old Math & Maharaj)</option>
                    <option value="Construction Phase">काम चालू असतानाचे फोटो (Construction)</option>
                    <option value="New Temple View">नवीन भव्य मंदिर (New Temple View)</option>
                    <option value="Cultural Events">उत्सव व कीर्तन (Cultural Events)</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <DeviceImagePicker
                    label="फोटो (Photo Image)"
                    required={true}
                    value={galleryForm.image_url}
                    onChange={(imgVal) => setGalleryForm({ ...galleryForm, image_url: imgVal })}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-amber-300 font-semibold">वर्णन / कॅप्शन (Caption)</label>
                  <textarea
                    rows="2"
                    placeholder="छायाचित्राबद्दल थोडक्यात माहिती..."
                    value={galleryForm.caption}
                    onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full saffron-gradient-btn text-slate-950 font-bold text-sm py-3 rounded-xl flex items-center justify-center space-x-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>फोटो गॅलरीत जोडा (Add Photo)</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Manage & Delete Existing Gallery Photos */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <h4 className="font-heading font-bold text-amber-200 flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>गॅलरीमधील फोटो (Existing Gallery Photos)</span>
                </h4>
                {isPresident && (
                  <span className="text-xs text-rose-300 font-medium">👑 अध्यक्ष अधिकार: डिलीट पर्याय उपलब्ध</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryList.length === 0 ? (
                  <p className="text-xs text-amber-100/60 col-span-full">कोणतेही फोटो उपलब्ध नाहीत.</p>
                ) : (
                  galleryList.map((item) => (
                    <div key={item.id} className="bg-slate-900/90 rounded-2xl border border-amber-500/20 overflow-hidden flex flex-col justify-between">
                      <div className="relative aspect-video bg-slate-950">
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-slate-950/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-3 space-y-2 flex-grow flex flex-col justify-between">
                        <div>
                          <h5 className="font-bold text-white text-xs line-clamp-1">{item.title}</h5>
                          {item.caption && <p className="text-[11px] text-amber-100/70 line-clamp-2 mt-1">{item.caption}</p>}
                        </div>

                        {isPresident ? (
                          <button
                            onClick={() => handleDeleteGallery(item.id, item.title)}
                            className="w-full mt-2 bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700 text-xs font-bold py-1.5 rounded-xl flex items-center justify-center space-x-1 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                            <span>डिलीट करा (Delete Photo)</span>
                          </button>
                        ) : (
                          <div className="text-[10px] text-amber-200/40 italic text-center pt-1">(केवळ अध्यक्ष डिलीट करू शकतात)</div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Presidential Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6">
              <h3 className="font-heading font-bold text-lg text-amber-200 flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-amber-400" />
                <span>👑 अध्यक्षीय जाहीर सूचना प्रसिद्ध करा (Publish Official President Announcement)</span>
              </h3>

              <form onSubmit={handleAnnouncementSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">सूचना शीर्षक (Announcement Title)*</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. श्री मथुरा गिरी महाराज जयंती महोत्सवाचे निमंत्रण व ग्रामस्थ बैठक"
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-amber-300 font-semibold">सूचना संदेश (Full Message)*</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="ग्रामस्थ व भाविकांना अध्यक्षीय जाहीर निमंत्रण किंवा माहिती लिहा..."
                    value={announcementForm.message}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                    className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full saffron-gradient-btn text-slate-950 font-bold text-sm py-3 rounded-xl flex items-center justify-center space-x-2"
                >
                  <Megaphone className="w-5 h-5" />
                  <span>वेबसाईटवर सूचना प्रसिद्ध करा (Publish Notice Live)</span>
                </button>
              </form>
            </div>

            {/* List Active Announcements */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <h4 className="font-heading font-bold text-amber-200 flex items-center space-x-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span>सध्याच्या जाहीर सूचना (Active Announcements)</span>
              </h4>

              <div className="space-y-3">
                {announcementsList.length === 0 ? (
                  <p className="text-xs text-amber-100/60">कोणत्याही जाहीर सूचना उपलब्ध नाहीत.</p>
                ) : (
                  announcementsList.map((item) => (
                    <div key={item.id} className="bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h5 className="font-bold text-white text-sm flex items-center space-x-2">
                          <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>{item.title}</span>
                        </h5>
                        <p className="text-xs text-slate-300">{item.message}</p>
                        <p className="text-[10px] text-amber-300/70">प्रसिद्धकर्ता: {item.author} | दिनांक: {item.date}</p>
                      </div>

                      {isPresident && (
                        <button
                          onClick={() => handleDeleteAnnouncement(item.id)}
                          className="bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 shrink-0"
                        >
                          <Trash2 className="w-4 h-4 text-rose-400" />
                          <span>डिलीट</span>
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Committee Roster & Goals */}
        {activeTab === 'committee' && (
          <div className="space-y-8">
            {/* Sansthan Goals Control */}
            {isPresident && (
              <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6">
                <h3 className="font-heading font-bold text-lg text-amber-200 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-amber-400" />
                  <span>🎯 संस्थागत विकास निधी उद्दिष्ट नियंत्रण (Set Fundraising Goal)</span>
                </h3>

                <form onSubmit={handleGoalSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-amber-300 font-semibold">प्रकल्पाचे नाव (Project Title)*</label>
                    <input
                      type="text"
                      required
                      value={goalForm.project_title}
                      onChange={(e) => setGoalForm({ ...goalForm, project_title: e.target.value })}
                      className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-amber-300 font-semibold">उद्दिष्ट रक्कम (Target Amount ₹)*</label>
                    <input
                      type="number"
                      required
                      value={goalForm.target_amount}
                      onChange={(e) => setGoalForm({ ...goalForm, target_amount: e.target.value })}
                      className="w-full bg-slate-900 text-amber-100 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full saffron-gradient-btn text-slate-950 font-bold text-sm py-3 rounded-xl flex items-center justify-center space-x-2"
                    >
                      <Target className="w-5 h-5" />
                      <span>उद्दिष्ट अपडेट करा (Update Goal)</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Committee Roster List */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <h4 className="font-heading font-bold text-amber-200 flex items-center space-x-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>अधिकृत ५ सदस्यीय कार्यकारिणी समिती सदस्य (Official Executive Committee)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {committeeList.map((member) => (
                  <div key={member.id} className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/20 space-y-2 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                          {member.role}
                        </span>
                        <h5 className="font-bold text-white text-sm">{member.name}</h5>
                      </div>
                      <p className="text-xs text-slate-300">📞 {member.phone} | ✉️ {member.email}</p>
                      <p className="text-[11px] text-amber-200/70">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* President Official Certificate Modal */}
      {selectedCertificateRecord && (
        <PresidentCertificateModal
          record={selectedCertificateRecord}
          onClose={() => setSelectedCertificateRecord(null)}
        />
      )}

      {/* Official Math Donation Receipt Modal */}
      {selectedDonationReceiptRecord && (
        <DonationReceiptModal
          record={selectedDonationReceiptRecord}
          onClose={() => setSelectedDonationReceiptRecord(null)}
        />
      )}
    </section>
  );
}
