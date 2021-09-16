import { Box, Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorage';
import ListCard from '../ListCard';
import Form from './Form';
import RandomModal from './RandomModal';

export default function Root() {
  const [list, setList] = useLocalStorageState<string[]>('random-list', []);
  const [open, setOpen] = useState(false);

  function onRemove(index: number) {
    setList((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 1,
        height: 1,
        gap: 2,
      }}
    >
      {open && <RandomModal list={list} onFinish={() => setOpen(false)} />}
      <Paper>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            maxWidth: '500px',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {list.map((value, index) => {
            return (
              <ListCard onRemove={onRemove} id={index} key={index} name={value} />
            );
          })}
        </Box>
      </Paper>
      <Paper>
        <Form
          onAdd={(value) => {
            setList((prev) => [...prev, value]);
          }}
        />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Button size="large" variant="contained" onClick={() => setOpen(true)}>
          Random
        </Button>
      </Paper>
    </Box>
  );
}
