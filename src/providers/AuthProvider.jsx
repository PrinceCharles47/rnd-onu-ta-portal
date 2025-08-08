import { createContext, useState } from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { useUser } from "../hooks/user/useUser";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // const { getLoggedInUser } = useUser();
  const { login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        login: login.mutate,
        logout: logout.mutate,
        loginStatus: login.status,
        logoutStatus: logout.status,
        // currentUser: getLoggedInUser.data,
        // isLoadingUser: getLoggedInUser.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
