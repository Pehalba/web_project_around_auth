import { useState } from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";

// Tela de login
export default function Login(props) {
  const { onLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}images/Vector.png`;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // onLogin vem do App.jsx — lá é que roda signin + navigate
      await onLogin({ email, password });
    } catch (err) {
      console.error(err);
      setIsErrorOpen(true);
    }
  }

  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <div className="auth-page__logo-row">
          <img
            className="auth-page__logo-img"
            src={logoSrc}
            alt="Around The U.S."
          />
        </div>
        <Link className="auth-page__header-link" to="/signin">
          Entrar
        </Link>
      </header>

      <main className="auth-page__main">
        <h1 className="auth-page__title">Entrar</h1>
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <div className="auth-page__field">
            <input
              id="login-email"
              className="auth-page__field-input"
              type="email"
              name="email"
              placeholder="E-mail"
              aria-label="E-mail"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-page__field">
            <input
              id="login-password"
              className="auth-page__field-input"
              type="password"
              name="password"
              placeholder="Senha"
              aria-label="Senha"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="auth-page__submit" type="submit">
            Entrar
          </button>
        </form>
        <p className="auth-page__footer-text">
          <Link className="auth-page__footer-link" to="/signup">
            Ainda não é membro? Inscreva-se aqui!
          </Link>
        </p>
      </main>

      <InfoTooltip
        type="error"
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        message={"Ops, algo saiu deu errado!\nPor favor, tente novamente."}
      />
    </div>
  );
}
