import React from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Language } from '../contexts/LanguageContext';

interface LanguagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (lang: Language) => void;
  currentLanguage: Language;
}

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'PT', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'HI', name: 'Hindi', flag: '🇮🇳' },
  { code: 'AR', name: 'Arabic', flag: '🇦🇪' },
  { code: 'JA', name: 'Japanese', flag: '🇯🇵' },
  { code: 'RU', name: 'Russian', flag: '🇷🇺' },
  { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'DE', name: 'German', flag: '🇩🇪' },
  { code: 'KO', name: 'Korean', flag: '🇰🇷' },
  { code: 'ZH', name: 'Chinese', flag: '🇨🇳' },
  { code: 'FR', name: 'French', flag: '🇫🇷' },
  { code: 'TR', name: 'Turkish', flag: '🇹🇷' },
];

export const LanguagePopup = ({ isOpen, onClose, onSelectLanguage, currentLanguage }: LanguagePopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1b1e] border-[#0066ff33] text-[#e2ebfb]">
        <DialogTitle className="text-center text-lg font-semibold mb-4">Select Language</DialogTitle>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              className={`flex items-center justify-start gap-2 p-3 ${
                currentLanguage === lang.code
                  ? 'bg-[#0066ff] text-white'
                  : 'bg-[#0066ff0f] text-[#e2ebfb] border border-[#0066ff33] hover:bg-[#0066ff1a]'
              }`}
              onClick={() => {
                onSelectLanguage(lang.code);
                onClose();
              }}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};