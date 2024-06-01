import React, { useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  CompanyList,
} from "./pages/index";
import List from "./pages/tasks/list";
import CreateTaskPage from "./pages/tasks/create";
import EditTaskPage from "./pages/tasks/edit";
import CreateCompany from "./pages/company/create-new-company";
import EditCompany from "./pages/company/edit-company";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="companies"
            element={
              <CompanyList>
                <Outlet />
              </CompanyList>
            }
          >
            <Route path="new" element={<CreateCompany />} />
            <Route path="edit/:id" element={<EditCompany />} />
          </Route>
          <Route
            path="tasks"
            element={
              <List>
                <Outlet />
              </List>
            }
          >
            <Route path="new" element={<CreateTaskPage />} />
            <Route path="edit/:id" element={<EditTaskPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
