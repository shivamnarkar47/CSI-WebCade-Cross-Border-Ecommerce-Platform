import {Link} from "react-router-dom"
import {ShoppingCart} from "lucide-react"
const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" to="#">
        <ShoppingCart className="h-6 w-6" />
        <span className="sr-only">Acme Store</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
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
        <Button></Button>
      </nav>
    </header>
  );
};

export default Navbar;