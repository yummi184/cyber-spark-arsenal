
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Dashboard } from "@/components/Dashboard";
import { LandingPage } from "@/components/landing/LandingPage";
import { UserDataManager } from "@/utils/userData";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = UserDataManager.getCurrentUser();
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  if (showLogin) {
    return <LoginForm 
      onBack={() => setShowLogin(false)} 
      onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} 
      onLoginSuccess={handleLoginSuccess}
    />;
  }

  if (showRegister) {
    return <RegisterForm 
      onBack={() => setShowRegister(false)} 
      onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} 
      onRegisterSuccess={handleRegisterSuccess}
    />;
  }

  return (
    <LandingPage 
      onShowLogin={() => setShowLogin(true)}
      onShowRegister={() => setShowRegister(true)}
    />
  );
};

export default Index;
