import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

interface Driver {
  id: number;
  name: string;
}

interface Vehicle {
  id: number;
  vehicleNumber: string;
}

export default function CreateTransfer() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fromDriver, setFromDriver] = useState<number | null>(null);
  const [toDriver, setToDriver] = useState<number | null>(null);
  const [vehicle, setVehicle] = useState<number | null>(null);

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
    if (fromDriver && toDriver && vehicle) {
      await axios.post("/api/transfers", { fromDriver, toDriver, vehicle });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transfer Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={fromDriver || ""}
          onChange={(e) => setFromDriver(Number(e.target.value))}
          className="border p-2 rounded w-full"
        >
          <option value="">Select From Driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
        <select
          value={toDriver || ""}
          onChange={(e) => setToDriver(Number(e.target.value))}
          className="border p-2 rounded w-full"
        >
          <option value="">Select To Driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
        <select
          value={vehicle || ""}
          onChange={(e) => setVehicle(Number(e.target.value))}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.vehicleNumber}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Transfer Vehicle
        </button>
      </form>
    </div>
  );
}
