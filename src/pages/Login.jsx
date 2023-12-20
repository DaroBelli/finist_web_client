import React, { useContext, useState } from "react";
import { AuthContext } from "../context";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { useFetching } from "../hooks/useFetching";
import AuthService from "../API/AuthService";

const Login = () => {
  const { setIsAuth, setPhoneNumber } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({ phoneNumber: "", password: "" });

  const [fetchLoginning, isLoginningLoading, loginningError] = useFetching(
    async () => {
      const response = await AuthService.checkLoginInfo(loginInfo);
      if (response.data.isCorrect) {
        setIsAuth(true);
        setPhoneNumber(loginInfo.phoneNumber);
        localStorage.setItem("auth", "true");
        localStorage.setItem("phoneNumber", `${loginInfo.phoneNumber}`);
      } else {
        alert("Не правильный номер телефона или пароль!");
      }
    }
  );

  const login = (event) => {
    event.preventDefault();
    fetchLoginning();
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
      }}
    >
      <form onSubmit={login} style={{ width: "20%", justifyContent: "center" }}>
        <MyInput
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, phoneNumber: e.target.value })
          }
          type="text"
          placeholder="Введите номер телефона"
        />
        <MyInput
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          type="password"
          placeholder="Введите пароль"
        />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;
