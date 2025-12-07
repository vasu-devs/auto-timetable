const { Schema, model, default: mongoose } = require("mongoose");
const subjectSchema = new Schema(
  {
    subjectCode: {
      type: String,
      required: true,
      unique: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    sessionsPerWeek: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Theory", "Practical"],
    },
    requiredRoomType: {
      type: String,
      required: true,
      enum: ["Classroom", "Laboratory"],
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
  },
  { timestamps: true }
);

const Subject = model("Subject", subjectSchema);
module.exports = Subject;
