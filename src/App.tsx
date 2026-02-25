/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Mail, 
  Camera, 
  Bell, 
  ClipboardList, 
  Gamepad2, 
  Image, 
  Library, 
  Search, 
  User, 
  FileText, 
  ShieldCheck,
  LogOut,
  GraduationCap,
  RefreshCcw
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { translations, type Language } from './translations';
import VoiceSimulator from './VoiceSimulator';

const HOME_URL = "https://www.educater.co.za";
const PRINCIPALS_URL = "https://principals-app-five.vercel.app/";
const STUDENTS_URL = "https://student-app-navy.vercel.app/";

const MOCKUP_URL = "https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/new%20phone.png?alt=media&token=ee83088e-8768-492f-ac26-c6aa4948c1f5";
const LOGO_ICON_URL = "https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/icon.png?alt=media&token=0963de99-0e33-4484-8bc9-1d14c3adb1ce";
const LOGO_FULL_URL = "https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Educatorwhite.png?alt=media&token=c19f45df-b3d6-41a1-be5f-7432b9bba889";

const PhoneFrame = ({ delay = 0, label, url, icon: Icon }: { delay?: number, label: string, url: string, icon: React.ElementType }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const displayWidth = 260;
  const displayHeight = 560;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      // Prevent focus on iframe
      const handleFocus = (event: FocusEvent) => {
        event.preventDefault();
        event.stopPropagation();
        iframe.blur();
      };
      
      // Prevent keyboard interaction
      const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };
      
      iframe.addEventListener('focus', handleFocus, true);
      iframe.addEventListener('keydown', handleKeyDown, true);
      iframe.addEventListener('keyup', handleKeyDown, true);
      iframe.addEventListener('keypress', handleKeyDown, true);
      
      // Prevent focus within iframe content
      const handleLoad = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            const inputs = iframeDoc.querySelectorAll('input, textarea');
            inputs.forEach(el => {
              el.addEventListener('focus', (e) => {
                e.preventDefault();
                (e.target as HTMLElement).blur();
              }, true);
            });
          }
        } catch(e) {
          console.log('Cannot access iframe content');
        }
      };
      
      iframe.addEventListener('load', handleLoad);
      
      return () => {
        iframe.removeEventListener('focus', handleFocus, true);
        iframe.removeEventListener('keydown', handleKeyDown, true);
        iframe.removeEventListener('keyup', handleKeyDown, true);
        iframe.removeEventListener('keypress', handleKeyDown, true);
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  // Padding as percentages (original Google AI dimensions)
  const paddingX = "3.5%";
  const paddingY = "8.5%";

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="relative mx-auto origin-center simulation-container group/phone"
        style={{ width: displayWidth, height: displayHeight, transform: 'translate(-6px, -16px)' }}
      >
        <img 
          src={MOCKUP_URL} 
          alt="iPhone 13 Mockup" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
          referrerPolicy="no-referrer"
        />
        
        <div 
          className="absolute overflow-hidden bg-white rounded-[2rem]"
          style={{
            top: paddingY,
            left: paddingX,
            right: paddingX,
            bottom: paddingY,
            zIndex: 10,
            pointerEvents: 'auto'
          }}
        >
          <iframe 
            ref={iframeRef}
            src={url} 
            style={{
              width: '150%',
              height: '150%',
              transform: 'scale(0.6666)',
              transformOrigin: 'top left',
              border: 'none',
              cursor: 'none',
            }}
            title={`Educater App - ${label}`}
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
      
      <div className="flex items-center gap-3 mt-1">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
          <Icon className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-white text-lg font-light tracking-wide">
          {label}
        </div>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Invisible overlay to ensure cursor is always visible */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100000]"
        style={{ pointerEvents: 'none' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[999999] mix-blend-difference bg-white"
        initial={{ opacity: 0 }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{ 
          opacity: { duration: 0.2 },
          default: { type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }
        }}
        style={{ 
          pointerEvents: 'none',
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default function App() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  // Create dynamic features array with current translations
  const FEATURES = [
    { id: 'homework', icon: BookOpen },
    { id: 'calendar', icon: Calendar },
    { id: 'chat', icon: MessageSquare },
    { id: 'inbox', icon: Mail },
    { id: 'journal', icon: Camera },
    { id: 'alerts', icon: Bell },
    { id: 'quizzes', icon: ClipboardList },
    { id: 'games', icon: Gamepad2 },
    { id: 'yearbook', icon: Image },
    { id: 'library', icon: Library },
    { id: 'directory', icon: Search },
    { id: 'profile', icon: User },
    { id: 'conduct', icon: FileText },
    { id: 'privacy', icon: ShieldCheck },
  ].map(feature => ({
    ...feature,
    label: t.features[feature.id as keyof typeof t.features],
    tip: t.tips[feature.id as keyof typeof t.tips],
  }));

  const activeFeatureObj = activeFeature ? FEATURES.find(f => f.id === activeFeature) || null : null;

  // Welcome dialogue text
  const welcomeDialogue = `Welcome to Educater — the future of school management.\n\nStep into a smarter, seamless way to run your school. With just a tap, homework is deployed instantly. Parents stay informed. Students receive assignments in real time. Everything connected. Everything paperless.\n\nEmpower learning with a built-in library of self-study and tutoring resources. Create and send quizzes instantly to selected grades and subject groups. Capture attendance and generate absentee reports that notify parents immediately through push notifications.\n\nCelebrate the school journey by securely storing grade-specific memories — visible only to students and their parents. Build stronger communities with direct parent-teacher messaging and grade-based community chats.\n\nPlan smarter. Faculty can create calendar events for specific groups or publish to the entire school in seconds. Access a powerful online directory — your school’s digital “yellow pages” — where you can search by name, grade, parent, or student instantly.\n\nCreate and publish your code of conduct directly within the app. Clear. Accessible. Immediate.\n\nPrivate. Secure. Instant. Affordable.\nNo cost to the school. No paper. No limits.\n\nWelcome to Educater.\nWelcome to the future of school management.`;


  return (
    <div className="h-screen w-screen bg-[#011827] flex overflow-hidden cursor-none font-sans text-white">
      <CustomCursor />

      {/* Voice Simulator for Welcome Dialogue */}
      <VoiceSimulator text={welcomeDialogue} language={language} />

      {/* Sidebar */}
      <aside className="hidden sm:flex w-48 md:w-64 lg:w-72 h-full bg-[#021b2b] border-r border-white/5 flex-col p-4 md:p-8 z-50">
        <div className="mb-10">
          <img 
            src={LOGO_FULL_URL} 
            alt="Educater" 
            className="h-10 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <h3 className="text-xl font-semibold text-white mb-8">{t.sidebar.featuresTitle}</h3>
          <nav className="space-y-1">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-white text-[#011827]' 
                      : 'text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#011827]' : 'text-white/40 group-hover:text-white'}`} />
                  <span className="font-medium text-sm text-left flex-1">{feature.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6">
          <a 
            href={HOME_URL}
            className="flex items-center justify-between w-full px-4 py-4 text-white/50 hover:text-white transition-colors group border-t border-white/10"
          >
            <span className="font-medium text-sm">{t.sidebar.goBackToWebsite}</span>
            <LogOut className="w-5 h-5 rotate-180" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center p-12">
        {/* Top Right Logo Accent */}
        <div className="absolute top-12 right-12 opacity-90">
          <img 
            src={LOGO_ICON_URL} 
            alt="Logo Icon" 
            className="w-12 h-12 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Tip Box */}
        {activeFeatureObj && (
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFeatureObj.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="hidden md:block absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-48 md:w-64 p-4 md:p-5 bg-[#021b2b]/80 border border-white/10 rounded-xl backdrop-blur-md z-40"
            >
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2 block">Tip:</span>
              <p className="text-[10px] md:text-[11px] text-white/70 leading-relaxed font-medium">
                {activeFeatureObj.tip}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Phones Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 ml-0 lg:ml-32">
          <PhoneFrame 
            delay={0.1} 
            label={t.labels.educator}
            url={PRINCIPALS_URL}
            icon={User}
          />
          <div className="hidden lg:block">
            <PhoneFrame 
              delay={0.2} 
              label={t.labels.student}
              url={STUDENTS_URL}
              icon={GraduationCap}
            />
          </div>
        </div>
      </main>

      {/* Language Selector */}
      <LanguageSelector 
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
    </div>
  );
}
