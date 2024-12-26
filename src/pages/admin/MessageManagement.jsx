import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import { dashboardData } from "../../constants/SampleData";
import { fileFormat, transformImage } from "../../lib/features";
import moment from "moment";
import Table from "../../shared/Table";
import RenderAttachment from "../../shared/RenderAttachment";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    headerClassName: "table-header",
  },
  {
    field: "attachments",
    headerName: "Attachments",
    width: 200,
    headerClassName: "table-header",
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0
        ? attachments.map((i, index) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <Box key={index}>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    width: 400,
    headerClassName: "table-header",
  },
  {
    field: "sender",
    headerName: "Sent By",
    width: 200,
    headerClassName: "table-header",
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    width: 220,
    headerClassName: "table-header",
  },
  {
    field: "chat",
    headerName: "Chat",
    width: 100,
    headerClassName: "table-header",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 250,
    headerClassName: "table-header",
  },
];
const MessageManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/messages`,
    "dashboard-messages"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  console.log(data);
  const [rows, setRows] = useState([]);
  useEffect(() => {
  if (data && Array.isArray(data.messages)) {
    const validMessages = data.messages.filter((message) => message && message._id);
    console.log("Valid Messages:", validMessages);
    
    setRows(
      validMessages.map((i) => ({
        id: i._id,
        attachments: i.attachments || [],
        content: i.content || "No content",
        sender: {
          name: i.sender?.name || "Unknown Sender",
          avatar: i.sender?.avatar ? transformImage(i.sender.avatar, 50) : "",
        },
        chat: i.chat || "Unknown Chat",
        groupChat: i.groupChat || false,
        createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }
}, [data]);


  return loading ? (
    <Skeleton height={"100vh"} />
  ) : (
    <AdminLayout>
      <Table
        heading={"All Messages"}
        rows={rows}
        columns={columns}
        rowHeight={200}
      />
    </AdminLayout>
  );
};

export default MessageManagement;
