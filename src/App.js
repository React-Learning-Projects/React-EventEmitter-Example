import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import EventEmitter3 from 'eventemitter3'

function Adder(props) { 
  const textfield = useRef(null);
  
  return (<div>
    <input ref={textfield}/>
    <button onClick={()=>{
      props.emitter.emit('add_todo', textfield.current.value)
    }}>Add Todo</button> 
  </div>);
}

function List(props) { 

  let todos = props.todos.map( (todo, i) => <div key={i}>{todo}</div>)

  return (<div>
    {todos}
  </div>);
}

function App() {
  const [todos, setTodos] = useState([]);
  const [eventEmitter, setEventEmitter] = useState(
    new EventEmitter3() 
  );

  useEffect( () => {
    eventEmitter.on("add_todo", (todo)=>{
      const newTodoObject = [...todos, todo]; 
      setTodos(newTodoObject)
    }, {})
  })

  return (
    <div className="App">
      <h1>TODO APPLICATION</h1>
       <Adder emitter={eventEmitter}> </Adder>
       <List todos={todos}> </List>
    </div>
  );
}

export default App;
