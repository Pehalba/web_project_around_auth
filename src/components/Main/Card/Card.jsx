import { useContext } from "react";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../../../contexts/CurrentUserContext.js";

export default function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete, isLiked } = props;
  const { name, link } = card;
  const { currentUser } = useContext(CurrentUserContext);
  const ownerId = card.owner?._id ?? card.owner;
  const isOwner = currentUser && ownerId === currentUser._id;

  const cardLikeButtonClassName = `elements__element-button-heart ${
    isLiked ? "elements__element-button-heart_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const imageComponent = { children: <ImagePopup card={card} /> };

  return (
    <div className="elements__element">
      <img
        className="elements__element-image elements__element-image-fix"
        src={link}
        alt={name}
        onClick={() => onCardClick(imageComponent)}
        style={{ objectFit: "cover" }}
      />
      {isOwner && (
        <button
          aria-label="Delete card"
          className="elements-element-button-trash"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="elements__element-container-card">
        <h2 className="elements__element-title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </div>
  );
}
