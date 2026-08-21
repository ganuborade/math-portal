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

    // Hero Section
    heroBadge: "॥ शांततेचे व भक्तीचे पवित्र स्थान | गोटेगाव ग्रामस्थ संचलित ॥",
    heroSubHeading: "Shri Mathur Giri Maharaj Math Sansthan, Gotegaon",
    heroTitle: "श्री मथुरा गिरी महाराज मठ संस्थान गोटेगाव",
    heroDesc: "यावर्षी गोटेगाव ग्रामस्थांनी एकमुखाने एकत्र येऊन, कोणत्याही शासकीय अनुदानाशिवाय, स्वतःच्या वर्गणीतून जुन्या मठाच्या ठिकाणी उभं केलं आहे हे भव्य नवीन मठ संस्थान. सर्व भाविकांच्या शांती, भक्ती आणि आध्यात्मिक प्रगतीचे हे केंद्र आहे.",
    heroMantraTitle: "नामस्मरण मंत्र (Chanting)",
    heroMantraText: "॥ राम कृष्ण हरी॥",
    heroGalleryBtn: "मठाची फोटो गॅलरी",
    heroTransparencyBtn: "ग्रामस्थ लोकवर्गणी हिशोब",
    heroMapBtn: "📍 मठाचे स्थान (Google Map)",
    heroStat1Val: "१००%", heroStat1Lbl: "लोकवर्गणी (No Govt Aid)",
    heroStat2Val: "२०२६", heroStat2Lbl: "नवीन मंदिर निर्मिती वर्ष",
    heroStat3Val: "५ सदस्य", heroStat3Lbl: "अधिकृत विश्वस्त समिती",
    heroStat4Val: "वार्षिक उत्सव", heroStat4Lbl: "जयंती व पुण्यतिथी सोहळा",

    // History Section
    historyBadge: "इतिहास आणि गोटेगाव ग्रामस्थांची एकता",
    historyTitle: "मठ संस्थानचा इतिहास व ग्रामस्थांचा संकल्प",
    historySub: "गोटेगावचे दैवत श्री मथुरा गिरी महाराज यांच्या प्रेरणेने आणि संपूर्ण गावाच्या अभेद्य एकतेतून उभा राहिलेला भक्तीचा महामेरू.",
    historyCard1Title: "१. जुना मठ व श्री मथुरा गिरी महाराज परंपरा",
    historyCard1Desc: "गोटेगाव मध्ये अनेक दशकांपासून श्री मथुरा गिरी महाराज यांचे वास्तव्याने पावन झालेला जुना मठ हे संपूर्ण पंचक्रोशीतील भाविकांचे श्रद्धास्थान होते. महाराजांच्या हयातीत त्यांनी गावात भक्ती, शांतता, समता आणि ईश्वरसेवेचा संदेश दिला. महाराजांच्या समाधीनंतरही ग्रामस्थांनी ही परंपरा अविरत चालू ठेवली.",
    historyCard1Quote: '"महाराजांचा मुख्य संदेश: शांतता, सत्य आणि निष्काम सेवा"',
    historyCard2Title: "२. गोटेगाव ग्रामस्थांची स्वाभिमानी लोकवर्गणी (२०२६)",
    historyCard2Desc: "जुन्या मठाची जागा अपुरी पडू लागल्याने, यावर्षी सर्व गोटेगाव ग्रामस्थ एकत्र आले. कोणत्याही शासकीय अनुदानाची अपेक्षा न ठेवता, गावकऱ्यांनी स्वतःच्या श्रमातून आणि स्वेच्छेने जमवलेल्या लोकवर्गणीतून या मठाचे पुनरुज्जीवन करण्याचा ऐतिहासिक निर्णय घेतला आणि भव्य नवीन मठ निर्मित केला.",
    historyCard2Badge: "कोणतेही शासकीय अनुदान नाही — पूर्णतः गोटेगाव ग्रामस्थ व भाविक वर्गणी!",
    pillar1Title: "शांतता व भक्ती", pillar1Desc: "येणाऱ्या सर्व भाविकांना मानसिक शांतता आणि विठ्ठल नामाचा नामजप प्राप्त होतो.",
    pillar2Title: "ग्रामस्थ एकता", pillar2Desc: "जाती-धर्म भेदापलीकडे जाऊन संपूर्ण गोटेगाव एका कुटुंबाप्रमाणे एकत्र काम करते.",
    pillar3Title: "१००% पारदर्शकता", pillar3Desc: "जमा होणाऱ्या प्रत्येक रुपयाचा आणि खर्चाचा हिशोब वेबसाईटवर जाहीर प्रदर्शित.",

    // Events Section
    eventsBadge: "सांस्कृतिक उत्सव व कार्यक्रम - Cultural Functions",
    eventsTitle: "मठातील वार्षिक उत्सव, जयंती व पुण्यतिथी सोहळा",
    eventsSub: "श्री मथुरा गिरी महाराज जयंती, पुण्यतिथी स्मृती दिन, अखंड हरिनाम सप्ताह व महाप्रसाद सोहळा.",
    upcomingHighlight: "आगामी प्रमुख उत्सव (Upcoming Highlight)",
    dateLabel: "दिनांक (Date)",
    kirtankarLabel: "कीर्तनकार (Kirtankar)",
    locationLabel: "स्थान",

    // Gallery Section
    galleryBadge: "चित्रपट व जुन्या आठवणी - Photo Gallery",
    galleryTitle: "जुन्या मठापासून ते नवीन मठाच्या विकासाची छायाचित्रे",
    gallerySub: "श्री मथुरा गिरी महाराजांच्या जुन्या स्मृती, मठाचे जुने रूप, गावकऱ्यांच्या कष्टाने झालेले बांधकाम आणि आजचे भव्य स्वरूप.",
    catAll: "सर्व फोटो (All Photos)",
    catOld: "जुना मठ व महाराज फोटो (Old Heritage)",
    catConstruction: "काम चालू असतानाचे फोटो (Construction)",
    catNew: "नवीन भव्य मंदिर (New Temple)",
    catEvents: "उत्सव व कीर्तन फोटो (Events)",
    loadingGallery: "छायाचित्रे लोड होत आहेत... (Loading Gallery Photos...)",
    categoryLabel: "प्रवर्ग",

    // Transparency Section
    transparencyBadge: "ग्रामस्थ लोकवर्गणी हिशोब व १००% पारदर्शकता",
    transparencyTitle: "मठ निर्माण निधी जमा व खर्चाचा थेट हिशोब",
    transparencySub: "गोटेगाव ग्रामस्थांनी व बाहेरून आलेल्या भाविकांनी दिलेल्या प्रत्येक रुपयाचा अधिकृत हिशोब आणि पावती नोंदणी.",
    totalCollectedLbl: "एकूण जमा वर्गणी (Total Collected)",
    totalDonorsSub: "वर्गणीदार व भाविकांचे योगदान",
    totalSpentLbl: "एकूण खर्च (Total Spent)",
    totalSpentSub: "बांधकाम, दगडी कोरीव काम व उत्सव महाप्रसाद खर्च",
    remainingBalanceLbl: "शिल्लक निधी (Current Fund Balance)",
    remainingBalanceSub: "मठाच्या पुढील टप्प्यासाठी अधिकृत बँकेत सुरक्षित",
    filterAll: "सर्व नोंदी",
    filterCollections: "जमा (Collections)",
    filterExpenses: "खर्च (Expenses)",
    searchPlaceholder: "पावती किंवा नावाने शोधा...",
    tableReceiptNo: "पावती नं / आयडी",
    tableType: "प्रकार (Type)",
    tablePurpose: "वर्गणीदार / खर्चाचे कारण",
    tableCategory: "वर्ग (Category)",
    tableDate: "दिनांक",
    tableAmount: "रक्कम (Amount)",
    tableStatus: "नोंद (Status)",
    typeIncome: "+ जमा (Income)",
    typeExpense: "- खर्च (Expense)",
    verifiedStatus: "Verified",

    // Donate Section
    donateBadge: "दान व अधिकृत संपर्क - Donations & Committee Contacts",
    donateTitle: "मठाच्या विकासासाठी व अन्नदानासाठी आपले योगदान",
    donateSub: "आपण थेट अधिकृत बँकेत दान करू शकता किंवा पावतीसाठी व चौकशीसाठी आमच्या ५ सदस्य समितीशी थेट संपर्क साधू शकता.",
    bankCardTitle: "अधिकृत बँक खात्याचा तपशील (Bank Account Details)",
    bankCardSub: "मठाचे अधिकृत राष्ट्रीयीकृत बँक खाते",
    accountNameLbl: "खातेदाराचे नाव (Account Name)",
    bankNameLbl: "बँकेचे नाव (Bank Name)",
    ifscLbl: "IFSC कोड",
    accountNoLbl: "खाते क्रमांक (Account Number)",
    scanQrBtn: "UPI QR कोड द्वारे दान करा (Scan UPI QR)",
    rulesTitle: "पारदर्शक पावती व समितीशी संपर्क नियम",
    rule1: "दान पाठवल्यानंतर त्वरित पावती मिळवण्यासाठी खालील समिती सदस्यांना व्हाट्सॲप करा.",
    rule2: "सर्व दात्यांची नावे वेबसाईटच्या पारदर्शकता विभागात जाहीर केली जातात.",
    rule3: "अन्नदान, मंदिर बांधकाम, किंवा ध्वनी क्षेपकासाठी स्वतंत्र दान देता येते.",
    contactPhoneNote: "कोणत्याही शंकेसाठी अथवा माहितीसाठी: +91 9000000000 (अध्यक्ष: बोराडे सर)",
    committeeTitle: "अधिकृत ५ सदस्य मध्यवर्ती समिती (5 Core Committee Members)",
    committeeSub: "गोटेगाव मठाची व्यवस्था आणि निधी पारदर्शकता सांभाळणारी प्रमुख समिती.",
    qrModalTitle: "UPI QR Code द्वारे थेट दान करा",
    qrModalSub: "GPay, PhonePe, Paytm किंवा कोणत्याही UPI ॲपवरून स्कॅन करा.",
    closeBtn: "बंद करा (Close)",

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
    googleFormNoticeTitle: "अधिकृत गुगल अभिप्राय फॉर्म",
    googleFormNotice: "या गुगल फॉर्म द्वारे आपण आपले नाव, अभिप्राय नोंदवून मठाशी संबंधित फोटो किंवा दस्तऐवज थेट अपलोड करू शकता.",
    googleFormFallback: "आपला ब्राउझर आयफ्रेमला सपोर्ट करत नाही. कृपया वरील बटनावर क्लिक करून फॉर्म उघडा.",

    // Disclaimer Section
    disclaimerBadge: "महत्त्वाची टीप व अस्वीकरण - Official Disclaimer & Testing Notice",
    disclaimerTitle: "संकेतस्थळ अस्वीकरण व चाचणी टप्पा सूचना",
    disclaimerSub: "हे संकेतस्थळ सध्या चाचणी (Testing / Beta) टप्प्यात असून माहितीची अचूकता राखण्यासाठी गोटेगाव ग्रामस्थ समिती वचनबद्ध आहे.",
    disclaimerPoint1Title: "१. चाचणी टप्पा (Under Testing Web Portal)",
    disclaimerPoint1Desc: "हे संकेतस्थळ सध्या विकसित व चाचणी प्रक्रियेत आहे. काही तांत्रिक त्रुटी अथवा अपूर्ण माहिती आढळल्यास समितीशी संपर्क साधावा.",
    disclaimerPoint2Title: "२. माहितीची शहानिशा व पडताळणी",
    disclaimerPoint2Desc: "वेबसाईटवर प्रदर्शित बँक तपशील, कार्यक्रम तारखा अथवा निधी नोंदणीबाबत काही शंका किंवा त्रुटी आढळल्यास, कोणतीही देवाणघेवाण करण्यापूर्वी अधिकृत ५ सदस्य मध्यवर्ती समितीकडून (बोराडे सर) पडताळणी करून घ्यावी.",
    disclaimerPoint3Title: "३. बिगर व्यावसायिक व सामाजिक भक्ती पोर्टल",
    disclaimerPoint3Desc: "हे पोर्टल केवळ श्री मथुरा गिरी महाराज मठाची माहिती, पारदर्शकता आणि भाविकांच्या सोयीसाठी गोटेगाव ग्रामस्थांनी तयार केले आहे.",
    disclaimerPoint4Title: "४. गोपनीयता व छायाचित्रे वापर",
    disclaimerPoint4Desc: "वेबसाईटवरील छायाचित्रे व पावती नोंदी केवळ पारदर्शकतेसाठी असून त्यांचा व्यावसायिक वापर करण्यास सक्त मनाई आहे.",
    disclaimerReportBtn: "त्रुटी नोंदवा अथवा समितीशी संपर्क करा",
    disclaimerAlertText: "टीप: जर आपणास या वेबसाईटवर कोणतीही चुकीची किंवा चुकीने प्रविष्ट झालेली माहिती आढळल्यास, कृपया त्वरित +91 9000000000 वर कळवा."
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

    // Hero Section
    heroBadge: "॥ Sacred Abode of Peace & Devotion | Managed by Gotegaon Villagers ॥",
    heroSubHeading: "Shri Mathur Giri Maharaj Math Sansthan, Gotegaon",
    heroTitle: "Shri Mathur Giri Maharaj Math Sansthan Gotegaon",
    heroDesc: "This year, all villagers of Gotegaon united without any government aid to construct this magnificent new Math Sansthan entirely through voluntary public contributions. A central sanctuary of peace, devotion, and spiritual progress for all devotees.",
    heroMantraTitle: "Chanting Mantra",
    heroMantraText: "॥ Ram Krishna Hari ॥",
    heroGalleryBtn: "Photo Gallery",
    heroTransparencyBtn: "Transparency & Accounts",
    heroMapBtn: "📍 Math Location (Google Maps)",
    heroStat1Val: "100%", heroStat1Lbl: "Public Contribution (No Govt Aid)",
    heroStat2Val: "2026", heroStat2Lbl: "New Temple Completion Year",
    heroStat3Val: "5 Members", heroStat3Lbl: "Official Managing Committee",
    heroStat4Val: "Annual Festivals", heroStat4Lbl: "Jayanti & Punyatithi Celebrations",

    // History Section
    historyBadge: "History & Gotegaon Village Unity",
    historyTitle: "Math History & Villagers' Sacred Resolution",
    historySub: "An epicenter of faith built through the inspiration of Shri Mathur Giri Maharaj and the unbreakable unity of Gotegaon village.",
    historyCard1Title: "1. Old Math & Shri Mathur Giri Maharaj Legacy",
    historyCard1Desc: "For decades, the old Math blessed by the divine presence of Shri Mathur Giri Maharaj served as a sacred shrine for devotees across surrounding regions. Maharaj spread messages of devotion, peace, equality, and selfless service. After his samadhi, villagers carried forward this divine tradition.",
    historyCard1Quote: '"Maharaj\'s core message: Peace, Truth, and Selfless Service"',
    historyCard2Title: "2. Proud Public Contribution of Gotegaon Villagers (2026)",
    historyCard2Desc: "As space at the old Math became insufficient, all villagers of Gotegaon united. Expecting no government aid, villagers took a historic pledge to rebuild the Math entirely through their own labor and voluntary contributions, constructing this grand new sanctuary.",
    historyCard2Badge: "Zero Government Aid — 100% Built by Gotegaon Villagers & Devotees!",
    pillar1Title: "Peace & Devotion", pillar1Desc: "Every visitor experiences deep mental peace and spiritual joy through continuous Vitthal name chanting.",
    pillar2Title: "Village Unity", pillar2Desc: "Transcending all barriers of caste and religion, the entire village of Gotegaon works together as one family.",
    pillar3Title: "100% Transparency", pillar3Desc: "Every rupee received and spent is transparently published and audited on this website.",

    // Events Section
    eventsBadge: "Cultural Festivals & Functions",
    eventsTitle: "Annual Celebrations, Jayanti & Punyatithi Utsav",
    eventsSub: "Shri Mathur Giri Maharaj Jayanti, Punyatithi remembrance days, Akhand Harinam Saptah, and Mahaprasad feasts.",
    upcomingHighlight: "Upcoming Highlight Festival",
    dateLabel: "Date",
    kirtankarLabel: "Kirtankar",
    locationLabel: "Location",

    // Gallery Section
    galleryBadge: "Memories & Photo Gallery",
    galleryTitle: "Visual Journey from Heritage Math to New Temple",
    gallerySub: "Cherished memories of Shri Mathur Giri Maharaj, the heritage Math structure, construction milestones, and today's grand sanctuary.",
    catAll: "All Photos",
    catOld: "Old Heritage Math & Maharaj",
    catConstruction: "Construction Phase",
    catNew: "New Grand Temple",
    catEvents: "Events & Kirtan Photos",
    loadingGallery: "Loading Gallery Photos...",
    categoryLabel: "Category",

    // Transparency Section
    transparencyBadge: "Public Funds Audit & 100% Transparency",
    transparencyTitle: "Live Fund Collection & Expense Statement",
    transparencySub: "Official receipts and transparent accounting for every single rupee donated by Gotegaon villagers and visiting devotees.",
    totalCollectedLbl: "Total Collected Funds",
    totalDonorsSub: "Contributions from devotees and villagers",
    totalSpentLbl: "Total Expenses Spent",
    totalSpentSub: "Construction, stone carving, and festival feasts",
    remainingBalanceLbl: "Current Fund Balance",
    remainingBalanceSub: "Safely maintained in official bank account for future phases",
    filterAll: "All Records",
    filterCollections: "Collections (+)",
    filterExpenses: "Expenses (-)",
    searchPlaceholder: "Search by receipt no or donor name...",
    tableReceiptNo: "Receipt No / ID",
    tableType: "Type",
    tablePurpose: "Donor / Purpose",
    tableCategory: "Category",
    tableDate: "Date",
    tableAmount: "Amount",
    tableStatus: "Status",
    typeIncome: "+ Income",
    typeExpense: "- Expense",
    verifiedStatus: "Verified",

    // Donate Section
    donateBadge: "Donations & Committee Contacts",
    donateTitle: "Support Temple Development & Annadaan",
    donateSub: "Donate directly to the official bank account or contact our 5-member committee for receipts and inquiries.",
    bankCardTitle: "Official Bank Account Details",
    bankCardSub: "Official nationalized bank account of Math Sansthan",
    accountNameLbl: "Account Name",
    bankNameLbl: "Bank Name",
    ifscLbl: "IFSC Code",
    accountNoLbl: "Account Number",
    scanQrBtn: "Scan UPI QR Code to Donate",
    rulesTitle: "Transparent Receipts & Contact Rules",
    rule1: "Send transaction screenshot on WhatsApp to committee members below for instant digital receipts.",
    rule2: "All donor names are publicly recorded in the Transparency section of this portal.",
    rule3: "Dedicated donations are accepted for Annadaan (Feasts), Temple Construction, or Sound Systems.",
    contactPhoneNote: "For inquiries or support: +91 9000000000 (President: Borade Sir)",
    committeeTitle: "Official 5-Member Core Managing Committee",
    committeeSub: "Primary committee governing Math management and fund transparency.",
    qrModalTitle: "Donate Directly via UPI QR Code",
    qrModalSub: "Scan using GPay, PhonePe, Paytm, or any UPI payment app.",
    closeBtn: "Close",

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
    googleFormNoticeTitle: "Official Google Feedback Form",
    googleFormNotice: "Use the Google Form below or button to write feedback and directly upload photos or documents related to the Math.",
    googleFormFallback: "Your browser does not support inline frames. Please click the button above to open the form.",

    // Announcement Banner & Footer
    announcementBadge: "Presidential Announcement",
    viewFullMessage: "View Full Message",
    officialAnnouncement: "Official Presidential Announcement",
    publishedDate: "Published Date",
    footerDesc: "Gotegaon | Built this year through the complete unity and voluntary contributions of Gotegaon villagers. A sacred haven of peace and joy for every devotee.",
    footerManaged: "100% Managed by Gotegaon Villagers | Built Without Government Aid",
    quickLinksTitle: "Quick Links",
    addressTitle: "Contact & Address",
    openMapsBtn: "Open on Google Maps",
    footerRights: "All Rights Reserved. Mathur Giri Maharaj Math Sansthan, Gotegaon.",
    devotionalBlessing: "|| Shri Mathur Giri Prasanna ||",
    createdBy: "Devotionally Created by Gotegaon Villagers & Devotee Family",

    // Disclaimer Section
    disclaimerBadge: "Official Disclaimer & Testing Notice",
    disclaimerTitle: "Website Disclaimer & Testing Phase Notice",
    disclaimerSub: "This website is currently under active testing/beta development. Gotegaon Village Committee is committed to information accuracy.",
    disclaimerPoint1Title: "1. Website Under Testing",
    disclaimerPoint1Desc: "This web portal is currently under active testing and enhancement. If you notice any technical glitches or missing details, please inform the committee.",
    disclaimerPoint2Title: "2. Information Verification & Discrepancy Notice",
    disclaimerPoint2Desc: "In case of any doubt or discrepancy regarding bank details, event dates, or fund entries published on this site, please verify directly with the official 5-member committee (Borade Sir) before making any transactions.",
    disclaimerPoint3Title: "3. Non-Commercial Devotional Portal",
    disclaimerPoint3Desc: "This portal is created purely for community service, transparency, and information for devotees of Shri Mathur Giri Maharaj Math Sansthan, Gotegaon.",
    disclaimerPoint4Title: "4. Privacy & Media Usage",
    disclaimerPoint4Desc: "All photos and accounting entries published here are for public transparency and archival purposes only. Commercial reuse is strictly prohibited.",
    disclaimerReportBtn: "Report Discrepancy / Contact Committee",
    disclaimerAlertText: "Note: If you notice any wrong or mistakenly entered information on this site, please immediately report it at +91 9000000000."
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

    // Hero Section
    heroBadge: "॥ शांति एवं भक्ति का पवित्र धाम | गोटेगांव ग्रामवासियों द्वारा संचालित ॥",
    heroSubHeading: "Shri Mathur Giri Maharaj Math Sansthan, Gotegaon",
    heroTitle: "श्री मथुरा गिरी महाराज मठ संस्थान गोटेगांव",
    heroDesc: "इस वर्ष गोटेगांव के समस्त ग्रामवासियों ने बिना किसी सरकारी अनुदान के, स्वयं के जनसहयोग से पुराने मठ के स्थान पर इस भव्य नवीन मठ संस्थान का निर्माण किया है। यह सभी भक्तों के लिए शांति, भक्ति और आध्यात्मिक प्रगति का केंद्र है।",
    heroMantraTitle: "नामस्मरण मंत्र (Chanting)",
    heroMantraText: "॥ राम कृष्ण हरी ॥",
    heroGalleryBtn: "मठ की फोटो गैलरी",
    heroTransparencyBtn: "जनसहयोग हिसाब (पारदर्शिता)",
    heroMapBtn: "📍 मठ का स्थान (Google Map)",
    heroStat1Val: "१००%", heroStat1Lbl: "जनसहयोग (No Govt Aid)",
    heroStat2Val: "२०२६", heroStat2Lbl: "नवीन मंदिर निर्माण वर्ष",
    heroStat3Val: "५ सदस्य", heroStat3Lbl: "आधिकारिक प्रबन्धन समिति",
    heroStat4Val: "वार्षिक उत्सव", heroStat4Lbl: "जयंती व पुण्यतिथि समारोह",

    // History Section
    historyBadge: "इतिहास एवं गोटेगांव ग्रामवासियों की एकता",
    historyTitle: "मठ संस्थान का इतिहास एवं ग्रामवासियों का संकल्प",
    historySub: "श्री मथुरा गिरी महाराज की प्रेरणा और समस्त गांव की अटूट एकता से निर्मित भक्ति का महामेरु।",
    historyCard1Title: "१. पुराना मठ एवं श्री मथुरा गिरी महाराज परंपरा",
    historyCard1Desc: "गोटेगांव में कई दशकों से श्री मथुरा गिरी महाराज के पावन सानिध्य से सुशोभित पुराना मठ सभी भक्तों की श्रद्धा का केंद्र था। महाराज जी ने अपने जीवनकाल में भक्ति, शांति, समता और ईश्वर सेवा का संदेश दिया। महाराज जी के समाधि के पश्चात भी ग्रामवासियों ने इस परंपरा को निरंतर जारी रखा।",
    historyCard1Quote: '"महाराज जी का मुख्य संदेश: शांति, सत्य एवं निष्काम सेवा"',
    historyCard2Title: "२. गोटेगांव निवासियों का स्वाभिमानी जनसहयोग (२०२६)",
    historyCard2Desc: "पुराने मठ में स्थान कम पड़ने पर, इस वर्ष गोटेगांव के सभी निवासी एकसाथ आए। बिना किसी शासकीय सहायता के, ग्रामीणों ने स्वयं के परिश्रम और स्वेच्छा से एकत्रित जनसहयोग से इस मठ के पुनरुद्धार का ऐतिहासिक निर्णय लिया और भव्य नवीन मंदिर का निर्माण किया।",
    historyCard2Badge: "कोई सरकारी अनुदान नहीं — पूर्णतः गोटेगांव वासियों व भक्तों का सहयोग!",
    pillar1Title: "शांति एवं भक्ति", pillar1Desc: "आने वाले सभी भक्तों को मानसिक शांति और विट्ठल नामस्मरण का आनंद प्राप्त होता है।",
    pillar2Title: "गांव की एकता", pillar2Desc: "जाति-धर्म के भेदभाव से परे होकर पूरा गोटेगांव एक परिवार की भांति मिलकर कार्य करता है।",
    pillar3Title: "१००% पारदर्शिता", pillar3Desc: "प्राप्त होने वाले प्रत्येक रुपये और व्यय का हिसाब वेबसाइट पर सार्वजनिक रूप से प्रदर्शित है।",

    // Events Section
    eventsBadge: "सांस्कृतिक उत्सव व कार्यक्रम",
    eventsTitle: "मठ में वार्षिक उत्सव, जयंती व पुण्यतिथि समारोह",
    eventsSub: "श्री मथुरा गिरी महाराज जयंती, पुण्यतिथि स्मृति दिवस, अखंड हरिनाम सप्ताह एवं महाप्रसाद समारोह।",
    upcomingHighlight: "आगामी प्रमुख उत्सव (Highlight)",
    dateLabel: "दिनांक (Date)",
    kirtankarLabel: "कीर्तनकार (Kirtankar)",
    locationLabel: "स्थान",

    // Gallery Section
    galleryBadge: "चित्र व पुरानी यादें - Photo Gallery",
    galleryTitle: "पुराने मठ से नवीन मंदिर के विकास की तस्वीरें",
    gallerySub: "श्री मथुरा गिरी महाराज जी की पुरानी स्मृतियां, पुराने मठ का रूप, ग्रामीणों का परिश्रम और आज का भव्य मंदिर।",
    catAll: "सभी तस्वीरें (All Photos)",
    catOld: "पुराना मठ व महाराज जी (Heritage)",
    catConstruction: "निर्माण कार्य की तस्वीरें (Construction)",
    catNew: "नवीन भव्य मंदिर (New Temple)",
    catEvents: "उत्सव व कीर्तन फोटो (Events)",
    loadingGallery: "तस्वीरें लोड हो रही हैं...",
    categoryLabel: "श्रेणी",

    // Transparency Section
    transparencyBadge: "जनसहयोग हिसाब व १००% पारदर्शिता",
    transparencyTitle: "मठ निर्माण कोष जमा व व्यय का लाइव हिसाब",
    transparencySub: "गोटेगांव वासियों एवं बाहर से आए भक्तों द्वारा दिए गए प्रत्येक रुपये का आधिकारिक हिसाब और रसीद पंजीकरण।",
    totalCollectedLbl: "कुल प्राप्त राशि (Total Collected)",
    totalDonorsSub: "भक्तों एवं ग्रामवासियों का योगदान",
    totalSpentLbl: "कुल व्यय (Total Spent)",
    totalSpentSub: "निर्माण, नक्काशी एवं उत्सव महाप्रसाद व्यय",
    remainingBalanceLbl: "शेष बची राशि (Balance)",
    remainingBalanceSub: "मठ के आगामी चरणों के लिए बैंक में सुरक्षित",
    filterAll: "सभी रिकॉर्ड",
    filterCollections: "प्राप्त जमा (+)",
    filterExpenses: "कुल व्यय (-)",
    searchPlaceholder: "रसीद नंबर या नाम से खोजें...",
    tableReceiptNo: "रसीद नं / आईडी",
    tableType: "प्रकार",
    tablePurpose: "दाता / व्यय का विवरण",
    tableCategory: "श्रेणी",
    tableDate: "दिनांक",
    tableAmount: "राशि (Amount)",
    tableStatus: "स्थिति (Status)",
    typeIncome: "+ जमा (Income)",
    typeExpense: "- व्यय (Expense)",
    verifiedStatus: "Verified",

    // Donate Section
    donateBadge: "दान व आधिकारिक संपर्क - Donations & Committee",
    donateTitle: "मठ विकास व अन्नदान हेतु आपका योगदान",
    donateSub: "आप सीधे आधिकारिक बैंक खाते में दान कर सकते हैं अथवा रसीद व पूछताछ हेतु हमारी ५ सदस्यीय समिति से संपर्क कर सकते हैं।",
    bankCardTitle: "आधिकारिक बैंक खाता विवरण (Bank Details)",
    bankCardSub: "मठ का आधिकारिक बैंक खाता",
    accountNameLbl: "खाताधारक का नाम",
    bankNameLbl: "बैंक का नाम",
    ifscLbl: "IFSC कोड",
    accountNoLbl: "खाता संख्या (Account Number)",
    scanQrBtn: "UPI QR कोड से दान करें (Scan UPI QR)",
    rulesTitle: "पारदर्शी रसीद व समिति संपर्क नियम",
    rule1: "दान भेजने के तुरंत बाद डिजिटल रसीद प्राप्त करने हेतु समिति सदस्यों को व्हाट्सएप करें।",
    rule2: "सभी दानदाताओं के नाम वेबसाइट के पारदर्शिता अनुभाग में सार्वजनिक किए जाते हैं।",
    rule3: "अन्नदान, मंदिर निर्माण या लाउडस्पीकर के लिए पृथक दान दिया जा सकता है।",
    contactPhoneNote: "किसी भी प्रश्न अथवा जानकारी हेतु: +91 9000000000 (अध्यक्ष: बोराड़े सर)",
    committeeTitle: "आधिकारिक ५ सदस्यीय केंद्रीय समिति (Core Committee)",
    committeeSub: "गोटेगांव मठ की व्यवस्था एवं कोष पारदर्शिता संभालने वाली मुख्य समिति।",
    qrModalTitle: "UPI QR Code द्वारा सीधा दान करें",
    qrModalSub: "GPay, PhonePe, Paytm या किसी भी UPI ऐप से स्कैन करें।",
    closeBtn: "बंद करें (Close)",

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
    googleFormNoticeTitle: "आधिकारिक गूगल फीडबैक फॉर्म",
    googleFormNotice: "नीचे दिए गए गूगल फॉर्म या बटन के माध्यम से आप फीडबैक लिख सकते हैं और मठ से संबंधित फोटो/फाइलें अपलोड कर सकते हैं।",
    googleFormFallback: "आपका ब्राउज़र फ्रेम को सपोर्ट नहीं करता है। कृपया ऊपर दिए बटन पर क्लिक करें।",

    // Announcement Banner & Footer
    announcementBadge: "अध्यक्षीय सार्वजनिक सूचना",
    viewFullMessage: "पूरा संदेश देखें",
    officialAnnouncement: "आधिकारिक अध्यक्षीय संदेश (Official Announcement)",
    publishedDate: "प्रकाशित तिथि",
    footerDesc: "गोटेगांव | समस्त ग्रामीणों की अभूतपूर्व एकता एवं जनसहयोग से निर्मित भव्य नवीन मठ संस्थान। यहाँ आने वाले प्रत्येक भक्त को शांति एवं भक्ति का आनंद प्राप्त होता है।",
    footerManaged: "१००% गोटेगांव निवासियों द्वारा संचालित | बिना किसी सरकारी सहायता के निर्मित",
    quickLinksTitle: "त्वरित लिंक",
    addressTitle: "मठ संपर्क व पता",
    openMapsBtn: "गूगल मैप्स पर खोलें",
    footerRights: "सर्वाधिकार सुरक्षित। मथुरा गिरी महाराज मठ संस्थान, गोटेगांव।",
    devotionalBlessing: "|| श्री मथुरा गिरी प्रसन्न ||",
    createdBy: "निर्मिति व सेवा: गोटेगांव ग्रामवासी एवं भक्त परिवार",

    // Disclaimer Section
    disclaimerBadge: "आधिकारिक अस्वीकरण व परीक्षण सूचना",
    disclaimerTitle: "वेबसाइट अस्वीकरण एवं परीक्षण चरण सूचना",
    disclaimerSub: "यह वेबसाइट वर्तमान में परीक्षण (Testing / Beta) चरण में है और गोटेगांव ग्रामवासी समिति जानकारी की सटीकता बनाए रखने हेतु प्रतिबद्ध है।",
    disclaimerPoint1Title: "१. परीक्षण चरण (Under Testing Web Portal)",
    disclaimerPoint1Desc: "यह वेबसाइट वर्तमान में विकास और परीक्षण प्रक्रिया में है। यदि आपको कोई तकनीकी त्रुटि या अधूरी जानकारी मिलती है, तो कृपया समिति को सूचित करें।",
    disclaimerPoint2Title: "२. जानकारी का सत्यापन व विसंगति सूचना",
    disclaimerPoint2Desc: "वेबसाइट पर प्रकाशित बैंक विवरण, कार्यक्रम तिथियों या फंड प्रविष्टियों के संबंध में किसी भी संदेह या त्रुटि के मामले में, कोई भी लेन-देन करने से पहले आधिकारिक ५ सदस्यीय समिति (बोराड़े सर) से सीधा सत्यापन कर लें।",
    disclaimerPoint3Title: "३. गैर-व्यावसायिक भक्ति पोर्टल",
    disclaimerPoint3Desc: "यह पोर्टल केवल श्री मथुरा गिरी महाराज मठ संस्थान, गोटेगांव के भक्तों के लिए जनसेवा, पारदर्शिता और जानकारी हेतु बनाया गया है।",
    disclaimerPoint4Title: "४. गोपनीयता व मीडिया उपयोग",
    disclaimerPoint4Desc: "यहाँ प्रकाशित सभी तस्वीरें और रसीद प्रविष्टियाँ केवल सार्वजनिक पारदर्शिता हेतु हैं। इनका व्यावसायिक उपयोग सख्त वर्जित है।",
    disclaimerReportBtn: "त्रुटि सूचित करें / समिति से संपर्क करें",
    disclaimerAlertText: "नोट: यदि आपको इस वेबसाइट पर कोई गलत या गलती से दर्ज की गई जानकारी मिलती है, तो कृपया तुरंत +91 9000000000 पर सूचित करें।"
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

