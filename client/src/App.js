import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotesView from "./notes/views/NotesView";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function handleClick() {
    setIsLoggedIn(true);
  }

  if (isLoggedIn) {
    return (
      <div>
        <Header />
        <NotesView />
        <Footer />
      </div>
    )
  } else {
    return (
      <div>
        <Header />
        <Login 
          onClick={handleClick}
        />
        <Footer />
      </div>
    )
  }  
}

export default App;