import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Personnes} from "./personnes.entity";
import {Repository} from "typeorm";
import {PersonnesDTO} from "./personnes.dto";

@Injectable()
export class PersonnesService {
    constructor(
        @InjectRepository(Personnes)
        private personnesRepository: Repository<Personnes>,
    ) {}

    async findAll(){
        return await this.personnesRepository.find();
    }

    async findOne(id: number): Promise<Personnes>{
        return this.personnesRepository.findOne(id);
    }

    async create(data: PersonnesDTO){
        const personne = this.personnesRepository.create(data);
        await this.personnesRepository.save(data);
        return personne;
    }

    async update(id: number, data: Partial<PersonnesDTO>){
        await this.personnesRepository.update({id},data);
    }

    async destroy(id: number){
        await this.personnesRepository.delete({id})
    }
}
