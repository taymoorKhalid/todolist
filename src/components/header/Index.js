import React from "react";
import "./style.css";
import { Logo } from "../../assets/svg/Logo";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <h1 className="title">TODO</h1>
    </header>
  );
};

export default Header;
