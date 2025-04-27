import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Mock Firebase Auth for this example
// In a real app, you would import and configure Firebase Auth

type User = {
  id: string;
  email: string;
  displayName: string | null;
  isEmailVerified: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (data: { displayName?: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock functions to simulate Firebase Auth behavior
const mockAuth = {
  async signIn(email: string, password: string): Promise<User> {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // This is where you would validate credentials with Firebase
    // For demo, we'll just check if it's a wits email
    if (!email.endsWith('@students.wits.ac.za')) {
      throw new Error('Only Wits University student emails are allowed');
    }
    
    // Mock successful sign-in
    return {
      id: '123456',
      email,
      displayName: email.split('@')[0],
      isEmailVerified: true,
    };
  },
  
  async signUp(email: string, password: string): Promise<User> {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Check if it's a wits email
    if (!email.endsWith('@students.wits.ac.za')) {
      throw new Error('Only Wits University student emails are allowed');
    }
    
    // Mock successful sign-up
    return {
      id: '123456',
      email,
      displayName: null,
      isEmailVerified: false,
    };
  },
  
  async signOut(): Promise<void> {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In a real app, you would call Firebase Auth signOut method
  },
  
  async forgotPassword(email: string): Promise<void> {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, you would call Firebase Auth sendPasswordResetEmail
  },
  
  async updateProfile(data: { displayName?: string }): Promise<void> {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, you would update the user profile in Firebase
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const checkUserSession = async () => {
      try {
        if (Platform.OS === 'web') {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          const storedUser = await SecureStore.getItemAsync('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Error restoring user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  useEffect(() => {
    // Redirect based on authentication state
    if (!isLoading) {
      if (user) {
        router.replace('/(app)/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    }
  }, [user, isLoading]);

  const storeUser = async (userData: User | null) => {
    try {
      if (Platform.OS === 'web') {
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          localStorage.removeItem('user');
        }
      } else {
        if (userData) {
          await SecureStore.setItemAsync('user', JSON.stringify(userData));
        } else {
          await SecureStore.deleteItemAsync('user');
        }
      }
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await mockAuth.signIn(email, password);
      setUser(userData);
      await storeUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await mockAuth.signUp(email, password);
      setUser(userData);
      await storeUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await mockAuth.signOut();
      setUser(null);
      await storeUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await mockAuth.forgotPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: { displayName?: string }) => {
    try {
      setIsLoading(true);
      await mockAuth.updateProfile(data);
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        await storeUser(updatedUser);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        forgotPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};