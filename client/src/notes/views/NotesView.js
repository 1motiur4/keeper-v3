import React, { useEffect, useState } from "react";
import CreateArea from "../components/CreateArea";
import Note from "../components/Note";
import Modal from "../components/Modal";

import { fetchNotes, addNote, deleteNote, fetchNote, editNote } from "../actions";

function NotesView() {
  const [allNotes, setAllNotes] = useState([]);
  const [invalidate, setInvalidate] = useState(true);
  const [modalOnOff, setModalOnOff] = useState(false);
  const [modalFields, setModalFields] = useState({
    id: "",
    title: "",
    content: ""
  });

  //Grabs all notes
  useEffect(() => {
    fetchNotes()
      .then(res => {
        setAllNotes(res.data);
        setInvalidate(false); //Data is now valid
      })
      .catch(err => {
        console.log(err)
      })
  }, [invalidate]);

  function _addNote(newNote) {
    addNote(newNote)
      .then(() => {
        console.log("Log from addNote before setInvalidate(true)" + invalidate)
        setInvalidate(true)
      })
      .catch(console.error)
  }

  function _deleteNote(id) {
    deleteNote(id)
      .then(() => { setInvalidate(true) })
  }

  function _editNote(id) {
    setModalOnOff(true);
      fetchNote(id)
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
      editNote(id, modalFields)
      .then(() => {
        setInvalidate(true);
        modalCancel();
      })
  }

  //Modal cancel button
  function modalCancel() {
    setModalOnOff(false);
    setModalFields({
      id: "",
      title: "",
      content: ""
    })
  }

  //I thought this handler was unnecessary 
  //but removing it means modalFields doesn't get changes
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
    <>
      {
        modalOnOff &&
        <Modal
          id={modalFields.id}
          title={modalFields.title}
          content={modalFields.content}
          onSave={modalSave}
          onCancel={modalCancel}
          onChange={handleChange} //most likely unnecessary
        />}
      <CreateArea onAdd={_addNote} />
      {allNotes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={_deleteNote}
            onEdit={_editNote}
          />
        )
      })}

    </>
  )
}

export default NotesView;