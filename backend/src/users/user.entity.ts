import { MAX_AGE, MAX_SCORE, MIN_AGE, MIN_SCORE } from 'src/constants';
import { Country } from 'src/countries/country.entity';
import { CustomException } from 'src/exceptions';
import { Score } from 'src/scores/score.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(() => Score, score => score.user)
    scores: Score[];

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'countryId' })
    country: Country;

    @Column()
    city: number;

    @Column()
    gender: string;

    @Column()
    email: string;

    @Column()
    avatarPath: string;

    // public getValidation(): void {
    //     return this.formatAndValidateData();
    // }

    // private formatAndValidateData(): void {
    //     this.validateName(this.firstName, 'First name');
    //     this.validateName(this.lastName, 'Last name');
    //     this.validateAge(this.age);
    // }

    // private validateName(name: string, fieldName: string): void {
    //     const containsDigits = /\d/.test(name);
    //     if (containsDigits) {
    //         throw CustomException.BadRequest(`${fieldName} must contain only letters.`);
    //     }
    // }

    // private validateAge(age: number): void {
    //     if (age < MIN_AGE || age > MAX_AGE) {
    //         throw CustomException.BadRequest("Minimum age is " + MIN_AGE + " and maximum age is " + MAX_AGE + ".");
    //     }
    // }


}