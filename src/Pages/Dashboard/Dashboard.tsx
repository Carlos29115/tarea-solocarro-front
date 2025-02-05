import { useState } from "react";
import Card from "../../components/Card/Card";
import SimpleModal from "../../components/Modal/SimpleModal/SimpleModal";
import Table from "../../components/Table/Table";

type ModalAction = "" | "cancel" | "edit" | "delete";

export interface ModalHandlerProps {
  handleModal: (action: ModalAction) => void;
}

const Dashboard = () => {
  const [modal, setModal] = useState("");
  const handleModal = (action: ModalAction) => {
    setModal(action);
  };

  return (
    <>
      <Card>
        <div className="flex-center">
          <h3>Posts</h3>
        </div>
        <Table handleModal={handleModal} />
      </Card>
      {modal === "add" && (
        <SimpleModal title="New post" handleModal={handleModal}>
          create
        </SimpleModal>
      )}
      {modal === "edit" && (
        <SimpleModal title="New post" handleModal={handleModal}>
          edit
        </SimpleModal>
      )}
      {modal === "delete" && (
        <SimpleModal title="New post" handleModal={handleModal}>
          delete
        </SimpleModal>
      )}
    </>
  );
};

export default Dashboard;
