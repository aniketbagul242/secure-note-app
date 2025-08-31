import express from "express";
import { getNotes, createNote, deleteNote, updateNote } from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const noteRouter = express.Router();

// All routes protected
noteRouter.use(authMiddleware);

noteRouter.get("/", getNotes);
noteRouter.post("/", createNote);
noteRouter.delete("/:id", deleteNote);
noteRouter.put("/:id", updateNote);  

export default noteRouter;
