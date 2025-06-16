
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserSession, UserDataManager } from "@/utils/userData";
import { Inbox, Eye, MapPin, Smartphone, Lock, MessageSquare, Wifi } from "lucide-react";

interface InboxPanelProps {
  user: UserSession;
}

export const InboxPanel = ({ user }: InboxPanelProps) => {
  const [phishingData, setPhishingData] = useState<any[]>([]);
  const [cameraData, setCameraData] = useState<any[]>([]);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [otpData, setOTPData] = useState<any[]>([]);

  useEffect(() => {
    // Load user's data
    setPhishingData(UserDataManager.getPhishingLinks(user.id));
    setCameraData(UserDataManager.getCameraLinks(user.id));
    setLocationData(UserDataManager.getLocationLinks(user.id));
    setOTPData(UserDataManager.getOTPAttacks(user.id));
  }, [user.id]);

  const totalClicks = phishingData.reduce((sum, link) => sum + link.clicks.length, 0);
  const totalCaptures = cameraData.reduce((sum, link) => sum + link.captures.length, 0);
  const totalLocations = locationData.reduce((sum, link) => sum + link.locations.length, 0);
  const totalOTPs = otpData.reduce((sum, attack) => sum + attack.sentCount, 0);

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center">
            <Inbox className="h-5 w-5 mr-2" />
            Security Testing Results
          </CardTitle>
          <p className="text-gray-400">View results from your educational security tests</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-900/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Smartphone className="h-8 w-8 text-red-400" />
                <Badge variant="destructive">{totalClicks}</Badge>
              </div>
              <p className="text-red-400 font-medium mt-2">Phishing Clicks</p>
              <p className="text-gray-400 text-sm">Total credential captures</p>
            </div>

            <div className="bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Eye className="h-8 w-8 text-purple-400" />
                <Badge className="bg-purple-600">{totalCaptures}</Badge>
              </div>
              <p className="text-purple-400 font-medium mt-2">Camera Access</p>
              <p className="text-gray-400 text-sm">Successful camera triggers</p>
            </div>

            <div className="bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <MapPin className="h-8 w-8 text-green-400" />
                <Badge className="bg-green-600">{totalLocations}</Badge>
              </div>
              <p className="text-green-400 font-medium mt-2">Location Tracks</p>
              <p className="text-gray-400 text-sm">Location data collected</p>
            </div>

            <div className="bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Lock className="h-8 w-8 text-blue-400" />
                <Badge className="bg-blue-600">{totalOTPs}</Badge>
              </div>
              <p className="text-blue-400 font-medium mt-2">OTP Messages</p>
              <p className="text-gray-400 text-sm">Total OTPs sent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-red-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-400 text-lg">Phishing Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {phishingData.length > 0 ? (
              phishingData.map((link, index) => (
                <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">{link.platform}</p>
                      <p className="text-sm text-gray-400">{link.clicks.length} clicks</p>
                    </div>
                    <Badge variant="outline">{new Date(link.createdAt).toLocaleDateString()}</Badge>
                  </div>
                  {link.clicks.length > 0 && (
                    <div className="mt-2 text-xs text-gray-400">
                      Latest click: {new Date(link.clicks[link.clicks.length - 1].timestamp).toLocaleString()}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No phishing links created yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-blue-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-400 text-lg">OTP Attack Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {otpData.length > 0 ? (
              otpData.map((attack, index) => (
                <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">{attack.targetPhone}</p>
                      <p className="text-sm text-gray-400">{attack.sentCount} OTPs sent</p>
                    </div>
                    <Badge variant={attack.status === 'active' ? 'default' : 'secondary'}>
                      {attack.status}
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Started: {new Date(attack.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No OTP attacks initiated yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
