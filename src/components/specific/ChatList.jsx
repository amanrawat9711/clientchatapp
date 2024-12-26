import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chatId,
  onlineUsers = [],
  chats = [],
  newMessagesAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} 
    color={"white"}
    sx={{
      backgroundColor:"#36454F",
      height:"100%", overflow:"auto" , 
    }}>
      {chats?.map((data, index) => {
        const { avatar, _id, members, name, groupChat } = data;
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        const isOnline = members?.some((member) => onlineUsers.includes(member));
        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            handleDeleteChat={handleDeleteChat}
            groupChat={groupChat}
            sameSender={chatId===_id}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;