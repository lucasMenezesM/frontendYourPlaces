import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/Components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

import "./App.css";

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    SetIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    SetIsLoggedIn(false);
  });

  return (
    <div className="App"> 
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
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
