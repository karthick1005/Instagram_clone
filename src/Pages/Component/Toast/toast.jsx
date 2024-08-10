import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const showsuccessalert = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
  });
};
export const showerror = (message) => {
  console.log("this is hello");
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
  });
};
