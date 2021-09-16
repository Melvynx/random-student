import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

export default function Form({ onAdd }: { onAdd: (name: string) => void }) {
  const [value, setValue] = useState('');

  function onClick() {
    onAdd(value);
    setValue('');
  }
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        onKeyPress={(e) => {
          if (e.key === 'Enter') onClick();
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={onClick}>Add</Button>
    </Box>
  );
}
