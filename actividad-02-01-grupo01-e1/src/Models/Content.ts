import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('nested-set')
export class Content {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 30 })
  name: string;
  @Column({ type: 'varchar', length: 10 })
  type: string;
  @Column({ type: 'int' })
  size: number;
  @TreeParent()
  parent: Content;

  @TreeChildren()
  children: Content[];
}
