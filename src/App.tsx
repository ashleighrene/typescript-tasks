import './App.css';
import InputField from './Components/InputField';
import TodoList from './Components/TodoList';
import React, {useState} from 'react'
import {Todo} from './model'
import {DragDropContext, DropResult} from 'react-beautiful-dnd';

const App: React.FC = () => {
  
const [todo, setTodo] = useState<string>("");
const [todos, setTodos] = useState<Array<Todo>>([]);
const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

const handleAdd = (e: React.FormEvent) => {
  e.preventDefault()
  
  if(todo) {

      setTodos([...todos, { id: Date.now(), todo, isDone: false}])
      setTodo("");

    }
};




  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;

    // Source Logic -----------
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    //Destination Logic -----------
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Task It</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

// Tutorial followed for this app:
// https://www.youtube.com/watch?v=FJDVKeh7RJI&t=1166s
