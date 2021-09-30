import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button, IconButton, Link, Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import ListCard from '../ListCard';
import { parseUrlQuery } from '../utils';
import Form from './Form';
import SaveUrlsModal from './SaveUrlsModal';

const DynamicRandomModal = dynamic(() => import('./RandomModal'), { ssr: false });

export const appKey = 'random-list';

export default function Root() {
  const [list, setList] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const keyParams = parseUrlQuery(window.location.href)[appKey];
    if (keyParams) {
      const array = keyParams.split(',');
      console.log('Array', array);
      setList(array);
      return;
    }
  }, [setList]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set(
      appKey,
      Array.isArray(list) ? list.join(',') : String(list)
    );
    history.pushState({}, '', url);
  }, [list]);

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
      {open && <DynamicRandomModal list={list} onFinish={() => setOpen(false)} />}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
        }}
      >
        <SaveUrlsModal />
      </Box>
      <Typography
        variant="h2"
        sx={{
          mt: { xs: 1, sm: 2 },
          fontFamily: 'Fredoka One',
          textAlign: 'center',
        }}
      >
        Random 🧑‍🎓
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
          maxWidth: 500,
          margin: 2,
          gap: 2,
          height: 1,
        }}
      >
        <Paper sx={{ width: 1 }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: { xs: 350, sm: 500 },
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 1 }}>
          <Paper sx={{ width: 1 }}>
            <Form
              onAdd={(value) => {
                setList((prev) => [...prev, value]);
              }}
            />
          </Paper>
          <Paper
            sx={{
              p: 2,
              gap: 2,
              width: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
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
      </Box>
      <Box p={1}>
        <Typography variant="body1">
          Made by <Link href="https://github.com/melvynx">Melvynx</Link>
        </Typography>
      </Box>
    </Box>
  );
}
