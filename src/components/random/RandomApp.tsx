import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton, Link, Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
import { ListCard } from '~/components/card';
import { SaveUrlsModal, SettingsModal } from '~/components/modal';
import { useLocalStorageState, useRandomList } from '~/hooks';
import { defaultSettings, Settings } from '~/types';
import RandomButton from './RandomButton';
import { RandomForm } from './RandomForm';

const DynamicRandomModal = dynamic(() => import('~/components/modal/RandomModal'), {
  ssr: false,
});

export function RandomApp() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useRandomList();
  const [settings, setSettings] = useLocalStorageState<Settings>(
    'settings',
    defaultSettings
  );

  const onRemove = useCallback(
    (index: number) => {
      setList((prev) => {
        const copy = [...prev];
        copy.splice(index, 1);
        return copy;
      });
    },
    [setList]
  );

  const onRandom = useCallback(
    (index) => {
      if (settings.deleteOnRandom) {
        onRemove(index);
      }
    },
    [onRemove, settings.deleteOnRandom]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: 1,
        height: '100vh',
        maxHeight: '100vh',
      }}
    >
      {open && (
        <DynamicRandomModal
          showRoulette={settings.showRoulette}
          list={list}
          onFinish={() => setOpen(false)}
          onRandom={onRandom}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
        }}
      >
        <SaveUrlsModal />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <SettingsModal setSettings={setSettings} settings={settings} />
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
          maxWidth: 800,
          margin: 2,
          gap: { xs: 1, sm: 2 },
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
              maxHeight: 'max(50vh, 300px)',
              flex: 1,
              overflowY: 'auto',
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
        <Paper sx={{ mt: 'auto' }}>
          <RandomForm
            onAdd={(value) => {
              setList((prev) => [...prev, value]);
            }}
          />
        </Paper>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <RandomButton disabled={list.length === 0} onClick={() => setOpen(true)}>
            Random
          </RandomButton>
        </Paper>
        <Typography variant="body1">
          Made by <Link href="https://github.com/melvynx">Melvynx</Link>
        </Typography>
      </Box>
    </Box>
  );
}
