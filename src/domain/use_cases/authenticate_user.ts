import { compare } from "bcrypt";
import { FindUserByUsernameRepository } from "../repositories/find_user_by_username";
import { sign } from "jsonwebtoken";
import { env } from "../../utils/env";

export class AuthenticateUser {
  constructor(private readonly findUserByUsername: FindUserByUsernameRepository) {}

  async call({ username, password }: { username: string; password: string }) {
    const user = await this.findUserByUsername.call(username);
    if (!user) throw new Error("User not found");

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid password");

    return { token: sign({ user }, env.JWT_SECRET, { expiresIn: "1d" }) };
  }
}
