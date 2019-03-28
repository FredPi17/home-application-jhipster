import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Meteo } from 'app/shared/model/meteo.model';
import { MeteoService } from './meteo.service';
import { MeteoComponent } from './meteo.component';
import { MeteoDetailComponent } from './meteo-detail.component';
import { MeteoUpdateComponent } from './meteo-update.component';
import { MeteoDeletePopupComponent } from './meteo-delete-dialog.component';
import { IMeteo } from 'app/shared/model/meteo.model';

@Injectable({ providedIn: 'root' })
export class MeteoResolve implements Resolve<IMeteo> {
    constructor(private service: MeteoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMeteo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Meteo>) => response.ok),
                map((meteo: HttpResponse<Meteo>) => meteo.body)
            );
        }
        return of(new Meteo());
    }
}

export const meteoRoute: Routes = [
    {
        path: '',
        component: MeteoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.meteo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MeteoDetailComponent,
        resolve: {
            meteo: MeteoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.meteo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MeteoUpdateComponent,
        resolve: {
            meteo: MeteoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.meteo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MeteoUpdateComponent,
        resolve: {
            meteo: MeteoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.meteo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const meteoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MeteoDeletePopupComponent,
        resolve: {
            meteo: MeteoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.meteo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
