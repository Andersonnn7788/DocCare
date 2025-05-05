
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import LanguageToggle from './LanguageToggle';
import LoginModal from './LoginModal';
import { Menu, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState<'patient' | 'doctor'>('patient');

  const openLoginModal = (mode: 'patient' | 'doctor') => {
    setLoginMode(mode);
    setIsLoginModalOpen(true);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-aurora-gradient flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">MC</span>
              </div>
              <span className="text-slate-900 font-semibold text-xl">
                MY<span className="text-emerald-600">-</span>Care
                <span className="ml-1 text-sky-500">AI</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
              How It Works
            </a>
            <a href="#security" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
              Security
            </a>
            <a href="#about" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
              About
            </a>
            <LanguageToggle />
          </nav>

          {/* Desktop Login Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={() => openLoginModal('patient')} 
              className="btn-outline"
            >
              Start Consultation
            </Button>
            <Button 
              onClick={() => openLoginModal('doctor')} 
              className="btn-primary flex items-center gap-2"
            >
              <User size={16} />
              For Doctors
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-900 hover:text-emerald-600 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 px-2 mt-3">
              <a href="#features" className="text-slate-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">
                How It Works
              </a>
              <a href="#security" className="text-slate-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">
                Security
              </a>
              <a href="#about" className="text-slate-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">
                About
              </a>
              
              <div className="flex items-center justify-between py-3">
                <LanguageToggle />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => openLoginModal('patient')} 
                    size="sm"
                    variant="outline"
                    className="text-emerald-600 border-emerald-600"
                  >
                    Patient
                  </Button>
                  <Button 
                    onClick={() => openLoginModal('doctor')} 
                    size="sm" 
                    className="bg-emerald-600"
                  >
                    Doctor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        mode={loginMode}
      />
    </header>
  );
};

export default Navbar;
