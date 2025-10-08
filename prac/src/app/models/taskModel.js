import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);