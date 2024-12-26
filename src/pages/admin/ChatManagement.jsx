import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import Table from "../../shared/Table";
import { Avatar, Skeleton, Stack } from "@mui/material";
import { dashboardData } from "../../constants/SampleData";
import { transformImage } from "../../lib/features";
import AvatarCard from "../../shared/AvatarCard";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { useFetchData } from "6pp";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },

  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/chats`,
    "dashboard-chats"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(
        data.chats.map((chat) => ({
          ...chat,
          id: chat._id,
          avatar: Array.isArray(chat.avatar)
            ? chat.avatar.map((url) =>
                typeof url === "string" ? transformImage(url, 50) : url
              )
            : [],
          members: Array.isArray(chat.members)
            ? chat.members.map((member) =>
                member.avatar ? transformImage(member.avatar, 50) : ""
              )
            : [],
          creator: {
            name: chat.creator.name,
            avatar:
              chat.creator && typeof chat.creator.avatar === "string"
                ? transformImage(chat.creator.avatar, 50)
                : "",
          },
        }))
      );
    }
  }, [data]);
  
  return loading ? (
    <Skeleton height={"100vh"} />
  ) : (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Chats"} />
    </AdminLayout>
  );
};

export default ChatManagement;
