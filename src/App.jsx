import { useState, useEffect } from "react"
import Header from "./components/Header.jsx"
import Tasks from "./components/Tasks.jsx"
import AddTask from "./components/AddTask.jsx"
import Footer from "./components/Footer.jsx"

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',
    {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const newTask = await res.json()

    setTasks([...tasks, newTask])

    /*
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
    */
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedTask),
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id
    ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <div>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> ) : "No Tasks"}
      </div>
      <Footer />
    </div>
  );
}

export default App;
