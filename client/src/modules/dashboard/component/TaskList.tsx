import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Tbody,
  Td,
  Spinner,
  Flex,
  Heading,
  Box,
  Tfoot,
  Th,
} from "@chakra-ui/react";

import { Task } from "../api/task";
import TaskRow from "./Task";
import { Stack, Center } from "@chakra-ui/react";

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

  return (
    <TableContainer
      m="10"
      bg="blue.300"
      borderRadius="2xl"
      color="white"
      maxWidth={{
        lg: "800px",
        sm: "600px",
      }}
      margin="auto"
      my="2"
      rounded="md"
    >
      <Table variant="simple" size="md">
        <TableCaption color="white">Task Table</TableCaption>
        <Thead>
          <Tr>
            <Td>Title</Td>
            <Td>Description</Td>
            <Td>Actions</Td>
          </Tr>
        </Thead>
        <Tbody>
          {tasks?.slice(0, tasks.length).map((Task: any) => {
            return (
              <TaskRow
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
                key={Task._id}
                {...Task}
              />
            );
          })}
        </Tbody>
        {/* <Tfoot>
          {tasks?.slice(tasks.length - 1).map(Task => {
            return (
              <TaskRow
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
                key={Task._id}
                {...Task}
              />
            );
          })}
        </Tfoot> */}
      </Table>
    </TableContainer>
  );
}

export default TaskList;
