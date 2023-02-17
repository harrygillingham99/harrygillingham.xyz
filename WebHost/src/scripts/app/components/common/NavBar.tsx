import React, { useState } from "react";
import AppState from "state/AppState";
import { Home, Settings } from "react-feather";
import ThemeSwitcher from "./ThemeSwitcher";
import { Twirl as Hamburger } from "hamburger-react";

const NavBar: React.FC = () => {
  const {
    config: { authenticated, logOutUrl },
  } = AppState.useContainer();
  const [toggled, toggle] = useState<boolean>();

  return (
    <div className="navbar bg-base-100 shadow-xl p-0">
      <div className="container">
        <div className="flex-1">
          <span className="p-0 text-2xl">XYZ</span>
        </div>
        <div className="flex flex-row justify-end items-center">
          {authenticated ? (
            <>
              <div className="dropdown dropdown-end dropdown-open">
                <Hamburger toggle={toggle} toggled={toggled} />
                {!toggled && <ThemeSwitcher hidden />}
                {toggled && (
                  <ul
                    className={
                      "menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 shadow-xl"
                    }
                  >
                    <li>
                      <ThemeSwitcher />
                    </li>
                    <li>
                      <a className="btn rounded-xl normal-case mt-3" href="/">
                        <Home />
                      </a>
                    </li>
                    <li>
                      <a
                        className="my-3 btn rounded-xl normal-case"
                        href="/admin"
                      >
                        <Settings />
                      </a>
                    </li>
                    <li>
                      <a
                        className="btn rounded-xl normal-case"
                        href={logOutUrl}
                      >
                        Log Out
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <ThemeSwitcher />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
