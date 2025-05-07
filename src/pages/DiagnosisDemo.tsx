
import DemoDiagnosisPage from "@/components/DemoDiagnosisPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DiagnosisDemo = () => {
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
