import * as React from 'react';
import { useLocalStorage } from 'hooks/use-local-storage';
import styled from 'styled-components/macro';
import { IFromObj, IMessage, IUser } from 'types';

export function Message({ message }: { message: IMessage }) {
  const [currUser]: IUser[] = useLocalStorage('currUser', '');

  return (
    <BaseMessage key={`${message._id}basemsg1`}>
      {currUser._id === (message.from as any)._id ? (
        <UserMessage key={`${message._id}key`}>{message.message}</UserMessage>
      ) : (
        <OtherMessage key={`${message._id}otherkey`}>
          <UsernameDiv color={(message.from as any).color}>
            <span>~ {(message.from as IFromObj).username}</span>
          </UsernameDiv>
          <p>{message.message}</p>
        </OtherMessage>
      )}
    </BaseMessage>
  );
}

const BaseMessage = styled.div`
  text-overflow: ellipsis;
  font-size: 14px;
  margin: 4px;
  transition: all ease-in-out 0.5s;
  letter-spacing: 1px;
`;

const UserMessage = styled.div`
  padding: 6px;
  text-align: right;
  border-radius: 12px;
  background: linear-gradient(rgb(35, 151, 79), rgb(6, 219, 41));
  width: fit-content;
  mix-blend-mode: multiply;
  color: white;
  text-shadow: 0.07em 0 black, 0 0.07em black, -0.07em 0 black, 0 -0.07em black;
  max-width: 250px;
  float: right;
  box-shadow: 1px 1px 0px 0px violet;
`;

const OtherMessage = styled.div`
  padding: 6px;
  text-align: left;
  border-radius: 12px;
  background: linear-gradient(rgb(61, 148, 189), rgba(15, 149, 158, 0.426));
  color: #ffffff;
  mix-blend-mode: multiply;
  text-shadow: 0.07em 0 black, 0 0.07em black, -0.07em 0 black, 0 -0.07em black;
  box-shadow: 1px 1px 0px 0px darkgreen;
  width: fit-content;
  max-width: 250px;
  p {
    margin: 0px;
  }
`;

const UsernameDiv = styled.div<{ color: string }>`
  margin-top: -5px;
  margin-bottom: -2.5px;
  span {
    color: ${({ color }) => color};
    text-shadow: 0.07em 0 black, 0 0.07em black, -0.07em 0 black,
      0 -0.07em black;
    font-size: 11px;
    margin: 0px;
    letter-spacing: 0px;
  }
`;
