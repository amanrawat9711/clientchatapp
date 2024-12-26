import { Menu, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteChatMutation, useLeaveGroupMutation} from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const [deleteChat] = useAsyncMutation(
    useDeleteChatMutation
  );
  const [leaveGroup] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const isGroup = selectedDeleteChat.groupChat;

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };
  
  const deleteChatHandler=()=>{
   closeHandler()
   deleteChat("Deleting Chats...",selectedDeleteChat.chatId)
  }
  
  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
  };

  
  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon />{"Leave Group "}
          </>
        ) : (
          <>
            <DeleteIcon /> {"Delete Chat"}
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
