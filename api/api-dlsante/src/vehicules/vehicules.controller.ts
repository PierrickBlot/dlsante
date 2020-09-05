import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {VehiculesService} from "./vehicules.service";
import {vehiculesDTO} from "./vehicules.dto";



@Controller('vehicules')
export class VehiculesController {
    constructor(private vehiculeService: VehiculesService) {}

    @Get()
    async findAll(){
        return{
            statusCode: HttpStatus.OK,
            message: "get all vehicule",
            data: await this.vehiculeService.findAll()
        }
    }
    @Post()
    async createVehicule(@Body() data: vehiculesDTO){
        return{
            statusCode: HttpStatus.CREATED,
            message: "Vehicule created",
            data: await this.vehiculeService.create(data)

        }
    }

    @Put(':id')
    async updateVehicules(@Param('id') id: number, @Body() data: Partial<vehiculesDTO>){
        return{
            statusCode : HttpStatus.OK,
            message: 'Vehicule updated',
            data: await this.vehiculeService.update(id, data)
        }
    }

    @Delete(':id')
    async deleteVehicules(@Param("id") id:number){
        return{
            statusCode: HttpStatus.OK,
            message: "Vehicule deleted",
            data: await this.vehiculeService.destroy(id)
        }
    }

}
