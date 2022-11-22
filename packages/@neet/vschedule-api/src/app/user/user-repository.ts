import { User } from '../../domain/entities/user/user';
import { UserEmail } from '../../domain/entities/user/user-email';
import { UserId } from '../../domain/entities/user/user-id';

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  create(user: User): Promise<User>;
}
