import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { StoreContext } from "./context/StoreContext";
import SigninPage from "./pages/Signin/SigninPage";
import SignupPage from "./pages/Signup/SignupPage";
import Dashboard from "./pages/Dashboard/Dashboard";


const App = () => {
  const { token } = useContext(StoreContext);
  console.log("token app-",token);
  

  return (
    <Routes>
      {/* Default route goes to signup     */}
      <Route path="/" element={<SignupPage />} />

      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Dashboard route    */}

      <Route
        path="/dashboard"
        element={token ? <Dashboard/>  : <Navigate to="/signin" />}
      />

    </Routes>
  );
};

export default App;
