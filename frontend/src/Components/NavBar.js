import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav style={{ backgroundColor: "#333", padding: "10px", fontSize: "18px" }}>
      <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
        <li style={{ display: "inline-block", marginRight: "20px" }}>
          <p
            onClick={() => {
              navigate("section");
            }}
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Home
          </p>
        </li>

        <li style={{ display: "inline-block", marginRight: "20px" }}>
          <p
            onClick={() => {
              navigate("profile");
            }}
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Profile
          </p>
        </li>

        <li style={{ display: "inline-block", marginRight: "20px" }}>
          <p
            onClick={() => {
              navigate("/");
            }}
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            SignIn
          </p>
        </li>

        <li style={{ display: "inline-block", marginRight: "20px" }}>
          <p
            onClick={() => {
              navigate("/signup");
            }}
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            SignUp
          </p>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
