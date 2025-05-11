import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
import About from "./components/About";
import Error from "./components/Error";
import Cart from "./components/Cart";
import Grocery from "./components/Grocery";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Environment variables (using process.env for Parcel)
const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;
const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

// Initialize OpenAI client (example - would actually use in specific components)
const initializeOpenAI = () => {
  if (!OPENAI_API_KEY) {
    console.warn("OpenAI API key not found. Some features may be disabled.");
    return null;
  }
  // In practice, you'd initialize your OpenAI client here
  return { apiKey: OPENAI_API_KEY };
};

const AppLayout = () => {
  // Initialize OpenAI when component mounts
  React.useEffect(() => {
    const openAIClient = initializeOpenAI();
    // You might want to store this in context or state
  }, []);

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
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: <Grocery />,
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
root.render(<RouterProvider router={appRouter} />);