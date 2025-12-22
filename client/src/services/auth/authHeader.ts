const authHeader = () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return undefined;
    const user = JSON.parse(storedUser);
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    } else {
      return undefined;
    }
  } catch {
    return undefined;
  }
};

export default authHeader;
