import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Personnes} from "../personnes/personnes.entity";
import {Vehicules} from "../vehicules/vehicules.entity";

@Entity()
export class Garage{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type=>Personnes, personne=>personne.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personne: Personnes;

    @ManyToOne(type=> Vehicules, vehicule=>vehicule.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    vehicule: Vehicules;

}
