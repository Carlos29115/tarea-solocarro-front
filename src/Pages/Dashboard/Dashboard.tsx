import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "../../components/Card/Card";
import SimpleModal from "../../components/Modal/SimpleModal/SimpleModal";
import Table from "../../components/Table/Table";
import TextField from "../../components/TextField/TextField";
import "./dashboard.css";
import toast from "react-hot-toast";
import { ModalAction } from "../../components/Modal/SimpleModal/simpleMotalTypes";

export interface ModalHandlerProps {
  handleModal: (action: ModalAction, post?: FormData) => void;
}

interface FormData {
  id?: number;
  title: string;
  body: string;
}

const Dashboard = () => {
  const [modal, setModal] = useState<ModalAction>(ModalAction.NONE);
  const [httpMethod, setHttpMethod] = useState<"POST" | "PUT" | "DELETE">(
    "POST"
  );
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const url = "https://jsonplaceholder.typicode.com/posts";
      const endpoint = `${url}/${data.id}`;

      const response = await fetch(httpMethod === "POST" ? url : endpoint, {
        method: httpMethod,
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      return response.json();
    },

    onSuccess: () => {
      setModal(ModalAction.NONE);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      const messages = {
        POST: "guardaron",
        PUT: "editaron",
        DELETE: "eliminaron",
      };
      toast.success(`Los datos se ${messages[httpMethod]} perfectamente!`);
      setHttpMethod("POST");
    },
    onError: (error) => {
      toast.error(
        `Error: ${
          error.message === "Failed to fetch"
            ? "Error de conexion"
            : "Ha ocurrido un error"
        }`
      );
      console.log(error.message);
    },
  });

  const handleModal = (action: ModalAction, post?: FormData) => {
    if (action === ModalAction.EDIT && post) {
      setHttpMethod("PUT");
      reset({
        id: post.id,
        title: post.title,
        body: post.body,
      });
    } else if (action === ModalAction.DELETE && post) {
      setHttpMethod("DELETE");
      reset({
        id: post.id,
        title: post.title,
        body: post.body,
      });
    } else if (action === ModalAction.ADD) {
      setHttpMethod("POST");
      reset({
        title: "",
        body: "",
      });
    }
    setModal(action);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Card>
        <div className="header-container">
          <h3>Posts</h3>
          <button
            className="primary"
            onClick={() => handleModal(ModalAction.ADD)}
          >
            <span className="primary-button-text">Añadir post</span>
          </button>
        </div>
        <Table handleModal={handleModal} />
      </Card>

      {modal !== ModalAction.NONE && (
        <SimpleModal
          title={
            modal === ModalAction.ADD
              ? "Nuevo post"
              : modal === ModalAction.EDIT
              ? "Editar post"
              : "Eliminar post"
          }
          handleModal={handleModal}
          formId={`${modal}Form`}
        >
          {modal === ModalAction.DELETE ? (
            <span>¿Estás seguro de querer eliminar este post?</span>
          ) : (
            <form
              id={`${modal}Form`}
              className="form-container"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField control={control} label="Título" name="title" />
              <TextField control={control} label="Contenido" name="body" />
            </form>
          )}
        </SimpleModal>
      )}
    </>
  );
};

export default Dashboard;
