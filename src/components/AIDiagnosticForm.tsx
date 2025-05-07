import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import LanguageToggle from "@/components/LanguageToggle";
import { initiateConsultation } from "@/services/consultationService";
import { Consultation } from "@/types/medical";
import { Loader2, Hospital, Info } from "lucide-react";
import { toast } from "sonner";
import AudioRecorder from "./AudioRecorder";

interface AIDiagnosticFormProps {
  patientId: string;
  onComplete: (consultation: Consultation) => void;
}

const AIDiagnosticForm = ({ patientId, onComplete }: AIDiagnosticFormProps) => {
  const [symptoms, setSymptoms] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const { toast: uiToast } = useToast();

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

  const getExampleSymptoms = () => {
    switch (language) {
      case 'ms':
        return "Contoh: Saya mengalami sakit kepala yang teruk, pening dan loya selama 3 hari. Saya juga mengalami demam ringan (37.5°C). Gejala ini bermula selepas makan tengah hari.";
      case 'zh':
        return "例如：我已经头痛、头晕和恶心三天了。我还有轻微发烧（37.5°C）。这些症状是在午餐后开始的。";
      case 'ta':
        return "உதாரணம்: எனக்கு 3 நாட்களாக கடுமையான தலைவலி, தலைச்சுற்றல் மற்றும் குமட்டல் உள்ளது. எனக்கு லேசான காய்ச்சலும் உள்ளது (37.5°C). இந்த அறிகுறிகள் மதிய உணவுக்குப் பிறகு தொடங்கின.";
      default:
        return "Example: I've been experiencing severe headache, dizziness and nausea for 3 days. I also have a mild fever (37.5°C). These symptoms started after lunch.";
    }
  };

  const getSymptomGuidelines = () => {
    switch (language) {
      case 'ms':
        return "Untuk hasil yang lebih tepat, sila nyatakan:\n• Tempoh gejala\n• Keterukan gejala\n• Apa yang membuatkan gejala lebih baik atau lebih teruk\n• Gejala lain yang berkaitan";
      case 'zh':
        return "为了获得更准确的结果，请说明：\n• 症状持续时间\n• 症状严重程度\n• 什么会使症状好转或恶化\n• 相关症状";
      case 'ta':
        return "மேலும் துல்லியமான முடிவுகளுக்கு, தயவுசெய்து குறிப்பிடவும்:\n• அறிகுறிகளின் கால அளவு\n• அறிகுறிகளின் தீவிரம்\n• எது அறிகுறிகளை மேம்படுத்துகிறது அல்லது மோசமடையச் செய்கிறது\n• தொடர்புடைய அறிகுறிகள்";
      default:
        return "For more accurate results, please specify:\n• Duration of symptoms\n• Severity of symptoms\n• What makes symptoms better or worse\n• Related symptoms";
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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Tips for Better Analysis</h3>
              <p className="text-sm text-blue-700 mt-1 whitespace-pre-line">
                {getSymptomGuidelines()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <AudioRecorder
        onTranscript={async (text, english, malay) => {
          let selectedText = text;
          if (language === 'ms' && malay) {
            selectedText = malay;
          } else if (language === 'en' && english) {
            selectedText = english;
          }
          setSymptoms(selectedText);

          // Immediately trigger AI assessment
          setLoading(true);
          try {
            const consultation = await initiateConsultation(patientId, selectedText, language);
            uiToast({
              title: "Success",
              description: "Your symptoms have been analyzed",
            });
            onComplete(consultation);
          } catch (error) {
            uiToast({
              title: "Error",
              description: "Failed to process your symptoms. Please try again.",
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        }}
      />

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Textarea
            placeholder={getPlaceholderText()}
            className="min-h-[150px]"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">{getExampleSymptoms()}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            className="text-sm flex items-center"
            onClick={() => setSymptoms(getExampleSymptoms())}
            disabled={loading}
          >
            <span className="mr-1">Use example</span>
          </Button>
          
          <Button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Hospital className="mr-2 h-4 w-4" />
                Analyze Symptoms
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIDiagnosticForm;
