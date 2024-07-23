import { City } from 'src/cities/city.entity';
import { Competition } from 'src/competitions/competition.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => City, city => city.country)
    cities: City[];

    @ManyToMany(() => Competition, competition => competition.countries)
    competitions: Competition[];
}