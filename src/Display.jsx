import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom';

const Display = () => {

  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchdata = async () => {

    try {
      const url = id ? `http://localhost:8080/get/${id}` : `http://localhost:8080/allusers`;

      const reponse = await fetch(url);
      const data = await reponse.json();

      if (id) {
        if (data.id) setUsers([data]);
        else setError("user not found");
      }
      else {
        setUsers(data);
      }

    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [id])

  return (
    <>
      <h1>User Details</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.length > 0 ? (
        <table border={2}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>PASSWORD</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, email, phone, password }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : !error ? (
        <p>Loading...</p>
      ) : null}
    </>
  );
}

export default Display
