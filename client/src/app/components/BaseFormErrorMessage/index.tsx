import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  error: string;
  allErrors: string[];
  setErrors: React.SetStateAction<any>;
}

export function BaseFormErrorMessage(props: Props) {
  const { error, setErrors, allErrors } = props;
  const removeFromErrorList = () => {
    allErrors[allErrors.findIndex(v => v === error)] = null!;
    setErrors([...allErrors]);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      removeFromErrorList();
    }, 5000);
    return () => clearTimeout(timeout);
  });

  return (
    <>
      <BaseFormErrorWrapper
        onClick={() => {
          removeFromErrorList();
        }}
      >
        <span>{error}</span>
        <BaseFormErrorLoader></BaseFormErrorLoader>
      </BaseFormErrorWrapper>
    </>
  );
}

const BaseFormErrorWrapper = styled.div`
  position: relative;
  border: 1px solid #9500ff;
  width: 65%;
  max-width: 550px;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 2px;
  transition: 300ms;
  &:hover::after {
    position: absolute;
    content: ' ♥ ';
  }
  &:hover {
    cursor: pointer;
  }
  span {
    color: #ffffff;
    text-shadow: 1px 1px 1px #000000;
    font-weight: bold;
    position: absolute;
    width: 100%;
    right: 1px;
   top: 6px;
    text-align: center;
    z-index: 9999;

  }
  background-color: #9500ff85
}
`;

const BaseFormErrorLoader = styled.div`
  height: 40px;
  animation: roundtime calc(5 * 1s) steps(5)
    forwards;
  transform-origin: right center;
  animation: roundtime calc(5 * 1s) linear forwards;
  background: linear-gradient(to bottom, #9500ff, #7f0099);

  @keyframes roundtime {
  to {
    transform: scaleX(0);
  }

`;
