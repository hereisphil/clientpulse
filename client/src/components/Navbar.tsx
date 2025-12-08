import { Link } from "react-router";

const navlinks = [
  { path: "/", title: "Home" },
  { path: "/dashboard", title: "Dashboard" },
];

const Navbar = () => {
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
      </nav>
    </header>
  );
};

export default Navbar;
