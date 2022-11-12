import { User, UserEmail, UserId } from '../entities/User';

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  create(user: User): Promise<User>;
}
