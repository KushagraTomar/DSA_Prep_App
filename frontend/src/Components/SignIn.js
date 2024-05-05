import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await axios.post("http://localhost:1000/user/signin", {
        email,
        password,
      });
      console.log(res.data);

      // Save the token in local storage
      localStorage.setItem("token", res.data.token);
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        navigate("section");
      }

      // navigate("section");
    } catch (err) {
      console.log(err.response.data.message);
      setResp(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
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
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        <div>{resp && <p>{resp}</p>}</div>
        <div>
          <p>
            Don't have an account? <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
