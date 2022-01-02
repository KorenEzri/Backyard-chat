import * as React from 'react';
import styled from 'styled-components/macro';
import { TheUserControls } from '../TheUserControls/Loadable';

interface Props {}

export function SiteHeader(props: Props) {
  return (
    <HeaderWrapper>
      <HeadderOuterFrame>
        <HeaderLeftmostFrame>asddddd</HeaderLeftmostFrame>
        <HeaderRightmostFrame>
          <TheUserControls />
        </HeaderRightmostFrame>
      </HeadderOuterFrame>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div``;

const HeaderRightmostFrame = styled.div`
  justify-content: flex-end;
`;

const HeaderLeftmostFrame = styled.div`
  margin: auto;
`;

const HeadderOuterFrame = styled.div`
  border: 2px solid blue;
  height: 60px;
  width: 100%;
  display: flex;
`;
