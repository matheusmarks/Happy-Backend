import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Orphanages from './Orphanages';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Orphanages, orphanage => orphanage.image)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanages;
}
