import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

interface Driver {
  _id: string;
  name: string;
}

interface Vehicle {
  _id: string;
  vehicleNumber: string;
}

export default function CreateTransfer() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fromDriver, setFromDriver] = useState<string>("");
  const [toDriver, setToDriver] = useState<string>("");
  const [vehicle, setVehicle] = useState<string>("");

  useEffect(() => {
    axios
      .get<Driver[]>("/api/drivers")
      .then((response) => setDrivers(response.data));
    axios
      .get<Vehicle[]>("/api/vehicles")
      .then((response) => setVehicles(response.data));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("/api/transfers", { fromDriver, toDriver, vehicle });
  };

  return (
    <div>
      <h1>Transfer Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={fromDriver}
          onChange={(e) => setFromDriver(e.target.value)}
        >
          <option value="">Select From Driver</option>
          {drivers.map((driver) => (
            <option key={driver._id} value={driver._id}>
              {driver.name}
            </option>
          ))}
        </select>
        <select value={toDriver} onChange={(e) => setToDriver(e.target.value)}>
          <option value="">Select To Driver</option>
          {drivers.map((driver) => (
            <option key={driver._id} value={driver._id}>
              {driver.name}
            </option>
          ))}
        </select>
        <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.vehicleNumber}
            </option>
          ))}
        </select>
        <button type="submit">Transfer Vehicle</button>
      </form>
    </div>
  );
}
