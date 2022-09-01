import * as React from "react";
import { Template } from "@components/Template";
import NavBar from "./common/NavBar";

export const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="container px-10">
        <Template />
      </div>
    </>
  );
};
