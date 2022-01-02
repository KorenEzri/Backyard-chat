import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  image: string;
  size: 'small' | 'medium' | 'large';
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
}

interface TheIconWrapperDesignProps {
  isClickable: boolean;
}

const sizes = {
  small: '50px',
  medium: '100px',
  large: '150px',
};

export function TheIcon(props: Props) {
  const { image, handleClick, size } = props;

  return (
    <TheIconWrapper
      isClickable={!!handleClick}
      onClick={e => {
        if (handleClick) {
          handleClick(e);
        }
      }}
    >
      <img src={image} width={sizes[size]} height={sizes[size]} />
    </TheIconWrapper>
  );
}

const TheIconWrapper = styled.div<TheIconWrapperDesignProps>`
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : '')};
`;
