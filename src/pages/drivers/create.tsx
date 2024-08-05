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

  const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Create Driver</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input type="file" onChange={handleProfilePhotoChange} />
        <button type="submit">Add Driver</button>
      </form>
    </div>
  );
}
