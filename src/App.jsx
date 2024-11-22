import React from "react";
import HomePages from "./pages/Landing/HomePages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskPages from "./pages/Landing/TaskPage";
import FormTask from "./pages/Admin/FormTask";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Umum */}
        <Route path="/" element={<HomePages />} />
        <Route path="/task" element={<TaskPages />} />
        <Route path="/form-task" element={<FormTask />} />

      </Routes>
    </Router>
  );
};

export default App;
