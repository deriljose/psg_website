import PSGLogo from "./assets/PSG_logo.webp";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 10 || window.scrollY < lastScrollY) {
        setShow(true);
      } else {
        setShow(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`nav-bar${show ? " nav-bar-visible" : " nav-bar-hidden"}`}
    >
      <nav>
        <div className="nav-content">
          <ul className="nav-links nav-links-left">
            <li>
              <ScrollLink
                to="news-section"
                smooth={true}
                duration={500}
                offset={-200}
                className="nav-btn-link"
              >
                News
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="fixtures-section"
                smooth={true}
                duration={500}
                offset={-80}
                className="nav-btn-link"
              >
                Fixtures
              </ScrollLink>
            </li>
          </ul>
          <img className="logo" src={PSGLogo} alt="PSG Logo" />
          <ul className="nav-links nav-links-right">
            <li>
              <ScrollLink
                to="players-section"
                smooth={true}
                duration={500}
                offset={-80}
                className="nav-btn-link"
              >
                Players
              </ScrollLink>
            </li>
            <li className="login-link">
              <RouterLink to="/login">Login</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
