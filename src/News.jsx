import NewsCard from './NewsCard';
import psgWinImg from './assets/cup.jpg';
import dembeleHatTrickImg from './assets/dembele.avif';
import newSign from './assets/new_sign.jfif'

function News() {
    return (
        <div className="News">
            <h1>News</h1>
            <div className="news-cards-container">
                <NewsCard
                    title="PSG Wins Ligue 1"
                    image={psgWinImg}
                    description="Paris Saint-Germain clinched the Ligue 1 title after a thrilling season."
                />
                <NewsCard
                    title="Ousmane Dembele Scores Hat-trick"
                    image={dembeleHatTrickImg}
                    description="Ousmane Dembele dazzled fans with a stunning hat-trick performance."
                />
                <NewsCard
                    title="New Signing Announced"
                    image={newSign}
                    description="PSG announces the signing of a new star player for the upcoming season."
                />
            </div>
        </div>
    );
}

export default News;