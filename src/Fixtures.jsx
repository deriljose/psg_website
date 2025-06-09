import { useEffect, useState } from "react";
import "./Fixtures.css";

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/fixtures")
      .then((res) => res.json())
      .then((data) => setFixtures(Array.isArray(data) ? data : []))
      .catch(() => setFixtures([]));
  }, []);

  return (
    <div>
      <h1 className="fixture-heading">Fixtures</h1>
      <div className="fixtures-cards-container">
        {fixtures.map((fixture) => (
          <div className="fixture-card" key={fixture._id}>
            <ul>
              <li className="fixture-competiton">
                {fixture.competition}
                {fixture.stage ? " | " + fixture.stage : ""}
              </li>
              <li>
                {fixture.homeTeam} VS {fixture.awayTeam}
              </li>
              <li>
                {fixture.date
                  ? new Date(fixture.date).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    }) + " IST"
                  : ""}
              </li>
              {fixture.venue && <li>{fixture.venue}</li>}
              {fixture.status && <li>Status: {fixture.status}</li>}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fixtures;
