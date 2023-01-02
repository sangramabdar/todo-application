import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  GridItem,
  Heading,
  Td,
  Tr,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";

function TaskComponent(props: any) {
  const { title, description } = props;

  return (
    <GridItem rounded="2xl" bgColor="white">
      <Card variant="outline">
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{description}</Text>
        </CardBody>
        <CardFooter display="flex" gap="3" ml="4">
          <UpdateButton {...props} />
          <DeleteButton {...props} />
        </CardFooter>
      </Card>
    </GridItem>
  );
}

export default TaskComponent;
