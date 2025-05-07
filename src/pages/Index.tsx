
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import HowItWorks from "@/components/HowItWorks";
import SecuritySection from "@/components/SecuritySection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div id="features">
          <FeatureCards />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="security">
          <SecuritySection />
        </div>
        
        {/* Patient and Doctor Previews */}
        <section id="about" className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Patient Portal</h2>
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
                <div className="bg-emerald-600 text-white p-4">
                  <h3 className="font-semibold">MY-Care Patient Dashboard</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Upcoming Appointment</p>
                      <p className="font-semibold">Dr. Ahmad Yusof</p>
                      <p className="text-sm">Tomorrow, 10:30 AM</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Recent Consultation</p>
                      <p className="font-semibold">Dr. Sarah Wong</p>
                      <p className="text-sm">3 days ago</p>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-emerald-100 rounded-full p-2 mr-3">
                        <MicIcon className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Voice Consultation</h4>
                        <p className="text-sm text-gray-600">Speak in your preferred language for instant AI triage</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                    Start New Consultation
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Doctor Dashboard</h2>
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
                <div className="bg-sky-500 text-white p-4">
                  <h3 className="font-semibold">Clinical Dashboard</h3>
                </div>
                <div className="p-6">
                  <div className="bg-amber-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-amber-800">Waiting Room</p>
                      <p className="text-sm text-amber-800">3 patients waiting • Avg wait 11 min</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden mb-6">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">Ahmad bin Ismail</div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">Chest pain, fever</div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">Mei Lin Tan</div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">Skin rash</div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <button className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition-colors font-medium">
                    View Full Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

const MicIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);
