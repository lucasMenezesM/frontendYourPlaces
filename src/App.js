import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

import "./App.css";

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    SetIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    SetIsLoggedIn(false);
    setUserId(null);
  });

  // console.log("Current id: " + userId);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
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
