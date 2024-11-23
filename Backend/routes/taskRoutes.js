const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
// const { protect } = require('../middleware/authMiddleware');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
