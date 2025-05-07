
import { useState, useEffect } from 'react';

// Available languages in Malaysia
const languages = [
  { code: 'en', name: 'EN' }, // English
  { code: 'ms', name: 'MY' }, // Malay
  { code: 'zh', name: 'CN' }, // Chinese
  { code: 'ta', name: 'TA' }, // Tamil
];

interface LanguageToggleProps {
  onLanguageChange?: (langCode: string) => void;
  currentLanguage?: string;
}

const LanguageToggle = ({ 
  onLanguageChange, 
  currentLanguage = 'en' 
}: LanguageToggleProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  useEffect(() => {
    if (currentLanguage !== selectedLanguage) {
      setSelectedLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    // In a real app, this would update i18n context and translations
    console.log(`Language changed to: ${langCode}`);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  return (
    <div className="language-toggle">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`language-toggle-item ${selectedLanguage === lang.code ? 'active' : ''}`}
          aria-label={`Change language to ${lang.name}`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
