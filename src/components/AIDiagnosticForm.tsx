
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import LanguageToggle from "@/components/LanguageToggle";
import { initiateConsultation } from "@/services/consultationService";
import { Consultation } from "@/types/medical";
import { Loader2 } from "lucide-react";
import { useOpenAIApiKey } from "@/lib/openai";
import { toast } from "sonner";

interface AIDiagnosticFormProps {
  patientId: string;
  onComplete: (consultation: Consultation) => void;
}

const AIDiagnosticForm = ({ patientId, onComplete }: AIDiagnosticFormProps) => {
  const [symptoms, setSymptoms] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const { toast: uiToast } = useToast();
  const { isKeySet } = useOpenAIApiKey();

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      uiToast({
        title: "Error",
        description: "Please describe your symptoms",
        variant: "destructive",
      });
      return;
    }

    if (!isKeySet) {
      toast.error("Please set your OpenAI API key first");
      return;
    }
    
    setLoading(true);
    
    try {
      const consultation = await initiateConsultation(patientId, symptoms, language);
      uiToast({
        title: "Success",
        description: "Your symptoms have been analyzed",
      });
      onComplete(consultation);
    } catch (error) {
      console.error("Error during consultation:", error);
      uiToast({
        title: "Error",
        description: "Failed to process your symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get placeholder text based on selected language
  const getPlaceholderText = () => {
    switch (language) {
      case 'ms':
        return "Sila terangkan gejala anda dengan terperinci...";
      case 'zh':
        return "请详细描述您的症状...";
      case 'ta':
        return "உங்கள் அறிகுறிகளை விரிவாக விவரிக்கவும்...";
      default:
        return "Please describe your symptoms in detail...";
    }
  };

  return (
    <div className="card p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">AI Symptom Analysis</h2>
        <p className="text-gray-600 mb-4">
          Describe your symptoms below. Our AI will analyze them and help prioritize your care.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select your preferred language:
          </label>
          <LanguageToggle 
            onLanguageChange={handleLanguageChange} 
            currentLanguage={language}
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Textarea
            placeholder={getPlaceholderText()}
            className="min-h-[150px]"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            disabled={loading || !isKeySet}
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="btn-primary" 
            disabled={loading || !isKeySet}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Symptoms"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIDiagnosticForm;
