import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting form data:", formData);

      const payload = {
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post("http://localhost:5000/signup", payload, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      });

      console.log("Server response:", res.data);

      if (res.data.success) {
        alert("✅ " + res.data.message);
        setFormData({ name: "", email: "", password: "" });
      } else {
        alert("❌ " + (res.data.error || "Signup failed!"));
      }
    } catch (err) {
      console.error("Full signup error:", err);

      if (err.response) {
        // Server responded with error status
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        const errorMessage = err.response.data?.error || "Signup failed!";
        alert(`❌ Error: ${errorMessage}`);
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response received:", err.request);
        alert(
          "❌ Network error: Cannot connect to server. Please check if the server is running."
        );
      } else {
        // Other errors
        console.error("Error:", err.message);
        alert("❌ Signup failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-account-this">
        <h1 className="create-account">Create Account</h1>
        <p className="create-and-join">Please create this account and join</p>
      </div>

      <div className="signup-container">
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={loading}
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p id="message"></p>
        </form>
      </div>
    </>
  );
}

export default Signup;
