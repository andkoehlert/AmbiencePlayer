import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 } from "uuid";
import { storage } from "../firebase";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [description, setDescription] = useState(""); // New description state
  const [imageUrls, setImageUrls] = useState([]);

  // Function to upload music file to Firebase Storage
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

  // Function to handle image file selection and upload
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      let imageUrl = "image";
      if (imageUrls.includes(selectedImageUrl)) {
        imageUrl = selectedImageUrl;
      }
      await addDoc(collection(db, "todos"), {
        title,
        description, // Include the description in the document
        audioURL,
        imageUrl,
        completed: false,
      });
      setTitle("");
      setAudioFile(null);
      setAudioURL("");
      setSelectedImageUrl("");
      setDescription(""); // Clear the description after submission
    }
  };

  // Function to fetch existing image URLs from Firebase Storage
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

  useEffect(() => {
    fetchImageUrls();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input_container">
        <input
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
        <input
          type="file"
          accept="audio/*" // Accept audio files
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setAudioFile(e.target.files[0]);
              uploadMusicFile(e.target.files[0]);
            }
          }}
        />
      </div>
      <div>
     
      </div>
      <div>
        <select
          value={selectedImageUrl}
          onChange={(e) => setSelectedImageUrl(e.target.value)}
        >
          <option value="">Select an image</option>
          {imageUrls.map((url) => (
            <option key={url} value={url}>
              {url}
            </option>
          ))}
        </select>
      </div>
      <div className="btn_container">
        <button>Add</button>
      </div>
    </form>
  );
}
