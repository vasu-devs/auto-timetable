const { Schema, model, default: mongoose } = require("mongoose");

const batchSchema = new Schema(
  {
    batchName: {
      type: String,
      required: true,
      unique: true,
    },
    strength: {
      type: Number,
      required: true,
    },
    yearOfStudy: {
      type: Number,
      required: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  { timestamps: true }
);

const Batch = model("Batch", batchSchema);
module.exports = Batch;
