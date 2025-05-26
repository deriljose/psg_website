import donnarummaImage from "./assets/donnarumma.png";
import safonovImage from "./assets/safonov.png";
import "./Players.css";

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

function Players() {
    return (
        <div>
            <h1>The Team</h1>
            <h2>Goalkeepers</h2>
            <div className="player-cards-row">
                <PlayerCard
                    number="1"
                    name="Gianluigi Donnarumma"
                    position="Goalkeeper"
                    img={donnarummaImage}
                />
                <PlayerCard
                    number="39"
                    name="Matvey Safonov"
                    position="Goalkeeper"
                    img={safonovImage}
                />
                <PlayerCard
                    number="99"
                    name="Gianluigi Donnarumma"
                    position="Goalkeeper"
                    img={donnarummaImage}
                />
                <PlayerCard
                    number="99"
                    name="Gianluigi Donnarumma"
                    position="Goalkeeper"
                    img={donnarummaImage}
                />
            </div>
        </div>
    );
}

export default Players;
