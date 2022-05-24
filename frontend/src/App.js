// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState  } from "react";
import axios from "axios";
// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import LogsPage from "./pages/LogsPage/LogsPage";
import useAuth from "./hooks/useAuth";
import AgendaPage from "./pages/AgendaPage/AgendaPage";

function App() {
  const [user, token] = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);

  async function getAllLogs() {
    try {
        let response = await axios.get("http://127.0.0.1:8000/api/logs/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setLogs(response.data);
    }catch (error) {
      console.log(error.message)
    }
  
  }
  // GETS ALL THE PROJECTS FROM THE DATABASE
  async function getAllProjects() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/projects/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  // GETS ALL THE TASKS PER PROJECT
  async function getAllTasks() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="page">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage
              logs = {logs}
                tasks={tasks}
                projects={projects}
                setTasks={setTasks}
                getAllProjects={getAllProjects}
                getAllTasks={getAllTasks}
                getAllLogs= {getAllLogs}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <PrivateRoute>
              <LogsPage getAllTasks = {getAllTasks} getAllLogs= {getAllLogs} logs = {logs} tasks={tasks} projects={projects} />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/agenda" element ={<AgendaPage />}/>
      </Routes>
      {/* <div>
        <Footer />
      </div> */}
    </div>
  );
}

export default App;
