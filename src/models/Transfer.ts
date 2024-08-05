import mongoose, { Document, Model, Schema } from "mongoose";

interface ITransfer extends Document {
  vehicle: mongoose.Types.ObjectId;
  fromDriver: mongoose.Types.ObjectId;
  toDriver: mongoose.Types.ObjectId;
  transferDate: Date;
}

const TransferSchema: Schema = new Schema({
  vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
  fromDriver: { type: Schema.Types.ObjectId, ref: "Driver", required: true },
  toDriver: { type: Schema.Types.ObjectId, ref: "Driver", required: true },
  transferDate: { type: Date, default: Date.now },
});

const Transfer: Model<ITransfer> =
  mongoose.models.Transfer ||
  mongoose.model<ITransfer>("Transfer", TransferSchema);

export default Transfer;
