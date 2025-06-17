// src/components/AuthFlow.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaTimes, FaPlus } from "react-icons/fa";
import backgroundImg from "../../assets/Login/login.svg";
import { signup } from "../../network/auth.js";
import { uploadImages } from "../../network/images.js";

const roletypes = {
  buyer: "buyer",
  broker: "broker",
  admin: "admin"
};

export default function AuthFlow() {
  const queryStep = new URLSearchParams(window.location.search).get("step");
  const [step, setStep] = useState(null);
  const [brokerCode, setBrokerCode] = useState("");
  const [brokerNewPass, setBrokerNewPass] = useState("");
  const [brokerConfirmPass, setBrokerConfirmPass] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //if (queryStep === "broker") setStep("broker");
    //else if (queryStep === "buyer") setStep("buyer");
    //else setStep("select");
    setStep("buyer");
  }, [queryStep]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrMessage(""); // Clear any previous errors
    
    const formData = new FormData(e.target);
    
    // Get form values
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const phone = formData.get('phone');
    const selectedRole = formData.get('role');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setErrMessage("Passwords do not match");
      return;
    }
    
    // Validate role
    if (!Object.values(roletypes).includes(selectedRole)) {
      setErrMessage("Invalid role selected");
      return;
    }

    // Validate image
    if (!avatarFile) {
      setErrMessage("Please add a profile photo");
      return;
    }

    try {
      // First upload the image
      const uploadResp = await uploadImages({ images: [avatarFile], type: "user" });
      const imageUrl = uploadResp.data.images;

      // Then proceed with signup
      const response = await signup({
        username,
        email,
        password,
        confirmPassword,
        phone,
        role: selectedRole,
        image: imageUrl
      });

      if (response?.data?.success) {
        navigate('/login');
      } else {
        const errorMsg = response?.data?.message || "Signup failed. Please try again.";
        console.error('Signup failed:', errorMsg);
        setErrMessage(errorMsg);
      }
    } catch (err) {
      console.error('Signup error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      if (err.response?.status === 400) {
        setErrMessage("Invalid input. Please check your information.");
      } else if (err.response?.status === 409) {
        setErrMessage("Email or username already exists.");
      } else if (err.response?.status === 500) {
        setErrMessage("Server error. Please try again later.");
      } else {
        setErrMessage(err.response?.data?.message || "Signup failed. Please try again.");
      }
    }
  };

  if (!step) return null;

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImg})`,paddingBlock: "430px" }}
    >
      <Link
        to="/"
        className="fixed top-4 right-4 text-white hover:text-gray-200 z-10"
      >
        <FaHome size={24} />
      </Link>

      <div className="relative z-20 w-full max-w-md mb-6">
        <button
          onClick={() => navigate("/login")}
          className="fixed top-4 left-4 text-white hover:text-gray-200"
        >
          <FaArrowLeft size={20} />
        </button>

        {(step === "buyer-forgot-confirm" ||
          step === "broker-forgot-confirm") && (
          <button
            onClick={() =>
              step === "buyer-forgot-confirm"
                ? setStep("buyer")
                : setStep("broker")
            }
            className="absolute top-4 right-4 bg-white/25 hover:bg-white/40 text-white rounded-full p-1.5 transition"
          >
            <FaTimes size={16} />
          </button>
        )}

        {step === "select" && (
          <div className="bg-[#002349] p-8 rounded-xl text-white text-center">
            <h2 className="text-2xl font-bold mb-6">Are you?</h2>
            <div className="flex justify-around">
              <button
                onClick={() => setStep("buyer")}
                className="flex flex-col items-center"
              >
                <span className="font-semibold mb-2">Buyer</span>
                <div className="h-4 w-4 rounded-full border-2 border-white" />
              </button>
              <button
                onClick={() => setStep("broker")}
                className="flex flex-col items-center"
              >
                <span className="font-semibold mb-2">Broker</span>
                <div className="h-4 w-4 rounded-full border-2 border-white" />
              </button>
            </div>
          </div>
        )}

        {step === "buyer" && (
          <div className="bg-[#002349] p-8 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Sign up for an account
            </h2>
            <p className="text-sm mb-6 text-center">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="underline hover:text-gray-200"
              >
                Sign in 
              </button>
            </p>

            {errMessage && (
              <p className="text-yellow-400 font-medium mb-4">{errMessage}</p>
            )}

            <form onSubmit={handleSignup}>
              {/* Avatar Upload */}
              <div className="mb-6 flex justify-center">
                <label className="relative h-24 w-24 rounded-lg bg-white border-2 border-dashed border-gray-400 cursor-pointer overflow-hidden flex items-center justify-center">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <FaPlus size={24} />
                      <span className="text-[10px]">Add Photo</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              </div>

              <label className="block mb-1 text-sm">Username</label>
              <input 
                name="username"
                type="text" 
                required 
                className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none" 
              />

              <label className="block mb-1 text-sm">Email Address</label>
              <input 
                name="email"
                type="email" 
                required 
                className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none" 
              />

              <label className="block mb-1 text-sm">Password</label>
              <input 
                name="password"
                type="password" 
                required 
                className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none" 
              />

              <label className="block mb-1 text-sm">Verify Your Password</label>
              <input 
                name="confirmPassword"
                type="password" 
                required 
                className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none" 
              />

              <label className="block mb-1 text-sm">Phone Number</label>
              <input 
                name="phone"
                type="tel" 
                required 
                className="w-full border-b border-white mb-6 bg-transparent py-1 focus:outline-none" 
              />

              {/* Role selection */}
              <div className="mb-6">
                <label className="block mb-2 text-sm">Select your role:</label>
                <div className="flex justify-around">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value={roletypes.buyer}
                      required
                      className="form-radio accent-white"
                    />
                    <span className="font-semibold">Buyer</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value={roletypes.broker}
                      required
                      className="form-radio accent-white"
                    />
                    <span className="font-semibold">Broker</span>
                  </label>
                </div>
              </div>

              <p className="text-xs mb-4 text-center">
                By creating an account, you acknowledge our{" "}
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
                className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100"
              >
                Sign Up
              </button>
            </form>
          </div>
        )}

        {step === "broker" && (
          <div className="bg-[#002349] p-8 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign in</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target[1].value;
                localStorage.setItem("user", JSON.stringify({ email, role: "broker" }));
                window.location.href = "/broker-home";
              }}
            >
              <label className="block mb-1 text-sm">Email Address</label>
              <input type="email" required className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none" />
              <label className="block mb-1 text-sm">Password</label>
              <input type="password" required className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none" />
              <div className="flex items-center justify-between mb-6 text-sm">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-white" />
                  <span className="ml-2">keep me signed in</span>
                </label>
                <button
                  type="button"
                  onClick={() => setStep("broker-forgot")}
                  className="underline hover:text-gray-200"
                >
                  Forgot Password?
                </button>
              </div>
              <p className="text-xs mb-4 text-center">
                By submitting this form, you accept our Privacy Policy and Terms of Use.
              </p>
              <button type="submit" className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100">
                Sign in
              </button>
            </form>
          </div>
        )}

        {step === "broker-forgot" && (
          <div className="bg-[#002349] p-8 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-2 text-center">Forgot Password?</h2>
            <p className="text-sm mb-6 text-center">
              A password reset link will be sent to your email.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              setStep("broker-code-verification");
            }}>
              <label className="block mb-1 text-sm">Email Address</label>
              <input type="email" required className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none" />
              <p className="text-xs mb-4 text-center">
                By submitting this form, you accept our Privacy Policy and Terms of Use.
              </p>
              <button type="submit" className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100">
                Send Link
              </button>
            </form>
          </div>
        )}

        {step === "broker-code-verification" && (
          <div className="bg-[#002349] p-8 rounded-xl text-white text-center">
            <h2 className="text-xl font-bold mb-4">Verify Your Code</h2>
            <p className="text-sm mb-4">A code has been sent to your email</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              setStep("broker-password-reset");
            }}>
              <input
                type="text"
                value={brokerCode}
                onChange={(e) => setBrokerCode(e.target.value)}
                required
                placeholder="Enter verification code"
                className="w-full mb-4 py-2 px-3 text-gray-900 bg-white rounded"
              />
              <button type="submit" className="w-full py-2 bg-white text-[#002349] font-semibold rounded">
                Submit
              </button>
            </form>
          </div>
        )}

        {step === "broker-password-reset" && (
          <div className="bg-[#002349] p-8 rounded-xl text-white text-center">
            <h2 className="text-xl font-bold mb-6">Changing Your Password</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (brokerNewPass !== brokerConfirmPass) {
                  alert("Passwords do not match");
                  return;
                }
                setStep("broker");
              }}
            >
              <div className="text-left mb-3">
                <label className="block mb-1 text-sm">Enter new password</label>
                <input
                  type="password"
                  value={brokerNewPass}
                  onChange={(e) => setBrokerNewPass(e.target.value)}
                  placeholder="New password"
                  className="w-full py-2 px-3 text-gray-900 bg-white rounded"
                  required
                />
              </div>
              <div className="text-left mb-5">
                <label className="block mb-1 text-sm">Verify New Password</label>
                <input
                  type="password"
                  value={brokerConfirmPass}
                  onChange={(e) => setBrokerConfirmPass(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full py-2 px-3 text-gray-900 bg-white rounded"
                  required
                />
              </div>
              <button type="submit" className="w-full py-2 bg-white text-[#002349] font-semibold rounded">
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
   
  );
}


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaHome } from "react-icons/fa";
// import backgroundImg from "../../assets/Login/login.svg";

// export default function AuthFlow() {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: `url(${backgroundImg})` }}
//     >
//       <Link
//         to="/"
//         className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
//       >
//         <FaHome size={24} />
//       </Link>

//       <div className="relative z-20 w-full max-w-md">
//         <button
//           onClick={() => navigate("/login")}
//           className="absolute top-4 left-4 text-white hover:text-gray-200"
//         >
//           <FaArrowLeft size={20} />
//         </button>

//         <div className="bg-[#002349] p-8 rounded-xl text-white">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Sign up for an account
//           </h2>
          
//           {/* Sign-in prompt */}
//           <p className="text-sm mb-6 text-center">
//             Already have an account?{" "}
//             <button
//               onClick={() => navigate("/login")}
//               className="underline hover:text-gray-200"
//             >
//               Sign in
//             </button>
//           </p>

//           <form onSubmit={(e) => e.preventDefault()}>
//             <label className="block mb-1 text-sm">UserName</label>
//             <input
//               type="text"
//               required
//               className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
//             />
//             <label className="block mb-1 text-sm">Email Address</label>
//             <input
//               type="email"
//               required
//               className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
//             />
//             <label className="block mb-1 text-sm">Password</label>
//             <input
//               type="password"
//               required
//               className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
//             />
//             <label className="block mb-1 text-sm">Verify Your Password</label>
//             <input
//               type="password"
//               required
//               className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
//             />
//             <label className="block mb-1 text-sm">Phone Number</label>
//             <input
//               type="tel"
//               required
//               className="w-full border-b border-white mb-6 bg-transparent py-1 focus:outline-none"
//             />
//             <p className="text-xs mb-4 text-center">
//               By creating an account, you acknowledge our Privacy Policy and Terms of Use.
//             </p>
//             <button
//               type="submit"
//               className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100"
//             >
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


