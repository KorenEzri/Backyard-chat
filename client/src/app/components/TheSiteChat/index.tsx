import * as React from 'react';
import styled from 'styled-components/macro';
import { ChatParticipantList } from '../../components/ChatParticipantList/Loadable';
import { ChatMessageList } from '../../components/ChatMessageList/Loadable';
import { IUser } from 'types';
import { useLocalStorage } from 'hooks/use-local-storage';

export function TheSiteChat() {
  const [user, setUser] = useLocalStorage('user', {} as IUser)
  const [activeChannel, setActiveChannel] = useLocalStorage('activeChannel', '')
  
  return (
    <ChatSizeLimiterWrapper>
      <ChatWrapper>
        <ChatMessageList user={user} activeChannel={activeChannel || 'global'}  />
        <ChatParticipantList user={user} activeChannel={activeChannel || 'global'}/>
      </ChatWrapper>
    </ChatSizeLimiterWrapper>
  );
}

const ChatSizeLimiterWrapper = styled.div`
  font-family: roboto;
  margin: auto;
  max-width: 1200px;
  padding-left: 1px;
  padding-right: 4px;
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
