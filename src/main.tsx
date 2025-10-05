import { createRoot } from 'react-dom/client'
import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.scss'

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
