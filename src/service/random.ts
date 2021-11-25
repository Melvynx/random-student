import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types';

const colors = ['#b83535', '#155ba1', '#381f75', '#006974', '#87103f'] as const;

export const getData = (list: string[]): WheelData[] => {
  return list.map((value, index) => {
    return {
      option: value,
      style: { backgroundColor: colors[index % colors.length] },
    };
  });
};

export const getRandomNumber = (list: string[]) => {
  return Math.floor(Math.random() * list.length);
};

export const getRandomValueFromArray = <T>(possibilities: T[]): T => {
  return possibilities[Math.floor(Math.random() * possibilities.length)];
};
