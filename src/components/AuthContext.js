import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("token")
  );
  const [user, setUser] = useState(null);

  const getTokenExpiration = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = sessionStorage.getItem("token");
      const tokenExpiration = getTokenExpiration(token);
      const currentTime = Date.now() / 1000;

      if (token && tokenExpiration && currentTime > tokenExpiration) {
        console.log("Token is expired");
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem("token");
      } else if (token) {
        try {
          const response = await axios.get("/mypage", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    checkTokenValidity();

    const token = sessionStorage.getItem("token");

    const tokenExpiration = getTokenExpiration(token);
    if (tokenExpiration) {
      const timeoutId = setTimeout(() => {
        checkTokenValidity();
      }, (tokenExpiration - Date.now() / 1000) * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
