import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  mr: {
    // Header & Ticker
    tickerDevotional: "🚩 जय श्री मथुरा गिरी महाराज ! जय विठ्ठल रुक्मिणी ! 🚩",
    tickerSub: "📍 गोटेगाव ग्रामस्थ संचलित | 100% लोकवर्गणी निर्मित भव्य मठ संस्थान",
    tickerContact: "📞 अधिकृत संपर्क: +91 9000000000",
    brandTitle: "मथुरा गिरी महाराज मठ",
    brandSub: "गोटेगाव | Mathur Giri Maharaj Math Sansthan",
    
    // Navigation
    navHistory: "इतिहास व गोटेगाव एकता",
    navGallery: "फोटो गॅलरी",
    navEvents: "सांस्कृतिक उत्सव",
    navTransparency: "पारदर्शकता व हिशोब",
    navDonate: "दान व संपर्क",
    navMapFeedback: "मॅप व अभिप्राय",
    adminLogin: "समिती लॉगिन",

    // Theme & Language Controls
    languageLabel: "भाषा",
    themeDark: "डार्क मोड",
    themeLight: "लाइट मोड",

    // Map & Feedback Section
    mapFeedbackTitle: "मठ स्थान व भाविक अभिप्राय",
    mapFeedbackSubtitle: "मथुरा गिरी महाराज मठ गोटेगावचे अचूक स्थान नकाशावर पहा आणि आपला अभिप्राय / फोटो पाठवा.",
    mapTitle: "मठ संस्थान नकाशा स्थान (Map)",
    mapAddressTitle: "मथुरा गिरी महाराज मठ, गोटेगाव",
    mapAddressSub: "गोटेगाव, तालुका व जिल्हा - बीड, महाराष्ट्र 431122",
    getDirections: "गुगल मॅप्सवर दिशा मिळवा",
    
    feedbackTitle: "भाविक अभिप्राय व फोटो अपलोड",
    feedbackSub: "आपला अमूल्य अभिप्राय नोंदवा किंवा मठाशी संबंधित फोटो व सूचना आमच्यासोबत शेअर करा.",
    openGoogleForm: "गुगल फॉर्म द्वारे अभिप्राय द्या / फोटो पाठवा",
    googleFormNotice: "खालील फॉर्म किंवा बटन द्वारे आपण अभिप्राय लिहू शकता आणि फोटो/फायली अपलोड करू शकता.",
    
    quickFeedbackTitle: "थेट अभिप्राय संदेश पाठवा",
    fullName: "आपले पूर्ण नाव",
    mobileNo: "मोबाईल नंबर",
    message: "आपला अभिप्राय / सुचना",
    submitFeedback: "अभिप्राय सबमिट करा",
    feedbackSentSuccess: "धन्यवाद! आपला अभिप्राय यशस्वीरित्या प्राप्त झाला आहे.",
    uploadPhotoNote: "टीप: फोटो किंवा दस्तऐवज अपलोड करण्यासाठी कृपया खालील बटनवरून अधिकृत गुगल फॉर्म वापरा.",
    openFormBtn: "फोटो अपलोड सह गुगल फॉर्म उघडा",

    // Footer
    footerRights: "सर्व हक्क राखीव. मथुरा गिरी महाराज मठ संस्थान, गोटेगाव.",
    devotionalBlessing: "|| श्री मथुरा गिरी प्रसन्न ||"
  },
  en: {
    // Header & Ticker
    tickerDevotional: "🚩 Jai Shri Mathur Giri Maharaj ! Jai Vitthal Rukmini ! 🚩",
    tickerSub: "📍 Managed by Gotegaon Villagers | 100% Public Donation Built Math Sansthan",
    tickerContact: "📞 Contact: +91 9000000000",
    brandTitle: "Mathur Giri Maharaj Math",
    brandSub: "Gotegaon | Mathur Giri Maharaj Math Sansthan",

    // Navigation
    navHistory: "History & Unity",
    navGallery: "Photo Gallery",
    navEvents: "Cultural Events",
    navTransparency: "Transparency & Accounts",
    navDonate: "Donate & Contact",
    navMapFeedback: "Map & Feedback",
    adminLogin: "Committee Login",

    // Theme & Language Controls
    languageLabel: "Language",
    themeDark: "Dark Mode",
    themeLight: "Light Mode",

    // Map & Feedback Section
    mapFeedbackTitle: "Math Location & Devotee Feedback",
    mapFeedbackSubtitle: "Locate Mathur Giri Maharaj Math Gotegaon on Google Maps and submit your feedback or photos.",
    mapTitle: "Math Location Map",
    mapAddressTitle: "Mathur Giri Maharaj Math, Gotegaon",
    mapAddressSub: "Gotegaon, Taluka & District - Beed, Maharashtra 431122",
    getDirections: "Get Directions on Google Maps",

    feedbackTitle: "Devotee Feedback & Photo Upload",
    feedbackSub: "Share your valuable feedback, photos, or suggestions with the Math Committee.",
    openGoogleForm: "Open Google Form for Feedback & Photos",
    googleFormNotice: "Use the embed or button below to write feedback and upload photos/documents.",

    quickFeedbackTitle: "Send Quick Feedback Message",
    fullName: "Your Full Name",
    mobileNo: "Mobile Number",
    message: "Your Feedback / Suggestion",
    submitFeedback: "Submit Feedback",
    feedbackSentSuccess: "Thank you! Your feedback has been received successfully.",
    uploadPhotoNote: "Note: To upload photos or files, please use the official Google Form button below.",
    openFormBtn: "Open Google Form with Photo Upload",

    // Footer
    footerRights: "All Rights Reserved. Mathur Giri Maharaj Math Sansthan, Gotegaon.",
    devotionalBlessing: "|| Shri Mathur Giri Prasanna ||"
  },
  hi: {
    // Header & Ticker
    tickerDevotional: "🚩 जय श्री मथुरा गिरी महाराज ! जय विट्ठल रुक्मिणी ! 🚩",
    tickerSub: "📍 गोटेगांव ग्रामवासियों द्वारा संचालित | 100% जनसहयोग से निर्मित भव्य मठ संस्थान",
    tickerContact: "📞 संपर्क: +91 9000000000",
    brandTitle: "मथुरा गिरी महाराज मठ",
    brandSub: "गोटेगांव | Mathur Giri Maharaj Math Sansthan",

    // Navigation
    navHistory: "इतिहास व गोटेगांव एकता",
    navGallery: "फोटो गैलरी",
    navEvents: "सांस्कृतिक उत्सव",
    navTransparency: "पारदर्शिता व हिसाब",
    navDonate: "दान व संपर्क",
    navMapFeedback: "मैप व फीडबैक",
    adminLogin: "समिति लॉगिन",

    // Theme & Language Controls
    languageLabel: "भाषा",
    themeDark: "डार्क मोड",
    themeLight: "लाइट मोड",

    // Map & Feedback Section
    mapFeedbackTitle: "मठ स्थान एवं भक्त फीडबैक",
    mapFeedbackSubtitle: "मथुरा गिरी महाराज मठ गोटेगांव का सटीक स्थान नक्शे पर देखें और अपना फीडबैक / फोटो भेजें।",
    mapTitle: "मठ संस्थान नक्शा स्थान (Map)",
    mapAddressTitle: "मथुरा गिरी महाराज मठ, गोटेगांव",
    mapAddressSub: "गोटेगांव, तालुका व जिला - बीड, महाराष्ट्र 431122",
    getDirections: "गूगल मैप्स पर दिशाएं प्राप्त करें",

    feedbackTitle: "भक्त फीडबैक व फोटो अपलोड",
    feedbackSub: "अपना बहुमूल्य फीडबैक दर्ज करें या मठ से जुड़े फोटो व सुझाव हमारे साथ साझा करें।",
    openGoogleForm: "गूगल फॉर्म के माध्यम से फीडबैक दें / फोटो भेजें",
    googleFormNotice: "नीचे दिए गए फॉर्म या बटन के माध्यम से आप फीडबैक लिख सकते हैं और फोटो/फाइलें अपलोड कर सकते हैं।",

    quickFeedbackTitle: "सीधा फीडबैक संदेश भेजें",
    fullName: "आपका पूरा नाम",
    mobileNo: "मोबाइल नंबर",
    message: "आपका फीडबैक / सुझाव",
    submitFeedback: "फीडबैक सबमिट करें",
    feedbackSentSuccess: "धन्यवाद! आपका फीडबैक सफलतापूर्वक प्राप्त हुआ है।",
    uploadPhotoNote: "नोट: फोटो या दस्तावेज अपलोड करने के लिए कृपया नीचे दिए गए आधिकारिक गूगल फॉर्म बटन का उपयोग करें।",
    openFormBtn: "फोटो अपलोड के साथ गूगल फॉर्म खोलें",

    // Footer
    footerRights: "सर्वाधिकार सुरक्षित। मथुरा गिरी महाराज मठ संस्थान, गोटेगांव।",
    devotionalBlessing: "|| श्री मथुरा गिरी प्रसन्न ||"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('math_portal_lang') || 'mr';
  });

  useEffect(() => {
    localStorage.setItem('math_portal_lang', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations['mr']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
