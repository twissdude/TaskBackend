const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, taskController.createTask);
router.get('/', protect, taskController.getTasks);
router.put('/:id', protect, taskController.updateTask);
router.delete('/:id', protect, taskController.deleteTask);

module.exports = router;
