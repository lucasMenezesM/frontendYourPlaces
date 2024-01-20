import { Suspense, useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

import "./App.css";
import useAuth from "./shared/hooks/auth";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

function App() {
  // const [token, setToken] = useState(false);
  // const [userId, setUserId] = useState(null);

  const { login, token, userId } = useAuth();

  return (
    <div className="App">
      <MainNavigation />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
