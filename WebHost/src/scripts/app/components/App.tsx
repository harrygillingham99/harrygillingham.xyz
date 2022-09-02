import * as React from "react";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Urls } from "../routes/urls";
import { About, Blog, Landing } from "../routes";
import AppState from "state/AppState";
import SuspenseLoader from "./common/SuspenseLoader";

export const App: React.FC = () => {
  return (
    <AppState.Provider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="container min-h-full h-full py-8 lg:py-14 flex flex-col flex-grow">
          <BrowserRouter>
            <React.Suspense fallback={<SuspenseLoader />}>
              <Routes>
                <Route path={Urls.Landing} element={<Landing />} />
                <Route path={Urls.Blog} element={<Blog />} />
                <Route path={Urls.About} element={<About />} />
                <Route path="*" element={<Navigate to={Urls.Landing} />} />
              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </AppState.Provider>
  );
};
