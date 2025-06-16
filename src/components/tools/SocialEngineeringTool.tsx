
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserSession } from "@/utils/userData";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Users } from "lucide-react";

interface SocialEngineeringToolProps {
  user: UserSession;
  onUseCredit: () => boolean;
}

export const SocialEngineeringTool = ({ user, onUseCredit }: SocialEngineeringToolProps) => {
  const [targetInfo, setTargetInfo] = useState<string>('');
  const [scenario, setScenario] = useState<string>('');
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const { toast } = useToast();

  const scenarios = [
    { value: 'tech-support', label: 'Tech Support Scam' },
    { value: 'urgent-email', label: 'Urgent Email Request' },
    { value: 'prize-winner', label: 'Prize Winner Notification' },
    { value: 'security-alert', label: 'Security Alert' },
    { value: 'delivery-issue', label: 'Package Delivery Issue' },
  ];

  const generateScript = () => {
    if (!scenario || !targetInfo) {
      toast({
        title: "Missing Information",
        description: "Please select a scenario and provide target information",
        variant: "destructive",
      });
      return;
    }

    if (!onUseCredit()) return;

    const scripts = {
      'tech-support': `Hello ${targetInfo}, this is Microsoft Technical Support. We've detected suspicious activity on your computer. Please allow us remote access to secure your system immediately.`,
      'urgent-email': `Dear ${targetInfo}, your account will be suspended in 24 hours due to suspicious activity. Please click this link to verify your identity immediately.`,
      'prize-winner': `Congratulations ${targetInfo}! You've won $10,000 in our monthly lottery. Please provide your banking details to claim your prize.`,
      'security-alert': `SECURITY ALERT: ${targetInfo}, your account has been compromised. Please call this number immediately to secure your account.`,
      'delivery-issue': `Hello ${targetInfo}, we attempted to deliver your package but need additional information. Please click here to reschedule delivery.`,
    };

    setGeneratedScript(scripts[scenario as keyof typeof scripts] || 'Script not found');

    toast({
      title: "Social Engineering Script Generated",
      description: "Educational script created for awareness training",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-pink-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-pink-400 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Social Engineering Script Generator
          </CardTitle>
          <p className="text-gray-400">Generate educational social engineering scripts for awareness training</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Target Information</Label>
            <Input
              placeholder="Enter target name or company"
              value={targetInfo}
              onChange={(e) => setTargetInfo(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Scenario Type</Label>
            <select 
              value={scenario} 
              onChange={(e) => setScenario(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2"
            >
              <option value="">Select a scenario...</option>
              {scenarios.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <Button 
            onClick={generateScript}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
            disabled={user.credits <= 0}
          >
            <Users className="h-4 w-4 mr-2" />
            Generate Script (1 Credit)
          </Button>

          {generatedScript && (
            <div className="space-y-2">
              <Label className="text-gray-300">Generated Script</Label>
              <Textarea
                value={generatedScript}
                readOnly
                className="bg-gray-700/50 border-gray-600 text-white min-h-24"
              />
              <p className="text-xs text-yellow-400">
                ⚠️ Educational Use Only: Use for security awareness training with proper consent
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-red-900/20 border-red-500/30">
        <CardContent className="pt-6">
          <h4 className="text-red-400 font-bold mb-2">Ethical Guidelines</h4>
          <p className="text-red-300 text-sm">
            Social engineering scripts are for educational purposes only. Use only with explicit consent 
            for authorized security awareness training. Never use to deceive or manipulate individuals.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
