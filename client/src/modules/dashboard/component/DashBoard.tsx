import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "./AddButton";
import { getTasks } from "../api/task";
import { Status } from "../../../api/constants";
import { Box, Button, useToast } from "@chakra-ui/react";

function DashBoard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    getTasksService();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) return;
    navigate("/login");
  });

  const showErrorToast = (message: string) => {
    toast({
      position: "top",
      status: "error",
      description: message,
      duration: 1000,
    });
  };

  const getTasksService = async () => {
    const result = await getTasks();

    if (result.statusCode === 403) {
      showErrorToast("plz log in again");
      localStorage.removeItem("token");
      navigate("/", {
        replace: true,
      });
      return;
    }

    if (result.status === Status.ERROR) {
      return;
    }

    if (result.data.length === 0) {
      setError("Nothing");
      return;
    }

    setTasks(result.data);
  };

  const handleAddTask = (task: any) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (_id: string) => {
    const updatedTasks = tasks.filter(task => task._id !== _id);

    if (updatedTasks.length === 0) {
      setError("Nothing");
    }
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (updatedTask: any) => {
    // const updatedTasks = tasks.map(task => {
    //   if (task._id === updatedTask._id) {
    //     task = { ...updatedTask };
    //   }
    //   return employee;
    // });

    // setTasks(updatedTasks);

    getTasksService();
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <Box minHeight="100vh" bgColor="gray.200">
      <Button
        variant="solid"
        onClick={handleLogOut}
        position="fixed"
        top="20px"
        right="20px"
        color="white"
        backgroundColor="cyan.800"
        _hover={{
          backgroundColor: "cyan.700",
        }}
      >
        LogOut
      </Button>

      <AddButton handleAddTask={handleAddTask} />
      <TaskList
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
        tasks={tasks}
        error={error}
      />
    </Box>
  );
}

export default DashBoard;
