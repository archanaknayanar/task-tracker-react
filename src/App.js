import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { useState } from "react"
import { useEffect } from "react";
import Task from "./components/Task";
import { BrowserRouter, Routes, Route } from 'react-router-dom'



const App = () => {
  const [showAddBtn, setShowAddBtn] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect( () => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

//Fetch tasks from server
const fetchTasks = async() => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}

//Fetch single task
const fetchTask = async(id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}
//Add Task
const addTask = async(task) => {
  const res = await fetch(`http://localhost:5000/tasks`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

  const data = await res.json()
  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 1000 + 1)
  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])
}

//Delete Task
const deleteTask = async(id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, 
    {
    method: 'DELETE'
    }
  )

  setTasks(tasks.filter((task) => task.id !== id ))
}

//Toggle reminder
const toggleReminder = async(id) => {
  const taskToggle = await fetchTask(id)
  const updatedTask = {...taskToggle, reminder: !taskToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    }
  )

  const data = await res.json()

  setTasks(tasks.map((task) =>
    task.id == id ? {...task, reminder : data.reminder} : task
  ))
}
  return (
    <BrowserRouter>
    <div className="container">
      <Header 
        onAdd={() => setShowAddBtn(!showAddBtn)} 
        showAdd={showAddBtn}
      />
      
      <Routes>
        <Route path='/' element={(
          <>
            {showAddBtn && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}  onToggle={toggleReminder}/> : 'No tasks to show'}
          </>
        )} />
        <Route path='/about' element={<About />} /> 
      </Routes>
      
      <Footer />
    </div>
    </BrowserRouter>
    
  )
}

export default App;
