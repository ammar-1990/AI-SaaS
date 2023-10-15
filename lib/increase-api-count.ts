import { auth } from "@clerk/nextjs";
import db from "./prismadb";
import { MAX_API_REQUESTS } from "./constants";

export const increaseApiCount = async () => {
  const { userId } = auth();
  if (!userId) return;

  const apiCount = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (apiCount) {
    await db.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: apiCount.count + 1,
      },
    });
  } else {
    await db.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    });
  }
};

export const checkUserLimit = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const apiCount = await db.userApiLimit.findUnique({
    where: { userId },
  });

  if (!apiCount || apiCount.count < MAX_API_REQUESTS) {
    return true;
  } else {
    return false;
  }
};


export const getApiCount = async()=>{


  const { userId } = auth()

  if(!userId) return 0

  const userApiCount = await db.userApiLimit.findUnique({
    where:{
      userId
    }
  })

  if(!userApiCount) return 0 

  return userApiCount.count

}
