import * as z from "zod"
import * as imports from "../schemas"
import { CompleteServer, RelatedServerModel, CompleteMessage, RelatedMessageModel } from "./index"

export const ChannelModel = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: "The channel name must be at least 1 character long" }).trim(),
  serverId: z.string(),
  default: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteChannel extends z.infer<typeof ChannelModel> {
  server: CompleteServer
  messages: CompleteMessage[]
}

/**
 * RelatedChannelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChannelModel: z.ZodSchema<CompleteChannel> = z.lazy(() => ChannelModel.extend({
  server: RelatedServerModel,
  messages: RelatedMessageModel.array(),
}))
