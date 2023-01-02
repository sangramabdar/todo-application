import { Flex, Button } from "@chakra-ui/react";

interface SubmitButtonProps {
  title: string;
  disabled: boolean;
}

function SubmitButton({ title, disabled }: SubmitButtonProps) {
  return (
    <Flex justifyContent="center">
      <Button
        mt="20px"
        variant="solid"
        type="submit"
        bgColor="blue.400"
        disabled={disabled}
        _hover={{
          backgroundColor: "blue.500",
        }}
      >
        {title}
      </Button>
    </Flex>
  );
}

export default SubmitButton;
