const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const controller = require("../controllers/taskController");

router.use(auth);

router.get("/", controller.getTasks);

router.get("/dashboard", controller.dashboard);

router.get("/:id", controller.getTask);

router.post("/", controller.createTask);

router.put("/:id", controller.updateTask);

router.delete("/:id", controller.deleteTask);

module.exports = router;