import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import searchIcon from "../assets/search_icon.png";
import profileIcon from "../assets/profile_icon.png";
import cartIcon from "../assets/cart_icon.png";
import logo from "../assets/logo.png";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setShowSearch, getCartCount, token, logout } =
    useContext(ShopContext);

  // Handle navigation and close mobile menu
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  // Handle profile menu items
  const handleProfileAction = (action) => {
    switch (action) {
      case "profile":
        handleNavigation("/profile");
        break;
      case "orders":
        handleNavigation("/orders");
        break;
      case "logout":
        logout(); // Use the logout function from context
        break;
      default:
        break;
    }
  };

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="navbar-container">
      <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
        <img src={logo} alt="FOREVER" className="logo-image" />
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${isMobileMenuOpen ? "mobile-active" : ""}`}>
        <div
          className={`nav-link ${isActive("/") ? "active" : ""}`}
          onClick={() => handleNavigation("/")}
        >
          <p>HOME</p>
          <hr />
        </div>
        <div
          className={`nav-link ${isActive("/collection") ? "active" : ""}`}
          onClick={() => handleNavigation("/collection")}
        >
          <p>COLLECTION</p>
          <hr />
        </div>
        <div
          className={`nav-link ${isActive("/about") ? "active" : ""}`}
          onClick={() => handleNavigation("/about")}
        >
          <p>ABOUT</p>
          <hr />
        </div>
        <div
          className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          onClick={() => handleNavigation("/contact")}
        >
          <p>CONTACT</p>
          <hr />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex">
        <img
          src={searchIcon}
          className="cursor-pointer"
          alt="search"
          onClick={() => setShowSearch(true)}
        />{" "}
        <div className="profile-dropdown">
          <img src={profileIcon} className="profile-icon" alt="profile" />
          <div className="dropdown-menu">
            {token ? (
              <>
                <p
                  className="dropdown-item"
                  onClick={() => handleProfileAction("profile")}
                >
                  My Profile
                </p>
                <p
                  className="dropdown-item"
                  onClick={() => handleProfileAction("orders")}
                >
                  My Orders
                </p>
                <p
                  className="dropdown-item"
                  onClick={() => handleProfileAction("logout")}
                >
                  Logout
                </p>
              </>
            ) : (
              <p
                className="dropdown-item"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </p>
            )}
          </div>
        </div>
        <div className="cart-link" onClick={() => handleNavigation("/cart")}>
          <img src={cartIcon} className="cart-icon" alt="cart" />
          {getCartCount() > 0 && (
            <span className="cart-counter">{getCartCount()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
