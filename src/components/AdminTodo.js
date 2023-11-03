import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// This is the Admintodo it handles edits, deletes & updates. 
export default function AdminTodo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleEdit(todo, newTitle, newDescription);
    setIsEditing(false);
  };
// Inside Admin component
const handleEdit = async (todo, title, description) => {
  await updateDoc(doc(db, "todos", todo.id), { title, description });
};

  const handleCancelClick = () => {
    // Reset fields and exit editing mode
    setNewTitle(todo.title);
    setNewDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <div className="todo">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
       
        </>
      ) : (
        <>
          <p
            style={{ textDecoration: todo.completed && "line-through" }}
            onClick={handleEditClick}
          >
            {todo.title}
          </p>
          {todo.description && (
            <p className="description" onClick={handleEditClick}>
              {todo.description}
            </p>
          )}
          <div>
            <button
              className="button-complete"
              onClick={() => toggleComplete(todo)}
            >
              <CheckCircleIcon id="i" />
            </button>
            <button
              className="button-delete"
              onClick={() => handleDelete(todo.id)}
            >
              <DeleteIcon id="i" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
