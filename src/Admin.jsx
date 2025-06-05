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

  // Fetch news when News tab is active
  useEffect(() => {
    if (active === "News") {
      fetchNews();
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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);

    try {
      let res;
      if (editId) {
        res = await fetch(`http://localhost:5000/api/news/${editId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("http://localhost:5000/api/news", {
          method: "POST",
          body: formData,
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
    setForm({ title: news.title, content: news.content, image: null });
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
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="admin-content">
          {active === "News" && (
            <div>
              <h2>Manage News</h2>
              <form
                onSubmit={handleFormSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "2rem",
                  background: "#222b3a",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  maxWidth: 400,
                }}
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                  style={{ padding: "0.5rem" }}
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  value={form.content}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  style={{ padding: "0.5rem" }}
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  style={{ background: "#e20815", color: "#fff" }}
                >
                  {editId ? "Update News" : "Add News"}
                </button>
                {editId && (
                  <button
                    type="button"
                    style={{ background: "#888", color: "#fff" }}
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
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    justifyContent: "center",
                  }}
                >
                  {newsList.map((news) => (
                    <div
                      key={news._id}
                      style={{
                        background: "#222b3a",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        width: 320,
                        padding: 16,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      {news.imageData && (
                        <img
                          src={`data:image/jpeg;base64,${news.imageData}`}
                          alt={news.title}
                          style={{
                            width: "100%",
                            height: 140,
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: 12,
                          }}
                        />
                      )}
                      <h3 style={{ margin: "0 0 8px 0" }}>{news.title}</h3>
                      <p
                        style={{
                          fontSize: "1em",
                          color: "#ccc",
                          margin: "0 0 8px 0",
                          textAlign: "center",
                        }}
                      >
                        {news.content}
                      </p>
                      <div
                        style={{
                          fontSize: "0.9em",
                          color: "#888",
                          marginBottom: 12,
                        }}
                      >
                        {news.publishedAt
                          ? new Date(news.publishedAt).toLocaleDateString()
                          : ""}
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          style={{
                            background: "#e20815",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "0.4rem 1rem",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEdit(news)}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            background: "#444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "0.4rem 1rem",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(news._id)}
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
          {active === "Fixtures" && <p>Manage Fixtures here.</p>}
          {active === "Players" && <p>Manage Players here.</p>}
        </div>
      </main>
    </div>
  );
}

export default Admin;
