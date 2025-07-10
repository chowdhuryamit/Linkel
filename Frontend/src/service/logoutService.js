import { logout } from "../store/authSlice.js";

export const logoutFunction = async (dispatch, navigate,toast,axios) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/u1/erase/user/credentials`,
      {},
      { withCredentials: true }
    );
    if (res.data.success) {
      toast.success(res.data.message, {
        onClose: () => {
          navigate("/signup"); 
          dispatch(logout());
        },
      });
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
