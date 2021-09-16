import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types';

export function getRandomValueFromArray<T>(possibilities: T[]): T {
  return possibilities[Math.floor(Math.random() * possibilities.length)];
}

const colors = ['#d63031', '#6c5ce7', '#00b894'];

function getData(list: string[]): WheelData[] {
  return list.map((v, index) => {
    return { option: v, style: { backgroundColor: colors[index % 3] } };
  });
}

export default function RandomModal({
  list,
  onFinish,
}: {
  list: string[];
  onFinish: () => void;
}) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * list.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <Dialog open={true} onAbort={onFinish} onClose={onFinish}>
      <Box
        sx={{
          overflow: 'hidden',
          display: 'flex',
          p: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={getData(list)}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <Button onClick={onFinish}>Close</Button>
        <Button variant="outlined" onClick={handleSpinClick}>
          Randomiz
        </Button>
      </Box>
    </Dialog>
  );
}
