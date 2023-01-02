import {
  useToast,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Status } from "../../../api/constants";
import InputField from "../../../components/InputField";
import { updateTask } from "../api/task";
import { taskSchema } from "../constants";
import { useNavigate } from "react-router-dom";

function UpdateButton(props: any) {
  const { description, title, _id } = props;

  const navigate = useNavigate();
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskInfo, setTaskInfo] = useState<any | null>(null);

  const initialTaskValues = {
    title: title as string,
    description: description as string,
  };

  const onSubmit = (values: any) => {
    console.log(values);
    setTaskInfo({ ...values });
    setIsDisabled(true);
    showLoadingToast();
  };

  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    resetForm,
  } = useFormik({
    validationSchema: taskSchema,
    onSubmit: onSubmit,
    initialValues: initialTaskValues,
    enableReinitialize: true,
  });

  const showLoadingToast = () => {
    toast({
      status: "loading",
      description: "Updating",
      duration: null,
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

  const showSuccessToast = () => {
    toast({
      status: "success",
      description: "Updated",
      duration: 2000,
      position: "top",
    });
  };

  useEffect(() => {
    if (!taskInfo) return;
    updateTaskService(taskInfo);
  }, [taskInfo]);

  const updateTaskService = async (taskInfo: any) => {
    const result = await updateTask(_id, taskInfo);

    setTaskInfo(null);
    setIsDisabled(false);
    toast.closeAll();

    if (result.statusCode === 403) {
      showErrorToast("token is expired , plz log in again");
      localStorage.removeItem("token");
      navigate("/", {
        replace: true,
      });
      return;
    }

    if (result.status === Status.ERROR) {
      showErrorToast(result.error!!);
      return;
    }

    showSuccessToast();
    resetForm();
    onClose();

    console.log(props);

    let { handleDeleteTask, handleUpdateTask, ...otherProps } = props;

    handleUpdateTask({ ...otherProps, ...taskInfo });
  };

  const handleOnClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <Button
        _hover={{
          backgroundColor: "blue.500",
        }}
        bgColor="blue.400"
        onClick={onOpen}
      >
        Update
      </Button>
      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Title"
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                error={errors.title}
                touched={touched.title}
              />
              <InputField
                label="Description"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                touched={touched.description}
                error={errors.description}
              />

              <Flex justifyContent="center">
                <Button
                  mt="20px"
                  variant="solid"
                  backgroundColor="blackAlpha.200"
                  type="submit"
                  isDisabled={isDisabled}
                >
                  submit
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateButton;
