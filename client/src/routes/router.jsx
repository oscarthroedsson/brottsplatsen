import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import CrimeSite from "../pages/CrimeSite";
import Database from "../pages/Database";

// import ErrorPage from "./ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/brott/:crime/:location/:id",
      element: <CrimeSite />,
    },
    {
      path: "/databas",
      element: <Database />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
