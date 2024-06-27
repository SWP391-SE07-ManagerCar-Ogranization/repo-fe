import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as UserService from "../../service/UserService";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    fetchUserDataById();
  }, []);

  const fetchUserDataById = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      const { name, email, image } = response.account;
      setUserData({ name, email, image });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      handleOnSubmitImg(e);
      const res = await UserService.updateUser(userId, userData, token);
      console.log(res);
      toast.success("Update Sucessfully !");
      navigate("/profile");
    } catch (error) {
      toast.error("Fail to upload");
      console.error("Error updating user profile:", error);
    }
  };

  function handleOnChangeImg(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setUserData((prev) => ({
        ...prev,
        image: onLoadEvent.target.result,
      }));
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const handleOnSubmitImg = async (event) => {
    try {
      const form = event.currentTarget;
      const fileInput = Array.from(form.elements).find(
        ({ name }) => name === "file"
      );
      const formData = new FormData();
      for (const file of fileInput.files) {
        formData.append("file", file);
      }
      formData.append("upload_preset", "ml_default");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dxge4xlbh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      console.log(data);
      setUserData((prev) => ({
        ...prev,
        image: data.url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gradient-to-r from-red-50 via-red-200 to-red-400 h-full">
      <div className="px-0 py-10 mx-auto max-w-7xl sm:px-4">
        <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 rounded-none shadow-xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6">
          <h1 className="mb-4 text-lg font-semibold text-center text-gray-600">
            Update User
          </h1>
          <form className="mb-8 space-y-4" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <Input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                label="Full name"
              />
            </div>
            <div>
              <Input
                disabled
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                label="Disabled"
              />
            </div>
            <div>
              
              <br></br>
              {!userData.image ? <label
                for="uploadFile1"
                className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload file<input type="file" id="uploadFile1" class="hidden" onChange={handleOnChangeImg}/>
                <p class="text-xs font-medium text-gray-400 mt-2">
                  PNG, JPG SVG, WEBP, and GIF are Allowed.
                </p>
              </label> :<label className="relative group"><img
                src={userData.image}
                alt="img" className="w-full h-1/2 mx-auto"
              /> <input type="file" id="uploadFile1" className="hidden" onChange={handleOnChangeImg}/>
                <div className="absolute w1/2 mx-auto inset-0 flex items-center justify-center bg-gray-800 bg-opacity-0 text-white opacity-0 group-hover:opacity-100 group-hover:bg-opacity-75 transition-opacity duration-300">
                    Upload image
                  </div>
              </label> 
              }
              
                
            </div>

            <br></br>
            <button className="bg-orange-400 hover:focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full text-white">
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
