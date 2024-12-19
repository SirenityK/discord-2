import * as z from "zod"
import * as imports from "../schemas"
import { CompleteUser, RelatedUserModel, CompleteMember, RelatedMemberModel, CompleteChannel, RelatedChannelModel } from "./index"

export const ServerModel = z.object({
  id: z.string().uuid(),
  /**
   * zod.custom(imports.imageExtension)
   */
  imageExtension: z.string(),
  name: z.string().min(8, { message: "The server name must be at least 8 characters long" }).trim(),
  ownerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteServer extends z.infer<typeof ServerModel> {
  owner: CompleteUser
  members: CompleteMember[]
  channels: CompleteChannel[]
}

/**
 * RelatedServerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedServerModel: z.ZodSchema<CompleteServer> = z.lazy(() => ServerModel.extend({
  owner: RelatedUserModel,
  members: RelatedMemberModel.array(),
  channels: RelatedChannelModel.array(),
}))
