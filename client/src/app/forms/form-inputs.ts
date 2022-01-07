import { validations } from 'app/forms';
import { FormProps } from 'types';

export const formInputs = {
  login: (
    form: React.ComponentState,
    setForm: React.SetStateAction<any>,
  ): FormProps[] => [
    {
      title: 'Username',
      required: true,
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
      validation: v =>
        validations.length('Username must be at least 6 characters long', 6, v),
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
  ],
  register: (
    form: React.ComponentState,
    setForm: React.SetStateAction<any>,
  ): FormProps[] => [
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
      required: true,
      attributes: { value: form.avatar },
      onChange: e => {
        setForm({ ...form, avatar: e.target.value });
      },
    },
  ],
};
