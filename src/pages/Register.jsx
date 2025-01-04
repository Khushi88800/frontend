import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/userSlice";
import toast from "react-hot-toast";
import logo from "../assets/Images/VN LOGO.jpeg"

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setUserData({
        ...userData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (
        !userData.avatar ||
        !userData.email.trim() ||
        !userData.fullName.trim() ||
        !userData.password.trim()
      ) {
        toast.error("Please fill all the fields");
        setLoading(false);
        return;
      }

      if (userData.fullName.trim().length < 5) {
        toast.error("Name should be at least 5 characters");
        setLoading(false);
        return;
      }

      if (
        !userData.email
          .trim()
          .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        toast.error("Invalid email id");
        setLoading(false);
        return;
      }

      if (
        !userData.password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
        )
      ) {
        toast.error(
          "Password must include uppercase, lowercase, number, and be 8+ characters."
        );
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("fullName", userData.fullName.trim());
      formData.append("email", userData.email.trim());
      formData.append("password", userData.password);
      formData.append("avatar", userData.avatar);

      const res = await dispatch(createAccount(formData));
      if (res.payload.success) {
        navigate("/login");
      } else {
        toast.error(res.payload.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    setUserData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen select-none">
    <div className="flex flex-col md:flex-row lg:max-w-4xl w-96 md:w-full bg-white rounded-lg overflow-hidden shadow-[0_0_10px_black]">
      {/* Left Side */}
      <div className="w-full md:w-2/3 bg-black items-center justify-center p-6 hidden md:flex">
        <img
          src={logo}
          alt="Illustration"
          className="w-full h-auto object-contain"
        />
      </div>
  
      {/* Right Side */}
      <div className="w-full md:w-2/3 p-8 md:p-12">
        <div className="w-full max-w-md mx-auto">
          <form
            noValidate
            className="space-y-6"
            onSubmit={(e) => handleSignUp(e)}
          >
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center">
              Register
            </h1>
            <p className="text-sm md:text-lg text-gray-600 text-center">
              Create a new account
            </p>
  
            <label className="cursor-pointer block text-center" htmlFor="image_uploads">
              {previewImage ? (
                <img
                  className="w-24 h-24 rounded-full mx-auto"
                  src={previewImage}
                  alt="Preview"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 text-gray-500 mx-auto" />
              )}
            </label>
            <input
              onChange={getImage}
              className="hidden"
              type="file"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .jpeg, .png"
            />
  
            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                required
                value={userData.fullName}
                onChange={handleUserInput}
              />
            </div>
  
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@company.com"
                required
                value={userData.email}
                onChange={handleUserInput}
              />
            </div>
  
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
                minLength="8"
                value={userData.password}
                onChange={handleUserInput}
              />
            </div>
  
            <button
              type="submit"
              className="w-full py-3 px-5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Register
              {loading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 ml-2 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
  
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Register;
