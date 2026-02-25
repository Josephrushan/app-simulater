import React, { useEffect, useRef } from 'react';

interface VoiceSimulatorProps {
  text: string;
  language: string;
}

// Map language codes to browser SpeechSynthesis codes
const languageVoiceMap: Record<string, string[]> = {
  en: ['en-US', 'en-GB'],
  af: ['af-ZA'],
  zu: ['zu-ZA'],
  xh: ['xh-ZA'],
  st: ['st-ZA'],
  tn: ['tn-ZA'],
  de: ['de-DE'],
  fr: ['fr-FR'],
  es: ['es-ES'],
  ru: ['ru-RU'],
  ja: ['ja-JP'],
  ko: ['ko-KR'],
  zh: ['zh-CN', 'zh-TW'],
  hi: ['hi-IN'],
};

function getFemaleVoice(language: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const codes = languageVoiceMap[language] || [];
  // Prefer voices matching language code and name heuristics for female
  const femaleVoices = voices.filter(
    v => v.lang && codes.includes(v.lang) && (
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('frau') ||
      v.name.toLowerCase().includes('woman') ||
      v.name.toLowerCase().includes('girl') ||
      v.name.toLowerCase().includes('lady') ||
      v.name.toLowerCase().includes('feminine')
    )
  );
  if (femaleVoices.length > 0) return femaleVoices[0];
  // Fallback: any voice for language
  return voices.find(v => v.lang && codes.includes(v.lang)) || null;
}

const VoiceSimulator: React.FC<VoiceSimulatorProps> = ({ text, language }) => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!text || !language) return;
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(text);
    const voice = getFemaleVoice(language);
    if (voice) utter.voice = voice;
    utter.lang = (voice && voice.lang) || languageVoiceMap[language]?.[0] || 'en-US';
    utter.pitch = 1.1; // Slightly higher pitch for female
    utter.rate = 1;
    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, language]);

  return null;
};

export default VoiceSimulator;
