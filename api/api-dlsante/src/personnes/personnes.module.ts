import { Module } from '@nestjs/common';
import { PersonnesController } from './personnes.controller';
import { PersonnesService } from './personnes.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Personnes} from "./personnes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Personnes])],
  controllers: [PersonnesController],
  providers: [PersonnesService]
})
export class PersonnesModule {}
