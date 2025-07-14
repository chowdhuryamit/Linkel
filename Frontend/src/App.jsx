import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer,Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserData } from "./service/fetchUser.js";
import "./App.css";

const App = () => {
  const userStatus = useSelector((state) => state.authStatus.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userStatus) {
      navigate("/home");
    } else {
      fetchUserData(dispatch, navigate, axios, toast);
    }
  }, [userStatus]);
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
      <Outlet />
    </>
  );
};

export default App;
