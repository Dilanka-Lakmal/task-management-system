import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../services/api";

import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import SearchFilter from "../components/SearchFilter";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import ConfirmDelete from "../components/ConfirmDelete";
import Loading from "../components/Loading";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [showTaskForm, setShowTaskForm] =
    useState(false);
  const [editingTask, setEditingTask] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);
  const [selectedTask, setSelectedTask] =
    useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("newest");

  const loadDashboard = useCallback(async () => {
    try {
      const response = await api.get(
        "/tasks/dashboard"
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
      toast.error(
        "Could not load dashboard statistics"
      );
    }
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get("/tasks", {
        params: {
          search: search || undefined,
          status: status || undefined,
          priority: priority || undefined,
          sort,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Could not load tasks";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [search, status, priority, sort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 300);

    return () => clearTimeout(timer);
  }, [loadTasks]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const refreshData = async () => {
    await Promise.all([
      loadTasks(),
      loadDashboard(),
    ]);
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const closeTaskForm = () => {
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const saveTask = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(
          `/tasks/${editingTask.id}`,
          taskData
        );

        toast.success("Task updated successfully");
      } else {
        await api.post("/tasks", taskData);

        toast.success("Task created successfully");
      }

      closeTaskForm();
      await refreshData();
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Could not save the task";

      toast.error(message);

      throw error;
    }
  };

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedTask(null);
    setShowDeleteModal(false);
  };

  const deleteTask = async () => {
    if (!selectedTask) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(
        `/tasks/${selectedTask.id}`
      );

      toast.success("Task deleted successfully");

      closeDeleteModal();
      await refreshData();
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Could not delete the task";

      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container py-4">
        <div className="mb-4">
          <h1 className="h3 mb-1">
            Task Dashboard
          </h1>

          <p className="text-muted mb-0">
            Manage and track your daily tasks.
          </p>
        </div>

        <DashboardCards stats={stats} />

        <section className="card shadow-sm mt-4">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <h2 className="h4 mb-1">Tasks</h2>

                <p className="text-muted mb-0">
                  Create, update and organize your
                  tasks.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={openCreateForm}
              >
                + Create Task
              </button>
            </div>

            <SearchFilter
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
              sort={sort}
              setSort={setSort}
            />

            {loading ? (
              <Loading />
            ) : (
              <TaskTable
                tasks={tasks}
                onEdit={openEditForm}
                onDelete={openDeleteModal}
              />
            )}
          </div>
        </section>
      </main>

      <TaskForm
        show={showTaskForm}
        onClose={closeTaskForm}
        editingTask={editingTask}
        onSave={saveTask}
      />

      <ConfirmDelete
        show={showDeleteModal}
        task={selectedTask}
        deleting={deleting}
        onClose={closeDeleteModal}
        onConfirm={deleteTask}
      />
    </>
  );
}

export default Dashboard;