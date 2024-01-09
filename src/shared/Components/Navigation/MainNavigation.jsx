import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import "./MainNavigation.css";
import { useState } from "react";
import Backdrop from "../UIElements/Backdrop";

export default function MainNavigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  function handleCloseDrawer() {
    setIsDrawerOpen(false);
  }
  return (
    <>
      {isDrawerOpen && <Backdrop onClick={handleCloseDrawer} />}
      <SideDrawer show={isDrawerOpen} onClick={handleCloseDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setIsDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>

        <h1 className="main-navigation__title">
          <Link to={"/home"}>YourPlaces</Link>
        </h1>

        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}
