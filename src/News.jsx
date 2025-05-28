import psgWinImg from "./assets/cup.jpg";
import dembeleHatTrickImg from "./assets/dembele.avif";
import warmUp from "./assets/news-3.jpeg";
import "./News.css";

function News() {
  return (
    <div>
      <h1 className="news-heading">News</h1>
      <div className="news-container">
        <div className="news-img-wrapper">
          <img className="news-img" src={psgWinImg} alt="PSG Win" />
        </div>
        <div className="news-content">
          <h2>PSG Win The League</h2>
          <p>
            Psg defeat Juventus in a 4-0 win at the Europa League. The players
            lifted the trophy
          </p>
        </div>
      </div>
      <div className="news-container">
        <div className="news-content">
          <h2>Dembele Scores a Hat Trick</h2>
          <p>
            Psg defeat Juventus in a 4-0 win at the Europa League. The players
            lifted the trophy
          </p>
        </div>
        <div className="news-img-wrapper">
          <img className="news-img" src={dembeleHatTrickImg} alt="Dembele" />
        </div>
      </div>
      <div className="news-container">
        <div className="news-img-wrapper">
          <img className="news-img" src={warmUp} alt="Playing" />
        </div>
        <div className="news-content">
          <h2>
            PSG beat Reims to win French Cup in perfect Champions League warm-up
          </h2>
          <p>
            Psg defeat Juventus in a 4-0 win at the Europa League. The players
            lifted the trophy
          </p>
        </div>
      </div>
    </div>
  );
}

export default News;
