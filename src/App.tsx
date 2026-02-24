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

const HOME_URL = "https://www.educater.co.za";
const PRINCIPALS_URL = "https://principals-educater.vercel.app";
const STUDENTS_URL = "https://students-app-psi.vercel.app";

const MOCKUP_URL = "https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/newphone%20sim.png?alt=media&token=3e4de56d-95a5-4a24-b21f-a56d1ce9b5a4";
const LOGO_ICON_URL = "https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/icon.png?alt=media&token=0963de99-0e33-4484-8bc9-1d14c3adb1ce";
const LOGO_FULL_URL = "https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Educatorwhite.png?alt=media&token=c19f45df-b3d6-41a1-be5f-7432b9bba889";

const FEATURES = [
  { id: 'homework', label: 'Homework', icon: BookOpen, tip: 'Teachers post assignments and deadlines here for students to submit work and parents to track progress. Check this section daily to manage your workload effectively and ensure no due dates are missed during the busy school week.' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, tip: 'View the entire school year, including holidays and field trips, in one color-coded space. This feature allows everyone to plan ahead and stay organized, ensuring that important dates and upcoming events are never overlooked or forgotten.' },
  { 
    id: 'chat', 
    label: 'Chat', 
    icon: MessageSquare, 
    tip: 'This section provides instant class-wide announcements and reminders directly from teachers. By using this broadcast tool, you can skip messy email chains and receive essential updates and timely information in a single, convenient conversation stream.',
    onClick: () => {
      console.log('Chat feature clicked'); // Simplified logic
    }
  },
  {
    id: 'inbox',
    label: 'Inbox',
    icon: Mail,
    tip: 'This area is now view-only for private, one-on-one messaging. Typing functionality is disabled to ensure a focused and distraction-free experience.',
    onClick: () => {
      console.log('Inbox feature clicked'); // View-only logic
    }
  },
  { id: 'journal', label: 'Journal', icon: Camera, tip: 'Students can upload and browse school photos to create a digital living yearbook. This camera-based feature allows you to capture important memories throughout the year, making it easy to relive special moments and see who was involved.' },
  { id: 'alerts', label: 'Alerts', icon: Bell, tip: 'This section delivers urgent notifications regarding attendance, health, or behavior updates that require immediate awareness. These alerts are not casual messages; they demand quick action or attention from parents and students to ensure everyone stays informed.' },
  { id: 'quizzes', label: 'Quizzes', icon: ClipboardList, tip: 'Students can take online tests here to receive instant scores and feedback on their performance. This digital assessment tool is significantly faster than waiting for paper grading, and it allows for retakes whenever the teacher enables that option.' },
  { id: 'games', label: 'Learning Games', icon: Gamepad2, tip: 'Access educational games covering subjects like math, science, and history to make studying more engaging. Teachers often assign these activities to help students improve their skills and knowledge through fun, interactive challenges that feel like play.' },
  { id: 'yearbook', label: 'Yearbook', icon: Image, tip: 'Browse through a digital time capsule featuring class photos, student spotlights, and major school highlights. This feature allows you to flip through memories from past years and smile while remembering the people and events that shaped your experience.' },
  { id: 'library', label: 'Library', icon: Library, tip: 'This tutoring hub contains study guides, videos, and worksheets uploaded by teachers for easy access. It serves as a searchable, central resource for all learning materials, replacing the need to hunt through various scattered emails or physical handouts.' },
  { id: 'directory', label: 'Directory', icon: Search, tip: 'Quickly search for the contact information and profiles of classmates, teachers, and school staff. Instead of hunting through long lists or asking around, simply type a name to find the person you need to reach instantly.' },
  { id: 'profile', label: 'Profile', icon: User, tip: 'Update your name, photo, and contact details to ensure your information remains current. Keeping this section accurate helps others recognize you easily and ensures that teachers and peers have the correct way to reach out when necessary.' },
  { id: 'conduct', label: 'Code of Conduct', icon: FileText, tip: 'Review all school rules, dress codes, and behavior expectations to understand what is required of every student. Both parents and students should stay informed about these guidelines to ensure they make smart choices and follow campus policies.' },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck, tip: 'Learn how the app collects, stores, and protects your personal data to ensure your information remains secure. This section explains who has access to your details, upholding your right to know how your digital footprint is being managed.' },
];

const PhoneFrame = ({ delay = 0, label, url, icon: Icon }: { delay?: number, label: string, url: string, icon: React.ElementType }) => {
  const [refreshKey, setRefreshKey] = useState(0);
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

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRefreshKey(prev => prev + 1);
  };

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
        style={{ width: displayWidth, height: displayHeight }}
      >
        <img 
          src={MOCKUP_URL} 
          alt="iPhone 13 Mockup" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
          referrerPolicy="no-referrer"
        />
        
        {/* Refresh Button Overlay */}
        <button 
          onClick={handleRefresh}
          className="absolute top-4 right-4 z-30 p-2 bg-black/50 backdrop-blur-md rounded-full opacity-0 group-hover/phone:opacity-100 transition-opacity hover:bg-black/70 text-white"
          title="Refresh Simulation"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>

        <div 
          className="absolute overflow-hidden bg-white rounded-[2rem]"
          style={{
            top: paddingY,
            left: paddingX,
            right: paddingX,
            bottom: paddingY,
            zIndex: 10
          }}
        >
          <iframe 
            ref={iframeRef}
            key={refreshKey}
            src={url} 
            style={{
              width: '150%',
              height: '150%',
              transform: 'scale(0.6666)',
              transformOrigin: 'top left',
              border: 'none',
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
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white"
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
    />
  );
};

export default function App() {
  const [activeFeature, setActiveFeature] = useState<typeof FEATURES[0] | null>(null);

  return (
    <div className="h-screen w-screen bg-[#011827] flex overflow-hidden cursor-none font-sans text-white">
      <CustomCursor />

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
          <h3 className="text-xl font-semibold text-white mb-8">Features</h3>
          <nav className="space-y-1">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature && activeFeature.id === feature.id;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-white text-[#011827]' 
                      : 'text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#011827]' : 'text-white/40 group-hover:text-white'}`} />
                  <span className="font-medium text-sm">{feature.label}</span>
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
            <span className="font-medium text-sm">Go back to website</span>
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
        {activeFeature && (
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFeature.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="hidden md:block absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-48 md:w-64 p-4 md:p-5 bg-[#021b2b]/80 border border-white/10 rounded-xl backdrop-blur-md z-40"
            >
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2 block">Tip:</span>
              <p className="text-[10px] md:text-[11px] text-white/70 leading-relaxed font-medium">
                {activeFeature.tip}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Phones Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 ml-0 lg:ml-32">
          <PhoneFrame 
            delay={0.1} 
            label="Educator"
            url={PRINCIPALS_URL}
            icon={User}
          />
          <PhoneFrame 
            delay={0.2} 
            label="Student"
            url={STUDENTS_URL}
            icon={GraduationCap}
          />
        </div>
      </main>
    </div>
  );
}
