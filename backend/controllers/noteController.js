import noteModel from "../model/noteModel.js";

// Get all notes for the logged-in user
export const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch notes" });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const { title, content, category } = req.body; // <--- include category
  try {
    const newNote = new noteModel({
      userId: req.userId,
      title,
      content,
      category: category || "Other", // default to "Other" if not provided
    });
    await newNote.save();
    res.json({ success: true, message: "Note created successfully", note: newNote });
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ success: false, message: "Failed to create note" });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await noteModel.findOneAndDelete({ _id: id, userId: req.userId });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete note" });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body; // <--- include category

  try {
    const updatedNote = await noteModel.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, content, category: category || "Other" }, // <--- save category
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, message: "Note updated", note: updatedNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update note" });
  }
};
