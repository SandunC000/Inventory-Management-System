import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../style";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    fName: "",
    lName: "",
    mNum: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      isValidEmail:
        name === "email" ? emailRegex.test(value) : prevUser.isValidEmail,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newUser.password !== newUser.cpassword) {
      alert("Passwords do not match");
      return;
    }

    const { cpassword, isValidEmail, ...finalUser } = newUser;

    axios
      .post("http://localhost:3000/register", finalUser)
      .then((result) => {
        console.log(result);
        alert("Registration Success");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${styles.flexCenter} bg-primary h-screen rounded`}>
      <div className="bg-white p-5 rounded w-[500px] flex flex-col">
        <p className={`${styles.heading} mb-5 mt-10`}>Registration Form</p>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-2">
              <label htmlFor="fName">
                <strong>First Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Your First Name..."
                autoComplete="off"
                name="fName"
                className={`${styles.formInput}`}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-2">
              <label htmlFor="lName">
                <strong>Last Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Your Last Name..."
                autoComplete="off"
                name="lName"
                className={`${styles.formInput}`}
                onChange={handleInputChange}
                required
              ></input>
            </div>
          </div>

          <div>
            <label htmlFor="mNum">
              <strong>Mobile Number</strong>
            </label>
            <input
              type="tel"
              placeholder="Enter Your Mobile Number..."
              autoComplete="off"
              name="mNum"
              className={`${styles.formInput}`}
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <div>
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Your Email..."
              autoComplete="off"
              name="email"
              className={`${styles.formInput} ${
                newUser.isValidEmail === false ? "border-red-500" : ""
              }`}
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-2">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                className={`${styles.formInput}`}
                onChange={handleInputChange}
                placeholder="Enter New Password..."
                required
              ></input>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-2">
              <label htmlFor="cpassword">
                <strong>Confirm Password</strong>
              </label>
              <input
                type="password"
                autoComplete="off"
                name="cpassword"
                className={`${styles.formInput}`}
                onChange={handleInputChange}
                placeholder="Re-Enter New Password..."
                required
              ></input>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded w-40"
            >
              Register Now...
            </button>
          </div>
        </form>

        <p
          className="text-center mt-2 mb-4"
          style={{ fontSize: "12px", color: "gray" }}
        >
          Already a member?
        </p>

        <div className="text-center">
          <Link
            to="/login"
            className="bg-gray-500 text-white py-2 px-4 rounded w-80"
          >
            Log in...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
