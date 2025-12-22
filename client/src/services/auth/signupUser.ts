const baseUrl = "https://clientpulse-dusky.vercel.app/api/v1";

// Specify the type of Promise Response I'm looking for:
type signupResponse = {
  token: string;
  email?: string;
};

const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<signupResponse | null> => {
  try {
    const response = await fetch(`${baseUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("SIGNUP RESPONSE >>>", response);
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

export default signup;
