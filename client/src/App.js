import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotesView from "./notes/views/NotesView";

function App() {
  return (
    <div>
      <Header />
      <NotesView />
      <Footer />
    </div>
  )
}

export default App;