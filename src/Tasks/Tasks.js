import React, {useState} from 'react';
import './tasks.css';
import ListItem from './ListItem';




function Tasks() {
    const [task, setTask] = useState('')
    const [taskList, setTaskList] = useState([]);


    function handleChange(e){
        setTask(e.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()

        if (task.trim()){
            const newTask = {id: Date.now(), text: task};
            setTaskList([newTask, ...taskList])
            setTask('');        

        }


    }


  return (
    <div className='tasks-div'>
        <form onSubmit={handleSubmit}>
            <input
             type='text'
             value={task}
             onChange={handleChange}
             placeholder='Add your task'>

             </input>
            <input 
            type='submit'
            value='Add'
            >
            </input>
        </form>

        <ListItem taskList={taskList} setTaskList={setTaskList}/>
        

    </div>
  )
}

export default Tasks