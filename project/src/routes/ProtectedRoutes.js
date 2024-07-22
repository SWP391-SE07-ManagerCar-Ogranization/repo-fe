import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpire, logout } from "../service/UserService";

export default function ProtectedRoute({ children, roles }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  useEffect(() => {

    if(isTokenExpire()) {
      logout();
      navigate("/login", { replace: true });
    }

    if (role === null) {
      navigate("/login", { replace: true });
    } else if (!roles.includes(role)) {
      navigate("/*");
    }
  }, [navigate, roles, role]);

  return children;
}
