import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import('@/pages/Home'))
const Layout = lazy(() => import('@/pages/Layout'))

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback="加载中">
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
        element: withSuspense(Home),
      },
      {
        path: 'home',
        element: withSuspense(Home),
      },
    ]
  }
])

export default router;