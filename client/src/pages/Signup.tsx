import signupUser from "@/services/auth/signupUser";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const user = {
      email,
      password,
    };
    try {
      const response = await signupUser(user);
      if (!response) throw new Error();
      toast.success("Welcome! You've signed up!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <main>
      <section className="flex flex-col items-center">
        <h1>Sign up</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center max-w-fit"
        >
          <label htmlFor="email">email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="status">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="primary-button mt-2 max-w-fit"
          >
            Sign up!
          </button>
        </form>
      </section>
    </main>
  );
}

export default Signup;
