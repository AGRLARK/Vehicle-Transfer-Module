import { useState, useEffect } from "react";
import axios from "axios";

interface Driver {
  id: number;
  name: string;
  phoneNumber: string;
  profilePhoto: string;
}

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    axios
      .get<Driver[]>("/api/drivers")
      .then((response) => setDrivers(response.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drivers</h1>
      <ul className="space-y-4">
        {drivers.map((driver) => (
          <li key={driver.id} className="border p-4 rounded shadow">
            <p>
              <strong>Name:</strong> {driver.name}
            </p>
            <p>
              <strong>Phone Number:</strong> {driver.phoneNumber}
            </p>
            <img
              src={driver.profilePhoto}
              alt={driver.name}
              className="w-32 h-32 object-cover"
            />
          </li>
        ))}
      </ul>
      <a
        href="/drivers/create"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Driver
      </a>
    </div>
  );
}
