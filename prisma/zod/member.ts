import * as z from "zod"
import * as imports from "../schemas"
import { CompleteUser, RelatedUserModel, CompleteServer, RelatedServerModel } from "./index"

export const MemberModel = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  serverId: z.string(),
  joinedAt: z.date(),
})

export interface CompleteMember extends z.infer<typeof MemberModel> {
  user: CompleteUser
  server: CompleteServer
}

/**
 * RelatedMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMemberModel: z.ZodSchema<CompleteMember> = z.lazy(() => MemberModel.extend({
  user: RelatedUserModel,
  server: RelatedServerModel,
}))
