import * as React from 'react';
import styled from 'styled-components/macro';
import { formInputs } from 'app/forms';
import { BaseForm } from '../BaseForm/Loadable';
import { IFormStyle } from 'types';

export function ChatInputBox() {
  const [form, setForm] = React.useState({
    chatMessage: '',
  });

  const formStyle: IFormStyle = {
    inputStyle: `
      margin-left: -13px;
      width: 30vw;
      max-width: 491px;
    `,
    btnStyle: `
      margin-top: 11px;
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

  const onSubmit = {
    text: 'Send',
    onClick: async () => {
      console.log(form);
    },
  };

  return (
    <ChatInputBoxWrapper>
      <BaseForm
        inputs={formInputs.sendMessage({ form, setForm })}
        formStyle={formStyle}
        submit={onSubmit}
      />
    </ChatInputBoxWrapper>
  );
}

const ChatInputBoxWrapper = styled.div`
  margin: 20px;
`;
