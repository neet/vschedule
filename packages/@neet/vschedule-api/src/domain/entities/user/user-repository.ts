import { User } from './user';
import { UserEmail } from './user-email';
import { UserId } from './user-id';

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  create(user: User): Promise<User>;
}
