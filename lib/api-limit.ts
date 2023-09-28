import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increateLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userLimit = await prismadb.userLimit.findUnique({
    where: {
      userId,
    },
  });
  if (userLimit) {
    await prismadb.userLimit.update({
      where: {
        userId,
      },
      data: {
        count: userLimit.count + 1,
      },
    });
  } else {
    await prismadb.userLimit.create({
      data: {
        userId: userId,
        count: 1,
      },
    });
  }
};

export const checkLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const userLimit = await prismadb.userLimit.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!userLimit || userLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }

  const userLimit = await prismadb.userLimit.findUnique({
    where: {
      userId,
    },
  });
  if (!userLimit) {
    return 0;
  }
  return userLimit.count;
};
