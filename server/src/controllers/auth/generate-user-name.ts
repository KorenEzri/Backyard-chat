import { nanoid } from "nanoid";
import User from "../../mongo/schemas/user";
import { IName } from "../../types";

const getUserName = ({ firstName, lastName }: IName) =>
  `${firstName}_${lastName}_` + nanoid(4);

export const generateUserName = async ({ firstName, lastName }: IName) => {
  let userName = getUserName({ firstName, lastName });
  while (await User.findOne({ userName })) {
    userName = getUserName({ firstName, lastName });
  }
  return userName;
};
