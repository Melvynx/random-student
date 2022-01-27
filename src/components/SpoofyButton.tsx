import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

type SpoilerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  loading?: boolean;
};

export default function SpoofyButton({
  children,
  loading,
  disabled,
  ...props
}: SpoilerButtonProps) {
  return (
    <Button {...props} disabled={disabled}>
      <InnerButton loading={loading} disabled={disabled}>
        {loading ? <Loader src="/assets/loader.svg" /> : children}
      </InnerButton>
    </Button>
  );
}

const spin = keyframes({
  from: {
    transform: 'rotate(0) scale(2)',
  },
  to: {
    transform: 'rotate(1turn) scale(2)',
  },
});

const Loader = styled.img`
  animation: ${spin} 1000ms infinite linear;
  height: 16px;
  width: 16px;
`;

const Button = styled.button`
  width: min-content;
  margin: 0;
  background: hsla(0, 0%, 20%, 0.5);
  border: none;
  padding: 0;
  border-radius: 16px;
  cursor: pointer;
  outline-offset: 4px;
  &:hover > span {
    box-shadow: inset -2px -2px 10px hsla(0, 0%, 2%, 0.6);
    transition: transform 100ms;
    transform: translateY(-4px);
  }
  &:active > span {
    box-shadow: inset 4px 4px 10px hsla(0, 0%, 2%, 0.5);
    transition: transform 50ms;
    transform: translateY(0px);
  }
`;

type ButtonProps = {
  disabled?: boolean;
  loading?: boolean;
};

const InnerButton = styled.span<ButtonProps>`
  background: ${(p) =>
    p.disabled
      ? 'linear-gradient(100deg,hsl(230, 0%, 40%) 0%,hsl(234, 0%, 64%) 60%)'
      : 'linear-gradient(100deg,hsl(230, 75%, 40%) 0%,hsl(234, 82%, 64%) 60%)'};
  padding: ${(p) => (p.loading ? '16px 42px' : '16px 32px')};
  display: inline-block;
  border-radius: 16px;
  font-family: 'Fredoka One';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: #ffffff;
  font-weight: 700;
  transform: translateY(-2px) ${(p) => p.disabled && '!important'};
  transition: transform 400ms;
  box-shadow: inset -2px -2px 10px hsla(0, 0%, 2%, 0.5)
    ${(p) => p.disabled && '!important'};
`;
