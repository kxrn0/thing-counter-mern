const mongoose = require("mongoose");
const CounterSchema = new mongoose.Schema(
  {
    count: { type: Number, default: 0 },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    image: { data: Buffer, contentType: String },
    thumbnail: { data: Buffer, contentType: String },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counter", CounterSchema);
