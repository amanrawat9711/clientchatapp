import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SampleUsers } from "../../constants/SampleData";
import UserItem from "../../shared/UserItem";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const groupName = useInputValidation("");
  const {isNewGroup} = useSelector((state)=>state.misc)
  const dispatch = useDispatch();

  const { isError, error, data, isLoading } = useAvailableFriendsQuery();
  
  const [newGroup,isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group Name Is Required")
      if(selectedMembers.length < 2) return toast.error("Please Select AtLeast 3 Members") 
  //creating group
  newGroup("Group Created Successfully",{name:groupName.value,members:selectedMembers})
  closeHandler()
  };

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  };
  return (
    <Dialog onClose={closeHandler} open={isNewGroup} >
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="contained" color="error" size="large" onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler} disabled={isLoadingNewGroup} >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
