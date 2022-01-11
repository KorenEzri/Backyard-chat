import * as React from 'react';
import styled from 'styled-components/macro';
import { formInputs } from 'app/forms';
import { BaseForm } from '../BaseForm/Loadable';
import { IFormStyle } from 'types';
import { sendMessage } from 'network/sockets/message';

export function ChatInputBox() {
  const [form, setForm] = React.useState({
    chatMessage: '',
  });

  const formStyle: IFormStyle = {
    inputStyle: `
      margin-left: -13px;
      width: 39vw;
      margin-top: -15px;
      background: linear-gradient(
        rgba(181, 220, 218, 0.426),
        rgba(152, 169, 160, 0.336)
      );
      color: whitesmoke;
      letter-spacing: 1.5px;
      border: 1px solid grey;
      &:hover {
        border: 1px solid grey;
        -webkit-box-shadow: 0px 0px 2px 2px #5e00a2,
        1px 1px 1px 1px rgba(0, 0, 0, 0);#8716d8b7
        transition: box-shadow 0.3s ease-in-out;
      }

      &:focus {
        border: 1px solid grey;
        -webkit-box-shadow: 0px 0px 2px 2px #5e00a2,
        1px 1px 1px 1px rgba(0, 0, 0, 0);#8716d8b7
        transition: box-shadow 0.3s ease-in-out;
      }
      max-width: 491px;
      -moz-box-shadow: 1px 2px 3px #5f5d5d7f;
      -webkit-box-shadow: 1px 2px 3px #8d76767f;
      box-shadow: 1px 2px 3px #583f8ab7;
    `,
    btnStyle: `
      margin-top: -3.55px;
      white-space:nowrap;
      width: 16vw;
      max-width: 113px;
      max-height: 32px;
      padding-left: 6px !important;
      padding-right: 6px !important;
    `,
    wrapperStyle: `
      flex-direction: row;
      margin-bottom: -40px;
      
      `,
  };

  const onClick = {
    text: 'Send',
    onClick: e => {
      sendMessage(form.chatMessage);
      setForm({ chatMessage: '' });
      e.target.focus();
    },
  };

  return (
    <ChatInputBoxWrapper>
      <BaseForm
        inputs={formInputs.sendMessage({ form, setForm })}
        formStyle={formStyle}
        submit={onClick}
      />
    </ChatInputBoxWrapper>
  );
}

const ChatInputBoxWrapper = styled.div`
  margin: 20px;
  margin-top: -10px;
  background: transparent;
`;
