import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Genre } from '@ril/gateway';

@Entity()
export class Category {
  static fromGatewayData(data: Genre) {
    const category = new Category();
    category.id = data.id.toString();
    category.name = data.name;
    return category;
  }

  toResponse() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;
}