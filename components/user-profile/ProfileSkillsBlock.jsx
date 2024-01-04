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

//--------------------------------------------------------------
//--------------------------------------------------------------

const SectionContainer = styled(Card)(({ theme }) => ({
  padding: "2rem",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text,
}));

//--------------------------------------------------------------
//--------------------------------------------------------------

const skills = [
  { skillName: "dsadsa", skillLvl: "intermediate" },
  { skillName: "dsadssa", skillLvl: "intermediate" },
  { skillName: "dsadsdsa", skillLvl: "intermediate" },
  { skillName: "dsadsdfsa", skillLvl: "intermediate" },
];

const ProfileSkillsBlock = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom mb={4}>
          Skills:
        </Typography>
        <Box display={"flex"} flexWrap={"wrap"} gap={1.5}>
          {skills.map((skill) => (
            <Item key={`${skill.skillName}${skill.skillLvl}`}>
              {skill.skillName} - {skill.skillLvl}
            </Item>
          ))}
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default ProfileSkillsBlock;
