import React, { useState } from "react";
import axios from "axios";

const NoteForm = ({ refreshNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Both title and content are required");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/notes", { title, content });
      setTitle("");
      setContent("");
      refreshNotes();
    } catch (err) {
      console.error("Error creating note:", err);
      alert("Failed to create note");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Note</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter note title"
            maxLength="100"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            placeholder="Write your note here..."
            rows="5"
            maxLength="1000"
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner"></span> Creating...
            </>
          ) : (
            "Create Note"
          )}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
