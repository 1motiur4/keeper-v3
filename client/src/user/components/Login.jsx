import React from "react";
import { Button } from 'react-bootstrap'

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

    return (
        <div className="loginText">
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
                    <Button>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;