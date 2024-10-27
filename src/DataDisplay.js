import React, { useEffect, useState } from "react";

function DataDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:1433/api/data");
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Data from Azure SQL Database</h2>
      <table>
        <thead>
          <tr>
            <th>Név</th>
            <th>Születési idő</th>
            <th>Születési hely</th>
            <th>Email</th>
            <th>Jelszó</th>
            <th>Szerepkör</th>
            <th>Adószám</th>
            <th>PIN</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.bdate}</td>
                <td>{item.bplace}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.role}</td>
                <td>{item.taxnumber}</td>
                <td>{item.pin}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplay;
