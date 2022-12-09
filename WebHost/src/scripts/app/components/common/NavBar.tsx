import React from "react";
import { Link } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { Urls } from "routes/urls";
import { themeChange } from "theme-change";

const NavBar: React.FC = () => {
  useEffectOnce(() => {
    themeChange(false);
  });

  const currentThemeIsLight = window.localStorage?.getItem("theme") === "light";

  return (
    <div className="navbar bg-base-100 shadow-xl p-0">
      <div className="container">
        <div className="flex-1">
          <Link to={Urls.Landing} className="p-0 text-2xl">
            XYZ
          </Link>
        </div>
        <div className="flex flex-row justify-end">
          🌚
          <input
            type="checkbox"
            className="toggle mx-2"
            data-toggle-theme="light,dark"
            data-act-class="active"
            defaultChecked={currentThemeIsLight}
          />
          🌞
        </div>
      </div>
    </div>
  );
};

export default NavBar;
