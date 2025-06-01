import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import logo from "../../public/images/colored_logo.svg";
import Theme from "./Theme";

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
            <SignedIn>
              <div className="flex items-center gap-2">
                {user?.imageUrl && (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div className="text-left">
                  <p className="font-bold font-sans text-orange-600 text-sm">{user?.fullName}</p>
                  <p className="text-xs font-serif font-semibold text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
            </SignedIn>
          
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
          <Theme />
        </ul>
      </div>
    </div>
  );
};

export default Header;