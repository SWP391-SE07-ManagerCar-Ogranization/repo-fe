import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

  const [role] = useState(localStorage.getItem("role"));
  return <AuthContext.Provider value={role}>{children}</AuthContext.Provider>;

}

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
