
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye } from "lucide-react";

export const FeaturesSection = () => {
  return (
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
  );
};
