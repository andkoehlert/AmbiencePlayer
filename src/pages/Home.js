import React from "react";
import Title from "../components/Title";
import "../App.css";

import Todo from "../components/Todo";
import AudioPlayer from "../components/AudioPlayer"
import {
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  return (
    <div className="homepage-background"> {/* Apply the class here */}      <div>
      
      </div>
      <div className="todo_container">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} showButtons={false} /> 
          
        ))}
      </div>
    
    </div>


  );
}

export default Home;