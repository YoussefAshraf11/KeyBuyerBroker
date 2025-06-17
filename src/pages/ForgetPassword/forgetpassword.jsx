import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import backgroundImg from "../../assets/Login/login.svg";
import { validateUserAndSendOtp, validateOtp, resetPasswordOtp } from "../../network/auth";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await validateUserAndSendOtp({ email });
      if (response.data.success) {
        localStorage.setItem('resetEmail', email);
        setStep(2);
      }
    } catch (error) {
      setError("Email not found. Please check your email address and try again.");
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const storedEmail = localStorage.getItem('resetEmail');
      if (!storedEmail) {
        setError("Session expired. Please start over.");
        setStep(1);
        return;
      }
      const response = await validateOtp({
        email: storedEmail,
        otp: code
      });
      if (response.data.success) {
        setStep(3);
      }
    } catch (error) {
      setError("Invalid OTP code. Please try again.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const storedEmail = localStorage.getItem('resetEmail');
      if (!storedEmail) {
        setError("Session expired. Please start over.");
        setStep(1);
        return;
      }
      const response = await resetPasswordOtp({
        email: storedEmail,
        otp: code,
        newPassword: newPassword,
        confirmNewPassword: confirmPassword
      });
      if (response.data.success) {
        localStorage.removeItem('resetEmail');
        navigate("/login");
      }
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Home Icon */}
      <Link
        to="/"
        className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
      >
        <FaHome size={24} />
      </Link>

      <div className="relative bg-[#002349] p-8 rounded-xl shadow-xl w-full max-w-sm text-white">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password?</h2>
            <p className="text-sm mb-6 text-center">
              A password reset code will be sent to your email.
            </p>
            <form onSubmit={handleEmailSubmit}>
              {error && (
                <p className="text-yellow-400 text-sm mb-4 text-center">{error}</p>
              )}
              <label className="block mb-1 text-sm">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full mb-6 py-2 px-3 text-gray-900 bg-white rounded"
              />
              <button
                type="submit"
                className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100 transition"
              >
                Send Link
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeSubmit} className="text-center">
            <h2 className="text-xl font-bold mb-4">Verify Your Code</h2>
            <p className="text-sm mb-4">A code has been sent to your email address</p>
            {error && (
              <p className="text-yellow-400 text-sm mb-4 text-center">{error}</p>
            )}
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="Enter verification code"
              className="w-full mb-4 py-2 px-3 text-gray-900 bg-white rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-white text-[#002349] font-semibold rounded"
            >
              Submit
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordChange} className="text-center">
            <h2 className="text-xl font-bold mb-6">Changing Your Password</h2>
            {error && (
              <p className="text-yellow-400 text-sm mb-4 text-center">{error}</p>
            )}
            <div className="text-left mb-3">
              <label className="block mb-1 text-sm">Enter new password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full py-2 px-3 text-gray-900 bg-white rounded"
                required
              />
            </div>
            <div className="text-left mb-5">
              <label className="block mb-1 text-sm">Verify New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full py-2 px-3 text-gray-900 bg-white rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-white text-[#002349] font-semibold rounded"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
