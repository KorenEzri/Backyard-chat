import * as React from 'react';
import styled from 'styled-components/macro';
import { BaseReactError } from 'types';
import { BaseSiteBanner } from '../BaseSiteBanner/Loadable';

interface Props {
  error?: BaseReactError;
  setError: React.SetStateAction<any>;
}

export function BaseFormErrorMessage(props: Props) {
  const { error, setError } = props;
  const deleteError = () => {
    setError();
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      deleteError();
    }, 5000);
    return () => clearTimeout(timeout);
  });

  return (
    <div>
      {error ? (
        <div
          onClick={() => {
            deleteError();
          }}
        >
          {error.isError ? (
            <BaseSiteBanner message={error.message} time={5} />
          ) : (
            <BaseSiteBanner
              message={error.message}
              time={0}
              colors={['#10b318', '#05920c', '#06d61089']}
            />
          )}
        </div>
      ) : (
        <PlaceholderDiv>
        </PlaceholderDiv>
      )}
    </div>
  );
}
const PlaceholderDiv = styled.div`
  height: 42px;
  position: relative;
  width: 65%;
  max-width: 550px;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 2px;
  transition: 300ms;
`;