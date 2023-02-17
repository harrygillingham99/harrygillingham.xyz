import React from "react";
import { useEffectOnce } from "react-use";
import { themeChange } from "theme-change";

const ThemeSwitcher: React.FC<{ hidden?: boolean }> = ({ hidden }) => {
  useEffectOnce(() => {
    themeChange(false);
  });
  const currentThemeIsLight = window.localStorage?.getItem("theme") === "light";
  return (
    <span className="flex flex-row justify-center">
      {!hidden && "🌚"}
      <input
        type={hidden ? "hidden" : "checkbox"}
        className="toggle mx-2"
        data-toggle-theme="light,dark"
        data-act-class="active"
        defaultChecked={currentThemeIsLight}
      />
      {!hidden && "🌞"}
    </span>
  );
};

export default ThemeSwitcher;
