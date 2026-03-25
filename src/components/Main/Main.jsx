import { useContext } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./NewCard/NewCard.jsx";
import EditProfile from "./EditProfile/EditProfile.jsx";
import EditAvatar from "./EditAvatar/EditAvatar.jsx";
import Card from "./Card/Card.jsx";
import RemoveCard from "./RemoveCard/RemoveCard.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main(props) {
  const {
    popup,
    onOpenPopup,
    onClosePopup,
    cards,
    onCardLike,
    onCardDelete,
    onAddPlaceSubmit,
  } = props;
  const { currentUser } = useContext(CurrentUserContext);

  // Abre popup de confirmação antes de excluir o card
  function openDeleteConfirm(card) {
    onOpenPopup({
      title: "Tem certeza?",
      children: (
        <RemoveCard
          onConfirm={() => {
            onCardDelete(card);
            onClosePopup();
          }}
          onCancel={onClosePopup}
        />
      ),
    });
  }

  const newCardPopup = {
    title: "New card",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const editProfilePopup = { title: "Edit profile", children: <EditProfile /> };
  const editAvatarPopup = {
    title: "Change profile picture",
    children: <EditAvatar />,
  };

  return (
    <main>
      <section className="profile">
        <img
          src={currentUser?.avatar || "/images/image__profile.png"}
          alt="imagem de perfil senhor"
          className="profile__image"
          onClick={() => onOpenPopup(editAvatarPopup)}
          style={{ cursor: "pointer" }}
        />
        <div className="profile__info">
          <h1 className="profile__info-name">
            {currentUser?.name || "Cousteau"}
          </h1>
          <p className="profile__info-profession">
            {currentUser?.about || "Explorar"}
          </p>
          <button
            aria-label="Edit profile"
            className="profile__info-button-edit"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />
        </div>
        <button
          aria-label="Add card"
          className="profile__button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>
      <section className="elements">
        {cards.map((card) => {
          const userLiked = card.likes?.some(
            (like) => (like._id || like) === currentUser?._id,
          );
          const isLiked = card.isLiked ?? userLiked ?? false;
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={openDeleteConfirm}
              isLiked={isLiked}
            />
          );
        })}
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
