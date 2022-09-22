import { Box, Text, Input, Button } from "@chakra-ui/react";
import Layout from "../../src/components/Layout";

import { BiSend } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const Chat = () => {
  const name = "@aomwara";
  const description = "I am a Web 3.0 Enthusiast";

  const bottomRef = useRef<any>(null);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<any>([
    { state: 1, message: "Hello, how are you?", time: "12:00" },
  ]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setChat([...chat, { state: 2, message: e.target.value, time: "12:00" }]);
      setMessage("");
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <>
      <Layout title="Ethernal | Chat">
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Text
              color="primary.0"
              fontWeight="bold"
              fontSize="2xl"
              marginBottom={description ? 0 : 7}
            >
              {name}
            </Text>
            {description && (
              <Text
                marginBottom={description ? 7 : 0}
                fontSize="sm"
                color="primary.100"
              >
                {description}
              </Text>
            )}
          </Box>
          <Box mt={2}>
            <Button>
              <FaTimes />
            </Button>
          </Box>
        </Box>
        <Box
          bg={"#fafafa"}
          borderRadius="15px"
          height="50vh"
          p={{ base: 0, md: 3 }}
          overflow={"auto"}
        >
          {chat.map((c: any) => {
            if (c.state == 1) {
              return (
                <>
                  <Box display="flex" justifyContent="flex-start">
                    <Text ml={3} mt={1} fontSize="xs" color="gray.500">
                      {c.time}
                    </Text>
                  </Box>
                  <Box
                    mb={2}
                    pr={4}
                    pl={4}
                    p={2}
                    ml={3}
                    maxWidth="200px"
                    borderRadius="7px"
                    bg={"#ffffff"}
                    boxShadow={{
                      base: "none",
                      md: "5px 5px 5px 5px #f7f7f7",
                    }}
                  >
                    <Text>{c.message}</Text>
                  </Box>
                </>
              );
            } else {
              return (
                <>
                  <Box width="100%" display="flex" justifyContent="flex-end">
                    <Box
                      p={2}
                      pr={4}
                      pl={4}
                      mr={3}
                      bg="primary.100"
                      color="white"
                      textAlign="right"
                      mt={3}
                      maxWidth="300px"
                      borderRadius="7px"
                      boxShadow={{
                        base: "none",
                        md: "10px 10px 10px 10px #F5F5F5",
                      }}
                    >
                      <Text>{c.message}</Text>
                    </Box>
                  </Box>
                  <Box width="100%" display="flex" justifyContent="flex-end">
                    <Text mr={3} mt={1} fontSize="xs" color="gray.500">
                      {c.time}
                    </Text>
                  </Box>
                </>
              );
            }
          })}
          <div ref={bottomRef} />
        </Box>
        ``
        <Box mt={3}>
          <Box display="flex">
            <Input
              _focus={{ boxShadow: "none" }}
              type="text"
              autoFocus
              borderRadius="0px"
              placeholder="Type your message"
              onKeyDown={handleKeyDown}
              onChange={handleMessageChange}
              value={message}
            />
            <Button
              bgColor="primary.0"
              _hover={{ bgColor: "primary.100" }}
              color="#fff"
              borderRadius="0px"
              type="submit"
            >
              <BiSend size="20" />
            </Button>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Chat;