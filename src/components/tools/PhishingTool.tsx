
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSession, UserDataManager, PhishingLink } from "@/utils/userData";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

interface PhishingToolProps {
  user: UserSession;
  onUseCredit: () => boolean;
}

export const PhishingTool = ({ user, onUseCredit }: PhishingToolProps) => {
  const [platform, setPlatform] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const { toast } = useToast();

  const platforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'gmail', label: 'Gmail' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'netflix', label: 'Netflix' },
    { value: 'custom', label: 'Custom URL' },
  ];

  const generatePhishingLink = () => {
    if (!platform || (platform === 'custom' && !customUrl)) {
      toast({
        title: "Missing Information",
        description: "Please select a platform or enter a custom URL",
        variant: "destructive",
      });
      return;
    }

    if (!onUseCredit()) return;

    const linkId = Date.now().toString();
    const baseUrl = window.location.origin;
    const phishingUrl = `${baseUrl}/ph/${platform === 'custom' ? 'custom' : platform}/${linkId}#${user.id}`;

    const phishingLink: PhishingLink = {
      id: linkId,
      userId: user.id,
      platform: platform === 'custom' ? customUrl : platform,
      url: phishingUrl,
      clicks: [],
      createdAt: new Date().toISOString()
    };

    UserDataManager.savePhishingLink(phishingLink);
    setGeneratedLink(phishingUrl);

    toast({
      title: "Phishing Link Generated",
      description: "Your educational phishing link has been created successfully!",
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
      <Card className="bg-gray-800/50 border-red-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-red-400">Phishing Link Generator</CardTitle>
          <p className="text-gray-400">Create educational phishing links to test security awareness</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Select Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                <SelectValue placeholder="Choose a platform to mimic" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map(p => (
                  <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {platform === 'custom' && (
            <div className="space-y-2">
              <Label className="text-gray-300">Custom URL</Label>
              <Input
                placeholder="Enter the URL to mimic"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          )}

          <Button 
            onClick={generatePhishingLink}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
            disabled={user.credits <= 0}
          >
            Generate Phishing Link (1 Credit)
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
                ⚠️ Educational Use Only: Share responsibly for security awareness training
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-red-900/20 border-red-500/30">
        <CardContent className="pt-6">
          <h4 className="text-red-400 font-bold mb-2">Educational Disclaimer</h4>
          <p className="text-red-300 text-sm">
            This tool generates links that mimic popular platforms for educational purposes only. 
            Use only with explicit consent for security awareness training and authorized penetration testing.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
