import { User } from "../entities/user/User";

export interface RegisterUserRepository {
  call(user: User): Promise<User>;
}
