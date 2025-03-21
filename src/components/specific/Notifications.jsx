import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { SampleNotifications } from "../../constants/SampleData";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isLoading ,data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false))
    try {
      const res = await acceptRequest({ requestId:_id, accept });
      if (res.data?.success) {
        console.log(res.data)
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.error || "Something Went Wrong");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };
  useErrors([{ error, isError }]);
  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map((notification) => (
                <NotificationItem
                  sender={notification.sender}
                  _id={notification._id}
                  handler={friendRequestHandler}
                  key={notification._id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <>
      <ListItem>
        <Stack
          direction={"row"}
          spacing={"2rem"}
          alignItems={"center"}
          width={"100%"}
        >
          <Avatar src={avatar} />
          <Typography
            variant="body1"
            sx={{
              flexGlow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {`${name} Sent You A Friend Request.`}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }}>
            <Button onClick={() => handler({ _id, accept: true })}>
              Accept
            </Button>
            <Button
              color="error"
              onClick={() => handler({ _id, accept: false })}
            >
              Reject
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
});

export default Notifications;
