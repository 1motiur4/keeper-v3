import React from "react";

export default function UserHome({ userData }) {
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };
    return (
        <div>
            Name<h1>{userData.username}</h1>
            Password <h1>{userData.password}</h1>
            <br />
            <button onClick={logOut} className="btn btn-primary">
                Log Out
            </button>
        </div>
    );
}