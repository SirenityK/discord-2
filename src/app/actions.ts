"use server";

import "server-only";

import {
  createServerFormSchema,
  loginFormSchema,
  openChannelFormSchema,
  openServerFormSchema,
  postMessageFormSchema,
  registerFormSchema,
  validateData,
} from "@/app/helpers";
import db from "@/db";
import { hash, authenticatePassword as verifyPassword } from "@/hasher";
import { getIronSession, type SessionOptions } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { UserModel } from "../../prisma/zod";

const clientSessionSchema = UserModel.omit({
  updatedAt: true,
  createdAt: true,
}).extend({
  currentChannelId: z.string().optional(),
  currentServerId: z.string().optional(),
  theme: z.string().optional(),
});

type SessionData = z.infer<typeof clientSessionSchema>;

const sessionConfig: SessionOptions = {
  password: process.env.SECRET_KEY || "9EkNz-?+~6o*UB7v,GBJY0)N5RPzjo-6",
  cookieName: "session",
  cookieOptions: {
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14 - 60,
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionConfig,
  );

  return session;
}

export async function queryMessages(channelId: string) {
  const messages = await db.message.findMany({
    where: { channelId },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return messages;
}

export async function addUserToServer(id: string, serverId: string) {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      servers: {
        connect: {
          id: serverId,
        },
      },
    },
  });
}

export async function removeUserFromServer(id: string, serverId: string) {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      servers: {
        disconnect: {
          id: serverId,
        },
      },
    },
  });
}

export async function addChannelToServer(
  serverId: string,
  name: string,
  isDefault = false,
) {
  return await db.channel.create({
    data: {
      name,
      serverId,
      default: isDefault,
    },
  });
}

export async function removeChannelFromServer(channelId: string) {
  return await db.channel.delete({
    where: {
      id: channelId,
    },
  });
}

export async function addMessageToChannel(
  channelId: string,
  content: string,
  authorId: string,
) {
  return await db.message.create({
    data: {
      content,
      channelId,
      authorId,
    },
  });
}

export async function login(formData: FormData) {
  const session = await getSession();
  const parsedData = await validateData(formData, loginFormSchema);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const user = await db.user.findUnique({
    where: {
      email: parsedData.data.email,
    },
  });

  if (!user) {
    return {
      errors: {
        email: ["User not found"],
      },
    };
  } else if (await verifyPassword(parsedData.data.password, user.password)) {
    session.name = user.name;
    session.email = user.email;
    session.id = user.id;
    await session.save();
    revalidatePath("/login");
    redirect("/dashboard");
  }
  return {
    errors: {
      password: ["Incorrect password"],
    },
  };
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  revalidatePath("/");
  redirect("/");
}

export async function register(formData: FormData) {
  const session = await getSession();
  const parsedData = await validateData(formData, registerFormSchema);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const foundUser = await db.user.findUnique({
    where: {
      email: parsedData.data.email,
    },
  });

  if (foundUser) {
    return {
      errors: {
        email: ["Email already in use"],
      },
    };
  }

  const user = await db.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.email,
      password: await hash(parsedData.data.password),
    },
  });

  session.id = user.id;
  session.name = user.name;
  session.email = user.email;
  await session.save();

  redirect("/dashboard");
}

export async function createServerAction(formData: FormData) {
  const session = await getSession();
  const parsedData = await validateData(formData, createServerFormSchema);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const foundServer = await db.server.findUnique({
    where: {
      name: parsedData.data.name,
    },
  });

  if (foundServer) {
    return {
      errors: {
        name: ["Server name already in use"],
      },
    };
  }

  const server = await db.server.create({
    data: {
      name: parsedData.data.name,
      ownerId: session.id,
      imageExtension: "png",
      channels: {
        create: {
          name: "general",
          default: true,
          messages: {
            create: {
              content: "Welcome to the server!",
              authorId: session.id,
            },
          },
        },
      },
    },
  });

  const channel = await db.channel.findFirst({
    where: {
      serverId: server.id,
    },
  });

  session.currentServerId = server.id;
  session.currentChannelId = channel?.id;
  await session.save();

  redirect(`/dashboard/channel/${server.id}/${channel?.id}`);
}

export async function postMessage(formData: FormData) {
  const session = await getSession();

  const parsedData = await validateData(formData, postMessageFormSchema);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const message = await db.message.create({
    data: {
      content: parsedData.data.content,
      channelId: parsedData.data.channelId,
      authorId: session.id,
    },
  });

  return message;
}

export async function changeServer(formData: FormData) {
  const session = await getSession();

  const parsedData = await validateData(formData, postMessageFormSchema);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }
}

export async function openServer(formData: FormData) {
  const session = await getSession();
  const parsedData = await validateData(formData, openServerFormSchema);

  if (!parsedData.success) {
    notFound();
  }

  session.currentServerId = parsedData.data.serverId;
  session.currentChannelId = parsedData.data.channelId;
  await session.save();

  return {
    serverId: session.currentServerId,
    channelId: session.currentChannelId,
  };
}

export async function openChannel(formData: FormData) {
  const session = await getSession();
  const parsedData = await validateData(formData, openChannelFormSchema);

  if (!parsedData.success) {
    notFound();
  }

  session.currentChannelId = parsedData.data.channelId;

  await session.save();

  return {
    serverId: session.currentServerId,
    channelId: session.currentChannelId,
  };
}
