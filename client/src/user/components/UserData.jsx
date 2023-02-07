import React, { useEffect, useState } from "react";
import UserHome from "./UserHome";

export default function UserDetails() {
  const [userData, setUserData] = useState({
    username: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/notes/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data);

        setUserData({
          username: data.data.username
        });
        console.log(userData);
        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  });

  return <UserHome userData={userData} />;
}