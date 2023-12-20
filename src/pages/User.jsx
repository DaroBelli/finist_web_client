import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import { useFetching } from "../hooks/useFetching";
import UserService from "../API/UserService";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";

const User = () => {
  const { phoneNumber, setIsAuth } = useContext(AuthContext);

  const [user, setUser] = useState({ bankAccounts: [] });

  const [fetchUser, isUserLoading, userError] = useFetching(async () => {
    const response = await UserService.getUser({ phoneNumber_: phoneNumber });
    setUser(response.data);
  });

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("phoneNumber");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {isUserLoading ? (
        <Loader />
      ) : (
        <div>
          <h4>Клиент</h4>
          <label>
            {user.lastName} {user.firstName} {user.middleName}{" "}
            {user.phoneNumber}
          </label>
          <table>
            <thead>
              <tr>
                <th>Счета</th>
              </tr>
            </thead>
            <tbody>
              {user.bankAccounts.map((bankAccount) => (
                <tr key={bankAccount.accountNumber}>
                  <td>{bankAccount.accountNumber}</td>
                  <td>{bankAccount.accountType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <MyButton onClick={logout}>Выйти</MyButton>
      </div>
    </div>
  );
};

export default User;
