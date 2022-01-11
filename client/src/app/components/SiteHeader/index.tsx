import * as React from 'react';
import styled from 'styled-components/macro';
import { TheUserControls } from '../TheUserControls/Loadable';

interface Props {}

export function SiteHeader(props: Props) {
  return (
    <HeaderWrapper>
      <HeaderLeftmostFrame>LEFTasdadsadasdsa</HeaderLeftmostFrame>
      <HeaderCenterFrame>asddddd</HeaderCenterFrame>
      <HeaderRightmostFrame>
        <TheUserControls />
      </HeaderRightmostFrame>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

const HeaderRightmostFrame = styled.div`
`;

const HeaderCenterFrame = styled.div`

`;

const HeaderLeftmostFrame = styled.div`

`;
