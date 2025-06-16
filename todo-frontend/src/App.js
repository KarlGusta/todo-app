import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    useEffect(()=> {
        axios.get('/api/todos').then(res=>setTodos(res.data));
    }, []);

    const addTodo = () => {
        axios.post('/api/todos', {text}).then(res=>{
            setTodos([...todos, res.data]);
            setText('');
        });
    };

    const deleteTodo = (id) => {
        axios.delete(`/api/todos/${id}`).then(() => {
            setTodos(todos.filter(t=> t._id !== id));
        });
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input value={text} onChange={e=> setText(e.target.value)} />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        {todo.text} <button onClick={() => deleteTodo(todo._id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;