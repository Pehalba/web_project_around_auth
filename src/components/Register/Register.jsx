import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";

// Cadastro: se sair, vai para a tela de login
export default function Register(props) {
  const { onRegister } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}images/Vector.png`;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await onRegister({ email, password });
      setIsSuccessOpen(true);
    } catch (err) {
      console.error(err);
      setIsErrorOpen(true);
    }
  }

  function handleSuccessClose() {
    setIsSuccessOpen(false);
    // não deixa voltar
    navigate("/signin", { replace: true });
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
          Faça o login
        </Link>
      </header>

      <main className="auth-page__main">
        <h1 className="auth-page__title">Inscrever-se</h1>
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <div className="auth-page__field">
            <input
              id="register-email"
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
              id="register-password"
              className="auth-page__field-input"
              type="password"
              name="password"
              placeholder="Senha"
              aria-label="Senha"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="auth-page__submit" type="submit">
            Inscrever-se
          </button>
        </form>
        <p className="auth-page__footer-text">
          <Link className="auth-page__footer-link" to="/signin">
            Já é um membro? Faça o login aqui!
          </Link>
        </p>
      </main>

      <InfoTooltip
        isOpen={isSuccessOpen}
        onClose={handleSuccessClose}
        message="Vitória! Você precisa se registrar."
      />
      <InfoTooltip
        type="error"
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        message={"Ops, algo saiu deu errado!\nPor favor, tente novamente."}
      />
    </div>
  );
}
