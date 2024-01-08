import React from "react";
import {
  Card,
  styled,
  Container,
  Box,
  Avatar,
  IconButton,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  Divider,
} from "@mui/material";
import formatTime from "@/utils/formatTime/formatTime";
import { nanoid } from "nanoid";

//--------------------------------------------------------------
//--------------------------------------------------------------

const SectionContainer = styled(Card)(({ theme }) => ({
  marginTop: "1rem",
  padding: "2rem",
}));

//--------------------------------------------------------------
//--------------------------------------------------------------

const data = [
  {
    endDate: "Sat, 30 Dec 2023 21:00:00 GMT",
    description:
      "Course Descriptionn\nIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
    startDate: "Fri, 29 Dec 2023 21:00:00 GMT",
    subTitle: "Course Author",
    title: "Course Title",
  },
];

const ProfileInfoBlock = ({ sectionTitle, sectionData }) => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {sectionTitle && (
          <Typography variant="h4" gutterBottom mb={4}>
            {sectionTitle}
          </Typography>
        )}
        {sectionData.map((item, index) => {
          return (
            <Box key={nanoid()}>
              {!!item.title && (
                <Typography component="h1" variant="h5" gutterBottom>
                  <strong>{item.title}</strong>
                </Typography>
              )}
              {!!item.subTitle && (
                <Typography component="h2" variant="body2" gutterBottom>
                  {item.subTitle}
                </Typography>
              )}
              {!!item.startDate && !!item.startDate && (
                <Typography component="p" variant="caption" gutterBottom>
                  {formatTime(item.startDate)} - {formatTime(item.endDate)}
                </Typography>
              )}
              {!!item.description && (
                <Typography component="p" variant="body1" gutterBottom>
                  {item.description}
                </Typography>
              )}
              {data.length > 0 && index !== data.length - 1 && (
                <Divider sx={{ m: "1.5rem 0" }} />
              )}
            </Box>
          );
        })}
      </Container>
    </SectionContainer>
  );
};

export default ProfileInfoBlock;
