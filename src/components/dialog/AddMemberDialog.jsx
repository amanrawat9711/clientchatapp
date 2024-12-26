import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc";
import UserItem from "../../shared/UserItem";

const AddMemberDialog = ({chatId}) => {
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
const dispatch = useDispatch()
  const {isAddMember} = useSelector((state)=>state.misc)

  const {isLoading,error,isError,data} = useAvailableFriendsQuery(chatId)

  const addMemberSubmitHanlder = () => {
  addMembers("Adding Members",{members:selectedMembers,chatId})
  closeHandler()
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false))
  };
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  useErrors([{isError,error}])
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"1rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Members</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading?<Skeleton/>:(data?.friends.length > 0 ? (
            data?.friends.map((i) => (
              <UserItem
                isAdded={selectedMembers.includes(i._id)}
                key={i._id}
                user={i}
                handler={selectMemberHandler}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          ))}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button onClick={closeHandler} color="error">
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHanlder}
            disabled={isLoadingAddMembers}
            variant="contained"
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
