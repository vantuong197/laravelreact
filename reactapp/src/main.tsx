import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage.tsx";
import UserPage from "./pages/user/user/View.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from './redux/store'
import { Provider } from "react-redux";
import Layout from "./components/Layout.tsx";
import AuthMidleware from "./middleware/AuthMiddleware.tsx";
import LoginMiddleware from "./middleware/LoginMiddleware.tsx";
import {
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
    {
        path: "/admin",
        element: (
            <LoginMiddleware>
                <LoginPage />
            </LoginMiddleware>
        )
    },
    {
        path: "/",
        element: (
            <AuthMidleware>
                <Layout />
            </AuthMidleware>
        ),
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/user/index',
                element: <UserPage />
            }
        ]
    },
]);
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
        <Provider store={ store }>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ToastContainer />
            </QueryClientProvider>
        </Provider>
    // </React.StrictMode>
);
