import { useState, useEffect } from "react";
import axios from "axios";

export default function TransferHistory() {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    axios.get("/api/transfers").then((response) => setTransfers(response.data));
  }, []);

  return (
    <div>
      <h1>Transfer History</h1>
      <ul>
        {transfers.map((transfer) => (
          <li key={transfer._id}>
            Vehicle: {transfer.vehicle.vehicleNumber} - From:{" "}
            {transfer.fromDriver.name} - To: {transfer.toDriver.name} - Date:{" "}
            {new Date(transfer.transferDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
