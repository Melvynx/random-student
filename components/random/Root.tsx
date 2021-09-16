import { Box, Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorage';
import ListCard from '../ListCard';
import Form from './Form';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./RandomModal'), { ssr: false });

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
        width: 1,
        height: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          maxWidth: '500px',
          gap: 2,
        }}
      >
        {open && <DynamicComponent list={list} onFinish={() => setOpen(false)} />}
        <Paper sx={{ width: 1 }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
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
        <Paper sx={{ width: 1 }}>
          <Form
            onAdd={(value) => {
              setList((prev) => [...prev, value]);
            }}
          />
        </Paper>
        <Paper sx={{ p: 2, width: 1, display: 'flex', justifyContent: 'center' }}>
          <Button size="large" variant="contained" onClick={() => setOpen(true)}>
            Random
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
