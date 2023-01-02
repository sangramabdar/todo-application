import {
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
import React, { useState, useEffect } from "react";
import { Status } from "../../../api/constants";
import InputField from "../../../components/InputField";
import { saveTask } from "../api/task";
import { useToast, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { taskSchema, initialTaskValues } from "../constants";

function AddButton({ handleAddTask }: any) {
  const navigate = useNavigate();
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = (values: any) => {
    setTaskInfo({ ...values });
    setIsDisabled(true);
    showLoadingToast();
  };

  const showLoadingToast = () => {
    toast({
      status: "loading",
      description: "Processing",
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
      description: "Added",
      duration: 2000,
      position: "top",
    });
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
    initialValues: initialTaskValues,
    onSubmit: onSubmit,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [taskInfo, setTaskInfo] = useState<any | null>(null);

  useEffect(() => {
    if (!taskInfo) return;
    saveTaskService(taskInfo);
  }, [taskInfo]);

  const saveTaskService = async (taskInfo: any) => {
    const result = await saveTask(taskInfo);

    setTaskInfo(null);
    setIsDisabled(false);
    toast.closeAll();

    if (result.statusCode === 403) {
      showErrorToast("plz log in again");
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
    handleAddTask(result.data);
  };

  return (
    <Box p="5">
      <Button onClick={onOpen}>Add Task</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          resetForm();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
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
                value={values.description!!}
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
    </Box>
  );
}

export default AddButton;
