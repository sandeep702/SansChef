import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignOutButton , useUser} from "@clerk/clerk-react"; // Clerk Auth
import logo from "../../images/colored_logo.svg";
import Theme from "./Theme"; // Theme switcher
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="header">
      <div className="logo">
        <h1 className="logo-name">
          <img src={logo} alt="Logo" />Sans 
          <span>Chef</span>
        </h1>
      </div>

      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/cart">🛒Cart</Link></li>
          <li><Link to="/grocery">Grocery</Link></li>
 
          <div className="flex items-center space-x-4">
            {/* User Icon and Name (Only if Signed In) */}
            <SignedIn>
              <div className="flex items-center italic font-serif userName">
                <FaUserCircle className="text-2xl mr-2" />
                <span className="font-semibold font-xl">{user?.fullName || "User"}</span>
              </div>
            </SignedIn>
          {/* Login/Logout with Clerk - More Interactive Buttons */}
         
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 mr-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-2xl shadow-sm transition-all duration-300 hover:from-green-600 hover:to-green-800 hover:scale-105 active:scale-95">
                Login
              </button>
            </SignInButton>
          </SignedOut>
      

          <SignedIn>
            <SignOutButton>
              <button className="px-6 py-2 mr-4 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-2xl shadow-sm transition-all duration-300 hover:from-red-600 hover:to-red-800 hover:scale-105 active:scale-95">
                Logout
              </button>
            </SignOutButton>
          </SignedIn>
          </div>
          {/* Theme Switcher */}
          <Theme />
        </ul>
      </div>
    </div>
  );
};

export default Header;


