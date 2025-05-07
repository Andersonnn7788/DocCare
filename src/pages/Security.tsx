
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Server, FileText } from "lucide-react";

const Security = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Security & Privacy</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We take your data protection seriously. Learn how we safeguard your information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold ml-3">Data Encryption</h2>
              </div>
              <p className="text-slate-600 mb-4">
                All personal and medical data is protected with industry-standard end-to-end encryption. 
                Your information is encrypted both in transit and at rest, ensuring that only authorized 
                parties can access it.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded mr-2">AES-256</span>
                  <span className="text-sm">Military-grade encryption for all stored data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded mr-2">TLS 1.3</span>
                  <span className="text-sm">Secure communication protocols for data transfer</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-50 p-3 rounded-full">
                  <Lock className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold ml-3">Access Control</h2>
              </div>
              <p className="text-slate-600 mb-4">
                We implement strict access controls to ensure that only authorized healthcare professionals can 
                access your medical information, and only when necessary for your care.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-sm bg-emerald-50 text-emerald-700 px-2 py-1 rounded mr-2">2FA</span>
                  <span className="text-sm">Two-factor authentication for all healthcare providers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sm bg-emerald-50 text-emerald-700 px-2 py-1 rounded mr-2">RBAC</span>
                  <span className="text-sm">Role-based access control to limit data visibility</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-purple-50 p-3 rounded-full">
                  <Server className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold ml-3">Infrastructure Security</h2>
              </div>
              <p className="text-slate-600 mb-4">
                Our systems are hosted in secure, redundant data centers with 24/7 monitoring and 
                regular security audits to protect against external threats.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-sm bg-purple-50 text-purple-700 px-2 py-1 rounded mr-2">SOC 2</span>
                  <span className="text-sm">Compliant infrastructure with regular audits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sm bg-purple-50 text-purple-700 px-2 py-1 rounded mr-2">DDOS</span>
                  <span className="text-sm">Advanced protection against denial of service attacks</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-amber-50 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-semibold ml-3">Compliance</h2>
              </div>
              <p className="text-slate-600 mb-4">
                MY-Care is compliant with all relevant healthcare data protection regulations, 
                ensuring that your medical information is handled according to the highest standards.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-sm bg-amber-50 text-amber-700 px-2 py-1 rounded mr-2">PDPA</span>
                  <span className="text-sm">Malaysian Personal Data Protection Act compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sm bg-amber-50 text-amber-700 px-2 py-1 rounded mr-2">HIPAA</span>
                  <span className="text-sm">Aligned with international healthcare data standards</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Your Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Access Your Data</h3>
                <p className="text-sm text-slate-600">
                  You have the right to access all your personal and medical data stored in our system at any time.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Control Your Data</h3>
                <p className="text-sm text-slate-600">
                  You can modify your personal information and control who has access to your medical records.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Data Portability</h3>
                <p className="text-sm text-slate-600">
                  You can export your medical data in standard formats for use with other healthcare providers.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-semibold mb-4">Questions about our security measures?</h2>
            <p className="text-slate-600 max-w-3xl mx-auto mb-6">
              Our team is available to address any concerns you may have about the security and privacy of your data.
            </p>
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-medium">
              Contact Our Security Team
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Security;
