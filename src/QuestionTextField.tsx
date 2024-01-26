import { Box, Button, HStack, Input } from "@chakra-ui/react";
import React, { useState, FC } from "react";
import axios from "axios";

interface QuestionTextFieldProps {
  chatMessage: string[]; // Assuming chatMessage is an array of strings
  setChatMessage: React.Dispatch<React.SetStateAction<string[]>>;
}

const QuestionTextField: React.FC<QuestionTextFieldProps> = ({
  chatMessage,
  setChatMessage,
}) => {
  // send the data to backend!!!!! @Marcus,@wilson , @Jonathan
  const [question, setQuestion] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const getLLMAnswer = async ({ text }: { text: string }) => {
    setChatMessage([...chatMessage, text]);

    console.log(chatMessage.length);

    if (chatMessage.length == 0) {
      const res = await axios.post(
        `https://52.220.229.139/get-initial-response`,
        {
          text: text,
        }
      );
      setChatMessage([...chatMessage, text, res.data.response]);
    } else {
      const res = await axios.post(`https://52.220.229.139/get-more-response`, {
        text: text,
      });
      setChatMessage([...chatMessage, text, res.data.response]);
    }
  };

  const handleSubmit = async () => {
    // Handle the submitted question via onQuestionSubmit

    // Optionally, you can pass the question to a parent component

    getLLMAnswer({ text: question });

    // await setChatMessage([...chatMessage, question]);

    // Clear the input field after submission

    setQuestion("");
  };

  return (
    <Box pt={1} pb={4}>
      <HStack>
        <Input
          placeholder="Type your question..."
          value={question}
          onChange={handleInputChange}
        />
        <Button
          colorScheme="green"
          onClick={handleSubmit}
          _hover={{ bgColor: "green.400" }}
        >
          Submit
        </Button>
      </HStack>
    </Box>
  );
};
export default QuestionTextField;
