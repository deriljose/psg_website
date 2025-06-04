import "./admin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Admin() {
    const [active, setActive] = useState("News");
    const navigate = useNavigate();

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
                        className={active === "News" ? "sidebar-link active" : "sidebar-link"}
                        onClick={() => handleSection("News")}
                    >
                        News
                    </button>
                    <button
                        className={active === "Fixtures" ? "sidebar-link active" : "sidebar-link"}
                        onClick={() => handleSection("Fixtures")}
                    >
                        Fixtures
                    </button>
                    <button
                        className={active === "Players" ? "sidebar-link active" : "sidebar-link"}
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
                    {active === "News" && <p>Manage News here.</p>}
                    {active === "Fixtures" && <p>Manage Fixtures here.</p>}
                    {active === "Players" && <p>Manage Players here.</p>}
                </div>
            </main>
        </div>
    );
}

export default Admin;
