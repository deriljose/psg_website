import { useEffect, useState } from "react";
import "./News.css";

function News() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => setNewsList(Array.isArray(data) ? data : []))
      .catch(() => setNewsList([]));
  }, []);

  return (
    <div>
      <h1 className="news-heading">News</h1>
      {(Array.isArray(newsList) ? newsList : []).map((news) => (
        <div className="news-container" key={news._id}>
          <div className="news-img-wrapper">
            <img
              className="news-img"
              src={`data:image/jpeg;base64,${news.imageData}`}
              alt={news.title}
            />
          </div>
          <div className="news-content">
            <h2 className="news-content-heading">{news.title}</h2>
            <p>{news.content}</p>
            <p style={{ fontSize: "0.9em", color: "#888" }}>
              {news.publishedAt
                ? new Date(news.publishedAt).toLocaleDateString()
                : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
