import React, { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [refreshCount, setRefreshCount] = useState(0);

  const refreshNotes = () => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <div className="app">
      <h1>Notes App</h1>
      <div className="app-container">
        <NoteForm refreshNotes={refreshNotes} />
        <NoteList key={refreshCount} />
      </div>
    </div>
  );
}

export default App;
