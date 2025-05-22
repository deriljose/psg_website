function NewsCard({ title, image, description }) {
    return (
        <div className="news-card">
            {image && <img src={image} alt={title} className="news-card-image" />}
            <h3 className="news-card-title">{title}</h3>
            <p className="news-card-description">{description}</p>
        </div>
    );
}

export default NewsCard;