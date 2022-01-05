import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  attributes?: HTMLInputElement;
  title: string;
}

export function BaseInput(props: Props) {
  const { attributes, title } = props;
  return (
    <BaseInputWrapper>
      <label>{title}</label>
      <input type={attributes?.type || 'text'} />
    </BaseInputWrapper>
  );
}

const BaseInputWrapper = styled.div``;
