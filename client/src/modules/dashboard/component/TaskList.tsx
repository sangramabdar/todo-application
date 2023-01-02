import { Spinner, Flex, Heading, Grid } from "@chakra-ui/react";

import { Task } from "../api/task";
import { Stack } from "@chakra-ui/react";
import TaskComponent from "./Task";

interface TaskListProps {
  tasks: Task[] | null;
  handleDeleteTask: Function;
  handleUpdateTask: Function;
  error: string;
}

function TaskList({
  tasks,
  handleDeleteTask,
  handleUpdateTask,
  error,
}: TaskListProps) {
  if (tasks?.length === 0)
    return (
      <Flex justifyContent="center" alignItems="center" direction="column">
        {error ? (
          <Heading>Not Found</Heading>
        ) : (
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Heading textAlign="center">Loading</Heading>
          </Stack>
        )}
      </Flex>
    );

  console.log(tasks);

  return (
    <Grid
      m="auto"
      maxW="60%"
      templateColumns={{
        md: "repeat(3, 1fr)",
        sm: "repeat(2, 1fr)",
      }}
      gap={5}
      justifyContent="center"
    >
      {tasks?.slice(0, tasks.length).map((task: any) => {
        return (
          <TaskComponent
            key={task._id}
            {...task}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTask={handleUpdateTask}
          />
        );
      })}
    </Grid>
  );
}

export default TaskList;
