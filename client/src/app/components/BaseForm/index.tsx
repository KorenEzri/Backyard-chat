import * as React from 'react';
import styled from 'styled-components/macro';
import { BaseBtnProps } from '../BaseButton';
import { BaseButton } from '../BaseButton/Loadable';
import { BaseFormErrorMessage } from '../BaseFormErrorMessage/Loadable';

interface FormProps {
  title: string;
  attributes: Partial<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  validation?: Function;
}

interface Props {
  inputs: FormProps[];
  submit: BaseBtnProps;
}

export function BaseForm(props: Props) {
  const { inputs, submit } = props;
  const [errors, setErrors] = React.useState<string[]>([]);

  const validateForm = (args) => {
    const validationErrs = inputs.map((input) => {
      const { validation, attributes } = input;
      
      if (validation) {
       return validation(attributes.value)
      }
    })

    if (validationErrs.some((err) => err !== null)) {
      setErrors(
        Array.from(
          new Set([...errors, ...validationErrs]),
        ),
      );
      return false;
    } else {
      submit.onClick(args)
    }
  }

  return (
    <BaseFormWrapper>
      {errors.length > 0 &&
        errors.map(error => {
          return error ? <BaseFormErrorMessage allErrors={errors} error={error} setErrors={setErrors} /> : null;
        })}

      {inputs.map(({ title, attributes, onChange, required, validation }) => {
        return (
          <>
            <BaseFormLabel>
              {title}
              {required && <RequiredMark>*</RequiredMark>}
            </BaseFormLabel>
            <BaseFormInput>
              <input
                type={attributes?.type || 'text'}
                value={attributes.value}
                onChange={onChange}
                required={required}
                onBlur={
                  validation
                    ? () => {
                        setErrors(
                          Array.from(
                            new Set([...errors, validation(attributes.value)]),
                          ),
                        );
                      }
                    : () => {}
                }
              />
            </BaseFormInput>
          </>
        );
      })}
      <BaseButton
        text={submit.text}
        onClick={validateForm}
        shade={submit.shade}
      />
    </BaseFormWrapper>
  );
}

const BaseFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const BaseFormInput = styled.div`
  input {
    margin: 6px;
    padding: 12px;
    font-size: 14px;
    padding: 8px;
    margin-top: 10px;
    margin-bottom: 26px;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    border: 1px solid #33334d;
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      border: 1px solid black;
      -webkit-box-shadow: 0px 0px 6px 4px #9b4dd371,
        5px 5px 3px 5px rgba(0, 0, 0, 0);
      transition: box-shadow 0.3s ease-in-out;
    }
    &:focus {
      border: 1px solid black;
      -webkit-box-shadow: 0px 0px 6px 4px #4b0082,
        5px 5px 3px 5px rgba(0, 0, 0, 0);
      box-shadow: 0px 0px 6px 4px #4b0082, 5px 5px 3px 5px rgba(0, 0, 0, 0);
    }
  }
`;

const RequiredMark = styled.span`
  font-weight: 900 !important;
  font-family: roboto;
  font-size: 16px;
  margin-left: 6px;
  color: #ac0a0a;
  text-shadow: 1px 1px 1px darkred;
`;

const BaseFormLabel = styled.label`
  cursor: pointer;
  font-family: 'backyardregular';
  letter-spacing: 0.6px;
  &:active {
    font-family: roboto;
  }
`;
