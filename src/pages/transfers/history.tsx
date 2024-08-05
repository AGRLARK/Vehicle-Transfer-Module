import { useState, useEffect } from "react";
import axios from "axios";

interface Transfer {
  id: number;
  vehicle: { vehicleNumber: string };
  fromDriver: { name: string };
  toDriver: { name: string };
  transferDate: string;
}

export default function TransferHistory() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    axios
      .get<Transfer[]>("/api/transfers")
      .then((response) => setTransfers(response.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transfer History</h1>
      <ul className="space-y-4">
        {transfers.map((transfer) => (
          <li key={transfer.id} className="border p-4 rounded shadow">
            <p>
              <strong>Vehicle:</strong> {transfer.vehicle.vehicleNumber}
            </p>
            <p>
              <strong>From:</strong> {transfer.fromDriver.name}
            </p>
            <p>
              <strong>To:</strong> {transfer.toDriver.name}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(transfer.transferDate).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
