import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearStoredToken, getMe, getStoredToken } from "../../utils/auth.js";

// se já houver token válido, manda direto para a página principal.
// Se o token for inválido, apaga e deixa ver o formulário de login.
export default function PublicRoute({ children }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(() => !getStoredToken());

  useEffect(() => {
    if (!getStoredToken()) {
      return;
    }
    getMe()
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch(() => {
        clearStoredToken();
        setReady(true);
      });
  }, [navigate]);

  if (!ready) {
    return null;
  }

  return children;
}
