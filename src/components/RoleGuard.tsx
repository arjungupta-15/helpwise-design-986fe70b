import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

type Props = {
  children: ReactNode;
  allow?: Array<"employee" | "it">;
};

export const RoleGuard = ({ children, allow }: Props) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allow && !allow.includes(user.role)) {
    // Redirect employees away from IT-only routes
    return <Navigate to={user.role === "it" ? "/it-dashboard" : "/employee-dashboard"} replace />;
  }

  return <>{children}</>;
};