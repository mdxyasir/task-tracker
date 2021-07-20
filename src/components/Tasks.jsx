import Task from "./Task.jsx"

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id}
                task={task}
                onDelete={onDelete}
                onToggle={onToggle} />
            ))}

            <br></br>
            <p className="note">Double click individual tasks to toggle reminders</p>
        </>
    )
}

export default Tasks
