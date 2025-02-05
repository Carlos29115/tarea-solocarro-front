import "./simpleModal.css";

interface SimpleModalProps {
  title: string;
  children: React.ReactNode;
}

const SimpleModal = ({ title, children }: SimpleModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-container--header">
          <h3>{title}</h3>
        </div>
        <div className="modal-container--body">{children}</div>
        <div className="modal-container--footer">
          <button className="secondary">Cancelar</button>
          <button className="primary">Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default SimpleModal;
