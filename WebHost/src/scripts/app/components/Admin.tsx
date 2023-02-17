import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLanding, BlogEdit } from "routes";
import { Urls } from "routes/urls";
import AppState from "state/AppState";
import Footer from "./common/Footer";
import NavBar from "./common/NavBar";
import SuspenseLoader from "./common/SuspenseLoader";

const Admin: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter basename="/admin">
      <QueryClientProvider client={queryClient}>
        <AppState.Provider>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="container min-h-full h-full py-8 lg:py-14 flex flex-col flex-grow">
              <React.Suspense fallback={<SuspenseLoader />}>
                <Routes>
                  <Route path={Urls.Landing} element={<AdminLanding />} />
                  <Route path={Urls.NewBlog} element={<BlogEdit isCreate />} />
                  <Route path={Urls.Blog} element={<BlogEdit />} />
                  <Route path="*" element={<Navigate to={Urls.Landing} />} />
                </Routes>
              </React.Suspense>
            </div>
            <Footer />
          </div>
        </AppState.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Admin;
