import { Module } from '@nestjs/common';
import { VehiculesController } from './vehicules.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Vehicules} from "./vehicules.entity";
import { VehiculesService } from './vehicules.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicules])],
  controllers: [VehiculesController],
  providers: [VehiculesService],
})
export class VehiculesModule {}
