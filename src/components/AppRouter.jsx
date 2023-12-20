import React, { useContext } from "react";
import { AuthContext } from "../context";
import Loader from "./UI/loader/Loader";
import { Route, Routes } from "react-router-dom";
import User from "../pages/User";
import Login from "../pages/Login";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      <Route exact path="/user" element={<User />}></Route>
      <Route path="*" element={<User />} />
    </Routes>
  ) : (
    <Routes>
      <Route exact path="/login" element={<Login />}></Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
