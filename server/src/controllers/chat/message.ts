import { createError } from "../../errors";
import Logger from "../../logger/logger";
import Channel from "../../mongo/schemas/channel";
import { ChatRequest, ChatResponse } from "../../types";

export const getAllMessages = async (req: ChatRequest, res: ChatResponse) => {
  const { channelId } = req.body;

  if (!channelId) {
    return createError("error occurred", 500);
  }

  try {
    const channelMessages = await Channel.findOne(
      { _id: channelId },
      { select: "messages" }
    )
      .populate({
        path: "messages",
        select: "-to -channelId -updateAt",
        populate: {
          path: "from",
          select: "username",
        },
      })
      .lean();

    if (!channelMessages?.messages?.length) {
      return;
    }

    const allUsers = channelMessages.messages
      ?.map((m) => {
        return {
          username: (m.from as any).username,
          _id: (m.from as any)._id,
          color: rainbow(
            channelMessages.messages.length,
            Math.floor(Math.random() * 100)
          ),
        };
      })
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t._id === value._id)
      );

    channelMessages.messages?.forEach(
      (m) =>
        ((m as any).from = allUsers.find((u) => u._id === (m as any).from._id))
    );

    res.json({ messages: channelMessages.messages });
  } catch ({ message }) {
    Logger.error(message);
    return createError(`${message}`, 500);
  }
};

/**
 * @param numOfSteps: Total number steps to get color, means total colors
 * @param step: The step number, means the order of the color
 */
function rainbow(numOfSteps: number, step: number) {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  var r, g, b;
  var h = step / numOfSteps;
  var i = ~~(h * 6);
  var f = h * 6 - i;
  var q = 1 - f;
  switch (i % 6) {
    case 0:
      r = 1;
      g = f;
      b = 0;
      break;
    case 1:
      r = q;
      g = 1;
      b = 0;
      break;
    case 2:
      r = 0;
      g = 1;
      b = f;
      break;
    case 3:
      r = 0;
      g = q;
      b = 1;
      break;
    case 4:
      r = f;
      g = 0;
      b = 1;
      break;
    case 5:
      r = 1;
      g = 0;
      b = q;
      break;
  }

  // @ts-ignore
  var c =
    "#" +
    // @ts-ignore
    ("00" + (~~(r * 255)).toString(16)).slice(-2) +
    // @ts-ignore
    ("00" + (~~(g * 255)).toString(16)).slice(-2) +
    // @ts-ignore
    ("00" + (~~(b * 255)).toString(16)).slice(-2);
  return c;
}
