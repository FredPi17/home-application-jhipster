import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVille } from 'app/shared/model/ville.model';
import { AccountService } from 'app/core';
import { VilleService } from './ville.service';

@Component({
    selector: 'jhi-ville',
    templateUrl: './ville.component.html',
    styleUrls: ['./bootstrap_extended.min.css', './custom-rtl.min.css', './ville.css']
})
export class VilleComponent implements OnInit, OnDestroy {
    villes: IVille[];
    currentAccount: any;
    eventSubscriber: Subscription;
    location: Navigator;
    currentLat: string;
    currentLong: string;
    weatherFromCity: string;
    cityName: string;
    cityTemperature: string;
    cityMaxTemperature: string;
    cityMinTemperature: string;
    cityHumidity: string;
    citySunrise: string;
    citySunset: string;
    cityClouds: string;
    cityWindDegree: string;
    cityWindSpeed: string;
    cityLogo: string;

    constructor(
        protected villeService: VilleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.villeService
            .query()
            .pipe(
                filter((res: HttpResponse<IVille[]>) => res.ok),
                map((res: HttpResponse<IVille[]>) => res.body)
            )
            .subscribe(
                (res: IVille[]) => {
                    this.villes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.findMe();
    }
    searchCity(city: string) {
        if (city !== null && city !== '') {
            this.villeService
                .getByCityName(city)
                .toPromise()
                .then(response => {
                    console.log(response);
                    this.parseData(response);
                });
        }
        console.log('ville: ' + city);
    }

    findMe() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.currentLat = position.coords.latitude.toString();
                this.currentLong = position.coords.longitude.toString();
                if (this.currentLong != null && this.currentLat != null) {
                    this.villeService
                        .getByLatLong(this.currentLat, this.currentLong)
                        .toPromise()
                        .then(response => {
                            console.log(response);
                            this.parseData(response);
                        });
                }
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    parseData(response: string) {
        this.weatherFromCity = response['body'];
        this.cityName = this.weatherFromCity['name'];
        this.cityTemperature = this.weatherFromCity['main']['temp'];
        this.cityHumidity = this.weatherFromCity['main']['humidity'];
        this.cityMaxTemperature = this.weatherFromCity['main']['temp_max'];
        this.cityMinTemperature = this.weatherFromCity['main']['temp_min'];
        this.cityClouds = this.weatherFromCity['clouds']['all'];
        this.citySunrise = this.weatherFromCity['sys']['sunrise'];
        this.citySunset = this.weatherFromCity['sys']['sunset'];
        this.cityWindDegree = this.weatherFromCity['wind']['deg'];
        this.cityWindSpeed = this.weatherFromCity['wind']['speed'];
        this.cityLogo = 'http://openweathermap.org/img/w/' + this.weatherFromCity['weather']['0']['icon'] + '.png';
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVilles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVille) {
        return item.id;
    }

    registerChangeInVilles() {
        this.eventSubscriber = this.eventManager.subscribe('villeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
