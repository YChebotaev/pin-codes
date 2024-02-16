import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClient } from "@pincodes/service-client";
import { ApiClientProvider } from "./providers/ApiClientProvider";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { GeneratorsPage } from "./pages/GeneratorsPage";
import { DocumentationPage } from "./pages/DocumentationPage";
import "./index.css";

const apiClient = createClient({
  baseURL: import.meta.env["VITE_APP_SERVICE_URL"]!,
  getToken() {
    return localStorage.getItem("token");
  },
});

const queryClient = new QueryClient();

const createRouter = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return createBrowserRouter([
      {
        path: "/auth/register",
        element: <Navigate to="/generators" />,
      },
      {
        path: "/auth/login",
        element: <Navigate to="/generators" />,
      },
      {
        index: true,
        element: <Navigate to="/generators" />,
      },
      {
        path: "/generators",
        element: <GeneratorsPage />,
      },
      {
        path: "/documentation",
        element: <DocumentationPage />,
      },
    ]);
  } else {
    return createBrowserRouter([
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        index: true,
        element: <Navigate to="/auth/register" />,
      },
      {
        path: "/generators",
        element: <Navigate to="/auth/register" />,
      },
      {
        path: "/documentation",
        element: <Navigate to="/auth/register" />,
      },
    ]);
  }
};

const reactRoot = ReactDOM.createRoot(document.getElementById("root")!);

export const refresh = () => {
  const router = createRouter();

  reactRoot.render(
    <React.StrictMode>
      <ApiClientProvider apiClient={apiClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ApiClientProvider>
    </React.StrictMode>,
  );
};

refresh();
