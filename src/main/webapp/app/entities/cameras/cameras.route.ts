import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cameras } from 'app/shared/model/cameras.model';
import { CamerasService } from './cameras.service';
import { CamerasComponent } from './cameras.component';
import { CamerasDetailComponent } from './cameras-detail.component';
import { CamerasUpdateComponent } from './cameras-update.component';
import { CamerasDeletePopupComponent } from './cameras-delete-dialog.component';
import { ICameras } from 'app/shared/model/cameras.model';

@Injectable({ providedIn: 'root' })
export class CamerasResolve implements Resolve<ICameras> {
    constructor(private service: CamerasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICameras> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Cameras>) => response.ok),
                map((cameras: HttpResponse<Cameras>) => cameras.body)
            );
        }
        return of(new Cameras());
    }
}

export const camerasRoute: Routes = [
    {
        path: '',
        component: CamerasComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.cameras.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CamerasDetailComponent,
        resolve: {
            cameras: CamerasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.cameras.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CamerasUpdateComponent,
        resolve: {
            cameras: CamerasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.cameras.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CamerasUpdateComponent,
        resolve: {
            cameras: CamerasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.cameras.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const camerasPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CamerasDeletePopupComponent,
        resolve: {
            cameras: CamerasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.cameras.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
