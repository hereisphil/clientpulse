import logoutUser from "@/services/auth/logoutUser";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const navlinks = [
  { path: "/", title: "Home" },
  { path: "/dashboard", title: "Dashboard" },
  { path: "/login", title: "Login" },
  { path: "/signup", title: "Signup" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    toast.success("Successfully logged out.");
  };

  return (
    <header className="w-full p-4 flex justify-between place-items-center border-b-2 border-slate-800">
      <h2 className="text-2xl">
        <Link to="/">
          Client<span className="text-emerald-400">Pulse</span>
        </Link>
      </h2>
      <nav className="flex gap-2">
        {navlinks.map((link) => (
          <li key={link.title} className="primary-link px-2 rounded-md text-xl">
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
        <button
          className="cursor-pointer px-2 rounded-md text-l hover:outline hover:text-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
