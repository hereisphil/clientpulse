import type { User } from "@/types/User";
import { createContext } from "react";

export type AuthContextValue = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;
