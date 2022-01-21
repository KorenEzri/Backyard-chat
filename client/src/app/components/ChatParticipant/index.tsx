import * as React from 'react';
import styled from 'styled-components/macro';
import { IUser } from 'types';

interface Props {
  participant: Partial<IUser>;
}

export function ChatParticipant(props: Props) {
  const { participant } = props;

  return (
    <ParticipantWrapper>
      <ParticipantAvatarDiv>
        <img
          src={
            participant.avatar ||
            `https://ui-avatars.com/api/?name=${
              participant.username
            }&background=${
              participant.color && participant.color !== 'undefined'
                ? participant.color.replace('#', '')
                : 'random'
            }&rounded=true`
          }
        />
        <ParticipantIsActiveSpan>
          {participant.isActive ? '🟢' : null}
        </ParticipantIsActiveSpan>
      </ParticipantAvatarDiv>
      <li title={participant.username}>{participant.username}</li>
    </ParticipantWrapper>
  );
}

const ParticipantWrapper = styled.div`
  display: flex;
  cursor: pointer;
  text-align: center;
  margin-left: -30px;
  height: 60px;
  padding: 5px;
  margin-top: 1px;
  background-color: white;
  line-height: 50px;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 240px;
  @media (max-width: 667px) {
    font-size: 14px;
    line-height: unset;
  }
`;

const ParticipantAvatarDiv = styled.div`
  img {
    width: 40px;
    max-height: 40px;
  }
  margin-right: 8px;
  margin-left: 5px;
  @media (max-width: 667px) {
   img {
     width: 30px;
    }
  margin-left: 1px;
  }
}
`;
const ParticipantIsActiveSpan = styled.span`
  position: absolute;
  font-size: 8px;
  margin-left: -13px;
  margin-top: 14px;
  @media (max-width: 667px) {
  margin-top: 19px;
  margin-left: -10px;
  }
}
`;
