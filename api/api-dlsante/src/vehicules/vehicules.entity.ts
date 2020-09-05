import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Garage} from "../garage/garage.entity";

@Entity()
export class Vehicules{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom_marque: string;

    @Column()
    num_modele: number;

    @OneToMany(type=>Garage, garage=>garage.vehicule)
    garages: Garage[]
}
