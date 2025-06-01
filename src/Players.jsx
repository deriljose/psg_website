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
            <h1 className="team-heading">The Team</h1>
            <h2 className="position-heading">Goalkeepers</h2>
            <div className="player-cards-row">
                <PlayerCard number="1" name="Gianluigi Donnarumma" position="Goalkeeper" img={donnarummaImage} />
                <PlayerCard number="39" name="Matvey Safonov" position="Goalkeeper" img={safonovImage} />
                <PlayerCard number="80" name="Arnau Tenas" position="Goalkeeper" img={arnauImage} />
            </div>
            <h2 className="position-heading">Defenders</h2>
            <div className="player-cards-row">
                <PlayerCard number="2" name="Achraf Hakimi" position="Defender" img={hakimiImage} />
                <PlayerCard number="3" name="Presnel Kimpembe" position="Defender" img={kimpembeImage} />
                <PlayerCard number="5" name="Marquinhos" position="Defender" img={marquinhosImage} />
                <PlayerCard number="21" name="Lucas Hernandez" position="Defender" img={hernandezImage} />
                {/* Only 4 defenders in this row */}
            </div>
            <div className="player-cards-row">
                <PlayerCard number="25" name="Nuno Mendes" position="Defender" img={mendesImage} />
                <PlayerCard number="35" name="Lucas Beraldo" position="Defender" img={beraldoImage} />
                <PlayerCard number="42" name="Yoram Zague" position="Defender" img={zagueImage} />
                <PlayerCard number="45" name="Naoufel El Hannach" position="Defender" img={hannachImage} />
                {/* Only 4 defenders in this row */}
            </div>
            <div className="player-cards-row">
                <PlayerCard number="51" name="Willian Pacho" position="Defender" img={pachoImage} />
                {/* If more defenders, add up to 4 per row */}
            </div>
            <h2 className="position-heading">Midfielders</h2>
            <div className="player-cards-row">
                <PlayerCard number="8" name="Fabian Ruiz" position="Midfielder" img={ruizImage} />
                <PlayerCard number="17" name="Vitinha" position="Midfielder" img={vitinhaImage} />
                <PlayerCard number="19" name="Lee Kang-in" position="Midfielder" img={leeImage} />
                <PlayerCard number="24" name="Senny Mayulu" position="Midfielder" img={mayuluImage} />
            </div>
            <div className="player-cards-row">
                <PlayerCard number="33" name="Warren Zaïre-Emery" position="Midfielder" img={zaireImage} />
                <PlayerCard number="87" name="João Neves" position="Midfielder" img={nevesImage} />
                {/* Only 2 midfielders in this row */}
            </div>
            <h2 className="position-heading">Foreward</h2>
            <div className="player-cards-row">
                <PlayerCard number="7" name="Khvicha Kvaratskhelia" position="Forward" img={khvichaImage} />
                <PlayerCard number="9" name="Gonçalo Ramos" position="Forward" img={ramosImage} />
                <PlayerCard number="10" name="Ousmane Dembélé" position="Forward" img={dembeleImage} />
                <PlayerCard number="14" name="Désiré Doué" position="Forward" img={doueImage} />
            </div>
            <div className="player-cards-row">
                <PlayerCard number="29" name="Bradley Barcola" position="Forward" img={barcolaImage} />
                <PlayerCard number="49" name="Ibrahim Mbaye" position="Forward" img={mbayeImage} />
                {/* Only 2 forwards in this row */}
            </div>
        </div>
    );
}

export default Players;
