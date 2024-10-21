import React from "react";
import "./style.css";
import icons from "../../assets/svg/icons";

const Header: React.FC = () => {
  return (
    <header className="header">
      {icons.logo}
      <h1 className="title">TODO</h1>
    </header>
  );
};

export default Header;
