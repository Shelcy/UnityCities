import { Injectable } from '@nestjs/common';
import { TbBuildings } from 'src/models/TbBuildings';
import { TbCities } from 'src/models/TbCities';
import { TbWorld } from 'src/models/TbWorld';
import { exceptionHandling } from 'src/modules/common/exceptionHandling';
import { DataSource } from 'typeorm';

@Injectable()
export class WorldService {

    constructor(private connection: DataSource) { 
    }

    async world(body: any) {

        try {
             // crear nuevo usuario
            const world = new TbWorld();

            // parametros
            world.campaign = body.campaign;
            world.worldName = body.worldName;
            world.welcome = body.welcome;
            world.uiid = body.uiid;

            var saveWorld = await this.connection.getRepository(TbWorld).save(world);

            body.cities.forEach(async (element) => {
                try {
                    const cities = new TbCities();
                    cities.cityName = element.cityName;
                    cities.style = element.style;
                    cities.main = element.main;
                    cities.idWorld = saveWorld.idWorld;

                    var city = await this.connection.getRepository(TbCities).save(cities);
                } catch (error) {
                    // console.log(error);
                    return exceptionHandling("Something happened in cities, try later again.", error);
                }

                var buildings = [];
                try {
                    await element.buildings.forEach((elementBuildings) => {
                        buildings.push({
                            buildingName: elementBuildings.buildingName,
                            description: elementBuildings.description,
                            url: elementBuildings.url,
                            idCity: city.idCity,
                        });
                    });
                } catch (error) {
                    // console.log(error);
                    return exceptionHandling("Something happened in buildings, try later again.", error);
                }

                try {
                    await this.connection
                        .createQueryBuilder()
                        .insert()
                        .into(TbBuildings)
                        .values(buildings)
                        .execute();
                } catch (error) {
                    console.log(error);
                    return exceptionHandling("Error inserting data, please try again.", error);
                }
            });
            return ("Items added successfully.");
        } catch (error) {
            // console.log(error);
            return exceptionHandling("Unexpected error, try later again.", error);
        }

    }

    async worldRead() {
        try {
            var response = [];
            var world: any = await this.connection.getRepository(TbWorld).find({
                relations: ['tbCities'],
            });

            var key = 0;
            for await (const element of world) {
                response.push({
                    idWorld: element.idWorld,
                    campaign: element.campaign,
                    worldName: element.worldName,
                    welcome: element.welcome,
                    uiid: element.uiid,
                    cities: [],
                });


                var tbCities: any = await this.connection.getRepository(TbCities).find({
                    where:{ idWorld: element.idWorld},
                    relations: ['tbBuildings'],
                });

                let key2 = 0;
                
                for await (const city of tbCities) {
                    response[key].cities.push({
                        idCity: city.idCity,
                        cityName: city.cityName,
                        style: city.style,
                        main: city.main,
                        buildings: []
                    });

                    for await (const building of city.tbBuildings) {
                        response[key].cities[key2].buildings.push({
                            idBuildings: building.idBuildings,
                            buildingName: building.buildingName,
                            description: building.description,
                            url: building.url,
                        });
                    };
                    key2++;
                };
                key++;
            }

            // console.log(response)
            return  response;
        } catch (error) {
            // console.log(error);
            return exceptionHandling("World query failed, please try again later", error);
        }
    }

    async worldFind(body:any) {
        try {
            var response = [];
            var world: any = await this.connection.getRepository(TbWorld).find({
                where:{ 
                    campaign: body.campaign
                },

            });

            var key = 0;
            for await (const element of world) {
                response.push({
                    idWorld: element.idWorld,
                    campaign: element.campaign,
                    worldName: element.worldName,
                    welcome: element.welcome,
                    uiid: element.uiid,
                    cities: [],
                });


                var tbCities: any = await this.connection.getRepository(TbCities).find({
                    where:{ idWorld: element.idWorld},
                    relations: ['tbBuildings']
                });

                let key2 = 0;
                
                for await (const city of tbCities) {
                    response[key].cities.push({
                        idCity: city.idCity,
                        cityName: city.cityName,
                        style: city.style,
                        main: city.main,
                        buildings: []
                    });

                    for await (const building of city.tbBuildings) {
                        response[key].cities[key2].buildings.push({
                            idBuildings: building.idBuildings,
                            buildingName: building.buildingName,
                            description: building.description,
                            url: building.url,
                        });
                    };
                    key2++;
                };
                key++;
            }

            return  response;
        } catch (error) {
            // console.log(error);
            return exceptionHandling("World query failed, please try again later", error);
        }
    }
}



