import { MAX_AGE, MAX_SCORE, MIN_AGE, MIN_SCORE } from 'src/constants';
import { Country } from 'src/countries/country.entity';
import { CustomException } from 'src/exceptions';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Score {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  score: number;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @Column()
  city: number;

  @Column()
  gender: string;

  public getValidation(): void {
    return this.formatAndValidateData();
  }

  private formatAndValidateData(): void {
    this.validateName(this.firstName, 'First name');
    this.validateName(this.lastName, 'Last name');
    this.validateAge(this.age);
    this.validateScore(this.score);
  }

  private validateName(name: string, fieldName: string): void {
    const containsDigits = /\d/.test(name);
    if (containsDigits) {
      throw CustomException.BadRequest(`${fieldName} must contain only letters.`);
    }
  }

  private validateAge(age: number): void {
    if (age < MIN_AGE || age > MAX_AGE) {
      throw CustomException.BadRequest("Minimum age is " + MIN_AGE + " and maximum age is " + MAX_AGE + ".");
    }
  }

  private validateScore(score: number): void {
    if (score < MIN_SCORE || score > MAX_SCORE) {
      throw CustomException.BadRequest("Minimum score is " + MIN_SCORE + " and maximum score is " + MAX_SCORE + ".");
    }
  }
}