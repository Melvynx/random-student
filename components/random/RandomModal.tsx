import { Box, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types';

export function getRandomValueFromArray<T>(possibilities: T[]): T {
  return possibilities[Math.floor(Math.random() * possibilities.length)];
}

const colors = ['#d32f2f', '#1976d2', '#381f75', '#006974', '#87103f'];

function getData(list: string[]): WheelData[] {
  return list.map((v, index) => {
    return { option: v, style: { backgroundColor: colors[index % colors.length] } };
  });
}

function getRandomNumber(list: string[]) {
  return Math.floor(Math.random() * list.length);
}

type RandomModalProps = {
  list: string[];
  onFinish: () => void;
  showRoulette?: boolean;
  onRandom?: (index: number) => void;
};

export default function RandomModal({
  list,
  onFinish,
  showRoulette,
  onRandom,
}: RandomModalProps) {
  const [mustSpin, setMustSpin] = useState(true);
  const [prizeNumber, setPrizeNumber] = useState(getRandomNumber(list));

  const handleSpinClick = () => {
    onRandom?.(prizeNumber);
    const newPrizeNumber = getRandomNumber(list);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleClose = () => {
    if (!mustSpin || !showRoulette) {
      onRandom?.(prizeNumber);
    }
    onFinish();
  };

  return (
    <Dialog open={true} onAbort={handleClose} onClose={handleClose}>
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
        {(!mustSpin || !showRoulette) && (
          <Typography align="center" variant="h4">
            {list[prizeNumber]}
          </Typography>
        )}
        {showRoulette ? (
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
        ) : null}
        <Button onClick={handleClose}>Close</Button>
        <Button variant="outlined" onClick={handleSpinClick}>
          Randomiz
        </Button>
      </Box>
    </Dialog>
  );
}
