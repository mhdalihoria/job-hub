import { styled, useTheme } from "@mui/material";
import React from "react";
import { HashLoader } from "react-spinners";

const ContainerStyles = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: theme.palette.background.default,
}));

const SectionLoader = ({ size = 60, loading }) => {
  const theme = useTheme();

  return (
    <ContainerStyles>
      <HashLoader
        color={`${
          theme.palette.mode === "dark"
            ? theme.palette.text.primary
            : theme.palette.primary.main
        }`}
        size={size}
        loading={loading}
      />
    </ContainerStyles>
  );
};

export default SectionLoader;
