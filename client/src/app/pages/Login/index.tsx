import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { BaseTitle } from 'app/components/BaseTitle/Loadable';
import { BaseForm } from 'app/components/BaseForm/Loadable';
import { BaseButton } from 'app/components/BaseButton/Loadable';
import { formInputs } from 'app/forms';
import { loginByPass } from 'network';

export function Login() {
  const history = useHistory();
  const [form, setForm] = React.useState({
    username: '',
    password: '',
  });

  const onSubmit = {
    text: 'Login',
    onClick: async () => {
      await loginByPass(form)
    },
  };

  return (
    <LoginPageWrapper>
      <BackyardLoginTitle>
        <BaseTitle title="Login" baseSettings={{ center: true }} />
      </BackyardLoginTitle>
      <LoginFormWrapper>
        <BaseForm inputs={formInputs.login(form, setForm)} submit={onSubmit} />
      </LoginFormWrapper>
      <LoginPageResgisterBtn>
        <BaseButton
          text={'Register'}
          onClick={() => history.push('/register')}
        />
      </LoginPageResgisterBtn>
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div``;
const BackyardLoginTitle = styled.div`
  * {
    font-family: 'backyardregular' !important;
  }
`;
const LoginFormWrapper = styled.div`
  margin-top: 15px;
`;
const LoginPageResgisterBtn = styled.div`
  text-align:center;
  margin-top: 10px;
`;
