import React, { memo } from "react";
import { Link } from "../components/styles/StyledComponents";
import { Stack, Typography, Box } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  _id,
  name,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: "0", color: "white", textDecoration: "none" }} // Ensure Link has white text and no underline
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, groupChat, _id)}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          alignItems: "center",
          color: sameSender ? "white" : "unset",
          backgroundColor: sameSender ? "black" : "unset",
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography sx={{ color: "white" }}>{name}</Typography>
          {newMessageAlert && (
            <Typography sx={{ color: "white" }}>
              {newMessageAlert.count} New Message
            </Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              height: "10px",
              width: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
