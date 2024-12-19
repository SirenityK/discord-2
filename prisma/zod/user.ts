import * as z from "zod"
import * as imports from "../schemas"
import { CompleteServer, RelatedServerModel, CompleteMember, RelatedMemberModel, CompleteMessage, RelatedMessageModel } from "./index"

export const UserModel = z.object({
  id: z.string().cuid(),
  name: z.string().min(8, { message: "Your username must be at least 8 characters long" }).trim(),
  email: z.string().email(),
  password: imports.passwordSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  servers: CompleteServer[]
  memberOn: CompleteMember[]
  messages: CompleteMessage[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  servers: RelatedServerModel.array(),
  memberOn: RelatedMemberModel.array(),
  messages: RelatedMessageModel.array(),
}))
