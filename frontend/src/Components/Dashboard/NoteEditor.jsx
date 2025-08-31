
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, X, FileText } from "lucide-react";

const NoteEditor = ({ editingNote, onCancel, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategory(editingNote.category || "Work");
    } else {
      setTitle("");
      setContent("");
      setCategory("Work");
    }
  }, [editingNote]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    onSave({ title, content, category });
    setTitle("");
    setContent("");
    setCategory("Work");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-full lg:max-w-4xl bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6 xl:ml-36"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {editingNote ? "Edit Note" : "Add Note"}
          </h2>
        </div>
        {editingNote && (
          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>

      {/* Title Input */}
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 mb-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none text-lg font-medium"
      />

      {/* Content Textarea */}
      <textarea
        rows="6"
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-4 mb-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-base"
      />

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 mb-6 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option>Work</option>
        <option>Personal</option>
        <option>Ideas</option>
        <option>Other</option>
      </select>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        {editingNote && (
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
        >
          <Save className="w-5 h-5" />
          {editingNote ? "Update Note" : "Save Note"}
        </button>
      </div>
    </motion.div>
  );
};

export default NoteEditor;
