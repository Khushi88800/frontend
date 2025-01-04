import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../redux/userSlice";
import logo from "../../assets/Images/VN LOGO.jpeg"

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  // function to handle submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking for the empty field
    if (!email) {
      toast.error("All fields are mandatory");
      return;
    }

    // email validation using regex
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      toast.error("Invalid email id");
      return;
    }

    // calling the api from auth slice
    const res = await dispatch(forgetPassword(email));

    // clearing the input fields
    setEmail("");
  };

  return (
    <>
      {/* forget password container */}
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="w-full flex flex-col md:flex-row max-w-4xl  rounded-lg overflow-hidden shadow-[0_0_10px_black]">
          {/* Logo Section */}
          <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center p-12">
          
            <img
              src={logo}
              alt="Illustration"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your email to get a reset link
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-purple-800 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Reset Password
                  </button>
                </div>
              </form>

              <div className="text-center text-sm">
                <span className="text-gray-600">Remember your password? </span>
                <a href="/login" className="text-blue-800 hover:text-blue-700 font-medium">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;