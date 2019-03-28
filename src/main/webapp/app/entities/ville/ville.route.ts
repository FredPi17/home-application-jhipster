import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ville } from 'app/shared/model/ville.model';
import { VilleService } from './ville.service';
import { VilleComponent } from './ville.component';
import { VilleDetailComponent } from './ville-detail.component';
import { VilleUpdateComponent } from './ville-update.component';
import { VilleDeletePopupComponent } from './ville-delete-dialog.component';
import { IVille } from 'app/shared/model/ville.model';

@Injectable({ providedIn: 'root' })
export class VilleResolve implements Resolve<IVille> {
    constructor(private service: VilleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVille> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Ville>) => response.ok),
                map((ville: HttpResponse<Ville>) => ville.body)
            );
        }
        return of(new Ville());
    }
}

export const villeRoute: Routes = [
    {
        path: '',
        component: VilleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.ville.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VilleDetailComponent,
        resolve: {
            ville: VilleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.ville.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VilleUpdateComponent,
        resolve: {
            ville: VilleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.ville.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VilleUpdateComponent,
        resolve: {
            ville: VilleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.ville.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const villePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VilleDeletePopupComponent,
        resolve: {
            ville: VilleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.ville.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
