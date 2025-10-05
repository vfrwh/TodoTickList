import { createBrowserRouter,Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const List = lazy(() => import('@/pages/List'))
const Layout = lazy(() => import('@/pages/Layout'))
// 导入其他页面组件（如果需要不同的组件）
const Quadrants = lazy(() => import('@/pages/Quadrants'))
const Focus = lazy(() => import('@/pages/Focus'))
const Habit = lazy(() => import('@/pages/Habit'))
const TimeLine = lazy(() => import('@/pages/TimeLine'))
const Settings = lazy(() => import('@/pages/Settings'))

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(Layout),
    children: [
      {
        index: true, 
        element: <Navigate to="/list" replace />,
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
      },
    ]
  }
])

export default router;