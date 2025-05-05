
import { useState } from 'react';

// Available languages in Malaysia
const languages = [
  { code: 'en', name: 'EN' }, // English
  { code: 'ms', name: 'MY' }, // Malay
  { code: 'zh', name: 'CN' }, // Chinese
  { code: 'ta', name: 'TA' }, // Tamil
];

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    // In a real app, this would update i18n context and translations
    console.log(`Language changed to: ${langCode}`);
  };

  return (
    <div className="language-toggle">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`language-toggle-item ${currentLanguage === lang.code ? 'active' : ''}`}
          aria-label={`Change language to ${lang.name}`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
