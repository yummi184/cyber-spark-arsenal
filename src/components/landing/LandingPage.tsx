
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { AboutSection } from "./AboutSection";
import { EducationalModulesSection } from "./EducationalModulesSection";
import { Footer } from "./Footer";

interface LandingPageProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export const LandingPage = ({ onShowLogin, onShowRegister }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <Header onShowLogin={onShowLogin} onShowRegister={onShowRegister} />
      <HeroSection />
      <div className="container mx-auto px-6">
        <FeaturesSection />
      </div>
      <AboutSection />
      <EducationalModulesSection />
      <Footer />
    </div>
  );
};
