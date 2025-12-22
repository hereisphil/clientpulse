// const baseUrl = "https://clientpulse-dusky.vercel.app/api/v1";
const baseUrl = "http://127.0.0.1:8001/api/v1";

// Specify the type of Promise Response I'm looking for:
type LoginResponse = {
  token: string;
  email?: string;
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse | null> => {
  try {
    const response = await fetch(`${baseUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("LOGIN RESPONSE >>>", response);
    if (!response.ok) return null;
    const data = await response.json();
    console.log("DATA >>>", data);
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default login;
