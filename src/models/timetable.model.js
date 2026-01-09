import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    classSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassSession",         
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    day: {
      type: String,                 
      required: true,
      trim: true,
    },
    startTime: {
      type: String,                 
      required: true,
      trim: true,
    },
    endTime: {
      type: String,                 
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Timetable =
  mongoose.models.Timetable || mongoose.model("Timetable", timetableSchema);

export default Timetable;
