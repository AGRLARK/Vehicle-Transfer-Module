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

    await axios.post("/api/vehicles", formData);
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
    <div>
      <h1>Create Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        />
        <input type="file" onChange={handlePucCertificateChange} />
        <input type="file" onChange={handleInsuranceCertificateChange} />
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}
