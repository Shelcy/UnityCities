import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './services/database.services';
import { DatabaseController } from './controllers/database.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Config
 */

import { ConfigType } from '@nestjs/config'
import config from 'src/config';

/**
 * Models
 */

import { TbWorldType } from '../../models/TbWorldType';
import { TbWorld } from '../../models/TbWorld';
import { TbBuildings } from 'src/models/TbBuildings';
import { TbCities } from 'src/models/TbCities';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: async (configService: ConfigType<typeof config>) => {
                const { database, password, username, host, port } = configService.traininglab
                return {
                    type: 'mssql',
                    database,
                    host: `${host}`,
                    username: username,
                    password, 
                    "synchronize": false,
                    entities:[
                        TbBuildings,
                        TbWorld,
                        TbWorldType,
                        TbCities
                    ],
                    autoLoadEntities: false,
                    requestTimeout: 130000000,
                    logging: false
                }   
            }
        }),
    ],
    exports: [TypeOrmModule, DatabaseService],
    providers: [DatabaseService],
    controllers: [DatabaseController]
})
export class DatabaseModule { }