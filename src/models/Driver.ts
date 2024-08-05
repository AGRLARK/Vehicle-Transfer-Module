import mongoose, { Schema, Document } from "mongoose";

interface IDriver extends Document {
  name: string;
  phoneNumber: string;
  profilePhoto: string; // Path to the photo
}

const DriverSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  profilePhoto: { type: String, required: false }, // Optional
});

const Driver = mongoose.model<IDriver>("Driver", DriverSchema);

export default Driver;
