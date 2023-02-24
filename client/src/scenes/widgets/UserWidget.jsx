import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,

} from "@mui/icons-material";
// import * as React from 'react';
import { Box, Typography, Divider, useTheme, Modal, styled, Avatar, Stack, TextField, ButtonGroup, Button, Tooltip, Fab } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [open, setOpen] = useState(false);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    // const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`,
    // {headers:{Authorization: `Bearer ${token}`}}
    // )
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;


  const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  })
  const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
  })
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >

        <FlexBetween gap="1rem">
          <UserImage image={picturePath}
          />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined onClick={(e) => setOpen(true)} />
      </FlexBetween>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={800} height={600} bgcolor={"background.default"} color={"text.primary"} p={3} borderRadius={5}>
          <UserBox>
            <Avatar
              src='https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg'
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500} varient="span">Aflah</Typography>
          </UserBox>
          <Typography varient='h2' fontWeight={500}><u> Edit Profile </u></Typography>
          <imageBox  />
          
          
          <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth mb={2}>
            <Button >Submit</Button>
          </ButtonGroup>
        </Box>
      </StyledModal>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      
    </WidgetWrapper>
  );
};

export default UserWidget;
