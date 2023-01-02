import { Button, Center, Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

function LinkButton({ children }: any) {
  return (
    <Button
      mt="20px"
      variant="solid"
      backgroundColor="blue.400"
      width="100px"
      textAlign="center"
      size="lg"
      _hover={{
        backgroundColor: "blue.500",
      }}
    >
      {children}
    </Button>
  );
}

function Home() {
  return (
    <>
      <Center
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="blue.300"
        color="white"
        position="fixed"
        top="0"
        bottom="0"
        left="0"
        right="0"
      >
        <Text
          color="white"
          fontSize="3xl"
          as="b"
          mx="auto"
          maxW="50%"
          textAlign="center"
        >
          Todo Application
        </Text>
        <Stack spacing="2">
          <LinkButton>
            <Link to="/login">Login</Link>
          </LinkButton>
          <LinkButton>
            <Link to="/signup">Sign Up</Link>
          </LinkButton>
        </Stack>
      </Center>
    </>
  );
}

export default Home;
