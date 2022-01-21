import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../auth/access-token";
import { generateRefreshToken } from "../../auth/refresh-token";
import { createError } from "../../errors";
import Logger from "../../logger/logger";
import User from "../../mongo/schemas/user";
import { ChatRequest, ChatResponse, IUser } from "../../types";
import { userValidationSchema } from "../../validations";
import { colors } from "./colors";

export const register = async (req: ChatRequest, res: ChatResponse) => {
  const colorValues = Object.keys(colors);

  const {
    firstName,
    lastName,
    avatar = null,
    email,
    password,
    username,
  } = req.body;

  const payload: Partial<IUser> = {
    firstName,
    lastName,
    username,
    avatar,
    color: colorValues[Math.floor(Math.random() * colorValues.length)],
    email,
    password,
  };

  if (!avatar) {
    delete payload.avatar;
  }

  try {
    await userValidationSchema.validateAsync(payload);

    const doesUserExist = await User.findOne({ email, isVerified: true });

    if (doesUserExist) {
      createError("error occurred", 400);
    }

    const passwordHash = bcrypt.hashSync(payload.password!, 8);

    payload.password = passwordHash;
    payload.username = username;

    const newUser = new User(payload);

    const user = await newUser.save();

    const accessToken = generateAccessToken(
      user._id,
      newUser.username,
      newUser.role
    );

    const refreshToken = await generateRefreshToken(
      user._id,
      newUser.username,
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

export const checkIfUsernameIsValid = async (
  req: ChatRequest,
  res: ChatResponse
) => {
  const { username } = req.body;

  if (username?.length < 6) {
    return res.json({ ok: false });
  }

  const doesUserExist = await User.findOne({ username });

  if (doesUserExist) {
    return res.json({ ok: false });
  }

  return res.json({ ok: true });
};
