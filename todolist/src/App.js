import './App.css';
import React, {useEffect} from 'react';
import axios from 'axios';
import {Todo} from './components/Todo'
import {TodoForm} from './components/TodoForm'

function App() {

  const baseUrl = 'http://localhost:3001/api/v1/tasks'

  const [todos, setTodos] = React.useState([]);

  useEffect(() => {
    async function loadData() {
      let response = await axios.get(baseUrl)
      if(response) {
        setTodos(response.data)
      }
    }
    loadData()
  }, [])

  const addTodo = (text) => {
    const newTodo = {task: text, isComplete: false}
    axios.post('http://localhost:3001/api/v1/tasks', newTodo).then(data=>setTodos([...todos, data.data])).catch(err=>console.log(err))
  }

  const markTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isComplete = !newTodos[index].isComplete
    axios.put(`http://localhost:3001/api/v1/tasks/mark/${index}`, newTodos[index]).then(response=>setTodos(newTodos)).catch(err=>console.log(err))
  }

  const deleteTodo = index => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    axios.delete(`${baseUrl}/index/${index}`).then(()=>{
      setTodos(newTodos)
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <center>
      <div className="app">
        <div className="todo-list">
            <TodoForm addTodo={addTodo} />
            <h2> Todo List: </h2>
            {todos.map((todo, index)=>
              <Todo key={index} index={index} todo={todo} deleteTodo={deleteTodo} markTodo = {markTodo}/>
            )}
        </div>
      </div>
    </center>
  );
}

export default App;
