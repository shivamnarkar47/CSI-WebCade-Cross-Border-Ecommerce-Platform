import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "@/components/HomePage.tsx"
import AuthPage from './components/Auth.tsx';
import SellerAuth from './components/SellerAuth.tsx';
import Dashboard from './components/Dashboard.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "auth/v1/:value",
        element: <AuthPage />
      },
      {
        path: "auth/v1/seller/:value",
        element: <SellerAuth />
      },
      {
        path: "dashboard/:id",
        element: <Dashboard />
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}  />
  </StrictMode>,
)
