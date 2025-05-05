
import { Shield, Lock, CheckCircle } from "lucide-react";

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: <Shield className="h-10 w-10 text-emerald-600" />,
      title: "PDPA Compliant",
      description: "Fully compliant with Malaysia's Personal Data Protection Act to safeguard your medical information."
    },
    {
      icon: <Lock className="h-10 w-10 text-emerald-600" />,
      title: "AES-256 Encryption",
      description: "Bank-grade encryption for all data in transit and at rest, keeping your sensitive information secure."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-emerald-600" />,
      title: "MOH Guidelines",
      description: "Adheres to all Ministry of Health Malaysia guidelines for telemedicine and digital health services."
    }
  ];

  return (
    <section id="security" className="section-container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Your Data, <span className="gradient-text">Our Priority</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          MY-Care AI implements industry-leading security measures to ensure your medical data remains private and protected.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="card flex flex-col items-center text-center">
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
            <p className="text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-16 flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-soft p-8">
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold mb-2">Compliance & Certifications</h3>
          <p className="text-slate-600 max-w-lg">
            Our platform adheres to international standards and local regulations to ensure the highest level of security and data protection.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="bg-gray-100 px-6 py-3 rounded-lg flex items-center">
            <span className="font-semibold text-gray-700">HL7 FHIR</span>
          </div>
          <div className="bg-gray-100 px-6 py-3 rounded-lg flex items-center">
            <span className="font-semibold text-gray-700">SOC 2</span>
          </div>
          <div className="bg-gray-100 px-6 py-3 rounded-lg flex items-center">
            <span className="font-semibold text-gray-700">ISO 27001</span>
          </div>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <a href="#privacy-policy" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium">
          <span>Read our detailed privacy policy</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default SecuritySection;
