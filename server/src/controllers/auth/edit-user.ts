import { friendsFields } from "../../consts";
import { createError } from "../../errors";
import User from "../../mongo/schemas/user";
import { ChatRequest, ChatResponse, IUser, IUserKeys } from "../../types";

export const editUser = async (req: ChatRequest, res: ChatResponse) => {
  const {
    firstName = null,
    lastName = null,
    avatar = null,
    username = null,
  } = req.body;

  const payload: Partial<IUser> = {
    firstName,
    lastName,
    avatar,
    username,
  };

  Object.keys(payload).forEach((key) => {
    if (payload[key as IUserKeys] === null) {
      delete payload[key as IUserKeys];
    }
  });

  if (!Object.keys(payload).length) {
    createError("data missing", 400);
  }

  const user = await User.findByIdAndUpdate(req.userId, payload, {
    new: true,
  })
    .populate({
      path: "friends",
      select: friendsFields,
    })
    .populate({ path: "channels", select: "-channelName" })
    .lean();

  if (!user) {
    return createError("error occurred", 400);
  }

  delete user.password;

  res.json({ user });
};
