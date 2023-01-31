import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotesView from "./notes/views/NotesView";
import Login from "./user/components/Login";
import Register from "./user/components/Register";
import Home from "./notes/views/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/notes" element={<NotesView />}></Route>
        <Route path="*" element={<div>ERROR 404!!!</div>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;