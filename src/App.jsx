import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header.jsx";
import News from "./News.jsx";
import Fixtures from "./Fixtures.jsx";
import Players from "./Players.jsx";
import Login from "./Login.jsx";
import Admin from "./Admin.jsx"; // create this component for your admin UI
import Signup from "./Signup";
import Footer from "./Footer.jsx";

function MainContent() {
  return (
    <div className="container">
      <Header />
      <div id="news-section">
        <News />
      </div>
      <div id="fixtures-section">
        <Fixtures />
      </div>
      <div id="players-section">
        <Players />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    // Remove <Router> from here if your index.jsx or main.jsx already wraps <App /> with <Router>
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
