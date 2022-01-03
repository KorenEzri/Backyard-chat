import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {}

export function ChatParticipantList(props: Props) {
  return (
    <ParticipantListWrapper>
      <ParticipantList>
        <p>Participant List</p>
        <p>Participant List</p>
        <p>Participant List</p>
        <p>Participant List</p>
        <p>Participant List</p>
        <p>Participant List</p>
        <p>Participant List</p>
        <p>Participant List</p>
        <p>Participant List</p>
        <p>Participant List</p>
        <p>Participant List</p>
      </ParticipantList>
    </ParticipantListWrapper>
  );
}

const ParticipantListWrapper = styled.div`
  float: left;
  width: 23.33%;
  border: 1px solid green;
`;
const ParticipantList = styled.ul`
  list-style-type: none;
  text-align: center;
  height: calc(100vh - 180px);
  overflow-y: scroll;
`;
