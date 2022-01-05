import * as React from 'react';
import styled from 'styled-components/macro';
import { BaseTitle } from 'app/components/BaseTitle/Loadable';

export function Login() {
  return (
    <LoginPageWrapper>
      <BackyardLoginTitle>
        <BaseTitle title="Login :)" baseSettings={{ center: true }} />
      </BackyardLoginTitle>
      <EnglishLoginTitle>
        <BaseTitle title="Login :)" baseSettings={{ center: true, size:'16' }} />
      </EnglishLoginTitle>
      <LoginFormWrapper></LoginFormWrapper>
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div``;
const EnglishLoginTitle = styled.div``;
const BackyardLoginTitle = styled.div`
  * {
    font-family: 'backyardregular' !important;
  }
`;

const LoginFormWrapper = styled.div``;
