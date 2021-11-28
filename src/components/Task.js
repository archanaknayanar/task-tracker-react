import { FaAlignRight, FaFontAwesome } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
const Task = ({task1, onDelete , onToggle}) => {
    return (
        <div className={`task ${task1.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task1.id)}>
            <h3>{task1.text} 
            <FaTimes 
                style={{cursor:'pointer',color:'red'}} 
                onClick={() => onDelete(task1.id)}
            />
            </h3>
            <p>{task1.day}</p>
        </div>
    )
}

export default Task
