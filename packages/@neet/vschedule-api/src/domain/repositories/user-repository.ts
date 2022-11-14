import { User, UserEmail, UserId } from '../entities/user';

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  create(user: User): Promise<User>;
}
