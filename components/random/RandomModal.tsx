import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import React from 'react';

export function getRandomValueFromArray<T>(possibilities: T[]): T {
  return possibilities[Math.floor(Math.random() * possibilities.length)];
}

export default function RandomModal({
  list,
  onFinish,
}: {
  list: string[];
  onFinish: () => void;
}) {
  const random = React.useRef(getRandomValueFromArray(list));
  return (
    <Dialog open={true} onAbort={onFinish} onClose={onFinish}>
      <Box
        sx={{
          display: 'flex',
          p: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h3">{random.current}</Typography>
        <Button onClick={onFinish}>Close</Button>
      </Box>
    </Dialog>
  );
}
