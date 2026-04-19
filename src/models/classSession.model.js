import mongoose from "mongoose";

const classSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },

    years:{
      type:Number,
      trim:true,   
    },
    semester:{
      type:Number,
      trim:true,
    },
    section:{
      type:String,
      trim:true,
    }
  },
  { timestamps: true }
);

const ClassSession =
  mongoose.models.ClassSession ||
  mongoose.model("ClassSession", classSessionSchema);

export default ClassSession;
