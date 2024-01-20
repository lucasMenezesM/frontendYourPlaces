// auth.js (ou qualquer nome que você preferir)
import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  // const [expirationTokenTime, setExpirationTokenTime] = useState(null);

  const login = (token, uid, expiration) => {
    setToken(token);
    setUserId(uid);
    console.log("expiration login ", expiration);
    localStorage.setItem(
      "userAuth",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: expiration,
      })
    );
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userAuth");
  };

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("userAuth"));

    if (storedToken) {
      const expirationTokenTime = new Date(storedToken.expiration).getTime();
      setToken(storedToken.token);
      setUserId(storedToken.userId);
      console.log("expired: ", expirationTokenTime < new Date().getTime());
      if (expirationTokenTime < new Date().getTime()) {
        logout();
      }
    }
  }, []);

  return { token, login, logout, userId };
};

export default useAuth;
