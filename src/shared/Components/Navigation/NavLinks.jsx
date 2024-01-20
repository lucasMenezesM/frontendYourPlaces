import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth";

import "./NavLinks.css";

export default function NavLinks() {
  // const { isLoggedIn, logout, userId } = useContext(AuthContext);
  const { token, logout, userId } = useAuth();
  const navigate = useNavigate();

  function handleLogOut() {
    logout();
    navigate("/");
  }

  return (
    <ul className="nav-links">
      <li>
        <NavLink to={"/home"}>ALL USERS</NavLink>
      </li>
      {token && (
        <>
          <li>
            <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to={"/places/new"}>ADD PLACE</NavLink>
          </li>
          <li>
            <button onClick={handleLogOut}>LOG OUT</button>
          </li>
        </>
      )}
      {!token && (
        <li>
          <NavLink to={"/auth"}>AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );
}
