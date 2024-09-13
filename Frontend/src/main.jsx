import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import router from './Router/Router'
import { RouterProvider } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)