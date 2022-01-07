import * as React from 'react';
import styled from 'styled-components/macro';
import { IBanner } from 'types';

export function BaseSiteBanner({ message, colors, time, position }: IBanner) {
  return (
    <>
      <BaseBannerWrapper colors={colors} time={time} position={position}>
        <span>{message}</span>
        <BaseBannerLoader colors={colors} time={time}></BaseBannerLoader>
      </BaseBannerWrapper>
    </>
  );
}

const BaseBannerWrapper = styled.div<Omit<IBanner, 'message'>>`
  position: relative;
  border: 1px solid #9500ff;
  width: 65%;
  max-width: 550px;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 2px;
  transition: 300ms;
  &:hover::after {
    position: absolute;
    content: ' ♥ ';
  }
  &:hover {
    cursor: pointer;
  }
  span {
    color: #ffffff;
    text-shadow: 1px 1px 1px #000000;
    font-weight: bold;
    position: absolute;
    width: 100%;
    right: 1px;
    top: 6px;
    text-align: center;
    z-index: 9999;

  }
  background-color: ${({ colors = ['#9500ff', '#7f0099', '#9500ff85'] }) =>
    colors[2]};
  float: ${({ position }) => position};
}
`;

const BaseBannerLoader = styled.div<Omit<IBanner, 'message'>>`
  height: 40px;

  animation: ${({ time }) =>
    time === 0 ? '' : `roundtime calc(${time} * 1s) steps(5) forwards`};

  transform-origin: right center;

  animation: ${({ time }) =>
    time === 0 ? '' : `roundtime calc(${time} * 1s) linear forwards`};

  background: ${({ colors = ['#9500ff', '#7f0099', '#9500ff85'] }) =>
    `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`};

  @keyframes roundtime {
    to {
      transform: scaleX(0);
    }
  }
`;
