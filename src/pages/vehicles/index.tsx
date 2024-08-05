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
    <div>
      <h1>Vehicles</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle._id}>
            {vehicle.vehicleNumber} - {vehicle.vehicleType}
          </li>
        ))}
      </ul>
      <a href="/vehicles/create">Create Vehicle</a>
    </div>
  );
}
