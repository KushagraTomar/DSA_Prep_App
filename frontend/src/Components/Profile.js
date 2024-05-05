import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [noOfProblems, setNoOfProblems] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const userData = jwtDecode(token);
        setEmail(userData.email);
        setUserId(userData.userId);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:1000/progress/count/?userId=${userId}`)
      .then((response) => {
        const count = response.data.count;
        setNoOfProblems(count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h3>User Profile</h3>
      <div>User Email: {email}</div>
      <div>User Uid: {userId}</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>No of Problems solved: {noOfProblems}</div>
    </div>
  );
}

export default Profile;
