import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction,admin }) => {

  return (
    <Box
      px={2}
      py={1}
      borderRadius={"lg"}
      m={1}
      mb={2}
      fontSize={12}
      cursor={"pointer"}
      onClick={handleFunction}
      variant="solid"
      bg={user._id===admin?._id?"purple":"teal"}
    
      color={"white"}
    >
      {user.name}
      <CloseIcon pl={1}
      />
    </Box>
  );
};

export default UserBadgeItem;
