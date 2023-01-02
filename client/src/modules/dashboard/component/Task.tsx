import { Td, Tr } from "@chakra-ui/react";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";

function TaskRow(props: any) {
  const { title, description } = props;

  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{description}</Td>
      <Td p="2">
        <DeleteButton {...props} />
        <UpdateButton {...props} />
      </Td>
    </Tr>
  );
}

export default TaskRow;
