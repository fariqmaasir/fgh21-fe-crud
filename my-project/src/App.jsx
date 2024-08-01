// import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TableUsers from "./pages/TableUsers";
import CreateUsers from "./pages/CreateUsers";
import EditUsers from "./pages/EditUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TableUsers />,
  },
  {
    path: "/create-users",
    element: <CreateUsers />,
  },
  {
    path: "/edit-users/:id",
    element: <EditUsers />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
