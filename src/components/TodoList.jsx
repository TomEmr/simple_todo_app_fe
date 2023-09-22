import TodoItem from "./TodoItem";

const TodoList = ({todos, fetchTodos}) => {
    return (
        <div>
            {todos.map((todo, index) => (
                <TodoItem key={index} todo={todo} fetchTodos={fetchTodos}/>
            ))}
        </div>
    );
};

export default TodoList;
