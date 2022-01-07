import { publicFetch } from 'network/publicFetch';
import { BaseReactError } from 'types';

export const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validations = {
  required: (message: string, v): BaseReactError | null =>
    !!v ? null : { isError: true, message },

  length: (message: string, length: number, v): BaseReactError | null =>
    v && v.length > length ? null : { isError: true, message },

  uniqueUsername: async v => {
    if (!v || v.length < 6) {
      return {
        isError: true,
        message: 'Username must be at least 6 characters long',
      };
    }

    const { ok } = await publicFetch('/auth/check-username', 'POST', {
      username: v,
    });

    if (ok) {
      return { isError: false, message: 'Username is available!' };
    } else {
      return { isError: true, message: 'Username is already taken!' };
    }
  },

  digitsOnly: v => RegExp('^[0-9]+$').test(v),

  charsOnly: v => RegExp('[^0-9()[\\]{}/*&^%|$#@!`.?,;~=]+$').test(v),

  digitsAndCharsOnly: v => RegExp('^[A-Za-z0-9_]*$').test(v),

  min2: v => v.length >= 2,

  min3: v => v.length >= 2,

  min6: v => v && v.length >= 6,

  max15: v => v.length <= 15,

  length10: v => v.length === 10,

  length9: v => v.length === 9,

  length5: v => v.length === 5,

  passwordChars: v => RegExp('^[0-9a-zA-Z~!@#$%^&*()_+.]+$').test(v),

  oneDigit: v => RegExp('[0-9]').test(v),

  oneLowerCase: v => RegExp('[a-z]').test(v),

  oneUpperCase: v => RegExp('[A-Z]').test(v),

  validEmail: (message: string, v): BaseReactError | null =>
    v === null || !v.length || emailReg.test(v)
      ? null
      : { isError: true, message },

  oneSpecialChar: v => RegExp('[~!@#$%^&*()_+.]').test(v),

  futureTimeOnly: time => (new Date(`${time}`) < new Date() ? false : true),

  futureDateOnly: date =>
    date < new Date().toISOString().substr(0, 10) ? false : true,

  date: v =>
    new Date().getFullYear() - new Date(v).getFullYear() < 8 ||
    new Date().getFullYear() - new Date(v).getFullYear() > 100
      ? false
      : true,
};
