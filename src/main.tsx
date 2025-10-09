import { createRoot } from 'react-dom/client'
import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.scss'
import '@ant-design/v5-patch-for-react-19'
import { Provider } from 'react-redux'
import store, { persistor } from '@/store/index.ts'
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
    <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
        </PersistGate> 
    </Provider>  
)
