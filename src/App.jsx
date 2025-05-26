import React from "react";
import { Link, Element } from "react-scroll";
import "./App.css";
import Header from "./Header.jsx";
import News from "./News.jsx";
import Fixtures from "./Fixtures.jsx";
import Players from "./Players.jsx";

function App() {
    return (
        <div className="container">
            <Header></Header>
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

export default App;
