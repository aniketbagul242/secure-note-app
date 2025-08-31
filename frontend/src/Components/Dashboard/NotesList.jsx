
// components/Dashboard/NotesList.jsx
import React from "react";
import NoteCard from "./NoteCard";

const NotesList = ({ notes, onEdit, onDelete }) => {
  if (!notes.length) return <p className="text-center mt-4 text-gray-600">No notes available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onEdit={() => onEdit(note)} onDelete={() => onDelete(note._id)} />
      ))}
    </div>
  );
};

export default NotesList;
