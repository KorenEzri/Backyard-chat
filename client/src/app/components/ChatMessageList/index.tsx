import * as React from 'react';
import styled from 'styled-components/macro';
import { IChannel, IMessage, IUser } from 'types';
import { ChatInputBox } from '../../components/ChatInputBox/Loadable';
import { getAllMessages, socketController } from 'network';
import { logger } from 'logger';
import { Message } from '../Message/Loadable';
import { useLocalStorage } from 'hooks/use-local-storage';

interface Props {
  backgrounds: string[];
}

export function ChatMessageList({
  activeChannel,
}: {
  user: IUser;
  activeChannel: string;
}) {
  const [user, setUser] = useLocalStorage('user', {} as IUser);
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const backgroundImages = [
    '2c',
    '2h',
    '9h',
    '10c',
    'ah',
    'as',
    'chair',
    'red',
  ];

  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    (async () => {
      try {
        const messages = await getAllMessages(activeChannel);
        
        if (messages && messages.length) {
          const channelIndex = user.channels.findIndex(
            (c: IChannel) =>
              c._id === activeChannel || c.channelName === activeChannel,
          );

          const channelToUpdate: IChannel = user.channels[channelIndex];

          channelToUpdate.messages = messages as IMessage[];

          user.channels[channelIndex] = channelToUpdate;

          setUser(user);

          setMessages(user.channels[channelIndex].messages);
        }
      } catch ({ message }) {
        logger.error(`${message} at ${__filename}:58`);
      }
    })();
  }, []);

  React.useEffect(() => {
    socketController.subscribe('messageSent', (newMessage: IMessage) => {
      const channelIndex = user.channels.findIndex(
        (c: IChannel) =>
          c._id === activeChannel || c.channelName === activeChannel,
      );

      const channelToUpdate: IChannel = user.channels[channelIndex];

      channelToUpdate.messages
        ? channelToUpdate.messages.push(newMessage)
        : (channelToUpdate.messages = [newMessage]);

      user.channels[channelIndex] = channelToUpdate;

      setUser(user);

      setMessages([...user.channels[channelIndex].messages]);
    });

    scrollToBottom();
  }, [messages]);

  return (
    <MessageListWrapper backgrounds={backgroundImages}>
      <MessageList>
        {messages?.map((message: IMessage) => {
          return <Message message={message} key={`${message._id}msg${message.createdAt}key`} />;
        })}
        <div ref={messagesEndRef}></div>
      </MessageList>
      <ChatInputBox />
    </MessageListWrapper>
  );
}

const MessageListWrapper = styled.div<Props>`
  float: left;
  width: 73.33%;
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #834893 #dbb4e9;
    mix-blend-mode: hard-light;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: #dbb4e9;
    border-radius: 8px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #834893;
    border-radius: 10px;
    border: 1px solid #caa5d4;
  }
  background: 
  /* linear-gradient(
      rgb(242, 116, 242),
      rgba(255, 255, 255, 0.981)
    ), */ url('${({
      backgrounds,
    }) => `/backgrounds/${backgrounds[7]}.jpg`}')
    no-repeat;
  background-size: 100% 100%;
  box-shadow: inset 0px 0px 5px -2px #181111c0;
  border-radius: 4px;
`;

const MessageList = styled.ul`
  list-style-type: none;
  text-align: center;
  height: calc(100vh - 164px);
  min-height: 320px;
  margin-top: -0.001px;
  margin-left: -40px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex-grow: 1;
  overflow-x: hidden;
`;
