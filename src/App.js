import React, { useEffect, useState } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";


const App = () => { 
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
 
  useEffect(() => {
    if (localStorage.length > 0) {
      let locArr = JSON.parse(localStorage.getItem('key'));     
      let arr = [...locArr];
      setTodos(arr);      
      }    
  }, [])

  const toggleTodo = (id) => {  

    let localArr = [...todos]
    let a = localArr.map( todo => {
      if (todo.id === id){
        todo.completed = !todo.completed
      }      
    return todo
    });
    updateLocalStorege(a); 
    setTodos(a);

  }  
const checkFilter = () => {
    switch (filter){
      case 'all': 
        return todos;       
      case 'work': 
        return todos.filter(todo => todo.completed !== true)
      case 'compl': 
        return todos.filter(todo => todo.completed === true) 
      default:
        break; 
    }

}
const removeTodo = (id) => {  
  let localArr = pushTodos();
  let a;  

  const localCalc1 = () => {
    a = localArr.filter(localArr => localArr.id !== id) 
    updateLocalStorege(a);
  }

  if (filter==='all') {
    localCalc1();
  } else {
    localCalc1();
    localArr = [...todos];
    a = localArr.filter(localArr => localArr.id !== id);         
  }   
  setTodos(a);  
}

const clearAll= () => {
  localStorage.setItem('key', JSON.stringify([]));  
  setTodos([]);
  setFilter('all');
}

const showeWork = (id) => { 
  let localArr = pushTodos();
  setTodos(localArr.filter(todo => todo.completed !== true));
  setFilter('work');
}

const showeComplited = (id) => {
  let localArr = pushTodos();
  setTodos(localArr.filter(todo => todo.completed === true));
  setFilter('compl');
}

const showeAll = () => {
  let localArr = pushTodos();
  setTodos(localArr);
  setFilter('all');
}

const addTodo = (title) => {

  let b = [];
  let a = [];
  
  const localCalc = () => {
    let arrLocal = [...todos]
    console.log('else todos', todos) 
    console.log('else a do', a) 
    a = [...arrLocal]
    a.push({
      title,
      id: Date.now(),
      completed:false,
    });
    console.log('else a befor', a) 
    console.log('else ', filter )    
  }
  if (filter==='all') { 
    localCalc();
    updateLocalStorege(a);    
  } else {
    b = pushTodos();   
    localCalc(); 
    console.log('else ', filter )   
    b = b.concat(a.slice(a.length -1));     
    updateLocalStorege(b);  
    }  
  setTodos(a);
}

const updateLocalStorege = (a) => {     
  localStorage.setItem('key', JSON.stringify(a));  
}

const pushTodos = () => {
  let arr=[];
  if (localStorage.length > 0) {
    let locArr = JSON.parse(localStorage.getItem('key'));     
    arr = [...locArr];       
  }
  return arr; 
}

  return (
    <React.Fragment>   
    <Context.Provider value = {{removeTodo}}>
      <div className = 'body'>
    <div className = 'wrapper'>
      <h1>ToDo List</h1>
      <AddTodo onCreate={addTodo}/>
      {todos.length ? <TodoList todos={checkFilter} onToggle={toggleTodo}/> : <p>no Todo</p>}    
    </div>
    <div >  
     <button type='submit' onClick = {clearAll} className ='btnStates'>remove all</button> 
     <button type='submit' onClick = {showeAll} className ='btnStates'>show all</button> 
     <button type='submit' onClick = {showeWork} className ='btnStates'>show in worke</button> 
     <button type='submit' onClick = {showeComplited} className ='btnStates'>show complited</button>  
     </div> 
     </div>    
    </Context.Provider>
    </React.Fragment>
  );
}

export default App;