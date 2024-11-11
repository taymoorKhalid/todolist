import React from "react";
import icons from "../../assets/svg/icons";

import "./style.css";

interface HomeProps {
  onLogout: () => void;
}

const Header: React.FC<HomeProps> = ({ onLogout }) => {
  const { logo } = icons;
  return (
    <header className="header">
      {logo}
      <h1 className="title">TODO</h1>
      <button onClick={onLogout} className="header-button">
        Logout
      </button>
    </header>
  );
};

export default Header;
