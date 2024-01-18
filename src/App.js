import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

import "./App.css";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expiration) => {
    setUserId(uid);
    setToken(token);
    const expirationDate =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: expirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userData");
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));

    if (data && data.token && new Date(data.expiration) > new Date()) {
      login(data.userId, data.token, new Date(data.expiration));
    } else {
      if (data) {
        console.log(new Date(data.expiration), new Date());
        console.log(new Date(data.expiration) > new Date());
      }
      console.log("not authenticated");
    }
  }, [login]);

  // console.log("Current id: " + userId);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <MainNavigation />
        <main>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
