
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSession, UserDataManager, OTPAttack } from "@/utils/userData";
import { useToast } from "@/hooks/use-toast";
import { Lock, Phone } from "lucide-react";

interface OTPBlockToolProps {
  user: UserSession;
  onUseCredit: () => boolean;
}

export const OTPBlockTool = ({ user, onUseCredit }: OTPBlockToolProps) => {
  const [targetPhone, setTargetPhone] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [attackId, setAttackId] = useState<string>('');
  const [sentCount, setSentCount] = useState<number>(0);
  const { toast } = useToast();

  const startOTPAttack = () => {
    if (!targetPhone) {
      toast({
        title: "Missing Phone Number",
        description: "Please enter a valid WhatsApp number",
        variant: "destructive",
      });
      return;
    }

    if (!onUseCredit()) return;

    const attack: OTPAttack = {
      id: Date.now().toString(),
      userId: user.id,
      targetPhone,
      status: 'active',
      sentCount: 0,
      createdAt: new Date().toISOString()
    };

    UserDataManager.saveOTPAttack(attack);
    setAttackId(attack.id);
    setIsRunning(true);
    setSentCount(0);

    // Simulate OTP sending
    const interval = setInterval(() => {
      setSentCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          toast({
            title: "OTP Attack Complete",
            description: "Sent 100 OTP messages. Target should be temporarily blocked.",
          });
        }
        return newCount;
      });
    }, 1000);

    toast({
      title: "OTP Attack Started",
      description: "Sending OTP messages to target number...",
    });
  };

  const stopOTPAttack = () => {
    setIsRunning(false);
    toast({
      title: "OTP Attack Stopped",
      description: `Attack stopped after sending ${sentCount} messages.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-blue-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            OTP Blocker Tool
          </CardTitle>
          <p className="text-gray-400">Educational tool to demonstrate OTP flooding vulnerabilities</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Target WhatsApp Number</Label>
            <Input
              placeholder="+1234567890"
              value={targetPhone}
              onChange={(e) => setTargetPhone(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
              disabled={isRunning}
            />
          </div>

          {!isRunning ? (
            <Button 
              onClick={startOTPAttack}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              disabled={user.credits <= 0}
            >
              <Phone className="h-4 w-4 mr-2" />
              Start OTP Flood (1 Credit)
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-green-400 font-medium">Attack in Progress</p>
                <p className="text-gray-300">OTPs Sent: {sentCount}</p>
                <p className="text-gray-400 text-sm">Target: {targetPhone}</p>
              </div>
              <Button 
                onClick={stopOTPAttack}
                variant="destructive"
                className="w-full"
              >
                Stop Attack
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-red-900/20 border-red-500/30">
        <CardContent className="pt-6">
          <h4 className="text-red-400 font-bold mb-2">Ethical Use Warning</h4>
          <p className="text-red-300 text-sm">
            This tool demonstrates OTP flooding attacks for educational purposes. Use only with explicit consent 
            and never target individuals without authorization. Misuse may violate laws and terms of service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
