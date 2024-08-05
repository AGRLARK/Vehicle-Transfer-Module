import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

export default function CreateVehicle() {
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [pucCertificate, setPucCertificate] = useState<File | null>(null);
  const [insuranceCertificate, setInsuranceCertificate] = useState<File | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("vehicleType", vehicleType);
    if (pucCertificate) formData.append("pucCertificate", pucCertificate);
    if (insuranceCertificate)
      formData.append("insuranceCertificate", insuranceCertificate);

    try {
      await axios.post("/api/vehicles", formData);
      // You might want to handle the success state or redirect after submission
    } catch (error) {
      console.error("Failed to create vehicle:", error);
    }
  };

  const handlePucCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPucCertificate(e.target.files[0]);
    }
  };

  const handleInsuranceCertificateChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setInsuranceCertificate(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create Vehicle</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="vehicleNumber"
            >
              Vehicle Number
            </label>
            <input
              id="vehicleNumber"
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="vehicleType"
            >
              Vehicle Type
            </label>
            <input
              id="vehicleType"
              type="text"
              placeholder="Vehicle Type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="pucCertificate"
            >
              PUC Certificate
            </label>
            <input
              id="pucCertificate"
              type="file"
              onChange={handlePucCertificateChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="insuranceCertificate"
            >
              Insurance Certificate
            </label>
            <input
              id="insuranceCertificate"
              type="file"
              onChange={handleInsuranceCertificateChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}
