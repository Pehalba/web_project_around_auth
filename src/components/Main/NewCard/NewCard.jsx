import { useState } from "react";

export default function NewCard(props) {
  const { onAddPlaceSubmit } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    const name = evt.target["card-name"].value.trim();
    const link = evt.target.link.value.trim();
    if (!name || !link) return;
    setIsSubmitting(true);
    onAddPlaceSubmit({ name, link }).finally(() => {
      setIsSubmitting(false);
      evt.target.reset();
    });
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button className="button popup__button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
