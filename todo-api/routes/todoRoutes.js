const express = require('express');
const router = express.Router();
const TodoController = require('../controller/TodoController');
const AuthChecker = require('../middleware/authChecker');

router.get('/View', AuthChecker.verifyToken, TodoController.ViewTodo);
router.post('/AddTodo', AuthChecker.verifyToken, TodoController.AddTodo);
router.delete('/Delete/:id', AuthChecker.verifyToken, TodoController.DeleteTodo); 
router.put('/update/:id', AuthChecker.verifyToken, TodoController.updateTodo);

module.exports = router;
