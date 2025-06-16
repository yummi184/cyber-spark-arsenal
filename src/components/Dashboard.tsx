
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDataManager, UserSession } from "@/utils/userData";
import { Shield, LogOut, Smartphone, Lock, Eye, MapPin, Wifi, MessageSquare, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PhishingTool } from "./tools/PhishingTool";
import { CameraHackTool } from "./tools/CameraHackTool";
import { LocationHackTool } from "./tools/LocationHackTool";
import { OTPBlockTool } from "./tools/OTPBlockTool";
import { WiFiHackTool } from "./tools/WiFiHackTool";
import { SocialEngineeringTool } from "./tools/SocialEngineeringTool";
import { InboxPanel } from "./InboxPanel";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = UserDataManager.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      onLogout();
    }
  }, [onLogout]);

  const handleLogout = () => {
    UserDataManager.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    onLogout();
  };

  const handleToolUse = (toolName: string) => {
    if (!user) return false;
    
    if (user.credits <= 0) {
      toast({
        title: "No Credits",
        description: "You have no credits left. Credits reset daily.",
        variant: "destructive",
      });
      return false;
    }

    const success = UserDataManager.useCredit(user.id);
    if (success) {
      setUser(prev => prev ? { ...prev, credits: prev.credits - 1 } : null);
      toast({
        title: "Credit Used",
        description: `Used 1 credit for ${toolName}. ${user.credits - 1} credits remaining.`,
      });
      return true;
    }
    return false;
  };

  const tools = [
    { id: 'phishing', name: 'Phishing Generator', icon: Smartphone, color: 'text-red-400 border-red-500/20' },
    { id: 'camera', name: 'Camera Hack', icon: Eye, color: 'text-purple-400 border-purple-500/20' },
    { id: 'location', name: 'Location Tracker', icon: MapPin, color: 'text-green-400 border-green-500/20' },
    { id: 'otp', name: 'OTP Blocker', icon: Lock, color: 'text-blue-400 border-blue-500/20' },
    { id: 'wifi', name: 'WiFi Analyzer', icon: Wifi, color: 'text-yellow-400 border-yellow-500/20' },
    { id: 'social', name: 'Social Engineering', icon: MessageSquare, color: 'text-pink-400 border-pink-500/20' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center border-b border-purple-500/20">
        <div className="flex items-center space-x-4">
          <Shield className="h-8 w-8 text-purple-400" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CyberX Security Hub
            </h1>
            <p className="text-sm text-gray-400">Welcome back, {user.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400 font-medium">{user.credits} Credits</span>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="whitespace-nowrap"
          >
            Overview
          </Button>
          {tools.map(tool => (
            <Button
              key={tool.id}
              variant={activeTab === tool.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tool.id)}
              className="whitespace-nowrap"
            >
              <tool.icon className="h-4 w-4 mr-2" />
              {tool.name}
            </Button>
          ))}
          <Button
            variant={activeTab === 'inbox' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('inbox')}
            className="whitespace-nowrap"
          >
            Inbox
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <Card key={tool.id} className={`bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all cursor-pointer ${tool.color}`}
                    onClick={() => setActiveTab(tool.id)}>
                <CardHeader>
                  <tool.icon className="h-12 w-12 mx-auto mb-4" />
                  <CardTitle className="text-center">{tool.name}</CardTitle>
                  <CardDescription className="text-center text-gray-400">
                    Educational security testing tool
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'phishing' && <PhishingTool user={user} onUseCredit={() => handleToolUse('Phishing Generator')} />}
        {activeTab === 'camera' && <CameraHackTool user={user} onUseCredit={() => handleToolUse('Camera Hack')} />}
        {activeTab === 'location' && <LocationHackTool user={user} onUseCredit={() => handleToolUse('Location Tracker')} />}
        {activeTab === 'otp' && <OTPBlockTool user={user} onUseCredit={() => handleToolUse('OTP Blocker')} />}
        {activeTab === 'wifi' && <WiFiHackTool user={user} onUseCredit={() => handleToolUse('WiFi Analyzer')} />}
        {activeTab === 'social' && <SocialEngineeringTool user={user} onUseCredit={() => handleToolUse('Social Engineering')} />}
        {activeTab === 'inbox' && <InboxPanel user={user} />}
      </div>
    </div>
  );
};
