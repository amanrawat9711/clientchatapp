import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../components/styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <div>
      <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
        <Grid
          item
          md={3}
          sm={4}
          height={"100%"}
          sx={{
            display: { sm: "block", xs: "none" },
          }}
        >
          <Skeleton height={"100vh"} variant="rectangular" />
        </Grid>
        <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
          <Stack spacing={"1rem"}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={"5rem"} />
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          md={4}
          lg={3}
          height={"100%"}
          sx={{
            display: { sm: "block", xs: "none" },
          }}
        >
          <Skeleton height={"100vh"} variant="rectangular" />
        </Grid>
      </Grid>
    </div>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      justifyContent={"center"}
      padding={"0.5rem"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};

export { LayoutLoader, TypingLoader };
