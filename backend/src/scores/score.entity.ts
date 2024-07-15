import { Competition } from 'src/competition/competition.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Score {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @ManyToOne(() => User, user => user.scores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Competition, c => c.scores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'competitionId' })
  competition: Competition;
}