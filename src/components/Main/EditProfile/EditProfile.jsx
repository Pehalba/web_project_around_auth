import { useState, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name ?? "");
  const [description, setDescription] = useState(currentUser?.about ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!name.trim() || !description.trim()) return;
    setIsSubmitting(true);
    handleUpdateUser({ name, about: description }).finally(() => setIsSubmitting(false));
  }

  return (
    <form
      className="popup__form"
      name="edit-profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          id="profile-name"
          maxLength="40"
          minLength="2"
          name="name"
          placeholder="Nome"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="profile-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_about"
          id="profile-about"
          maxLength="200"
          minLength="2"
          name="about"
          placeholder="Sobre mim"
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="profile-about-error"></span>
      </label>

      <button className="button popup__button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
