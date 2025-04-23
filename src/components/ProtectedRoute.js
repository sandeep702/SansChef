import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser(); // Check if user is signed in

  return isSignedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
