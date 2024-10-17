import { DataSource } from "typeorm";
import { FindUserByUsernameRepository } from "../../../domain/repositories/find_user_by_username";
import { User } from "../../../domain/entities/user/User";
import { NotFoundError } from "../../../errors";

export class DbFindUserByUsernameRepository implements FindUserByUsernameRepository {
  constructor(private readonly dataSource: DataSource) {}

  async call(username: string): Promise<User> {
    try {
      const user = await this.dataSource.getRepository(User).findOne({ where: { username } });
      return user;
    } catch (e) {
      console.log(e);
      throw new NotFoundError("User not found");
    }
  }
}
