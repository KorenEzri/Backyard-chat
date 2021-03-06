import { validations } from 'app/forms';
import { FormProps } from 'types';

interface FormParams {
  form: React.ComponentState;
  setForm: React.SetStateAction<any>;
}

export const formInputs = {
  login: ({ form, setForm }: FormParams): FormProps[] => [
    {
      title: 'Username',
      required: true,
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
    },
    {
      title: 'Password',
      required: true,
      attributes: { value: form.password, type: 'password' },
      onChange: e => {
        setForm({ ...form, password: e.target.value });
      },
    },
  ],
  register: ({ form, setForm }: FormParams): FormProps[] => [
    {
      title: 'First name',
      required: true,
      attributes: { value: form.firstName },
      onChange: e => {
        setForm({ ...form, firstName: e.target.value });
      },
      validation: v => validations.required("First name can't be empty :)", v),
    },
    {
      title: 'Last name',
      attributes: { value: form.lastName },
      onChange: e => {
        setForm({ ...form, lastName: e.target.value });
      },
    },
    {
      title: 'Username',
      required: true,
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
      validation: v => validations.uniqueUsername(v),
    },
    {
      title: 'Password',
      required: true,
      attributes: { value: form.password, type: 'password' },
      onChange: e => {
        setForm({ ...form, password: e.target.value });
      },
      validation: v =>
        validations.length('Password must be at least 6 characters long', 6, v),
    },
    {
      title: 'Email',
      required: true,
      attributes: { value: form.email },
      onChange: e => {
        setForm({ ...form, email: e.target.value });
      },
      validation: v =>
        validations.validEmail('Please enter a valid email address', v),
    },
    {
      title: 'Avatar',
      attributes: { value: form.avatar },
      onChange: e => {
        setForm({ ...form, avatar: e.target.value });
      },
    },
  ],
  sendMessage: ({ form, setForm }: FormParams): FormProps[] => [
    {
      title: '',
      attributes: { value: form.chatMessage },
      onChange: e => {
        setForm({ ...form, chatMessage: e.target.value });
      },
      validation: v => validations.required('', v),
    },
  ],
};
