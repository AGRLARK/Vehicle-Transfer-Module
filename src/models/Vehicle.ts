import mongoose, { Schema, Document } from "mongoose";

interface IVehicle extends Document {
  vehicleNumber: string;
  vehicleType: string;
  pucCertificate: string; // Path to the PUC certificate
  insuranceCertificate: string; // Path to the insurance certificate
}

const VehicleSchema: Schema = new Schema({
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  pucCertificate: { type: String, required: false }, // Optional
  insuranceCertificate: { type: String, required: false }, // Optional
});

const Vehicle = mongoose.model<IVehicle>("Vehicle", VehicleSchema);

export default Vehicle;
