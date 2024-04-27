import React from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";

const Header = ({ onOpenAuth }) => {
  const snap = useSnapshot(state);
  return (
    <header className="header" data-header>
      <div className="container">
        <Link to="#" className="logo">
          <ion-icon name="barbell-sharp" aria-hidden="true"></ion-icon>

          <span className="span">Fitlife</span>
        </Link>

        <nav className="navbar" data-navbar>
          <button
            className="nav-close-btn"
            aria-label="close menu"
            data-nav-toggler
          >
            <ion-icon name="close-sharp" aria-hidden="true"></ion-icon>
          </button>

          <ul className="navbar-list">
            <li>
              <Link to="#home" className="navbar-link active" data-nav-link>
                Home
              </Link>
            </li>

            <li>
              {localStorage.getItem("userId") && (
                <Link
                  to={"/community"}
                  style={{ cursor: "pointer" }}
                  className="navbar-link"
                  data-nav-link
                >
                  Community
                </Link>
              )}
            </li>
          </ul>
        </nav>

        {!localStorage.getItem("userId") && (
          <div
            onClick={() => {
              onOpenAuth();
            }}
            className="btn btn-secondary"
          >
            Join Now
          </div>
        )}
        <button
          className="nav-open-btn"
          aria-label="open menu"
          data-nav-toggler
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
