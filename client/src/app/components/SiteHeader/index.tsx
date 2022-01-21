import * as React from 'react';
import styled from 'styled-components/macro';
import { TheUserControls } from '../TheUserControls/Loadable';
 
interface Props {
  backyard,
  setBackyard
}

export function SiteHeader(props: Props) {
  const { backyard, setBackyard } = props; 

  return (
    <HeaderWrapper>
      <HeaderLeftmostFrame title={'Backyard-Chat'}>Backyard-Chat</HeaderLeftmostFrame>
      <HeaderCenterFrame></HeaderCenterFrame>
      <HeaderRightmostFrame>
        <TheUserControls backyard={backyard} setBackyard={setBackyard} />
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
line-height: 50px;
font-size: 20px;
margin: 5px;
letter-spacing: 2px;

`;
