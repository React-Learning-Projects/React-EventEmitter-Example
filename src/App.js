import React, { useState, useEffect, useRef, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import EventEmitter3 from 'eventemitter3'

const EventContext = React.createContext()

function Adder(props) { 
  const textfield = useRef(null);
  const emitter = useContext(EventContext)
  return (<div>
    <input ref={textfield}/>
    <button onClick={()=>{
      emitter.emit('add_todo', textfield.current.value)
    }}>Add Todo</button> 
  </div>);
}

function List(props) { 
  const econtext = useContext(EventContext)
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
    <EventContext.Provider value={eventEmitter}>
      <div className="App">
        <h1>TODO APPLICATION</h1>
        <Adder></Adder>
        <List todos={todos}> </List>
      </div>
    </EventContext.Provider>
  );
}

export default App;
