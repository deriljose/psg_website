import "./Fixtures.css";

function Fixtures() {
    return (
        <div>
            <h1 className="fixture-heading">Fixtures</h1>
            <div className="fixtures-cards-container">
                <div className="fixture-card">
                    <ul>
                        <li>UEFA Champians League - Final</li>
                        <li>PSG VS Inter</li>
                        <li>1st June 12:30am IST</li>
                    </ul>
                </div>
                <div className="fixture-card">
                    <ul>
                        <li>
                            FIFA Club World Cup | Group Stage | Matchday 1 of 3
                        </li>
                        <li>PSG VS Atlético de Madrid</li>
                        <li>16th June 12:30am IST</li>
                    </ul>
                </div>
                <div className="fixture-card">
                    <ul>
                        <li>
                            FIFA Club World Cup | Group Stage | Matchday 2 of 3
                        </li>
                        <li>PSG VS Botafogo</li>
                        <li>20th June 6:30am IST</li>
                    </ul>
                </div>
                <div className="fixture-card">
                    <ul>
                        <li>
                            FIFA Club World Cup | Group Stage | Matchday 3 of 3
                        </li>
                        <li>Seattle Sounders VS PSG</li>
                        <li>24th June 12:30am IST</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Fixtures;
