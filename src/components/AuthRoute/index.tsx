// components/AuthRoute.tsx
import { checkAuth } from "@/utils/tool";
import { Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { startTokenExpirationCheck, stopTokenExpirationCheck, checkAndShowExpiredModal } from "@/utils/token";

// 认证路由守卫组件
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const hasCheckedRef = useRef(false); // 使用ref来跟踪是否已经检查过
  
  useEffect(() => {
    // 组件挂载时启动token过期检查
    startTokenExpirationCheck();
    
    // 监听token过期事件
    const handleTokenExpired = () => {
      console.log('收到token过期事件');
      // 这里不需要额外处理，showExpiredModal已经在定时器中调用
    };
    
    window.addEventListener('token-expired', handleTokenExpired);
    
    // 组件卸载时停止token过期检查
    return () => {
      stopTokenExpirationCheck();
      window.removeEventListener('token-expired', handleTokenExpired);
    };
  }, []);

  // 在进入受保护路由时立即检查一次
  const isAuthenticated = checkAuth();
  
  if (!isAuthenticated) {
    // 只有当用户有token且已初始化检查过才显示弹框
    // 首次进入时不显示弹框
    if (!hasCheckedRef.current) {
      hasCheckedRef.current = true;
      // 使用forceCheck为false的参数，避免初次显示弹框
      checkAndShowExpiredModal(false);
    }
    return <Navigate to="/login" replace />;
  }
  
  // 认证通过后标记为已检查
  if (!hasCheckedRef.current) {
    hasCheckedRef.current = true;
  }
  
  return <>{children}</>;
};

export default AuthRoute;