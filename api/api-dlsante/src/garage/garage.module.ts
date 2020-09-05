import { Module } from '@nestjs/common';
import { GarageService } from './garage.service';
import { GarageController } from './garage.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Garage} from "./garage.entity";
import {PersonnesService} from "../personnes/personnes.service";
import {VehiculesService} from "../vehicules/vehicules.service";
import {Personnes} from "../personnes/personnes.entity";
import {Vehicules} from "../vehicules/vehicules.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Garage, Personnes, Vehicules])],
  providers: [GarageService, PersonnesService, VehiculesService],
  controllers: [GarageController]
})
export class GarageModule {}
