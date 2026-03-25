import { Navigate } from "react-router-dom";
import { getStoredToken } from "../../utils/auth.js";

// Só deixa ver a página principal se exstir token
export default function ProtectedRoute({ children }) {
  const token = getStoredToken();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
