import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PhoneDetailPage from "./pages/PhoneDetailPage";

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application component.
   * Provides top-level layout (header + main container) and client-side routes.
   */
  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phone/:slug" element={<PhoneDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
