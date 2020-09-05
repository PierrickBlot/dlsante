import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Garage} from "../garage/garage.entity";

@Entity()
export class Personnes{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @OneToMany(type=>Garage, garage=>garage.personne)
    garages: Garage[]

}
