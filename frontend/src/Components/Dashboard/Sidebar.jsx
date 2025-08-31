
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Folder, Briefcase, Lightbulb, Users } from "lucide-react";

const categoryIcons = {
  All: Folder,
  Work: Briefcase,
  Personal: Users,
  Ideas: Lightbulb,
  Other: Folder,
};

const Sidebar = ({
  categories,
  notes,
  selectedCategory,
  onSelectCategory,
  isOpen,
  onClose,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCount = (cat) => {
    if (cat === "All") return notes.length;
    return notes.filter((note) => note.category === cat).length;
  };

  // Sidebar should always be visible on desktop, controlled by isOpen on mobile
  const sidebarVisible = windowWidth >= 768 || isOpen;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && windowWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: sidebarVisible ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 p-6 shadow-xl z-30 rounded-r-2xl"
      >
        {/* Mobile close button */}
        {windowWidth < 768 && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Categories
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        )}

        {/* Category List */}
        <ul className="space-y-3">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Folder;
            const isSelected = selectedCategory === cat;

            return (
              <li
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition 
                  ${isSelected ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-blue-500"}`} />
                  <span className="font-medium">{cat}</span>
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    isSelected
                      ? "bg-white text-blue-600"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {getCount(cat)}
                </span>
              </li>
            );
          })}
        </ul>
      </motion.aside>
    </>
  );
};

export default Sidebar;
