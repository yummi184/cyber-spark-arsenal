
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Lock, Eye, MapPin, Wifi, Shield } from "lucide-react";

export const EducationalModulesSection = () => {
  return (
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
  );
};
