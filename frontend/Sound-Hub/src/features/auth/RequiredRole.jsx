import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

export default function RequireAdmin({ children, role = "user" }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== role) {
      navigate("/");
    }
  }, [user, navigate]);

  return user?.role === role ? children : null;
}