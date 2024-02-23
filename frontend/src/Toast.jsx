import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function Toast() {
  const notify = () => toast.error("Wow so easy !");
  useEffect(() => notify);
  return (
    <div className="wrapper">
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
    </div>
  );
}
export default Toast;
