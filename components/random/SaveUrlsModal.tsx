import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorage';
import { parseUrlQuery } from '../utils';
import { appKey } from './Root';

export default function SaveUrlsModal() {
  const [savedUrls, setSavedUrls] = useLocalStorageState<string[]>('saved-urls', []);
  const [open, setOpen] = useState(false);

  function addCurrentUrl() {
    if (savedUrls.includes(window.location.href)) return;

    setSavedUrls((prev) => [...prev, window.location.href]);
  }

  function handleDelete(index: number) {
    setSavedUrls((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  }

  return (
    <>
      <IconButton size="large" onClick={() => setOpen(true)}>
        <SaveIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Recovery your saved random!</DialogTitle>
        <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {savedUrls.length > 0 ? (
              savedUrls.map((savedUrl, i) => {
                const paramsList = parseUrlQuery(savedUrl)[appKey];
                return (
                  <Tooltip title={paramsList} key={i}>
                    <Chip
                      sx={{
                        maxWidth: 128,
                      }}
                      label={paramsList}
                      variant="outlined"
                      onDelete={() => handleDelete(i)}
                      onClick={() => {
                        window.location.href = savedUrl;
                      }}
                    />
                  </Tooltip>
                );
              })
            ) : (
              <Typography
                color="textSecondary"
                fontStyle="italic"
                sx={{ fontFamily: 'Fredoka One' }}
              >
                You save nothing
              </Typography>
            )}
          </Box>
          <Button variant="contained" onClick={addCurrentUrl}>
            Save current url
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
