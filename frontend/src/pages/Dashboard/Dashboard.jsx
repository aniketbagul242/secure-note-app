import React, { useState, useContext, useRef, useEffect } from "react";
import Navbar from "../../Components/Dashboard/Navbar";
import NoteEditor from "../../Components/Dashboard/NoteEditor";
import NotesList from "../../Components/Dashboard/NotesList";
import Sidebar from "../../Components/Dashboard/Sidebar";
import { StoreContext } from "../../context/StoreContext";

const Dashboard = () => {
  const { notes, addNote, updateNote, deleteNote, fetchNotes } = useContext(StoreContext);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const editorRef = useRef(null); // NEW: reference for NoteEditor

  const categories = ["All", "Work", "Personal", "Ideas", "Other"];

  const handleSaveNote = (note) => {
    if (editingNote) {
      updateNote(editingNote._id, note.title, note.content, note.category);
      setEditingNote(null);
    } else {
      addNote(note.title, note.content, note.category || "Other");
    }
    fetchNotes();
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    // Scroll editor into view
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleCancelEdit = () => setEditingNote(null);
  const handleDeleteNote = (id) => deleteNote(id);
  const handleSearch = (query) => setSearchQuery(query.toLowerCase());
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSidebarOpen(false);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery) ||
      note.content.toLowerCase().includes(searchQuery);
    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-screen">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> <div className="px-4 py-2 border-b"> <input type="text" placeholder="Search notes..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} className="w-full p-2 border rounded" 
 />

      </div>

      <div className="flex flex-1 relative">
        <Sidebar
          categories={categories}
          notes={notes}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 p-4 overflow-y-auto">
          {/* Pass ref to editor */}
          <div ref={editorRef}>
            <NoteEditor
              editingNote={editingNote}
              onCancel={handleCancelEdit}
              onSave={handleSaveNote}
            />
          </div>
          <NotesList
            notes={filteredNotes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
