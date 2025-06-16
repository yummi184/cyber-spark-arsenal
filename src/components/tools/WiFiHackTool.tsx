
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSession } from "@/utils/userData";
import { useToast } from "@/hooks/use-toast";
import { Wifi, Search } from "lucide-react";

interface WiFiHackToolProps {
  user: UserSession;
  onUseCredit: () => boolean;
}

export const WiFiHackTool = ({ user, onUseCredit }: WiFiHackToolProps) => {
  const [targetSSID, setTargetSSID] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [networks, setNetworks] = useState<any[]>([]);
  const { toast } = useToast();

  const scanNetworks = () => {
    if (!onUseCredit()) return;

    setIsScanning(true);
    
    // Simulate network scanning
    setTimeout(() => {
      const mockNetworks = [
        { ssid: 'HomeNetwork_5G', security: 'WPA2', signal: -45, vulnerable: false },
        { ssid: 'CoffeeShop_WiFi', security: 'Open', signal: -60, vulnerable: true },
        { ssid: 'NETGEAR_Old', security: 'WEP', signal: -70, vulnerable: true },
        { ssid: 'SecureCorpNet', security: 'WPA3', signal: -55, vulnerable: false },
        { ssid: 'Guest_Network', security: 'WPA2', signal: -65, vulnerable: false },
      ];
      
      setNetworks(mockNetworks);
      setIsScanning(false);
      
      toast({
        title: "Network Scan Complete",
        description: `Found ${mockNetworks.length} networks`,
      });
    }, 3000);

    toast({
      title: "WiFi Scan Started",
      description: "Scanning for nearby networks...",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-yellow-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center">
            <Wifi className="h-5 w-5 mr-2" />
            WiFi Security Analyzer
          </CardTitle>
          <p className="text-gray-400">Scan and analyze WiFi networks for security vulnerabilities</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={scanNetworks}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            disabled={user.credits <= 0 || isScanning}
          >
            <Search className="h-4 w-4 mr-2" />
            {isScanning ? 'Scanning Networks...' : 'Scan WiFi Networks (1 Credit)'}
          </Button>

          {networks.length > 0 && (
            <div className="space-y-2">
              <Label className="text-gray-300">Detected Networks</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {networks.map((network, index) => (
                  <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">{network.ssid}</p>
                        <p className="text-sm text-gray-400">
                          {network.security} • Signal: {network.signal}dBm
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          network.vulnerable ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'
                        }`}>
                          {network.vulnerable ? 'Vulnerable' : 'Secure'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-red-900/20 border-red-500/30">
        <CardContent className="pt-6">
          <h4 className="text-red-400 font-bold mb-2">Legal Notice</h4>
          <p className="text-red-300 text-sm">
            This tool is for educational purposes to understand WiFi security. Only scan networks you own 
            or have explicit permission to test. Unauthorized network access is illegal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
