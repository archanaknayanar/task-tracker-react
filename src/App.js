import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react"

const App = () => {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Visit Doctor',
        day: 'November 1 at 10am',
        reminder: true,
    },
    {
        id: 2,
        text: 'Call Dad and mom',
        day: 'November 1 at 1pm',
        reminder: false,
    },
    {
        id: 3,
        text: 'Eat medicine',
        day: 'November 1 at 9pm',
        reminder: true,
    }
])
  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;
