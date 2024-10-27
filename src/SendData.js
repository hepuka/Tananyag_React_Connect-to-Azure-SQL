import React from "react";
import { useState } from "react";

const initialSate = {
  name: "",
  bdate: "",
  bplace: "",
  email: "",
  password: "",
  pin: "",
  role: "",
  taxnumber: "",
};

function SendData() {
  const [user, setUser] = useState(initialSate);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1433/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        document.location.reload();
      } else {
        alert("There was an error submitting the data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting the data.");
    }
  };

  console.log(user);

  return (
    <>
      <form onSubmit={addUser}>
        <input
          type="text"
          required
          name="name"
          value={user.name}
          onChange={(e) => handleInputChange(e)}
          placeholder="Név"
        ></input>
        <input
          type="text"
          required
          name="bdate"
          value={user.bdate}
          onChange={(e) => handleInputChange(e)}
          placeholder="Születési idő"
        ></input>
        <input
          type="text"
          required
          name="bplace"
          value={user.bplace}
          onChange={(e) => handleInputChange(e)}
          placeholder="Születési hely"
        ></input>
        <input
          type="email"
          required
          name="email"
          value={user.email}
          onChange={(e) => handleInputChange(e)}
          placeholder="Email"
        ></input>
        <input
          type="text"
          required
          name="password"
          value={user.password}
          onChange={(e) => handleInputChange(e)}
          placeholder="Jelszó"
        ></input>
        <input
          type="text"
          required
          name="role"
          value={user.role}
          onChange={(e) => handleInputChange(e)}
          placeholder="Szerepkör"
        ></input>
        <input
          type="text"
          required
          name="taxnumber"
          value={user.taxnumber}
          onChange={(e) => handleInputChange(e)}
          placeholder="Adószám"
        ></input>
        <input
          type="text"
          required
          name="pin"
          value={user.pin}
          onChange={(e) => handleInputChange(e)}
          placeholder="PIN"
        ></input>
        <input type="submit"></input>
      </form>
    </>
  );
}

export default SendData;
