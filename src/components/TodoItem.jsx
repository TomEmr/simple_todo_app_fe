import axios from "axios";

const TodoItem = ({ todo, fetchTodos }) => {

    const handleDelete = async () => {
        const deleteUrl = `${process.env.REACT_APP_API_TASK_URL}/${todo.id}`;
        try {
            await axios.delete(deleteUrl, {withCredentials: true});
            fetchTodos();
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error deleting todo';
            alert(errorMsg);
        }
    };

    const handleComplete = async () => {
        const completeUrl = `${process.env.REACT_APP_API_TASK_URL}/${todo.id}/completed`;
        try {
            await axios.patch(completeUrl, {}, {withCredentials: true});
            fetchTodos();
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error completing todo';
            alert(errorMsg);
        }
    };

    return (
        <div>
            {todo.title}
            <button onClick={handleComplete}>Complete</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TodoItem;