import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AudioPlayer from "./AudioPlayer"; // Import your AudioPlayer component here

export default function Todo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
  showTextOnly,
  showButtons,
}) {
  const [newTitle, setNewTitle] = React.useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  return (
    <div className="todo">
      {showTextOnly ? (
        <p style={{ textDecoration: todo.completed && "line-through" }}>
          {todo.title}
        </p>
      ) : (
        <>
          <input
            style={{ textDecoration: todo.completed && "line-through" }}
            type="text"
            value={newTitle}
            className="list"
            onChange={handleChange}
          />
          <div>
            {showButtons && ( // Conditionally render buttons based on showButtons prop
              <>
                <button
                  className="button-complete"
                  onClick={() => toggleComplete(todo)}
                >
                  <CheckCircleIcon id="i" />
                </button>
                <button
                  className="button-edit"
                  onClick={() => handleEdit(todo, newTitle)}
                >
                  <EditIcon id="i" />
                </button>
                <button className="button-delete" onClick={() => handleDelete(todo.id)}>
                  <DeleteIcon id="i" />
                </button>
              </>
            )}
            {/* Render the AudioPlayer component here */}
            <AudioPlayer />
          </div>
        </>
      )}
    </div>
  );
}