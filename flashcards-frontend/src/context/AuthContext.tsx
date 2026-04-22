import { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken, parseJwt } from "../utils/token";
import {loginRequest, registerRequest} from "../components/auth/authApi";

type Role = "USER" | "ADMIN";

type User = {
  username: string;
  role: Role;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
  
    login: (
      username: string,
      password: string
    ) => Promise<void>;
  
    register: (
      username: string,
      password: string
    ) => Promise<void>;
  
    logout: () => void;
  };
  

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initializeSession = async () => {
      await restoreSession();
    };
  
    initializeSession();
  }, []);

  function restoreSession() {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    const decoded = parseJwt(token);

    if (!decoded) {
      removeToken();
      setLoading(false);
      return;
    }

    setUser({
      username: decoded.username,
      role: decoded.role,
    });

    setLoading(false);
  }

  useEffect(() => {
    restoreSession();
  }, []);

  async function login(
    username: string,
    password: string
  ) {
    const data =
      await loginRequest(
        username,
        password
      );

    setToken(data.token);

    const decoded =
      parseJwt(data.token);

    setUser({
      username: decoded.username,
      role: decoded.role,
    });
  }

  async function register(
    username: string,
    password: string
  ) {
    await registerRequest(
      username,
      password
    );
  }

  function logout() {
    removeToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading, 
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
