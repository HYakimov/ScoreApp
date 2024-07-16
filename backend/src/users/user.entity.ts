import { City } from 'src/cities/city.entity';
import { Country } from 'src/countries/country.entity';
import { Score } from 'src/scores/score.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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

    @ManyToOne(() => City)
    @JoinColumn({ name: 'cityId' })
    city: City;

    @Column()
    gender: string;

    @Column()
    email: string;

    @Column()
    avatarPath: string;
}