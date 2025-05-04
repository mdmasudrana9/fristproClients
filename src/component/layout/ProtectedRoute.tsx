import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // Check if the user is authenticated
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace={true} />; // Redirect to the login page if not authenticated
  }

  return children;
};

export default ProtectedRoute;
