import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Courbes } from 'app/shared/model/courbes.model';
import { CourbesService } from './courbes.service';
import { CourbesComponent } from './courbes.component';
import { CourbesDetailComponent } from './courbes-detail.component';
import { CourbesUpdateComponent } from './courbes-update.component';
import { CourbesDeletePopupComponent } from './courbes-delete-dialog.component';
import { ICourbes } from 'app/shared/model/courbes.model';

@Injectable({ providedIn: 'root' })
export class CourbesResolve implements Resolve<ICourbes> {
    constructor(private service: CourbesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICourbes> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Courbes>) => response.ok),
                map((courbes: HttpResponse<Courbes>) => courbes.body)
            );
        }
        return of(new Courbes());
    }
}

export const courbesRoute: Routes = [
    {
        path: '',
        component: CourbesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.courbes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CourbesDetailComponent,
        resolve: {
            courbes: CourbesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.courbes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CourbesUpdateComponent,
        resolve: {
            courbes: CourbesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.courbes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CourbesUpdateComponent,
        resolve: {
            courbes: CourbesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.courbes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const courbesPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CourbesDeletePopupComponent,
        resolve: {
            courbes: CourbesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'homeApplicationApp.courbes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
