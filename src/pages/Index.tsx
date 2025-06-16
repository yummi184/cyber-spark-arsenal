
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, MapPin, Smartphone, Wifi } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />;
  }

  if (showRegister) {
    return <RegisterForm onBack={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-purple-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CyberX Security Hub
          </h1>
        </div>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => setShowLogin(true)} className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
            Login
          </Button>
          <Button onClick={() => setShowRegister(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Register
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
          CyberX Hacking Hub
        </h2>
        <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
          Advanced Cybersecurity Education Platform - Learn, Understand, and Defend
        </p>
        <p className="text-lg mb-12 text-yellow-400 font-semibold">
          Created by EmmyHenz - For Educational Purposes Only
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
            <CardHeader>
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <CardTitle className="text-purple-400">Security Research</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Learn how common attack vectors work in a controlled environment to better defend against them.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-pink-500/20 backdrop-blur-sm">
            <CardHeader>
              <Lock className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <CardTitle className="text-pink-400">Ethical Hacking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Understand penetration testing methodologies and vulnerability assessment techniques.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-red-500/20 backdrop-blur-sm">
            <CardHeader>
              <Eye className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <CardTitle className="text-red-400">Defense Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Learn how to identify, prevent, and mitigate various cybersecurity threats.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-6 py-16">
        <h3 className="text-4xl font-bold text-center mb-12 text-purple-400">About CyberX Security Hub</h3>
        <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg">
          <p>
            CyberX Security Hub is a comprehensive educational platform designed for cybersecurity professionals, 
            ethical hackers, and security researchers. Our platform provides hands-on learning experiences with 
            real-world attack scenarios in a controlled, legal environment.
          </p>
          <p>
            Our mission is to educate security professionals about common attack vectors, helping them understand 
            how these attacks work so they can better defend their organizations and clients against cyber threats.
          </p>
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mt-8">
            <h4 className="text-red-400 font-bold text-xl mb-4">⚠️ IMPORTANT DISCLAIMER</h4>
            <p className="text-red-300">
              This platform is designed exclusively for educational purposes and authorized security testing. 
              All content, tools, and techniques demonstrated here are intended for:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-red-300">
              <li>Cybersecurity education and awareness</li>
              <li>Authorized penetration testing</li>
              <li>Security research in controlled environments</li>
              <li>Understanding attack vectors for defense purposes</li>
            </ul>
            <p className="mt-4 text-red-300 font-semibold">
              Users are solely responsible for ensuring their activities comply with all applicable laws and regulations. 
              Unauthorized use of these techniques against systems you do not own or have explicit permission to test is illegal and unethical.
            </p>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="container mx-auto px-6 py-16">
        <h3 className="text-4xl font-bold text-center mb-12 text-purple-400">Educational Modules</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all">
            <CardHeader>
              <Smartphone className="h-8 w-8 text-purple-400" />
              <CardTitle className="text-purple-400">Social Engineering</CardTitle>
              <CardDescription className="text-gray-400">
                Learn about phishing techniques and how to identify them
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 border-pink-500/20 backdrop-blur-sm hover:border-pink-500/40 transition-all">
            <CardHeader>
              <Lock className="h-8 w-8 text-pink-400" />
              <CardTitle className="text-pink-400">Authentication Bypass</CardTitle>
              <CardDescription className="text-gray-400">
                Understand OTP vulnerabilities and security weaknesses
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 border-red-500/20 backdrop-blur-sm hover:border-red-500/40 transition-all">
            <CardHeader>
              <Eye className="h-8 w-8 text-red-400" />
              <CardTitle className="text-red-400">Privacy Exploitation</CardTitle>
              <CardDescription className="text-gray-400">
                Learn about camera and microphone security vulnerabilities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/20 backdrop-blur-sm hover:border-green-500/40 transition-all">
            <CardHeader>
              <MapPin className="h-8 w-8 text-green-400" />
              <CardTitle className="text-green-400">Location Tracking</CardTitle>
              <CardDescription className="text-gray-400">
                Understand geolocation privacy and IP tracking methods
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all">
            <CardHeader>
              <Wifi className="h-8 w-8 text-blue-400" />
              <CardTitle className="text-blue-400">Network Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Learn about network reconnaissance and vulnerability scanning
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-all">
            <CardHeader>
              <Shield className="h-8 w-8 text-yellow-400" />
              <CardTitle className="text-yellow-400">Malware Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Understand malware behavior and detection techniques
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 CyberX Security Hub by EmmyHenz. All rights reserved.
          </p>
          <p className="text-red-400 mt-2 font-semibold">
            For Educational and Authorized Security Testing Only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
