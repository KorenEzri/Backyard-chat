import { logger } from 'logger';
import { getParticipants } from 'network';
import * as React from 'react';
import styled from 'styled-components/macro';
import { IChannel, IUser } from 'types';
import { ChatParticipant } from '../ChatParticipant/Loadable';

export function ChatParticipantList({
  user,
  activeChannel,
}: {
  user: IUser;
  activeChannel: string;
}) {
  const [participants, setParticipants] = React.useState<Partial<IUser[]>>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const participantsList = await getParticipants(activeChannel);

        if (participantsList && participantsList.length) {
          participantsList.sort((a, b) =>
            a?.isActive === b?.isActive ? 0 : a?.isActive ? -1 : 1,
          );

          const channelIndex = user.channels.findIndex(
            (c: IChannel) =>
              c._id === activeChannel || c.channelName === activeChannel,
          );

          const channelToUpdate: IChannel = user.channels[channelIndex];

          channelToUpdate.members = participantsList;

          user.channels[channelIndex] = channelToUpdate;

          setParticipants(participantsList);
        }
      } catch ({ message }) {
        logger.error(`${message} at ${__filename}:38`);
      }
    })();
  }, []);

  // React.useEffect(() => {
  //   socketController.subscribe('messageSent', (newMessage: IMessage) => {
  //     const channelIndex = user.channels.findIndex(
  //       (c: IChannel) =>
  //         c._id === activeChannel || c.channelName === activeChannel,
  //     );

  //     const channelToUpdate: IChannel = user.channels[channelIndex];

  //     channelToUpdate.messages
  //       ? channelToUpdate.messages.push(newMessage)
  //       : (channelToUpdate.messages = [newMessage]);

  //     user.channels[channelIndex] = channelToUpdate;

  //     setUser(user);

  //     setMessages([...user.channels[channelIndex].messages]);
  //   });

  //   scrollToBottom();
  // }, [messages]);

  return (
    <ParticipantListWrapper>
      {/* <ParticipantListTitle title={'Participants'}>Participants</ParticipantListTitle> */}
      <ParticipantList>
        {participants?.map((participant, index) => {
          if (!participant) return;
          return (
            <ChatParticipant
              key={`${participant._id}index${index}`}
              participant={participant}
            />
          )
        })}
      </ParticipantList>
    </ParticipantListWrapper>
  );
}

const ParticipantListWrapper = styled.div`
  float: left;
  width: 26.33%;
  max-height: calc(100vh - 76px);
  @media (max-height: 482px) {
    min-height: 320px;
    max-height: 408px;
  }
`;
const ParticipantList = styled.ul`
  list-style-type: none;
  text-align: center;
  margin-top:-1px;
`;
const ParticipantListTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  margin: 0;
  margin-right: 45px;
  height: 32px;
  overflow: hidden;
  @media (max-width: 667px) {
    font-size: 1em;
  height: 21px;
  }
  @media (max-width: 1167px) {
  margin-right: -5px;
  }
`;
