import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Modal from "./Modal";
import axios from "axios";
import qs from 'qs';

function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [modalOnOff, setModalOnOff] = useState(false);
  const [modalFields, setModalFields] = useState({
    id: "",
    title: "",
    content: ""
  });

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
    axios.delete("http://localhost:5000/notes/", { params: { id: id } })
  }

  function editNote(id) {
    setModalOnOff(true);
    axios.get("http://localhost:5000/notes/" + id)
      .then(res => {
        console.log("Opened edit modal for: ");
        console.log(res.data);
        setModalFields({
          id: id,
          title: res.data.title,
          content: res.data.content
        })
      })
      .catch(err => {
        console.log("Error from Axios " + err)
      })
  }

  function modalSave(id) {
    console.log("beginning of modalSave")
    const data = qs.stringify(modalFields);
    axios.put("http://localhost:5000/notes/" + id, data)
      .then(res => console.log(res.data))
      .then(setModalOnOff(false));
  }

  function modalCancel() {
    setModalOnOff(false);
    setModalFields({
      id: "",
      title: "",
      content: ""
    })
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setModalFields(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  return (
    <div>
      {
        modalOnOff &&
        <Modal
          id={modalFields.id}
          title={modalFields.title}
          content={modalFields.content}
          onSave={modalSave}
          onCancel={modalCancel}
          onChange={handleChange}
        />}
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
            onEdit={editNote}
          />
        )
      })}

      <Footer />
    </div>
  )
}

export default App;