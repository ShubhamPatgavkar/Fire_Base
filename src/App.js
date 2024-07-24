import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import './App.css';
// for CRUD
import { db, storage } from "./config/firebase";
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { uploadBytes } from "firebase/storage";
import { ref } from "firebase/storage"

// CRUD Operations

function App() {
  const [movieList, setMovieList] = useState([]);

  const [movieTitle, setMovieTitle] = useState("");
  const [date, setDate] = useState(0);
  const [isOscar, setIsOscar] = useState(false);

  const [newTitle, setNewtitle] = useState("");

  const MovieCollection = collection(db, "movies");
  const [uploadFile, setUploadFile] = useState(null);

  const getMovies = async () => {
    const data = await getDocs(MovieCollection);
    setMovieList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };


  const submitMovie = async () => {

    if (date === 0 || movieTitle === "") {
      alert("Date or title is missing")
    } else {
      try {
        await addDoc(MovieCollection, {
          Oscar: isOscar,
          ReleaseDate: date,
          title: movieTitle
        });
        getMovies();
        alert("New Movie Details are Added ");
      } catch (err) {
        alert(err.message);
      }
    }

  }

  const deleteMovie = (id) => {
    const movie = doc(db, "movies", id);
    deleteDoc(movie);

    //for reredering the page
    getMovies();
  }

  useEffect(() => {
    getMovies();
  }, []); // Empty dependency array means this effect runs once on mount


  const updateMovie = (id) => {
    const movie = doc(db, "movies", id);
    updateDoc(movie, { title: newTitle });

    getMovies();
  }

  const fileUpload = async () => {
    if (!uploadFile) {
      return;
    }
    try {
      const filref = ref(storage, `movieFiles/${uploadFile.name}`,);

      await uploadBytes(filref, fileUpload);
      alert("File uploaded successfully");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="App">

      <div className='movieInput'>

        <input placeholder='Enter Movie' onChange={(e) => setMovieTitle(e.target.value)} />
        <input placeholder='Release Date' onChange={(e) => setDate(e.target.value)} />
        <input name="oscar" type='checkBox' checked={isOscar} onChange={(e) => setIsOscar(e.target.checked)} />
        <label >Won Oscar?</label>
        <button onClick={submitMovie}>Submit Movie</button>

      </div>

      <h1>Movie List</h1>

      {movieList.map(movie => (
        <div>

          <h2 key={movie.id} style={{ backgroundColor: movie.Oscar ? 'lightgreen' : 'white' }}> {movie.title} </h2>
          <p> ReleaseOn : {movie.ReleaseDate}</p>
          {movie.Oscar ? "Won the Oscar" : ""}
          <button onClick={() => deleteMovie(movie.id)}>DeleteMovie</button>
          <input placeholder='Enter new name' onChange={(e) => setNewtitle(e.target.value)} />
          <button onClick={() => updateMovie(movie.id)}>Update</button>
         
        </div>



      ))}
      <div>
        <br /><br /><br /><br />
        <input type='file' onChange={(e) => setUploadFile(e.target.files[0])} />
        <button onClick={fileUpload}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
