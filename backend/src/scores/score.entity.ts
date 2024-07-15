import { Competition } from 'src/competition/competition.entity';
import { MAX_SCORE, MIN_SCORE } from 'src/constants';
import { CustomException } from 'src/exceptions';
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

  public getScoreValidation(): void {//TODO: What is the point of this method
    return this.validateScore();
  }

  private validateScore(): void {
    if (this.value < MIN_SCORE || this.value > MAX_SCORE) {
      throw CustomException.BadRequest("Minimum score is " + MIN_SCORE + " and maximum score is " + MAX_SCORE + ".");
    }
  }
}