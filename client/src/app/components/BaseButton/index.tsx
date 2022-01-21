import * as React from 'react';
import styled from 'styled-components/macro';

export interface BaseBtnProps {
  text: string;
  onClick: React.ReactEventHandler<any>;
  shade?: number;
  btnStyle?: string;
  colorOverride?: string;
}

interface BtnStyle {
  shade?: number;
  btnStyle?: string;
}

export function BaseButton(props: BaseBtnProps) {
  const { onClick, text, shade, btnStyle } = props;

  return (
    <BaseButtonWrapper>
      <BaseButtonStyle
        shade={shade}
        onClick={onClick}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onClick(e);
          }
        }}
        title={text}
        btnStyle={btnStyle}
      >
        {text}
      </BaseButtonStyle>
    </BaseButtonWrapper>
  );
}

const BaseButtonWrapper = styled.div``;
const BaseButtonStyle = styled.button<BtnStyle>`
  box-shadow: 0px 1px 0px 0px #f0f7fa;
  background-color: #8f1667;
  border-radius: 6px;
  border: 1px solid #711;
  display: inline-block;
  cursor: pointer;
  color: #fadfdf;
  font-family: 'backyardregular' !important;
  font-size: 20px;
  letter-spacing: 1.5px;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 3px 3px 3px #322470;
  margin: auto;
  filter: ${({ shade }) => `brightness(${100 - (shade || 0)}%)`};
  transition: 600ms;
  &:hover {
    background: ${({ shade }) =>
      `linear-gradient(to bottom, #a848ed ${shade || 5}%, #ae63e4c0 100%)`};
  }
  &:active {
    position: relative;
    top: 1px;
  }
  ${({ btnStyle }) => (btnStyle ? btnStyle : '')}
`;
