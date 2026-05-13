const Todo = require('../models/todomodel');
const mongoose = require('mongoose');

//get all todos
exports.gettodos = async(req, res) => {
    const user_id = req.user._id;
    try{
        const todos = await Todo.find({user_id}).sort({createdAt: -1});
        res.status(200).json(todos);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

//get a single todo
exports.gettodo = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such todo'});
    }
    try{
        const user_id = req.user._id;
        const singletodo = await Todo.findOne({_id: id, user_id});
        if(!singletodo){
            return res.status(404).json({error:'No such todo'});
        }
        res.status(200).json(singletodo);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

//create a new todo
exports.createtodo = async(req, res) => {
    const {title, description, priority} = req.body;
    const emptyfields = [];
    
    if(!title){
        emptyfields.push('title');
    }
    if(!description){
        emptyfields.push('description');
    }
    if(!priority){
        emptyfields.push('priority');
    }
    
    if(emptyfields.length > 0){
        return res.status(400).json({error:'Please fill in all fields', emptyfields});
    }
    
    try{
        const user_id = req.user._id;
        const todo = await Todo.create({title, description, priority, user_id});
        res.status(200).json(todo);
    } catch(error){
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: 'Validation error', details: errors });
        }
        return res.status(400).json({ error: 'validation failed', fieldErrors: error.message });
    }
}

//delete a todo by its id
exports.deletetodo = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such todo'});
    }
    try{
        const user_id = req.user._id;
        const deletetodo = await Todo.findOneAndDelete({_id: id, user_id});
        if(!deletetodo){
            return res.status(404).json({error:'No such todo'});
        }
        res.status(200).json(deletetodo);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

//update a todo by its id
exports.updatetodo = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such todo'});
    }
    try{
        const user_id = req.user._id;
        const updatetodo = await Todo.findOneAndUpdate({_id: id, user_id}, {
            ...req.body
        }, {new: true});
        
        if(!updatetodo){
            return res.status(404).json({error:'No such todo'});
        }
        res.status(200).json(updatetodo);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}




