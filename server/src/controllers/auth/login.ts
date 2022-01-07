import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../auth/access-token";
import {
  generateRefreshToken,
  verifyRefreshToken,
} from "../../auth/refresh-token";
import { friendsFields } from "../../consts";
import { createError } from "../../errors";
import User from "../../mongo/schemas/user";
import { ChatRequest, ChatResponse } from "../../types";

export const login = async (req: ChatRequest, res: ChatResponse) => {
  const { password, username } = req.body;

  if (!password || !username) {
    createError("content missing", 400);
  }

  const user = await User.findOne({ username }).populate({
    path: "friends",
    select: friendsFields,
  });

  if (!user) {
    return createError("error occurred", 500);
  }

  const isPassOk = bcrypt.compareSync(password, user.password!);

  if (!isPassOk) {
    createError("One of the fields incorrect", 500);
  } // TODO better response

  delete user?.password;

  const accessToken = generateAccessToken(user._id, user.username, user.role);

  const refreshToken = await generateRefreshToken(
    user._id,
    username,
    user.role
  );
  res.json({ accessToken, refreshToken, user });
};

export const loginWithToken = async (req: ChatRequest, res: ChatResponse) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    createError("token missing", 400);
  }

  const data = verifyRefreshToken(refreshToken);

  if (!data) {
    return createError("token missing", 400);
  }

  const { userId } = data;

  if (!userId) {
    createError("invalid token", 400);
  }

  const user = await User.findById(userId)
    .populate({
      path: "friends",
      select: friendsFields,
    })
    .lean();

  if (!user) {
    return createError("error occurred", 500);
  }

  delete user.password;

  const accessToken = generateAccessToken(userId, user.username, user.role);

  res.json({ user, accessToken });
};
