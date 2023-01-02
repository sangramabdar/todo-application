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
        _hover={{
          backgroundColor: "cyan.700",
        }}
        disabled={disabled}
        bgColor="cyan.800"
        color="white"
      >
        {title}
      </Button>
    </Flex>
  );
}

export default SubmitButton;
