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
  border: 2px solid blue;
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

const HeaderRightmostFrame = styled.div`
border: 1px solid red;
`;

const HeaderCenterFrame = styled.div`
border: 1px solid green;

`;

const HeaderLeftmostFrame = styled.div`
border: 5px solid yellow;

`;
