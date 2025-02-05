import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "../../components/Card/Card";
import SimpleModal from "../../components/Modal/SimpleModal/SimpleModal";
import Table from "../../components/Table/Table";
import TextField from "../../components/TextField/TextField";
import "./dashboard.css";

type ModalAction = "" | "add" | "edit" | "delete";

export interface ModalHandlerProps {
  handleModal: (action: ModalAction, post?: FormData) => void;
}

interface FormData {
  id?: number;
  title: string;
  body: string;
}

const Dashboard = () => {
  const [modal, setModal] = useState("");
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

      if (!response.ok) {
        throw new Error(
          httpMethod === "PUT"
            ? "Error al editar el post"
            : "Error al agregar el post"
        );
      }
      return response.json();
    },
    onSuccess: () => {
      setModal("");
      setHttpMethod("POST");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleModal = (action: ModalAction, post?: FormData) => {
    if (action === "edit" && post) {
      setHttpMethod("PUT");
      reset({
        id: post.id,

        title: post.title,
        body: post.body,
      });
    } else if (action === "delete" && post) {
      setHttpMethod("DELETE");
      reset({
        id: post.id,
        title: post.title,
        body: post.body,
      });
    } else if (action === "add") {
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
          <button className="primary" onClick={() => handleModal("add")}>
            <span className="primary-button-text">Añadir post</span>
          </button>
        </div>
        <Table handleModal={handleModal} />
      </Card>

      {modal === "add" && (
        <SimpleModal
          title="Nuevo post"
          handleModal={handleModal}
          formId="postForm"
        >
          <form
            id="postForm"
            className="form-container"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField control={control} label="Titulo" name="title" />
            <TextField control={control} label="Cuerpo" name="body" />
          </form>
        </SimpleModal>
      )}
      {modal === "edit" && (
        <SimpleModal
          title="Edit post"
          handleModal={handleModal}
          formId="editForm"
        >
          <form
            id="editForm"
            className="form-container"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField control={control} label="Title" name="title" />
            <TextField control={control} label="Body" name="body" />
          </form>
        </SimpleModal>
      )}
      {modal === "delete" && (
        <SimpleModal
          title="Eliminar post"
          handleModal={handleModal}
          formId="deleteForm"
        >
          <span>¿Estás seguro de querer eliminar este post?</span>
        </SimpleModal>
      )}
    </>
  );
};

export default Dashboard;
