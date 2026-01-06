import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
import AuthRoute from "@/components/AuthRoute";
import PublicRoute from "@/components/PublicRoute";

const List = lazy(() => import('@/pages/List'))
const Layout = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('@/pages/Login'))
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
const Forget = lazy(() => import('@/pages/Forget'))


// 使用 Suspense 包裹组件
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        {withSuspense(Layout)}
      </AuthRoute>
    ),
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
            path: 'list',
            element: withSuspense(ListSettings)
          },
          {
            path: 'focus',
            element: withSuspense(FocusSettings)
          },
          {
            path: 'habit',
            element: withSuspense(HabitSettings)
          },
          {
            path: 'timeLine',
            element: withSuspense(TimeLineSettings)
          },
          {
            path: 'quadrants',
            element: withSuspense(QuadrantsSettings)
          },
        ]
      },
    ]
  },
  {
    path: 'login',
    element: (
      <PublicRoute>
        {withSuspense(Login)}
      </PublicRoute>
    )
  },
  {
    path: 'register',
    element: (
      <PublicRoute>
        {withSuspense(Register)}
      </PublicRoute>
    )
  },
  {
    path: 'forget',
    element: (
      <PublicRoute>
        {withSuspense(Forget)}
      </PublicRoute>
    )
  }
])

export default router;