const db = require("../config/db");

// Get all tasks
const getTasks = (req, res) => {
    let sql = "SELECT * FROM tasks WHERE user_id = ?";
    const params = [req.user.id];

    if (req.query.search) {
        sql += " AND title LIKE ?";
        params.push(`%${req.query.search}%`);
    }

    if (req.query.status) {
        sql += " AND status = ?";
        params.push(req.query.status);
    }

    if (req.query.priority) {
        sql += " AND priority = ?";
        params.push(req.query.priority);
    }

    if (req.query.sort === "oldest") {
        sql += " ORDER BY created_at ASC";
    } else if (req.query.sort === "due") {
        sql += " ORDER BY due_date ASC";
    } else {
        sql += " ORDER BY created_at DESC";
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Get one task
const getTask = (req, res) => {
    db.query(
        "SELECT * FROM tasks WHERE id=? AND user_id=?",
        [req.params.id, req.user.id],
        (err, results) => {
            if (err) return res.status(500).json(err);

            if (results.length === 0)
                return res.status(404).json({ message: "Task not found" });

            res.json(results[0]);
        }
    );
};

// Create task
const createTask = (req, res) => {

    const { title, description, priority, status, due_date } = req.body;

    if (!title || !priority || !status || !due_date) {
        return res.status(400).json({
            message: "Required fields are missing"
        });
    }

    db.query(
        `INSERT INTO tasks
        (user_id,title,description,priority,status,due_date)
        VALUES (?,?,?,?,?,?)`,
        [
            req.user.id,
            title,
            description,
            priority,
            status,
            due_date
        ],
        (err) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
                message: "Task created successfully"
            });
        }
    );
};

// Update task
const updateTask = (req, res) => {

    const { title, description, priority, status, due_date } = req.body;

    db.query(
        `UPDATE tasks
        SET title=?,description=?,priority=?,status=?,due_date=?
        WHERE id=? AND user_id=?`,
        [
            title,
            description,
            priority,
            status,
            due_date,
            req.params.id,
            req.user.id
        ],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Task updated"
            });

        }
    );
};

// Delete task
const deleteTask = (req, res) => {

    db.query(
        "DELETE FROM tasks WHERE id=? AND user_id=?",
        [req.params.id, req.user.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Task deleted"
            });

        }
    );
};

// Dashboard
const dashboard = (req, res) => {

    db.query(
        `
        SELECT

        COUNT(*) total,

        SUM(status='Pending') pending,

        SUM(status='In Progress') progress,

        SUM(status='Completed') completed,

        SUM(due_date<CURDATE() AND status!='Completed') overdue

        FROM tasks

        WHERE user_id=?
        `,
        [req.user.id],
        (err, results) => {

            if (err) return res.status(500).json(err);

            res.json(results[0]);

        }
    );

};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    dashboard
};