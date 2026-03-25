import { useCallback, useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute/PublicRoute.jsx";
import {
  signin,
  signup,
  getTokenFromResponse,
  getMe,
  setStoredToken,
  clearStoredToken,
  getStoredToken,
} from "../utils/auth.js";

// Parte do app só para quem já está logado (perfil, cartões, footer)
function AuthorizedApp() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  // E-mail no cabeçalho — atualizo quando o perfil carrega ou muda
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  function handleLogout() {
    clearStoredToken();
    navigate("/signin", { replace: true });
  }

  // Carrega dados do usuário: primeiro valida token (getMe), depois perfil na Around API
  useEffect(() => {
    getMe()
      .then((authUser) =>
        api.getUserInfo().then(
          (profile) => ({
            ...profile,
            email: authUser.email,
            _id: profile?._id ?? authUser._id,
          }),
          () => ({
            email: authUser.email,
            _id: authUser._id,
          }),
        ),
      )
      .then((user) => {
        setCurrentUser(user);
        setEmail(user?.email ?? "");
      })
      .catch((err) => {
        console.log("Erro ao carregar dados do usuário:", err);
        clearStoredToken();
        navigate("/signin", { replace: true });
      });
  }, [navigate]);

  // Lista de cartões (só precisa rodar uma vez ao entrar na página)
  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log("Erro ao carregar cards:", err);
      });
  }, []);

  function handleCardLike(card) {
    const userLiked = card.likes?.some(
      (like) => (like._id || like) === currentUser?._id,
    );
    const isLiked = card.isLiked ?? userLiked ?? false;
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    return api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleUpdateUser(data) {
    return api
      .updateProfile(data)
      .then((newData) => {
        setCurrentUser((prev) => {
          const next = { ...prev, ...newData };
          if (next.email) {
            setEmail(next.email);
          }
          return next;
        });
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar(data) {
    return api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser((prev) => {
          const next = { ...prev, ...newData };
          if (next.email) {
            setEmail(next.email);
          }
          return next;
        });
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header
          userEmail={email || currentUser?.email}
          onLogout={handleLogout}
        />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

// Rotas e lógica de login/cadastro (a chamada  API fica aqui, não dentro de Login/Register)
export default function App() {
  const navigate = useNavigate();
  const token = getStoredToken();

  const handleSignIn = useCallback(
    async ({ email, password }) => {
      const data = await signin({ email, password });
      const jwt = getTokenFromResponse(data);
      if (!jwt) {
        throw new Error("Resposta inválida: token não encontrado.");
      }
      setStoredToken(jwt);
      navigate("/", { replace: true });
    },
    [navigate],
  );

  const handleSignUp = useCallback(async ({ email, password }) => {
    await signup({ email, password });
  }, []);

  // * = qualquer URL desconhecida, manda para / ou /signin
  return (
    <Routes>
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <Login onLogin={handleSignIn} />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Register onRegister={handleSignUp} />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AuthorizedApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/signin"} replace />}
      />
    </Routes>
  );
}
