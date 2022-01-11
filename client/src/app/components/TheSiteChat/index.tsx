import * as React from 'react';
import styled from 'styled-components/macro';
import { ChatParticipantList } from '../../components/ChatParticipantList/Loadable';
import { ChatMessageList } from '../../components/ChatMessageList/Loadable';

interface Props {}

export function TheSiteChat(props: Props) {
  return (
    <ChatSizeLimiterWrapper>
      <ChatWrapper>
        <PlaceholderDiv></PlaceholderDiv>
        <ChatMessageList />
        <ChatParticipantList />
      </ChatWrapper>
    </ChatSizeLimiterWrapper>
  );
}

const ChatSizeLimiterWrapper = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 10px;
  padding-top: 0px;
  min-height: 320px;
`;

const ChatWrapper = styled.div`

  &: :after {
  content: "";
  display: table;
  clear: both;
}

`;

const PlaceholderDiv = styled.div`
  float: left;
  width: 23.33%;
  padding: 10px;
`;
