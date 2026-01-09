import mongoose from "mongoose";

const classSessionSchema = new mongoose.Schema(
  {
    name: {              
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    section: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const ClassSession =
  mongoose.models.ClassSession ||
  mongoose.model("ClassSession", classSessionSchema);

export default ClassSession;
