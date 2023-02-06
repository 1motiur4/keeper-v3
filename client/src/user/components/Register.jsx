import React from "react";

import { createNewUser } from "../actions";

function Register() {
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setUser(prevUser => {
            return {
                ...prevUser, 
                [name]: value
            }
        })
    }

    function submitUser(event) {
        event.preventDefault();
        createNewUser(user)
            .then((data) => {
                console.log(data);
                console.log("Log from Register.jsx")
                if (data.data.error) {
                    alert(data.data.error);
                }
            })
            .catch(console.error)
    }

    return (
        <div>
            <h1>Registration page test</h1>
            <form>
                <label htmlFor="username">Username: </label>
                <input type="text" onChange={handleChange} value={user.username} name="username" />
                <label htmlFor="password">Password: </label>
                <input type="password" onChange={handleChange} value={user.password} name="password" />
                <button onClick={submitUser}>Register</button>
            </form>

        </div>
    )
}

export default Register;