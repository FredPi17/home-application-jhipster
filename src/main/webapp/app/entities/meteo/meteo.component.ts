import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMeteo } from 'app/shared/model/meteo.model';
import { AccountService } from 'app/core';
import { MeteoService } from './meteo.service';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-meteo',
    templateUrl: './meteo.component.html',
    styleUrls: ['../ville/bootstrap_extended.min.css', '../ville/custom-rtl.min.css', '../ville/ville.css']
})
export class MeteoComponent implements OnInit, OnDestroy {
    meteos: IMeteo[];
    currentAccount: any;
    eventSubscriber: Subscription;
    thingspeakResponseBureau: JSON;
    thingspeakResponseExterieur: JSON;
    thingspeakResponseSalon: JSON;
    thingspeakResponseServeur: JSON;

    constructor(
        protected meteoService: MeteoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected router: Router
    ) {}

    loadAll() {
        this.meteoService
            .query()
            .pipe(
                filter((res: HttpResponse<IMeteo[]>) => res.ok),
                map((res: HttpResponse<IMeteo[]>) => res.body)
            )
            .subscribe(
                (res: IMeteo[]) => {
                    this.meteos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.meteoService
            .get('bureau', 1)
            .toPromise()
            .then(response => {
                console.log(response);
                this.thingspeakResponseBureau = response['body']['feeds'];
            });
        this.meteoService
            .get('salon', 1)
            .toPromise()
            .then(response => {
                console.log(response);
                this.thingspeakResponseSalon = response['body']['feeds'];
            });
        this.meteoService
            .get('exterieur', 1)
            .toPromise()
            .then(response => {
                console.log(response);
                this.thingspeakResponseExterieur = response['body']['feeds'];
            });
        this.meteoService
            .get('serveur', 1)
            .toPromise()
            .then(response => {
                console.log(response);
                this.thingspeakResponseServeur = response['body']['feeds'];
            });
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMeteos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMeteo) {
        return item.id;
    }

    registerChangeInMeteos() {
        this.eventSubscriber = this.eventManager.subscribe('meteoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    redirect() {
        return this.router.navigate(['/accessdenied']);
    }
}
