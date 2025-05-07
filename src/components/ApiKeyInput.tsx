
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useOpenAIApiKey } from "@/lib/openai";
import { toast } from "sonner";
import { Info } from "lucide-react";

interface ApiKeyInputProps {
  onComplete?: () => void;
}

const ApiKeyInput = ({ onComplete }: ApiKeyInputProps) => {
  const { apiKey, setApiKey, isKeySet } = useOpenAIApiKey();
  const [inputKey, setInputKey] = useState(apiKey);
  const [showDialog, setShowDialog] = useState(false);
  
  const handleSaveKey = () => {
    if (!inputKey || inputKey.trim().length < 10) {
      toast.error("Please enter a valid OpenAI API key");
      return;
    }
    
    setApiKey(inputKey.trim());
    toast.success("API key saved successfully");
    setShowDialog(false);
    
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <>
      {!isKeySet ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">API Key Required</h3>
              <p className="text-sm text-amber-700 mt-1">
                To use the AI diagnostic features, you need to provide your OpenAI API key.
              </p>
              <Button 
                onClick={() => setShowDialog(true)}
                className="mt-3 bg-amber-500 hover:bg-amber-600 text-white"
                size="sm"
              >
                Set API Key
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-emerald-700">API Key is set and ready</span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowDialog(true)}
            className="text-xs border-emerald-200 text-emerald-700"
          >
            Change Key
          </Button>
        </div>
      )}
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter OpenAI API Key</DialogTitle>
            <DialogDescription>
              Your API key is stored locally in your browser and never sent to our servers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="sk-..." 
                value={inputKey} 
                onChange={(e) => setInputKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                You can get your API key from{" "}
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  OpenAI's website
                </a>
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveKey} className="btn-primary">
                Save API Key
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApiKeyInput;
