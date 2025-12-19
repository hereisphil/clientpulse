import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // const response = await login({ email, password });
      // if (!response) throw new Error();
      // setAuthUser(response);
      console.log(email, password);
      toast.success("Welcome! You're logged in");
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
        <h1>Login</h1>
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
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
