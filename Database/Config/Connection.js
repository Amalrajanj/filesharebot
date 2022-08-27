import { MongoClient } from "mongodb";

let state = {
  db: null,
};

export async function connect(done) {
  const uri = process.env.DB_URL;

  const client = new MongoClient(process.env.DB_URL);

  try {
    await client.connect((err, data) => {
      if (err) return err;
      state.db = client.db("chat");
      console.log("Database connected");
    });
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const getdb = () => {
  return state.db;
};
