import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";

const CustomButton = ({ onClick, variant = "text", children, ...props }) => {
  const theme = useTheme();
  const bgColor = theme.palette.primary.main;
  const textColor = theme.palette.getContrastText(bgColor);
  const borderColor = variant === "outlined" ? textColor : "";

  return (
    <Button
      variant={variant}
      sx={{ color: textColor, borderColor }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
