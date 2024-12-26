import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../components/specific/ChatList";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../components/specific/Profile";
import { useMyChatsQuery } from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../redux/reducers/misc";
import toast from "react-hot-toast";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { getSocket } from "../Socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../constants/event";
import {
  incrementNotification,
  setNewMessageAlert,
} from "../redux/reducers/chat";
import { getOrSaveFromStorage } from "../lib/features";
import DeleteChatMenu from "../components/dialog/DeleteChatMenu";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const socket = getSocket();
    const navigate = useNavigate();

    const deleteMenuAnchor = useRef(null);

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const chatId = params.chatId;
    const { isLoading, refetch, isError, error, data } = useMyChatsQuery("");
    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, groupChat, chatId) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ groupChat, chatId }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessageAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification(true));
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);
    return (
      <>
        <Header />
        <Title />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            md={3}
            sm={4}
            height={"100%"}
            sx={{
              display: { sm: "block", xs: "none" },
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { sm: "block", xs: "none" },
              padding: "2rem",
              bgcolor: "#55347C",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
