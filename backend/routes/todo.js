const express = require('express');
const {createtodo, deletetodo, updatetodo, gettodos } = require('../controllers/todocontrollers');
const requireAuth = require('../middleware/requireauth');
const router = express.Router();
//all routes require auth
router.use(requireAuth);
//get all todos
router.get('/', gettodos);
//create a todo
router.post('/', createtodo);
//delete a todo
router.delete('/:id', deletetodo);
//update a todo
router.patch('/:id', updatetodo);
module.exports = router;
