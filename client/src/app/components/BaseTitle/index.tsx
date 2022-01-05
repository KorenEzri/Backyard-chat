import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  title: string;
  baseSettings?: {
    size?: string;
    center?: boolean;
  };
}

export function BaseTitle({ title, baseSettings }: Props) {
  return (
    <BaseTitleWrapper baseSettings={baseSettings}>
      {title}
      </BaseTitleWrapper>
  );
}

const BaseTitleWrapper = styled.div<Omit<Props, 'title'>>`
  font-size: ${({ baseSettings }) => baseSettings?.size || '32'}px;
  text-align: ${({ baseSettings }) => (baseSettings?.center ? 'center' : '')};
  margin: 12px;
  font-weight: 900;
  letter-spacing: 1.5px;
  font-family: roboto;
`;

