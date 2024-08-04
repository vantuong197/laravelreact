import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/user/user/View";
import UserCreate from "./pages/user/user/Create";
import DashboardPage from "./pages/DashboardPage";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from './redux/store'
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import AuthMidleware from "./middleware/AuthMiddleware";
import LoginMiddleware from "./middleware/LoginMiddleware";
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
            },
            {
                path: '/user/create',
                element: <UserCreate />
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
