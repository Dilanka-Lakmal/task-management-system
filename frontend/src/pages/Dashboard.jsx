import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadTasks();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/tasks/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <DashboardCards stats={stats} />

        <div className="d-flex justify-content-between mt-4">

          <h3>Tasks</h3>

          <button
            className="btn btn-primary"
          >
            + Create Task
          </button>

        </div>

        <table className="table table-bordered table-hover mt-3">

          <thead>

            <tr>

              <th>Title</th>

              <th>Priority</th>

              <th>Status</th>

              <th>Due Date</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {tasks.map(task => (

              <tr key={task.id}>

                <td>{task.title}</td>

                <td>{task.priority}</td>

                <td>{task.status}</td>

                <td>{task.due_date?.split("T")[0]}</td>

                <td>

                  <button className="btn btn-warning btn-sm me-2">

                    Edit

                  </button>

                  <button className="btn btn-danger btn-sm">

                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Dashboard;