import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from './redux/store'
import { Provider } from "react-redux";
import DashboardLayout from "./components/DashboardLayout.tsx";
import AuthMidleware from "./middleware/AuthMiddleware.tsx";
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
    {
        path: "/admin",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: (
            <AuthMidleware>
                <DashboardLayout />
            </AuthMidleware>
        ),
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/user',
                element: <UserPage />
            }
        ]
    },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={ store }>
            <RouterProvider router={router} />
            <ToastContainer />
        </Provider>
    </React.StrictMode>
);
