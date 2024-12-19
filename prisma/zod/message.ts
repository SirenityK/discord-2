import * as z from "zod"
import * as imports from "../schemas"
import { CompleteChannel, RelatedChannelModel, CompleteUser, RelatedUserModel } from "./index"

export const MessageModel = z.object({
  id: z.string().uuid(),
  content: z.string().min(1).trim(),
  channelId: z.string(),
  authorId: z.string(),
  edited: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMessage extends z.infer<typeof MessageModel> {
  channel: CompleteChannel
  author: CompleteUser
}

/**
 * RelatedMessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMessageModel: z.ZodSchema<CompleteMessage> = z.lazy(() => MessageModel.extend({
  channel: RelatedChannelModel,
  author: RelatedUserModel,
}))
