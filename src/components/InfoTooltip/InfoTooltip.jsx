//  mensagem  cadastro ou erro
export default function InfoTooltip(props) {
  const { isOpen, onClose, message, type = "success" } = props;

  if (!isOpen) {
    return null;
  }

  const isError = type === "error";

  return (
    <div
      className="info-tooltip-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-tooltip-message"
      onClick={onClose}
    >
      <div
        className={
          isError ? "info-tooltip info-tooltip_type_error" : "info-tooltip"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="info-tooltip__close"
          aria-label="Fechar"
          onClick={onClose}
        />
        <div className="info-tooltip__icon-wrap" aria-hidden="true">
          {isError ? (
            <svg
              className="info-tooltip__error-icon"
              viewBox="0 0 120 120"
              width="120"
              height="120"
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#FD0707"
                strokeWidth="3"
              />
              <path
                fill="none"
                stroke="#FD0707"
                strokeWidth="8"
                strokeLinecap="round"
                d="M 40 40 L 80 80"
              />
              <path
                fill="none"
                stroke="#FD0707"
                strokeWidth="8"
                strokeLinecap="round"
                d="M 80 40 L 40 80"
              />
            </svg>
          ) : (
            <span className="info-tooltip__check">✓</span>
          )}
        </div>
        <p
          className={
            isError
              ? "info-tooltip__message info-tooltip__message_type_error"
              : "info-tooltip__message"
          }
          id="info-tooltip-message"
        >
          {message}
        </p>
      </div>
    </div>
  );
}
