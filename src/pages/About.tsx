
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">About MY-Care</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transforming healthcare in Malaysia with AI-powered telehealth solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-slate-600 mb-4">
                At MY-Care, our mission is to make quality healthcare accessible to everyone in Malaysia, 
                regardless of location or language barriers. We are committed to leveraging technology 
                to connect patients with healthcare professionals efficiently and effectively.
              </p>
              <p className="text-slate-600">
                We believe that everyone deserves access to quality healthcare services, and we're working 
                to make that a reality through our innovative telehealth platform.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-slate-600 mb-4">
                We envision a future where everyone in Malaysia has immediate access to healthcare services
                in their preferred language, where diagnosis and treatment are expedited through AI assistance,
                and where the burden on the healthcare system is reduced through efficient resource allocation.
              </p>
              <p className="text-slate-600">
                Our goal is to be the leading telehealth provider in Southeast Asia by 2030, known for our 
                innovation, reliability, and patient-centered approach.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">AI-Powered Diagnoses</h3>
                <p className="text-sm text-slate-600">
                  Using advanced AI to provide preliminary diagnoses and triage cases efficiently,
                  ensuring that urgent cases receive immediate attention.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Multilingual Support</h3>
                <p className="text-sm text-slate-600">
                  Offering services in Bahasa Malaysia, English, Mandarin, and Tamil to ensure
                  all Malaysians can access healthcare in their preferred language.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Doctor Network</h3>
                <p className="text-sm text-slate-600">
                  Partnering with qualified healthcare professionals across Malaysia to provide
                  expert care through our secure telehealth platform.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
            <p className="text-slate-600 max-w-3xl mx-auto mb-6">
              Whether you're a healthcare professional looking to expand your practice or a patient
              seeking better access to healthcare, we invite you to join the MY-Care community.
            </p>
            <div className="flex justify-center gap-4">
              <button className="btn bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md">
                For Healthcare Providers
              </button>
              <button className="btn border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-2 rounded-md">
                For Patients
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
