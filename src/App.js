import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react"; // Clerk Provider
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
import About from "./components/About";
import Error from "./components/Error";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Grocery from "./components/Grocery";
import RestaurantMenu from "./components/RestaurantMenu";

// import ProtectedRoute from "./components/ProtectedRoute"; 
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//use process env only for parcle import meta is for vite support
const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
const AppLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </ClerkProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu/>,
      },
      {
        path:"/grocery",
        element:<Grocery/>,
      },
     
      
      { 
        path: "/cart", 
        element: <Cart />
          
        
      },
      
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />
  
);