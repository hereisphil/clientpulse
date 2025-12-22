import useAuth from "@/context/useAuth";
import logoutUser from "@/services/auth/logoutUser";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logoutUser(); // 'official' logout which clears localStorage
    logout(); // logout of context for updating rendering
    navigate("/");
    toast.success("Successfully logged out.");
  };

  return (
    <header className="w-full p-4 flex justify-between items-center border-b-2 border-slate-800">
      <h2 className="text-2xl">
        <Link to="/">
          Client<span className="text-emerald-400">Pulse</span>
        </Link>
      </h2>

      <nav className="flex gap-2 items-center">
        <li className="primary-link px-2 rounded-md text-xl list-none">
          <Link to="/">Home</Link>
        </li>

        {user ? (
          <>
            <li className="primary-link px-2 rounded-md text-xl list-none">
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <button
              className="cursor-pointer px-2 rounded-md text-l hover:outline hover:text-red-500"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <li className="primary-link px-2 rounded-md text-xl list-none">
              <Link to="/login">Login</Link>
            </li>
            <li className="primary-link px-2 rounded-md text-xl list-none">
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
