import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';

// const Button = styled.button``;

export default function RandomButton(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <Button
      size="large"
      variant="contained"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
}
