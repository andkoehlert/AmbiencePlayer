import React from "react";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";


// This is the adminpage that will be displayed when the user is logged in
// This is the main admin page which uses the "addtodo" component to add new todos & "todo" to display it

function Admin({ isAuthenticated }) {
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

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  if (isAuthenticated) {
    console.log('Not authenticated. Redirecting or showing a message...');

    return <p>You are not authorized to access this page.</p>;
    
  }
  

  return (
    <div className="">
      
      <div>
        <AddTodo />
      </div>
      <div className="homepage-background"> {/* Apply the class here */}      <div>
      
      </div>
      <div className="todo_container ">
        {todos.map((todo) => (
          <Todo
key={todo.id}
todo={todo}
showButtons={true}
showTextOnly={false} // Pass false to display everything
toggleComplete={toggleComplete}
handleDelete={handleDelete}
handleEdit={handleEdit}

/>          
        ))}
      </div>
    
    </div>
    </div>
  );
}

export default Admin;
