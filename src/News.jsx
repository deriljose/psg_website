import NewsCard from './NewsCard';

function News() {
    return (
        <div>
            <NewsCard
                title="PSG Wins Ligue 1"
                image="https://example.com/psg1.jpg"
                description="Paris Saint-Germain clinched the Ligue 1 title after a thrilling season."
            />
            <NewsCard
                title="Ousmane Dembele Scores Hat-trick"
                image="https://example.com/mbappe.jpg"
                description="Ousmane Dembele dazzled fans with a stunning hat-trick performance."
            />
            <NewsCard
                title="New Signing Announced"
                image="https://example.com/signing.jpg"
                description="PSG announces the signing of a new star player for the upcoming season."
            />
        </div>
    );
}

export default News;