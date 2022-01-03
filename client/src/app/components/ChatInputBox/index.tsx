import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {}

export function ChatInputBox(props: Props) {

  return (
  <ChatInputBoxWrapper>
    <input type="text"/>
  </ChatInputBoxWrapper>
  );

};

const ChatInputBoxWrapper = styled.div`
`;
