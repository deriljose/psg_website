import React from "react";
import { Link, Element } from "react-scroll";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header.jsx";
import News from "./News.jsx";
import Fixtures from "./Fixtures.jsx";
import Players from "./Players.jsx";
import Login from "./Login.jsx";

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
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
