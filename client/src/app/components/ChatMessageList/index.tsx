import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {}

export function ChatMessageList(props: Props) {
  return (
    <MessageListWrapper>
      <MessageList>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
        <li>Message list</li>
      </MessageList>
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
  height: calc(100vh - 180px);
  overflow-y: scroll;
`;
