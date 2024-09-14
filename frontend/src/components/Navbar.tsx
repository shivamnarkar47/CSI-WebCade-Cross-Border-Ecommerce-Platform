import { Link, useLocation, useNavigate } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button";
import { handleLogout } from "@/lib/getUser";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const logout = () => {
    handleLogout();
    navigate("/")

  }
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" to={location.pathname.includes('dashboard') ? location.pathname : "/"}>
        <ShoppingCart className="h-6 w-6" />
        <span className="sr-only">Acme Store</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="#"
        >
          Products
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="#"
        >
          Categories
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="#"
        >
          About
        </Link>
        {!location.pathname.includes('dashboard') ? <Button onClick={() => navigate("/auth/v1/login")} >Login</Button> : <Button onClick={logout}>Logout</Button>}
      </nav>
    </header>
  );
};

export default Navbar;
