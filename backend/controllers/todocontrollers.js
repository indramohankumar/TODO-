const Todo = require('../models/todomodel');
const mongoose = require('mongoose');

//get all todos
exports.gettodos = async(req, res) => {
    const user_id = req.user._id;
    const { search } = req.query;
    
    try {
        let query = { user_id };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        const todos = await Todo.find(query).sort({createdAt: -1});
        res.status(200).json(todos);
    } catch(error) {
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
    
    if(!title || !description || !priority){
        return res.status(400).json({ error: "Please fill in all the fields" });
    }
    
    try {
        const user_id = req.user._id;
        const todo = await Todo.create({
            title,
            description,
            priority,
            user_id
        });
        res.status(200).json(todo);
    } catch(error) {
        res.status(400).json({ error: "Failed to create todo. Please check your inputs." });
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

    const allowedUpdates = ['title', 'description', 'priority', 'completed'];
    const updates = {};
    
    for (let key in req.body) {
        if (allowedUpdates.includes(key)) {
            updates[key] = req.body[key];
        }
    }

    try {
        const user_id = req.user._id;
        const updatetodo = await Todo.findOneAndUpdate({_id: id, user_id}, updates, {new: true});
        
        if(!updatetodo){
            return res.status(404).json({error:'No such todo'});
        }
        res.status(200).json(updatetodo);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}




