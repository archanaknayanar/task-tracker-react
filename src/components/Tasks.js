import Task from "./Task"

const Tasks = ({tasks , onDelete , onToggle}) => {
    return (
        <>
        {tasks.map((task1) => (
            <Task key={task1.id} task1={task1} onDelete={onDelete} onToggle={onToggle} />
        ))}
        </>
    )
}

export default Tasks
