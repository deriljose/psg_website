import "./admin.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Admin() {
  const [active, setActive] = useState("News");
  const navigate = useNavigate();

  // News management state
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fixtures management state
  const [fixtures, setFixtures] = useState([]);
  const [fixtureLoading, setFixtureLoading] = useState(false);
  const [fixtureForm, setFixtureForm] = useState({
    competition: "",
    stage: "",
    homeTeam: "",
    awayTeam: "",
    date: "",
    venue: "",
    // status: "", // Remove status
  });
  const [fixtureError, setFixtureError] = useState("");
  const [fixtureSuccess, setFixtureSuccess] = useState("");

  // Players management state
  const [players, setPlayers] = useState([]);
  const [playerLoading, setPlayerLoading] = useState(false);
  const [playerForm, setPlayerForm] = useState({
    number: "",
    name: "",
    position: "",
    image: null,
  });
  const [playerError, setPlayerError] = useState("");
  const [playerSuccess, setPlayerSuccess] = useState("");

  // Fetch news when News tab is active
  useEffect(() => {
    if (active === "News") {
      fetchNews();
    }
  }, [active]);

  // Fetch fixtures when Fixtures tab is active
  useEffect(() => {
    if (active === "Fixtures") {
      fetchFixtures();
    }
  }, [active]);

  // Fetch players when Players tab is active
  useEffect(() => {
    if (active === "Players") {
      fetchPlayers();
    }
  }, [active]);

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/news");
      const data = await res.json();
      setNewsList(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to fetch news.");
    }
    setLoading(false);
  };

  const fetchFixtures = async () => {
    setFixtureLoading(true);
    setFixtureError("");
    try {
      const res = await fetch("http://localhost:5000/api/fixtures");
      const data = await res.json();
      setFixtures(Array.isArray(data) ? data : []);
    } catch {
      setFixtureError("Failed to fetch fixtures.");
    }
    setFixtureLoading(false);
  };

  const fetchPlayers = async () => {
    setPlayerLoading(true);
    setPlayerError("");
    try {
      const res = await fetch("http://localhost:5000/api/players");
      const data = await res.json();
      setPlayers(Array.isArray(data) ? data : []);
    } catch {
      setPlayerError("Failed to fetch players.");
    }
    setPlayerLoading(false);
  };

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      // Convert image to base64 string
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: reader.result.split(",")[1], // Remove data:image/...;base64, prefix
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Prepare JSON body with base64 image string
    const payload = {
      title: form.title,
      content: form.content,
      // Only send imageData if a new image is uploaded, or if editing and image is present
      imageData:
        form.image !== null && form.image !== ""
          ? form.image
          : editId
          ? undefined
          : "",
      publishedAt: new Date(),
    };

    try {
      let res;
      if (editId) {
        res = await fetch(`http://localhost:5000/api/news/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://localhost:5000/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (res.ok) {
        setSuccess(editId ? "News updated." : "News added.");
        setForm({ title: "", content: "", image: null });
        setEditId(null);
        fetchNews();
      } else {
        const data = await res.json();
        setError(data.message || "Operation failed.");
      }
    } catch {
      setError("Server error.");
    }
  };

  const handleEdit = (news) => {
    setForm({
      title: news.title,
      content: news.content,
      image: news.imageData || null, // Prefill with existing imageData
    });
    setEditId(news._id);
    setSuccess("");
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news item?")) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSuccess("News deleted.");
        fetchNews();
      } else {
        const data = await res.json();
        setError(data.message || "Delete failed.");
      }
    } catch {
      setError("Server error.");
    }
  };

  const handleFixtureInputChange = (e) => {
    const { name, value } = e.target;
    setFixtureForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFixtureFormSubmit = async (e) => {
    e.preventDefault();
    setFixtureError("");
    setFixtureSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/fixtures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fixtureForm,
          date: fixtureForm.date ? new Date(fixtureForm.date) : undefined,
          // status: fixtureForm.status, // Remove status from payload
        }),
      });
      if (res.ok) {
        setFixtureSuccess("Fixture added.");
        setFixtureForm({
          competition: "",
          stage: "",
          homeTeam: "",
          awayTeam: "",
          date: "",
          venue: "",
          // status: "",
        });
        fetchFixtures();
      } else {
        const data = await res.json();
        setFixtureError(data.message || "Failed to add fixture.");
      }
    } catch {
      setFixtureError("Server error.");
    }
  };

  const handleDeleteFixture = async (id) => {
    if (!window.confirm("Delete this fixture?")) return;
    setFixtureError("");
    setFixtureSuccess("");
    try {
      const res = await fetch(`http://localhost:5000/api/fixtures/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFixtureSuccess("Fixture deleted.");
        fetchFixtures();
      } else {
        const data = await res.json();
        setFixtureError(data.message || "Delete failed.");
      }
    } catch {
      setFixtureError("Server error.");
    }
  };

  const handlePlayerInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlayerForm((prev) => ({
          ...prev,
          image: reader.result.split(",")[1], // base64 string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPlayerForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePlayerFormSubmit = async (e) => {
    e.preventDefault();
    setPlayerError("");
    setPlayerSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...playerForm,
          number: playerForm.number ? Number(playerForm.number) : undefined,
        }),
      });
      if (res.ok) {
        setPlayerSuccess("Player added.");
        setPlayerForm({
          number: "",
          name: "",
          position: "",
          image: null,
        });
        fetchPlayers();
      } else {
        const data = await res.json();
        setPlayerError(data.message || "Failed to add player.");
      }
    } catch {
      setPlayerError("Server error.");
    }
  };

  const handleDeletePlayer = async (id) => {
    if (!window.confirm("Delete this player?")) return;
    setPlayerError("");
    setPlayerSuccess("");
    try {
      const res = await fetch(`http://localhost:5000/api/players/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPlayerSuccess("Player deleted.");
        fetchPlayers();
      } else {
        const data = await res.json();
        setPlayerError(data.message || "Delete failed.");
      }
    } catch {
      setPlayerError("Server error.");
    }
  };

  const handleSection = (section) => {
    if (section === "Logout") {
      // Optionally clear auth/session here
      navigate("/");
    } else {
      setActive(section);
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-section">
          <button
            className={
              active === "News" ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => handleSection("News")}
          >
            News
          </button>
          <button
            className={
              active === "Fixtures" ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => handleSection("Fixtures")}
          >
            Fixtures
          </button>
          <button
            className={
              active === "Players" ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => handleSection("Players")}
          >
            Players
          </button>
        </div>
        <div className="sidebar-section logout-section">
          <button
            className="sidebar-link logout-link"
            onClick={() => handleSection("Logout")}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-content">
          {active === "News" && (
            <div>
              <h2>Manage News</h2>
              <form
                onSubmit={handleFormSubmit}
                className="admin-news-form"
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  value={form.content}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                <button type="submit">
                  {editId ? "Update News" : "Add News"}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setForm({ title: "", content: "", image: null });
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
                {error && <div style={{ color: "red" }}>{error}</div>}
                {success && <div style={{ color: "green" }}>{success}</div>}
              </form>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="admin-news-card-list">
                  {newsList.map((news) => (
                    <div
                      key={news._id}
                      className="admin-news-card news-card-type"
                    >
                      {news.imageData && (
                        <img
                          src={`data:image/jpeg;base64,${news.imageData}`}
                          alt={news.title}
                        />
                      )}
                      <h3>{news.title}</h3>
                      <p>{news.content}</p>
                      <div className="admin-news-date">
                        {news.publishedAt
                          ? new Date(news.publishedAt).toLocaleDateString()
                          : ""}
                      </div>
                      <div className="admin-news-actions">
                        <button onClick={() => handleEdit(news)}>Edit</button>
                        <button onClick={() => handleDelete(news._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {active === "Fixtures" && (
            <div>
              <h2>Manage Fixtures</h2>
              <form
                onSubmit={handleFixtureFormSubmit}
                className="admin-news-form"
                style={{ maxWidth: 500 }}
              >
                <input
                  type="text"
                  name="competition"
                  placeholder="Competition"
                  value={fixtureForm.competition}
                  onChange={handleFixtureInputChange}
                  required
                />
                <input
                  type="text"
                  name="stage"
                  placeholder="Stage"
                  value={fixtureForm.stage}
                  onChange={handleFixtureInputChange}
                />
                <input
                  type="text"
                  name="homeTeam"
                  placeholder="Home Team"
                  value={fixtureForm.homeTeam}
                  onChange={handleFixtureInputChange}
                  required
                />
                <input
                  type="text"
                  name="awayTeam"
                  placeholder="Away Team"
                  value={fixtureForm.awayTeam}
                  onChange={handleFixtureInputChange}
                  required
                />
                <input
                  type="datetime-local"
                  name="date"
                  placeholder="Date"
                  value={fixtureForm.date}
                  onChange={handleFixtureInputChange}
                  required
                />
                <input
                  type="text"
                  name="venue"
                  placeholder="Venue"
                  value={fixtureForm.venue}
                  onChange={handleFixtureInputChange}
                />
                {/* Removed status input */}
                <button type="submit">Add Fixture</button>
                {fixtureError && (
                  <div style={{ color: "red" }}>{fixtureError}</div>
                )}
                {fixtureSuccess && (
                  <div style={{ color: "green" }}>{fixtureSuccess}</div>
                )}
              </form>
              {fixtureLoading ? (
                <div>Loading...</div>
              ) : (
                <div className="admin-news-card-list">
                  {fixtures.map((fixture) => (
                    <div
                      key={fixture._id}
                      className="admin-news-card fixture-card-type"
                    >
                      <h3>
                        {fixture.homeTeam} vs {fixture.awayTeam}
                      </h3>
                      <p>
                        <strong>Competition:</strong> {fixture.competition}
                        <br />
                        <strong>Stage:</strong> {fixture.stage}
                        <br />
                        <strong>Date:</strong>{" "}
                        {fixture.date
                          ? new Date(fixture.date).toLocaleString()
                          : ""}
                        <br />
                        <strong>Venue:</strong> {fixture.venue}
                        {/* Removed status display */}
                      </p>
                      <div className="admin-news-actions">
                        <button
                          onClick={() => handleDeleteFixture(fixture._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {active === "Players" && (
            <div>
              <h2>Manage Players</h2>
              <form
                onSubmit={handlePlayerFormSubmit}
                className="admin-news-form"
                style={{ maxWidth: 400 }}
                encType="multipart/form-data"
              >
                <input
                  type="number"
                  name="number"
                  placeholder="Jersey Number"
                  value={playerForm.number}
                  onChange={handlePlayerInputChange}
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Player Name"
                  value={playerForm.name}
                  onChange={handlePlayerInputChange}
                  required
                />
                <select
                  name="position"
                  value={playerForm.position}
                  onChange={handlePlayerInputChange}
                  required
                  style={{ padding: "0.5rem" }}
                >
                  <option value="">Select Position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handlePlayerInputChange}
                  required
                />
                <button type="submit">Add Player</button>
                {playerError && (
                  <div style={{ color: "red" }}>{playerError}</div>
                )}
                {playerSuccess && (
                  <div style={{ color: "green" }}>{playerSuccess}</div>
                )}
              </form>
              {playerLoading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  {["Goalkeeper", "Defender", "Midfielder", "Forward"].map(
                    (pos) => (
                      <div key={pos} className="admin-player-section">
                        <h3 className="admin-player-section-title">{pos}s</h3>
                        <div className="admin-news-card-list">
                          {players.filter((p) => p.position === pos).length ===
                          0 ? (
                            <div className="admin-no-players">
                              No {pos.toLowerCase()}s
                            </div>
                          ) : (
                            players
                              .filter((player) => player.position === pos)
                              .map((player) => (
                                <div
                                  key={player._id}
                                  className="admin-news-card player-card-type"
                                >
                                  {player.image && (
                                    <img
                                      src={`data:image/jpeg;base64,${player.image}`}
                                      alt={player.name}
                                    />
                                  )}
                                  <h3>
                                    #{player.number} {player.name}
                                  </h3>
                                  <p>
                                    <strong>Position:</strong> {player.position}
                                  </p>
                                  <div className="admin-news-actions">
                                    <button
                                      onClick={() =>
                                        handleDeletePlayer(player._id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ))
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Admin;
