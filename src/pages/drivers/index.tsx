import { useState, useEffect } from "react";
import axios from "axios";

interface Driver {
  _id: string;
  name: string;
  phoneNumber: string;
}

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    axios
      .get<Driver[]>("/api/drivers")
      .then((response) => setDrivers(response.data));
  }, []);

  return (
    <div>
      <h1>Drivers</h1>
      <ul>
        {drivers.map((driver) => (
          <li key={driver._id}>
            {driver.name} - {driver.phoneNumber}
          </li>
        ))}
      </ul>
      <a href="/drivers/create">Create Driver</a>
    </div>
  );
}
