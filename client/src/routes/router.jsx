import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

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
      path: "/databas",
      element: <Database />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
