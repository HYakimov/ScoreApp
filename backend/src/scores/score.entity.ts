import { MAX_SCORE, MIN_SCORE } from 'src/constants';
import { CustomException } from 'src/exceptions';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Score {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @OneToOne(() => User, user => user.score)
  @JoinColumn({ name: 'userId' })
  user: User;


  public getScoreValidation(): void {
    return this.validateScore();
  }

  private validateScore(): void {
    if (this.value < MIN_SCORE || this.value > MAX_SCORE) {
      throw CustomException.BadRequest("Minimum score is " + MIN_SCORE + " and maximum score is " + MAX_SCORE + ".");
    }
  }

}