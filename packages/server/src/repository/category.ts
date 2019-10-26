import DataLoader from 'dataloader';
import { EntityRepository, EntityManager } from 'typeorm';
import { Category } from 'src/entity/category';
import { Genre } from '@ril/gateway';

interface GetAllAndCountParams {
  limit?: number;
  offset?: number;
  order?: 'ASC' | 'DESC';
}

@EntityRepository(Category)
export class CategoryRepostiory {
  constructor(private readonly manager: EntityManager) {}

  find = new DataLoader<string, Category>(ids => {
    return this.manager
      .getRepository(Category)
      .createQueryBuilder('category')
      .whereInIds(ids)
      .getMany();
  });

  getAllAndCount = async (params: GetAllAndCountParams = {}) => {
    const { limit = 100, offset = 0, order = 'ASC' } = params;

    const query = this.manager
      .getRepository(Category)
      .createQueryBuilder('category')
      .orderBy('category.id', order)
      .skip(offset)
      .take(Math.min(limit, 100));

    return await query.getManyAndCount();
  };

  createFromGatewayData = (data: Genre) => {
    const category = new Category();
    category.id = data.id.toString();
    category.name = data.name;
    return this.manager.save(category);
  };
}
