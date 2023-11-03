import React, { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AudioPlayer from "./AudioPlayer";
// This is the Todo for the homepage, it's slightly different from the Todo for the admin page
// This one is doesn't allow to edit the text or delete the todo
export default function Todo({
  todo,
  toggleComplete,
  handleDelete,
  
  showTextOnly,
  showButtons,
}) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [volume, setVolume] = useState(1);
  const [newDescription, setNewDescription] = useState(todo.description);

 
  
  console.log(todo);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  useEffect(() => {
    const videoElement = document.getElementById("myVideo");
    if (videoElement) {
      videoElement.volume = volume;
    }
  }, [volume]);


  
  return (
    <div className="todo h-screen overflow-hidden relative min-h-[1200px] md:min-h-screen ">
     {showTextOnly ? (
  <>
    <p style={{ textDecoration: todo.completed && "line-through" }}>
      {todo.title}
    </p>
    {todo.description && (
      <p className="description">{todo.description}</p>
    )}
  </>

        
      ) : (
        
        <>
        
          <div className="min-w-[500px]  sm:h-full xl:h-auto ">
            {todo.imageUrl && todo.imageUrl.trim() !== "" ? (
              <img src={todo.imageUrl} alt="Todo" className="w-full h-full object-cover" />
            ) : (
              <span></span>
            )}

            {todo.videoURL ? (
              <video
                className="w-full  object-cover min-h-[1200px] md:min-h-screen "
                autoPlay
                loop
                controls
                volume={volume}
                id="myVideo"
              >
                <source src={todo.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <span></span>
            )}
          </div>

          <div className="flex flex-col z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center flex-wrap text-xs	">
            <input
              className="	 "
              style={{ textDecoration: todo.completed && "line-through", fontSize: "20px", fontWeight: "bold" }}
              value={newTitle}
            />
            <input
              className="text-xs	"
              style={{ textDecoration: todo.completed && "line-through", fontSize: "20px" }}
              value={newDescription}
            />

            </div>
         
          
            {todo.videoURL && (
              <div className="flex flex-col justify-center items-center flex-wrap">
                <label
                  className="flex flex-wrap"
                  htmlFor="volumeControl"
                >
                  Volume:
                </label>
                <input
                  id="volumeControl"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            )}

            <AudioPlayer audioURL={todo.audioURL} />
          </div>
        </>
      )}
    </div>
  );
}
