import { nanoid } from "nanoid";
import User from "../../mongo/schemas/user";
import { IName } from "../../types";

const getUserName = ({ firstName, lastName }: IName) =>
  `${firstName}_${lastName}_` + nanoid(4);

export const generateUserName = async ({ firstName, lastName }: IName) => {
  let username = getUserName({ firstName, lastName });
  while (await User.findOne({ username })) {
    username = getUserName({ firstName, lastName });
  }
  return username;
};
