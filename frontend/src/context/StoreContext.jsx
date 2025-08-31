
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [notes, setNotes] = useState([]);
  const url = "http://localhost:3000"; // backend server

  // Sync token with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Fetch notes
  const fetchNotes = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.notes);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  // Add note
  const addNote = async (title, content, category = "Other") => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${url}/api/notes`,
        { title, content, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setNotes((prev) => [res.data.note, ...prev]);
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Update note
  const updateNote = async (id, title, content, category = "Other") => {
    if (!token) return;
    try {
      const res = await axios.put(
        `${url}/api/notes/${id}`,
        { title, content, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === id ? res.data.note : n))
        );
      }
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    if (!token) return;
    try {
      const res = await axios.delete(`${url}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success)
        setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);

  return (
    <StoreContext.Provider
      value={{
        token,
        setToken,
        notes,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote,
        url,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
