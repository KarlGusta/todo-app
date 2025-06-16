const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema ({
    text: String
});
const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/api/todos', async (req, res) => {
    const todo = new Todo({text: req.body.text});
    await todo.save();
    res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
