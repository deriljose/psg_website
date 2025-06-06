import React, { useEffect, useState } from "react";
import donnarummaImage from "./assets/donnarumma.png";
import safonovImage from "./assets/safonov.png";
import arnauImage from "./assets/arnau.png";
import hakimiImage from "./assets/hakimi.png";
import kimpembeImage from "./assets/kimpembe.png";
import marquinhosImage from "./assets/marquinhos.png";
import hernandezImage from "./assets/hernandez.png";
import mendesImage from "./assets/mendes.png";
import beraldoImage from "./assets/beraldo.png";
import zagueImage from "./assets/zague.png";
import hannachImage from "./assets/hannach.png";
import pachoImage from "./assets/pacho.png";
import ruizImage from "./assets/ruiz.png";
import vitinhaImage from "./assets/vitinha.png";
import leeImage from "./assets/lee.png";
import mayuluImage from "./assets/mayulu.png";
import zaireImage from "./assets/zaire.png";
import nevesImage from "./assets/neves.png";
import khvichaImage from "./assets/khvicha.png";
import ramosImage from "./assets/ramos.png";
import dembeleImage from "./assets/dembele.png";
import doueImage from "./assets/doue.png";
import barcolaImage from "./assets/barcola.png";
import mbayeImage from "./assets/mbaye.png";

import "./Players.css";

// Map player number to imported images
const playerImages = {
    1: donnarummaImage,
    39: safonovImage,
    80: arnauImage,
    2: hakimiImage,
    3: kimpembeImage,
    5: marquinhosImage,
    21: hernandezImage,
    25: mendesImage,
    35: beraldoImage,
    42: zagueImage,
    45: hannachImage,
    51: pachoImage,
    8: ruizImage,
    17: vitinhaImage,
    19: leeImage,
    24: mayuluImage,
    33: zaireImage,
    87: nevesImage,
    7: khvichaImage,
    9: ramosImage,
    10: dembeleImage,
    14: doueImage,
    29: barcolaImage,
    49: mbayeImage,
};

function PlayerCard({ number, name, position, img }) {
    return (
        <div
            className="player-card"
            style={{
                backgroundImage: `url(${img})`
            }}
        >
            <span className="player-jersey-number">{number}</span>
            <div className="player-card-content">
                <h3>{name}</h3>
                <p>Position: {position}</p>
            </div>
        </div>
        
    );
}

function groupByPosition(players) {
    const grouped = { Goalkeeper: [], Defender: [], Midfielder: [], Forward: [] };
    players.forEach(player => {
        // Normalize position spelling
        let pos = player.position;
        if (pos === "Foreward") pos = "Forward";
        if (grouped[pos]) grouped[pos].push(player);
    });
    return grouped;
}

function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

function Players() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/players")
            .then(res => res.json())
            .then(data => setPlayers(data))
            .catch(() => setPlayers([]));
    }, []);

    const grouped = groupByPosition(players);

    return (
        <div>
            <h1 className="team-heading">The Team</h1>
            {["Goalkeeper", "Defender", "Midfielder", "Forward"].map(position => (
                <React.Fragment key={position}>
                    <h2 className="position-heading">
                        {position}{position === "Forward" ? "" : "s"}
                    </h2>
                    {chunkArray(grouped[position], 4).map((row, idx) => (
                        <div className="player-cards-row" key={idx}>
                            {row.map(player => (
                                <PlayerCard
                                    key={player._id}
                                    number={player.number}
                                    name={player.name}
                                    position={player.position}
                                    img={playerImages[player.number] || ""}
                                />
                            ))}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Players;
