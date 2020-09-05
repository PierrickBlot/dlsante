import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonnesModule } from './personnes/personnes.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { VehiculesModule } from './vehicules/vehicules.module';
import {GarageModule} from "./garage/garage.module";
import {Garage} from "./garage/garage.entity";
import {Vehicules} from "./vehicules/vehicules.entity";
import {Personnes} from "./personnes/personnes.entity";


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'dlsante',
    password: 'dlsante2020',
    database: 'dlsante',
    entities: [Garage,Personnes,Vehicules],
    synchronize: true,
  }),PersonnesModule, VehiculesModule, GarageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
