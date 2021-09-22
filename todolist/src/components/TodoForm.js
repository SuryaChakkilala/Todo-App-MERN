import React, {useState} from "react"

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('')
  
    const submitHandler = (e) => {
      e.preventDefault()
      if(!value) return
      addTodo(value)
      setValue('')
    }
  
    return (
      <center>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Enter the task" value={value} className="input" onChange={e=>setValue(e.target.value)} />
        <button type="submit" onClick={submitHandler}>Submit</button>
      </form>
      </center>
    )
}