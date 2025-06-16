
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormProps {
  onBack: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onBack, onSwitchToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToEthical: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms || !formData.agreeToEthical) {
      toast({
        title: "Registration Failed",
        description: "You must agree to the terms and ethical use policy",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.phone && formData.password && formData.name) {
      toast({
        title: "Registration Successful",
        description: "Welcome to CyberX Security Hub! You have 3 daily credits.",
      });
      // In real app, this would create account in Supabase and redirect to dashboard
      console.log("Registration successful", formData);
    } else {
      toast({
        title: "Registration Failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="absolute top-4 left-4 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-white">Join CyberX</CardTitle>
          <CardDescription className="text-gray-400">
            Create your security research account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400"
                required
              />
              <p className="text-xs text-gray-500">One account per phone number to ensure fair usage</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400"
                required
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  className="border-gray-600 data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ethical"
                  checked={formData.agreeToEthical}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToEthical: checked as boolean })}
                  className="border-gray-600 data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="ethical" className="text-sm text-gray-300">
                  I agree to use this platform only for educational and authorized security testing purposes
                </Label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Create Account
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <button 
                onClick={onSwitchToLogin}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
