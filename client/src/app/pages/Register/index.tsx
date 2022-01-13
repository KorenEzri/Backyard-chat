import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { BaseButton } from 'app/components/BaseButton/Loadable';
import { BaseForm } from 'app/components/BaseForm/Loadable';
import { BaseTitle } from 'app/components/BaseTitle/Loadable';
import { formInputs } from 'app/forms';
import { register } from 'network';

export function Register() {
  const history = useHistory();
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    avatar: '',
  });

  const onSubmit = {
    text: 'Register',
    onClick: async () => {
      await register(form)
      history.push('/login')
    },
  };

  return (
    <LoginPageWrapper>
      <BackyardLoginTitle>
        <BaseTitle title="Register" baseSettings={{ center: true }} />
      </BackyardLoginTitle>
      <LoginFormWrapper>
        <BaseForm inputs={formInputs.register({form, setForm})} submit={onSubmit} />
      </LoginFormWrapper>
      <LoginPageResgisterBtn>
        <BaseButton
          text={'Login'}
          onClick={() => history.push('/')}
        />
      </LoginPageResgisterBtn>
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div`
overflow-y: hidden;
`;
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
