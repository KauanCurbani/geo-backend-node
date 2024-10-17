import { DataSource } from "typeorm";
import { User } from "../../../domain/entities/user/User";
import { RegisterUserRepository } from "../../../domain/repositories/register_user_repository";

export class DbRegisterUserRepository implements RegisterUserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async call(user: User): Promise<User> {
    try {
      await this.dataSource.getRepository(User).save(user);
      return user;
    } catch (e) {
      console.log(e);
      throw new Error("Error registering user");
    }
  }
}
