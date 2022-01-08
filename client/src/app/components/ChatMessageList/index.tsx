import * as React from 'react';
import styled from 'styled-components/macro';
import { IMessage } from 'types';
import { ChatInputBox } from '../../components/ChatInputBox/Loadable';

export function ChatMessageList() {
  const [messages, setMessages] = React.useState<IMessage[]>([])

  React.useEffect(() => {
    
  })

  return (
    <MessageListWrapper>
      <MessageList>
     
      </MessageList>
      <ChatInputBox />
    </MessageListWrapper>
  );
}

const MessageListWrapper = styled.div`
  float: left;
  width: 53.33%;
  border: 1px solid black;
`;

const MessageList = styled.ul`
  list-style-type: none;
  text-align: center;
  height: calc(100vh - 164px);
  min-height: 320px;
  overflow-y: scroll;
`;
