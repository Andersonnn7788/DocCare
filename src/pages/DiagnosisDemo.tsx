import DemoDiagnosisPage from "@/components/DemoDiagnosisPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const DiagnosisDemo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <DemoDiagnosisPage />
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosisDemo;
