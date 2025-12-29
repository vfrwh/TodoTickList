import { createBrowserRouter,Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const List = lazy(() => import('@/pages/List'))
const Layout = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('@/pages/Login'))
// 导入其他页面组件（如果需要不同的组件）
const Quadrants = lazy(() => import('@/pages/Quadrants'))
const Focus = lazy(() => import('@/pages/Focus'))
const Habit = lazy(() => import('@/pages/Habit'))
const TimeLine = lazy(() => import('@/pages/TimeLine'))
const Settings = lazy(() => import('@/pages/Settings'))
const ListSettings = lazy(() => import('@/pages/Settings/List'))
const FocusSettings = lazy(() => import('@/pages/Settings/Focus'))
const HabitSettings = lazy(() => import('@/pages/Settings/Habit'))
const TimeLineSettings = lazy(() => import('@/pages/Settings/TimeLine'))
const QuadrantsSettings = lazy(() => import('@/pages/Settings/Quadrants'))
const Register = lazy(() => import('@/pages/Register'))

// 检查是否有 token
const checkAuth = () => {
  const token = localStorage.getItem('token');
  return !!token;
};


// 不需要权限的页面requireAuth需要明确指定 false
const withSuspense = (Component: React.ComponentType,requireAuth = true) => {
  if (requireAuth && !checkAuth()) {
    return <Navigate to="/login" replace />;
  } 
  return (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
  )
}
const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(Layout),
    children: [
      {
        index: true, 
        element: <Navigate to="/focus" replace />,
      },
      {
        path: 'list',
        element: withSuspense(List),
      },
      {
        path: 'quadrants',
        element: withSuspense(Quadrants), 
      },
      {
        path: 'focus',
        element: withSuspense(Focus),
      },
      {
        path: 'habit',
        element: withSuspense(Habit),
      },
      {
        path: 'timeLine',
        element: withSuspense(TimeLine),
      },
      {
        path: 'settings',
        element: withSuspense(Settings),
        children: [
          {
            index: true,
            element: <Navigate to="/settings/list" replace />,
          },
          {
            path:'list',
            element:withSuspense(ListSettings)
          },
          {
            path:'focus',
            element:withSuspense(FocusSettings)
          },
          {
            path:'habit',
            element:withSuspense(HabitSettings)
          },
          {
            path:'timeLine',
            element:withSuspense(TimeLineSettings)
          },
          {
            path:'quadrants',
            element:withSuspense(QuadrantsSettings)
          },
        ]
      },
    ]
  },
  {
    path: 'login',
    // 如果已登录，自动重定向到首页
    element: checkAuth() ? <Navigate to="/" replace /> : withSuspense(Login, false)
  },
  {
    path: 'register', // 添加注册路由
    // 如果已登录，自动重定向到首页
    element: checkAuth() ? <Navigate to="/" replace /> : withSuspense(Register, false)
  }
])

export default router;