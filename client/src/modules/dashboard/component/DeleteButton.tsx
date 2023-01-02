import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Status } from "../../../api/constants";
import { deleteTask } from "../api/task";

function DeleteButton(props: any) {
  const { _id, handleDeleteTask } = props;
  const toast = useToast();
  const navigate = useNavigate();

  const showSuccessToast = () => {
    toast({
      status: "success",
      description: "Deleted",
      duration: 2000,
      position: "top",
    });
  };

  const showErrorToast = (message: string) => {
    toast({
      status: "error",
      description: message,
      duration: 1000,
      position: "top",
    });
  };

  const deleteTaskService = async () => {
    const result = await deleteTask(_id);

    if (result.statusCode === 403) {
      showErrorToast("token is expired , plz log in again");
      localStorage.removeItem("token");
      navigate("/", {
        replace: true,
      });
      return;
    }

    if (result.status === Status.ERROR) {
      return;
    }
    showSuccessToast();
    handleDeleteTask(_id);
  };

  const handleOnDelete = () => {
    deleteTaskService();
  };

  return (
    <Button mr="5" onClick={handleOnDelete}>
      Delete
    </Button>
  );
}
export default DeleteButton;
