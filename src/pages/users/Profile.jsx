import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, logout } from "../../redux/userSlice";
import { FaUser, FaUserEdit } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // for checking user logged in or not
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const userData = useSelector((state) => state?.auth?.data);
    const role = useSelector((state) => state?.auth?.role);
    const handleLogout = async (event) => {
        event.preventDefault();

        const res = await dispatch(logout());

        if (res?.payload?.success) {
            navigate("/")
        }
    };
    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex select-none">
            {/* Left Sidebar */}
            {/* <div className="w-64 bg-cyan-800 text-white shadow-lg fixed inset-y-0 left-0 p-6 hidden lg:block">
                <div className="text-2xl font-semibold mb-10">Dashboard</div>
                <nav>
                    <ul className="space-y-4 mx-4 m-10 ">
                        <li className="flex items-center mb-4 ">
                            <FaUser className="h-6 w-6 mr-2 text-white" />
                            <Link to="/user/getUser" className="hover:text-yellow-400">Profile</Link>
                        </li>
                        <li className="flex items-center mb-4">
                            <IoSettingsSharp className="h-6 w-6 mr-2 text-white" />
                            <Link to="#" className="hover:text-yellow-400">Settings</Link>
                        </li>
                        <li className="flex items-center mb-4">
                            <FaUserEdit className="h-6 w-6 mr-2 text-white" />
                            <Link to="/profile/edit" className="hover:text-yellow-400">Edit Profile</Link>
                        </li>
                        <li className="flex items-center mb-4" onClick={handleLogout}>
                            <CgLogOut className="h-6 w-6 mr-2 text-white" />
                            <Link to="#" className="hover:text-yellow-400">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div> */}
            <div className="w-64 bg-cyan-800 text-white shadow-lg fixed inset-y-0 left-0 p-10 hidden lg:block">
                <div className="text-2xl font-semibold mb-12">Dashboard</div>
                <nav>
                    <ul className="space-y-8 mx-6 m-16">
                        <li className="flex items-center mb-6">
                            <FaUser className="h-6 w-6 mr-2 text-white" />
                            <Link to="/profile/me" className="hover:text-yellow-400">Profile</Link>
                        </li>
                        <li className="flex items-center mb-6">
                            <FaUserEdit className="h-6 w-6 mr-2 text-white" />
                            <Link to="/profile/edit" className="hover:text-yellow-400">Edit Profile</Link>
                        </li>
                        <li className="flex items-center mb-6">
                            <IoSettingsSharp className="h-6 w-6 mr-2 text-white" />
                            <Link to="/settings" className="hover:text-yellow-400">Settings</Link>
                        </li>
                        <li className="flex items-center mb-6">
                            <IoSettingsSharp className="h-6 w-6 mr-2 text-white" />
                            <Link to="/settings" className="hover:text-yellow-400">Change-password
                            </Link>
                        </li>

                        {
                            isLoggedIn && role === "ADMIN" && (
                                <li className="flex items-center mb-6">
                                    <MdDashboard className="h-6 w-6 mr-2 text-white" />
                                    <Link to="/admin" className="hover:text-yellow-400">Dashboard</Link>
                                </li>

                            )
                        }
                        <li className="flex items-center mb-6" onClick={handleLogout}>
                            <CgLogOut className="h-6 w-6 mr-2 text-white" />
                            <Link to="#" className="hover:text-yellow-400">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>


            {/* Main Content Area */}
            <div className="flex-1 ml-64 p-6">
                <div className="max-w-3xl mx-auto  p-6 rounded-lg ">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl text-center md:ml-36 font-semibold text-gray-800">Profile</h1>
                    </div>

                    {/* Profile Info */}
                    <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-gray-800 md:mt-20 ">
                        <div className="w-full flex justify-center">
                            <img
                                className="w-40 h-40 rounded-full border-4 border-gray-100"
                                src={userData?.avatar?.secure_url}
                                alt="user profile image"
                            />
                        </div>

                        <h3 className="text-2xl font-bold leading-normal tracking-wider text-center capitalize">
                            {userData?.fullName}
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <p className="font-medium">Email:-</p>
                            <p>{userData?.email}</p>

                            <p className="font-medium">Role:-</p>
                            <p>{userData?.role}</p>
                            <p className="font-medium">Employee Id:-</p>
                            <p>1</p>
                            <p className="font-medium">Department:-</p>
                            <p>IT</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <Link
                                to={
                                    userData?.email === "test@gmail.com"
                                        ? "/denied"
                                        : "#"
                                }
                                className=" bg-cyan-600 hover:bg-cyan-700 transition-all ease-in-out duration-300 rounded-sm px-4 py-2 text-center font-semibold text-white"
                            >
                                Change Password
                            </Link>

                            <Link
                                to={
                                    userData?.email === "test@gmail.com"
                                        ? "/denied"
                                        : "/profile/edit"
                                }
                                className=" border border-cyan-600 hover:border-cyan-500 transition-all ease-in-out duration-300 rounded-sm px-4 py-2 text-center font-semibold text-cyan-600"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
