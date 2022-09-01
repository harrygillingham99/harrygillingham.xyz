import * as React from "react";
import { Template } from "@components/Template";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container min-h-full h-full">
        <Template />
      </div>
      <Footer />
    </div>
  );
};
