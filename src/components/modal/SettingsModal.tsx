import SettingsIcon from '@mui/icons-material/Settings';
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import type { Settings } from '~/types';

type SettingsModalProps = {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
};

export function SettingsModal({ settings, setSettings }: SettingsModalProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <IconButton size="large" onClick={() => setOpen(true)}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Random app settings</DialogTitle>
        <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="deleteOnRandom"
                  checked={settings.deleteOnRandom}
                  onChange={handleChange}
                />
              }
              label="Delete value when it be random"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="showRoulette"
                  checked={settings.showRoulette}
                  onChange={handleChange}
                />
              }
              label="Show roulette"
            />
          </FormGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}
