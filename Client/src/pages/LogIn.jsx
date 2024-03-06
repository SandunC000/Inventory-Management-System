import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../style";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    isValidEmail: true,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      // Check if the input is for email and validate it
      isValidEmail:
        name === "email" ? emailRegex.test(value) : prevUser.isValidEmail,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.isValidEmail) {
      alert("Invalid email format");
      return;
    }

    axios
      .post("https://booking-sys-server-10ffb1575735.herokuapp.com/login", user)
      .then((result) => {
        navigate("/home", { state: { user: result.data.data } });
      })
      .catch((err) => {
        if (err.response && err.response.status) {
          const status = err.response.status;
          if (status === 401) {
            alert("Invalid credentials. Please check your Password.");
          } else if (status === 404) {
            alert("User not found. Please register to create an account.");
          } else if (status === 500) {
            alert("Internal server error. Please try again later.");
          }
        } else {
          console.error(err);
          alert("An error occurred during login.");
        }
      });
  };

  return (
    <div className={`${styles.flexCenter} bg-primary h-screen rounded`}>
      <div className="bg-white p-5 rounded w-[500px] flex flex-col">
        <p className={`${styles.heading} mb-5 mt-10`}>Log In</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <strong>User Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your registered email..."
              autoComplete="off"
              name="email"
              className={`${styles.formInput} ${
                user.isValidEmail === false ? "border-red-500" : ""
              }`}
              onChange={handleInputChange}
              required
            ></input>
            {!user.isValidEmail && (
              <p className="text-red-500 text-xs text-center">User Name Must be a Email</p>
            )}
          </div>
          <div>
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Your Password..."
              autoComplete="off"
              name="password"
              className={`${styles.formInput}`}
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded w-40"
            >
              Log In...
            </button>
          </div>
        </form>

        <p
          className="text-center mt-2 mb-4"
          style={{ fontSize: "12px", color: "gray" }}
        >
          Not a Member yet?
        </p>

        <div className="text-center">
          <Link
            to="/"
            className="bg-gray-500 text-white py-2 px-4 rounded w-80"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
