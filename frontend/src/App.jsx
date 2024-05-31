import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  CompanyList,
  CreateCompany,
} from "./pages/index";
import List from "./pages/tasks/list";
import CreateTaskPage from "./pages/tasks/create";
import EditTaskPage from "./pages/tasks/edit";

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
          <Route path="companies">
            <Route index element={<CompanyList />} />
            <Route path="new" element={<CreateCompany />} />
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
