import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { BaseButton } from 'app/components/BaseButton/Loadable';
import { BaseForm } from 'app/components/BaseForm/Loadable';
import { BaseTitle } from 'app/components/BaseTitle/Loadable';
import { formInputs } from 'app/components/BaseForm/form-inputs';

export function Register() {
  const history = useHistory();
  const [form, setForm] = React.useState({
    username: '',
    password: '',
  });

  const onSubmit = {
    text: 'Register',
    onClick: () => {
      console.log(form);
    },
  };

  return (
    <LoginPageWrapper>
      <BackyardLoginTitle>
        <BaseTitle title="Login" baseSettings={{ center: true }} />
      </BackyardLoginTitle>
      <LoginFormWrapper>
        <BaseForm inputs={formInputs.register(form, setForm)} submit={onSubmit} />
      </LoginFormWrapper>
      <LoginPageResgisterBtn>
        <BaseButton
          text={'Login'}
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
