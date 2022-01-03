import * as React from 'react';
import styled from 'styled-components/macro';
import { ChatParticipantList } from '../../components/ChatParticipantList/Loadable';
import { ChatMessageList } from '../../components/ChatMessageList/Loadable';
import { ChatInputBox } from '../../components/ChatInputBox/Loadable';

interface Props {}

export function TheSiteChat(props: Props) {
  return (
    <ChatWrapper>
      <PlaceholderDiv></PlaceholderDiv>
      <ChatMessageList />
      <ChatParticipantList />
    </ChatWrapper>
  );
}

const ChatWrapper = styled.div`
  // make 100% of screen, minus header height
  border: 3px solid black;
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
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
  border: 5px solid red;
`;
