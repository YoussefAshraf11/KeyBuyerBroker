// src/components/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import backgroundImg from "../../assets/Login/login.svg";
import { login } from "../../network/auth.js";
import { useDispatch } from "react-redux";
import { setCredentials, setLoading, setError } from "../../store/authSlice";

const roletypes = {
  buyer: "buyer",
  broker: "broker",
  admin: "admin"
};

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await login({
        email: email,
        password: password
      });
      const userData = response?.data;
      const userRole = userData?.data?.user.role;
      const token = userData?.data?.token;

      // Store user data in Redux
      dispatch(setCredentials({
        user: {
          ...userData.data.user,
          role: userRole
        },
        token: token
      }));

      if (userRole === roletypes.admin) {
        const errorMessage = "Invalid email or password. Please try again.";
        dispatch(setError(errorMessage));
        setErrMessage(errorMessage);
      } else if (userRole === roletypes.broker) {
        navigate('/broker-home');
      } else if (userRole === roletypes.buyer) {
        navigate('/');
      } else {
        dispatch(setError("Invalid user role"));
        setErrMessage("Invalid user role");
      }
    } catch (err) {
      const errorMessage = "Invalid email or password. Please try again.";
      dispatch(setError(errorMessage));
      setErrMessage(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Home icon */}
      <Link
        to="/"
        className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
      >
        <FaHome size={24} />
      </Link>

      <div className="bg-[#002349] p-8 rounded-xl shadow-xl w-full max-w-sm text-white">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-2">Sign in</h2>
        <p className="text-sm mb-6">
          Save searches, save your favorite properties, and more.
          <br />
          New to the site?{" "}
          <Link to="/signup" className="underline">
            Sign Up for An Account
          </Link>
        </p>

        {/* Sub-header */}
        <p className="text-yellow-400 font-medium">{errMessage}</p>
        <p className="font-semibold mb-4">Sign In with email address</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="
              w-full 
              bg-transparent 
              border-b-2 border-white 
              placeholder-white/70 
              text-white 
              focus:outline-none 
              mb-6
            "
          />

          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            className="
              w-full 
              bg-transparent 
              border-b-2 border-white 
              placeholder-white/70 
              text-white 
              focus:outline-none 
              mb-6
            "
          />

          <div className="flex items-center justify-between mb-4 text-sm">
            {/* <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="form-checkbox h-4 w-4 text-white"
              />
              <span className="ml-2">Keep Me Signed In</span>
            </label> */}
            <Link
              to="/forgot-password"
              className="underline hover:text-gray-300"
            >
              Forget Password?
            </Link>
          </div>

          <p className="text-xs text-white/70 mb-6">
            By submitting this form, you acknowledge that you accept our{" "}
            <Link to="/about" className="underline">
              About Us
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="underline">
              Terms of Use
            </Link>
            .
          </p>

          <button
            type="submit"
            className="
              w-full py-3 
              bg-white text-blue-900 font-semibold 
              rounded hover:bg-gray-100 transition
            "
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
