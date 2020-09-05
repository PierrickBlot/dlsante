import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Vehicules} from "./vehicules.entity";
import {vehiculesDTO} from "./vehicules.dto";

@Injectable()
export class VehiculesService {
    constructor(
        @InjectRepository(Vehicules)
        private vehiculesRepository: Repository<Vehicules>,
    ) {}

    async findAll(){
        return await this.vehiculesRepository.find();
    }

    async create(data: vehiculesDTO){
        const vehicules = this.vehiculesRepository.create(data);
        await this.vehiculesRepository.save(data);
        return vehicules;
    }

    async update(id: number, data: Partial<vehiculesDTO>){
        await this.vehiculesRepository.update({id},data);
    }

    async destroy(id: number){
        await this.vehiculesRepository.delete({id})
    }
}
