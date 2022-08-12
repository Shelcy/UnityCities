import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { FilterWorldDto, WorldDto } from '../dto/world.dto';
import { WorldService } from '../service/world.service';

@Controller('world')
export class WorldController {
    constructor(public worldService:WorldService){
    }

    @Post('create')
    world(@Body() body:WorldDto){
        // console.log(body)
        return this.worldService.world(body)
    }

    @Get('read')
    worldRead(){
        // console.log(this.worldService.worldRead())
        return this.worldService.worldRead()  
    }

    @Get('read/:campaign')
    worldFind(@Param() body:FilterWorldDto){
        // console.log(body)
        return this.worldService.worldFind(body)
    }
}


