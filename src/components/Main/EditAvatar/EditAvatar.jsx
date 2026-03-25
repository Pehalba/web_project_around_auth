import { useRef, useContext, useState } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // para mostrar "Salvando..." no botão

  function handleSubmit(evt) {
    evt.preventDefault();
    const link = inputRef.current.value.trim();
    if (!link) return; // não envia se estiver vazio
    setIsSubmitting(true);
    handleUpdateAvatar({ avatar: link }).finally(() => setIsSubmitting(false));
  }

  return (
    <form
      className="popup__form"
      name="edit-avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          ref={inputRef}
          className="popup__input popup__input_type_url"
          id="avatar-link"
          name="avatar-link"
          placeholder="Avatar link"
          required
          type="url"
        />
        <span className="popup__error" id="avatar-link-error"></span>
      </label>

      <button
        className="button popup__button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
