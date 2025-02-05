import { ModalHandlerProps } from "../../../Pages/Dashboard/Dashboard";
import "./simpleModal.css";

interface SimpleModalProps {
  title: string;
  children: React.ReactNode;
  handleModal: ModalHandlerProps["handleModal"];
  formId: string;
}

const SimpleModal = ({
  title,
  children,
  handleModal,
  formId,
}: SimpleModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-container--header">
          <h3>{title}</h3>
        </div>
        <div className="modal-container--body">{children}</div>
        <div className="modal-container--footer">
          <button className="secondary" onClick={() => handleModal("")}>
            Cancelar
          </button>
          <button className="primary" type="submit" form={formId}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleModal;
