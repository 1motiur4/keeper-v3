import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import axios from "axios";
import qs from 'qs';

function App() {
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/notes")
      .then(res => {
        setAllNotes(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  });

  function addNote(newNote) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    const data = qs.stringify({
      title: newNote.title,
      content: newNote.content
    });
    axios.post("http://localhost:5000/notes",
      data, headers
    ).then(res => console.log(res.data));
  }

  function deleteNote(id) {
    axios.delete("http://localhost:5000/notes/", {params: {id: id}})
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {allNotes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        )
      })}
      <Footer />
    </div>
  )
}

export default App;