import React, { useState } from "react";

const GetUser = () => {
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSearch = async () => {
    setError(null); // Clear previous errors
    setUserData(null); // Clear previous data

    try {
      const response = await fetch(
        `http://localhost:1433/api/get-user/${name}`
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data); // Store the user data in state
        setName("");
      } else if (response.status === 404) {
        setError("User not found");
      } else {
        setError("An error occurred while fetching the data");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching the data");
    }
  };

  return (
    <div>
      <h2>Search User by Name</h2>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Enter name"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div>
          <h3>User Data:</h3>
          <ul>
            {userData.map((user, index) => (
              <li key={index}>
                <p>Name: {user.name}</p>
                <p>Birth Date: {user.bdate}</p>
                <p>Birth Place: {user.bplace}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Tax Number: {user.taxnumber}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetUser;
