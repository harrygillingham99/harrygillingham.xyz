import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AppState from "state/AppState";
import Footer from "./common/Footer";
import NavBar from "./common/NavBar";

const Admin: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter basename="/admin">
      <QueryClientProvider client={queryClient}>
        <AppState.Provider>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="container min-h-full h-full py-8 lg:py-14 flex flex-col flex-grow">
              <p>Admin site</p>
            </div>
            <Footer />
          </div>
        </AppState.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Admin;
