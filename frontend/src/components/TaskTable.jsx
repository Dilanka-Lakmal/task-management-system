import "./TaskTable.css";

function TaskTable({ tasks, onEdit, onDelete }) {
  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    return new Date(dateValue).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const priorityClass = (priority) => {
    if (priority === "High") {
      return "text-bg-danger";
    }

    if (priority === "Medium") {
      return "text-bg-warning";
    }

    return "text-bg-success";
  };

  const statusClass = (status) => {
    if (status === "Completed") {
      return "text-bg-success";
    }

    if (status === "In Progress") {
      return "text-bg-primary";
    }

    return "text-bg-secondary";
  };

  if (tasks.length === 0) {
    return (
      <div className="alert alert-light border text-center mt-4">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="table-responsive task-table-wrapper mt-4">
      <table className="table task-table align-middle">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Created</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="fw-semibold">
                {task.title}
              </td>

              <td>
                {task.description || (
                  <span className="text-muted">
                    No description
                  </span>
                )}
              </td>

              <td>
                <span
                  className={`badge ${priorityClass(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </td>

              <td>
                <span
                  className={`badge ${statusClass(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>

              <td>{formatDate(task.due_date)}</td>

              <td>
                {task.created_at
                  ? new Date(
                      task.created_at
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td className="text-center text-nowrap">
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm me-2 task-action-button"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm task-action-button"
                  onClick={() => onDelete(task)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;