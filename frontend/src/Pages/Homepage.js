import React, { useEffect } from "react";
import { Container, Box, Text, Center, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

const Homepage = () => {

  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
  
    };

  }, [history]);
  return (
    <>
      <Container maxW="xl" centerContent >
        <Center
          d="flex"
          justifyContent="center"
          p={3}
          bg={"white"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="Work sans" fontWeight="bold" color={"black"}>
            Chatting Application
          </Text>
        </Center>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="black">
          <Tabs variant="soft-rounded" colorScheme="facebook">
            <TabList mb="1em" centerContent>
              <Tab width="50%" >Login</Tab>
              <Tab width="50%" >Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;
