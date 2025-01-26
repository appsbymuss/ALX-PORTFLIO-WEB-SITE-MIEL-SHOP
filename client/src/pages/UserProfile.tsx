import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AuthAPI } from "../data/apiMethods";

const UserProfile = () => {
  const navigate = useNavigate();
  const loginStatus = useSelector((state: RootState) => state.auth.loginStatus);
  const [user, setUser] = useState<User>();

  const logout = () => {
    toast.error("Logged out successfully");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    navigate("/login");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await AuthAPI.isLoggedIn();
        if (response.status !== 200) {
          navigate("/login", { replace: true });
        } else {
          const profileResponse = await AuthAPI.getProfile();
          setUser(profileResponse.data);
        }
      } catch (error) {
        navigate("/login", { replace: true });
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <div className="max-w-screen-lg mx-auto mt-24 px-5">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
            placeholder="Enter first name"
            id="firstname"
            name="name"
            defaultValue={user?.name}
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
            placeholder="Enter last name"
            id="lastname"
            name="lastname"
            defaultValue={user?.lastname}
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
            placeholder="Enter email address"
            id="email"
            name="email"
            defaultValue={user?.email}
            disabled
          />
        </div>
        <Link
          to="/order-history"
          className="bg-white text-black text-center text-xl border border-gray-400 font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
        >
          Order History
        </Link>
        <Button onClick={logout} text="Logout" mode="white" />
      </div>
    </div>
  );
};

export default UserProfile;
