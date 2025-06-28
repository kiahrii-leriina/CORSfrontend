import React, { useState } from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const [userId, setUserId] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;

        const params = new URLSearchParams({ name, email, phone, password });

        try {
            const response = await fetch(`http://localhost:8080/save?${params.toString()}`);
            const data = await response.json();
            const userid = data.id;
            alert(`user saved successfully with id ${userid}`)
            console.log("Saved user:", data);
        } catch (err) {
            alert(`An Error while saving user data`)
            console.error("Error in saving user", err);
        }
    };

    const handleFindById = async () => {
      if(userId.trim()){
        navigate(`/display/${userId}`)
      }
      else{
        alert(`Invalid id`)
      }
    };

    const handleGetAllUsers = async () => {
      navigate(`/display`)
    };

    return (
        <div className='landing-container'>
            <div className='form-container'>
                <h1>Register Form</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" />

                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" />

                    <label htmlFor="phone">Phone:</label>
                    <input type="text" name="phone" id="phone" />

                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" id="password" /><br />

                    <button type="submit">Register</button>
                </form>
            </div>

            <div className='buttons-container'>
                <h1>Already Registered?</h1>
                <div>
                    <input
                        type="text"
                        placeholder='Enter Id'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <button onClick={handleFindById}>Find By Id</button>
                    <button onClick={handleGetAllUsers}>Get All Users</button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
