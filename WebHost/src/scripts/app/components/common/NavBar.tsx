import React from "react";
import { Link } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { Urls } from "routes/urls";
import AppState from "state/AppState";
import { themeChange } from "theme-change";

const NavBar: React.FC<{ isAdmin?: boolean }> = ({ isAdmin }) => {
  useEffectOnce(() => {
    themeChange(false);
  });

  const currentThemeIsLight = window.localStorage?.getItem("theme") === "light";
  const {
    config: { logOutUrl },
  } = AppState.useContainer();
  return (
    <div className="navbar bg-base-100 shadow-xl p-0">
      <div className="container">
        <div className="flex-1">
          <span className="p-0 text-2xl">XYZ</span>
        </div>
        <div className="flex flex-row justify-end items-center">
          <span className="flex flex-row">
            🌚
            <input
              type="checkbox"
              className="toggle mx-2"
              data-toggle-theme="light,dark"
              data-act-class="active"
              defaultChecked={currentThemeIsLight}
            />
            🌞
          </span>
          {isAdmin && (
            <a className="ml-2 btn rounded-xl normal-case" href={logOutUrl}>
              Log Out
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
