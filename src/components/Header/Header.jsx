import { useState } from "react";

// Cabeçalho logado
export default function Header(props) {
  const { userEmail, onLogout } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}images/Vector.png`;

  function handleToggleMenu() {
    setIsMenuOpen((open) => !open);
  }

  function handleLogoutClick() {
    setIsMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  }

  const emailText = userEmail || "email@mail.com";

  return (
    <header className="header header_type_logged">
      <nav className="header__nav header__nav_logged">
        {isMenuOpen && (
          <div className="header__menu-panel header__menu-panel_mobile">
            <p className="header__menu-email">{emailText}</p>
            <button
              type="button"
              className="header__menu-logout"
              onClick={handleLogoutClick}
            >
              Sair
            </button>
          </div>
        )}
        <div className="header__row">
          <img
            className="header__nav-image"
            src={logoSrc}
            alt="Around The U.S."
          />
          <div className="header__user header__user_desktop">
            <span className="header__user-email">{emailText}</span>
            <button
              type="button"
              className="header__user-logout"
              onClick={handleLogoutClick}
            >
              Sair
            </button>
          </div>
          <button
            type="button"
            className="header__menu-btn header__menu-btn_mobile"
            onClick={handleToggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? (
              <span className="header__icon-close" aria-hidden="true">
                ×
              </span>
            ) : (
              <span className="header__burger" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
