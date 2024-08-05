import { useState, useEffect } from "react";
import axios from "axios";

interface Vehicle {
  _id: string;
  vehicleNumber: string;
  vehicleType: string;
}

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    axios
      .get<Vehicle[]>("/api/vehicles")
      .then((response) => setVehicles(response.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Vehicles</h1>
      <ul className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 space-y-4">
        {vehicles.map((vehicle) => (
          <li
            key={vehicle._id}
            className="p-4 border-b border-gray-200 last:border-b-0 flex justify-between items-center"
          >
            <span className="text-lg font-medium">{vehicle.vehicleNumber}</span>
            <span className="text-gray-600">{vehicle.vehicleType}</span>
          </li>
        ))}
      </ul>
      <a
        href="/vehicles/create"
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Create Vehicle
      </a>
    </div>
  );
}
