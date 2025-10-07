import { createRoot } from 'react-dom/client'
import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.scss'
import '@ant-design/v5-patch-for-react-19'

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
