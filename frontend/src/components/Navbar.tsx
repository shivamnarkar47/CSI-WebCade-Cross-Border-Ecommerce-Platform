import { Link, useLocation, useNavigate } from "react-router-dom"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button";
import { handleLogout } from "@/lib/getUser";
import { Input } from "./ui/input";
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
        <img src="https://i.ibb.co/q555Y2p/Screenshot-from-2024-09-14-14-29-32-removebg-preview.png" className="
        h-8
        w-8
        sm:h-10
        sm:w-10
        
        " alt="logo"/>
      </Link>
      {location.pathname.includes("dashboard") && (<div className="relative ml-10">
        <Input type="search" placeholder="Search products..." className="pl-10" />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>)}
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
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
        </Button>

        {!location.pathname.includes('dashboard') ? <Button onClick={() => navigate("/auth/v1/login")} >Login</Button> : <Button onClick={logout}>Logout</Button>}
      </nav>
    </header>
  );
};

export default Navbar;
