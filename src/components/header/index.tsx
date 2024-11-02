import React from "react";
import icons from "../../assets/svg/icons";

import "./style.css";

const Header: React.FC = () => {
  const { logo } = icons;
  return (
    <header className="header">
      {logo}
      <h1 className="title">TODO</h1>
    </header>
  );
};

export default Header;
