import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://localhost:1000/user/signup", {
        email,
        password,
      });
      console.log(res.data);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      setResp(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <div>{resp && <p>{resp}</p>}</div>
        <div>
          <p>
            Already have an account? <Link to="/">SignIn</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
