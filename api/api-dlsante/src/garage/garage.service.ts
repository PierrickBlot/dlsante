import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Garage} from "./garage.entity";
import {GarageDTO} from "./garage.dto";
import {Personnes} from "../personnes/personnes.entity";
import {Vehicules} from "../vehicules/vehicules.entity";

@Injectable()
export class GarageService {
    constructor(
        @InjectRepository(Garage)
        private garageRepository: Repository<Garage>,
        @InjectRepository(Personnes)
        private personnesService: Repository<Personnes>,
        @InjectRepository(Vehicules)
        private vehiculesService: Repository<Vehicules>
    ) {}

    async findAll(){
        return await this.garageRepository.find();
    }

    async findByPersonne(idPersonne: number){
        const _personne = await this.personnesService.findOne(idPersonne)
        const _garage = await this.garageRepository.find({where: {personne: _personne},relations:["vehicule"]})
        const vehicules = [];
        return _garage
    }

    async create(data: GarageDTO){
        const _garage = new Garage();
        _garage.personne = await this.personnesService.findOne(data.id_personnes);
        _garage.vehicule = await this.vehiculesService.findOne(data.id_vehicules);
        await this.garageRepository.save(_garage);
        return _garage;
    }

    async destroy(id: number){
        await this.garageRepository.delete({id})
    }
}
