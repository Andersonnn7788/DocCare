
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      // Log login details (for development only)
      console.info('Logging in with:', { email, password, rememberMe, mode });
      
      // Show a toast notification
      toast.success(`${mode === 'patient' ? 'Patient' : 'Doctor'} login successful`, {
        description: "Welcome to MY-Care AI platform."
      });
      
      // Close the modal first
      onClose();
      
      // Store user authentication state in localStorage (demo only)
      localStorage.setItem("my-care-user", JSON.stringify({
        email,
        role: mode,
        loggedIn: true
      }));
      
      // Navigate based on role - with a short delay to allow the toast to be seen
      setTimeout(() => {
        navigate('/diagnosis');
      }, 500);
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
