import React, { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileNav from "../../EmployeeDashboard/Navbar/ProfileNav";

const AdminSettings = () => {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState({
    username: "Admin",
    email: "admin@example.com",
    notifications: true,
    password: "",
  });
  const userData = useSelector((state) => state?.auth?.data);
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking the fields are empty or not
    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }

    // validating the password using regex
    if (
      !userPassword.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    ) {
      toast.error(
        "Minimum password length should be 6 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // calling the api from auth slice
    const res = await dispatch(changePassword(userPassword));

    // clearing the input fields
    setUserPassword({
      oldPassword: "",
      newPassword: "",
    });

    // redirecting to profile page if password changed
    // if (res.payload.success) navigate("/user/profile");
  };

  const saveSettings = () => {
    toast.success("Settings saved successfully!");
  };



  return (
    // <div className="md:w-[85rem] h-screen flex flex-col items-center  p-4  md:mt-20 select-none">
    //   {/* Header */}
    //   <div className=" rounded-lg p-6 ">
    //     <h1 className="text-xl font-bold text-gray-800 text-center uppercase">Admin panel Settings</h1>
    //   </div>

    //     {/* Settings Form */}
    //     <div className="w-[40rem] bg-white shadow rounded-lg mt-6 p-6">
    //       <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">General Settings</h2>
    //       <div className="space-y-4">
    //         <div className="w-full flex justify-center">
    //           <img
    //             className="w-40 h-40 rounded-full border-4 border-gray-100"
    //             src={userData?.avatar?.secure_url}
    //             alt="user profile image"
    //           />
    //         </div>
    //         {/* Username */}
    //         <div>
    //           <label className="block text-gray-600 font-medium mb-1">Username</label>
    //           <input
    //             type="text"
    //             name="username"
    //             value={settings.username}
    //             onChange={handleInputChange}
    //             className="w-full border-gray-300 rounded px-3 py-2"
    //             placeholder="Enter your username"
    //           />
    //         </div>

    //         {/* Email */}
    //         <div>
    //           <label className="block text-gray-600 font-medium mb-1">Email</label>
    //           <input
    //             type="email"
    //             name="email"
    //             value={settings.email}
    //             onChange={handleInputChange}
    //             className="w-full border-gray-300 rounded px-3 py-2"
    //             placeholder="Enter your email"
    //           />
    //         </div>

    //         {/* Notifications */}
    //         <div className="flex items-center">
    //           <input
    //             type="checkbox"
    //             name="notifications"
    //             checked={settings.notifications}
    //             onChange={handleInputChange}
    //             className="h-5 w-5 text-blue-500 border-gray-300 rounded"
    //           />
    //           <label className="ml-3 text-gray-600 font-medium">Enable Notifications</label>
    //         </div>

    //   <form action="" onSubmit={handleFormSubmit}>
    //         {/* Password */}
    //         {/* <h1 className="text-center text-2xl font-bold">Change Password</h1> */}

    //         <div className="flex flex-col gap-1">
    //           <label className="text-lg font-semibold" htmlFor="oldPassword">
    //             Old Password
    //           </label>
    //           <input
    //             required
    //             type="password"
    //             name="oldPassword"
    //             id="oldPassword"
    //             placeholder="Enter your old password"
    //             className="bg-transparent px-2 py-1 border"
    //             value={userPassword.oldPassword}
    //             onChange={handlePasswordChange}
    //           />
    //         </div>

    //         <div className="flex flex-col gap-1">
    //           <label className="text-lg font-semibold" htmlFor="newPassword">
    //             New Password
    //           </label>
    //           <input
    //             required
    //             type="password"
    //             name="newPassword"
    //             id="newPassword"
    //             placeholder="Enter your new password"
    //             className="bg-transparent px-2 py-1 border"
    //             value={userPassword.newPassword}
    //             onChange={handlePasswordChange}
    //           />
    //         </div>
    //       </div>

    //   </form>
    //       {/* Save Button */}
    //       <button
    //         onClick={saveSettings}
    //         className="gradient-bg hover-gradient text-white py-3 px-6 rounded-md shadow-lg text-lg transition-transform duration-300 md:mt-6"
    //       >
    //         Save Changes
    //       </button>
    //     </div>
    // </div>
    <div className="max-h-screen bg-gray-50 p-4 ">
      {/* Navigation Tabs */}
      <div className="mb-6 overflow-x-auto ">
      </div>

      <div className="max-w-7xl mx-auto space-y-6 ">
        {/* Top Row */}
        
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Change Password Card */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4 border-b">
              <h4 className="text-lg font-semibold text-gray-800">Change Password</h4>
              <p className="text-sm text-gray-500">Your password needs to be at least 8 characters long.</p>
            </div>
            <div className="p-6">
              <form noValidate className="space-y-4" onSubmit={handleFormSubmit}>


                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold" htmlFor="oldPassword">
                    Old Password
                  </label>
                  <input
                    required
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Enter your old password"
                    className="bg-transparent px-2 py-1 border"
                    value={userPassword.oldPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    required
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter your new password"
                    className="bg-transparent px-2 py-1 border"
                    value={userPassword.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="text-center">
                  <button className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">
                    Change My Password
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Company Notifications Card */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4 border-b">
              <h4 className="text-lg font-semibold text-gray-800">Company Notification Settings</h4>
              <p className="text-sm text-gray-500">You will receive information across the whole company.</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: 'weekly-digest',
                    title: 'Weekly Summarize',
                    desc: 'Keeping you in the loop with a weekly email summarizing'
                  },
                  {
                    id: 'weekly-payroll',
                    title: 'Weekly Payroll Summarize',
                    desc: 'A weekly email containing all changes related to your payroll.'
                  },
                  {
                    id: 'visa-dates',
                    title: 'Visa Dates',
                    desc: 'Informs and notify the day before Visa dates for each team member.'
                  }
                ].map((item) => (
                  <label key={item.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 rounded text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </label>
                ))}
                <div className="text-center">
                  <button className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">
                    Update Notification Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Member Notifications Card */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b">
            <h4 className="text-lg font-semibold text-gray-800">Team Member Notification Settings</h4>
            <p className="text-sm text-gray-500">You will receive notifications only for Team Leads.</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  id: 'birthdays',
                  title: 'Birthdays',
                },
                {
                  id: 'work-anniversaries',
                  title: 'Work Anniversaries',
                  desc: 'Never miss work anniversaries with reminders the week and the day before.'
                },
                {
                  id: 'key-dates',
                  title: 'Key Dates',
                  desc: 'Informs and notify the day before key dates for each team member.'
                },
                {
                  id: 'off-boardings',
                  title: 'Off Boardings',
                  desc: 'Informs you when a team member has a leaving date set and reminds you the day before.'
                },
                {
                  id: 'work-from-home',
                  title: 'Work From Home Notifications',
                  desc: 'Never miss a notification that someone will be working from home.'
                }
              ].map((item) => (
                <label key={item.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-1 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </label>
              ))}
              <div className="text-center">
                <button className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">
                  Update Notification Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
