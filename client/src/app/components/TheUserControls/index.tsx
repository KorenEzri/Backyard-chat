import * as React from 'react';
import styled from 'styled-components/macro';
import { TheIcon } from '../TheIcon/Loadable';
import profileAvatar from '../../../assets/images/user-profile.svg';
import alertIcon from '../../../assets/images/alert.png';

interface Props {}

export function TheUserControls(props: Props) {
  return (
    <TheUserControlsWrapper>
      <IconWrapper>
        <TheIcon image={profileAvatar} size="small" />
      </IconWrapper>
      <IconWrapper>
        <TheIcon image={alertIcon} size="small" />
      </IconWrapper>
    </TheUserControlsWrapper>
  );
}

const TheUserControlsWrapper = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  margin: 5px;
`;
