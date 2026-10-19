import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
import { 
  ArrowRight, 
  Code2, 
  Smartphone, 
  TrendingUp, 
  CheckCircle2, 
  X, 
  Menu, 
  ChevronRight, 
  Search, 
  Plus, 
  Minus, 
  Star, 
  ShieldCheck, 
  Award, 
  Send, 
  ChevronDown,
  Phone,
  Mail,
  Globe2,
  Palette,
  Zap,
  Check,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

/* =========================================================================
   DATA STRUCTURES (MATCHING EXACT SCREENSHOT NAVIGATION & CONTENT)
   ========================================================================= */

const SERVICES_DROPDOWN_DATA = {
  categories: [
    { id: 'app', name: 'App Development', icon: Smartphone },
    { id: 'marketing', name: 'Digital Marketing', icon: TrendingUp },
    { id: 'branding', name: 'Brand Designing', icon: Palette },
    { id: 'web', name: 'Website Development', icon: Globe2 },
    { id: 'software', name: 'Software Development', icon: Code2 },
  ],
  content: {
    app: {
      title: 'App Development',
      tagline: 'Build Apps That Define Experiences',
      desc: 'Native and cross-platform apps engineered for scale, speed and seamless UX across every device.',
      columns: [
        { title: 'Native Platforms', items: ['iOS App Development', 'Android App Development', 'Java App Development'] },
        { title: 'Cross-Platform', items: ['Flutter App Development', 'React Native Development', 'Hybrid App Development'] }
      ]
    },
    marketing: {
      title: 'Digital Marketing',
      tagline: 'Data-Driven Growth & Conversions',
      desc: 'Scalable multi-channel campaigns engineered to maximize ROI, customer acquisition, and search dominance.',
      columns: [
        { title: 'Performance', items: ['SEO Optimization', 'PPC & Paid Media', 'Conversion Rate Optimization'] },
        { title: 'Social & Funnels', items: ['Social Media Growth', 'Email Marketing Automation', 'Growth Analytics'] }
      ]
    },
    branding: {
      title: 'Brand Designing',
      tagline: 'Memorable Aesthetic Identity',
      desc: 'Crafting distinct dark-mode design systems, micro-interactions, and visual identities that captivate audiences.',
      columns: [
        { title: 'Visual Identity', items: ['UI/UX Wireframing', 'Design Systems', 'Logo & Brand Guidelines'] },
        { title: 'Interactive', items: ['WebGL & 3D Assets', 'Motion Design', 'Micro-interactions'] }
      ]
    },
    web: {
      title: 'Website Development',
      tagline: 'High-Performance Web Platforms',
      desc: 'Lightning-fast Next.js, React, and modular microservice architectures built for sub-second responses.',
      columns: [
        { title: 'Frontend Systems', items: ['Next.js Architecture', 'React Enterprise Apps', 'Tailwind & UI Frameworks'] },
        { title: 'Backend & Cloud', items: ['Node.js & Microservices', 'Cloud Infrastructure', 'Secure API Gateways'] }
      ]
    },
    software: {
      title: 'Software Development',
      tagline: 'Enterprise-Grade Solutions',
      desc: 'Robust custom software, CRM systems, and AI-powered workflows to automate and elevate business efficiency.',
      columns: [
        { title: 'Custom Systems', items: ['Enterprise ERP & CRM', 'Cloud Migration', 'Database Architecture'] },
        { title: 'AI & Automation', items: ['LLM Workflow Integration', 'Custom Chatbots', 'Predictive Analytics'] }
      ]
    }
  }
};

const INDUSTRIES_DATA = [
  { id: 'healthcare', name: 'Healthcare', tag: 'HIPAA & Telehealth', desc: 'Secure patient portals and telehealth systems.' },
  { id: 'fintech', name: 'Fintech', tag: 'Payments & Banking', desc: 'Real-time financial ledgers and multi-currency portals.' },
  { id: 'ecommerce', name: 'E-commerce', tag: 'Marketplaces & Retail', desc: 'High-converting luxury retail and multi-vendor platforms.' },
  { id: 'education', name: 'Education', tag: 'LMS & EdTech', desc: 'Interactive remote learning and assessment systems.' },
  { id: 'realestate', name: 'Real Estate', tag: 'PropTech & Portals', desc: 'Virtual property showcases and CRM management.' },
  { id: 'fitness', name: 'Fitness', tag: 'Workout & Wearables', desc: 'Real-time sync fitness apps and analytics.' },
  { id: 'construction', name: 'Construction', tag: 'Site & Asset Mgmt', desc: 'Asset tracking and contractor management portals.' },
  { id: 'energy', name: 'Energy & Utilities', tag: 'Smart Grid & IoT', desc: 'IoT telemetry and green energy monitoring.' },
  { id: 'insurtech', name: 'Insurtech', tag: 'Claims & Risk AI', desc: 'Automated policy issuance and claims processing.' },
  { id: 'travel', name: 'Travel', tag: 'Booking & Loyalty', desc: 'Global booking engines and loyalty reward systems.' },
  { id: 'banking', name: 'Banking', tag: 'Core & NeoBanking', desc: 'Secure retail banking core modernization.' },
  { id: 'manufacturing', name: 'Manufacturing', tag: 'Industry 4.0 & Supply', desc: 'Automated factory pipelines and tracking.' },
  { id: 'oilgas', name: 'Oil & Gas', tag: 'Upstream & Ops', desc: 'Operational safety monitoring and analytics.' },
  { id: 'restaurant', name: 'Restaurant', tag: 'Ordering & Delivery', desc: 'Omnichannel food ordering systems.' },
  { id: 'sportstech', name: 'Sports Tech', tag: 'Analytics & Fan UX', desc: 'Live match engagement platforms.' },
  { id: 'telecom', name: 'Telecom', tag: '5G & Telecom Tech', desc: 'Next-gen network operations portals.' },
  { id: 'petrochemical', name: 'Petrochemical', tag: 'Process Automation', desc: 'Industrial process automation systems.' }
];

const ABOUT_DROPDOWN_DATA = {
  company: [
    { title: 'About Us', desc: 'Technologists, creatives, and strategists building tomorrow’s digital products.' },
    { title: 'Team', desc: 'Meet our elite in-house product engineers and design leads.' },
    { title: 'Vision & Mission', desc: 'Driving digital utilization and global technological empowerment.' }
  ],
  resources: [
    { title: 'Career', desc: 'Join our growing team of engineers and innovators.' },
    { title: 'CSR', desc: 'Giving back to tech education and digital literacy.' },
    { title: 'Testimonial', desc: 'See what our enterprise partners say about our work.' }
  ],
  awards: [
    { title: 'Top App Dev Company', rating: '4.9/5 Clutch Rating' },
    { title: 'Best Digital Agency', rating: 'Designrush — 2023' },
    { title: 'Google Premier Partner', rating: 'Certified 2022–2025' }
  ]
};

const SERVICES_GRID = [
  {
    icon: Smartphone,
    title: 'Mobile App Engineering',
    desc: 'Native iOS/Android and cross-platform Flutter/React Native solutions built for sub-second performance.',
    tags: ['iOS', 'Android', 'Flutter', 'React Native']
  },
  {
    icon: Globe2,
    title: 'Web Platforms & Next.js',
    desc: 'Modern web applications, SaaS dashboards, and headless ecommerce platforms with zero cumulative layout shift.',
    tags: ['Next.js', 'React', 'Node.js', 'Tailwind']
  },
  {
    icon: Cpu,
    title: 'AI & Machine Learning',
    desc: 'Integration of LLMs, custom workflow bots, predictive analytics, and automated decision engines.',
    tags: ['LLMs', 'OpenAI', 'Python', 'LangChain']
  },
  {
    icon: Palette,
    title: 'Brand System & UI/UX',
    desc: 'Dark-mode first design languages, micro-interactions, motion design, and enterprise design tokens.',
    tags: ['Figma', 'Design Systems', 'Micro-UX']
  }
];

const TECH_STACK = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Flutter', 
  'React Native', 'Python', 'AWS', 'Docker', 'GraphQL', 'Tailwind', 'Framer Motion'
];

const CASE_STUDIES = [
  {
    id: 'fintech',
    tab: 'Fintech Portal',
    title: 'Omnichannel Digital Banking Suite',
    desc: 'Re-engineered core banking UI to support 2M+ active monthly transactions with real-time biometric authorization.',
    metrics: ['+140% Daily Engagements', '99.99% Uptime', '0.4s Auth Speed'],
    category: 'Fintech & Payments'
  },
  {
    id: 'healthcare',
    tab: 'Healthcare Ecosystem',
    title: 'HIPAA Telehealth & Diagnostics Engine',
    desc: 'Built video-first patient portal integrated with electronic health record systems and remote vital telemetry.',
    metrics: ['3.2M Patient Encounters', 'HIPAA Compliant', '4.9 Star App Rating'],
    category: 'Healthcare'
  },
  {
    id: 'retail',
    tab: 'Luxury E-Commerce',
    title: 'Headless Global Retail Experience',
    desc: 'Modular Next.js commerce engine handling peak flash-sale loads across 14 currencies.',
    metrics: ['+68% Conversion Rate', ' sub-1s Page Load', '$45M Annual GMV'],
    category: 'Retail'
  }
];

const METHODOLOGY_STEPS = [
  { step: '01', title: 'Product Discovery', desc: 'Requirements analysis, architecture design, and strategic roadmap planning.' },
  { step: '02', title: 'UX & Prototyping', desc: 'Crafting high-fidelity interactive wireframes, dark design systems, and micro-interactions.' },
  { step: '03', title: 'Agile Engineering', desc: 'Sprint-based development, automated testing, continuous delivery, and clean code.' },
  { step: '04', title: 'Launch & Scaling', desc: 'Cloud deployment, performance optimization, monitoring, and 24/7 SLA maintenance.' }
];

const INSIGHTS_POSTS = [
  { title: 'The Future of Next.js 15 in Enterprise Web Architecture', category: 'Engineering', date: 'Oct 2026', readTime: '5 min read' },
  { title: 'How Micro-Interactions Elevate App Retention Rates', category: 'UI/UX Design', date: 'Sep 2026', readTime: '4 min read' },
  { title: 'Scaling LLMs Safely in Regulatory-Compliant Financial Apps', category: 'AI & Data', date: 'Aug 2026', readTime: '7 min read' }
];

const FAQS = [
  {
    q: "How does BMDU approach new project development?",
    a: "We start with an in-depth strategy and discovery phase to align on product architecture, design language, and business KPIs. Then we move into rapid sprint-based development with continuous feedback."
  },
  {
    q: "What tech stack do you specialize in?",
    a: "Our core stack includes React, Next.js, TypeScript, React Native, Node.js, Tailwind CSS, Framer Motion, and modern AI/LLM integration APIs."
  },
  {
    q: "Can you redesign our existing legacy web or mobile application?",
    a: "Yes! We specialize in modernizing legacy architectures into fast, ultra-sleek, and scalable web and mobile platforms with minimal migration downtime."
  },
  {
    q: "What is the typical timeline for a project launch?",
    a: "Timelines range from 4 weeks for brand systems and landing portals to 8-12 weeks for complex enterprise Web/Mobile applications."
  }
];

export default function App() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedServiceTab, setSelectedServiceTab] = useState('app');
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES_DATA[0]);
  const [activeCaseStudyTab, setActiveCaseStudyTab] = useState(CASE_STUDIES[0].id);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const render = () => {
      setCursorPos((prev) => ({
        x: lerp(prev.x, mousePos.x, 0.2),
        y: lerp(prev.y, mousePos.y, 0.2),
      }));
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setConsultationModalOpen(false);
    }, 2200);
  };

  const currentCaseStudy = CASE_STUDIES.find(cs => cs.id === activeCaseStudyTab) || CASE_STUDIES[0];

  return (
    <div className="bg-[#050608] text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      
      {}
      <div 
        className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:flex items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 backdrop-blur-[3px] shadow-[0_0_30px_rgba(6,182,212,0.25)]"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '64px',
          height: '64px',
        }}
      >
        {/* Inner core dot */}
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
      </div>

      {/* Subtle Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Top Utility Bar */}
      <div className="bg-[#030406] border-b border-white/10 text-xs text-slate-400 py-2 px-6 flex justify-between items-center z-40 relative">
        <div className="flex items-center gap-6">
          <a href="tel:+917599490885" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>+91 7599490885</span>
          </a>
          <a href="mailto:info@digitalutilization.com" className="hidden sm:flex items-center gap-2 hover:text-cyan-400 transition-colors">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>info@digitalutilization.com</span>
          </a>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <a href="#careers" className="hover:text-cyan-400 transition-colors">Careers</a>
          <a href="#press" className="hover:text-cyan-400 transition-colors">Press & Media</a>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <header className="sticky top-0 z-40 bg-[#050608]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.08, rotate: 5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-cyan-500/20"
            >
              B
            </motion.div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white">BMDU</span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Digital Utilization</span>
            </div>
          </a>

          {/* Desktop Nav Items with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            
            {/* Services Dropdown Toggle */}
            <div className="relative" onMouseLeave={() => activeDropdown === 'services' && setActiveDropdown(null)}>
              <button 
                onMouseEnter={() => setActiveDropdown('services')}
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className="flex items-center gap-1.5 hover:text-cyan-400 py-2 transition-colors group"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180 text-cyan-400' : 'group-hover:translate-y-0.5'}`} />
              </button>
            </div>

            {/* Industries Dropdown Toggle */}
            <div className="relative" onMouseLeave={() => activeDropdown === 'industries' && setActiveDropdown(null)}>
              <button 
                onMouseEnter={() => setActiveDropdown('industries')}
                onClick={() => setActiveDropdown(activeDropdown === 'industries' ? null : 'industries')}
                className="flex items-center gap-1.5 hover:text-cyan-400 py-2 transition-colors group"
              >
                <span>Industries</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'industries' ? 'rotate-180 text-cyan-400' : 'group-hover:translate-y-0.5'}`} />
              </button>
            </div>

            {/* About Dropdown Toggle */}
            <div className="relative" onMouseLeave={() => activeDropdown === 'about' && setActiveDropdown(null)}>
              <button 
                onMouseEnter={() => setActiveDropdown('about')}
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                className="flex items-center gap-1.5 hover:text-cyan-400 py-2 transition-colors group"
              >
                <span>About</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180 text-cyan-400' : 'group-hover:translate-y-0.5'}`} />
              </button>
            </div>

            <a href="#insights" className="hover:text-cyan-400 py-2 transition-colors">Insights</a>
            <a href="#contact" className="hover:text-cyan-400 py-2 transition-colors">Contact Us</a>
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setConsultationModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <span>Get a Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mega Menu Dropdowns */}
        <AnimatePresence>
          {activeDropdown === 'services' && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
              className="absolute top-full left-0 right-0 bg-[#0c0d14]/95 backdrop-blur-2xl border-b border-white/15 shadow-2xl py-10 px-8 z-50"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-3 space-y-2 border-r border-white/10 pr-6">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-3">Categories</span>
                  {SERVICES_DROPDOWN_DATA.categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedServiceTab === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setSelectedServiceTab(cat.id)}
                        onClick={() => setSelectedServiceTab(cat.id)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl font-medium text-sm transition-all ${
                          isSelected 
                            ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 font-bold scale-[1.02]' 
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-cyan-400'}`} />
                          <span>{cat.name}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-slate-500'}`} />
                      </button>
                    );
                  })}
                </div>

                <div className="lg:col-span-6 grid grid-cols-2 gap-8 pt-2">
                  {SERVICES_DROPDOWN_DATA.content[selectedServiceTab].columns.map((col, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-sm font-bold text-white font-mono tracking-wider">{col.title}</h4>
                      <ul className="space-y-3">
                        {col.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <a href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                              <span>{item}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-3 bg-[#07080d] border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
                  <div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono uppercase">
                      {SERVICES_DROPDOWN_DATA.content[selectedServiceTab].title}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-3">
                      {SERVICES_DROPDOWN_DATA.content[selectedServiceTab].tagline}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {SERVICES_DROPDOWN_DATA.content[selectedServiceTab].desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button 
                      onClick={() => { setActiveDropdown(null); setConsultationModalOpen(true); }}
                      className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-cyan-500/20"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeDropdown === 'industries' && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setActiveDropdown('industries')}
              onMouseLeave={() => setActiveDropdown(null)}
              className="absolute top-full left-0 right-0 bg-[#0c0d14]/95 backdrop-blur-2xl border-b border-white/15 shadow-2xl py-10 px-8 z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-9">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">Industries We Serve</h3>
                    <p className="text-xs text-slate-400 mt-1">Select your vertical to view customized enterprise solutions</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {INDUSTRIES_DATA.map((ind) => {
                      const isSelected = selectedIndustry.id === ind.id;
                      return (
                        <div 
                          key={ind.id}
                          onMouseEnter={() => setSelectedIndustry(ind)}
                          onClick={() => setSelectedIndustry(ind)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected 
                              ? 'bg-cyan-500/10 border-cyan-500 shadow-md shadow-cyan-500/20' 
                              : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-white">{ind.name}</span>
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          </div>
                          <span className="text-[11px] text-cyan-400 font-mono mt-1">{ind.tag}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-3 bg-[#07080d] border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
                  <div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono uppercase">
                      Domain Expertise
                    </span>
                    <h3 className="text-xl font-bold text-white mt-3">
                      Solutions Built For Your Vertical
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Deep domain knowledge & compliance-ready digital products across 17+ sectors. Currently selected: <strong className="text-cyan-400">{selectedIndustry.name}</strong> ({selectedIndustry.desc}).
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-mono">
                    <div>
                      <span className="text-lg font-bold text-white block">17+</span>
                      <span className="text-[10px] text-slate-500">VERTICALS</span>
                    </div>
                    <div>
                      <span className="text-lg font-bold text-cyan-400 block">100%</span>
                      <span className="text-[10px] text-slate-500">COMPLIANT</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setActiveDropdown(null); setConsultationModalOpen(true); }}
                    className="mt-6 w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-cyan-500/20"
                  >
                    <span>Get Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeDropdown === 'about' && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
              className="absolute top-full left-0 right-0 bg-[#0c0d14]/95 backdrop-blur-2xl border-b border-white/15 shadow-2xl py-10 px-8 z-50"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 bg-[#07080d] border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
                  <div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono uppercase">
                      Our Company
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-3">
                      Who We Are & What We Stand For
                    </h3>
                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                      Technologists, creatives, and strategists building tomorrow's digital products — since 2012.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-cyan-400 font-mono">500+</span>
                      <span className="text-[10px] text-slate-400 block uppercase">Projects Delivered</span>
                    </div>
                    <button 
                      onClick={() => { setActiveDropdown(null); setConsultationModalOpen(true); }}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors"
                    >
                      <span>Our Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-4">
                  <h4 className="text-sm font-bold text-blue-500 font-mono tracking-wider">Company</h4>
                  <ul className="space-y-3">
                    {ABOUT_DROPDOWN_DATA.company.map((item, idx) => (
                      <li key={idx}>
                        <a href="#" className="flex flex-col group">
                          <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {item.title}
                          </span>
                          <span className="text-[11px] text-slate-500 ml-3 mt-0.5">{item.desc}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-sm font-bold text-blue-500 font-mono tracking-wider">Resources</h4>
                  <ul className="space-y-3">
                    {ABOUT_DROPDOWN_DATA.resources.map((item, idx) => (
                      <li key={idx}>
                        <a href="#" className="flex flex-col group">
                          <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {item.title}
                          </span>
                          <span className="text-[11px] text-slate-500 ml-3 mt-0.5">{item.desc}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3 space-y-3">
                  <h4 className="text-sm font-bold text-blue-500 font-mono tracking-wider">Awards & Recognition</h4>
                  <div className="space-y-2">
                    {ABOUT_DROPDOWN_DATA.awards.map((award, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <span className="text-xs font-bold text-white block">{award.title}</span>
                        <span className="text-[10px] text-cyan-400 font-mono">{award.rating}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SECTION 1: HERO BANNER (NEWRAL STYLE SMOOTH FADE & PARALLAX) */}
      <section className="relative pt-24 pb-28 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs sm:text-sm text-cyan-400 mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/10"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Engineering Digital Growth Through Technology & Innovation</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.1]"
        >
          <span>Engineering Digital Growth</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 mt-2">
            Through Technology & Innovation
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl leading-relaxed"
        >
          BMDU engineers high-performing web platforms, mobile apps, and enterprise software solutions designed for maximum scalability and measurable ROI.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setConsultationModalOpen(true)}
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full flex items-center justify-center gap-3 transition-colors shadow-lg shadow-cyan-500/30 text-base"
          >
            <span>Consult Our Strategy</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Hero Metrics Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl"
        >
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all">
            <span className="text-3xl font-extrabold text-white font-mono">500+</span>
            <span className="text-xs text-slate-400 block mt-1">Projects Delivered</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all">
            <span className="text-3xl font-extrabold text-cyan-400 font-mono">$20M+</span>
            <span className="text-xs text-slate-400 block mt-1">Client Capital Raised</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all">
            <span className="text-3xl font-extrabold text-white font-mono">99.2%</span>
            <span className="text-xs text-slate-400 block mt-1">Satisfaction Score</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all">
            <span className="text-3xl font-extrabold text-blue-400 font-mono">10+ Yrs</span>
            <span className="text-xs text-slate-400 block mt-1">Engineering Leadership</span>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: ABOUT / VALUE PROPOSITION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-mono uppercase">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Transforming Complex Ideas Into High-Performance Digital Products
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              We operate at the intersection of strategic consulting and advanced software engineering. From cloud-native web systems to native mobile apps, BMDU delivers engineered excellence.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setConsultationModalOpen(true)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-colors group"
              >
                <span>Learn More About Us</span>
                <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <motion.div 
              whileHover={{ x: 4 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4 hover:border-cyan-500/40 transition-all shadow-xl shadow-black/40"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Full Lifecycle Engineering</h4>
                <p className="text-xs text-slate-400 mt-1">From discovery sprint to post-launch CI/CD scaling.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 4 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4 hover:border-cyan-500/40 transition-all shadow-xl shadow-black/40"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Dedicated In-House Product Teams</h4>
                <p className="text-xs text-slate-400 mt-1">Top 1% senior architects, UI designers and DevOps leads.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 4 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4 hover:border-cyan-500/40 transition-all shadow-xl shadow-black/40"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Guaranteed SLA & Compliance</h4>
                <p className="text-xs text-slate-400 mt-1">HIPAA, GDPR, SOC2 compliance-ready code standards.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE CAPABILITIES GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white/[0.01] border-y border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">OUR SERVICES</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 text-white">Digital Engineering Solutions</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">Tailored services designed to drive rapid business transformation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_GRID.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-[#0c0d14] border border-white/10 hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-md group-hover:shadow-cyan-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{svc.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{svc.desc}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {svc.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-slate-300 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: TECH STACK SHOWCASE */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <span className="text-xs text-slate-500 font-mono tracking-widest uppercase block mb-6">TECHNOLOGY STACK WE MASTER</span>
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {TECH_STACK.map((tech, idx) => (
            <motion.span 
              whileHover={{ scale: 1.08 }}
              key={idx} 
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 font-mono hover:border-cyan-500/50 hover:text-white transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </section>

      {/* SECTION 5: INDUSTRY HIGHLIGHT BANNER */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/40 via-cyan-950/40 to-blue-950/40 border border-cyan-500/30 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-xl">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono uppercase">17+ Verticals</span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">Tailored Digital Solutions For Your Specific Industry</h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">Compliance-ready code, healthcare HIPAA workflows, and high-frequency fintech ledgers.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setConsultationModalOpen(true)}
            className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-sm shrink-0 transition-colors shadow-lg shadow-cyan-500/20"
          >
            Explore Industry Stack
          </motion.button>
        </div>
      </section>

      {/* SECTION 6: FEATURED CASE STUDIES / PORTFOLIO */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">OUR WORK</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 text-white">Featured Impact Case Studies</h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {CASE_STUDIES.map((cs) => (
              <button
                key={cs.id}
                onClick={() => setActiveCaseStudyTab(cs.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCaseStudyTab === cs.id 
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20 scale-105' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cs.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Active Case Study Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCaseStudyTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0c0d14] border border-white/15 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl"
          >
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-mono">
                {currentCaseStudy.category}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {currentCaseStudy.title}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {currentCaseStudy.desc}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                {currentCaseStudy.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <span className="text-base sm:text-lg font-bold text-cyan-400 font-mono block">{m}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setConsultationModalOpen(true)}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs inline-flex items-center gap-2 transition-colors shadow-md shadow-cyan-500/20"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-tr from-cyan-950/30 to-blue-900/20 border border-white/10 rounded-2xl p-8 h-72 flex flex-col justify-between relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">BMDU CASE REF: #049</span>
                <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-widest block font-mono">RESULT HIGHLIGHT</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">Sub-Second Response Time</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SECTION 7: METHODOLOGY / PROCESS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">OUR PROCESS</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 text-white">How We Build Solutions</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">Agile engineering process focused on predictable delivery and quality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODOLOGY_STEPS.map((m, idx) => (
            <motion.div 
              whileHover={{ y: -6 }}
              key={idx} 
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <span className="text-4xl font-extrabold text-white/10 font-mono absolute top-4 right-4 group-hover:text-cyan-500/20 transition-colors">
                {m.step}
              </span>
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center mb-6">
                {m.step}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS & FAQ */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Testimonials */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">TESTIMONIALS</span>
            <h2 className="text-3xl font-extrabold text-white">What Enterprise Partners Say</h2>
            
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 shadow-xl">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "BMDU completely overhauled our legacy banking application into a modern Next.js microservice architecture. User satisfaction increased dramatically."
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-black font-bold flex items-center justify-center text-xs">
                  VP
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Vice President of Tech</span>
                  <span className="text-[10px] text-slate-400">Global Fintech Corp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">FAQS</span>
            <h2 className="text-3xl font-extrabold text-white mb-6">Frequently Asked Questions</h2>

            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden shadow-md">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-white font-semibold text-base hover:text-cyan-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <Minus className="w-4 h-4 text-cyan-400 shrink-0" /> : <Plus className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 text-slate-400 text-xs leading-relaxed border-t border-white/5 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 9: INSIGHTS & BLOG POSTS */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">INSIGHTS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 text-white">Latest Engineering Articles</h2>
          </div>
          <a href="#insights" className="mt-4 sm:mt-0 text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
            <span>View All Insights</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSIGHTS_POSTS.map((post, idx) => (
            <motion.div 
              whileHover={{ y: -6 }}
              key={idx} 
              className="p-6 rounded-2xl bg-[#0c0d14] border border-white/10 flex flex-col justify-between group hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-4">
                  <span className="text-cyan-400">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                  {post.title}
                </h3>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                <span>{post.date}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 10: CALL TO ACTION BANNER */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border border-cyan-500/30 p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white max-w-2xl mx-auto leading-tight relative z-10">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mt-4 text-base sm:text-lg relative z-10">
            Schedule a strategic discovery session with our lead architects today.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setConsultationModalOpen(true)}
            className="mt-8 px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full text-base shadow-xl shadow-cyan-500/30 inline-flex items-center gap-3 transition-all relative z-10"
          >
            <span>Schedule Strategy Call</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#030406] py-16 px-6 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-black text-base shadow-md shadow-cyan-500/20">
                B
              </div>
              <span className="font-extrabold text-base text-white">BMDU LLP</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              B M Digital Utilization LLP is a global software engineering and digital transformation agency building enterprise-grade Web, Mobile, and AI products.
            </p>
            <p>© {new Date().getFullYear()} BMDU LLP. All rights reserved.</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">iOS & Android Apps</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">React & Next.js Web</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">AI & Chatbots</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Brand Systems</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About BMDU</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Contact</h4>
            <p>Noida, Uttar Pradesh, India</p>
            <p className="text-cyan-400 font-mono">+91 7599490885</p>
            <p>info@digitalutilization.com</p>
          </div>

        </div>
      </footer>

      {/* PROPOSAL MODAL */}
      <AnimatePresence>
        {consultationModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0c0d14] border border-white/15 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setConsultationModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Proposal Request Received!</h3>
                  <p className="text-slate-400 mt-2 text-sm">
                    Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">Request a Proposal</h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Tell us about your project requirements or select an industry vertical.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">YOUR NAME</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">WORK EMAIL</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="john@company.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">PROJECT DETAILS</label>
                      <textarea 
                        rows={3}
                        placeholder="Tell us about your app, software or industry vertical..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 shadow-lg shadow-cyan-500/20"
                    >
                      <span>Submit Proposal Request</span>
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}