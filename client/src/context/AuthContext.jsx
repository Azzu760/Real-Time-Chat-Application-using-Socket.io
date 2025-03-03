import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(async () => {
    setIsRegisterLoading(true);
    setRegisterError("");

    try {
      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);

      if (!response || response.error) {
        const errorMessage = response?.message || "Something went wrong.";
        setRegisterError(errorMessage);
        return false;
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);

      return true;
    } catch (error) {
      setRegisterError(error.message || "Network error, please try again.");
      setIsRegisterLoading(false);
      return false;
    }
  }, [registerInfo]);

  const loginUser = useCallback(async () => {
    setIsLoginLoading(true);
    setLoginError("");

    try {
      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);

      if (!response || response.error) {
        const errorMessage = response?.message || "Something went wrong.";
        setLoginError(errorMessage);
        return false;
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);

      return true;
    } catch (error) {
      setLoginError(error.message || "Network error, please try again.");
      setIsLoginLoading(false);
      return false;
    }
  }, [loginInfo]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        loginInfo,
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
