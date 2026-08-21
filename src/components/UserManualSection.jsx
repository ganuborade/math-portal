import React, { useState } from 'react';
import { 
  BookOpen, Users, ShieldCheck, UserCheck, HeartHandshake, IndianRupee, Image as ImageIcon, 
  Calendar, MapPin, Search, CheckCircle2, ArrowRight, Smartphone, Sparkles, 
  HelpCircle, ChevronDown, ChevronUp, Lock, FileText, BellRing, Printer,
  Eye, RefreshCw, KeyRound, MessageSquare, Download
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function UserManualSection({ onOpenAdminLogin }) {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  
  const [activeRole, setActiveRole] = useState('user'); // 'user' | 'committee' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

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

  // Role details configuration
  const roleConfig = {
    user: {
      id: 'user',
      title: language === 'mr' ? '१. सर्वसामान्य भाविक व नागरिक' : (language === 'hi' ? '१. सर्वसामान्य भक्त एवं नागरिक' : '1. Devotees & Public Visitors'),
      badge: language === 'mr' ? 'सार्वजनिक वापर' : (language === 'hi' ? 'सार्वजनिक उपयोग' : 'Public Access'),
      desc: language === 'mr' 
        ? 'कोणत्याही लॉगिनशिवाय भाविक मठाचा इतिहास, फोटो, उत्सव, जमा-खर्च हिशोब पाहू शकतात आणि ऑनलाइन दान करू शकतात.' 
        : (language === 'hi' 
            ? 'बिना किसी लॉगिन के भक्त मठ का इतिहास, तस्वीरें, उत्सव, जमा-खर्च हिसाब देख सकते हैं और ऑनलाइन दान कर सकते हैं।' 
            : 'Without any login, visitors can explore Math history, photo gallery, festival schedule, live transparency accounts, and make voluntary donations.'),
      themeColor: 'from-amber-500 to-amber-600',
      activeBorder: 'border-amber-500 shadow-amber-500/20',
      icon: Users,
      badgeBg: isDark ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' : 'bg-amber-100 text-amber-900 border-amber-300',
      steps: [
        {
          stepNo: '०१',
          title: language === 'mr' ? 'इतिहास व गोटेगाव एकता जाणून घ्या' : (language === 'hi' ? 'इतिहास एवं गांव की एकता जानें' : 'Explore History & Village Unity'),
          desc: language === 'mr' 
            ? 'मठाचे जुने रूप, श्री मथुरा गिरी महाराज परंपरा आणि गोटेगाव ग्रामस्थांनी १००% स्वतःच्या लोकवर्गणीतून कसे नवीन मंदिर उभारले ते वाचा.' 
            : (language === 'hi' 
                ? 'मठ का पुराना स्वरूप, महाराज जी की परंपरा और ग्रामीणों द्वारा १००% जनसहयोग से निर्मित नए मंदिर का इतिहास पढ़ें।' 
                : 'Read about the heritage Math, legacy of Shri Mathur Giri Maharaj, and how Gotegaon villagers rebuilt the temple with 100% voluntary public funds.'),
          icon: BookOpen,
          actionText: language === 'mr' ? 'इतिहास वाचा' : (language === 'hi' ? 'इतिहास पढ़ें' : 'Read History'),
          actionTarget: 'history'
        },
        {
          stepNo: '०२',
          title: language === 'mr' ? 'फोटो गॅलरी पहा (Filter Photos)' : (language === 'hi' ? 'फोटो गैलरी देखें (फ़िल्टर सहित)' : 'View Photo Gallery with Filters'),
          desc: language === 'mr' 
            ? 'जुना मठ, बांधकाम टप्पे, नवीन भव्य मंदिर आणि उत्सवांची छायाचित्रे कॅटेगरीनुसार निवडून झूम करून पहा.' 
            : (language === 'hi' 
                ? 'पुराना मठ, निर्माण कार्य, नवीन भव्य मंदिर और उत्सवों की तस्वीरें श्रेणीनुसार फ़िल्टर करके देखें।' 
                : 'Browse through categories: Old Heritage, Construction Phase, New Temple, and Event Celebrations in high definition.'),
          icon: ImageIcon,
          actionText: language === 'mr' ? 'फोटो गॅलरी पहा' : (language === 'hi' ? 'गैलरी देखें' : 'Open Gallery'),
          actionTarget: 'gallery'
        },
        {
          stepNo: '०३',
          title: language === 'mr' ? 'वार्षिक उत्सव व कीर्तन कार्यक्रम तपासा' : (language === 'hi' ? 'वार्षिक उत्सव व कीर्तन कार्यक्रम देखें' : 'Check Upcoming Festivals & Feasts'),
          desc: language === 'mr' 
            ? 'महाराज जयंती, पुण्यतिथी, अखंड हरिनाम सप्ताह, प्रमुख कीर्तनकार आणि महाप्रसाद वेळेची माहिती मिळवा.' 
            : (language === 'hi' 
                ? 'महाराज जयंती, पुण्यतिथि, अखंड हरिनाम सप्ताह, प्रमुख कीर्तनकार और महाप्रसाद समय की जानकारी प्राप्त करें।' 
                : 'Stay informed about Jayanti, Punyatithi remembrance days, Harinam Saptah, Kirtankars, and Mahaprasad timings.'),
          icon: Calendar,
          actionText: language === 'mr' ? 'उत्सव यादी पहा' : (language === 'hi' ? 'उत्सव देखें' : 'View Events'),
          actionTarget: 'events'
        },
        {
          stepNo: '०४',
          title: language === 'mr' ? '१००% लोकवर्गणी हिशोब व पावती शोधा' : (language === 'hi' ? '१००% जनसहयोग हिसाब व रसीद खोजें' : 'Search Live Accounts & Transparency'),
          desc: language === 'mr' 
            ? 'जमा-खर्चाचा थेट हिशोब पहा. सर्च बारमध्ये आपले नाव किंवा पावती क्रमांक टाईप करून तुमची नोंद त्वरित पडताळा.' 
            : (language === 'hi' 
                ? 'जमा-व्यय का लाइव हिसाब देखें। सर्च बार में अपना नाम या रसीद नंबर डालकर अपनी प्रविष्टि तुरंत सत्यापित करें।' 
                : 'Verify every rupee collected and spent. Type your name or receipt number in the search bar to verify your donation record.'),
          icon: IndianRupee,
          actionText: language === 'mr' ? 'हिशोब तपासा' : (language === 'hi' ? 'हिसाब देखें' : 'Check Accounts'),
          actionTarget: 'transparency'
        },
        {
          stepNo: '०५',
          title: language === 'mr' ? 'UPI QR स्कॅन करून दान व पावती मिळवा' : (language === 'hi' ? 'UPI QR स्कैन कर दान व रसीद पाएं' : 'Donate via UPI QR & Get Receipt'),
          desc: language === 'mr' 
            ? 'GPay, PhonePe, Paytm द्वारे QR कोड स्कॅन करा किंवा बँक खात्यात पाठवा. स्क्रीनशॉट समिती सदस्यांच्या व्हॉट्सॲपवर पाठवून पावती मिळवा.' 
            : (language === 'hi' 
                ? 'GPay, PhonePe, Paytm से QR कोड स्कैन करें या बैंक में भेजें। स्क्रीनशॉट समिति सदस्यों को व्हाट्सएप भेजकर रसीद पाएं।' 
                : 'Scan the UPI QR code with any payment app or transfer to the bank account. WhatsApp screenshot to committee for an instant receipt.'),
          icon: HeartHandshake,
          actionText: language === 'mr' ? 'दान तपशील पहा' : (language === 'hi' ? 'दान विवरण' : 'Donate Now'),
          actionTarget: 'donate'
        },
        {
          stepNo: '०६',
          title: language === 'mr' ? 'गुगल मॅप्सवर स्थान व अभिप्राय द्या' : (language === 'hi' ? 'गूगल मैप्स पर स्थान व फीडबैक दें' : 'Google Maps Directions & Feedback'),
          desc: language === 'mr' 
            ? 'मठाचे अचूक गुगल मॅप्स लोकेशन मिळवा आणि गुगल फॉर्मद्वारे आपला अभिप्राय किंवा मठाचे फोटो अपलोड करा.' 
            : (language === 'hi' 
                ? 'मठ का सटीक गूगल मैप्स स्थान देखें और गूगल फॉर्म द्वारा अपना फीडबैक या तस्वीरें अपलोड करें।' 
                : 'Get driving directions to Gotegaon Math on Google Maps and submit your suggestions or photos via Google Form.'),
          icon: MapPin,
          actionText: language === 'mr' ? 'मॅप व फॉर्म उघडा' : (language === 'hi' ? 'मैप व फॉर्म' : 'Open Map & Feedback'),
          actionTarget: 'map-feedback'
        }
      ]
    },
    committee: {
      id: 'committee',
      title: language === 'mr' ? '२. समिती सदस्य व विश्वस्त' : (language === 'hi' ? '२. समिति सदस्य एवं ट्रस्टी' : '2. Committee Members & Trustees'),
      badge: language === 'mr' ? 'समिती अधिकृत कार्य' : (language === 'hi' ? 'समिति आधिकारिक कार्य' : 'Committee Member Portal'),
      desc: language === 'mr' 
        ? '५ सदस्यीय अधिकृत मध्यवर्ती समितीसाठी मार्गदर्शन: लॉगिन करणे, वर्गणी पडताळणी, डिजिटल पावती देणे आणि भाविकांना मदत.' 
        : (language === 'hi' 
            ? '५ सदस्यीय आधिकारिक केंद्रीय समिति हेतु मार्गदर्शन: लॉगिन करना, रसीद सत्यापन, डिजिटल रसीद भेजना और भक्त सहायता।' 
            : 'Operational manual for the 5-member core committee: Login authentication, donation verification, generating digital receipts, and coordinating temple services.'),
      themeColor: 'from-blue-500 to-indigo-600',
      activeBorder: 'border-blue-500 shadow-blue-500/20',
      icon: UserCheck,
      badgeBg: isDark ? 'bg-blue-950/80 text-blue-300 border-blue-500/40' : 'bg-blue-100 text-blue-900 border-blue-300',
      steps: [
        {
          stepNo: '०१',
          title: language === 'mr' ? 'समिती सुरक्षित लॉगिन (Login)' : (language === 'hi' ? 'समिति सुरक्षित लॉगिन (Login)' : 'Secure Committee Member Login'),
          desc: language === 'mr' 
            ? 'नेव्हिगेशन बारमधील "समिती लॉगिन" बटनावर क्लिक करा. संस्थानकडून दिलेले आपले अधिकृत युझरनेम व पासवर्ड टाका.' 
            : (language === 'hi' 
                ? 'नेविगेशन बार में "समिति लॉगिन" बटन पर क्लिक करें। संस्थान द्वारा दिया गया यूजरनेम व पासवर्ड दर्ज करें।' 
                : 'Click "Committee Login" in the top navbar. Enter your assigned official committee credentials to access authorized tools.'),
          icon: Lock,
          actionText: language === 'mr' ? 'समिती लॉगिन उघडा' : (language === 'hi' ? 'समिति लॉगिन खोलें' : 'Open Login'),
          actionCustom: () => onOpenAdminLogin()
        },
        {
          stepNo: '०२',
          title: language === 'mr' ? 'वर्गणी व बँक खात्याची पडताळणी' : (language === 'hi' ? 'दान व बैंक खाते का सत्यापन' : 'Verify Devotee Donations & Bank Credits'),
          desc: language === 'mr' 
            ? 'भाविकांनी व्हॉट्सॲपवर पाठवलेले UPI ट्रान्झॅक्शन आयडी किंवा बँक पावती अधिकृत खात्यातील जमा रकमेसह तपासा.' 
            : (language === 'hi' 
                ? 'भक्तों द्वारा व्हाट्सएप पर भेजे गए UPI ट्रांजैक्शन आईडी या बैंक पर्ची का मिलान आधिकारिक बैंक खाते से करें।' 
                : 'Cross-check UPI transaction IDs and payment screenshots sent by devotees on WhatsApp against official bank statements.'),
          icon: CheckCircle2,
          actionText: language === 'mr' ? 'समिती संपर्क पहा' : (language === 'hi' ? 'संपर्क देखें' : 'View Contacts'),
          actionTarget: 'donate'
        },
        {
          stepNo: '०३',
          title: language === 'mr' ? 'अधिकृत डिजिटल पावती व प्रमाणपत्र देणे' : (language === 'hi' ? 'डिजिटल रसीद व प्रमाणपत्र जारी करना' : 'Generate & Issue Digital Receipts'),
          desc: language === 'mr' 
            ? 'वर्गणीदाराच्या नावाने अधिकृत डिजिटल पावती तयार करा आणि व्हॉट्सॲपवर एका क्लिकमध्ये थेट भाविकास पाठवून द्या.' 
            : (language === 'hi' 
                ? 'दाता के नाम पर आधिकारिक डिजिटल रसीद तैयार करें और व्हाट्सएप पर एक क्लिक में सीधे भक्त को भेजें।' 
                : 'Issue official serialized digital donation receipts with temple emblem and dispatch directly to devotees via WhatsApp.'),
          icon: FileText,
          actionText: language === 'mr' ? 'हिशोब तपासा' : (language === 'hi' ? 'हिसाब देखें' : 'View Accounts'),
          actionTarget: 'transparency'
        },
        {
          stepNo: '०४',
          title: language === 'mr' ? 'उत्सव, कीर्तनकार व महाप्रसाद नियोजन' : (language === 'hi' ? 'उत्सव, कीर्तनकार व महाप्रसाद प्रबंधन' : 'Coordinate Utsav, Kirtan & Mahaprasad'),
          desc: language === 'mr' 
            ? 'अखंड हरिनाम सप्ताह, जयंती उत्सवातील कीर्तनकार, अन्नदान आणि भक्तांच्या राहण्याची व्यवस्था समन्वयित करा.' 
            : (language === 'hi' 
                ? 'अखंड हरिनाम सप्ताह, जयंती उत्सव के कीर्तनकार, अन्नदान और भक्तों की व्यवस्था का समन्वय करें।' 
                : 'Coordinate with invited Kirtankars, schedule volunteers for Annadaan feast distribution, and manage pilgrim crowd flow.'),
          icon: Calendar,
          actionText: language === 'mr' ? 'उत्सव वेळापत्रक' : (language === 'hi' ? 'उत्सव समय' : 'View Schedule'),
          actionTarget: 'events'
        },
        {
          stepNo: '०५',
          title: language === 'mr' ? 'ग्रामस्थ शंका निरसन व पारदर्शकता सादरीकरण' : (language === 'hi' ? 'ग्रामीणों की शंका समाधान व पारदर्शिता' : 'Devotee Inquiries & Transparency Briefing'),
          desc: language === 'mr' 
            ? 'गावातील बैठकीत किंवा फोनवर विचारणा करणाऱ्या भाविकांना थेट मोबाईलवर वेबसाईट दाखवून जमा-खर्च स्पष्ट करा.' 
            : (language === 'hi' 
                ? 'गांव की बैठक में या फोन पर पूछताछ करने वाले भक्तों को मोबाइल पर वेबसाइट खोलकर लाइव हिसाब समझाएं।' 
                : 'Show the live transparency ledger directly on smartphones during village meetings or over the phone to maintain 100% trust.'),
          icon: Smartphone,
          actionText: language === 'mr' ? 'थेट हिशोब उघडा' : (language === 'hi' ? 'लाइव हिसाब' : 'Open Ledger'),
          actionTarget: 'transparency'
        },
        {
          stepNo: '०६',
          title: language === 'mr' ? 'अध्यक्ष व ॲडमिनशी नियमित समन्वय' : (language === 'hi' ? 'अध्यक्ष व एडमिन के साथ नियमित समन्वय' : 'Liaison with President & Superadmin'),
          desc: language === 'mr' 
            ? 'खर्चाची बिले, नवीन कामांचे अंदाजपत्रक आणि तातडीच्या घोषणा अध्यक्ष बोराडे सर व ॲडमिनकडे मंजुरीसाठी सादर करा.' 
            : (language === 'hi' 
                ? 'व्यय के बिल, नए कार्यों का बजट और आवश्यक सूचनाएं अध्यक्ष बोराड़े सर एवं एडमिन को प्रस्तुत करें।' 
                : 'Submit expense vouchers, upcoming development plans, and urgent updates to President Borade Sir for portal publishing.'),
          icon: ShieldCheck,
          actionText: language === 'mr' ? 'अस्वीकरण व टीप' : (language === 'hi' ? 'अस्वीकरण' : 'Disclaimer'),
          actionTarget: 'disclaimer'
        }
      ]
    },
    admin: {
      id: 'admin',
      title: language === 'mr' ? '३. संस्थान ॲडमिन व अध्यक्ष (Admin)' : (language === 'hi' ? '३. संस्थान एडमिन व अध्यक्ष (Admin)' : '3. Sansthan Admin & President'),
      badge: language === 'mr' ? 'पूर्ण नियंत्रण अधिकार' : (language === 'hi' ? 'पूर्ण नियंत्रण अधिकार' : 'Full Administrator Control'),
      desc: language === 'mr' 
        ? 'संस्थान प्रशासक व अध्यक्षांसाठी संपूर्ण मार्गदर्शक: नवीन हिशोब नोंदी करणे, थेट अध्यक्षीय जाहीर सूचना बॅनर चालवणे, फोटो गॅलरी व्यवस्थापन आणि ऑडिट.' 
        : (language === 'hi' 
            ? 'संस्थान प्रशासक व अध्यक्ष हेतु सम्पूर्ण गाइड: नई हिसाब प्रविष्टियां, अध्यक्षीय लाइव सूचना बैनर, फोटो गैलरी प्रबंधन एवं ऑडिट।' 
            : 'Master guide for Sansthan Administrator & President: Managing financial ledger, publishing live marquee banners, photo gallery management, and audit exports.'),
      themeColor: 'from-purple-600 via-indigo-600 to-amber-600',
      activeBorder: 'border-purple-500 shadow-purple-500/20',
      icon: ShieldCheck,
      badgeBg: isDark ? 'bg-purple-950/80 text-purple-300 border-purple-500/40' : 'bg-purple-100 text-purple-900 border-purple-300',
      steps: [
        {
          stepNo: '०१',
          title: language === 'mr' ? 'ॲडमिन डॅशबोर्डवर प्रवेश करणे' : (language === 'hi' ? 'एडमिन डैशबोर्ड में प्रवेश' : 'Superadmin Dashboard Login'),
          desc: language === 'mr' 
            ? 'प्रशासकीय क्रेडेंशियल्सने लॉगिन केल्यावर संपूर्ण ॲडमिन कंट्रोल पॅनेल सक्रिय होतो, जिथून सर्व विभागांचे नियंत्रण करता येते.' 
            : (language === 'hi' 
                ? 'प्रशासकीय क्रेडेंशियल्स से लॉगिन करने पर पूरा एडमिन कंट्रोल पैनल सक्रिय होता है, जहाँ से सभी कार्य नियंत्रित होते हैं।' 
                : 'Log in with superadmin credentials to unlock the comprehensive Admin Control Center directly atop the website.'),
          icon: KeyRound,
          actionText: language === 'mr' ? 'ॲडमिन लॉगिन' : (language === 'hi' ? 'एडमिन लॉगिन' : 'Admin Login'),
          actionCustom: () => onOpenAdminLogin()
        },
        {
          stepNo: '०२',
          title: language === 'mr' ? 'नवीन जमा वर्गणी (+ Income) नोंदवणे' : (language === 'hi' ? 'नई प्राप्त जमा (+ Income) जोड़ना' : 'Record New Income / Donations'),
          desc: language === 'mr' 
            ? 'दाता नाव, गाव, दान प्रकार (बांधकाम, अन्नदान इ.), रक्कम आणि पावती क्रमांक टाकून "नोंद जोडा" वर क्लिक करा. हिशोब त्वरित अपडेट होतो.' 
            : (language === 'hi' 
                ? 'दाता का नाम, गांव, दान प्रकार (निर्माण, अन्नदान आदि), राशि व रसीद नंबर डालकर "जोड़ें" पर क्लिक करें। हिसाब तुरंत अपडेट होगा।' 
                : 'Enter donor name, location, donation type (Construction, Annadaan), amount, and receipt number to instantly reflect on public ledger.'),
          icon: IndianRupee,
          actionText: language === 'mr' ? 'पारदर्शकता पहा' : (language === 'hi' ? 'हिसाब देखें' : 'View Ledger'),
          actionTarget: 'transparency'
        },
        {
          stepNo: '०३',
          title: language === 'mr' ? 'मठ बांधकाम व उत्सव खर्च (- Expense) नोंदवणे' : (language === 'hi' ? 'मंदिर निर्माण व व्यय (- Expense) दर्ज करना' : 'Record Construction & Event Expenses'),
          desc: language === 'mr' 
            ? 'दगडी काम, सिमेंट, महाप्रसाद, ध्वनी यंत्रणा किंवा विद्युत कामाचा अधिकृत खर्च पावती व दिनांकानुसार अचूक नोंदवा.' 
            : (language === 'hi' 
                ? 'पत्थर नक्काशी, सीमेंट, महाप्रसाद, लाउडस्पीकर या बिजली कार्य का आधिकारिक व्यय रसीद व तारीख के साथ दर्ज करें।' 
                : 'Log all construction, stone carving, sound system, and feast expenses with voucher number, date, and description.'),
          icon: FileText,
          actionText: language === 'mr' ? 'हिशोब तपासा' : (language === 'hi' ? 'हिसाब देखें' : 'Check Accounts'),
          actionTarget: 'transparency'
        },
        {
          stepNo: '०४',
          title: language === 'mr' ? 'अध्यक्षीय थेट जाहीर सूचना (Live Marquee) प्रकाशित करणे' : (language === 'hi' ? 'अध्यक्षीय लाइव सूचना (Live Marquee) प्रकाशित करना' : 'Publish Live President Announcements'),
          desc: language === 'mr' 
            ? 'अध्यक्ष बोराडे सरांचा अधिकृत संदेश किंवा तातडीची नोटीस टाका. ती तात्काळ संपूर्ण वेबसाईटच्या शीर्षस्थानी स्क्रोलिंग बॅनरमध्ये झळकते.' 
            : (language === 'hi' 
                ? 'अध्यक्ष बोराड़े सर का आधिकारिक संदेश या आपातकालीन नोटिस दर्ज करें। यह तुरंत वेबसाइट के शीर्ष पर लाइव स्क्रॉल होगा।' 
                : 'Type official messages from President Borade Sir. The message instantly broadcasts as a golden marquee banner across the website header.'),
          icon: BellRing,
          actionText: language === 'mr' ? 'बॅनर पहा' : (language === 'hi' ? 'बैनर देखें' : 'Check Top Banner'),
          actionCustom: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        {
          stepNo: '०५',
          title: language === 'mr' ? 'फोटो गॅलरी व्यवस्थापन व नवीन छायाचित्रे' : (language === 'hi' ? 'फोटो गैलरी प्रबंधन व नई तस्वीरें' : 'Manage Gallery Photos & Milestones'),
          desc: language === 'mr' 
            ? 'नवीन बांधकाम प्रगती, उत्सवांचे सुंदर फोटो आणि ऐतिहासिक छायाचित्रे योग्य कॅटेगरीसह जोडा किंवा संपादन करा.' 
            : (language === 'hi' 
                ? 'नवीन निर्माण प्रगति, उत्सवों की तस्वीरें और ऐतिहासिक चित्र सही श्रेणी के साथ जोड़ें अथवा संपादित करें।' 
                : 'Add new high-resolution photos of ongoing developments, festivals, and heritage milestones with custom titles & categories.'),
          icon: ImageIcon,
          actionText: language === 'mr' ? 'गॅलरी उघडा' : (language === 'hi' ? 'गैलरी खोलें' : 'Open Gallery'),
          actionTarget: 'gallery'
        },
        {
          stepNo: '०६',
          title: language === 'mr' ? 'लेखापरीक्षण, डेटा सुरक्षा व बॅकअप (Audit & Security)' : (language === 'hi' ? 'ऑडिट, डेटा सुरक्षा एवं बैकअप' : 'Financial Audit, Security & Export'),
          desc: language === 'mr' 
            ? 'सर्व जमा-खर्चाचा ताळेबंद तपासा, शिल्लक बँक निधीचे ऑडिट करा आणि समिती सदस्यांचे सुरक्षित पासवर्ड व्यवस्थापन ठेवा.' 
            : (language === 'hi' 
                ? 'जमा-व्यय का ऑडिट करें, शेष बची बैंक राशि का सत्यापन करें और समिति सदस्यों के सुरक्षित पासवर्ड प्रबंधित करें।' 
                : 'Review total balance, audit financial receipts, export ledger summaries, and maintain secure session protocols.'),
          icon: ShieldCheck,
          actionText: language === 'mr' ? 'पारदर्शकता' : (language === 'hi' ? 'पारदर्शिता' : 'Transparency'),
          actionTarget: 'transparency'
        }
      ]
    }
  };

  // Comparison Matrix data
  const comparisonMatrix = [
    {
      feature: language === 'mr' ? 'इतिहास, उत्सव व फोटो गॅलरी पाहणे' : (language === 'hi' ? 'इतिहास, उत्सव व फोटो गैलरी देखना' : 'View History, Events & Gallery'),
      user: true,
      committee: true,
      admin: true
    },
    {
      feature: language === 'mr' ? '१००% जमा-खर्च हिशोब व पावती शोधणे' : (language === 'hi' ? '१००% जमा-खर्च हिसाब व रसीद खोजना' : 'Search Live Accounts & Receipts'),
      user: true,
      committee: true,
      admin: true
    },
    {
      feature: language === 'mr' ? 'UPI QR स्कॅन करून दान करणे' : (language === 'hi' ? 'UPI QR स्कैन करके दान करना' : 'Donate via UPI QR Code'),
      user: true,
      committee: true,
      admin: true
    },
    {
      feature: language === 'mr' ? 'गुगल मॅप्स व फीडबॅक/फोटो पाठवणे' : (language === 'hi' ? 'गूगल मैप्स व फीडबैक/फोटो भेजना' : 'Google Maps & Feedback Submission'),
      user: true,
      committee: true,
      admin: true
    },
    {
      feature: language === 'mr' ? 'समिती लॉगिन व वर्गणी पडताळणी' : (language === 'hi' ? 'समिति लॉगिन व दान सत्यापन' : 'Committee Login & Donor Verification'),
      user: false,
      committee: true,
      admin: true
    },
    {
      feature: language === 'mr' ? 'अधिकृत डिजिटल पावती देणे (WhatsApp)' : (language === 'hi' ? 'डिजिटल रसीद जारी करना (WhatsApp)' : 'Generate Official Digital Receipts'),
      user: false,
      committee: true,
      admin: true
    },
    {
      feature: language === 'mr' ? 'नवीन जमा/खर्च नोंदी जोडणे व संपादन' : (language === 'hi' ? 'नई जमा/खर्च प्रविष्टियां जोड़ना' : 'Add & Edit Financial Ledger Entries'),
      user: false,
      committee: false,
      admin: true
    },
    {
      feature: language === 'mr' ? 'अध्यक्षीय थेट जाहीर सूचना (Live Marquee) चालवणे' : (language === 'hi' ? 'अध्यक्षीय लाइव सूचना (Live Marquee) प्रकाशित करना' : 'Publish Live President Announcements'),
      user: false,
      committee: false,
      admin: true
    },
    {
      feature: language === 'mr' ? 'गॅलरी फोटो अपलोड व संस्था ऑडिट' : (language === 'hi' ? 'फोटो अपलोड व संपूर्ण संस्था ऑडिट' : 'Photo Management & Full Audit'),
      user: false,
      committee: false,
      admin: true
    }
  ];

  // FAQs
  const faqs = [
    {
      q: language === 'mr' ? '१. सामान्य भाविक या वेबसाईटवर काय काय करू शकतात?' : (language === 'hi' ? '१. सामान्य भक्त इस वेबसाइट पर क्या-क्या कर सकते हैं?' : '1. What can normal devotees do on this portal?'),
      a: language === 'mr' 
        ? 'सर्वसामान्य भाविक कोणत्याही नोंदणीशिवाय मठाचा संपूर्ण इतिहास वाचू शकतात, जुने व नवीन फोटो पाहू शकतात, आगामी उत्सव व कीर्तनाची तारीख तपासू शकतात, १००% जमा-खर्चाचा हिशोब स्वतःचे नाव टाकून तपासू शकतात, QR कोड स्कॅन करून दान करू शकतात, आणि गुगल मॅप्सवर मठाचे अचूक स्थान मिळवू शकतात.'
        : (language === 'hi'
            ? 'सामान्य भक्त बिना किसी लॉगिन के मठ का इतिहास, तस्वीरें, आगामी उत्सव, जनसहयोग हिसाब, दान QR कोड और गूगल मैप्स स्थान देख सकते हैं।'
            : 'Devotees can explore Math history, view photo gallery, check upcoming festival dates, verify 100% transparent donation accounts, donate via UPI QR, and navigate to the temple location via Google Maps.')
    },
    {
      q: language === 'mr' ? '२. दान केल्यावर डिजिटल पावती कशी व कधी मिळते?' : (language === 'hi' ? '२. दान करने के बाद डिजिटल रसीद कैसे और कब मिलती है?' : '2. How and when do I get a digital donation receipt?'),
      a: language === 'mr' 
        ? 'तुम्ही UPI QR कोड द्वारे किंवा बँक खात्यात रक्कम पाठवल्यानंतर त्याचा स्क्रीनशॉट वेबसाईटवरील ५ सदस्य समितीच्या (उदा. बोराडे सर +91 9000000000) व्हॉट्सॲपवर पाठवा. समिती पडताळणी करून त्वरित अधिकृत डिजिटल पावती पाठवून देते आणि तुमचे नाव पारदर्शकता विभागात नोंदवते.'
        : (language === 'hi'
            ? 'दान भेजने के बाद स्क्रीनशॉट समिति सदस्यों (बोराड़े सर +91 9000000000) को व्हाट्सएप करें। सत्यापन के तुरंत बाद आपको डिजिटल रसीद मिलेगी और आपका नाम सार्वजनिक हिसाब में दर्ज होगा।'
            : 'After sending donation via UPI or Bank, WhatsApp the screenshot to the committee members (e.g. Borade Sir +91 9000000000). They will verify and issue an official digital receipt immediately, recording your name on the live transparency ledger.')
    },
    {
      q: language === 'mr' ? '३. समिती सदस्यांना काय काय अधिकार आहेत?' : (language === 'hi' ? '३. समिति सदस्यों को क्या अधिकार हैं?' : '3. What privileges do Committee Members have?'),
      a: language === 'mr' 
        ? 'समिती सदस्यांना "समिती लॉगिन" द्वारे विशेष अधिकार मिळतात. ते भाविकांचे बँक व्यवहार तपासू शकतात, अधिकृत डिजिटल पावती तयार करून व्हॉट्सॲपवर पाठवू शकतात आणि उत्सव नियोजनात मदत करू शकतात.'
        : (language === 'hi'
            ? 'समिति सदस्य "समिति लॉगिन" के माध्यम से दान सत्यापन, डिजिटल रसीद जारी करना और उत्सव समन्वय का कार्य करते हैं।'
            : 'Committee members can log in using committee credentials to verify incoming donor transactions, issue verified digital donation receipts, and manage festival coordination.')
    },
    {
      q: language === 'mr' ? '४. ॲडमिन / अध्यक्ष संपूर्ण वेबसाईट कशी व्यवस्थापित करतात?' : (language === 'hi' ? '४. एडमिन / अध्यक्ष पूरी वेबसाइट कैसे प्रबंधित करते हैं?' : '4. How do the Admin and President manage the portal?'),
      a: language === 'mr' 
        ? 'संस्थान ॲडमिन व अध्यक्षांना पूर्ण नियंत्रण असते. ते नवीन जमा रक्कम व खर्चाची बिले नोंदवतात, शीर्षस्थानी लाइव्ह अध्यक्षीय सूचना (Marquee Banner) अपडेट करतात, नवीन फोटो अपलोड करतात आणि सर्व ताळेबंद व ऑडिट व्यवस्थापित करतात.'
        : (language === 'hi'
            ? 'एडमिन और अध्यक्ष नए जमा-खर्च रिकॉर्ड जोड़ते हैं, अध्यक्षीय लाइव नोटिस बैनर चलाते हैं, नई तस्वीरें अपलोड करते हैं और ऑडिट करते हैं।'
            : 'The Admin and President manage financial entries (incomes & expenses), broadcast live top announcement banners, upload photo gallery media, and oversee total auditing.')
    },
    {
      q: language === 'mr' ? '५. वेबसाईटवर भाषा किंवा डार्क मोड कसा बदलायचा?' : (language === 'hi' ? '५. वेबसाइट पर भाषा या डार्क मोड कैसे बदलें?' : '5. How to change Language or Dark/Light Mode?'),
      a: language === 'mr' 
        ? 'नेव्हिगेशन बारच्या उजव्या बाजूला "भाषा (Language)" ड्रॉपडाऊन आहे जिथून तुम्ही मराठी, English किंवा हिंदी निवडू शकता. शेजारील सूर्य/चंद्र आयकॉनवर क्लिक करून तुम्ही डार्क मोड किंवा लाइट मोड सुरू करू शकता.'
        : (language === 'hi'
            ? 'नेविगेशन बार के दाईं ओर "भाषा" से मराठी, English या हिंदी चुनें। साथ ही सूर्य/चंद्र आइकन से डार्क अथवा लाइट मोड टॉगल करें।'
            : 'Use the Language dropdown in the header to select Marathi, English, or Hindi. Click the Sun/Moon icon to toggle between comfortable Light and Dark modes.')
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
      className={`py-16 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-amber-500/20 text-slate-100' 
          : 'bg-gradient-to-b from-amber-50/70 via-white to-amber-50/50 border-amber-200 text-slate-900'
      }`}
    >
      {/* Background Decorative Spiritual Mandala Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase ${
            isDark ? 'bg-amber-950/80 text-amber-400 border-amber-500/40' : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>
              {language === 'mr' ? '📖 संपूर्ण वापर मार्गदर्शिका | User Manual' : (language === 'hi' ? '📖 सम्पूर्ण वापर गाइड | User Manual' : '📖 Unified Portal Guide & Manual')}
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight gold-gradient-text">
            {language === 'mr' ? 'संकेतस्थळ कसे वापरावे? (User Manual)' : (language === 'hi' ? 'वेबसाइट का उपयोग कैसे करें? (User Manual)' : 'How to Use This Website (User Manual)')}
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {language === 'mr' 
              ? 'सर्वसामान्य भाविक (Devotees), समिती सदस्य (Committee Members), आणि संस्थान ॲडमिन (Admin) यांच्यासाठी एकाच ठिकाणी सोपी सविस्तर नियमावली व मार्गदर्शक सूचना.' 
              : (language === 'hi' 
                  ? 'सर्वसामान्य भक्त (Devotees), समिति सदस्य (Committee Members) एवं संस्थान एडमिन (Admin) हेतु एक ही स्थान पर सरल एवं विस्तृत नियमावली।' 
                  : 'A complete step-by-step interactive handbook designed for Public Devotees, Committee Members, and Sansthan Administrators.')}
          </p>

          {/* Quick Search & Print Controls */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
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
                    ? 'मार्गदर्शिकेत शोधा (उदा. पावती, लॉगिन, हिशोब)...' 
                    : (language === 'hi' ? 'गाइड में खोजें (उदा. रसीद, लॉगिन, दान)...' : 'Search guide (e.g. receipt, login, accounts)...')
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

            <button
              onClick={handlePrint}
              title={language === 'mr' ? 'मार्गदर्शिका प्रिंट करा' : 'Print User Guide'}
              className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                isDark 
                  ? 'bg-slate-900 text-amber-300 border-amber-500/30 hover:bg-slate-800' 
                  : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200 shadow-sm'
              }`}
            >
              <Printer className="w-4 h-4 text-amber-500" />
              <span>{language === 'mr' ? 'मार्गदर्शिका प्रिंट करा (Print)' : (language === 'hi' ? 'गाइड प्रिंट करें' : 'Print Quick Guide')}</span>
            </button>
          </div>
        </div>

        {/* 3 Interactive Role Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Tab 1: Devotee / User */}
          <button
            onClick={() => setActiveRole('user')}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
              activeRole === 'user'
                ? `${roleConfig.user.activeBorder} ${isDark ? 'bg-amber-950/40' : 'bg-amber-50'} ring-2 ring-amber-500 scale-[1.02] shadow-xl`
                : `${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40' : 'bg-white border-amber-200 hover:border-amber-300'} opacity-85 hover:opacity-100`
            }`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl border ${
                activeRole === 'user' 
                  ? 'bg-amber-500 text-slate-950 border-amber-400' 
                  : `${isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-amber-100 border-amber-200 text-amber-800'}`
              }`}>
                <Users className="w-6 h-6" />
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${roleConfig.user.badgeBg}`}>
                {roleConfig.user.badge}
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <h3 className="font-heading font-bold text-base text-amber-500">
                {roleConfig.user.title}
              </h3>
              <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {roleConfig.user.desc}
              </p>
            </div>

            {activeRole === 'user' && (
              <div className="mt-3 flex items-center space-x-1 text-xs font-bold text-amber-500">
                <span>{language === 'mr' ? 'निवडलेली भूमिका' : (language === 'hi' ? 'चयनित भूमिका' : 'Active Role Guide')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </button>

          {/* Tab 2: Committee Member */}
          <button
            onClick={() => setActiveRole('committee')}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
              activeRole === 'committee'
                ? `${roleConfig.committee.activeBorder} ${isDark ? 'bg-blue-950/40' : 'bg-blue-50'} ring-2 ring-blue-500 scale-[1.02] shadow-xl`
                : `${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/40' : 'bg-white border-blue-100 hover:border-blue-200'} opacity-85 hover:opacity-100`
            }`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl border ${
                activeRole === 'committee' 
                  ? 'bg-blue-500 text-white border-blue-400' 
                  : `${isDark ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-100 border-blue-200 text-blue-800'}`
              }`}>
                <UserCheck className="w-6 h-6" />
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${roleConfig.committee.badgeBg}`}>
                {roleConfig.committee.badge}
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <h3 className="font-heading font-bold text-base text-blue-500">
                {roleConfig.committee.title}
              </h3>
              <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {roleConfig.committee.desc}
              </p>
            </div>

            {activeRole === 'committee' && (
              <div className="mt-3 flex items-center space-x-1 text-xs font-bold text-blue-500">
                <span>{language === 'mr' ? 'निवडलेली भूमिका' : (language === 'hi' ? 'चयनित भूमिका' : 'Active Role Guide')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </button>

          {/* Tab 3: Admin / Superadmin */}
          <button
            onClick={() => setActiveRole('admin')}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
              activeRole === 'admin'
                ? `${roleConfig.admin.activeBorder} ${isDark ? 'bg-purple-950/40' : 'bg-purple-50'} ring-2 ring-purple-500 scale-[1.02] shadow-xl`
                : `${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/40' : 'bg-white border-purple-100 hover:border-purple-200'} opacity-85 hover:opacity-100`
            }`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl border ${
                activeRole === 'admin' 
                  ? 'bg-purple-600 text-white border-purple-400' 
                  : `${isDark ? 'bg-slate-800 border-slate-700 text-purple-400' : 'bg-purple-100 border-purple-200 text-purple-800'}`
              }`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${roleConfig.admin.badgeBg}`}>
                {roleConfig.admin.badge}
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <h3 className="font-heading font-bold text-base text-purple-500">
                {roleConfig.admin.title}
              </h3>
              <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {roleConfig.admin.desc}
              </p>
            </div>

            {activeRole === 'admin' && (
              <div className="mt-3 flex items-center space-x-1 text-xs font-bold text-purple-500">
                <span>{language === 'mr' ? 'निवडलेली भूमिका' : (language === 'hi' ? 'चयनित भूमिका' : 'Active Role Guide')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </button>

        </div>

        {/* Selected Role Step-by-Step Instruction Cards */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-4 border-amber-500/20">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold flex items-center space-x-2 text-amber-500">
                <currentRoleData.icon className="w-5 h-5" />
                <span>{currentRoleData.title}</span>
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentRoleData.desc}
              </p>
            </div>
            <div className="text-xs font-semibold px-3 py-1 rounded-lg border bg-amber-500/10 border-amber-500/30 text-amber-400">
              {filteredSteps.length} {language === 'mr' ? 'मार्गदर्शक टप्पे' : (language === 'hi' ? 'गाइड स्टेप्स' : 'Action Steps')}
            </div>
          </div>

          {filteredSteps.length === 0 ? (
            <div className={`p-8 rounded-2xl border text-center space-y-3 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-200'
            }`}>
              <Search className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="text-sm font-semibold">
                {language === 'mr' ? 'कोणतेही परिणाम आढळले नाहीत' : 'No matching instructions found'}
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs text-amber-500 font-bold underline"
              >
                {language === 'mr' ? 'सर्च रीसेट करा' : 'Clear search'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={idx}
                    className={`rounded-2xl p-5 border transition-all hover:scale-[1.01] flex flex-col justify-between relative group ${
                      isDark 
                        ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40 shadow-lg' 
                        : 'bg-white border-amber-200 hover:border-amber-300 shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Step Number & Icon Header */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                          isDark ? 'bg-slate-950 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-900 border-amber-300'
                        }`}>
                          STEP {step.stepNo}
                        </span>
                        <div className={`p-2 rounded-xl border ${
                          isDark ? 'bg-slate-950 text-amber-400 border-slate-800' : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <h4 className="font-heading font-bold text-sm sm:text-base text-amber-500 leading-snug">
                        {step.title}
                      </h4>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {step.desc}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 mt-2 border-t border-slate-800/20">
                      {step.actionCustom ? (
                        <button
                          onClick={step.actionCustom}
                          className="w-full py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md"
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

        {/* 4-Step Quick Visual Flowchart for Everyone */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          isDark 
            ? 'bg-slate-900/60 border-amber-500/30' 
            : 'bg-gradient-to-r from-amber-100/50 via-white to-amber-100/50 border-amber-300'
        }`}>
          <div className="text-center space-y-1 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              {language === 'mr' ? 'जलद फ्लोचार्ट (Quick Workflow)' : 'Quick Workflow Flowchart'}
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-2xl gold-gradient-text">
              {language === 'mr' ? '४ सोप्या टप्प्यांत संपूर्ण पोर्टल वापर' : (language === 'hi' ? '४ आसान चरणों में पोर्टल का उपयोग' : '4-Step Complete Portal Journey')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className={`p-4 rounded-2xl border flex flex-col items-center text-center space-y-2 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-amber-200'
            }`}>
              <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-md">
                १
              </div>
              <h5 className="font-heading font-bold text-sm text-amber-500">
                {language === 'mr' ? 'पोर्टलवर या' : (language === 'hi' ? 'पोर्टल पर आएं' : 'Visit Portal')}
              </h5>
              <p className="text-[11px] opacity-80">
                {language === 'mr' ? 'मोबाईल किंवा कॉम्प्युटरवर कोणतीही नोंदणी न करता थेट प्रवेश.' : 'Open directly on any mobile or desktop device without registration.'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border flex flex-col items-center text-center space-y-2 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-amber-200'
            }`}>
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shadow-md">
                २
              </div>
              <h5 className="font-heading font-bold text-sm text-blue-500">
                {language === 'mr' ? 'माहिती व हिशोब पहा' : (language === 'hi' ? 'जानकारी व हिसाब देखें' : 'Explore & Audit')}
              </h5>
              <p className="text-[11px] opacity-80">
                {language === 'mr' ? 'इतिहास, फोटो, उत्सव व १००% जमा-खर्च पारदर्शकता तपासा.' : 'Browse heritage history, gallery photos, and live transparent funds.'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border flex flex-col items-center text-center space-y-2 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-amber-200'
            }`}>
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shadow-md">
                ३
              </div>
              <h5 className="font-heading font-bold text-sm text-emerald-500">
                {language === 'mr' ? 'दान व सहभाग' : (language === 'hi' ? 'दान व सहभाग' : 'Contribute & Pray')}
              </h5>
              <p className="text-[11px] opacity-80">
                {language === 'mr' ? 'UPI QR द्वारे स्वेच्छेने दान करा व व्हॉट्सॲपवर डिजिटल पावती मिळवा.' : 'Contribute voluntarily via UPI QR code and receive instant receipt.'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border flex flex-col items-center text-center space-y-2 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-amber-200'
            }`}>
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shadow-md">
                ४
              </div>
              <h5 className="font-heading font-bold text-sm text-purple-500">
                {language === 'mr' ? 'समितीशी थेट संवाद' : (language === 'hi' ? 'समिति से सीधा संवाद' : 'Connect & Visit')}
              </h5>
              <p className="text-[11px] opacity-80">
                {language === 'mr' ? 'मठाचे अचूक लोकेशन मिळवून दर्शनाला या व अभिप्राय नोंदवा.' : 'Get GPS directions to Gotegaon and connect with 5-member committee.'}
              </p>
            </div>

          </div>
        </div>

        {/* Role Comparison Table (भूमिका व सुविधा तक्ता) */}
        <div className={`rounded-3xl border overflow-hidden ${
          isDark ? 'bg-slate-900 border-amber-500/20' : 'bg-white border-amber-300 shadow-md'
        }`}>
          <div className="p-5 border-b border-amber-500/20 flex items-center justify-between">
            <h3 className="font-heading font-bold text-base sm:text-lg gold-gradient-text flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>
                {language === 'mr' ? 'भूमिका व सुविधा तुलना तक्ता (Role Comparison Matrix)' : 'Role Comparison & Feature Matrix'}
              </span>
            </h3>
            <span className="text-[11px] opacity-70">
              {language === 'mr' ? '३ स्तरांची सुरक्षा व पारदर्शकता' : '3-tier transparency'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b ${
                isDark ? 'bg-slate-950/90 border-slate-800 text-amber-300' : 'bg-amber-100/70 border-amber-200 text-amber-950'
              }`}>
                <tr>
                  <th className="py-3 px-4 font-bold">{language === 'mr' ? 'सुविधा / कार्य' : 'Feature / Action'}</th>
                  <th className="py-3 px-4 font-bold text-center text-amber-500">{language === 'mr' ? 'सर्वसामान्य भाविक' : 'Devotee'}</th>
                  <th className="py-3 px-4 font-bold text-center text-blue-500">{language === 'mr' ? 'समिती सदस्य' : 'Committee'}</th>
                  <th className="py-3 px-4 font-bold text-center text-purple-500">{language === 'mr' ? 'संस्थान ॲडमिन' : 'Admin'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {comparisonMatrix.map((row, idx) => (
                  <tr 
                    key={idx}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-slate-800/40' : 'hover:bg-amber-50/60'
                    }`}
                  >
                    <td className="py-3 px-4 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {row.user ? (
                        <span className="inline-flex items-center text-emerald-500 font-bold">✓ {language === 'mr' ? 'होय' : 'Yes'}</span>
                      ) : (
                        <span className="text-slate-500 opacity-60">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.committee ? (
                        <span className="inline-flex items-center text-blue-500 font-bold">✓ {language === 'mr' ? 'होय' : 'Yes'}</span>
                      ) : (
                        <span className="text-slate-500 opacity-60">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.admin ? (
                        <span className="inline-flex items-center text-purple-500 font-bold">✓ {language === 'mr' ? 'होय' : 'Yes'}</span>
                      ) : (
                        <span className="text-slate-500 opacity-60">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) Accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="text-center space-y-1">
            <h3 className="font-heading font-bold text-lg sm:text-2xl gold-gradient-text flex items-center justify-center space-x-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>
                {language === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न (FAQ)' : (language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)')}
              </span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'mr' ? 'वेबसाईट वापरताना येणाऱ्या शंकांची उत्तरे' : 'Quick answers to common questions about using the portal'}
            </p>
          </div>

          <div className="space-y-3">
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
                    className="w-full p-4 text-left flex items-center justify-between gap-3"
                  >
                    <span className="font-heading font-bold text-sm text-amber-500">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className={`px-4 pb-4 pt-1 text-xs leading-relaxed border-t ${
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

        {/* Devotional Quote Banner at the bottom of manual */}
        <div className={`p-6 rounded-2xl border text-center space-y-2 ${
          isDark ? 'bg-amber-950/30 border-amber-500/30 text-amber-200' : 'bg-amber-100/80 border-amber-300 text-amber-900'
        }`}>
          <div className="font-heading text-sm sm:text-base font-bold">
            ॥ शांतता, सत्य, एकता आणि १००% पारदर्शकता हीच श्री मथुरा गिरी महाराजांची शिकवण ॥
          </div>
          <p className="text-xs opacity-80">
            {language === 'mr' 
              ? 'कोणत्याही मदतीसाठी किंवा माहितीच्या पडताळणीसाठी अधिकृत ५ सदस्य समितीशी संपर्क साधा: +91 9000000000 (अध्यक्ष: बोराडे सर)' 
              : 'For official support or verification: +91 9000000000 (President: Borade Sir)'}
          </p>
        </div>

      </div>
    </section>
  );
}
