import PSGLogo from './assets/PSG_logo.webp';

function Header(){
    return(
        <header className="nav-bar">
            <nav>
                <div className="nav-content">
                    <img className="logo" src={PSGLogo} alt="PSG Logo" />
                    <ul className="nav-links">
                        <li><a href="/news">News</a></li>
                        <li><a href="/fixtures">Fixtures</a></li>
                        <li><a href="/players">Players</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Signup</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header