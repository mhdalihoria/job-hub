import { styled, useTheme } from "@mui/material";
import React from "react";
import { HashLoader } from "react-spinners";

const ContainerStyles = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  left: "0",
  top: "0",
  zIndex: "10000",
  background: theme.palette.background.default,
}));

const FullPageLoader = ({size, loading}) => {
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

export default FullPageLoader;
