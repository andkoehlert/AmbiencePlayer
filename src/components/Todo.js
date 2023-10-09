import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AudioPlayer from "./AudioPlayer";

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
    if (todo.completed === true) {
      setNewTitle(todo.title);
    } else {
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
          <div>
            <img src={todo.imageUrl} alt="Todo" /> {/* Display the image */}
          </div>
          <div>
            <input
              style={{ textDecoration: todo.completed && "line-through" }}
              type="text"
              value={newTitle}
              className="list"
              onChange={handleChange}
            />
            {showButtons && (
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
                <button
                  className="button-delete"
                  onClick={() => handleDelete(todo.id)}
                >
                  <DeleteIcon id="i" />
                </button>
              </>
            )}
        
            <AudioPlayer />
          </div>
        </>
      )}
    </div>
  );
}
