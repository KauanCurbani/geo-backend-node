import { User } from "../entities/user/User";

export interface FindUserByUsernameRepository {
  call(username: string): Promise<User>;
}
