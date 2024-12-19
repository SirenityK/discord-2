import { z } from "zod";
import {
  ChannelModel,
  MessageModel,
  ServerModel,
  UserModel,
} from "../../prisma/zod";

export async function validateData<T extends z.ZodType, K extends z.infer<T>>(
  data: FormData,
  zodSchema: T,
) {
  const formDataObj = Object.fromEntries(data.entries());
  const parsedData: z.SafeParseReturnType<K, K> =
    await zodSchema.safeParseAsync(formDataObj);
  return parsedData;
}

export function toFormData<T extends Record<string, string>>(
  data: T,
): FormData {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}

export const loginFormSchema = UserModel.pick({
  email: true,
  password: true,
});

export const registerFormSchema = UserModel.pick({
  name: true,
  email: true,
  password: true,
});

export const createServerFormSchema = ServerModel.pick({
  name: true,
});

export const postMessageFormSchema = MessageModel.pick({
  content: true,
  channelId: true,
});

export const openServerFormSchema = z.object({
  serverId: ServerModel.shape.id,
  channelId: ChannelModel.shape.id,
});

export const openChannelFormSchema = z.object({
  channelId: ChannelModel.shape.id,
  serverId: ChannelModel.shape.serverId,
});
