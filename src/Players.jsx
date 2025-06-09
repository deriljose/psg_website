import React, { useEffect, useState } from "react";
import "./Players.css";

function PlayerCard({ number, name, position, img }) {
  return (
    <div
      className="player-card"
      style={{
        backgroundImage: img ? `url(data:image/jpeg;base64,${img})` : undefined,
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
  players.forEach((player) => {
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
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch(() => setPlayers([]));
  }, []);

  const grouped = groupByPosition(players);

  return (
    <div>
      <h1 className="team-heading">The Team</h1>
      {["Goalkeeper", "Defender", "Midfielder", "Forward"].map((position) => (
        <React.Fragment key={position}>
          <h2 className="position-heading">
            {position}
            {position === "Forward" ? "" : "s"}
          </h2>
          {chunkArray(grouped[position], 4).map((row, idx) => (
            <div className="player-cards-row" key={idx}>
              {row.map((player) => (
                <PlayerCard
                  key={player._id}
                  number={player.number}
                  name={player.name}
                  position={player.position}
                  img={player.image}
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
