
import React from "react";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {note.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{note.content}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
          {note.category || "General"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="p-2 rounded-full hover:bg-red-50 text-red-600 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
