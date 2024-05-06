import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function ToDoList() {
    const [tasks, setTask]=useState([]);
    const [newTask, setNewTask]=useState([]);
    const [isTearing, setIsTearing]=useState(false);
    const [isCompleted, setIscompleted]=useState(false);
    

    function handleInputChange(event){
      setNewTask(event.target.value);
    }
    function AddTask(){
      if(newTask.trim()!==""){
        const newTaskObject = {
          description: newTask,
          isCompleted: false
        };
        setTask(t=>[...t, newTaskObject]);
        setNewTask("");
      };
      
    };

    
    const deleteAllTasks = () => {
      setIsTearing(true);
      setTimeout(() => {
        setTask([]);
        setIsTearing(false);
      }, 800);
    };

    function DeleteTask (index){
      const updateTasks=tasks.filter((_, i)=> i !==index);
      setTask(updateTasks);
    }

    
    function MarkAsCompleted(index) {
      const updatedTasks = tasks.map((task, i) => {
        if (i === index) {
          return {...task, isCompleted: !task.isCompleted};
        }
        return task;
      });
      setTask(updatedTasks);
    }
   
    const completedTasksCount = tasks.filter((task) => task.isCompleted).length;
  return (
    <div>
      <div className='container'>
        <div>
            <h1 className='title'>To-Do List</h1>
        </div>
        <InputGroup className="mb-3">
      <Form.Control
        placeholder="Type your task here..."
        aria-label="Type your task here..."
        aria-describedby="basic-addon2"
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && AddTask()}
      />
      <Button  onClick={AddTask} variant="outline-success" id="button-addon2">
        Add Task
      </Button>
    </InputGroup>
    <div>
      
      <Button  variant='danger' onClick={deleteAllTasks}>Delete All Tasks</Button>
    </div>
      
     <div className='list-of-tasks'>

     <ol>
        {tasks.map((task,index)=>
        
        <li 
        
        key={index}
        className={`${task.isCompleted ? "completed" : ""} ${
          isTearing ? "tearingAway" : ""
        }`}
        style={{
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
        
        >
            <span className='task'>
                {task.description}
                
                
            </span>
            <Button className='add' variant="outline-success" 
            onClick={() => MarkAsCompleted(index)}>
            {task.isCompleted ? "Mark as Uncompleted" : "Mark as Completed"}
             

             </Button>

            <Button className='delete'onClick={()=>DeleteTask(index)} variant="danger">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
          </Button>
                                
        </li>
    )}
      

    </ol>

    <div className="counter">
        <span className='totaltasks'>Total Tasks: {tasks.length}</span> <span className='pipe'>| </span><span className='totalcompleted'>Completed: {completedTasksCount}</span>
      </div>

     </div>

     
    
   
    
    </div>
    </div>
  );
}

export default ToDoList;