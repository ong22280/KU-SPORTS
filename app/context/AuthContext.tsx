"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import error from "next/error";
import React, { useState, createContext, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  faculty: string;
  phone: string;
}

interface State {
  loadingContext: boolean;
  errorContext: string | null;
  dataContext: User | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loadingContext: false, // true if we are fetching dataContext
  errorContext: null,
  dataContext: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loadingContext: true,
    dataContext: null,
    errorContext: null,
  });

  const fetchUser = async () => {
    setAuthState({
      dataContext: null,
      errorContext: null,
      loadingContext: true,
    });
    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        return setAuthState({
          dataContext: null,
          errorContext: null,
          loadingContext: false,
        });
      }

      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        dataContext: response.data,
        errorContext: null,
        loadingContext: false,
      });
    } catch (errorContext: any) {
      setAuthState({
        dataContext: null,
        errorContext: errorContext.response.data.errorMessage,
        loadingContext: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
