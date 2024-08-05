import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

export default function CreateDriver() {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);

    await axios.post("/api/drivers", formData);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Driver</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) setProfilePhoto(e.target.files[0]);
          }}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Driver
        </button>
      </form>
    </div>
  );
}
