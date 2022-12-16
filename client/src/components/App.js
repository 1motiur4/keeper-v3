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
  const notesURL = "http://localhost:5000/notes/";

  //Grabs all notes

  // So there is a problem with this useEffect
  // useEffect is used to execute a function when something changed in its dependencies
  // So useEffect expects 2 parameters. The first one is the function to execute.
  // The second one is the array of dependencies to check if there is a need to execute the function.
  // Different values can be provided to this useEffect but here is what happens when you don't provide dependencies.
  // At each render, the function will be executed. So you'll fetch all the notes every time the component renders
  // providing an empty dependency array ([]) would make this function to execute only at the first render.
  // Given some dependencies like [notesUrl], would make the useEffect to execute the function every time the notesUrl changes.
  // The initial value is undefined, so it would execute at first render and if the url does not change, it would fetch the notes again

  // This process is convenient for a lot of use case. In yours, what you want is to fetch the notes only when there is a change on the server
  // we generally use a variable called "invalidate" to say if our data are still valid or are outdated
  // What you can do is: 
  const [invalidate, setInvalidate] = useState(true);
  // which would say that by default, the data is invalid
  // then change the useEffect like that:
  useEffect(() => {
    if(!invalidate) {
      return;
    }

    axios.get(notesURL)
      .then(res => {
        setInvalidate(false); // We say that the data is valid now
        setAllNotes(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [invalidate]);
  // Now, our useEffect will execute everytime the value of invalidate changes (from false to true, or from true to false)
  // We want to fetch the note only when the state is outdated, so only when invalidate is true. 
  // So we add the first if to stop if the data is valid

  function addNote(newNote) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    const data = qs.stringify({
      title: newNote.title,
      content: newNote.content
    });
    axios.post(notesURL,
      data, headers
    ).then(res => {
      setInvalidate(true); // We say that the data is invalid because we changed the data on the server
      console.log(res.data)
    });
  }

  function deleteNote(id) {
    axios.delete(notesURL, { params: { id: id } }).then(() => {
      setInvalidate(true); // We say that the data is invalid because we changed the data on the server
    });
  }

  function editNote(id) {
    setModalOnOff(true);
    axios.get(notesURL + id)
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
    const data = qs.stringify(modalFields);
    axios.put(notesURL + id, data)
      .then(res => {
        setInvalidate(true); // We say that the data is invalid because we changed the data on the server
        console.log(res.data)
      })
      .then(setModalOnOff(false));
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

  //This handler is most likely unnecessary
  // Yes since the only use of this variable is useless too
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

          // Yes it's useless, this property is not using inside the Modal component
          onChange={handleChange} //most likely unnecessary
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

// There are multiple problems with this component

// 1 - Almost all your logic is grouped here.
// We usually try to isolate behaviours into there own component/object (this is a general rule for coding, not just React)
// This helps with readability, maintaining and testing (which is a nightmare when you don't isolate and invert your dependencies).
// There is no special rules to say something is well designed, some of the SOLID/YAGNI principles helps 
// but it all depends on what you are trying to achieve

// 2 - Advanced: The first problem leads to a second one. React Reconciliation. Read about it, it explains how React works.
// React renders components when its props or state changed. For that React use shallow equality.

// Shallow equality is the equivalent of "===". So:
"i am noodle" === "i am noodle" // true
"i am noodle" === "i am not noodle" // false
123 === 123 // true
321 === 123 // false

const object1 = {object: "test"}
const object2 = {object: "test"}
const object3 = object1;
object1 === object2 // false
object3 === object2 // false
object3 === object1 // true

function test1() {}
function test2() {}
const test3 = test1;
test1 === test2 // false
test1 === test3 // true

// So whenever the shallow equality returns false, React will render the component again.
// So everytime there is a change inside a component, React will trigger the Reconcialiation process
// It will compare the previous props and states with the new ones. If there is no changes (all shalow equalities returning true)
// It won't render the component again (since there is no change in props or state, the render should produce the same output, so no need to render)
// But if the shallow equality returns false, something has changed for this component, so React triggers the render.

// Let's assume theses components:
const ComponentA = (value) => {
  console.log("ComponentA", "render", value);

  return <p>{value}</p>
}
const ComponentB = (value) => {
  console.log("ComponentA", "render", value);

  return <p>{value.message}</p>
}
const Root = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      {counter}
      <button onClick={() => setCounter(counter => counter + 1)}>Click me</button>
      <ComponentA value={"Test A"} />
      <ComponentA value={{ message: "Test B"}} />
    </>
  )
}