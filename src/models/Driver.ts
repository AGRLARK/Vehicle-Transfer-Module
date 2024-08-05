// models/Driver.ts
import mongoose, { Document, Model, Schema } from "mongoose";

interface IDriver extends Document {
  name: string;
  phoneNumber: string;
  profilePhoto: string;
}

const DriverSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  profilePhoto: { type: String, required: true },
});

const Driver: Model<IDriver> =
  mongoose.models.Driver || mongoose.model<IDriver>("Driver", DriverSchema);

export default Driver;
