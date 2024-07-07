import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <LoginPage />,
    },
    {
        path: "/user",
        element: <UserPage />,
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
    },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
