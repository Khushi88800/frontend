import React, { useState } from 'react';
import officeLogo from "../../assets/Images/VN LOGO.jpeg"
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateProfile } from '../../redux/userSlice';

const CompanySettings = () => {
  const dispatch =useDispatch();
  const [previewImage, setImagePreview] = useState("");

  const [data, setData] = useState({
    fullName: "",
    avatar: undefined,
    userID: useSelector((state) => state?.auth?.data?._id),
  });
  const setName = (event) => {
    const { name, value } = event.target;
    const newUserData = { ...data, [name]: value };
    setData(newUserData);
  };


  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setData({
        ...data,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking for the empty field
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }

    // checking the length of name
    if (data.fullName.length < 5) {
      toast.error("Name should have more than 5 characters");
      return;
    }

    // creating the form data from the existing data
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    const newUserData = [data.userID, formData];

    // dispatching the api call using the thunk
    await dispatch(updateProfile(newUserData));

    // fetching the data to update
    await dispatch(getUserData());
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 w-[85rem] md:mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}


          <div className="mb-6 flex space-x-2 overflow-x-auto shadow-sm">
            <button className="px-6 py-2 bg-yellow-500 text-white rounded-t-lg font-medium">
              General
            </button>
            <button className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-t-lg font-medium">
              Time Off
            </button>
          </div>

        <form action="" onSubmit={handleFormSubmit}>
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Company Logo Section */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-4 border-b">
                <h4 className="text-lg font-semibold text-gray-800">Edit Profile</h4>
              </div>
              <div className="p-6">

                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <div className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">

                      <label className="cursor-pointer" htmlFor="image_uploads">
                        {previewImage ? (
                          <img
                            className="w-full h-[12rem] rounded-lg m-auto "
                            src={previewImage}
                            alt="preview image"
                          />
                        ) : (
                          <img src={officeLogo} alt="office_logo" />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Details Section */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-4 border-b">
                <h4 className="text-lg font-semibold text-gray-800">Your Company</h4>
              </div>
              <div className="p-6">

                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold text-black" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your full name"
                    className="select-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={data.fullName}
                    onChange={setName}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-medium transition-colors md:mt-10"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySettings;