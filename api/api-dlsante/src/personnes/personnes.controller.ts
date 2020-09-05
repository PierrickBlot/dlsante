import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {PersonnesService} from "./personnes.service";
import {PersonnesDTO} from "./personnes.dto";

@Controller('personnes')
export class PersonnesController {
    constructor(private personneService: PersonnesService) {}

    @Get()
    async findAll(){
        return {
            statusCode: HttpStatus.OK,
            data: await this.personneService.findAll(),
        }
    }

    @Get(':id')
    async findOne(@Param() params){
        return{
            data: await this.personneService.findOne(params.id),
            statusCode: HttpStatus.OK
        }
    }

    @Post()
    async createPersonnes(@Body() data: PersonnesDTO){
        return{
            statusCode: HttpStatus.OK,
            message: "One user added",
            data: await this.personneService.create(data)
        };
    }

    @Put(':id')
    async updatePersonnes(@Param('id') id: number, @Body() data: Partial<PersonnesDTO>){
        return{
            statusCode : HttpStatus.OK,
            message: 'User updated',
            data: await this.personneService.update(id, data)
        }
    }
    @Delete(':id')
    async deletePersonnes(@Param('id') id: number){
        return{
            statusCode: HttpStatus.OK,
            message: 'User deleted',
            data: await this.personneService.destroy(id)
        }
    }
}
