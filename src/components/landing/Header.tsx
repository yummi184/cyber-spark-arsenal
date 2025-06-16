
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface HeaderProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export const Header = ({ onShowLogin, onShowRegister }: HeaderProps) => {
  return (
    <nav className="p-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Shield className="h-8 w-8 text-purple-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          CyberX Security Hub
        </h1>
      </div>
      <div className="space-x-4">
        <Button variant="outline" onClick={onShowLogin} className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
          Login
        </Button>
        <Button onClick={onShowRegister} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Register
        </Button>
      </div>
    </nav>
  );
};
