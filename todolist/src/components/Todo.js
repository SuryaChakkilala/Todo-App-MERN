export const Todo = ({todo, index, deleteTodo, markTodo}) => {
    return (
      <div className="todo" style={{textDecoration: todo.isComplete ? "line-through" : ""}}>
          {todo.task}
          <div>
            <button onClick={() => {markTodo(index)}}>Mark as Complete</button>
            <button onClick={() => {deleteTodo(index)}}>X</button>
          </div>
      </div>
    )
}