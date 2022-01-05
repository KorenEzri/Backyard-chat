export const formInputs = {
  login: (form: React.ComponentState, setForm: React.SetStateAction<any>) => [
    {
      title: 'Username',
      required: true,
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
      validation: (value: string) => {
        if (value && value.length < 6) {
          return 'Username must be at least 6 characters long';
        } else return null;
      },
    },
    {
      title: 'Password',
      required: true,
      attributes: { value: form.password, type: 'password' },
      onChange: e => {
        setForm({ ...form, password: e.target.value });
      },
      validation: (value: string) => {
        if (value && value.length < 6) {
          return 'Password must be at least 6 characters long';
        } else return null;
      },
    },
  ],
  register: (
    form: React.ComponentState,
    setForm: React.SetStateAction<any>,
  ) => [
    {
      title: 'First name',
      attributes: { value: form.firstName },
      onChange: e => {
        setForm({ ...form, firstName: e.target.value });
      },
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
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
    },
    {
      title: 'Username',
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
    },
    {
      title: 'Username',
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
    },
    {
      title: 'Username',
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
    },
    {
      title: 'Username',
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
    },
    {
      title: 'Username',
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
    },
    {
      title: 'Username',
      attributes: { value: form.username },
      onChange: e => {
        setForm({ ...form, username: e.target.value });
      },
    },
    {
      title: 'Password',
      attributes: { value: form.password, type: 'password' },
      onChange: e => {
        setForm({ ...form, password: e.target.value });
      },
    },
  ],
};
