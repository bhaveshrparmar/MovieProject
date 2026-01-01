export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          🎬 Movie Project
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link px-3" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                href="/form"
              >
                + Add Movie
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
