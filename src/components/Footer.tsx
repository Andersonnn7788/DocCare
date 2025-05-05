
import { PhoneCall, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-aurora-gradient flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">MC</span>
              </div>
              <span className="text-white font-semibold text-xl">
                MY<span className="text-emerald-400">-</span>Care
                <span className="ml-1 text-sky-400">AI</span>
              </span>
            </div>
            
            <p className="text-slate-400 mb-6">
              AI-powered multilingual telemedicine platform for all Malaysians.
            </p>
            
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`}
                  className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <span className="sr-only">Follow us on {social}</span>
                  <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Features", "How It Works", "Security", "About", "Careers", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-emerald-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 text-emerald-400 mr-3" />
                <a href="tel:+60123456789" className="text-slate-400 hover:text-emerald-400">+60 12 345 6789</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-400 mr-3" />
                <a href="mailto:support@mycare-ai.com" className="text-slate-400 hover:text-emerald-400">support@mycare-ai.com</a>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
                WhatsApp Support
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-slate-400 mb-4">
              Stay updated with the latest health information and MY-Care AI features.
            </p>
            
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-slate-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MY-Care AI. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#privacy-policy" className="text-slate-400 text-sm hover:text-emerald-400">
              Privacy Policy
            </a>
            <a href="#terms" className="text-slate-400 text-sm hover:text-emerald-400">
              Terms of Service
            </a>
            <a href="#compliance" className="text-slate-400 text-sm hover:text-emerald-400">
              PDPA Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
