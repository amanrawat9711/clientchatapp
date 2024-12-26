import React from 'react'
import AppLayout from '../layout/AppLayout'
import { Box, Typography } from '@mui/material'

const Home = () => {
  return (
    <Box bgcolor={"gray"} height={"100%"}>
  <Typography p={"2rem"} textAlign={"center"} variant='h5'>Select A Friend To Chat</Typography>
  </Box>
  )
}

export default AppLayout()(Home)
