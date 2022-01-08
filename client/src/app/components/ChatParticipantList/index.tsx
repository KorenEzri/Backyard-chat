import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {}

export function ChatParticipantList(props: Props) {
  return (
    <ParticipantListWrapper>
      <ParticipantList>

      </ParticipantList>
    </ParticipantListWrapper>
  );
}

const ParticipantListWrapper = styled.div`
  float: left;
  width: 23.33%;
  max-height: calc(100vh - 76px);
  @media (max-height: 482px) {
    min-height: 320px;
    max-height: 408px;
  }
  overflow-y: scroll;
`;
const ParticipantList = styled.ul`
  list-style-type: none;
  text-align: center;
`;
