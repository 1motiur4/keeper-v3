import React from "react";
import { Button } from 'react-bootstrap'
import { loginUser } from "../actions";
import UserHome from "./UserHome";

function Login() {
    const [creds, setCreds] = React.useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setCreds(prevText => {
            return {
                ...prevText,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        loginUser(creds)
            .then((data) => {
                console.log("Log from Login.jsx handleSubmit ", data);
                //window.localStorage.setItem("token", data.data);
                //window.localStorage.setItem("loggedIn", true);
                //window.location.href = "./userData";

            })
            .catch(console.error);
    }

    return (
        <form className="loginText" onSubmit={handleSubmit}>
            <div className="col">
                <div className="row">
                    <h3>Login here to access your notes</h3>
                </div>
                <div className="row">
                    <label htmlFor="username">Username: </label>
                    <input name="username" type="text" onChange={handleChange}></input>
                </div>
                <div className="row">
                    <label htmlFor="password">Password: </label>
                    <input name="password" type="password" onChange={handleChange}></input>
                </div>
                <div className="row">
                    <Button type="submit">Login</Button>
                </div>
            </div>
        </form>
    )
}

export default Login;