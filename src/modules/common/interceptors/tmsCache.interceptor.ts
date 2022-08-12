import { Injectable, ExecutionContext, NestInterceptor, CallHandler, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { map, Observable, of } from 'rxjs';
import { typesAllowed } from '../allowTypes';
import { calcDate } from '../calcDate';

@Injectable()
export class tmsCacheInterceptor implements NestInterceptor {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        let arrayCampaigns = [];

        if (request.body.campaigns && Array.isArray(request.body.campaigns)) {
            request.body.campaigns.forEach((item) => {
                arrayCampaigns.push(item.Client);
            });
            var campaigns = arrayCampaigns.join(",");
        }
        if(request.body.type === 'rango'){
            var key = `${request.url}:${request.body.startDate}-${request.body.endDate}-${campaigns || request.body.campaign || request.body.idClass || request.body.campaigns}-${request.body.kpi || 'END'}`
        }
        else if(typesAllowed.includes(request.body.type)){
            const { start, end } = calcDate(request.body.type)
            var key = `${request.url}:${start}-${end}-${campaigns || request.body.campaign || request.body.idClass || request.body.campaigns}-${request.body.kpi || 'END'}`
        }
        else {
            return next.handle()
        }
        return this.cacheManager.get(key).then((isCached) => {

            if (!isCached) {
                return next.handle().pipe(map((data) => {
                    this.cacheManager.set(key, data, {ttl:43200})
                    return data
                }));
            }
            return of(isCached);
        })


    }
}