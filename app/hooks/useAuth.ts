// hooks are used to share logic between components

import axios from "axios"; // axios is used to make http requests to the backend
import { removeCookies } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../../app/context/AuthContext";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      dataContext: null,
      errorContext: null,
      loadingContext: true,
    });
    try {
      // axios.post("api url", { dataContext }) is the same as fetch("api url", { method: "POST", body: JSON.stringify({ dataContext }) })
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        dataContext: response.data,
        errorContext: null,
        loadingContext: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        dataContext: null,
        errorContext: error.response.data.errorMessage,
        loadingContext: false,
      });
    }
  };
  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      faculty,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      faculty: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      dataContext: null,
      errorContext: null,
      loadingContext: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          firstName,
          lastName,
          faculty,
          phone,
        }
      );
      setAuthState({
        dataContext: response.data,
        errorContext: null,
        loadingContext: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        dataContext: null,
        errorContext: error.response.data.errorMessage,
        loadingContext: false,
      });
    }
  };

  const signout = () => {
    removeCookies("jwt");

    setAuthState({
      dataContext: null,
      errorContext: null,
      loadingContext: false,
    });
  };

/* The `useAuth` hook is returning an object with three functions: 
    `signin`, `signup`, and `signout`.
    These functions can be used by components that import the `useAuth` hook to handle user authentication. */
  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
