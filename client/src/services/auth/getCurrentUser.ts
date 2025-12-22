import type { User } from "@/types/User";

const getCurrentUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export default getCurrentUser;
