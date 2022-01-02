import * as React from 'react';
import styled from 'styled-components/macro';
import { TheIcon } from '../TheIcon/Loadable';
import profileAvatar from '../../../assets/images/user-profile.svg';
import alertIcon from '../../../assets/images/alert.png';

interface Props {}

export function TheUserControls(props: Props) {
  return (
    <TheUserControlsWrapper>
      <TheIcon image={profileAvatar} size="small" />
      <TheIcon image={alertIcon} size="small" />
    </TheUserControlsWrapper>
  );
}

const TheUserControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 115px;
`;
