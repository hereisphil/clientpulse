import type { User } from "@/types/User";

const getCurrentUser = (): User | undefined => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return undefined;
    return JSON.parse(storedUser);
  } catch {
    return undefined;
  }
};

export default getCurrentUser;
