import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
