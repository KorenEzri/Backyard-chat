import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../auth/access-token";
import { generateRefreshToken } from "../../auth/refresh-token";
import { createError } from "../../errors";
import Logger from "../../logger/logger";
import User from "../../mongo/schemas/user";
import { ChatRequest, ChatResponse, IUser } from "../../types";
import { userValidationSchema } from "../../validations";
import { generateUserName } from "./generate-user-name";

export const register = async (req: ChatRequest, res: ChatResponse) => {
  const {
    firstName,
    lastName,
    avatar = null,
    email,
    password,
    language,
  } = req.body;

  const payload: Partial<IUser> = {
    firstName,
    lastName,
    avatar,
    email,
    password,
    language,
  };

  if (!avatar) {
    delete payload.avatar;
  }

  try {
    await userValidationSchema.validateAsync(payload);

    const isUserExists = await User.findOne({ email, isVerified: true });

    if (isUserExists) {
      createError("error occurred", 400);
    }

    const passwordHash = bcrypt.hashSync(payload.password!, 8);

    payload.password = passwordHash;
    payload.userName = await generateUserName({ firstName, lastName });

    const newUser = new User(payload);

    const user = await newUser.save();

    const accessToken = generateAccessToken(
      user._id,
      newUser.userName,
      newUser.role
    );

    const refreshToken = await generateRefreshToken(
      user._id,
      newUser.userName,
      newUser.role
    );

    delete user.password;

    // TODO send mail
    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    Logger.error(err);
    createError("error occurred", 400);
  }
};

export const checkIfUserNameIsValid = async (
  req: ChatRequest,
  res: ChatResponse
) => {
  const { userName } = req.body;

  if (userName?.length < 6) {
    return res.json({ ok: false });
  }

  const isUserExists = await User.findOne({ userName });

  if (isUserExists) {
    return res.json({ ok: false });
  }

  return res.json({ ok: true });
};
