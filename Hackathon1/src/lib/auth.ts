
// Simple client-side auth simulation with localStorage
// NOTE: This is NOT secure for production use - it's just for demonstration

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const AUTH_KEY = 'health-future-auth';

// Mock users database
const USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123', // In a real app, passwords would be hashed
    name: 'Demo User'
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User'
  }
];

export const auth = {
  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        const user = USERS.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && 
          u.password === password
        );
        
        if (user) {
          const userData: User = {
            id: user.id,
            email: user.email,
            name: user.name
          };
          
          // Store in localStorage
          localStorage.setItem(AUTH_KEY, JSON.stringify({
            user: userData,
            isAuthenticated: true
          }));
          
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  },
  
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },
  
  getAuthState: (): AuthState => {
    try {
      const authData = localStorage.getItem(AUTH_KEY);
      if (authData) {
        return JSON.parse(authData) as AuthState;
      }
    } catch (error) {
      console.error('Error parsing auth data', error);
    }
    
    return {
      user: null,
      isAuthenticated: false
    };
  },
  
  isAuthenticated: (): boolean => {
    return auth.getAuthState().isAuthenticated || false;
  }
};
