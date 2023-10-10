import TodoItem from "./TodoItem";

const TodoList = ({todos, fetchTodos}) => {
    const listStyle = {
        padding: '20px',
    }
    return (
        <div style={listStyle}>
            {todos.map((todo, index) => (
                <TodoItem key={index} todo={todo} fetchTodos={fetchTodos}/>
            ))}
        </div>
    );
};

export default TodoList;
