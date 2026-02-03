import React from "react";
import ButtonStyled from "./ButtonStyled";
import { Button } from "@mui/material";

/**
 * Custom Button component
 */
const ModernButton = ({ label, onClick, disabled, small }) => {
  return (
    <ButtonStyled disabled={disabled} small={small}>
      <Button onClick={onClick} disabled={disabled} fullWidth>
        {label}
      </Button>
    </ButtonStyled>
  );
};

export default ModernButton;
