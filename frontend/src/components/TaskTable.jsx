function TaskTable({ tasks, onEdit, onDelete }) {
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
    <div className="table-responsive mt-4">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
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

              <td>
                {task.due_date?.split("T")[0]}
              </td>

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
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-sm"
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