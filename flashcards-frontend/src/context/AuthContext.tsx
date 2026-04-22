import { createContext, useState } from "react";

type User = {
  username: string;
  role: "USER" | "ADMIN";
};

type AuthContextType = {
  user: User | null;
  loginDemo: () => void;
  loginAdmin: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  function loginDemo() {
    setUser({
      username: "razvan",
      role: "USER",
    });
  }

  function loginAdmin() {
    setUser({
      username: "admin",
      role: "ADMIN",
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginDemo,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
