import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 } from "uuid";
import { storage } from "../firebase";
import AudioPlayer from './AudioPlayer';

// The addtodo is the component that allows the user to add a todo to the database.
// The user can add a title, description, image, audio file, and video file.
// The user can also play the audio file they have selected.
// It's gathering the data from specific folders in the database.

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);
  const [selectedAudioURL, setSelectedAudioURL] = useState("");
  const [audioUrls, setAudioUrls] = useState([]);
  const [selectedVideoFile, setSelectedVideoFile] = useState(null); // Added state for video file
  const [selectedVideoURL, setSelectedVideoURL] = useState("");
  const [videoUrls, setVideoUrls] = useState([]);


  // AUDIO UPLOAD
  async function uploadMusicFile(file) {
    if (file == null) return;
    const storage = getStorage();
    const storageRef = ref(storage, `music/${file.name}`);
  
    try {
      await uploadBytes(storageRef, file);
      console.log('Music file uploaded successfully');
      const downloadURL = await getDownloadURL(storageRef);
      setAudioURL(downloadURL);
    } catch (error) {
      console.error('Error uploading music file: ', error);
    }
  }
  
// VIDEO UPLOAD
  async function uploadVideoFile(file) {
    if (file == null) return;
    const storage = getStorage();
    const storageRef = ref(storage, `video/${file.name}`);
  
    try {
      await uploadBytes(storageRef, file);
      console.log('Video file uploaded successfully'); // Corrected log message
      const downloadURL = await getDownloadURL(storageRef);
      setSelectedVideoURL(downloadURL); // Updated state variable
    } catch (error) {
      console.error('Error uploading video file: ', error); // Corrected log message
    }
  }
// IMAGE UPLOAD
  const handleImageUpload = async (file) => {
    if (file == null) return;
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name + v4()}`);
    
    try {
      await uploadBytes(storageRef, file);
      console.log('Image uploaded successfully');
      const downloadURL = await getDownloadURL(storageRef);
      setSelectedImageUrl(downloadURL);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };
// CONNCTING WITH DB "IMAGES/ - FOR SPECIFIC FOLDER"
  const fetchImageUrls = async () => {
    const storage = getStorage();
    const imagesListRef = ref(storage, "images/");
    
    try {
      const response = await listAll(imagesListRef);
      const urls = await Promise.all(
        response.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        })
      );
      setImageUrls(urls);
    } catch (error) {
      console.error('Error fetching image URLs: ', error);
    }
  };
// CONNCTING WITH DB "MUSIC/ - FOR SPECIFIC FOLDER"

  const fetchAudioUrls = async () => {
    const storage = getStorage();
    const audioListRef = ref(storage, "music/");
    
    try {
      const response = await listAll(audioListRef);
      const urls = await Promise.all(
        response.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        })
      );
      setAudioUrls(urls);
    } catch (error) {
      console.error('Error fetching audio URLs: ', error);
    }
  };
// CONNCTING WITH DB "VIDEO/ - FOR SPECIFIC FOLDER"

  const fetchVideoUrls = async () => {
    const storage = getStorage();
    const videoListRef = ref(storage, "video/"); // Corrected reference to "video"
    
    try {
      const response = await listAll(videoListRef); // Corrected reference to "video"
      const urls = await Promise.all(
        response.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        })
      );
      setVideoUrls(urls);
    } catch (error) {
      console.error('Error fetching video URLs: ', error); // Corrected log message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      let imageUrl = null;
      if (imageUrls.includes(selectedImageUrl)) {
        imageUrl = selectedImageUrl;
      }
      await addDoc(collection(db, "todos"), {
        title,
        description,
        audioURL: selectedAudioURL,
        imageUrl: selectedImageUrl,
        videoURL: selectedVideoURL, // Added video URL to the document
        completed: false,
      });
      setTitle("");
      setAudioFile(null);
      setAudioURL("");
      setSelectedAudioFile(null);
      setSelectedAudioURL("");
      setSelectedImageUrl("");
      setSelectedVideoFile(null); // Reset video file state
      setSelectedVideoURL("");
      setDescription("");
    }
  };

  useEffect(() => {
    fetchImageUrls();
    fetchAudioUrls();
    fetchVideoUrls();
  }, []);

  return (
    <div className="py-20 ">
    <form className="md:min-w-[800px]"
     onSubmit={handleSubmit}>
      <div className="input_container">
        <input
        className=""
          type="text"
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
    <div>Choose either image or video</div>
    <div>In description, let user know to "tap screen to play" if video selected</div>
    <div>You can still edit the Title & description afterwards. Click edit icon when done.</div>

      </div>
      <div>
        <select
          className="w-full p-2 border rounded"

          value={selectedImageUrl}
          onChange={(e) => setSelectedImageUrl(e.target.value)}
        >
          <option value="">Select an image</option>
          {imageUrls.map((url) => (
            <option key={url} value={url} className="image-text">
            {url.split('.').pop()} {/* Get the last part of the path which is the file name */}
          </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="w-full p-2 border rounded "

          value={selectedVideoURL}
          onChange={(e) => setSelectedVideoURL(e.target.value)}
        >
          <option className="text-sm" value="">Select a video</option>
          {videoUrls.map((url) => (
         <option key={url} value={url} className="video-text">
         {url.split('.').pop()} {/* Get the last part of the path which is the file name */}
       </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="w-full p-2 border rounded"

          value={selectedAudioURL}
          onChange={(e) => setSelectedAudioURL(e.target.value)}
        >
          <option value="">Select an audio file</option>
          {audioUrls.map((url) => (
           <option key={url} value={url} className="audio-text">
           {url.split('.').pop()} {/* Get the last part of the path which is the file name */}
         </option>
          ))}
        </select>
      </div>
     
      <div>
       
      </div>

      {selectedAudioURL && (
        <AudioPlayer audioURL={selectedAudioURL} />
      )}

      <div className="btn_container pt-2">
        <button>Add</button>
      </div>
    </form>
    </div>
  );
}
