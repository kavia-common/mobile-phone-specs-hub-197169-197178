import React from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Header
 * Sticky app header with brand and primary navigation.
 */
export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="headerInner">
          <Link to="/" className="brand" aria-label="Mobile Phone Specs Hub Home">
            <div className="brandMark" aria-hidden="true">
              M
            </div>
            <div className="brandText">
              <div className="brandTitle">Mobile Phone Specs Hub</div>
              <div className="brandSubtitle">Browse & compare recent phones</div>
            </div>
          </Link>

          <nav className="nav" aria-label="Primary">
            <NavLink to="/" className="navLink">
              Home
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
