import React from "react";

function Login(props) {
    function handleLoginClick() {
        props.onClick();
    }

    return (
        <div>
            <p>login test</p>
            <button onClick={handleLoginClick}>Login</button>
        </div>
    )
}

export default Login;