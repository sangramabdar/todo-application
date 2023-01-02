import Database from "../../config/db";

async function saveUser(user: any) {
  const db = await Database.getDb();

  let insertResult = await db.collection("users").insertOne(user);

  return insertResult;
}

async function getUserByEmail(email: string) {
  const db = await Database.getDb();

  const user = await db.collection("users").findOne(
    {
      email,
    },
    {
      projection: {
        email: 1,
        password: 1,
      },
    }
  );

  if (!user) return null;
  return user;
}

export { saveUser, getUserByEmail };
