import {Body, Controller, Delete, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {GarageService} from "./garage.service";
import {GarageDTO} from "./garage.dto";

@Controller('garage')
export class GarageController {
    constructor(private garageService: GarageService) {}

    @Get()
    async findAll(){
        return{
            statusCode: HttpStatus.OK,
            message: "Get all garage",
            data: await this.garageService.findAll(),
        }
    }

    @Post()
    async createGarage(@Body() data: GarageDTO){
        return{
            statusCode: HttpStatus.OK,
            message: "Added to the garage",
            data: await this.garageService.create(data)
        }
    }

    @Get(':id')
    async getVehiculeByPersonne(@Param('id') id: number){
        return{
            statusCode: HttpStatus.OK,
            message: "Vehicules found",
            data: await this.garageService.findByPersonne(id),
        }
    }

    @Delete(':id')
    async destroy(@Param('id') id:number){
        return{
            statusCode: HttpStatus.OK,
            message: 'Vehicule removed',
            data: await this.garageService.destroy(id)
        }
    }
}
