import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button, IconButton, Link, Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorage';
import ListCard from '../ListCard';
import Form from './Form';

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
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: 1,
        height: 1,
      }}
    >
      <Typography
        variant="h2"
        sx={{ mt: { xs: 1, sm: 2 }, fontFamily: 'Fredoka One' }}
      >
        Random student
      </Typography>
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
              maxHeight: '500px',
              overflowY: 'scroll',
            }}
          >
            {list.length > 0 ? (
              <>
                {list.map((value, index) => {
                  return (
                    <ListCard
                      onRemove={onRemove}
                      id={index}
                      key={index}
                      name={value}
                    />
                  );
                })}
                <IconButton
                  onClick={() => {
                    if (confirm('Delete all items forever?')) {
                      setList([]);
                    }
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
            ) : (
              <Typography
                color="textSecondary"
                fontStyle="italic"
                sx={{ fontFamily: 'Fredoka One' }}
              >
                Type something...
              </Typography>
            )}
          </Box>
        </Paper>
        <Paper sx={{ width: 1 }}>
          <Form
            onAdd={(value) => {
              setList((prev) => [...prev, value]);
            }}
          />
        </Paper>
        <Paper
          sx={{ p: 2, gap: 2, width: 1, display: 'flex', justifyContent: 'center' }}
        >
          <Button
            disabled={list.length === 0}
            size="large"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Random
          </Button>
        </Paper>
      </Box>
      <Box p={1}>
        <Typography variant="body1">
          Made by <Link href="https://github.com/melvynx">Melvynx</Link> with ❤️
        </Typography>
      </Box>
    </Box>
  );
}
