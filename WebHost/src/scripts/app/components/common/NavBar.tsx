import React from "react";
import { useEffectOnce } from "react-use";
import { themeChange } from "theme-change";

const NavBar: React.FC = () => {
  useEffectOnce(() => {
    themeChange(false);
  });

  return (
    <div className="navbar bg-base-100 shadow-xl p-0">
      <div className="container">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">XYZ</a>
        </div>
        <div className="flex flex-row justify-end">
          🌚
          <input
            type="checkbox"
            className="toggle mx-2"
            data-toggle-theme="light,dark"
            data-act-class="active"
          />
          🌞
        </div>
      </div>
    </div>
  );
};

export default NavBar;
