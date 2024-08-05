import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  fromDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  toDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  transferDate: { type: Date, required: true },
});

export default mongoose.models.Transfer ||
  mongoose.model("Transfer", TransferSchema);
