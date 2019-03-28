import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICourbes } from 'app/shared/model/courbes.model';
import { AccountService } from 'app/core';
import { CourbesService } from './courbes.service';
import { MeteoService } from 'app/entities/meteo';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
    selector: 'jhi-courbes',
    templateUrl: './courbes.component.html'
})
export class CourbesComponent implements OnInit, OnDestroy {
    courbes: ICourbes[];
    currentAccount: any;
    eventSubscriber: Subscription;
    thingspeakResponseBureau: JSON;
    thingspeakResponseExterieur: JSON;
    thingspeakResponseSalon: JSON;
    thingspeakResponseServeur: JSON;
    humiditeBureau = [];
    humiditeExterieur = [];
    humiditeSalon = [];
    humiditeServeur = [];
    temperatureBureau = [];
    temperatureExterieur = [];
    temperatureSalon = [];
    temperatureServeur = [];
    tempsBureau: Label[];
    tempsExterieur: Label[];
    tempsSalon: Label[];
    tempsServeur: Label[];
    chartLabelsBureau: Label[];
    chartLabelsSalon: Label[];
    chartLabelExterieur: Label[];
    chartLabelServeur: Label[];
    chartOptions = {
        responsive: true
    };

    chartOptionsBureau;
    chartOptionsSalon;
    chartOptionsExterieur;
    chartOptionsServeur;

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    constructor(
        protected courbesService: CourbesService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected meteoService: MeteoService
    ) {}

    loadAll() {
        this.courbesService
            .query()
            .pipe(
                filter((res: HttpResponse<ICourbes[]>) => res.ok),
                map((res: HttpResponse<ICourbes[]>) => res.body)
            )
            .subscribe(
                (res: ICourbes[]) => {
                    this.courbes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.loadData(10);
        this.chartOptionsBureau = [
            {
                data: this.temperatureBureau,
                label: 'Température Bureau'
            },
            {
                data: this.humiditeBureau,
                label: 'Humidité Bureau'
            }
        ];

        this.chartOptionsSalon = [
            {
                data: this.temperatureSalon,
                label: 'Température salon'
            },
            {
                data: this.humiditeSalon,
                label: 'Humidité salon'
            }
        ];
        this.chartOptionsExterieur = [
            {
                data: this.temperatureExterieur,
                label: 'Température extérieure'
            },
            {
                data: this.humiditeExterieur,
                label: 'Humidité extérieure'
            }
        ];
        this.chartOptionsServeur = [
            {
                data: this.temperatureServeur,
                label: 'Température serveur'
            },
            {
                data: this.humiditeServeur,
                label: 'Humidité serveur'
            }
        ];
    }

    loadData(nb: number) {
        this.tempsBureau = [];
        this.tempsExterieur = [];
        this.tempsSalon = [];
        this.tempsServeur = [];
        this.tempsBureau = [];
        this.temperatureBureau = [];
        this.temperatureExterieur = [];
        this.temperatureSalon = [];
        this.temperatureServeur = [];
        this.humiditeBureau = [];
        this.humiditeExterieur = [];
        this.humiditeSalon = [];
        this.humiditeServeur = [];
        this.meteoService
            .get('bureau', nb)
            .toPromise()
            .then(response => {
                this.thingspeakResponseBureau = response['body']['feeds'];
                const toto = JSON.stringify(this.thingspeakResponseBureau);
                const jsonData = JSON.parse(toto);
                for (let i = 0; i < nb; i++) {
                    this.tempsBureau.push(jsonData[i]['created_at'].slice(11, 16));
                    this.humiditeBureau.push(Math.trunc(jsonData[i]['field2']));
                    this.temperatureBureau.push(Math.trunc(jsonData[i]['field1']));
                }
                this.chartLabelsBureau = this.tempsBureau;
                this.chartOptionsBureau = [
                    {
                        data: this.temperatureBureau,
                        label: 'Température Bureau'
                    },
                    {
                        data: this.humiditeBureau,
                        label: 'Humidité Bureau'
                    }
                ];
            });
        this.meteoService
            .get('salon', nb)
            .toPromise()
            .then(response => {
                this.thingspeakResponseSalon = response['body']['feeds'];
                const toto = JSON.stringify(this.thingspeakResponseSalon);
                const jsonData = JSON.parse(toto);
                for (let i = 0; i < nb; i++) {
                    this.tempsSalon.push(jsonData[i]['created_at'].slice(11, 16));
                    this.temperatureSalon.push(Math.trunc(jsonData[i]['field1']));
                    this.humiditeSalon.push(Math.trunc(jsonData[i]['field2']));
                }
                this.chartLabelsSalon = this.tempsSalon;
                this.chartOptionsSalon = [
                    {
                        data: this.temperatureSalon,
                        label: 'Température salon'
                    },
                    {
                        data: this.humiditeSalon,
                        label: 'Humidité salon'
                    }
                ];
            });
        this.meteoService
            .get('exterieur', nb)
            .toPromise()
            .then(response => {
                this.thingspeakResponseExterieur = response['body']['feeds'];
                const toto = JSON.stringify(this.thingspeakResponseExterieur);
                const jsonData = JSON.parse(toto);
                for (let i = 0; i < nb; i++) {
                    this.tempsExterieur.push(jsonData[i]['created_at'].slice(11, 16));
                    this.temperatureExterieur.push(Math.trunc(jsonData[i]['field1']));
                    this.humiditeExterieur.push(Math.trunc(jsonData[i]['field2']));
                }
                this.chartLabelExterieur = this.tempsExterieur;
                this.chartOptionsExterieur = [
                    {
                        data: this.temperatureExterieur,
                        label: 'Température extérieure'
                    },
                    {
                        data: this.humiditeExterieur,
                        label: 'Humidité extérieure'
                    }
                ];
            });
        this.meteoService
            .get('serveur', nb)
            .toPromise()
            .then(response => {
                this.thingspeakResponseServeur = response['body']['feeds'];
                const toto = JSON.stringify(this.thingspeakResponseServeur);
                const jsonData = JSON.parse(toto);
                for (let i = 0; i < nb; i++) {
                    this.tempsServeur.push(jsonData[i]['created_at'].slice(11, 16));
                    this.temperatureServeur.push(Math.trunc(jsonData[i]['field1']));
                    this.humiditeServeur.push(Math.trunc(jsonData[i]['field2']));
                }
                this.chartLabelServeur = this.tempsServeur;
                this.chartOptionsServeur = [
                    {
                        data: this.temperatureServeur,
                        label: 'Température serveur'
                    },
                    {
                        data: this.humiditeServeur,
                        label: 'Humidité serveur'
                    }
                ];
            });
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCourbes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICourbes) {
        return item.id;
    }

    registerChangeInCourbes() {
        this.eventSubscriber = this.eventManager.subscribe('courbesListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
