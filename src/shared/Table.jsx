import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem 3.5rem",
          borderRadius: "1rem",
          boxShadow: "none",
          margin: "auto",
          height: "100%",
          overflow: "hidden",
          width:"100%"
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height:"80%"
          }}
          sx={{
            border:"none",
            ".table-header":{
                bgcolor:"purple",
                color:"white"
            }
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
