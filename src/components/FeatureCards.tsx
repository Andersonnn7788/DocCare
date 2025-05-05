
import { MicIcon, Globe, ShieldCheck } from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-emerald-600" />,
      title: "Multilingual Support",
      bilingual: "Berbilang Bahasa / Multilingual",
      description: "Consult in Malay, English, Mandarin, Tamil, Iban, or Kadazandusun with text and voice support.",
    },
    {
      icon: <MicIcon className="h-8 w-8 text-sky-500" />,
      title: "AI Symptom Triage",
      bilingual: "Penilaian Gejala AI / AI Triage",
      description: "Describe your symptoms or just speak; our AI flags what matters and prioritizes care.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-slate-900" />,
      title: "Secure Medical Records",
      bilingual: "Rekod Perubatan Selamat / Secure Records",
      description: "Your data is encrypted, stored locally, and fully compliant with Malaysia's PDPA requirements.",
    },
  ];

  return (
    <section id="features" className="section-container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Healthcare <span className="gradient-text">Made Simple</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          MY-Care AI brings healthcare into the digital age while respecting Malaysian diversity, languages and cultures.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="card group hover:border-emerald-600/50 flex flex-col items-center text-center"
          >
            <div className="bg-aurora-light rounded-full p-4 mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {feature.title}
            </h3>
            
            <p className="text-sm text-emerald-600 font-medium mb-4">
              {feature.bilingual}
            </p>
            
            <p className="text-slate-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-aurora-gradient rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to experience next-generation healthcare?</h3>
        <p className="mb-6">Join thousands of Malaysians already benefiting from MY-Care AI's services.</p>
        <button className="bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-colors">
          Get Started Today
        </button>
      </div>
    </section>
  );
};

export default FeatureCards;
