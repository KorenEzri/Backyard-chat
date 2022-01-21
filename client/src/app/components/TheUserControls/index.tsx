import * as React from 'react';
import styled from 'styled-components/macro';
import { TheIcon } from '../TheIcon/Loadable';
import profileAvatar from '../../../assets/images/user-profile.svg';
import alertIcon from '../../../assets/images/alert.png';

interface Props {
  backyard: boolean;
  setBackyard: any;
}

export function TheUserControls(props: Props) {
  const { backyard, setBackyard } = props;

  return (
    <TheUserControlsWrapper>
      <SwitchWrapper backyard={backyard}>
        <input
          type="checkbox"
          checked={backyard}
          onChange={() => setBackyard(!backyard)}
        />
        <span>Backyard switch</span>
      </SwitchWrapper>
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

const SwitchWrapper = styled.div<{ backyard: boolean }>`
span {
  font-family: roboto !important;
  margin-left: -5px;
  margin-right: 20px;
}
  input[type='checkbox'] {
    position: relative;
    width: 50px;
    top: 8px;
    right: 15px;
    height: 30px;
    -webkit-appearance: none;
    -webkit-appearance: none;
    background: ${({ backyard }) => (backyard ? '#c6c6c6;' : ' #03a9f4;')} 
    outline: none;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    transition: background 300ms linear;

    // circle
    &::before {
      position: absolute;
      content: '';
      width: 30px;
      height: 30px;
      top: 0px;
      left: ${({ backyard }) => (backyard ? '0px;' : '25px;')} ;
      border-radius: 20px;
      background-color: #fff;
      transform: scale(1.1);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: left 300ms linear;
    }
    ​

  }
`;
