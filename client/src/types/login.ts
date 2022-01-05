import {Maybe} from '.';

export interface ILoginErrors {
  email?: Maybe<string>;
  password?: Maybe<string>;
}
