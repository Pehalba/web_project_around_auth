export default function Popup(props) {
  const { onClose, title, children } = props;

  let popupClass = "popup__content";
  if (!title) {
    popupClass = "popup__content popup__content_content_image";
  }

  return (
    <div className="popup">
      <div className={popupClass}>
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        
        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}
