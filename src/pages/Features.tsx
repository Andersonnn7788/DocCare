
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Monitor, Brain, Hospital, Microscope } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Features</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how MY-Care is revolutionizing healthcare access in Malaysia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-100 text-emerald-600 mb-5">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Symptom Analysis</h3>
                <p className="text-slate-600 mb-4">
                  Our advanced AI analyzes your symptoms to provide preliminary insights, helping to prioritize care 
                  and reduce waiting times for urgent cases.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Intelligent symptom analysis in multiple languages</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Urgency assessment to prioritize critical cases</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Integration with medical records for better diagnosis</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-5">
                  <Monitor className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Virtual Doctor Consultations</h3>
                <p className="text-slate-600 mb-4">
                  Connect with qualified healthcare professionals through secure video calls, chat, or voice calls
                  from the comfort of your home.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">On-demand consultations with minimal waiting time</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Secure, encrypted communication channels</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Choice of doctors based on language preference</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-100 text-amber-600 mb-5">
                  <Microscope className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Electronic Health Records</h3>
                <p className="text-slate-600 mb-4">
                  Securely store and access your medical records, prescriptions, and test results all in one place,
                  making it easy to share with healthcare providers.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Secure cloud storage with end-to-end encryption</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Easy sharing with healthcare providers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Complete medical history at your fingertips</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600 mb-5">
                  <Hospital className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Hospital Recommendations</h3>
                <p className="text-slate-600 mb-4">
                  Get personalized hospital recommendations based on your condition, location, and hospital wait times
                  to ensure you receive timely care.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Real-time hospital capacity information</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Specialist availability data</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                    <span className="text-sm">Distance-based recommendations for urgent cases</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white p-8 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to experience the future of healthcare?</h2>
              <p className="mb-6">
                Join thousands of Malaysians who have already transformed their healthcare experience
                with MY-Care's innovative telehealth platform.
              </p>
              <button className="bg-white text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold shadow-sm">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
