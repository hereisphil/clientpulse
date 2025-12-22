import useAuth from "@/context/useAuth";
import { Link } from "react-router";

const Hero = () => {
  const { user } = useAuth(); // get user from context

  return (
    <section className="flex flex-col gap-4 text-center">
      <h2 className="text-3xl">Your clients.</h2>
      <h2 className="text-3xl text-amber-400">Your projects.</h2>
      <h2 className="text-3xl">One pulse.</h2>

      <p className="text-slate-500">
        The App built for freelance web developers. Track clients, manage
        projects, send invoices, and grow your business.
      </p>

      {user ? (
        <Link to="/dashboard" className="primary-button max-w-fit m-auto">
          Go to Dashboard
        </Link>
      ) : (
        <Link to="/login" className="primary-button max-w-fit m-auto">
          Login to Continue
        </Link>
      )}
    </section>
  );
};

export default Hero;
