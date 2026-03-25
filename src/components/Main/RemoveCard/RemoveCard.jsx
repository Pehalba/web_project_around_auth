// Popup de confirmar exclusão
export default function RemoveCard(props) {
  const { onConfirm, onCancel } = props;
  return (
    <div className="popup__confirm">
      <div className="popup__confirm-buttons">
        <button type="button" className="popup__button" onClick={onConfirm}>
          Sim
        </button>
        <button
          type="button"
          className="popup__button popup__button_type_cancel"
          onClick={onCancel}
        >
          Não
        </button>
      </div>
    </div>
  );
}
