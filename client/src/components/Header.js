import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/Header.scss";
import { useTheme } from "../contexts/ThemeContext";
import AlertModal from "../components/AlertModal";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const { theme, toggleTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, handleLogout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <Navbar
          expand="lg"
          className={`bg-body-tertiary ${theme}`}
          Navbar
          style={{ justifyContent: "flex" }}
        >
          <Link to="/" className="logo">
            Konnect
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <nav className="main-nav">
            <Navbar.Collapse
              id="basic-navbar-nav"
              className={`basic-navbar-nav ${theme}`}
            >
              <Nav className="me-auto">
                <Nav.Link href="/" className={isActive("/") ? "active" : ""}>
                  {t("nav.home")}
                </Nav.Link>
                <Nav.Link
                  href="/curation"
                  className={isActive("/curation") ? "active" : ""}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      setShowModal(true);
                    }
                  }}
                >
                  {t("nav.curation")}
                </Nav.Link>
                <Nav.Link
                  href="/chat"
                  className={isActive("/chat") ? "active" : ""}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      setShowModal(true);
                    }
                  }}
                >
                  {t("nav.chat")}
                </Nav.Link>
                <Nav.Link
                  href="/history"
                  className={isActive("/history") ? "active" : ""}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      setShowModal(true);
                    }
                  }}
                >
                  {t("nav.history")}
                </Nav.Link>
                <Nav.Link
                  href="/faq"
                  className={isActive("/faq") ? "active" : ""}
                >
                  {t("nav.faq")}
                </Nav.Link>
                {/* <Nav.Link href="/settings">{t("nav.settings")}</Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </nav>

          <div className="header-right">
            {isLoggedIn ? (
              <button className="header-login-btn" onClick={handleLogout}>
                {t("nav.logout")}
              </button>
            ) : (
              <button
                className="header-login-btn"
                onClick={() => navigate("/login")}
              >
                {t("nav.login")}
              </button>
            )}
            <button onClick={toggleTheme} className="theme-toggle-button">
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </Navbar>
        <AlertModal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={t("alertModal.login")}
          body={t("alertModal.pleaseLogin")}
        />
      </div>
    </header>
  );
};

export default Header;
