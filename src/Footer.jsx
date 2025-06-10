import React from "react";
import "./footer.css";

function Footer() {
  const sponsors = [
    {
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
      url: "https://www.nike.com/",
    },
    {
      name: "Qatar Airways",
      logo: "https://cdn.brandfetch.io/idZKewuK9S/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      url: "https://www.qatarairways.com/",
    },
  ];

  return (
    <footer className="psg-footer">
      <div className="psg-footer-logos">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="psg-footer-logo-link"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="psg-footer-logo"
            />
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
