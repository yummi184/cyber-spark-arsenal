
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserDataManager } from "@/utils/userData";

interface LoginFormProps {
  onBack: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onBack, onSwitchToRegister, onLoginSuccess }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const user = UserDataManager.loginUser(formData.phone, formData.password);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}! You have ${user.credits} credits remaining.`,
      });
      onLoginSuccess();
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
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
          <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to access CyberX Security Hub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button 
                onClick={onSwitchToRegister}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Register here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
