import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVille, Ville } from 'app/shared/model/ville.model';
import { AccountService, LoginModalService } from 'app/core';
import { VilleService } from './ville.service';
import { WeatherCity } from 'app/entities/ville/weatherCity';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { addCityModalService } from 'app/entities/ville/addCity-modal.service';

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
    weatherCityList: WeatherCity[] = [];
    weatherCityObject: WeatherCity;
    modalRef: NgbModalRef;

    constructor(
        protected villeService: VilleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        private addCityModalService: addCityModalService
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
        this.getFavorites();
    }

    searchCity(city: string) {
        if (city !== null && city !== '') {
            this.villeService
                .getByCityName(city)
                .toPromise()
                .then(response => {
                    console.log(response);
                    this.parseDataForWanted(response);
                });
        }
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
                            this.parseDataForWanted(response);
                        });
                }
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    getFavorites() {
        this.villeService
            .get()
            .toPromise()
            .then(response => {
                for (let i = 0; i < Object.keys(response['body']).length; i++) {
                    this.villeService
                        .getByCityName(response['body'][i]['name'])
                        .toPromise()
                        .then(reponse => {
                            console.log(reponse);
                            this.parseDataForDatabase(reponse, response['body'][i]['id']);
                        });
                }
            });
    }

    parseDataForWanted(response: string) {
        this.weatherFromCity = response['body'];
        this.weatherCityObject = new WeatherCity(
            1000,
            this.weatherFromCity['name'],
            this.weatherFromCity['main']['temp'],
            this.weatherFromCity['main']['temp_max'],
            this.weatherFromCity['main']['temp_min'],
            this.weatherFromCity['main']['humidity'],
            this.weatherFromCity['sys']['sunrise'],
            this.weatherFromCity['sys']['sunset'],
            this.weatherFromCity['clouds']['all'],
            this.weatherFromCity['wind']['deg'],
            this.weatherFromCity['wind']['speed'],
            'http://openweathermap.org/img/w/' + this.weatherFromCity['weather']['0']['icon'] + '.png'
        );
    }

    parseDataForDatabase(response: string, id: number) {
        const weather = response['body'];
        const weatherCityFromDb = new WeatherCity(
            id,
            weather['name'],
            weather['main']['temp'],
            weather['main']['temp_max'],
            weather['main']['temp_min'],
            weather['main']['humidity'],
            weather['sys']['sunrise'],
            weather['sys']['sunset'],
            weather['clouds']['all'],
            weather['wind']['deg'],
            weather['wind']['speed'],
            'http://openweathermap.org/img/w/' + weather['weather']['0']['icon'] + '.png'
        );
        this.weatherCityList.push(weatherCityFromDb);
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

    addCity() {
        this.modalRef = this.addCityModalService.open();
    }

    delete(id: number) {
        console.log("suppression de la ville avec l'id: {}", id);
        this.villeService
            .delete(id)
            .toPromise()
            .then(response => {
                this.reload();
            });
    }

    reload() {
        window.location.reload();
    }
}
