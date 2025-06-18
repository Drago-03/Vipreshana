import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  
  // Function to clean URL of tokens for security
  const cleanUrlOfTokens = () => {
    // Check if we have hash or query strings with sensitive data
    if (
      (window.location.hash && window.location.hash.includes('access_token')) ||
      (window.location.search && window.location.search.includes('access_token'))
    ) {
      // For auth callback URLs, replace with dashboard directly
      if (window.location.pathname.includes('/auth/callback')) {
        window.history.replaceState(null, document.title, '/dashboard');
        console.log('Auth callback URL replaced with dashboard');
      } else {
        // For other URLs, just clean the params/hash
        window.history.replaceState(null, document.title, window.location.pathname);
        console.log('URL cleaned of sensitive tokens');
      }
    }
  };
  
  useEffect(() => {
    // Clean URL immediately on component mount
    cleanUrlOfTokens();
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting auth session:', error);
          return;
        }
        
        if (data?.session) {
          console.log('Found existing session:', data.session.user.email);
          // Only store minimal user information in state
          const safeUserData = {
            id: data.session.user.id,
            email: data.session.user.email,
            user_metadata: data.session.user.user_metadata ? {
              name: data.session.user.user_metadata.name,
              avatar_url: data.session.user.user_metadata.avatar_url,
              full_name: data.session.user.user_metadata.full_name,
            } : {}
          };
          
          setSession(data.session);
          setUser(safeUserData);
        }
      } catch (err) {
        console.error('Error in getInitialSession:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        
        // Clean URL when auth state changes
        cleanUrlOfTokens();
        
        if (newSession?.user) {
          // Only store minimal user information in state
          const safeUserData = {
            id: newSession.user.id,
            email: newSession.user.email,
            user_metadata: newSession.user.user_metadata ? {
              name: newSession.user.user_metadata.name,
              avatar_url: newSession.user.user_metadata.avatar_url,
              full_name: newSession.user.user_metadata.full_name,
            } : {}
          };
          
          setSession(newSession);
          setUser(safeUserData);
        } else {
          setSession(null);
          setUser(null);
        }
        
        setLoading(false);

        // Handle specific auth events
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          console.log('User signed in or token refreshed:', newSession?.user?.email);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      // Cleanup local storage
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPhone');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Safe getter for user public ID (no sensitive info)
  const getUserPublicId = () => {
    return user?.id || null;
  };
  
  // Helper function to determine if user is logged in
  const isLoggedIn = () => {
    return !!user;
  };
  
  // Provide auth context to the app
  const value = {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!user,
    getUserPublicId,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
