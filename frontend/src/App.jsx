import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Register, ForgotPassword } from "./pages/index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
