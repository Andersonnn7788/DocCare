
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginModal from "./LoginModal";

const Hero = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState<'patient' | 'doctor'>('patient');
  const navigate = useNavigate();

  const openLoginModal = (mode: 'patient' | 'doctor') => {
    setLoginMode(mode);
    setIsLoginModalOpen(true);
  };
  
  const handleDemoClick = () => {
    // Navigate directly to the diagnosis demo page
    navigate('/diagnosis');
  };

  return (
    <section className="bg-aurora-light py-16 md:py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-emerald-600 font-medium text-lg mb-3">MY-Care AI Platform</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Healthcare that speaks <span className="gradient-text">your language.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-700">
                Temui doktor anda tanpa menunggu—Meet your doctor without the wait.
                AI-powered telemedicine for every Malaysian.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => openLoginModal('patient')} 
                className="btn-primary"
              >
                Start Consultation
              </Button>
              <Button 
                onClick={handleDemoClick} 
                className="btn-outline"
              >
                Try Demo
              </Button>
              <Button 
                onClick={() => openLoginModal('doctor')} 
                className="btn-outline"
              >
                For Doctors
              </Button>
            </div>
            
            <div className="flex items-center text-slate-600 text-sm">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                    <div className={`w-full h-full bg-emerald-${(i * 100) + 300}`}></div>
                  </div>
                ))}
              </div>
              <span>Trusted by <b>5,000+</b> patients and <b>200+</b> doctors</span>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative bg-white rounded-2xl shadow-soft p-5 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                alt="Malaysian family consulting with doctor online" 
                className="w-full h-auto rounded-xl" 
              />
              
              <div className="absolute -bottom-4 left-10 right-10 bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Live Session</p>
                    <p className="font-semibold text-slate-900">Dr. Lee Mei Ling</p>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
                    <span className="text-sm font-medium text-emerald-600">Online Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        mode={loginMode}
      />
    </section>
  );
};

export default Hero;
