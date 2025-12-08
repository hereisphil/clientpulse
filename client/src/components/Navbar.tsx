import { Link } from "react-router";

const navlinks = [
  { path: "/", title: "Home" },
  { path: "/dashboard", title: "Dashboard" },
];

const Navbar = () => {
  return (
    <header className="py-4">
      <nav className="flex gap-2">
        {navlinks.map((link) => (
          <li
            key={link.title}
            className=" text-blue-400 hover:text-blue-600 hover:outline-2 outline-blue-400 px-2 rounded-md"
          >
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
