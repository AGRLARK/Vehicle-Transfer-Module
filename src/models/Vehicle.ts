import mongoose, { Document, Model, Schema } from "mongoose";

interface IVehicle extends Document {
  vehicleNumber: string;
  vehicleType: string;
  pucCertificate: string;
  insuranceCertificate: string;
}

const VehicleSchema: Schema = new Schema({
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  pucCertificate: { type: String, required: true },
  insuranceCertificate: { type: String, required: true },
});

const Vehicle: Model<IVehicle> =
  mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", VehicleSchema);

export default Vehicle;
