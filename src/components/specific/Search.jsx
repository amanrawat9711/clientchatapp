import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../../shared/UserItem";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUsersQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  const search = useInputValidation("");
  const dispatch = useDispatch();
  const addFriendHandler = async (id) => {
  await sendFriendRequest("Sending Friend Request",{userId:id})
  };

  const [users, setUsers] = useState([]);
  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err));
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search.value]);
  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Search People</DialogTitle>
        <TextField
          value={search.value || ""}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
