// components/PublicRoute.tsx
import { checkAuth } from "@/utils/tool";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { stopTokenExpirationCheck } from "@/utils/token";

// 公共路由组件（已登录则跳转到首页）
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // 在白名单页面停止token过期检查，节省性能
    stopTokenExpirationCheck()
    
    return () => {
      // 组件卸载时不需要做特殊处理
    }
  }, []);

  const isAuthenticated = checkAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default PublicRoute;