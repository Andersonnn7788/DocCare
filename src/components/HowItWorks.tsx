
import { User, Video, Headphones, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const HowItWorks = () => {
  const steps = [
    {
      icon: <User className="h-6 w-6" />,
      title: "Sign In",
      description: "Create an account or log in securely using your credentials.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Speak or Type",
      description: "Describe your symptoms in any Malaysian language - text or voice.",
      color: "bg-sky-100 text-sky-600"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "AI Triage",
      description: "Our AI quickly assesses urgency and prepares information for the doctor.",
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "See Doctor",
      description: "Connect via chat or video with a qualified doctor who speaks your language.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Record Stored",
      description: "Your consultation is securely stored in your electronic health record.",
      color: "bg-slate-100 text-slate-700"
    }
  ];

  return (
    <section id="how-it-works" className="bg-aurora-light">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How <span className="gradient-text">MY-Care AI</span> Works
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Get quality healthcare in minutes, not hours, with our streamlined process.
          </p>
        </div>
        
        <div className="relative">
          {/* Desktop Steps */}
          <div className="hidden md:block">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10", step.color)}>
                    {step.icon}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-center text-sm text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Steps */}
          <div className="md:hidden">
            <div className="absolute top-0 bottom-0 left-6 w-1 bg-gray-200"></div>
            
            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start pl-16">
                  <div className={cn("absolute left-0 w-12 h-12 rounded-full flex items-center justify-center z-10", step.color)}>
                    {step.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-2xl p-6 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Seamless Language Support</h3>
              <p className="text-slate-600">
                Our system seamlessly handles code-switching between languages, so you can express yourself naturally.
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm italic">
                  "Saya rasa <span className="text-emerald-600">shortness of breath</span> dan juga <span className="text-emerald-600">chest pain</span> sejak semalam."
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  ↑ Example of Malay-English code-switching that MY-Care AI understands perfectly.
                </p>
              </div>
            </div>
            
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <h4 className="font-semibold text-emerald-800 mb-3">Supported Languages</h4>
              <ul className="grid grid-cols-2 gap-2">
                {['Bahasa Malaysia', 'English', 'Mandarin', 'Tamil', 'Iban', 'Kadazandusun'].map((lang, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                    <span>{lang}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
