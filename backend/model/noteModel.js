import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Other", // for Sidebar filtering
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const noteModel = mongoose.model("Note", noteSchema);
export default noteModel;
