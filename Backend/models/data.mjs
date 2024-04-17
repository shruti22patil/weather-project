import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  ts: { type: Date, required: true },
  machine_status: { type: Number, required: true },
  vibration: { type: Number, required: true }
});

const Data = mongoose.model('test', dataSchema);

export default Data;