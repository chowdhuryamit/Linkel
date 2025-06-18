import { login,logout } from "../store/authSlice.js";

export const fetchUserData = async (dispatch,navigate,axios,toast) => {
  try {
    const res = await axios.get(
      "http://localhost:8000/api/u1/verify/user/credentials",
      { withCredentials: true }
    );
    if (res.data.success) {
      dispatch(login({ userData: res.data.userData }));
      toast.success(res.data.message, {
        onClose: () => {
         navigate("/home");
        },
      });
    }
  } catch (error) {
    dispatch(logout());
    toast.error(error.response.data.message);
  }
};
