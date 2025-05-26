import PSGLogo from "./assets/PSG_logo.webp";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";

function Header() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 10) {
                setShow(true);
            } else if (window.scrollY < lastScrollY) {
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
            className={`nav-bar${
                show ? " nav-bar-visible" : " nav-bar-hidden"
            }`}
        >
            <nav>
                <div className="nav-content">
                    <ul className="nav-links nav-links-left">
                        <li>
                            <Link
                                to="news-section"
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className="nav-btn-link"
                            >
                                News
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="fixtures-section"
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className="nav-btn-link"
                            >
                                Fixtures
                            </Link>
                        </li>
                    </ul>
                    <img className="logo" src={PSGLogo} alt="PSG Logo" />
                    <ul className="nav-links nav-links-right">
                        <li>
                            <a href="/players">Players</a>
                        </li>
                        <li className="login-link">
                            <a href="/signup">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
