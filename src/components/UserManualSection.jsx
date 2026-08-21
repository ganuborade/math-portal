import React, { useState } from 'react';
import { 
  BookOpen, Users, ShieldCheck, UserCheck, HeartHandshake, IndianRupee, Image as ImageIcon, 
  Calendar, MapPin, Search, CheckCircle2, ArrowRight, Smartphone, Sparkles, 
  HelpCircle, ChevronDown, ChevronUp, Lock, FileText, BellRing, Printer,
  Eye, RefreshCw, KeyRound, MessageSquare, Download, X, Lightbulb, PhoneCall
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function UserManualSection({ onOpenAdminLogin }) {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  
  const [activeRole, setActiveRole] = useState('user'); // 'user' | 'committee' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handlePrint = () => {
    window.print();
  };

  // Simplified and intuitive Role details for normal people
  const roleConfig = {
    user: {
      id: 'user',
      title: language === 'mr' ? '१. सामान्य भाविक व नागरिक' : (language === 'hi' ? '१. सामान्य भक्त एवं नागरिक' : '1. Devotees & Public Visitors'),
      badge: language === 'mr' ? 'कोणतेही लॉगिन नको' : (language === 'hi' ? 'बिना किसी लॉगिन' : 'Free Open Access'),
      desc: language === 'mr' 
        ? 'सर्वसामान्य भाविकांसाठी अत्यंत सोपे: मठाचा इतिहास वाचा, जुने-नवीन फोटो पहा, १००% जमा-खर्च तपासा आणि QR कोडने दान करा.' 
        : (language === 'hi' 
            ? 'सामान्य भक्तों हेतु सरल: मठ का इतिहास पढ़ें, तस्वीरें देखें, १००% हिसाब चेक करें और QR कोड से दान करें।' 
            : 'Super easy for visitors: Explore heritage history, photo gallery, check live accounts, and donate via UPI.'),
      themeColor: 'from-amber-500 to-amber-600',
      activeBorder: 'border-amber-500 shadow-amber-500/20',
      icon: Users,
      badgeBg: isDark ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' : 'bg-amber-100 text-amber-900 border-amber-300',
      steps: [
        {
          stepNo: '१',
          title: language === 'mr' ? 'इतिहास व गोटेगावची एकता वाचा' : (language === 'hi' ? 'इतिहास व गांव की एकता पढ़ें' : 'Read History & Village Unity'),
          desc: language === 'mr' 
            ? 'जुना मठ, श्री मथुरागिरी महाराजांचा वारसा आणि गोटेगाव ग्रामस्थांनी १००% लोकवर्गणीतून उभारलेले नवीन मंदिर याबद्दल माहिती मिळवा.' 
            : (language === 'hi' 
                ? 'पुराना मठ, महाराज जी की परंपरा और ग्रामीणों के जनसहयोग से निर्मित नए मंदिर का इतिहास जानें।' 
                : 'Learn about the heritage Math, Shri Mathur Giri Maharaj, and the temple built purely from public contributions.'),
          icon: BookOpen,
          actionText: language === 'mr' ? 'इतिहास वाचा' : (language === 'hi' ? 'इतिहास पढ़ें' : 'Read History'),
          actionTarget: 'history'
        },
        {
          stepNo: '२',
          title: language === 'mr' ? 'जुने व नवीन फोटो पहा (Gallery)' : (language === 'hi' ? 'पुरानी व नई तस्वीरें देखें' : 'View Photo Gallery'),
          desc: language === 'mr' 
            ? 'जुना मठ, बांधकाम टप्पे, नवीन भव्य मंदिर आणि वार्षिक उत्सवांचे सुंदर फोटो झूम करून पहा.' 
            : (language === 'hi' 
                ? 'पुराना मठ, निर्माण कार्य, नवीन मंदिर एवं उत्सवों की सुंदर तस्वीरें देखें।' 
                : 'Browse photos of old heritage math, construction progress, new temple, and annual festivities.'),
          icon: ImageIcon,
          actionText: language === 'mr' ? 'फोटो गॅलरी पहा' : (language === 'hi' ? 'गैलरी देखें' : 'Open Gallery'),
          actionTarget: 'gallery'
        },
        {
          stepNo: '३',
          title: language === 'mr' ? '१००% जमा-खर्च हिशोब तपासा' : (language === 'hi' ? '१००% जमा-खर्च हिसाब देखें' : 'Check Transparent Accounts'),
          desc: language === 'mr' 
            ? 'जमा-खर्च विभागात जाऊन सर्च बारमध्ये आपले नाव किंवा पावती नंबर टाईप करा. तुमची देणगी नोंद लगेच दिसेल.' 
            : (language === 'hi' 
                ? 'हिसाब सेक्शन में अपना नाम या रसीद नंबर डालकर अपनी दान प्रविष्टि तुरंत चेक करें।' 
                : 'Search your name or receipt number in the transparency ledger to verify your recorded donation.'),
          icon: IndianRupee,
          actionText: language === 'mr' ? 'हिशोब तपासा' : (language === 'hi' ? 'हिसाब देखें' : 'Check Accounts'),
          actionTarget: 'transparency'
        },
        {
          stepNo: '४',
          title: language === 'mr' ? 'QR कोड स्कॅन करून दान करा' : (language === 'hi' ? 'QR कोड स्कैन कर दान करें' : 'Donate via UPI QR Code'),
          desc: language === 'mr' 
            ? 'GPay, PhonePe, Paytm ने QR कोड स्कॅन करून स्वेच्छेने दान करा. स्क्रीनशॉट व्हॉट्सॲपवर पाठवून अधिकृत पावती मिळवा.' 
            : (language === 'hi' 
                ? 'GPay, PhonePe, Paytm से QR कोड स्कैन कर दान करें और स्क्रीनशॉट भेजकर डिजिटल रसीद पाएं।' 
                : 'Scan the UPI QR code using any payment app and WhatsApp screenshot to committee for an official receipt.'),
          icon: HeartHandshake,
          actionText: language === 'mr' ? 'दान तपशील पहा' : (language === 'hi' ? 'दान विवरण' : 'Donate Now'),
          actionTarget: 'donate'
        },
        {
          stepNo: '५',
          title: language === 'mr' ? 'उत्सव व कीर्तन वेळापत्रक पहा' : (language === 'hi' ? 'उत्सव व कीर्तन समय देखें' : 'Check Upcoming Events'),
          desc: language === 'mr' 
            ? 'महाराज जयंती, पुण्यतिथी, अखंड हरिनाम सप्ताह, नामांकित कीर्तनकार आणि महाप्रसादाची अचूक तारीख जाणून घ्या.' 
            : (language === 'hi' 
                ? 'जयंती, पुण्यतिथि, अखंड हरिनाम सप्ताह, प्रमुख कीर्तनकार और महाप्रसाद समय की जानकारी प्राप्त करें।' 
                : 'Stay updated on Jayanti, Punyatithi remembrance days, Harinam Saptah, and Mahaprasad timings.'),
          icon: Calendar,
          actionText: language === 'mr' ? 'उत्सव यादी पहा' : (language === 'hi' ? 'उत्सव देखें' : 'View Events'),
          actionTarget: 'events'
        },
        {
          stepNo: '६',
          title: language === 'mr' ? 'गुगल मॅप्सवर रस्ता व अभिप्राय' : (language === 'hi' ? 'गूगल मैप्स लोकेशन व फीडबैक' : 'Map Directions & Feedback'),
          desc: language === 'mr' 
            ? 'गोटेगाव मठात दर्शनासाठी अचूक गुगल मॅप्स लोकेशन मिळवा आणि फॉर्मद्वारे तुमचा अभिप्राय किंवा फोटो पाठवा.' 
            : (language === 'hi' 
                ? 'मठ के दर्शन हेतु सटीक गूगल मैप्स लोकेशन प्राप्त करें और फीडबैक या फोटो भेजें।' 
                : 'Get driving directions to Gotegaon Math on Google Maps and submit your suggestions or photos.'),
          icon: MapPin,
          actionText: language === 'mr' ? 'मॅप व फॉर्म उघडा' : (language === 'hi' ? 'मैप व फॉर्म' : 'Open Map & Feedback'),
          actionTarget: 'map-feedback'
        }
      ]
    },
    committee: {
      id: 'committee',
      title: language === 'mr' ? '२. समिती सदस्य व विश्वस्त' : (language === 'hi' ? '२. समिति सदस्य एवं ट्रस्टी' : '2. Committee Members & Trustees'),
      badge: language === 'mr' ? 'अधिकृत ५ सदस्य समिती' : (language === 'hi' ? 'आधिकारिक ५ सदस्य समिति' : '5-Member Core Committee'),
      desc: language === 'mr' 
        ? 'संस्थानच्या ५ सदस्यीय समितीसाठी सोपी कार्यपद्धती: पासवर्डने लॉगिन करणे, देणग्या तपासणे, डिजिटल पावती देणे आणि भाविकांना मदत.' 
        : (language === 'hi' 
            ? 'संस्थान की ५ सदस्यीय समिति हेतु मार्गदर्शन: लॉगिन, दान सत्यापन, डिजिटल रसीद जारी करना और भक्त सहायता।' 
            : 'Operational manual for the 5-member committee: Login, donation verification, and digital receipt dispatch.'),
      themeColor: 'from-blue-500 to-indigo-600',
      activeBorder: 'border-blue-500 shadow-blue-500/20',
      icon: UserCheck,
      badgeBg: isDark ? 'bg-blue-950/80 text-blue-300 border-blue-500/40' : 'bg-blue-100 text-blue-900 border-blue-300',
      steps: [
        {
          stepNo: '१',
          title: language === 'mr' ? 'समिती सुरक्षित लॉगिन (Login)' : (language === 'hi' ? 'समिति सुरक्षित लॉगिन' : 'Committee Member Login'),
          desc: language === 'mr' 
            ? 'वरच्या नेव्हिगेशन बारमध्ये "समिती लॉगिन" बटनावर क्लिक करा आणि संस्थानने दिलेला पासवर्ड टाका.' 
            : (language === 'hi' 
                ? 'ऊपर नेविगेशन बार में "समिति लॉगिन" बटन दबाकर अपना अधिकृत पासवर्ड दर्ज करें।' 
                : 'Click "Committee Login" in navbar and enter your assigned credentials to access authorized tools.'),
          icon: Lock,
          actionText: language === 'mr' ? 'समिती लॉगिन उघडा' : (language === 'hi' ? 'लॉगिन खोलें' : 'Open Login'),
          actionCustom: () => onOpenAdminLogin()
        },
        {
          stepNo: '२',
          title: language === 'mr' ? 'भाविकांच्या देणग्यांची पडताळणी' : (language === 'hi' ? 'दान राशि का मिलान व सत्यापन' : 'Verify Devotee Donations'),
          desc: language === 'mr' 
            ? 'भाविकांनी व्हॉट्सॲपवर पाठवलेले UPI स्क्रीनशॉट बँकेच्या खात्याशी पडताळून खात्री करा.' 
            : (language === 'hi' 
                ? 'भक्तों द्वारा व्हाट्सएप भेजे गए UPI स्क्रीनशॉट का मिलान बैंक स्टेटमेंट से करें।' 
                : 'Cross-verify UPI transaction IDs sent by devotees against official bank statements.'),
          icon: CheckCircle2,
          actionText: language === 'mr' ? 'समिती संपर्क पहा' : (language === 'hi' ? 'संपर्क देखें' : 'View Contacts'),
          actionTarget: 'donate'
        },
        {
          stepNo: '३',
          title: language === 'mr' ? 'व्हॉट्सॲपवर डिजिटल पावती पाठवणे' : (language === 'hi' ? 'व्हाट्सएप पर डिजिटल रसीद भेजना' : 'Issue Digital Receipts'),
          desc: language === 'mr' 
            ? 'वर्गणीदाराच्या नावाने अधिकृत डिजिटल पावती तयार करून एका क्लिकवर थेट भाविकाच्या व्हॉट्सॲपवर पाठवून द्या.' 
            : (language === 'hi' 
                ? 'दाता के नाम पर आधिकारिक रसीद तैयार कर एक क्लिक में सीधे व्हाट्सएप पर भेजें।' 
                : 'Issue official serialized digital donation receipts with temple stamp directly to WhatsApp.'),
          icon: FileText,
          actionText: language === 'mr' ? 'हिशोब तपासा' : (language === 'hi' ? 'हिसाब देखें' : 'View Accounts'),
          actionTarget: 'transparency'
        },
        {
          stepNo: '४',
          title: language === 'mr' ? 'अध्यक्ष बोराडे सरांशी समन्वय' : (language === 'hi' ? 'अध्यक्ष महोदय से समन्वय' : 'Coordination with President'),
          desc: language === 'mr' 
            ? 'खर्चाची बिले, नवीन बांधकामाचे नियोजन आणि आवश्यक सूचना अध्यक्ष बोराडे सरांकडे मान्यतेसाठी सादर करा.' 
            : (language === 'hi' 
                ? 'खर्च के बिल और आवश्यक सूचनाएं अध्यक्ष बोराड़े सर को अनुमोदन हेतु प्रस्तुत करें।' 
                : 'Coordinate all expenses, development plans, and emergency updates with President Borade Sir.'),
          icon: ShieldCheck,
          actionText: language === 'mr' ? 'समिती संपर्क' : (language === 'hi' ? 'समिति संपर्क' : 'Committee Contacts'),
          actionTarget: 'donate'
        }
      ]
    },
    admin: {
      id: 'admin',
      title: language === 'mr' ? '३. संस्थान ॲडमिन व अध्यक्ष' : (language === 'hi' ? '३. संस्थान एडमिन व अध्यक्ष' : '3. Sansthan Admin & President'),
      badge: language === 'mr' ? 'पूर्ण नियंत्रण अधिकार' : (language === 'hi' ? 'पूर्ण नियंत्रण अधिकार' : 'Full Administrator Control'),
      desc: language === 'mr' 
        ? 'संस्थान अध्यक्ष व ॲडमिनसाठी: नवीन जमा/खर्च हिशोब नोंदी करणे, थेट अध्यक्षीय जाहीर सूचना बॅनर चालवणे आणि फोटो व्यवस्थापन.' 
        : (language === 'hi' 
            ? 'संस्थान एडमिन व अध्यक्ष हेतु: नए जमा/खर्च रिकॉर्ड जोड़ना, अध्यक्षीय लाइव नोटिस बैनर चलाना और फोटो प्रबंधन।' 
            : 'Master guide for Administrator & President: Managing financial ledger, publishing live marquee, and photo gallery.'),
      themeColor: 'from-purple-600 to-indigo-600',
      activeBorder: 'border-purple-500 shadow-purple-500/20',
      icon: ShieldCheck,
      badgeBg: isDark ? 'bg-purple-950/80 text-purple-300 border-purple-500/40' : 'bg-purple-100 text-purple-900 border-purple-300',
      steps: [
        {
          stepNo: '१',
          title: language === 'mr' ? 'ॲडमिन कंट्रोल पॅनेल लॉगिन' : (language === 'hi' ? 'एडमिन कंट्रोल पैनल लॉगिन' : 'Admin Dashboard Login'),
          desc: language === 'mr' 
            ? 'प्रशासकीय पासवर्डने लॉगिन केल्यावर वेबसाईटवर थेट ॲडमिन कंट्रोल बार सुरू होतो.' 
            : (language === 'hi' 
                ? 'एडमिन पासवर्ड से लॉगिन करने पर मुख्य कंट्रोल पैनल अनलॉक हो जाता है।' 
                : 'Log in with superadmin credentials to unlock the management bar on the portal.'),
          icon: KeyRound,
          actionText: language === 'mr' ? 'ॲडमिन लॉगिन' : (language === 'hi' ? 'एडमिन लॉगिन' : 'Admin Login'),
          actionCustom: () => onOpenAdminLogin()
        },
        {
          stepNo: '२',
          title: language === 'mr' ? 'नवीन जमा (+ Income) व खर्च (- Expense) नोंदवणे' : (language === 'hi' ? 'नई जमा व खर्च प्रविष्टियां जोड़ना' : 'Add Income & Expense Records'),
          desc: language === 'mr' 
            ? 'दाता नाव, गाव, रक्कम आणि पावती क्रमांक टाकून "नोंद जोडा" करा. हिशोब ताबडतोब वेबसाईटवर अपडेट होतो.' 
            : (language === 'hi' 
                ? 'दाता का नाम, गांव, राशि और रसीद नंबर डालकर रिकॉर्ड जोड़ें। हिसाब तुरंत लाइव होगा।' 
                : 'Record donor details, amount, voucher numbers, and construction expenses in real time.'),
          icon: IndianRupee,
          actionText: language === 'mr' ? 'पारदर्शकता पहा' : (language === 'hi' ? 'हिसाब देखें' : 'View Ledger'),
          actionTarget: 'transparency'
        },
        {
          stepNo: '३',
          title: language === 'mr' ? 'अध्यक्षीय थेट सूचना बॅनर (Live Marquee) चालवणे' : (language === 'hi' ? 'अध्यक्षीय लाइव सूचना (Live Marquee) चलाना' : 'Publish Live President Announcements'),
          desc: language === 'mr' 
            ? 'अध्यक्ष बोराडे सरांचा संदेश किंवा तातडीची नोटीस टाका. ती तात्काळ वेबसाईटच्या शीर्षस्थानी पिवळ्या बॅनरमध्ये स्क्रोल होते.' 
            : (language === 'hi' 
                ? 'अध्यक्ष बोराड़े सर का आधिकारिक संदेश दर्ज करें। यह तुरंत वेबसाइट के शीर्ष पर स्क्रॉल होगा।' 
                : 'Broadcast instant golden marquee banners across the website top for urgent notices.'),
          icon: BellRing,
          actionText: language === 'mr' ? 'बॅनर पहा' : (language === 'hi' ? 'बैनर देखें' : 'Check Top Banner'),
          actionCustom: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        {
          stepNo: '४',
          title: language === 'mr' ? 'नवीन फोटो जोडणे व संपूर्ण ऑडिट' : (language === 'hi' ? 'नई तस्वीरें जोड़ना व सम्पूर्ण ऑडिट' : 'Photo Gallery & Total Audit'),
          desc: language === 'mr' 
            ? 'बांधकामाचे प्रगती फोटो, उत्सवांचे फोटो जोडा आणि जमा-खर्चाचा ताळेबंद व बँक बॅलन्स तपासा.' 
            : (language === 'hi' 
                ? 'निर्माण कार्य और उत्सवों की तस्वीरें अपलोड करें और जमा-खर्च बैलेंस ऑडिट करें।' 
                : 'Upload recent temple photos and audit cumulative balance and records.'),
          icon: ImageIcon,
          actionText: language === 'mr' ? 'गॅलरी उघडा' : (language === 'hi' ? 'गैलरी खोलें' : 'Open Gallery'),
          actionTarget: 'gallery'
        }
      ]
    }
  };

  // Frequently Asked Questions (FAQ) - Simple language
  const faqs = [
    {
      q: language === 'mr' ? '१. सर्वसामान्य भाविक या वेबसाईटवर काय काय करू शकतात?' : (language === 'hi' ? '१. सामान्य भक्त इस वेबसाइट पर क्या-क्या कर सकते हैं?' : '1. What can normal devotees do on this portal?'),
      a: language === 'mr' 
        ? 'कोणत्याही लॉगिनशिवाय भाविक मठाचा संपूर्ण इतिहास वाचू शकतात, जुने-नवीन फोटो पाहू शकतात, १००% जमा-खर्चाचा हिशोब स्वतःचे नाव टाकून तपासू शकतात, QR कोड स्कॅन करून दान करू शकतात, आणि गुगल मॅप्सवर मठाचे अचूक लोकेशन मिळवू शकतात.'
        : (language === 'hi'
            ? 'बिना किसी लॉगिन के भक्त मठ का इतिहास, तस्वीरें, आगामी उत्सव, जनसहयोग हिसाब, दान QR कोड और गूगल मैप्स स्थान देख सकते हैं।'
            : 'Devotees can explore Math history, view photo gallery, check upcoming festival dates, verify 100% transparent donation accounts, donate via UPI QR, and navigate to the temple location via Google Maps.')
    },
    {
      q: language === 'mr' ? '२. दान केल्यावर डिजिटल पावती कशी व कधी मिळते?' : (language === 'hi' ? '२. दान करने के बाद डिजिटल रसीद कैसे और कब मिलती है?' : '2. How and when do I get a digital donation receipt?'),
      a: language === 'mr' 
        ? 'तुम्ही UPI QR कोड द्वारे किंवा बँकेत रक्कम पाठवल्यानंतर त्याचा स्क्रीनशॉट समिती सदस्यांच्या (उदा. अध्यक्ष: बोराडे सर +91 9000000000) व्हॉट्सॲपवर पाठवा. समिती पडताळणी करून लगेच अधिकृत डिजिटल पावती पाठवून देते आणि तुमचे नाव हिशोबात नोंदवते.'
        : (language === 'hi'
            ? 'दान भेजने के बाद स्क्रीनशॉट समिति सदस्यों (बोराड़े सर +91 9000000000) को व्हाट्सएप करें। सत्यापन के तुरंत बाद आपको डिजिटल रसीद मिलेगी और आपका नाम सार्वजनिक हिसाब में दर्ज होगा।'
            : 'After sending donation via UPI or Bank, WhatsApp the screenshot to the committee members (e.g. Borade Sir +91 9000000000). They will verify and issue an official digital receipt immediately, recording your name on the live transparency ledger.')
    },
    {
      q: language === 'mr' ? '३. मला जमा-खर्चात माझे नाव कसे शोधायचे?' : (language === 'hi' ? '३. मुझे हिसाब में अपना नाम कैसे खोजना है?' : '3. How do I search for my donation record?'),
      a: language === 'mr' 
        ? 'वेबसाईटवरील "पारदर्शकता व हिशोब" विभागात जा. तिथे असलेल्या सर्च बारमध्ये तुमचे नाव किंवा पावती नंबर टाईप करा. तुमची नोंद तात्काळ स्क्रीनवर दिसेल.'
        : (language === 'hi' 
            ? 'वेबसाइट पर "पारदर्शिता व हिसाब" सेक्शन में जाएं और सर्च बार में अपना नाम या रसीद नंबर टाइप करें। आपकी प्रविष्टि तुरंत दिखेगी।'
            : 'Go to the "Transparency & Accounts" section. Type your name or receipt number in the search bar to see your entry instantly.')
    },
    {
      q: language === 'mr' ? '४. समिती सदस्यांशी संपर्क कसा साधायचा?' : (language === 'hi' ? '४. समिति सदस्यों से संपर्क कैसे करें?' : '4. How to contact committee members?'),
      a: language === 'mr' 
        ? 'वेबसाईटच्या "दान व संपर्क" विभागात ५ अधिकृत समिती सदस्यांचे मोबाईल नंबर दिलेले आहेत. आपण थेट कॉल किंवा व्हॉट्सॲप करू शकता.'
        : (language === 'hi' 
            ? '"दान व संपर्क" सेक्शन में ५ अधिकृत समिति सदस्यों के फोन नंबर दिए गए हैं। आप सीधे कॉल या व्हाट्सएप कर सकते हैं।'
            : 'All 5 official committee contact numbers are listed in the "Donate & Contact" section for direct phone calls and WhatsApp.')
    },
    {
      q: language === 'mr' ? '५. वेबसाईटवर भाषा किंवा डार्क मोड कसा बदलायचा?' : (language === 'hi' ? '५. वेबसाइट पर भाषा या डार्क मोड कैसे बदलें?' : '5. How to change Language or Dark/Light Mode?'),
      a: language === 'mr' 
        ? 'नेव्हिगेशन बारच्या उजव्या बाजूला "भाषा" पर्यायातून मराठी, English किंवा हिंदी निवडा. शेजारील सूर्य/चंद्र आयकॉनवर क्लिक करून डार्क किंवा लाइट मोड निवडा.'
        : (language === 'hi' 
            ? 'ऊपर दाईं ओर "भाषा" से मराठी, English या हिंदी चुनें। सूर्य/चंद्र आइकन से डार्क अथवा लाइट मोड टॉगल करें।'
            : 'Use the Language dropdown in the header to pick Marathi, English, or Hindi, and click the Sun/Moon icon to toggle themes.')
    }
  ];

  const currentRoleData = roleConfig[activeRole];

  // Filter steps if user searched
  const filteredSteps = currentRoleData.steps.filter(step => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return step.title.toLowerCase().includes(query) || step.desc.toLowerCase().includes(query);
  });

  return (
    <section 
      id="user-manual" 
      className={`py-14 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-amber-500/20 text-slate-100' 
          : 'bg-gradient-to-b from-amber-50/70 via-white to-amber-50/50 border-amber-200 text-slate-900'
      }`}
    >
      {/* Background Decorative Soft Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase ${
            isDark ? 'bg-amber-950/80 text-amber-400 border-amber-500/40' : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>
              {language === 'mr' ? '📖 सोपी वापर मार्गदर्शिका | Easy User Guide' : (language === 'hi' ? '📖 सरल उपयोग गाइड | User Guide' : '📖 Easy Portal User Guide')}
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight gold-gradient-text">
            {language === 'mr' ? 'वेबसाईट कशी वापरावी? (अतिशय सोपी नियमावली)' : (language === 'hi' ? 'वेबसाइट का उपयोग कैसे करें? (सरल गाइड)' : 'How to Use This Website (Simple Guide)')}
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {language === 'mr' 
              ? 'सर्वसामान्य भाविक, समिती सदस्य आणि ग्रामस्थांसाठी मठाचे संकेतस्थळ वापरण्याची अतिशय सोपी व स्पष्ट माहिती.' 
              : (language === 'hi' 
                  ? 'सर्वसामान्य भक्तों, समिति सदस्यों और ग्रामीणों के लिए वेबसाइट उपयोग की सरल एवं स्पष्ट जानकारी।' 
                  : 'A simple, devotee-friendly step-by-step guide for browsing, checking accounts, and contributing.')}
          </p>

          {/* Quick Search & Print Controls */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className={`relative w-full sm:w-80 flex items-center rounded-xl border px-3 py-2 ${
              isDark ? 'bg-slate-900 border-amber-500/30' : 'bg-white border-amber-300 shadow-sm'
            }`}>
              <Search className="w-4 h-4 text-amber-500 shrink-0 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'mr' 
                    ? 'शोधा (उदा. पावती, दान, हिशोब)...' 
                    : (language === 'hi' ? 'खोजें (उदा. रसीद, दान, हिसाब)...' : 'Search guide (e.g. receipt, donate)...')
                }
                className="bg-transparent text-xs w-full focus:outline-none placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-amber-500 ml-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Print Button that opens the crystal-clear Printable Handbook & Print Trigger */}
            <button
              onClick={() => setShowPrintModal(true)}
              title={language === 'mr' ? 'मार्गदर्शिका प्रिंट करा किंवा PDF जतन करा' : 'Print User Manual or Save PDF'}
              className="px-4 py-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'mr' ? '📄 संपूर्ण मार्गदर्शिका प्रिंट करा (Print / PDF)' : (language === 'hi' ? '📄 गाइड प्रिंट करें (Print / PDF)' : '📄 Print Manual (PDF)')}</span>
            </button>
          </div>
        </div>

        {/* 4 Simple Highlights for Everyone (फक्त ४ सोप्या गोष्टी) */}
        <div className={`p-5 sm:p-6 rounded-3xl border ${
          isDark 
            ? 'bg-slate-900/70 border-amber-500/30' 
            : 'bg-gradient-to-r from-amber-100/60 via-white to-amber-100/60 border-amber-300 shadow-sm'
        }`}>
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
            <h3 className="font-heading font-bold text-base sm:text-lg gold-gradient-text">
              {language === 'mr' ? '✨ फक्त ४ गोष्टी समजून घ्या (Quick 4 Steps)' : (language === 'hi' ? '✨ सिर्फ ४ आसान बातें (Quick 4 Steps)' : '✨ 4 Simple Highlights for Everyone')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <div 
              onClick={() => scrollToSection('history')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex items-start space-x-3 ${
                isDark ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/50' : 'bg-white border-amber-200 hover:border-amber-400'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 font-bold flex items-center justify-center shrink-0 border border-amber-500/30">
                १
              </div>
              <div className="space-y-0.5">
                <h5 className="font-heading font-bold text-xs sm:text-sm text-amber-500">
                  {language === 'mr' ? 'इतिहास व फोटो पहा' : (language === 'hi' ? 'इतिहास व फोटो देखें' : 'History & Photos')}
                </h5>
                <p className="text-[11px] opacity-80 leading-snug">
                  {language === 'mr' ? 'जुना मठ, नवीन मंदिर व महाराजांची माहिती.' : 'Old heritage, new temple & legacy.'}
                </p>
              </div>
            </div>

            <div 
              onClick={() => scrollToSection('transparency')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex items-start space-x-3 ${
                isDark ? 'bg-slate-950/80 border-slate-800 hover:border-blue-500/50' : 'bg-white border-blue-100 hover:border-blue-300'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-500 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">
                २
              </div>
              <div className="space-y-0.5">
                <h5 className="font-heading font-bold text-xs sm:text-sm text-blue-500">
                  {language === 'mr' ? 'जमा-खर्च हिशोब तपासा' : (language === 'hi' ? 'जमा-खर्च हिसाब चेक करें' : 'Live Accounts')}
                </h5>
                <p className="text-[11px] opacity-80 leading-snug">
                  {language === 'mr' ? 'आपले नाव टाकून पावती लगेच शोधा.' : 'Search donor names & receipts.'}
                </p>
              </div>
            </div>

            <div 
              onClick={() => scrollToSection('donate')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex items-start space-x-3 ${
                isDark ? 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50' : 'bg-white border-emerald-100 hover:border-emerald-300'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 font-bold flex items-center justify-center shrink-0 border border-emerald-500/30">
                ३
              </div>
              <div className="space-y-0.5">
                <h5 className="font-heading font-bold text-xs sm:text-sm text-emerald-500">
                  {language === 'mr' ? 'QR कोडने दान करा' : (language === 'hi' ? 'QR कोड से दान करें' : 'Donate via QR')}
                </h5>
                <p className="text-[11px] opacity-80 leading-snug">
                  {language === 'mr' ? 'GPay/PhonePe ने दान व पावती मिळवा.' : 'Instant UPI payment & WhatsApp receipt.'}
                </p>
              </div>
            </div>

            <div 
              onClick={() => scrollToSection('map-feedback')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex items-start space-x-3 ${
                isDark ? 'bg-slate-950/80 border-slate-800 hover:border-purple-500/50' : 'bg-white border-purple-100 hover:border-purple-300'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-500 font-bold flex items-center justify-center shrink-0 border border-purple-500/30">
                ४
              </div>
              <div className="space-y-0.5">
                <h5 className="font-heading font-bold text-xs sm:text-sm text-purple-500">
                  {language === 'mr' ? 'स्थान व समिती संपर्क' : (language === 'hi' ? 'स्थान व समिति संपर्क' : 'Location & Help')}
                </h5>
                <p className="text-[11px] opacity-80 leading-snug">
                  {language === 'mr' ? 'गुगल मॅप्स रस्ता व ५ सदस्यांचे नंबर.' : 'GPS directions & committee helpline.'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Interactive Role Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Tab 1: Devotee / User */}
          <button
            onClick={() => setActiveRole('user')}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
              activeRole === 'user'
                ? `${roleConfig.user.activeBorder} ${isDark ? 'bg-amber-950/50' : 'bg-amber-50'} ring-2 ring-amber-500 shadow-lg scale-[1.01]`
                : `${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40' : 'bg-white border-amber-200 hover:border-amber-300'} opacity-85 hover:opacity-100`
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`p-2.5 rounded-xl border ${
                  activeRole === 'user' 
                    ? 'bg-amber-500 text-slate-950 border-amber-400' 
                    : `${isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-amber-100 border-amber-200 text-amber-800'}`
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-amber-500">
                    {roleConfig.user.title}
                  </h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block mt-0.5 ${roleConfig.user.badgeBg}`}>
                    {roleConfig.user.badge}
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* Tab 2: Committee Member */}
          <button
            onClick={() => setActiveRole('committee')}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
              activeRole === 'committee'
                ? `${roleConfig.committee.activeBorder} ${isDark ? 'bg-blue-950/50' : 'bg-blue-50'} ring-2 ring-blue-500 shadow-lg scale-[1.01]`
                : `${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/40' : 'bg-white border-blue-100 hover:border-blue-200'} opacity-85 hover:opacity-100`
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`p-2.5 rounded-xl border ${
                  activeRole === 'committee' 
                    ? 'bg-blue-500 text-white border-blue-400' 
                    : `${isDark ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-100 border-blue-200 text-blue-800'}`
                }`}>
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-blue-500">
                    {roleConfig.committee.title}
                  </h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block mt-0.5 ${roleConfig.committee.badgeBg}`}>
                    {roleConfig.committee.badge}
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* Tab 3: Admin / Superadmin */}
          <button
            onClick={() => setActiveRole('admin')}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
              activeRole === 'admin'
                ? `${roleConfig.admin.activeBorder} ${isDark ? 'bg-purple-950/50' : 'bg-purple-50'} ring-2 ring-purple-500 shadow-lg scale-[1.01]`
                : `${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/40' : 'bg-white border-purple-100 hover:border-purple-200'} opacity-85 hover:opacity-100`
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`p-2.5 rounded-xl border ${
                  activeRole === 'admin' 
                    ? 'bg-purple-600 text-white border-purple-400' 
                    : `${isDark ? 'bg-slate-800 border-slate-700 text-purple-400' : 'bg-purple-100 border-purple-200 text-purple-800'}`
                }`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-purple-500">
                    {roleConfig.admin.title}
                  </h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block mt-0.5 ${roleConfig.admin.badgeBg}`}>
                    {roleConfig.admin.badge}
                  </span>
                </div>
              </div>
            </div>
          </button>

        </div>

        {/* Selected Role Instruction Cards */}
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b pb-3 border-amber-500/20">
            <div>
              <h3 className="font-heading text-base sm:text-lg font-bold flex items-center space-x-2 text-amber-500">
                <currentRoleData.icon className="w-5 h-5" />
                <span>{currentRoleData.title}</span>
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentRoleData.desc}
              </p>
            </div>
          </div>

          {filteredSteps.length === 0 ? (
            <div className={`p-6 rounded-2xl border text-center space-y-2 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-200'
            }`}>
              <Search className="w-6 h-6 text-amber-500 mx-auto" />
              <p className="text-xs font-semibold">
                {language === 'mr' ? 'कोणतीही माहिती सापडली नाही' : 'No matching instructions found'}
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs text-amber-500 font-bold underline"
              >
                {language === 'mr' ? 'सर्च रीसेट करा' : 'Clear search'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={idx}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                      isDark 
                        ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40 shadow-md' 
                        : 'bg-white border-amber-200 hover:border-amber-300 shadow-sm'
                    }`}
                  >
                    <div className="space-y-2.5">
                      {/* Step Header */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
                          isDark ? 'bg-slate-950 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-900 border-amber-300'
                        }`}>
                          टप्पा {step.stepNo}
                        </span>
                        <div className={`p-1.5 rounded-xl border ${
                          isDark ? 'bg-slate-950 text-amber-400 border-slate-800' : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <h4 className="font-heading font-bold text-sm text-amber-500 leading-snug">
                        {step.title}
                      </h4>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {step.desc}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 mt-3 border-t border-slate-800/20">
                      {step.actionCustom ? (
                        <button
                          onClick={step.actionCustom}
                          className="w-full py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{step.actionText}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => scrollToSection(step.actionTarget)}
                          className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 ${
                            isDark 
                              ? 'bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border-amber-500/30' 
                              : 'bg-amber-50 hover:bg-amber-500 hover:text-white text-amber-900 border-amber-300'
                          }`}
                        >
                          <span>{step.actionText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Frequently Asked Questions (FAQ) Accordion */}
        <div className="space-y-3 max-w-4xl mx-auto">
          <div className="text-center space-y-1 mb-2">
            <h3 className="font-heading font-bold text-base sm:text-xl gold-gradient-text flex items-center justify-center space-x-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>
                {language === 'mr' ? 'वारंवार विचारले जाणारे ५ साधे प्रश्न (FAQ)' : (language === 'hi' ? 'अक्सर पूछे जाने वाले ५ सरल प्रश्न (FAQ)' : '5 Common Questions & Answers')}
              </span>
            </h3>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDark 
                      ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/30' 
                      : 'bg-white border-amber-200 hover:border-amber-300 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3"
                  >
                    <span className="font-heading font-bold text-xs sm:text-sm text-amber-500">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className={`px-4 pb-3.5 pt-1 text-xs leading-relaxed border-t ${
                      isDark ? 'text-slate-300 border-slate-800' : 'text-slate-700 border-amber-100'
                    }`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Devotional Bottom Banner */}
        <div className={`p-4 sm:p-5 rounded-2xl border text-center space-y-1.5 ${
          isDark ? 'bg-amber-950/30 border-amber-500/30 text-amber-200' : 'bg-amber-100/80 border-amber-300 text-amber-900'
        }`}>
          <div className="font-heading text-xs sm:text-sm font-bold">
            ॥ शांतता, सत्य, निष्काम सेवा आणि १००% पारदर्शकता ॥
          </div>
          <p className="text-[11px] opacity-80">
            {language === 'mr' 
              ? 'कोणत्याही मदतीसाठी अधिकृत ५ सदस्य समितीशी संपर्क साधा: +91 9000000000 (अध्यक्ष: बोराडे सर)' 
              : 'For any assistance: +91 9000000000 (President: Borade Sir)'}
          </p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* EXCLUSIVE PRINTABLE HANDBOOK MODAL & DOM ELEMENT (NEVER SHOWS BLANK PAGE) */}
      {/* ========================================================================= */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print">
          <div className="relative max-w-4xl w-full bg-slate-900 p-4 sm:p-6 rounded-3xl border-2 border-amber-500/60 shadow-2xl space-y-4">
            
            {/* Modal Header Controls */}
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div className="flex items-center space-x-2 text-amber-400">
                <Printer className="w-5 h-5" />
                <h3 className="font-heading font-bold text-base sm:text-lg">
                  {language === 'mr' ? 'मार्गदर्शिका प्रिंट प्रिव्ह्यू (Print Preview)' : 'User Manual Print Preview'}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md active:scale-95 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'mr' ? 'आता प्रिंट करा (Print Now)' : 'Print Now'}</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Preview Area */}
            <div className="max-h-[70vh] overflow-y-auto p-4 bg-white rounded-2xl text-slate-900 border border-amber-200">
              <PrintableManualContent language={language} />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <span>{language === 'mr' ? 'टीप: प्रिंटर संवादामध्ये "Save as PDF" निवडून PDF सेव्ह करू शकता.' : 'Tip: Select "Save as PDF" to download as a digital file.'}</span>
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
              >
                {language === 'mr' ? 'बंद करा (Close)' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Hidden/Direct In-DOM Printable Container targeted by CSS @media print */}
      <div id="printable-user-manual" className="hidden print:block">
        <PrintableManualContent language={language} />
      </div>

    </section>
  );
}

// Dedicated Clean High-Contrast Printable Manual Component
function PrintableManualContent({ language }) {
  return (
    <div className="p-4 sm:p-6 text-slate-900 bg-white space-y-5 font-sans">
      
      {/* Official Temple Header */}
      <div className="text-center border-b-2 border-amber-600 pb-3 space-y-1">
        <div className="text-xs font-bold uppercase tracking-widest text-amber-800">
          ॥ श्री मथुरा गिरी महाराज प्रसन्न ॥
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-amber-900">
          श्री मथुरा गिरी महाराज मठ संस्थान, गोटेगाव
        </h1>
        <p className="text-xs font-medium text-slate-700">
          मु. पो. गोटेगाव, ता. केज, जि. बीड - ४३१५१७ | १००% ग्रामस्थ लोकवर्गणी निर्मित भव्य तीर्थक्षेत्र
        </p>
        <div className="inline-block mt-1 px-3 py-0.5 rounded-full border border-amber-600 bg-amber-50 text-[11px] font-bold text-amber-900">
          अधिकृत संकेतस्थळ वापर मार्गदर्शिका (Official Website User Manual)
        </div>
      </div>

      {/* Section 1: For Normal Devotees */}
      <div className="border border-amber-300 rounded-xl p-4 bg-amber-50/40 space-y-2">
        <h3 className="text-sm font-bold text-amber-900 border-b border-amber-200 pb-1 flex items-center justify-between">
          <span>१. सर्वसामान्य भाविकांसाठी सोपे मार्गदर्शन (Devotee Guide)</span>
          <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded text-amber-950 font-bold">कोणतेही लॉगिन नको</span>
        </h3>
        <ul className="text-xs space-y-1.5 text-slate-800 list-disc list-inside">
          <li><strong>इतिहास व फोटो:</strong> मठाचा प्राचीन इतिहास, श्री मथुरागिरी महाराजांचा वारसा आणि जुन्या-नवीन मंदिराची छायाचित्रे पहा.</li>
          <li><strong>१००% जमा-खर्च हिशोब:</strong> पारदर्शकता विभागात आपले नाव किंवा पावती नंबर शोधून आपली देणगी नोंद त्वरित पडताळा.</li>
          <li><strong>UPI द्वारे दान:</strong> वेबसाईटवरील QR कोड GPay/PhonePe/Paytm द्वारे स्कॅन करून स्वेच्छेने दान करा.</li>
          <li><strong>डिजिटल पावती:</strong> देणगी दिल्यावर स्क्रीनशॉट समितीच्या व्हॉट्सॲपवर पाठवा; लगेच अधिकृत डिजिटल पावती मिळेल.</li>
          <li><strong>उत्सव व दर्शन:</strong> वार्षिक जयंती, पुण्यतिथी, कीर्तन वेळापत्रक आणि गुगल मॅप्सवर मठाचा रस्ता पहा.</li>
        </ul>
      </div>

      {/* Section 2: For Committee Members */}
      <div className="border border-blue-300 rounded-xl p-4 bg-blue-50/40 space-y-2">
        <h3 className="text-sm font-bold text-blue-950 border-b border-blue-200 pb-1 flex items-center justify-between">
          <span>२. अधिकृत ५ सदस्य समिती मार्गदर्शन (Committee Portal)</span>
          <span className="text-[10px] bg-blue-200 px-2 py-0.5 rounded text-blue-950 font-bold">अधिकृत सदस्य</span>
        </h3>
        <ul className="text-xs space-y-1.5 text-slate-800 list-disc list-inside">
          <li><strong>समिती लॉगिन:</strong> वरच्या मेनूतील "समिती लॉगिन" बटनावर क्लिक करून अधिकृत पासवर्डने प्रवेश करा.</li>
          <li><strong>देणगी पडताळणी:</strong> भाविकांनी पाठवलेले UPI स्क्रीनशॉट बँकेतील जमा रकमेसह तपासा.</li>
          <li><strong>डिजिटल पावती देणे:</strong> वर्गणीदाराच्या नावाने अधिकृत डिजिटल पावती तयार करून एका क्लिकमध्ये थेट व्हॉट्सॲपवर पाठवा.</li>
          <li><strong>उत्सव व नियोजन:</strong> कीर्तनकार, अन्नदान महाप्रसाद आणि भक्तांच्या व्यवस्थेचे योग्य नियोजन करा.</li>
        </ul>
      </div>

      {/* Section 3: For Admin / President */}
      <div className="border border-purple-300 rounded-xl p-4 bg-purple-50/40 space-y-2">
        <h3 className="text-sm font-bold text-purple-950 border-b border-purple-200 pb-1 flex items-center justify-between">
          <span>३. संस्थान ॲडमिन व अध्यक्ष मार्गदर्शन (Admin & President Control)</span>
          <span className="text-[10px] bg-purple-200 px-2 py-0.5 rounded text-purple-950 font-bold">पूर्ण नियंत्रण</span>
        </h3>
        <ul className="text-xs space-y-1.5 text-slate-800 list-disc list-inside">
          <li><strong>हिशोब नोंदी:</strong> नवीन जमा वर्गणी (+ Income) आणि बांधकाम/उत्सव खर्च (- Expense) पावतीसह नोंदवा.</li>
          <li><strong>थेट अध्यक्षीय सूचना बॅनर (Live Marquee):</strong> महत्त्वाच्या घोषणा वेबसाईटच्या शीर्षस्थानी चालवा.</li>
          <li><strong>फोटो गॅलरी:</strong> नवीन बांधकामाची व उत्सवांची छायाचित्रे योग्य कॅटेगरीसह जोडा.</li>
          <li><strong>लेखापरीक्षण (Audit):</strong> एकूण ताळेबंद, शिल्लक निधी आणि सुरक्षिततेचे संपूर्ण ऑडिट करा.</li>
        </ul>
      </div>

      {/* Official Contacts & Banking Info Box */}
      <div className="border-2 border-amber-600 rounded-xl p-3 bg-amber-100/60 text-xs space-y-1.5">
        <div className="font-bold text-amber-950 text-center">
          ॥ अधिकृत संपर्क, मदत केंद्र व बँक तपशील ॥
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
          <div>
            <p><strong>📞 अध्यक्ष:</strong> बोराडे सर (+91 9000000000)</p>
            <p><strong>📍 स्थान:</strong> श्री क्षेत्र गोटेगाव, ता. केज, जि. बीड</p>
          </div>
          <div>
            <p><strong>🏦 बँक:</strong> बँक ऑफ महाराष्ट्र | खाते: श्री मथुरागिरी महाराज मठ</p>
            <p><strong>📱 UPI ID:</strong> 9000000000@upi (GPay / PhonePe)</p>
          </div>
        </div>
      </div>

      {/* Devotional Footer Stamp */}
      <div className="text-center text-[10px] text-slate-600 pt-2 border-t border-slate-200">
        ॥ शांतता, सत्य, एकता आणि १००% पारदर्शकता हीच आमची परंपरा ॥ गोटेगाव ग्रामस्थ मठ समिती
      </div>

    </div>
  );
}
