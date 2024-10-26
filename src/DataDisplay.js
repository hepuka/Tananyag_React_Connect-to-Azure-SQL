import React, { useEffect, useState } from "react";

function DataDisplay() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:1433/api/data");
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  console.log(data);
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
          {loading ? (
            data.map((item) => {
              <tr key={item.id}>
                <td>{item.name}</td>
              </tr>;
            })
          ) : (
            <h1>Vebhej</h1>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplay;
