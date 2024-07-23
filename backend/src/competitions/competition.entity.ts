import { Country } from "src/countries/country.entity";
import { Score } from "src/scores/score.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Competition {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Score, score => score.competition)
    scores: Score[];

    @ManyToMany(() => Country, country => country.competitions)
    @JoinTable()
    countries: Country[];
}