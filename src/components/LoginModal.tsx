
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'patient' | 'doctor';
}

const LoginModal = ({ isOpen, onClose, mode }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      // In a real app, we would make an API call here
      console.log('Logging in with:', { email, password, rememberMe, mode });
      
      // Show a toast notification
      toast.success(`${mode === 'patient' ? 'Patient' : 'Doctor'} login successful`, {
        description: "Welcome to MY-Care AI platform."
      });
      
      // Redirect based on role
      if (mode === 'patient') {
        // Navigate to patient portal (simulated)
        window.location.href = '#patient-portal';
      } else {
        // Navigate to doctor dashboard (simulated)
        window.location.href = '#doctor-dashboard';
      }
      
      onClose();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            {mode === 'patient' ? 'Daftar / Sign In' : 'Doctor Login'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === 'patient' 
              ? 'Access your medical consultation portal'
              : 'Access your clinical dashboard'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#forgot-password" className="text-xs text-emerald-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
            />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
              Remember me
            </Label>
          </div>
          
          {mode === 'patient' && (
            <div className="flex items-center space-x-2 pt-2 pb-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                required
              />
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                I agree to PDPA terms and the <a href="#privacy" className="text-emerald-600 hover:underline">privacy policy</a>
              </Label>
            </div>
          )}
          
          <Button type="submit" className="w-full btn-primary">
            {mode === 'patient' ? 'Start Consultation' : 'Access Dashboard'}
          </Button>
          
          {mode === 'patient' && (
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="#register" className="text-emerald-600 hover:underline font-medium">
                Register now
              </a>
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
