import { hash } from "bcrypt";
import { User } from "../entities/user/User";
import { RegisterUserRepository } from "../repositories/register_user_repository";

export class RegisterUser {
  constructor(private readonly registerUserRepository: RegisterUserRepository) {}

  async call(user: User): Promise<User> {
    user.password = await hash(user.password, 10);
    return this.registerUserRepository.call(user);
  }
}
