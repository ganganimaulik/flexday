import { Entity, Schema } from "redis-om";
import client from "./redis-client.js";

class User extends Entity {}

const userSchema = new Schema(User, {
  name: { type: "string" },
  email: { type: "string" },
  dob: { type: "date" },
  address: { type: "text" },
});

export const userRepository = client.fetchRepository(userSchema);
await userRepository.createIndex();
