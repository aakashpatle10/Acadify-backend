// models/students.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      select: false,          
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Role",
      index: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },

    classSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassSession",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema); 
