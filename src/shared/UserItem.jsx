import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Add as AddIcon , Remove as RemoveIcon } from "@mui/icons-material";
import { transformImage } from "../lib/features";
const UserItem = ({ user, handler, handlerIsLoading, isAdded=false,styling={} }) => {
  const { name, _id, avatar } = user;
  return (
    <ListItem >
      <Stack 
        direction={"row"}
        spacing={"2rem"}
        alignItems={"center"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transformImage(avatar)} />
        <Typography
          variant="body1"
          sx={{
            display: "-webkit-box",
            webkitLineClamp: "1",
            WebkitBoxOrient: "veritcal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width:"100%"
          }}
        >
          {name}
        </Typography>
        <IconButton
          sx={{
            bgcolor: isAdded?"error.main" :"primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded?"error.dark" :"primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {
            isAdded?<RemoveIcon/>:<AddIcon />
          }
          
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
