import { Card, styled, Container, Box, Paper, Typography } from "@mui/material";

//--------------------------------------------------------------
//--------------------------------------------------------------

const SectionContainer = styled(Card)(({ theme }) => ({
  marginTop: "1rem",
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

const ProfileSkillsBlock = ({ userSkills }) => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom mb={4}>
          Skills:
        </Typography>
        <Box display={"flex"} flexWrap={"wrap"} gap={1.5}>
          {userSkills.map((skill) => (
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
