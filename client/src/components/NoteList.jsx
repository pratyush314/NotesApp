import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash2 as TrashIcon } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/notes");
      setNotes(response.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      alert("Failed to fetch notes");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      <h2 className="notes-title">Your Notes</h2>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading notes...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-icon"></svg>
          <p>No notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="delete-btn"
                  aria-label="Delete note"
                >
                  <TrashIcon />
                </button>
              </div>
              <p className="note-content">{note.content}</p>
              <div className="note-footer">
                <span className="note-date">
                  {formatDistanceToNow(new Date(note.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
