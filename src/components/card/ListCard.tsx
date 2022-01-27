import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

type ListCardProps = {
  id: number;
  onRemove: (index: number) => void;
  name: string;
};

const images = [
  'assets/avatar/1.svg',
  'assets/avatar/2.svg',
  'assets/avatar/3.svg',
  'assets/avatar/4.svg',
  'assets/avatar/5.svg',
  'assets/avatar/6.svg',
  'assets/avatar/7.svg',
  'assets/avatar/8.svg',
  'assets/avatar/9.svg',
  'assets/avatar/10.svg',
];

export function ListCard({ id, name, onRemove }: ListCardProps) {
  return (
    <Box
      borderRadius="32px"
      padding={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.default"
    >
      <Box position="relative">
        <Avatar
          src={images[id % 10]}
          sx={{
            width: 48,
            height: 48,
            backgroundColor: (theme) => `${theme.palette.primary.dark}`,
            boxShadow: 5,
            overflow: 'visible',
            '&> img': {
              height: 48,
              width: 'auto',
              margin: 'auto',
              position: 'unset',
            },
          }}
        />
      </Box>

      <Typography
        color="textPrimary"
        sx={{
          fontFamily: 'Fredoka One',
          fontSize: 20,
          width: '100%',
          fontWeight: 'bold',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          margin: (theme) => `0 ${theme.spacing(1)}`,
        }}
      >
        {name}
      </Typography>
      <Box
        component="button"
        padding={0}
        border={0}
        sx={{
          cursor: 'pointer',
        }}
        height={24}
        onClick={() => onRemove(id)}
        bgcolor="transparent"
      >
        <CloseIcon sx={{ color: 'white', maxWidth: 'unset' }} />
      </Box>
    </Box>
  );
}
